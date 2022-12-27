import Component from '../../templates/components';

export default class CartInfo extends Component {
    constructor(tagName: string, className: string, placeholder: string) {
        super(tagName, className);
        this.container.setAttribute('placeholder', placeholder);
    }
    render() {
        return this.container;
    }
}
