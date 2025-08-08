// Глобальная обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Отправка ошибки в аналитику
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': false
        });
    }
});

// Обработка необработанных промисов
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Навигация - инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация навигации после загрузки секций
    setTimeout(() => {
        try {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                });
            }
        } catch (error) {
            console.error('Navigation initialization error:', error);
        }
    }, 1000); // Даем время на загрузку секций
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ - инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация FAQ после загрузки секций
    setTimeout(() => {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                
                // Закрываем все остальные
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        item.querySelector('.faq-answer').classList.remove('active');
                    }
                });
                
                // Переключаем текущий
                faqItem.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }, 1000); // Даем время на загрузку секций
});

// Модальные окна
function openModal(type) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    let content = '';
    
    switch(type) {
        case 'consultation':
            content = `
                <h2>Заказать консультацию</h2>
                <p>Оставьте заявку, и я свяжусь с вами в течение 30 минут для бесплатной консультации.</p>
                <form id="modal-form">
                    <div class="form-group">
                        <label for="modal-name">Имя *</label>
                        <input type="text" id="modal-name" required>
                    </div>
                    <div class="form-group">
                        <label for="modal-phone">Телефон *</label>
                        <input type="tel" id="modal-phone" required>
                    </div>
                    <button type="submit" class="btn">Отправить заявку</button>
                </form>
            `;
            break;
        case 'services':
            content = `
                <h2>Мои услуги</h2>
                <div class="card-grid">
                    <div class="card">
                        <h3>Агент на час</h3>
                        <p>Консультация и проверка документов</p>
                        <p class="price">от 3 000₽</p>
                    </div>
                    <div class="card">
                        <h3>Агент на день</h3>
                        <p>Полное сопровождение сделки</p>
                        <p class="price">от 9 000₽</p>
                    </div>
                    <div class="card">
                        <h3>Агент на сделку</h3>
                        <p>Комплексное обслуживание</p>
                        <p class="price">от 7 000₽</p>
                    </div>
                </div>
            `;
            break;
        case 'check-service':
            content = `
                <h2>Проверка документов при покупке квартиры</h2>
                <p><strong>Комплексная проверка всех документов</strong> перед покупкой недвижимости.</p>
                <h3>Что входит в проверку:</h3>
                <ul>
                    <li>Проверка свидетельства о праве собственности</li>
                    <li>Анализ выписки из ЕГРН</li>
                    <li>Проверка технического паспорта</li>
                    <li>Контроль документов продавца</li>
                </ul>
                <p class="price">Стоимость: от 3 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать проверку</button>
            `;
            break;
        case 'deal-service':
            content = `
                <h2>Сопровождение сделки с недвижимостью</h2>
                <p><strong>Полное сопровождение</strong> от начала до завершения сделки.</p>
                <h3>Что входит в сопровождение:</h3>
                <ul>
                    <li>Подготовка к сделке</li>
                    <li>Сопровождение в банк</li>
                    <li>Контроль регистрации</li>
                    <li>Получение документов</li>
                </ul>
                <p class="price">Стоимость: от 7 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать сопровождение</button>
            `;
            break;
        case 'buy-service':
            content = `
                <h2>Помощь при покупке квартиры</h2>
                <p><strong>Профессиональная помощь</strong> на всех этапах покупки недвижимости.</p>
                <h3>Что входит в помощь:</h3>
                <ul>
                    <li>Подбор вариантов</li>
                    <li>Оценка недвижимости</li>
                    <li>Проверка документов</li>
                    <li>Сопровождение сделки</li>
                </ul>
                <p class="price">Стоимость: от 5 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Получить помощь</button>
            `;
            break;
        case 'protection-service':
            content = `
                <h2>Защита от мошенников недвижимость</h2>
                <p><strong>Надежная защита</strong> от мошеннических схем при покупке недвижимости.</p>
                <h3>Что входит в защиту:</h3>
                <ul>
                    <li>Проверка продавца</li>
                    <li>Анализ схем мошенников</li>
                    <li>Проверка документов</li>
                    <li>Правовая защита</li>
                </ul>
                <p class="price">Стоимость: от 3 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Защитить сделку</button>
            `;
            break;
        case 'agent-check':
            content = `
                <h2>Проверка агента недвижимости</h2>
                <p><strong>Проверка надежности</strong> агента по недвижимости.</p>
                <h3>Что входит в проверку:</h3>
                <ul>
                    <li>Проверка лицензии</li>
                    <li>Анализ репутации</li>
                    <li>Проверка отзывов</li>
                    <li>Контроль договора</li>
                </ul>
                <p class="price">Стоимость: от 2 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Проверить агента</button>
            `;
            break;
        case 'safe-buy':
            content = `
                <h2>Спокойная покупка квартиры</h2>
                <p><strong>Максимальная защита</strong> и спокойствие при покупке недвижимости.</p>
                <h3>Что входит в услугу:</h3>
                <ul>
                    <li>Полная проверка недвижимости</li>
                    <li>Сопровождение сделки</li>
                    <li>Защита от мошенников</li>
                    <li>Гарантия безопасности</li>
                </ul>
                <p class="price">Стоимость: от 7 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Купить спокойно</button>
            `;
            break;
        case 'legal-service':
            content = `
                <h2>Юридическое сопровождение сделки</h2>
                <p><strong>Юрист по недвижимости</strong> на сделку обеспечивает правовую защиту.</p>
                <h3>Что входит в сопровождение:</h3>
                <ul>
                    <li>Проверка документов</li>
                    <li>Составление договоров</li>
                    <li>Регистрация в Росреестре</li>
                    <li>Правовая защита</li>
                </ul>
                <p class="price">Стоимость: от 5 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Получить защиту</button>
            `;
            break;
        case 'risk-check':
            content = `
                <h2>Проверка недвижимости на риски</h2>
                <p><strong>Полная проверка квартиры</strong> перед покупкой.</p>
                <h3>Что входит в проверку:</h3>
                <ul>
                    <li>Проверка истории квартиры</li>
                    <li>Анализ всех собственников</li>
                    <li>Проверка обременений</li>
                    <li>Детальный отчет</li>
                </ul>
                <p class="price">Стоимость: от 4 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Проверить риски</button>
            `;
            break;
        case 'mortgage-service':
            content = `
                <h2>Сопровождение ипотечной сделки</h2>
                <p><strong>Помощь с ипотекой</strong> от подачи заявки до получения ключей.</p>
                <h3>Что входит в сопровождение:</h3>
                <ul>
                    <li>Подбор банка и программы</li>
                    <li>Сбор документов</li>
                    <li>Сопровождение в банк</li>
                    <li>Контроль процесса</li>
                </ul>
                <p class="price">Стоимость: от 6 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Получить помощь</button>
            `;
            break;
        case 'hour-service':
            content = `
                <h2>Агент на час</h2>
                <p>Оперативная помощь опытного риелтора для решения срочных вопросов.</p>
                <h3>Что входит в услугу:</h3>
                <ul>
                    <li>Консультация по вопросам недвижимости</li>
                    <li>Проверка документов</li>
                    <li>Оценка рисков сделки</li>
                    <li>Рекомендации по дальнейшим действиям</li>
                </ul>
                                    <p class="price">Стоимость: от 3 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать</button>
            `;
            break;
        case 'day-service':
            content = `
                <h2>Агент на день</h2>
                <p>Полное сопровождение сделки в течение одного дня.</p>
                <h3>Что входит в услугу:</h3>
                <ul>
                    <li>Проверка всех документов</li>
                    <li>Сопровождение в банк</li>
                    <li>Помощь в оформлении ипотеки</li>
                    <li>Контроль процесса сделки</li>
                </ul>
                                    <p class="price">Стоимость: от 9 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать</button>
            `;
            break;
        case 'deal-service':
            content = `
                <h2>Агент на сделку</h2>
                <p>Комплексное обслуживание на всех этапах сделки.</p>
                <h3>Что входит в услугу:</h3>
                <ul>
                    <li>Полная проверка недвижимости</li>
                    <li>Проверка продавца</li>
                    <li>Сопровождение в банк и Росреестр</li>
                    <li>Контроль регистрации сделки</li>
                    <li>Гарантия безопасности</li>
                </ul>
                                    <p class="price">Стоимость: от 7 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать</button>
            `;
            break;
        case 'check-service':
            content = `
                <h2>Проверка недвижимости</h2>
                <p>Полная проверка истории квартиры, документов, обременений и прав собственности.</p>
                <ul>
                    <li>Проверка документов в Росреестре</li>
                    <li>Анализ истории собственности</li>
                    <li>Проверка обременений и арестов</li>
                    <li>Верификация продавца</li>
                </ul>
                <p class="price">Стоимость: от 3 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать проверку</button>
            `;
            break;
        case 'mortgage-service':
            content = `
                <h2>Сопровождение ипотеки</h2>
                <p>Помощь в получении ипотеки, сопровождение в банке, проверка документов для кредита.</p>
                <ul>
                    <li>Подбор оптимальной ипотечной программы</li>
                    <li>Сопровождение в банке</li>
                    <li>Проверка документов для кредита</li>
                    <li>Консультации по условиям ипотеки</li>
                </ul>
                <p class="price">Стоимость: от 5 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать сопровождение</button>
            `;
            break;
        case 'family-service':
            content = `
                <h2>Сложные семейные сделки</h2>
                <p>Профессиональное сопровождение наследственных сделок и раздела имущества при разводе.</p>
                
                <h3>Наследственные сделки:</h3>
                <ul>
                    <li>Помощь в оформлении наследства</li>
                    <li>Сопровождение сделок с наследственной недвижимостью</li>
                    <li>Решение споров между наследниками</li>
                    <li>Проверка документов наследодателя</li>
                    <li>Оформление в Росреестре</li>
                </ul>
                
                <h3>Раздел имущества при разводе:</h3>
                <ul>
                    <li>Оценка стоимости недвижимости</li>
                    <li>Разработка схемы раздела</li>
                    <li>Сопровождение сделок по разделу</li>
                    <li>Защита интересов всех сторон</li>
                    <li>Юридическое сопровождение</li>
                </ul>
                
                <p class="price">Стоимость: от 10 000₽</p>
                <button class="btn" onclick="openModal('consultation')">Заказать услугу</button>
            `;
            break;
            


        case 'calculator':
            content = `
                <h2>Калькулятор ипотеки</h2>
                <p>Рассчитайте ежемесячный платеж по ипотеке онлайн.</p>
                <form id="calculator-form">
                    <div class="form-group">
                        <label for="loan-amount">Сумма кредита (₽):</label>
                        <input type="number" id="loan-amount" min="1000000" step="100000" value="1000000">
                    </div>
                    <div class="form-group">
                        <label for="interest-rate">Процентная ставка (%):</label>
                        <input type="number" id="interest-rate" min="1" max="20" step="0.1" value="10">
                    </div>
                    <div class="form-group">
                        <label for="loan-term">Срок кредита (лет):</label>
                        <input type="number" id="loan-term" min="1" max="30" step="1" value="20">
                    </div>
                    <button type="submit" class="btn">Рассчитать</button>
                </form>
                <div id="calculator-results"></div>
            `;
            break;
                        case 'checklist':
                    content = `
                        <h2>Чек-лист покупки недвижимости</h2>
                        <p>Ниже представлен список документов, которые необходимо проверить перед покупкой квартиры.</p>
                        <ul>
                            <li>Паспорт продавца</li>
                            <li>Документы на квартиру (свидетельство о собственности, выписка из ЕГРН)</li>
                            <li>Договор купли-продажи</li>
                            <li>Документы на ипотеку (если применяется)</li>
                            <li>Справка об отсутствии обременений</li>
                            <li>Техпаспорт</li>
                            <li>Акт приема-передачи</li>
                            <li>Документы на право собственности</li>
                        </ul>
                        <p>Я помогу вам собрать и проверить все эти документы.</p>
                        <button class="btn" onclick="openModal('consultation')">Заказать проверку</button>
                    `;
                    break;

    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    
    // Обработка формы в модальном окне
    const modalForm = document.getElementById('modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('modal-name').value.trim();
            const phone = document.getElementById('modal-phone').value.trim();
            
            // Валидация формы
            const errors = validateForm(name, phone);
            if (errors.length > 0) {
                alert('Ошибки в форме:\n' + errors.join('\n'));
                return false;
            }
            
                // Отправка данных (имитация)
    submitFormData({ name, phone, source: 'modal' });
    
    alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.');
    closeModal();
}

// Функция отправки данных формы
function submitFormData(data) {
    // Отправка в Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': data.source,
            'value': 1
        });
    }
    
    // Отправка в Яндекс.Метрику
    if (typeof ym !== 'undefined') {
        ym(103595459, 'reachGoal', 'form_submit', {
            source: data.source,
            name: data.name
        });
    }
    
    // Логирование для отладки
    console.log('Form submitted:', data);
    
    // Здесь можно добавить реальную отправку на сервер
    // fetch('/api/submit-form', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
        });
    }

    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const loanAmount = document.getElementById('loan-amount').value;
            const interestRate = document.getElementById('interest-rate').value;
            const loanTerm = document.getElementById('loan-term').value;

            const monthlyPayment = (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + (interestRate / 100 / 12), -loanTerm * 12));
            const totalPayment = monthlyPayment * loanTerm * 12;

            document.getElementById('calculator-results').innerHTML = `
                <p>Ежемесячный платеж: <strong>${monthlyPayment.toFixed(2)} ₽</strong></p>
                <p>Общая сумма выплат: <strong>${totalPayment.toFixed(2)} ₽</strong></p>
            `;
        });
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Валидация форм
function validateForm(name, phone) {
    const errors = [];
    
    // Валидация имени
    if (!name || name.length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
    }
    if (name.length > 50) {
        errors.push('Имя слишком длинное (максимум 50 символов)');
    }
    if (!/^[а-яёА-ЯЁ\s-]+$/.test(name)) {
        errors.push('Имя должно содержать только русские буквы, пробелы и дефисы');
    }
    
    // Валидация телефона
    if (!phone) {
        errors.push('Введите номер телефона');
    } else {
        const phoneRegex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            errors.push('Введите корректный номер телефона');
        }
    }
    
    return errors;
}

