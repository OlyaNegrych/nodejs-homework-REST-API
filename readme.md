### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

Додаткове завдання - необов'язкове
* Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20).
* Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
* Оновлення підписки (subscription) користувача через ендпоінт PATCH /users.Підписка повинна мати одне з наступних значень ['starter', 'pro', 'business']
