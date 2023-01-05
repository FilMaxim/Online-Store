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
        if (localStorage.getItem('limit')) {
            inputCart.value = String(localStorage.getItem('limit'));
        } else {
            inputCart.value = '6';
        }

        limit.append(inputCart);

        const pageNumbers = document.createElement('div');
        pageNumbers.classList.add('page-numders');
        pageNumbers.innerHTML = ' PAGE: ';
        const btnNumber1 = document.createElement('button');
        btnNumber1.classList.add('btn-number');
        btnNumber1.innerHTML = '<';
        const spanNumber = document.createElement('span');
        let page: number;
        if (localStorage.getItem('page')) {
            page = Number(localStorage.getItem('page'));
        } else {
            page = 1;
        }
        spanNumber.innerHTML = String(page);
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
            let i = 1;
            dataObj.forEach((el: TypeCart) => {
                const a = objProducts.products.find((e) => el.id === e.id);
                if (a) Object.assign(a, { num: i });
                i++;
                if (a) return arrCart.push(a);
            });
        }
        let maxPage: number;
        // разбить массив arrCart на двухмерный массив в зависимости от LIMIT
        function get2dimensional(array: Product[], limit: number) {
            const result = [];
            for (let i = 0; i < array.length; i += limit) {
                result.push(array.slice(i, i + limit));
            }
            maxPage = result.length;
            return result;
        }
        // слушатель на изменение LIMIT
        inputCart.addEventListener('change', () => {
            if (page > maxPage) {
                page = maxPage;
                spanNumber.innerHTML = String(page);
            }
            localStorage.setItem('limit', inputCart.value);
            inputCart.value = String(localStorage.getItem('limit'));
            renderCart(page);
        });

        //Функция которая рендерит карточки товара
        function renderCart(page: number) {
            const arrCarts = get2dimensional(arrCart, Number(inputCart.value));
            if (page > maxPage) {
                page = maxPage;
                spanNumber.innerHTML = String(page);
            }
            prodItems.innerHTML = '';
            arrCarts[page - 1].forEach((el) => {
                const cartElement = new OneElementCart('div', 'cart-items', el);
                prodItems.append(cartElement.render());
            });
        }
        renderCart(page);

        // слушатели клики переход по страницам
        btnNumber2.addEventListener('click', () => {
            if (page < maxPage) {
                page++;
                spanNumber.innerHTML = String(page);
                renderCart(page);
                localStorage.setItem('page', String(page));
            }
        });
        btnNumber1.addEventListener('click', () => {
            if (page > maxPage) {
                page = maxPage;
            }
            if (page > 1) {
                page--;
                spanNumber.innerHTML = String(page);
                renderCart(page);
                localStorage.setItem('page', String(page));
            }
        });
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
