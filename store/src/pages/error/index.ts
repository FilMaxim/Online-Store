import Page from '../../core/templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! The page was not found.',
    };
    btn: HTMLElement;

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
        this.btn = document.createElement('button');
    }
    createPage() {
        const block = document.createElement('div');
        block.className = 'error__wrapper';
        const title = document.createElement('h1');
        title.textContent = String(this.errorType);
        title.className = 'error__title';
        const text = document.createElement('p');
        text.className = 'error__text';
        text.textContent = ErrorPage.TextObject[this.errorType];
        block.append(title);
        block.append(text);
        this.btn.className = 'btn error__btn';
        this.btn.textContent = 'On main page';
        block.append(this.btn);
        this.container.append(block);
    }

    render() {
        this.createPage();
        this.btn.addEventListener('click', () => (window.location.hash = 'main-page'));

        return this.container;
    }
}

export default ErrorPage;
