// Дополнительные меры безопасности

// Rate limiting для форм
const RATE_LIMIT = {
    maxSubmitsPerHour: 5,
    maxSubmitsPerDay: 20,
    cooldownMs: 60000 // 1 минута
};

// Хранение данных о попытках отправки
const submitHistory = {
    hourly: new Map(),
    daily: new Map(),
    lastSubmit: 0
};

// Очистка старых записей
function cleanupHistory() {
    const now = Date.now();
    const hourAgo = now - 3600000; // 1 час
    const dayAgo = now - 86400000; // 24 часа
    
    // Очистка почасовой истории
    for (const [key, timestamp] of submitHistory.hourly) {
        if (timestamp < hourAgo) {
            submitHistory.hourly.delete(key);
        }
    }
    
    // Очистка дневной истории
    for (const [key, timestamp] of submitHistory.daily) {
        if (timestamp < dayAgo) {
            submitHistory.daily.delete(key);
        }
    }
}

// Проверка rate limiting
function checkRateLimit(identifier) {
    cleanupHistory();
    
    const now = Date.now();
    const hourlyCount = submitHistory.hourly.get(identifier) || 0;
    const dailyCount = submitHistory.daily.get(identifier) || 0;
    
    // Проверка лимитов
    if (hourlyCount >= RATE_LIMIT.maxSubmitsPerHour) {
        return { allowed: false, reason: 'Превышен лимит отправок в час' };
    }
    
    if (dailyCount >= RATE_LIMIT.maxSubmitsPerDay) {
        return { allowed: false, reason: 'Превышен лимит отправок в день' };
    }
    
    // Проверка cooldown
    if (now - submitHistory.lastSubmit < RATE_LIMIT.cooldownMs) {
        return { allowed: false, reason: 'Подождите минуту перед следующей отправкой' };
    }
    
    return { allowed: true };
}

// Обновление счетчиков
function updateRateLimit(identifier) {
    const now = Date.now();
    
    // Обновление почасового счетчика
    const hourlyCount = submitHistory.hourly.get(identifier) || 0;
    submitHistory.hourly.set(identifier, hourlyCount + 1);
    
    // Обновление дневного счетчика
    const dailyCount = submitHistory.daily.get(identifier) || 0;
    submitHistory.daily.set(identifier, dailyCount + 1);
    
    submitHistory.lastSubmit = now;
}

// Защита от автоматических ботов
function detectBot() {
    const botIndicators = [
        !navigator.userAgent,
        !navigator.language,
        !window.screen,
        !window.innerWidth,
        navigator.webdriver,
        window.chrome && window.chrome.runtime,
        window.outerHeight === 0,
        window.outerWidth === 0
    ];
    
    return botIndicators.some(indicator => indicator);
}

// Проверка поведения пользователя
function validateUserBehavior() {
    const suspiciousPatterns = [
        // Слишком быстрые клики
        (() => {
            const clicks = window.clickHistory || [];
            const recentClicks = clicks.filter(time => Date.now() - time < 1000);
            return recentClicks.length > 10;
        })(),
        
        // Отсутствие движения мыши
        (() => {
            return !window.mouseMovementDetected;
        })(),
        
        // Слишком быстрое заполнение формы
        (() => {
            const formStartTime = window.formStartTime || Date.now();
            return Date.now() - formStartTime < 2000;
        })()
    ];
    
    return suspiciousPatterns.some(pattern => pattern);
}

// Инициализация защиты
function initSecurity() {
    // Отслеживание кликов
    window.clickHistory = [];
    document.addEventListener('click', () => {
        window.clickHistory.push(Date.now());
        if (window.clickHistory.length > 20) {
            window.clickHistory.shift();
        }
    });
    
    // Отслеживание движения мыши
    window.mouseMovementDetected = false;
    document.addEventListener('mousemove', () => {
        window.mouseMovementDetected = true;
    });
    
    // Отслеживание начала заполнения формы
    document.addEventListener('focus', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            window.formStartTime = Date.now();
        }
    });
    
    // Проверка на бота при загрузке
    if (detectBot()) {
        console.warn('Bot detected');
        // Можно добавить дополнительные меры
    }
}

// Экспорт функций
window.security = {
    checkRateLimit,
    updateRateLimit,
    detectBot,
    validateUserBehavior,
    initSecurity
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initSecurity);
