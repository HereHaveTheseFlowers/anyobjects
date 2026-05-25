/**
 * Скачивает картинки из GitHub (public/objects) и обновляет objects.json.
 *
 * Источник:
 * https://github.com/HereHaveTheseFlowers/anyobjects/tree/6f0e292/public/objects
 *
 * npm run migrate:images-github
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "migration-output");
const uploadsDir = path.join(outputDir, "uploads", "objects");
const jsonPath = path.join(outputDir, "objects.json");

const defaultGithubBase =
  "https://raw.githubusercontent.com/HereHaveTheseFlowers/anyobjects/6f0e29228a014516e0437a4e46d4668554a2f771/public/objects";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function getExtensionFromBytes(bytes) {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) {
    return "png";
  }
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "jpg";
  }
  return "png";
}

async function downloadGithubImage(githubBase, position, type) {
  const fileName = type === "main" ? "main.png" : "preview.png";
  const url = `${githubBase}/${position}/${fileName}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.warn(`  ! ${url} → HTTP ${response.status}`);
    return null;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 100) {
    return null;
  }

  const ext = getExtensionFromBytes(buffer);
  const localName = `${position}-${type}.${ext}`;
  const filePath = path.join(uploadsDir, localName);
  fs.writeFileSync(filePath, buffer);

  return `uploads/objects/${localName}`;
}

async function main() {
  loadEnvFile(path.join(__dirname, "migrate.env"));

  const githubBase = (process.env.GITHUB_OBJECTS_BASE || defaultGithubBase).replace(
    /\/$/,
    "",
  );

  if (!fs.existsSync(jsonPath)) {
    console.error(`Сначала создайте ${jsonPath} (npm run migrate:export)`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  if (!Array.isArray(payload.objects)) {
    console.error("Неверный формат objects.json");
    process.exit(1);
  }

  fs.mkdirSync(uploadsDir, { recursive: true });

  console.log(`GitHub: ${githubBase}\n`);

  let updated = 0;

  for (const object of payload.objects) {
    const position = String(object.position ?? "");
    if (!position) {
      continue;
    }

    console.log(`Объект ${position}: ${object.name ?? ""}`);

    const mainImage = await downloadGithubImage(githubBase, position, "main");
    const previewImage = await downloadGithubImage(githubBase, position, "preview");

    if (mainImage) {
      object.main_image = mainImage;
      console.log("  ✓ main");
    }
    if (previewImage) {
      object.preview_image = previewImage;
      console.log("  ✓ preview");
    }

    if (mainImage && previewImage) {
      updated++;
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf8");

  console.log("\n--- Итог ---");
  console.log(`Объектов с обеими картинками: ${updated} / ${payload.objects.length}`);
  console.log(`JSON обновлён: ${jsonPath}`);
  console.log(`Картинки: ${uploadsDir}`);
  console.log("\nДальше залейте на сервер (см. scripts/MIGRATION.md)");
}

main().catch((error) => {
  console.error("Ошибка:", error);
  process.exit(1);
});
