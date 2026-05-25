<?php

declare(strict_types=1);

/**
 * Одноразовый импорт objects.json в MySQL.
 * Удалите этот файл после успешного импорта.
 *
 * URL: /api/migrate_import.php?secret=ВАШ_СЕКРЕТ
 */

require __DIR__ . '/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');

$secret = $_GET['secret'] ?? '';
$expectedSecret = $config['migration']['secret'] ?? '';

if ($expectedSecret === '' || !hash_equals($expectedSecret, $secret)) {
  jsonResponse(['success' => false, 'error' => 'forbidden'], 403);
}

$jsonPath = __DIR__ . '/migration/objects.json';
if (!file_exists($jsonPath)) {
  jsonResponse([
    'success' => false,
    'error' => 'file_not_found',
    'path' => 'api/migration/objects.json',
  ], 404);
}

$payload = json_decode(file_get_contents($jsonPath), true);
if (!is_array($payload) || !isset($payload['objects']) || !is_array($payload['objects'])) {
  jsonResponse(['success' => false, 'error' => 'invalid_json'], 400);
}

try {
  $pdo = getPdo();

  $sql = 'INSERT INTO objects (
            position, name, brand, price, category,
            description, additionalinfo, url, urltext, alttext,
            main_image, preview_image
          ) VALUES (
            :position, :name, :brand, :price, :category,
            :description, :additionalinfo, :url, :urltext, :alttext,
            :main_image, :preview_image
          )
          ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            brand = VALUES(brand),
            price = VALUES(price),
            category = VALUES(category),
            description = VALUES(description),
            additionalinfo = VALUES(additionalinfo),
            url = VALUES(url),
            urltext = VALUES(urltext),
            alttext = VALUES(alttext),
            main_image = COALESCE(VALUES(main_image), main_image),
            preview_image = COALESCE(VALUES(preview_image), preview_image)';

  $stmt = $pdo->prepare($sql);
  $imported = 0;

  foreach ($payload['objects'] as $object) {
    if (!is_array($object)) {
      continue;
    }

    $position = trim((string) ($object['position'] ?? ''));
    if ($position === '') {
      continue;
    }

    $stmt->execute([
      ':position' => $position,
      ':name' => (string) ($object['name'] ?? ''),
      ':brand' => (string) ($object['brand'] ?? ''),
      ':price' => (string) ($object['price'] ?? ''),
      ':category' => (string) ($object['category'] ?? ''),
      ':description' => (string) ($object['description'] ?? ''),
      ':additionalinfo' => (string) ($object['additionalinfo'] ?? ''),
      ':url' => (string) ($object['url'] ?? ''),
      ':urltext' => (string) ($object['urltext'] ?? ''),
      ':alttext' => (string) ($object['alttext'] ?? ''),
      ':main_image' => $object['main_image'] ?? null,
      ':preview_image' => $object['preview_image'] ?? null,
    ]);

    $imported++;
  }

  jsonResponse([
    'success' => true,
    'imported' => $imported,
  ]);
} catch (Throwable $e) {
  jsonResponse([
    'success' => false,
    'error' => 'db_error',
    'message' => $e->getMessage(),
  ], 500);
}
