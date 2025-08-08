# 📊 НАСТРОЙКА АНАЛИТИКИ

## ✅ ЧТО УЖЕ ГОТОВО

### Яндекс.Вебмастер:
- ✅ Файл верификации: `yandex_016025d5af8089d7.html`
- ✅ Код верификации: `016025d5af8089d7`

---

## 🔧 ЧТО НУЖНО НАСТРОИТЬ

### 1. Google Analytics

#### Шаг 1: Создать аккаунт
1. Перейти на [analytics.google.com](https://analytics.google.com)
2. Создать аккаунт для агентства
3. Создать ресурс для домена `agentnaden.ru`

#### Шаг 2: Получить ID
- ID будет в формате: `G-XXXXXXXXXX`
- Скопировать ID

#### Шаг 3: Добавить в код
Заменить `YOUR_GA_ID` на полученный ID в `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Яндекс.Метрика

#### Шаг 1: Создать счетчик
1. Перейти на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Создать новый счетчик для `agentnaden.ru`
3. Выбрать тип: "Сайт"

#### Шаг 2: Получить ID
- ID будет в формате: `XXXXXXXXXX` (цифры)
- Скопировать ID

#### Шаг 3: Добавить в код
Заменить `YOUR_YM_ID` на полученный ID в `index.html`:

```html
<script type="text/javascript">
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=XXXXXXXXXX', 'ym');
    ym(XXXXXXXXXX, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
```

---

## 🎯 НАСТРОЙКА ЦЕЛЕЙ

### Google Analytics цели:
- Звонки (события с телефонных ссылок)
- Переходы в мессенджеры
- Отправка форм
- Просмотр услуг

### Яндекс.Метрика цели:
- Звонки
- Переходы в WhatsApp/Telegram
- Просмотр контактов
- Клики по услугам

---

## 📱 ДОПОЛНИТЕЛЬНО

### Google Search Console:
- Добавить DNS запись: `google-site-verification=vCRIZzT7TuIEDosMHDL0ik9qvXKztQkI`

### Яндекс.Вебмастер:
- Добавить DNS запись: `yandex-verification: 016025d5af8089d7`

---

## ✅ ПРОВЕРКА

После настройки проверить:
1. Загрузка страницы без ошибок
2. Отображение данных в аналитике
3. Работа целей
4. Корректность отслеживания

**Готово!** 🚀

