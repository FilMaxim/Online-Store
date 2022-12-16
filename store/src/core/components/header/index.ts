import Component from '../../templates/components';
import { PageIds } from '../../../pages/app/index';

const Buttons = [
    {
        id: PageIds.MainPage,
        text: 'Главная страница',
    },
    {
        id: PageIds.CartPage,
        text: 'Корзина',
    },
    {
        id: PageIds.DescriptionPage,
        text: 'Описание товара',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageButtons() {
        const pageButtons = document.createElement('div');
        Buttons.forEach((button) => {
            const buttonHTML = document.createElement('a');
            buttonHTML.href = `#${button.id}`;
            buttonHTML.innerText = button.text;
            pageButtons.append(buttonHTML);
        });
        this.container.append(pageButtons);
    }

    render() {
        this.renderPageButtons();
        return this.container;
    }
}

export default Header;
