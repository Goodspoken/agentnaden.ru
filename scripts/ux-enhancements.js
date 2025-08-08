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



// Инициализация всех UX улучшений
function initUXEnhancements() {
    // Инициализация систем
    window.notifications = new NotificationSystem();
    window.readingProgress = new ReadingProgressBar();
    window.accessibilityManager = new AccessibilityManager();
    

    
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
    

}

// Экспорт функций
window.uxEnhancements = {
    notifications: null,
    readingProgress: null,
    accessibilityManager: null
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initUXEnhancements);
