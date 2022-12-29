import Component from '../../../templates/components';

export default class Search extends Component {
    text: HTMLInputElement;
    btn: HTMLInputElement;
    constructor(tagName: string, className: string, text: HTMLInputElement, btn: HTMLInputElement) {
        super(tagName, className);
        this.text = text;
        this.btn = btn;
    }
    setHash(e: Event) {
        e.preventDefault();
        const url = new URL(window.location.href.replace('#', ''));
        if (this.text.value.length === 0) {
            this.btn.style.display = 'none';
            url.searchParams.delete('search');
        } else {
            this.btn.style.display = 'block';
            url.searchParams.set('search', this.text.value);
        }

        window.location.hash = url.search;
    }
    resetHash() {
        const url = new URL(window.location.href.replace('#', ''));
        this.btn.style.display = 'none';
        this.text.value = '';
        url.searchParams.delete('search');
        window.location.hash = url.search;
    }
    renderSearch() {
        this.container.append(this.text);
        this.container.append(this.btn);
    }
    render() {
        this.container.addEventListener('input', this.setHash.bind(this));
        this.btn.addEventListener('click', this.resetHash.bind(this));
        this.renderSearch();
        return this.container;
    }
}
