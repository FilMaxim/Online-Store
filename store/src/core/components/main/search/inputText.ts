import Component from '../../../templates/components';

export default class SearchInput extends Component {
    elem: HTMLInputElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.elem = this.container as HTMLInputElement;
    }

    render(): HTMLElement {
        this.elem.type = 'text';
        this.elem.placeholder = 'Search';
        return this.elem as HTMLInputElement;
    }
}
