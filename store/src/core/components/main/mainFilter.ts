import Component from '../../templates/components';
import Filter from './filter';
import mainCards from './mainCards';

export default class mainFilter extends Component {
    mainArea: mainCards; //для связи фильтра с карточками (чтобы при клике по фильтрам менялось поле с карточками)
    constructor(tagName: string, className: string, mainAreaCards: mainCards) {
        super(tagName, className);
        this.mainArea = mainAreaCards;
    }
    createFilterArea() {
        this.container.append(new Filter('div', 'filterBlock', 'category').render());
        this.container.append(new Filter('div', 'filterBlock', 'brand').render());
    }
    render() {
        this.createFilterArea();
        return this.container;
    }
}
