// Улучшения пользовательского опыта

// Конфигурация UX
const UX_CONFIG = {
    notificationDuration: 5000,
    progressBarColor: '#22c55e',
    darkThemeClass: 'dark-theme',
    accessibilityClass: 'high-contrast'
};

// Система уведомлений
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.notifications = [];
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = UX_CONFIG.notificationDuration) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 15px 20px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            cursor: pointer;
            position: relative;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">×</button>
            </div>
        `;
        
        this.container.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }
        
        return notification;
    }
    
    hide(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
    
    getBackgroundColor(type) {
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }
}

// Прогресс-бар чтения
class ReadingProgressBar {
    constructor() {
        this.bar = this.createBar();
        this.init();
    }
    
    createBar() {
        const bar = document.createElement('div');
        bar.id = 'reading-progress-bar';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: ${UX_CONFIG.progressBarColor};
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(bar);
        return bar;
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
    }
    
    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        this.bar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// Система темной темы
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
    }
    
    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        toggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: ${this.currentTheme === 'dark' ? '#374151' : '#ffffff'};
            color: ${this.currentTheme === 'dark' ? '#ffffff' : '#374151'};
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        toggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        document.body.appendChild(toggle);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            document.body.classList.add(UX_CONFIG.darkThemeClass);
            this.updateThemeToggle('☀️', '#374151', '#ffffff');
        } else {
            document.body.classList.remove(UX_CONFIG.darkThemeClass);
            this.updateThemeToggle('🌙', '#ffffff', '#374151');
        }
    }
    
    updateThemeToggle(icon, bgColor, textColor) {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = icon;
            toggle.style.background = bgColor;
            toggle.style.color = textColor;
        }
    }
}

// Система доступности
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.createAccessibilityPanel();
        this.addKeyboardNavigation();
        this.addScreenReaderSupport();
    }
    
    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: none;
        `;
        
        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0; font-size: 16px;">Настройки доступности</h3>
            <div style="margin-bottom: 10px;">
                <label>
                    <input type="checkbox" id="high-contrast-toggle"> Высокий контраст
                </label>
            </div>
            <div style="margin-bottom: 10px;">
                <label>
                    <input type="checkbox" id="large-text-toggle"> Крупный текст
                </label>
            </div>
            <div style="margin-bottom: 10px;">
                <label>
                    <input type="checkbox" id="reduced-motion-toggle"> Уменьшить анимации
                </label>
            </div>
            <button onclick="this.parentElement.style.display='none'" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Закрыть</button>
        `;
        
        document.body.appendChild(panel);
        
        // Обработчики переключателей
        document.getElementById('high-contrast-toggle').addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });
        
        document.getElementById('large-text-toggle').addEventListener('change', (e) => {
            this.toggleLargeText(e.target.checked);
        });
        
        document.getElementById('reduced-motion-toggle').addEventListener('change', (e) => {
            this.toggleReducedMotion(e.target.checked);
        });
    }
    
    toggleHighContrast(enabled) {
        if (enabled) {
            document.body.classList.add(UX_CONFIG.accessibilityClass);
        } else {
            document.body.classList.remove(UX_CONFIG.accessibilityClass);
        }
    }
    
    toggleLargeText(enabled) {
        if (enabled) {
            document.body.style.fontSize = '18px';
        } else {
            document.body.style.fontSize = '';
        }
    }
    
    toggleReducedMotion(enabled) {
        if (enabled) {
            document.body.style.setProperty('--reduced-motion', 'reduced');
        } else {
            document.body.style.removeProperty('--reduced-motion');
        }
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + A - открыть панель доступности
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                const panel = document.getElementById('accessibility-panel');
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
            
            // Escape - закрыть модальные окна
            if (e.key === 'Escape') {
                const modal = document.getElementById('modal');
                if (modal && modal.style.display === 'block') {
                    closeModal();
                }
            }
        });
    }
    
    addScreenReaderSupport() {
        // Добавление ARIA-атрибутов
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });
        
        // Добавление skip links
        this.addSkipLinks();
    }
    
    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.innerHTML = `
            <a href="#main-content" style="position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; z-index: 10000;" onfocus="this.style.top='6px'">Перейти к основному содержанию</a>
        `;
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
}

// Система обратной связи
class FeedbackSystem {
    constructor() {
        this.createFeedbackButton();
    }
    
    createFeedbackButton() {
        const button = document.createElement('button');
        button.id = 'feedback-button';
        button.innerHTML = '💬';
        button.title = 'Оставить отзыв';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            background: ${UX_CONFIG.progressBarColor};
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            this.showFeedbackForm();
        });
        
        document.body.appendChild(button);
    }
    
    showFeedbackForm() {
        const form = document.createElement('div');
        form.id = 'feedback-form';
        form.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 400px;
            width: 90%;
        `;
        
        form.innerHTML = `
            <h3 style="margin: 0 0 20px 0;">Оставить отзыв</h3>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Ваше имя:</label>
                <input type="text" id="feedback-name" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Оценка:</label>
                <div style="display: flex; gap: 10px;">
                    ${[1,2,3,4,5].map(num => `<button onclick="setRating(${num})" class="rating-btn" data-rating="${num}">⭐</button>`).join('')}
                </div>
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px;">Сообщение:</label>
                <textarea id="feedback-message" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"></textarea>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="submitFeedback()" style="background: ${UX_CONFIG.progressBarColor}; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Отправить</button>
                <button onclick="closeFeedbackForm()" style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Отмена</button>
            </div>
        `;
        
        document.body.appendChild(form);
        
        // Добавляем функции в глобальную область
        window.setRating = (rating) => {
            document.querySelectorAll('.rating-btn').forEach(btn => {
                btn.style.opacity = btn.dataset.rating <= rating ? '1' : '0.3';
            });
            window.selectedRating = rating;
        };
        
        window.submitFeedback = () => {
            const name = document.getElementById('feedback-name').value;
            const message = document.getElementById('feedback-message').value;
            const rating = window.selectedRating || 0;
            
            if (name && message) {
                // Отправка отзыва (можно подключить к серверу)
                console.log('Feedback submitted:', { name, message, rating });
                notifications.show('Спасибо за отзыв!', 'success');
                closeFeedbackForm();
            } else {
                notifications.show('Пожалуйста, заполните все поля', 'error');
            }
        };
        
        window.closeFeedbackForm = () => {
            document.getElementById('feedback-form').remove();
        };
    }
}

