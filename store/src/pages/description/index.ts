import Page from '../../core/templates/page';

class DescriptionPage extends Page {
    static TextObject = {
        MainTitle: 'Страница с описанием товара',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        console.log(this.container.id);

        const title = this.createHeaderTitle(DescriptionPage.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default DescriptionPage;
