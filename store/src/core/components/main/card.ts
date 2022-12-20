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
    constructor(tagName: string, className: string) {
        super(tagName, className);
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

        this.container.append(itemWrapper);
        return this.container;
    }
    render() {
        return this.container;
    }
}
