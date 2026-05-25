<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['success' => false, 'error' => 'method_not_allowed'], 405);
}

$position = trim($_POST['position'] ?? '');

if ($position === '') {
  jsonResponse(['success' => false, 'error' => 'validation_error'], 400);
}

try {
  $pdo = getPdo();

  $select = $pdo->prepare('SELECT main_image, preview_image FROM objects WHERE position = :position LIMIT 1');
  $select->execute([':position' => $position]);
  $row = $select->fetch(PDO::FETCH_ASSOC);

  $delete = $pdo->prepare('DELETE FROM objects WHERE position = :position');
  $delete->execute([':position' => $position]);

  if ($row) {
    $uploadDir = realpath($config['uploads']['dir']);
    foreach (['main_image', 'preview_image'] as $field) {
      if (empty($row[$field])) {
        continue;
      }
      $filePath = realpath(__DIR__ . '/../' . ltrim($row[$field], '/'));
      if ($filePath && $uploadDir && startsWith($filePath, $uploadDir)) {
        @unlink($filePath);
      }
    }
  }

  jsonResponse(['success' => true]);
} catch (Throwable $e) {
  jsonResponse([
    'success' => false,
    'error' => 'db_error',
    'message' => $e->getMessage(),
  ], 500);
}
