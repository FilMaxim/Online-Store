import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';
import CartInfo from './cart';
import Search from './search';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageHeader() {
        this.container.innerHTML = `<a href=#${PageIds.MainPage} class="logo header__logo">
        <img src="./assets/img/logo.png" alt="logo" class="logo__img">
        </a>
   `;
        const cartInfo: CartInfo = new CartInfo('div', 'header__cart cart-info');
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
