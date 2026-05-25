<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

requireAdmin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['success' => false, 'error' => 'method_not_allowed'], 405);
}

$position = trim($_POST['position'] ?? '');
$name = trim($_POST['name'] ?? '');
$brand = trim($_POST['brand'] ?? '');
$price = trim($_POST['price'] ?? '');
$category = trim($_POST['category'] ?? '');
$description = $_POST['description'] ?? '';
$additionalinfo = $_POST['additionalinfo'] ?? '';
$url = trim($_POST['url'] ?? '');
$urltext = trim($_POST['urltext'] ?? '');
$alttext = trim($_POST['alttext'] ?? '');

if ($position === '' || $name === '') {
  jsonResponse(['success' => false, 'error' => 'validation_error'], 400);
}

$mainImagePath = saveUploadedImage('main_image', $position);
$previewImagePath = saveUploadedImage('preview_image', $position);

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
  $stmt->execute([
    ':position' => $position,
    ':name' => $name,
    ':brand' => $brand,
    ':price' => $price,
    ':category' => $category,
    ':description' => $description,
    ':additionalinfo' => $additionalinfo,
    ':url' => $url,
    ':urltext' => $urltext,
    ':alttext' => $alttext,
    ':main_image' => $mainImagePath,
    ':preview_image' => $previewImagePath,
  ]);

  jsonResponse(['success' => true]);
} catch (Throwable $e) {
  jsonResponse([
    'success' => false,
    'error' => 'db_error',
    'message' => $e->getMessage(),
  ], 500);
}
