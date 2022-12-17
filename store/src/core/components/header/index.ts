import Component from '../../templates/components';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageHeader() {
        this.container.innerHTML = `<a href="./index.html" class="logo header__logo">
        <img src="./assets/img/logo.png" alt="logo" class="logo__img">
        </a>
        <input type="search" class="header__search search" placeholder="Search product">
        <div class="header__cart cart-info">
          <span class="cart-info__total">€2,748.00</span>
          <button class="cart-info__btn btn">
            <span>11</span>
            Cart
          </button>
      </div>`;
    }

    render() {
        this.renderPageHeader();
        return this.container;
    }
}

export default Header;
