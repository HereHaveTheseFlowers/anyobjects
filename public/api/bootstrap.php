<?php

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
  session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
  ]);
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  jsonResponse(['success' => false, 'error' => 'config_missing'], 500);
}

/** @var array<string, mixed> $config */
$config = require $configPath;

function startsWith(string $haystack, string $needle): bool
{
  if ($needle === '') {
    return true;
  }

  return substr($haystack, 0, strlen($needle)) === $needle;
}

function jsonResponse(array $data, int $status = 200): void
{
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function getPdo(): PDO
{
  global $config;

  $db = $config['db'];
  $dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=utf8mb4',
    $db['host'],
    $db['name'],
  );

  return new PDO($dsn, $db['user'], $db['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  ]);
}

function isAdminAuthenticated(): bool
{
  return !empty($_SESSION['admin_logged_in']);
}

function requireAdmin(): void
{
  if (!isAdminAuthenticated()) {
    jsonResponse(['success' => false, 'error' => 'unauthorized'], 401);
  }
}

function ensureUploadDir(): string
{
  global $config;

  $uploadDir = $config['uploads']['dir'];
  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0775, true);
  }

  return $uploadDir;
}

function mapObjectRow(array $row): array
{
  global $config;

  $mainImage = $row['main_image'] ?? null;
  $previewImage = $row['preview_image'] ?? null;

  $toUrl = static function (?string $path): ?string {
    if ($path === null || $path === '') {
      return null;
    }
    if (startsWith($path, 'http://') || startsWith($path, 'https://')) {
      return $path;
    }

    return '/' . ltrim($path, '/');
  };

  return [
    'position' => $row['position'],
    'name' => $row['name'],
    'brand' => $row['brand'],
    'price' => $row['price'],
    'category' => $row['category'],
    'description' => $row['description'],
    'additionalinfo' => $row['additionalinfo'],
    'url' => $row['url'],
    'urltext' => $row['urltext'],
    'alttext' => $row['alttext'],
    'mainimage' => $toUrl($mainImage),
    'previewimage' => $toUrl($previewImage),
  ];
}

function saveUploadedImage(string $fieldName, string $position): ?string
{
  global $config;

  if (empty($_FILES[$fieldName]['name'])) {
    return null;
  }

  $uploadDir = ensureUploadDir();
  $ext = pathinfo($_FILES[$fieldName]['name'], PATHINFO_EXTENSION);
  $suffix = $fieldName === 'main_image' ? 'main' : 'preview';
  $filename = $position . '-' . $suffix . '.' . $ext;
  $targetPath = $uploadDir . '/' . $filename;

  if (!move_uploaded_file($_FILES[$fieldName]['tmp_name'], $targetPath)) {
    return null;
  }

  return $config['uploads']['url'] . '/' . $filename;
}
