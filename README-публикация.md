# Как выложить сайт «Алгоритм дома»

Сайт статический: это просто папка с файлами. Хостинг бесплатный — GitHub Pages.

## 1. Один раз: GitHub
1. Зарегистрируйтесь на github.com (если ещё нет аккаунта).
2. Создайте репозиторий: кнопка «New», имя, например, `algoritm-doma`, тип Public.
3. На странице репозитория: «Add file» → «Upload files». Перетащите ВСЁ содержимое этой папки `site`
   (index.html, папки assets, algoritmy, kalkulyatory, o-proekte и остальное), не саму папку. Нажмите «Commit changes».
4. Settings → Pages → Source: «Deploy from a branch», Branch: `main`, папка `/ (root)` → Save.
5. Через 1–2 минуты сайт откроется по адресу `https://ВАШ-ЛОГИН.github.io/algoritm-doma/`.

## 2. Свой домен (когда купите)
1. У регистратора домена добавьте DNS-записи для GitHub Pages
   (A-записи на адреса GitHub и CNAME для www — список адресов на странице «Managing a custom domain» в справке GitHub).
2. В репозитории: Settings → Pages → Custom domain → впишите домен → Save, затем включите «Enforce HTTPS».
3. Скажите мне домен — я добавлю sitemap.xml и обновлю ссылки.

## 3. Обновления
После каждого выпуска я кладу новые и изменённые файлы в эту папку. Их нужно загрузить в репозиторий так же:
«Add file» → «Upload files» (файлы с тем же именем заменятся).

## Ссылка для описания ролика
Калькулятор: `<адрес сайта>/kalkulyatory/rezervnoe-pitanie/`
Алгоритм:    `<адрес сайта>/algoritmy/rezervnoe-pitanie/`
