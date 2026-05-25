<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

try {
  $pdo = getPdo();
  $stmt = $pdo->query('SELECT * FROM objects ORDER BY position ASC');
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $objects = [];
  foreach ($rows as $row) {
    $objects[] = mapObjectRow($row);
  }

  jsonResponse(['objects' => $objects]);
} catch (Throwable $e) {
  jsonResponse([
    'error' => 'db_error',
    'message' => $e->getMessage(),
  ], 500);
}
