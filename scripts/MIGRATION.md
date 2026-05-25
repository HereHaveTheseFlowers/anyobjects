# Миграция объектов из Firestore в MySQL

## Шаг 1. Экспорт на компьютере

```bash
cp scripts/migrate.env.example scripts/migrate.env
```

Заполните в `scripts/migrate.env`:

- `FIREBASE_EMAIL` — логин от старой Firebase-админки
- `FIREBASE_PASSWORD` — пароль от старой Firebase-админки

Запуск:

```bash
npm run migrate:export
```

Результат:

- `scripts/migration-output/objects.json` — все поля объектов
- `scripts/migration-output/uploads/objects/` — картинки `1-main.png`, `1-preview.png` и т.д.

## Шаг 2. Секрет для импорта на сервере

В `public_html/api/config.php` добавьте:

```php
'migration' => [
  'secret' => 'придумайте-длинный-секрет-123',
],
```

## Шаг 3. Загрузка на хостинг

Через файловый менеджер / FTP:

1. `migration-output/uploads/objects/*` → `public_html/uploads/objects/`
2. `migration-output/objects.json` → `public_html/api/migration/objects.json`
3. Залейте `public/api/migrate_import.php` → `public_html/api/migrate_import.php`

## Шаг 4. Импорт в MySQL

Откройте в браузере (подставьте свой секрет):

```
https://anyobjects.ru/api/migrate_import.php?secret=придумайте-длинный-секрет-123
```

Ожидаемый ответ:

```json
{"success":true,"imported":12}
```

Проверка: `https://anyobjects.ru/api/objects.php`

## Картинки из GitHub (без Firebase Storage)

В репозитории есть архив: [public/objects](https://github.com/HereHaveTheseFlowers/anyobjects/tree/6f0e29228a014516e0437a4e46d4668554a2f771/public/objects).

Если `objects.json` уже есть, но картинки не скачались:

```bash
npm run migrate:images-github
```

Скрипт возьмёт `main.png` и `preview.png` из папок `1`…`10` и обновит `migration-output/objects.json`.

При полном экспорте (`migrate:export`) GitHub используется **первым** источником картинок.

## Ошибка `storage/quota-exceeded` или HTTP 402

У Firebase исчерпана квота Storage — картинки из Firebase **не скачиваются**.

Скрипт по умолчанию **не использует Storage SDK** и пробует:

1. `https://anyobjects.ru/objects/N/main.png` (старый статический сайт)
2. Публичный URL Firebase (часто тоже 402)

**Тексты объектов** из Firestore всё равно попадают в `objects.json` — их можно импортировать в MySQL.

Картинки без файлов:

- загрузить вручную через `/admin/edit`, или
- временно включить платный план Firebase (Blaze) и повторить `npm run migrate:export` с `USE_FIREBASE_STORAGE=1`

Список объектов без картинок: `scripts/migration-output/missing-images.txt`

## Шаг 5. Уборка

После успешного импорта удалите с сервера:

- `api/migrate_import.php`
- `api/migration/objects.json`
- блок `migration` из `config.php` (по желанию)

Локально можно удалить `scripts/migration-output/`.
