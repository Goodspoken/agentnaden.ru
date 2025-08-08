// Расширенная аналитика и статистика

// Конфигурация аналитики
const ANALYTICS_CONFIG = {
    sessionTimeout: 30 * 60 * 1000, // 30 минут
    scrollThreshold: 25, // 25% прокрутки
    timeOnPageThreshold: 10 * 1000, // 10 секунд
    conversionGoals: {
        formSubmit: 'form_submit',
        phoneClick: 'phone_click',
        modalOpen: 'modal_open',
        scrollDepth: 'scroll_depth',
        timeOnPage: 'time_on_page'
    }
};

// Данные сессии
let sessionData = {
    startTime: Date.now(),
    lastActivity: Date.now(),
    pageViews: 1,
    scrollDepth: 0,
    timeOnPage: 0,
    interactions: [],
    conversions: []
};

// Отслеживание времени на странице
function trackTimeOnPage() {
    const now = Date.now();
    sessionData.timeOnPage = now - sessionData.startTime;
    
    // Отправка в аналитику каждые 30 секунд
    if (sessionData.timeOnPage % 30000 < 1000) {
        sendAnalyticsEvent('time_on_page', {
            time_spent: Math.round(sessionData.timeOnPage / 1000),
            page: window.location.pathname
        });
    }
}

// Отслеживание прокрутки
function trackScroll() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercent > sessionData.scrollDepth) {
        sessionData.scrollDepth = scrollPercent;
        
        // Отправка при достижении порогов
        [25, 50, 75, 90].forEach(threshold => {
            if (scrollPercent >= threshold && !sessionData.conversions.includes(`scroll_${threshold}`)) {
                sessionData.conversions.push(`scroll_${threshold}`);
                sendAnalyticsEvent('scroll_depth', {
                    depth: threshold,
                    page: window.location.pathname
                });
            }
        });
    }
}

// Отслеживание кликов по телефону
function trackPhoneClicks() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="tel:"]') || e.target.closest('a[href^="tel:"]')) {
            sendAnalyticsEvent('phone_click', {
                phone: e.target.href || e.target.closest('a[href^="tel:"]').href,
                page: window.location.pathname
            });
        }
    });
}

// Отслеживание открытия модальных окон
function trackModalOpens() {
    const originalOpenModal = window.openModal;
    window.openModal = function(type) {
        sendAnalyticsEvent('modal_open', {
            modal_type: type,
            page: window.location.pathname
        });
        return originalOpenModal.apply(this, arguments);
    };
}

// Отслеживание поведения пользователя
function trackUserBehavior() {
    // Отслеживание кликов по кнопкам
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn') || e.target.closest('.btn')) {
            const buttonText = e.target.textContent || e.target.closest('.btn').textContent;
            sendAnalyticsEvent('button_click', {
                button_text: buttonText.trim(),
                page: window.location.pathname
            });
        }
    });
    
    // Отслеживание кликов по ссылкам
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            const targetSection = e.target.getAttribute('href');
            sendAnalyticsEvent('internal_link_click', {
                target_section: targetSection,
                page: window.location.pathname
            });
        }
    });
    
    // Отслеживание внешних ссылок
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="http"]') && !e.target.href.includes(window.location.hostname)) {
            sendAnalyticsEvent('external_link_click', {
                external_url: e.target.href,
                page: window.location.pathname
            });
        }
    });
}

// Отслеживание производительности
function trackPerformance() {
    // Отслеживание времени загрузки
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        sendAnalyticsEvent('page_load_time', {
            load_time: Math.round(loadTime),
            page: window.location.pathname
        });
    });
    
    // Отслеживание Core Web Vitals
    if ('PerformanceObserver' in window) {
        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            sendAnalyticsEvent('lcp', {
                lcp: Math.round(lastEntry.startTime),
                page: window.location.pathname
            });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                sendAnalyticsEvent('fid', {
                    fid: Math.round(entry.processingStart - entry.startTime),
                    page: window.location.pathname
                });
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list) => {
            let cls = 0;
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            sendAnalyticsEvent('cls', {
                cls: Math.round(cls * 1000) / 1000,
                page: window.location.pathname
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
}

// Отслеживание ошибок
function trackErrors() {
    window.addEventListener('error', (e) => {
        sendAnalyticsEvent('javascript_error', {
            error_message: e.message,
            error_file: e.filename,
            error_line: e.lineno,
            page: window.location.pathname
        });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        sendAnalyticsEvent('unhandled_promise_rejection', {
            error_message: e.reason,
            page: window.location.pathname
        });
    });
}

// Отправка событий в аналитику
function sendAnalyticsEvent(eventName, parameters = {}) {
    const eventData = {
        event: eventName,
        timestamp: Date.now(),
        session_id: getSessionId(),
        ...parameters
    };
    
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'user_engagement',
            event_label: parameters.page || window.location.pathname,
            value: parameters.value || 1,
            custom_parameters: parameters
        });
    }
    
    // Яндекс.Метрика
    if (typeof ym !== 'undefined') {
        ym(103595459, 'reachGoal', eventName, parameters);
    }
    
    // Локальное логирование
    console.log('Analytics Event:', eventData);
    
    // Сохранение в localStorage для офлайн-аналитики
    saveOfflineEvent(eventData);
}

// Генерация ID сессии
function getSessionId() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
}

// Сохранение офлайн событий
function saveOfflineEvent(eventData) {
    const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
    offlineEvents.push(eventData);
    
    // Ограничиваем количество сохраненных событий
    if (offlineEvents.length > 100) {
        offlineEvents.splice(0, 50);
    }
    
    localStorage.setItem('offline_analytics_events', JSON.stringify(offlineEvents));
}

// Отправка офлайн событий при восстановлении соединения
function sendOfflineEvents() {
    const offlineEvents = JSON.parse(localStorage.getItem('offline_analytics_events') || '[]');
    
    if (offlineEvents.length > 0 && navigator.onLine) {
        offlineEvents.forEach(event => {
            // Повторная отправка событий
            if (typeof gtag !== 'undefined') {
                gtag('event', event.event, {
                    event_category: 'offline_replay',
                    event_label: event.page,
                    value: 1
                });
            }
        });
        
        // Очистка отправленных событий
        localStorage.removeItem('offline_analytics_events');
    }
}

// Инициализация аналитики
function initAnalytics() {
    // Отслеживание времени на странице
    setInterval(trackTimeOnPage, 1000);
    
    // Отслеживание прокрутки
    window.addEventListener('scroll', trackScroll);
    
    // Отслеживание кликов по телефону
    trackPhoneClicks();
    
    // Отслеживание модальных окон
    trackModalOpens();
    
    // Отслеживание поведения пользователя
    trackUserBehavior();
    
    // Отслеживание производительности
    trackPerformance();
    
    // Отслеживание ошибок
    trackErrors();
    
    // Отправка офлайн событий при восстановлении соединения
    window.addEventListener('online', sendOfflineEvents);
    
    // Отправка события о начале сессии
    sendAnalyticsEvent('session_start', {
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
}

// Экспорт функций
window.analytics = {
    sendEvent: sendAnalyticsEvent,
    trackConversion: (goal) => sendAnalyticsEvent('conversion', { goal }),
    getSessionData: () => sessionData
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initAnalytics);
