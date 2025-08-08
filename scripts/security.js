// Базовая защита от брутфорса и мониторинг безопасности

// Отслеживание попыток отправки форм
let formAttempts = {
    count: 0,
    lastAttempt: 0,
    blocked: false
};

// Максимальное количество попыток за 5 минут
const MAX_ATTEMPTS = 10;
const BLOCK_DURATION = 5 * 60 * 1000; // 5 минут

// Функция проверки лимита попыток
function checkRateLimit() {
    const now = Date.now();
    
    // Сброс счетчика если прошло больше 5 минут
    if (now - formAttempts.lastAttempt > BLOCK_DURATION) {
        formAttempts.count = 0;
        formAttempts.blocked = false;
    }
    
    // Проверка лимита
    if (formAttempts.count >= MAX_ATTEMPTS) {
        formAttempts.blocked = true;
        return false;
    }
    
    formAttempts.count++;
    formAttempts.lastAttempt = now;
    return true;
}

// Функция блокировки форм
function blockForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';
        
        // Добавляем сообщение о блокировке
        const blockMessage = document.createElement('div');
        blockMessage.className = 'block-message';
        blockMessage.style.cssText = `
            color: #ef4444;
            text-align: center;
            padding: 10px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 4px;
            margin: 10px 0;
        `;
        blockMessage.textContent = 'Слишком много попыток. Попробуйте через 5 минут.';
        form.parentNode.insertBefore(blockMessage, form);
    });
}

// Функция разблокировки форм
function unblockForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
    });
    
    // Удаляем сообщения о блокировке
    const blockMessages = document.querySelectorAll('.block-message');
    blockMessages.forEach(msg => msg.remove());
}

// Мониторинг подозрительной активности
function monitorSuspiciousActivity() {
    // Отслеживание быстрых кликов
    let clickCount = 0;
    let lastClick = 0;
    
    document.addEventListener('click', (e) => {
        const now = Date.now();
        
        if (now - lastClick < 100) { // Меньше 100мс между кликами
            clickCount++;
            if (clickCount > 20) {
                console.warn('Подозрительная активность: слишком много быстрых кликов');
                // Можно добавить отправку в аналитику
            }
        } else {
            clickCount = 0;
        }
        
        lastClick = now;
    });
    
    // Отслеживание попыток отправки форм
    document.addEventListener('submit', (e) => {
        if (!checkRateLimit()) {
            e.preventDefault();
            blockForms();
            
            // Разблокировка через 5 минут
            setTimeout(() => {
                unblockForms();
            }, BLOCK_DURATION);
            
            return false;
        }
    });
}

// Защита от инъекций в формы
function sanitizeInput(input) {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .trim();
}

// Применение санитизации ко всем полям ввода
function applyInputSanitization() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            e.target.value = sanitizeInput(e.target.value);
        });
    });
}

// Инициализация защиты при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    monitorSuspiciousActivity();
    applyInputSanitization();
    
    console.log('🔒 Защита безопасности активирована');
});

// Экспорт функций для использования в других скриптах
window.security = {
    checkRateLimit,
    sanitizeInput,
    blockForms,
    unblockForms
};
