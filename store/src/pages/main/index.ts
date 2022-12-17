import './main.css';
import Page from '../../core/templates/page';
import * as obj from './products.json';

interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    textContent?: string;
    thumbnail: string;
    title: string;
}

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Страница товаров с фильтрами',
    };

    constructor(id: string) {
        super(id);
    }

    createListProduct() {
        const containerElements = document.createElement('div');
        containerElements?.classList.add('products');

        const products = document.createElement('ul');
        products.classList.add('products-items');

        const createProduct = (product: Product) => {
            const productEl = document.createElement('li');
            productEl.classList.add('prod-elem');
            productEl.innerHTML = product.title;

            const imgProduct = document.createElement('img');
            imgProduct.src = product.images[0];

            productEl.append(imgProduct);

            return productEl;
        };

        obj.products.forEach((el) => {
            console.log(el);
            products.append(createProduct(el));
        });

        containerElements.append(products);
        return containerElements;
    }

    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        this.container.append(title);
        this.container.append(this.createListProduct());
        console.log(obj.products);

        return this.container;
    }
}

export default MainPage;
