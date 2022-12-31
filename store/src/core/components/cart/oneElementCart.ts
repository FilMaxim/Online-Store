import Component from '../../templates/components';

export default class ElementCart extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    createElementCartPage() {
        const cartItemWrap = document.createElement('div');
        cartItemWrap.classList.add('cart-item-wrap');
        const itemI = document.createElement('div');
        itemI.classList.add('item-i');
        itemI.textContent = '1';
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const imgCart = document.createElement('img');
        imgCart.src = 'https://i.dummyjson.com/data/products/51/thumbnail.jpg';
        const itemDetailP = document.createElement('div');
        itemDetailP.classList.add('item-detai-p');

        const productTitle = document.createElement('div');
        productTitle.classList.add('product-title-cart');
        const productTitleH3 = document.createElement('h3');
        productTitleH3.textContent = 'Infinix INBOOK';
        productTitle.append(productTitleH3);
        const productDescription = document.createElement('div');
        productDescription.classList.add('product-description');
        productDescription.innerHTML = 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty';
        const productOther = document.createElement('div');
        productOther.classList.add('product-other');
        const rating = document.createElement('div');
        rating.classList.add('rating-discount');
        rating.textContent = 'Rating: 4.54';
        const discount = document.createElement('div');
        discount.classList.add('rating-discount');
        discount.textContent = 'Discount: 11.83%';
        productOther.append(rating);
        productOther.append(discount);

        itemDetailP.append(productTitle);
        itemDetailP.append(productDescription);
        itemDetailP.append(productOther);

        itemInfo.append(imgCart);
        itemInfo.append(itemDetailP);

        const numberControl = document.createElement('div');
        numberControl.classList.add('number-control');
        const stockControl = document.createElement('div');
        stockControl.classList.add('stock-control');
        stockControl.textContent = 'Stock: 34';
        const incDecControl = document.createElement('div');
        incDecControl.classList.add('incDec-control');

        const btnControl1 = document.createElement('div');
        btnControl1.classList.add('btn-control');
        btnControl1.textContent = '-';
        const btnControl2 = document.createElement('div');
        btnControl2.classList.add('btn-control');
        btnControl2.textContent = '+';
        incDecControl.append(btnControl1);
        incDecControl.innerHTML += '1';
        incDecControl.append(btnControl2);

        const amountControl = document.createElement('div');
        amountControl.classList.add('amount-control');
        amountControl.textContent = '€1,249.00';
        numberControl.append(stockControl);
        numberControl.append(incDecControl);
        numberControl.append(amountControl);

        cartItemWrap.append(itemI);
        cartItemWrap.append(itemInfo);
        cartItemWrap.append(numberControl);

        return cartItemWrap;
    }

    render() {
        const cart = this.createElementCartPage();
        this.container.append(cart);
        return this.container;
    }
}
