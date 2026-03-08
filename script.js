// Мобильное меню
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Закрытие мобильного меню при клике на ссылку
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Учитываем высоту фиксированной навигации
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Валидация и отправка формы
const contactForm = document.getElementById('contact-form');
const successNotification = document.getElementById('success-notification');

// Маска для телефона
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value[0] === '7' || value[0] === '8') {
            value = value.substring(1);
        }
        
        if (value.length > 0) {
            formattedValue = '+7';
            if (value.length > 0) formattedValue += ' (' + value.substring(0, 3);
            if (value.length > 3) formattedValue += ') ' + value.substring(3, 6);
            if (value.length > 6) formattedValue += '-' + value.substring(6, 8);
            if (value.length > 8) formattedValue += '-' + value.substring(8, 10);
        }
    }
    
    e.target.value = formattedValue;
});

// Валидация формы
function validateForm(formData) {
    const errors = [];
    
    // Имя
    const name = formData.get('name').trim();
    if (name.length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
    }
    
    // Телефон
    const phone = formData.get('phone').trim();
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
        errors.push('Введите корректный номер телефона');
    }
    
    // Желаемая дата
    const preferredDate = formData.get('preferred-date');
    if (preferredDate) {
        const selectedDate = new Date(preferredDate);
        const now = new Date();
        if (selectedDate <= now) {
            errors.push('Выберите дату в будущем');
        }
        
        // Проверка времени работы
        const dayOfWeek = selectedDate.getDay();
        const hours = selectedDate.getHours();
        
        if (dayOfWeek === 0) { // Воскресенье
            errors.push('В воскресенье мы не работаем');
        } else if (dayOfWeek === 6 && hours >= 18) { // Суббота после 18:00
            errors.push('В субботу мы работаем до 18:00');
        } else if (dayOfWeek !== 6 && (hours < 10 || hours >= 20)) { // Будние дни
            errors.push('В будние дни мы работаем с 10:00 до 20:00');
        }
    }
    
    return errors;
}

// Отправка формы
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = new FormData(contactForm);
    
    // Валидация
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showError(errors.join('\n'));
        return;
    }
    
    // Подготовка данных для отправки
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Добавляем временную метку
    formObject.timestamp = new Date().toISOString();
    formObject.status = 'new';
    
    try {
        // Здесь можно добавить реальную отправку на сервер
        // Для демонстрации имитируем отправку
        await simulateFormSubmission(formObject);
        
        // Показываем уведомление об успехе
        showSuccess();
        
        // Очищаем форму
        contactForm.reset();
        
        // Дополнительные действия в зависимости от способа связи
        const contactMethod = formObject['contact-method'];
        handleContactMethod(contactMethod, formObject);
        
    } catch (error) {
        showError('Произошла ошибка при отправке. Попробуйте еще раз.');
        console.error('Form submission error:', error);
    }
});

// Имитация отправки формы
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Отправка данных:', data);
        
        // Сохраняем в localStorage для демонстрации
        const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
        existingSubmissions.push(data);
        localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));
        
        // Имитируем задержку сети
        setTimeout(resolve, 1000);
    });
}

// Показать уведомление об успехе
function showSuccess() {
    successNotification.classList.remove('translate-x-full');
    
    setTimeout(() => {
        successNotification.classList.add('translate-x-full');
    }, 5000);
}

// Показать ошибку
function showError(message) {
    // Создаем элемент для ошибки
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-exclamation-circle mr-2 mt-1"></i>
            <div>
                <p class="font-medium">Ошибка</p>
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Автоматически удаляем через 5 секунд
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Обработка способа связи
function handleContactMethod(method, formData) {
    const phone = formData.phone;
    const name = formData.name;
    const service = formData.service || 'не указана';
    const message = formData.message || '';
    
    switch (method) {
        case 'phone':
            console.log(`Звонок клиенту: ${phone}`);
            // Можно добавить интеграцию с CRM или телефонией
            break;
            
        case 'telegram':
            const telegramMessage = `Новая заявка от ${name}!\nТелефон: ${phone}\nУслуга: ${service}\nКомментарий: ${message}`;
            console.log('Сообщение в Telegram:', telegramMessage);
            // Можно добавить интеграцию с Telegram API
            openTelegram(phone);
            break;
            
        case 'email':
            console.log(`Email отправлен на ${formData.email || phone}`);
            // Можно добавить интеграцию с email сервисом
            break;
    }
}

// Открытие Telegram
function openTelegram(phone) {
    // Убираем все символы кроме цифр
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Формируем ссылку на Telegram
    const telegramUrl = `https://t.me/+${cleanPhone}`;
    
    // Открываем в новой вкладке
    window.open(telegramUrl, '_blank');
}

// Обработка нажатия на кнопки связи в секции контактов
document.querySelectorAll('.fa-phone, .fa-envelope, .fa-telegram').forEach(icon => {
    if (icon.parentElement.tagName === 'A') return; // Пропускаем уже обернутые в ссылки
    
    icon.parentElement.addEventListener('click', () => {
        const text = icon.parentElement.querySelector('p:last-child').textContent;
        
        if (icon.classList.contains('fa-phone')) {
            // Копируем номер телефона в буфер обмена
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('Номер скопирован в буфер обмена');
            });
        } else if (icon.classList.contains('fa-telegram')) {
            // Открываем Telegram
            window.open('https://t.me/maria_brows_master', '_blank');
        } else if (icon.classList.contains('fa-envelope')) {
            // Открываем email клиент
            window.open(`mailto:${text}`, '_blank');
        }
    });
});

// Уведомление о копировании
function showCopyNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-copy mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Анимация счетчиков (если понадобятся в будущем)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем минимальную дату для записи (завтра)
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().slice(0, 16);
        dateInput.min = minDate;
    }
    
    // Добавляем анимацию для карточек услуг
    const serviceCards = document.querySelectorAll('#services .card-hover');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Добавляем анимацию для портфолио
    const portfolioItems = document.querySelectorAll('#portfolio .card-hover');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
    });
});

// Параллакс эффект для hero секции (опционально)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('section:first-of-type');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Определение устройства для оптимизации
function isMobile() {
    return window.innerWidth <= 768;
}

// Оптимизация анимаций для мобильных устройств
if (isMobile()) {
    document.querySelectorAll('.card-hover').forEach(card => {
        card.style.transition = 'all 0.2s ease';
    });
}
