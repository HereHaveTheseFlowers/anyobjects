<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  jsonResponse(['success' => false, 'error' => 'method_not_allowed'], 405);
}

$login = trim($_POST['login'] ?? '');
$password = $_POST['password'] ?? '';

if ($login === '' || $password === '') {
  jsonResponse(['success' => false, 'error' => 'validation_error'], 400);
}

$adminLogin = $config['admin']['login'] ?? '';
$passwordHash = $config['admin']['password_hash'] ?? '';

if ($login !== $adminLogin || !password_verify($password, $passwordHash)) {
  jsonResponse(['success' => false, 'error' => 'invalid_credentials'], 401);
}

$_SESSION['admin_logged_in'] = true;
$_SESSION['admin_login'] = $login;

jsonResponse(['success' => true]);