// Плавающая форма
function submitFloatingForm() {
    const name = document.getElementById('floating-name').value.trim();
    const phone = document.getElementById('floating-phone').value.trim();
    const honeypot = document.querySelector('input[name="website"]').value;
    
    // Проверка honeypot поля (боты заполняют скрытые поля)
    if (honeypot) {
        console.log('Bot detected via honeypot');
        return false;
    }
    
    // Валидация формы
    const errors = validateForm(name, phone);
    if (errors.length > 0) {
        alert('Ошибки в форме:\n' + errors.join('\n'));
        return false;
    }
    
    // Проверка reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('Пожалуйста, подтвердите, что вы не робот');
        return false;
    }
    
    // Улучшенная валидация
    if (!name || name.length < 2) {
        alert('Имя должно содержать минимум 2 символа');
        return false;
    }
    
    if (!phone || phone.length < 10) {
        alert('Введите корректный номер телефона');
        return false;
    }
    
    // Проверка формата телефона (базовая)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Введите корректный номер телефона');
        return false;
    }
    
    // Rate limiting проверка
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
        alert('Пожалуйста, подождите минуту перед следующей отправкой');
        return false;
    }
    
    if (formSubmitCount >= MAX_SUBMITS_PER_HOUR) {
        alert('Превышен лимит отправок. Попробуйте позже.');
        return false;
    }
    
    // Защита от множественных отправок
    const submitButton = document.querySelector('.floating-form .btn');
    if (submitButton.disabled) {
        return false;
    }
    
    // Блокируем кнопку
    submitButton.disabled = true;
    submitButton.textContent = 'Отправляется...';
    
    // Обновляем счетчики
    formSubmitCount++;
    lastSubmitTime = now;
    
    // Проверка безопасности
    if (window.security && window.security.detectBot()) {
        console.warn('Bot detected in floating form');
        return false;
    }
    
    if (window.security && window.security.validateUserBehavior()) {
        console.warn('Suspicious user behavior detected');
        return false;
    }
    
    // Rate limiting
    const rateLimitCheck = window.security ? window.security.checkRateLimit('floating_form') : { allowed: true };
    if (!rateLimitCheck.allowed) {
        if (window.notifications) {
            window.notifications.show(rateLimitCheck.reason, 'error');
        } else {
            alert(rateLimitCheck.reason);
        }
        return false;
    }
    
    // Обновление rate limiting
    if (window.security) {
        window.security.updateRateLimit('floating_form');
    }
    
    // Отправка данных
    submitFormData({ name, phone, source: 'floating' });
    
    setTimeout(() => {
        if (window.notifications) {
            window.notifications.show('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.', 'success');
        } else {
            alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.');
        }
        document.getElementById('floating-name').value = '';
        document.getElementById('floating-phone').value = '';
        grecaptcha.reset();
        
        // Разблокируем кнопку
        submitButton.disabled = false;
        submitButton.textContent = 'Отправить заявку';
    }, 1000);
}

