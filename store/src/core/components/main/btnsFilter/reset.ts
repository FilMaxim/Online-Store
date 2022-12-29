import Component from '../../../templates/components';

export default class BtnsReset extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    resetHash() {
        window.location.hash = 'main-page';
    }
    render(): HTMLElement {
        this.container.textContent = 'Reset';
        this.container.addEventListener('click', this.resetHash);
        return this.container;
    }
}
