import Component from '../../templates/components';
import CartInfo from './cart';
import Search from './search';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageHeader() {
        const cartInfo: CartInfo = new CartInfo('div', 'header__cart cart-info');
        this.container.innerHTML = `<a href="./index.html" class="logo header__logo">
        <img src="./assets/img/logo.png" alt="logo" class="logo__img">
        </a>
   `;
        const searchInput: Search = new Search('input', 'header__search search', 'Search product');
        this.container.append(searchInput.render());
        this.container.append(cartInfo.render());
    }

    render() {
        this.renderPageHeader();
        return this.container;
    }
}

export default Header;