// Rate limiting для форм
let formSubmitCount = 0;
let lastSubmitTime = 0;
const MAX_SUBMITS_PER_HOUR = 5;
const SUBMIT_COOLDOWN = 60000; // 1 минута

// Показ плавающей формы при скролле
window.addEventListener('scroll', () => {
    const floatingForm = document.getElementById('floating-form');
    if (window.scrollY > 300) {
        floatingForm.classList.add('active');
    } else {
        floatingForm.classList.remove('active');
    }
});

// Анимации при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .review').forEach(el => {
    observer.observe(el);
});

// Изменение навигации при скролле
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});



// Кнопка "Наверх"
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Показ/скрытие кнопки "Наверх"
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

// Инициализация кнопок "Показать ещё" при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики через делегирование событий
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'show-more-btn') {
            toggleMoreServices();
        }
        if (e.target && e.target.id === 'services-links-toggle') {
            toggleMoreLinks();
        }
    });
    
    // Также пытаемся найти кнопки напрямую
    setTimeout(() => {
        const showMoreBtn = document.getElementById('show-more-btn');
        if (showMoreBtn) {
        
            showMoreBtn.addEventListener('click', toggleMoreServices);
        }
        

    }, 1000);
});

// Делаем функции глобально доступными
window.toggleMoreServices = toggleMoreServices;
window.toggleMoreLinks = toggleMoreLinks;
window.openModal = openModal;
window.closeModal = closeModal;

