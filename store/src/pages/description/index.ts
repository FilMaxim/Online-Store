import './description.css';
import Page from '../../core/templates/page';
import * as objProducts from '../main/products.json';
import { Product } from '../../types/index';

import BtnAddCart from '../../core/components/main/btnAddCart';
import Modal from '../../core/components/cart/modal/modal';
class DescriptionPage extends Page {
    static TextObject = {
        MainTitle: 'Страница с описанием товара',
    };
    btnOpenCart: HTMLElement;
    idEl: number;
    price: number;

    constructor(id: string) {
        super(id);
        this.idEl = 0;
        this.price = 0;
        this.btnOpenCart = document.createElement('button');
    }
    //открытие корзины с модалкой
    openCart() {
        if (BtnAddCart.searchIndex(Number(this.idEl)) === -1) {
            const newEl = new BtnAddCart('div', '', '', '', this.idEl, this.price);
            newEl.addCart();
        }
        window.location.hash = `cart-page`;
        document.body.append(new Modal('div', 'modal').render());
    }

    createDetailsPage() {
        const idEl = Number(this.container.id);
        this.idEl = idEl;
        console.log(idEl);

        const objElement: Product = objProducts.products.filter((el) => el.id === idEl)[0];
        console.log(objElement);

        const main = document.createElement('main');
        main.classList.add('details');
        const wrapp = document.createElement('div');
        wrapp.classList.add('details-page');

        // создание "хлебных крошек"
        const navigator = document.createElement('div');
        navigator.classList.add('link-navigator');
        const link = ['store', objElement.category, objElement.brand, objElement.title];
        link.forEach((element, index) => {
            const p = document.createElement('p');
            p.innerHTML = element;
            navigator.append(p);
            if (index !== 3) {
                navigator.innerHTML += ' >> ';
            }
        });
        wrapp.append(navigator);

        const productDetail = document.createElement('div');
        productDetail.classList.add('product-detail');
        const title = document.createElement('div');
        title.classList.add('product-title');
        const h1 = document.createElement('h1');
        h1.textContent = objElement.title;
        productDetail.append(title);
        title.append(h1);
        const productData = document.createElement('div');
        productData.classList.add('product-data');

        // создание блока с фото
        const productPhotos = document.createElement('div');
        productPhotos.classList.add('product-photos');
        const slider = document.createElement('div');
        slider.classList.add('slider');
        let mainFoto = objElement.images[0];
        objElement.images.forEach((el) => {
            const img = document.createElement('img');
            img.classList.add('img-slide');
            img.src = el;
            img.alt = 'Slide';
            img.addEventListener('click', () => {
                mainFoto = el;
                console.log(mainFoto);
                imgGrand.src = el;
            });
            slider.append(img);
        });

        //создание главного фото
        const grandPhoto = document.createElement('div');
        grandPhoto.classList.add('grand-photo');
        const imgGrand = document.createElement('img');
        imgGrand.classList.add('img-grand-slide');
        imgGrand.src = objElement.images[0];
        grandPhoto.append(imgGrand);
        productPhotos.append(slider);
        productPhotos.append(grandPhoto);
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        //создание блока с описанием
        const arrEl = ['description', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];
        arrEl.forEach((el) => {
            const detailItem = document.createElement('div');
            detailItem.classList.add('product-detail-item');
            const detailH3 = document.createElement('h3');
            detailH3.textContent = el;
            detailItem.append(detailH3);
            const detailP = document.createElement('p');
            detailP.innerHTML = String(objElement[el as keyof typeof objElement]);
            detailItem.append(detailP);
            productInfo.append(detailItem);
        });

        const addToCard = document.createElement('div');
        addToCard.classList.add('add-to-card');
        const cartButton = document.createElement('div');
        cartButton.classList.add('cart-button');
        cartButton.innerHTML = '€' + String(objElement.price);

        this.price = objElement.price;
        const addCartBtn = new BtnAddCart('button', '', 'add to cart', 'drop to cart', this.idEl, this.price);
        cartButton.append(addCartBtn.render());

        this.btnOpenCart.innerHTML = 'buy now';
        cartButton.append(this.btnOpenCart);

        addToCard.append(cartButton);

        productData.append(productPhotos);
        productData.append(productInfo);
        productData.append(addToCard);

        productDetail.append(productData);

        wrapp.append(productDetail);
        main.append(wrapp);
        return main;
    }

    render() {
        this.btnOpenCart.addEventListener('click', this.openCart.bind(this));
        this.container.append(this.createDetailsPage());
        return this.container;
    }
}

export default DescriptionPage;
