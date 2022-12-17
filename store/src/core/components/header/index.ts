import Component from '../../templates/components';
import CartInfo from './cart';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageHeader() {
        const cartInfo: CartInfo = new CartInfo('div', 'header__cart cart-info');
        this.container.innerHTML = `<a href="./index.html" class="logo header__logo">
        <img src="./assets/img/logo.png" alt="logo" class="logo__img">
        </a>
        <input type="search" class="header__search search" placeholder="Search product">
   `;
        this.container.append(cartInfo.render());
    }

    render() {
        this.renderPageHeader();
        return this.container;
    }
}

export default Header;
