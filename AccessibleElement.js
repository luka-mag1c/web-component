class AccessibleElement extends HTMLElement {
    constructor() {
        super();

        // Создаём Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        // Создаём элементы
        const container = document.createElement('div');
        const heading = document.createElement('h1');
        const paragraph = document.createElement('p');

        // Устанавливаем текст из атрибутов или значения по умолчанию
        heading.textContent = this.getAttribute('heading') || 'Default Heading';
        paragraph.textContent = this.getAttribute('text') || 'Default paragraph text';

        // Делаем элементы фокусируемыми
        heading.tabIndex = 0;
        paragraph.tabIndex = 0;

        // Стили для компонента
        const style = document.createElement('style');
        style.textContent = `
            div {
                margin: 10px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                max-width: 300px;
            }
            h1, p {
                margin: 0;
                padding: 5px;
            }
            h1:focus, p:focus {
                outline: 2px solid blue;
                background-color: #f0f8ff;
            }
        `;

        // Добавляем обработчик фокуса с использованием speechSynthesis
        const speak = (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        };

        heading.addEventListener('focus', () => speak(heading.textContent));
        paragraph.addEventListener('focus', () => speak(paragraph.textContent));

        // Собираем компонент
        container.appendChild(heading);
        container.appendChild(paragraph);
        shadow.appendChild(style);
        shadow.appendChild(container);
    }
}

// Регистрация веб-компонента
customElements.define('accessible-element', AccessibleElement);