// Инициализация всех UX улучшений
function initUXEnhancements() {
    // Инициализация систем
    window.notifications = new NotificationSystem();
    window.readingProgress = new ReadingProgressBar();
    window.themeManager = new ThemeManager();
    window.accessibilityManager = new AccessibilityManager();
    window.feedbackSystem = new FeedbackSystem();
    
    // Добавление CSS для темной темы
    const darkThemeCSS = `
        .dark-theme {
            background: #1f2937 !important;
            color: #f9fafb !important;
        }
        .dark-theme .section-light {
            background: rgba(31, 41, 55, 0.95) !important;
            color: #f9fafb !important;
        }
        .dark-theme .section-dark {
            background: rgba(17, 24, 39, 0.95) !important;
            color: #f9fafb !important;
        }
        .dark-theme .card {
            background: rgba(55, 65, 81, 0.9) !important;
            color: #f9fafb !important;
        }
        .dark-theme .btn {
            background: linear-gradient(135deg, #059669, #047857) !important;
        }
        .dark-theme .btn-secondary {
            background: rgba(75, 85, 99, 0.9) !important;
            border-color: #6b7280 !important;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = darkThemeCSS;
    document.head.appendChild(style);
    
    // CSS для высокой контрастности
    const highContrastCSS = `
        .high-contrast {
            filter: contrast(150%) !important;
        }
        .high-contrast .btn {
            border: 2px solid #000 !important;
        }
        .high-contrast .card {
            border: 2px solid #000 !important;
        }
    `;
    
    const contrastStyle = document.createElement('style');
    contrastStyle.textContent = highContrastCSS;
    document.head.appendChild(contrastStyle);
    
    // Приветственное уведомление
    setTimeout(() => {
        notifications.show('Добро пожаловать! Используйте Alt+A для настроек доступности', 'info', 8000);
    }, 2000);
}

// Экспорт функций
window.uxEnhancements = {
    notifications: null,
    readingProgress: null,
    themeManager: null,
    accessibilityManager: null,
    feedbackSystem: null
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initUXEnhancements);
