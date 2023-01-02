import Component from '../../../templates/components';
import CartInfo from '../../header/cart';
import { IPromo } from '../../../../types';
export default class Promokod extends Component {
    static promokods: IPromo[] = [
        { id: 'epm', text: 'EPAM Systems - 10%', proc: 10 },
        { id: 'rs', text: 'Rolling Scopes School - 10%', proc: 10 },
    ];
    count: HTMLElement;
    total: HTMLElement;
    discount: HTMLElement;
    input: HTMLInputElement;
    desc: HTMLElement;
    cods: HTMLElement;
    buyBtn: HTMLElement;

    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.count = document.createElement('span');
        this.total = document.createElement('span');
        this.discount = document.createElement('span');
        this.cods = document.createElement('div');
        this.input = document.createElement('input');
        this.desc = document.createElement('div');

        this.buyBtn = document.createElement('button');
    }

    //метод для перерисовки промокода
    changeInfo() {
        const infoLocal = CartInfo.changeLocal();
        this.input.value = '';
        if (infoLocal) {
            this.count.textContent = String(infoLocal[0]);
            this.total.textContent = '€' + String(infoLocal[1].toFixed(2));
        }
        const memory = localStorage.getItem('promo');
        const parentDiscount = this.discount.parentNode as HTMLElement;
        const parentTotal = this.total.parentNode as HTMLElement;
        let localPromo: IPromo[] = [];
        if (memory) localPromo = JSON.parse(memory);
        if (!memory || localPromo.length === 0) {
            this.cods.innerHTML = '<div class="cods__title">Applied codes</div>';
            this.cods.style.display = 'none';
            if (parentTotal) parentTotal.classList.remove('delete');

            if (parentDiscount) parentDiscount.style.display = 'none';
        } else {
            this.cods.style.display = 'block';
            if (parentDiscount) parentDiscount.style.display = 'flex';
            if (parentTotal) parentTotal.classList.add('delete');

            const discountProcent = localPromo.reduce((prev, next) => prev + next.proc, 0);

            if (infoLocal) {
                this.discount.textContent = `€${(infoLocal[1] * ((100 - discountProcent) / 100)).toFixed(2)}`;
            }

            this.cods.innerHTML = '<div class="cods__title">Applied codes</div>';
            localPromo.forEach((item) => {
                const el = document.createElement('div');
                el.className = 'cods__item';
                el.setAttribute('id', item.id);
                const spanEl = document.createElement('span');
                spanEl.className = 'cods__text';
                spanEl.textContent = item.text;
                el.append(spanEl);

                const btnEl = document.createElement('button');
                btnEl.className = 'btn';
                btnEl.textContent = 'Drop';
                el.append(btnEl);
                this.cods.append(el);
            });
        }
    }
    dataInput(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = target.value.toLowerCase();

        const memory = localStorage.getItem('promo');
        let localPromo: IPromo[];

        if (value === 'rs' || value === 'epm') {
            this.desc.style.display = 'flex';
            const promo = Promokod.promokods.find((item) => item.id === value);
            let promoLocal: IPromo | undefined;
            if (promo) this.desc.innerText = promo.text;
            if (memory) {
                localPromo = JSON.parse(memory);
                promoLocal = localPromo.find((item) => item.id === value);
            }
            if (!memory || !promoLocal) {
                const addBtn = document.createElement('button');
                addBtn.textContent = 'Add';
                addBtn.className = 'btn promo__add';
                this.desc.append(addBtn);
                this.desc.setAttribute('id', value);
            }
        } else {
            this.desc.style.display = 'none';
        }
    }
    addPromoLocal(e: Event) {
        const target = e.target as HTMLElement;
        if (!target.matches('.btn')) return;
        const parentTarget = target.closest('.promo__desc') as HTMLElement;
        let idPromo: string | null = null;
        if (parentTarget) idPromo = parentTarget.getAttribute('id');
        const promo = Promokod.promokods.find((item) => item.id === idPromo);

        const memory = localStorage.getItem('promo');
        let localPromo: IPromo[];
        if (!memory) localPromo = [];
        else localPromo = JSON.parse(memory);
        if (promo) {
            localPromo.push(promo);
            localStorage.setItem('promo', JSON.stringify(localPromo));
        }
        if (parentTarget) parentTarget.style.display = 'none';
        this.changeInfo();
    }
    deletePromoLocal(e: Event) {
        const target = e.target as HTMLElement;
        if (!target.matches('.btn')) return;
        const parentTarget = target.closest('.cods__item') as HTMLElement;
        const memory = localStorage.getItem('promo');
        let idPromo: string | null = null;
        if (parentTarget) idPromo = parentTarget.getAttribute('id');

        if (memory) {
            const localPromo: IPromo[] = JSON.parse(memory);
            if (idPromo) {
                const promoIndex = localPromo.findIndex((item) => item.id === idPromo);
                console.log(promoIndex);

                localPromo.splice(promoIndex, 1);
                localStorage.setItem('promo', JSON.stringify(localPromo));
                this.changeInfo();
            }
        }
    }
    createAreaBlock() {
        const title = document.createElement('h2');
        title.className = 'promo__title';
        title.textContent = 'Summary';
        this.container.append(title);

        const count = document.createElement('div');
        count.className = 'promo__count promo__head-text';
        count.innerText = 'Products: ';
        count.append(this.count);
        this.container.append(count);

        const total = document.createElement('div');
        total.className = 'promo__total promo__head-text';
        total.textContent = 'Total: ';
        total.append(this.total);
        this.container.append(total);

        const discount = document.createElement('div');
        discount.className = 'promo__discount promo__head-text';
        discount.textContent = 'Total: ';
        discount.append(this.discount);
        this.container.append(discount);

        this.cods.className = 'promo__cods cods';
        const titleCods = document.createElement('div');
        titleCods.className = 'cods__title';
        titleCods.textContent = 'Applied codes';
        this.cods.append(titleCods);
        this.container.append(this.cods);

        this.input.type = 'text';
        this.input.placeholder = 'Enter promo code';
        this.input.className = 'promo__input';
        this.container.append(this.input);

        this.desc.className = 'promo__desc';

        this.container.append(this.desc);

        const help = document.createElement('div');
        help.className = 'promo__help';
        help.textContent = `Promo for test: 'RS', 'EPM'`;
        this.container.append(help);

        this.buyBtn.className = 'promo__btn btn';
        this.buyBtn.textContent = 'BUY NOW';
        this.container.append(this.buyBtn);

        // this.container.innerHTML = `
        // <h2 class="promo__title">Summary</h2>
        // <div class="promo__count promo__head-text">Products ${this.count.textContent}</div>
        // <div class="promo__total promo__head-text delete">Total ${this.total.textContent}</div>
        // <div class="promo__discount promo__head-text">Total €${this.discount.textContent}</div>
        // < class="promo__cods cods">
        //   <div class="cods__title">Applied codes</div>
        //   <div class="cods__item">
        //     <span class="cods__text">Rolling Scopes School - 10% -</span>
        //     <button class="btn">Drop</button>
        //   </div>
        //   <div class="cods__item">
        //     <span class="cods__text">Rolling Scopes School - 10% -</span>
        //     <button class="btn promo__drop">Drop</button>
        //   </div>

        // </>
        // <indivput type="text" class="promo__input" placeholder="Enter promo code">
        // <span class="promo__help">Promo for test: 'RS', 'EPM'</span>
        // <div class='promo__desc'><span>EPAM Systems - 10%</span><button class='btn promo__add'>Add</div>
        // <button class="promo__btn btn">BUY NOW</button>`;
    }
    render() {
        this.createAreaBlock();
        this.changeInfo();
        this.input.addEventListener('input', this.dataInput.bind(this));
        this.desc.addEventListener('click', this.addPromoLocal.bind(this)); //добавить промокод
        this.cods.addEventListener('click', this.deletePromoLocal.bind(this)); //удалить промокод
        return this.container;
    }
}
