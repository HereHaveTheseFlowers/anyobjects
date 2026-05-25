<?php
/**
 * Скопируйте этот файл как config.php и укажите свои данные.
 *
 * Пароль: сгенерируйте хеш в phpMyAdmin (SQL) или локально:
 *   php -r "echo password_hash('ваш_пароль', PASSWORD_DEFAULT);"
 */
return [
  'db' => [
    'host' => 'localhost',
    'name' => 'DB_NAME',
    'user' => 'DB_USER',
    'pass' => 'DB_PASS',
  ],
  'admin' => [
    'login' => 'admin',
    'password_hash' => '$2y$10$REPLACE_WITH_PASSWORD_HASH',
  ],
  'uploads' => [
    'dir' => __DIR__ . '/../uploads/objects',
    'url' => 'uploads/objects',
  ],
  // Секрет для одноразового migrate_import.php (удалите после миграции)
  'migration' => [
    'secret' => 'change-me-before-import',
  ],
];
