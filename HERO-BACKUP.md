# Бэкап старого хедера

## Старый HTML (sections/hero.html):
```html
<!-- Hero секция -->
<section id="hero" class="hero">
    <div class="container">
        <h1>Агент на сделку СПб — экономия до 95%</h1>
        <div class="hero-description">
            <p class="hero-line-1">Разовое сопровождение (на час/день/сделку)</p>
                            <p class="hero-line-2">от <span class="price-highlight">3 000</span> до <span class="price-highlight">9 000 ₽</span></p>
            <p class="hero-line-3">Быстро, логично, прозрачно, спокойно, доступно.</p>
        </div>
        <div class="hero-buttons">
            <button class="btn" onclick="openModal('consultation')">Заказать консультацию</button>
            <button class="btn btn-secondary" onclick="openModal('services')">Узнать подробнее об услугах</button>
        </div>
    </div>
</section>
```

## Старые CSS стили (styles/main.css):
```css
.hero {
    background: linear-gradient(135deg, rgba(44, 62, 80, 0.9), rgba(52, 73, 94, 0.9));
    color: #ffffff;
    text-align: center;
    padding: 100px 0;
    position: relative;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../images/background-main.jpg') center/cover no-repeat;
    opacity: 0.3;
    z-index: -1;
}

.hero .container {
    position: relative;
    z-index: 1;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 30px;
    font-weight: 700;
}

.hero-description {
    margin-bottom: 40px;
}

.hero-line-1 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #e0e0e0;
}

.hero-line-2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffffff;
}

.hero-line-3 {
    font-size: 1.1rem;
    color: #bdc3c7;
}

.price-highlight {
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: #ffffff;
    padding: 5px 15px;
    border-radius: 25px;
    font-weight: 700;
    margin: 0 5px;
}

.hero-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}
```

## Как откатить:
1. Заменить содержимое `sections/hero.html` на старый HTML
2. Удалить новые стили `.hero-new` из `styles/main.css`
3. Удалить этот файл бэкапа