// Функция для переключения показа услуг
function toggleMoreServices() {
    const hiddenServices = document.querySelectorAll('.hidden-service');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreText = document.getElementById('show-more-text');
    const showMoreIcon = document.getElementById('show-more-icon');
    
    const isExpanded = showMoreBtn.classList.contains('expanded');
    
    if (!isExpanded) {
        // Показываем все услуги
        hiddenServices.forEach((service, index) => {
            setTimeout(() => {
                service.classList.add('show');
            }, index * 150); // Анимация появления с задержкой
        });
        
        showMoreBtn.classList.add('expanded');
        showMoreText.textContent = 'Скрыть услуги';
        
        // Прокручиваем к кнопке для лучшего UX
        setTimeout(() => {
            showMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 800);
    } else {
        // Скрываем дополнительные услуги
        hiddenServices.forEach(service => {
            service.classList.remove('show');
        });
        
        showMoreBtn.classList.remove('expanded');
        showMoreText.textContent = 'Показать ещё услуги';
    }
}

// Функция для переключения полезных сервисов
function toggleMoreLinks() {
    const hiddenLinks = document.querySelectorAll('.hidden-service-link');
    const servicesLinksToggle = document.getElementById('services-links-toggle');
    
    const isExpanded = servicesLinksToggle.classList.contains('expanded');
    
    if (!isExpanded) {
        hiddenLinks.forEach(link => {
            link.classList.add('show');
        });
        
        servicesLinksToggle.classList.add('expanded');
        servicesLinksToggle.textContent = 'Полезные сервисы';
    } else {
        hiddenLinks.forEach(link => {
            link.classList.remove('show');
        });
        
        servicesLinksToggle.classList.remove('expanded');
        servicesLinksToggle.textContent = 'Полезные сервисы';
    }
}

// Функция для переключения карты сайта
function toggleSitemap() {
    const content = document.getElementById('sitemap-content');
    const toggle = document.querySelector('.sitemap-toggle');
    
    if (content && toggle) {
        const isActive = content.classList.contains('active');
        
        if (isActive) {
            // Скрываем
            content.classList.remove('active');
            toggle.innerHTML = 'Карта сайта';
        } else {
            // Показываем
            content.classList.add('active');
            toggle.innerHTML = 'Карта сайта';
        }
    }
}