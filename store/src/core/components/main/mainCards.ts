import Component from '../../templates/components';
import Card from './card';
import { Product } from './card';

export default class mainCards extends Component {
    cards: Product[];
    constructor(tagName: string, className: string, cards: Product[]) {
        super(tagName, className);
        this.cards = cards;
    }
    createMainCards() {
        this.container.textContent = '';
        if (this.cards.length === 0) this.container.textContent = 'Не найдено соответствующих товаров';
        else
            this.cards.forEach((item) => {
                const card = new Card('li', 'prod-elem');
                this.container.append(card.renderCard(item));
            });
    }
    render() {
        this.createMainCards();
        return this.container;
    }
}
