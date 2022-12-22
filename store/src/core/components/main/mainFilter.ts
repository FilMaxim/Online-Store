import Component from '../../templates/components';
import Filter from './filter';
import mainCards from './mainCards';
import { obj } from '../../../pages/main';

export interface parametrObj {
    category: string[];
    brand: string[];
}

export default class mainFilter extends Component {
    static parametrs: parametrObj = { category: [], brand: [] }; //где будем хранить чеки по фильтрам

    //ищем продукты в объекте по фильтрам
    static searchCardsFilter(prod: parametrObj) {
        let objProducts = obj.products;

        if (prod.category.length !== 0)
            objProducts = objProducts.filter((item) => {
                if (prod.category.indexOf(item.category) === -1) return false;
                return true;
            });
        if (prod.brand.length !== 0)
            objProducts = objProducts.filter((item) => {
                if (prod.brand.indexOf(item.brand) === -1) return false;
                return true;
            });

        return objProducts;
    }

    //создаем и устанаваливаем url
    static createHashFilter(obj: parametrObj) {
        let res = '';
        res = obj.category.length !== 0 ? `category=${obj.category.join('|')}` : '';
        res =
            res +
            (obj.brand.length !== 0
                ? res === ''
                    ? `brand=${obj.brand.join('|')}`
                    : `?&brand=${obj.brand.join('|')}`
                : '');
        res = res === '' ? '' : `?${res}`;
        window.location.hash = res;
    }

    mainArea: mainCards; //для связи фильтра с карточками (чтобы при клике по фильтрам менялось поле с карточками)
    checkFilter: parametrObj;
    constructor(tagName: string, className: string, mainAreaCards: mainCards, checkFilter: parametrObj) {
        super(tagName, className);
        this.mainArea = mainAreaCards;
        this.checkFilter = checkFilter;
        console.log(checkFilter);
    }
    createFilterArea() {
        console.log(mainFilter.parametrs);

        this.container.append(
            new Filter('div', 'filterBlock category', 'category', this.checkFilter.category).render()
        );
        this.container.append(new Filter('div', 'filterBlock brand', 'brand', this.checkFilter.brand).render());
    }

    //по клику на фильтры формируем массив с параметрами для запроса
    clickCheckFilter(e: Event) {
        const target = e.target as Element;
        if (!target.matches('input')) return;
        const targetCheck = e.target as HTMLInputElement;

        if (targetCheck.checked) {
            if (targetCheck.closest('.category')) mainFilter.parametrs['category'].push(targetCheck.id);
            else mainFilter.parametrs['brand'].push(targetCheck.id);
        } else {
            if (targetCheck.closest('.category'))
                mainFilter.parametrs['category'].splice(mainFilter.parametrs['category'].indexOf(targetCheck.id), 1);
            else mainFilter.parametrs['brand'].splice(mainFilter.parametrs['category'].indexOf(targetCheck.id), 1);
        }

        //перерисовываем карточки
        this.mainArea.cards = mainFilter.searchCardsFilter(mainFilter.parametrs);
        this.mainArea.createMainCards();

        mainFilter.createHashFilter(mainFilter.parametrs); //меняем url
    }

    render() {
        this.createFilterArea();
        this.container.addEventListener('click', this.clickCheckFilter.bind(this)); //привязываем контекст, чтобы при клике по фильтрам менялось поле с карточками, которое задаем в конструкторе
        return this.container;
    }
}
