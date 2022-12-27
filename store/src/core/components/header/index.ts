import Component from '../../templates/components';
import { PageIds } from '../../../pages/app';
import CartInfo from './cart';

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
        this.container.append(cartInfo.render());
    }

    render() {
        this.renderPageHeader();
        return this.container;
    }
}

export default Header;
