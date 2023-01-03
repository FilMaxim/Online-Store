import './cart.css';
import Page from '../../core/templates/page';
import OneElementCart from '../../core/components/cart/oneElementCart';
import Promokod from '../../core/components/cart/promokod/promokod';
import * as objProducts from '../main/products.json';
import { TypeCart } from '../../types/index';
import { Product } from '../../types/index';

class CartPage extends Page {
    static TextObject = {
        MainTitle: 'Страница корзины товаров',
    };
    promokod: Promokod;

    constructor(id: string) {
        super(id);
        this.promokod = new Promokod('div', 'total-cart promo');
    }

    createCartPage() {
        const main = document.createElement('main');
        main.classList.add('details');
        const cartPage = document.createElement('div');
        cartPage.classList.add('cart-page');
        const cartWrapper = document.createElement('div');
        cartWrapper.classList.add('cart-wrapper');

        const productInCart = document.createElement('div');
        productInCart.classList.add('product-in-cart');

        const titleAndPageControl = document.createElement('div');
        titleAndPageControl.classList.add('title-and-page-control');
        const h2Cart = document.createElement('h2');
        h2Cart.innerHTML = 'Product In Cart';
        const pageControl = document.createElement('div');
        pageControl.classList.add('page-control');
        const limit = document.createElement('div');
        limit.classList.add('limit');
        limit.innerHTML = ' LIMIT: ';
        const inputCart = document.createElement('input');
        inputCart.classList.add('input-cart');
        inputCart.type = 'number';
        inputCart.min = '1';
        inputCart.max = '6';
        inputCart.value = '1';
        limit.append(inputCart);

        const pageNumbers = document.createElement('div');
        pageNumbers.classList.add('page-numders');
        pageNumbers.innerHTML = ' PAGE: ';
        const btnNumber1 = document.createElement('button');
        btnNumber1.classList.add('btn-number');
        btnNumber1.innerHTML = '<';
        const spanNumber = document.createElement('span');
        spanNumber.innerHTML = '1';
        const btnNumber2 = document.createElement('button');
        btnNumber2.classList.add('btn-number');
        btnNumber2.innerHTML = '>';
        pageNumbers.append(btnNumber1);
        pageNumbers.append(spanNumber);
        pageNumbers.append(btnNumber2);

        pageControl.append(limit);
        pageControl.append(pageNumbers);

        titleAndPageControl.append(h2Cart);
        titleAndPageControl.append(pageControl);

        const prodItems = document.createElement('div');
        prodItems.classList.add('prod-items');
        const cartElement = new OneElementCart('div', 'cart-items');
        prodItems.append(cartElement.render());
        productInCart.append(titleAndPageControl);
        productInCart.append(prodItems);

        cartWrapper.append(productInCart);
        cartWrapper.append(this.promokod.render());
        cartPage.append(cartWrapper);
        main.append(cartPage);

        // arrCart - массив из объектов, которые лежат в корзине
        const data: string | null = localStorage.getItem('cart');
        const arrCart: Product[] = [];
        if (data && data !== null) {
            const dataObj = JSON.parse(data);
            dataObj.forEach((el: TypeCart) => {
                const a = objProducts.products.find((e) => el.id === e.id);
                if (a) return arrCart.push(a);
            });
        }
        console.log(arrCart);
        return main;
    }

    render() {
        const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
        this.container.append(title);
        this.container.append(this.createCartPage());
        return this.container;
    }
}

export default CartPage;
