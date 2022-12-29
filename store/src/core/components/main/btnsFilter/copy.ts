import Component from '../../../templates/components';

export default class BtnsCopy extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    copyUrl() {
        const text = window.location.href;

        navigator.clipboard
            .writeText(text)
            .then(() => {
                this.container.textContent = 'Success';
                this.container.style.background = 'green';
            })
            .then(() => {
                setTimeout(
                    function (t) {
                        t.textContent = 'Copy';
                        t.style.background = '#402900';
                    },
                    400,
                    this.container
                );
            })
            .catch((err) => {
                console.error('Error in copying text: ', err);
            });
    }
    render(): HTMLElement {
        this.container.textContent = 'Copy';
        this.container.addEventListener('click', this.copyUrl.bind(this));
        return this.container;
    }
}
