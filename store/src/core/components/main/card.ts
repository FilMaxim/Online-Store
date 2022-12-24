import Component from '../../templates/components';

export interface Product {
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
export default class Card extends Component {
    product: Product;
    constructor(tagName: string, className: string, product: Product) {
        super(tagName, className);
        this.product = product;
    }
    renderCard(product: Product) {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('item-wrapper');
        itemWrapper.style.backgroundImage = `url(${product.thumbnail})`;

        const title = document.createElement('div');
        title.classList.add('item-title');
        title.textContent = product.title;
        itemWrapper.append(title);

        const info = document.createElement('div');
        info.classList.add('item-info');
        itemWrapper.append(info);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info-item');
        info.append(itemInfo);

        const properItemArr = [
            `Caregory: ${product.category}`,
            `Brand: ${product.brand}`,
            `Price: €${product.price}`,
            `Discount: ${product.discountPercentage}%`,
            `Rating: ${product.rating}`,
            `Stock: ${product.stock}`,
        ];

        properItemArr.forEach((elem) => {
            const pProp = document.createElement('p');
            pProp.classList.add('ngcontent');
            pProp.textContent = elem;
            itemInfo.append(pProp);
        });

        const btns = document.createElement('div');
        btns.classList.add('card__btns');

        for (let index = 0; index < 2; index++) {
            const element = document.createElement('button');
            element.className = 'card__btn btn';
            if (index === 0) {
                element.textContent = 'Add';
                element.classList.add('card-cart');
            } else {
                element.textContent = 'Desc';
                element.classList.add('card-desc');
            }
            btns.append(element);
        }

        itemWrapper.append(btns);
        this.container.setAttribute('id', String(product.id));

        this.container.append(itemWrapper);
    }
    setHashDeskId(e: Event) {
        const target = e.target as Element;
        if (!target.matches('button')) return;
        const id = target.closest(`.${this.container.className}`)?.getAttribute('id');

        if (target.matches('.card-desc')) window.location.hash = `id=${id}`;
    }
    render() {
        this.renderCard(this.product);
        this.container.addEventListener('click', this.setHashDeskId.bind(this));

        return this.container;
    }
}
