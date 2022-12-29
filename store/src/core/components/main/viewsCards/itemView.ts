import Component from '../../../templates/components';

export default class ItemView extends Component {
    num: number;
    constructor(tagName: string, className: string, num: number) {
        super(tagName, className);
        this.num = num;
    }
    createView() {
        for (let i = 0; i < this.num * this.num; i++) {
            const columnEl = document.createElement('div');
            columnEl.classList.add('view__column');
            this.container.append(columnEl);
        }
    }
    render() {
        this.createView();
        return this.container;
    }
}
