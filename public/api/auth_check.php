<?php

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

jsonResponse([
  'authenticated' => isAdminAuthenticated(),
]);
