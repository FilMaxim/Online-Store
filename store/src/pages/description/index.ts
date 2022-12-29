import './description.css';
import Page from '../../core/templates/page';
import * as objProducts from '../main/products.json';
import { Product } from '../../types/index';
import BtnAddCart from '../../core/components/main/btnAddCart';
class DescriptionPage extends Page {
    static TextObject = {
        MainTitle: 'Страница с описанием товара',
    };

    constructor(id: string) {
        super(id);
    }

    createDetailsPage() {
        const idEl = Number(this.container.id);
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
            console.log(index);
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

        const addCartBtn = new BtnAddCart('button', '', 'add to cart', 'drop to cart', objElement.id, objElement.price);
        cartButton.append(addCartBtn.render());
        const btn = document.createElement('button');
        btn.innerHTML = 'buy now';
        cartButton.append(btn);

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
        const title = this.createHeaderTitle(DescriptionPage.TextObject.MainTitle);
        this.container.append(title);
        this.container.append(this.createDetailsPage());
        return this.container;
    }
}

export default DescriptionPage;
