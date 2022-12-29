import Component from '../../../templates/components';

export default class SearchClose extends Component {
    elem: HTMLInputElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.elem = this.container as HTMLInputElement;
    }
    render() {
        this.elem.type = 'button';
        return this.elem;
    }
}
