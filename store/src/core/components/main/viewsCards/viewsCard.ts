import Component from '../../../templates/components';

export default class ViewCards extends Component {
    big: HTMLElement;
    small: HTMLElement;
    constructor(tagName: string, className: string, big: HTMLElement, small: HTMLElement) {
        super(tagName, className);
        this.big = big;
        this.small = small;
    }
    setHash(e: Event) {
        const target = e.target as Element;
        console.log(target, target.closest('.view-item'));

        if (!target.closest('.view-item')) return;
        const url = new URL(window.location.href.replace('#', ''));
        if (target.closest('.view-item') === this.big) {
            url.searchParams.set('view', 'big');
        } else url.searchParams.set('view', 'small');
        window.location.hash = url.search;
    }
    createView() {
        this.container.append(this.big);
        this.container.append(this.small);
    }

    render() {
        this.container.addEventListener('click', this.setHash.bind(this));
        this.createView();
        return this.container;
    }
}
