import Component from '../../../templates/components';
import CartInfo from '../../header/cart';

export default class Modal extends Component {
    name: HTMLInputElement;
    phone: HTMLInputElement;
    address: HTMLInputElement;
    email: HTMLInputElement;
    btn: HTMLElement;
    nameCheck: boolean;
    phoneCheck: boolean;
    addressCheck: boolean;
    emailCheck: boolean;
    creditImg: HTMLElement;
    creditCardNum: HTMLInputElement;
    creditCardNumCheck: boolean;
    valid: HTMLInputElement;
    cvv: HTMLInputElement;
    validCheck: boolean;
    cvvCheck: boolean;
    error1: HTMLElement;
    error2: HTMLElement;
    error3: HTMLElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.name = document.createElement('input');
        this.nameCheck = true;
        this.phone = document.createElement('input');
        this.phoneCheck = true;
        this.address = document.createElement('input');
        this.addressCheck = true;
        this.email = document.createElement('input');
        this.emailCheck = true;

        this.creditCardNum = document.createElement('input');
        this.creditCardNumCheck = true;
        this.creditImg = document.createElement('div');
        this.valid = document.createElement('input');
        this.validCheck = true;
        this.cvv = document.createElement('input');
        this.cvvCheck = true;
        this.error1 = document.createElement('div');
        this.error2 = document.createElement('div');
        this.error3 = document.createElement('div');

        this.btn = document.createElement('button');
    }
    nameChange() {
        this.nameCheck = false;
        const sp = this.name.value.split(' ');

        if (sp.some((item) => item.length < 3) || sp.length < 2) {
            if (this.name.nextElementSibling) this.name.nextElementSibling.textContent = 'Error';
            return false;
        } else {
            if (this.name.nextElementSibling) this.name.nextElementSibling.textContent = '';
            return true;
        }
    }
    nameInput() {
        this.name.value = this.name.value.replace(/[^А-Я,A-Z, ]/gi, '');
        if (this.nameCheck) return;
        this.nameChange();
    }

    phoneChange() {
        this.phoneCheck = false;
        if (/(\+)[\d]{9,}\d$/gi.test(this.phone.value) && this.phone.value.split('+').length === 2) {
            if (this.phone.nextElementSibling) this.phone.nextElementSibling.textContent = '';
            return true;
        } else {
            if (this.phone.nextElementSibling) this.phone.nextElementSibling.textContent = 'Error';
            return false;
        }
    }
    phoneInput() {
        this.phone.value = this.phone.value.replace(/[^0-9,+]/gi, '');
        if (this.phoneCheck) return;
        this.phoneChange();
    }
    addressChange() {
        this.addressCheck = false;
        const sp = this.address.value.split(' ');

        if (sp.some((item) => item.length < 5) || sp.length < 3) {
            if (this.address.nextElementSibling) this.address.nextElementSibling.textContent = 'Error';
            return false;
        } else {
            if (this.address.nextElementSibling) this.address.nextElementSibling.textContent = '';
            return true;
        }
    }
    addressInput() {
        if (this.addressCheck) return;
        this.addressChange();
    }
    emailChange() {
        this.emailCheck = false;
        const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (reg.test(this.email.value)) {
            if (this.email.nextElementSibling) this.email.nextElementSibling.textContent = '';
            return true;
        } else {
            if (this.email.nextElementSibling) this.email.nextElementSibling.textContent = 'Error';
            return false;
        }
    }
    emailInput() {
        if (this.emailCheck) return;
        this.emailChange();
    }
    creditCardNumChange() {
        this.creditCardNumCheck = false;
        const arr = this.creditCardNum.value.split(' ');
        if (arr.length !== 4 || arr.some((item) => item.length !== 4)) {
            this.error1.textContent = 'Card number - error';
            return false;
        } else {
            this.error1.textContent = '';
            return true;
        }
    }
    creditCardNumInput() {
        this.creditCardNum.value = this.creditCardNum.value.replace(/[^0-9]/gi, '');
        this.creditCardNum.value = this.creditCardNum.value.replace(/(\d{4})/gi, '$1 ');
        if (this.creditCardNum.value.length > 18) this.creditCardNum.value = this.creditCardNum.value.slice(0, 19);
        if (!this.creditCardNum.value) {
            this.creditImg.style.backgroundImage = `url("./assets/icons/pay/0.png")`;
        } else {
            this.creditImg.style.backgroundImage = `url("./assets/icons/pay/${this.creditCardNum.value[0]}.png")`;
        }
        if (this.creditCardNumCheck) return;
        else this.creditCardNumChange();
    }
    validInput() {
        this.valid.value = this.valid.value.replace(/[^0-9]/gi, '');
        this.valid.value = this.valid.value.replace(/(\d{2})/gi, '$1/');
        if (this.valid.value.length > 5) this.valid.value = this.valid.value.slice(0, 5);
        if (this.validCheck) return;
        this.validChange();
    }
    validChange() {
        this.validCheck = false;
        const arr = this.valid.value.split('/');
        const year = new Date().getFullYear();
        const yearCard = Number(`20${arr[1]}`);

        if (Number(arr[0]) === 0 || yearCard < year || Number(arr[0]) > 12 || arr.some((item) => item.length !== 2)) {
            console.log('+Проверка на текущий год');
            this.error2.textContent = 'Card valid thru - error';
            return false;
        } else {
            this.error2.textContent = '';
            return true;
        }
    }
    cvvInput() {
        this.cvv.value = this.cvv.value.replace(/[^0-9]/gi, '');
        if (this.cvv.value.length > 3) this.cvv.value = this.cvv.value.slice(0, 3);
        if (this.cvvCheck) return;
        this.cvvChange();
    }
    cvvChange() {
        this.cvvCheck = false;
        if (this.cvv.value.length !== 3) {
            this.error3.textContent = 'Card CVV - error';
            return false;
        } else {
            this.error3.textContent = '';
            return true;
        }
    }
    checkForms() {
        const arrCheck: boolean[] = [];
        arrCheck.unshift(
            this.nameChange(),
            this.phoneChange(),
            this.addressChange(),
            this.emailChange(),
            this.creditCardNumChange(),
            this.validChange(),
            this.cvvChange()
        );
        if (!arrCheck.every((i) => i)) return;
        localStorage.clear();
        CartInfo.changeLocal();
        const p = this.container.parentNode;
        if (p)
            if (p.parentNode) {
                p.parentNode.textContent = '';

                const modal = document.createElement('modal');
                modal.className = 'modal';
                const wrapper = document.createElement('div');
                wrapper.className = 'modal__wrapper';
                const text = document.createElement('p');
                text.textContent = 'Order is processed. You will be redirected to the main page in';
                const span = document.createElement('span');
                span.textContent = ' 5 second(s)';
                text.append(span);
                wrapper.append(text);
                modal.append(wrapper);
                document.body.append(modal);
                let current = 5;
                setTimeout(function go() {
                    span.textContent = ` ${current - 1} second(s)`;
                    if (current > 0) {
                        setTimeout(go, 1000);
                    }
                    current--;
                    if (current === 0) {
                        window.location.hash = 'main-page';
                        modal.remove();
                    }
                }, 1000);
            }
    }
    removeModal(e: Event) {
        const target = e.target as HTMLElement;
        if (!target.matches('.modal')) return;
        this.container.remove();
    }

    createModal() {
        const wrapper = document.createElement('div');
        wrapper.className = 'modal__wrapper';
        const titlePersonal = document.createElement('h3');
        titlePersonal.className = 'modal__title';
        titlePersonal.textContent = 'Personal details';
        wrapper.append(titlePersonal);

        const modalPersonal = document.createElement('div');
        modalPersonal.className = 'modal__personal';

        const labelName = document.createElement('label') as HTMLLabelElement;
        labelName.className = 'modal__name-label modal__label';
        labelName.setAttribute('for', 'name');
        this.name.className = 'modal__name modal__input';
        this.name.placeholder = 'Name';
        this.name.id = 'name';
        this.name.type = 'text';
        const spanName = document.createElement('span');
        spanName.className = 'modal__error';
        labelName.append(this.name);
        labelName.append(spanName);
        modalPersonal.append(labelName);

        const labelPhone = document.createElement('label') as HTMLLabelElement;
        labelPhone.className = 'modal__phone-label modal__label';
        labelPhone.setAttribute('for', 'phone');
        this.phone.className = 'modal__phone modal__input';
        this.phone.placeholder = 'Phone';
        this.phone.id = 'phone';
        this.phone.type = 'text';
        const spanPhone = document.createElement('span');
        spanPhone.className = 'modal__error';
        labelPhone.append(this.phone);
        labelPhone.append(spanPhone);
        modalPersonal.append(labelPhone);

        const labelAddress = document.createElement('label') as HTMLLabelElement;
        labelAddress.className = 'modal__address-label modal__label';
        labelAddress.setAttribute('for', 'address');
        this.address.className = 'modal__address modal__input';
        this.address.placeholder = 'Address';
        this.address.id = 'address';
        this.address.type = 'text';
        const spanAddress = document.createElement('span');
        spanAddress.className = 'modal__error';
        labelAddress.append(this.address);
        labelAddress.append(spanAddress);
        modalPersonal.append(labelAddress);

        const labelEmail = document.createElement('label') as HTMLLabelElement;
        labelEmail.className = 'modal__email-label modal__label';
        labelEmail.setAttribute('for', 'email');
        this.email.className = 'modal__email modal__input';
        this.email.placeholder = 'E-mail';
        this.email.id = 'email';
        this.email.type = 'text';
        const spanEmail = document.createElement('span');
        spanEmail.className = 'modal__error';
        labelEmail.append(this.email);
        labelEmail.append(spanEmail);
        modalPersonal.append(labelEmail);
        wrapper.append(modalPersonal);

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = 'Credit card details';
        cardTitle.className = 'modal__title';
        wrapper.append(cardTitle);

        const card = document.createElement('div');
        card.className = 'modal__card credit';
        const creditCard = document.createElement('div');
        creditCard.className = 'credit__card';
        this.creditImg.className = 'credit__bank';
        this.creditCardNum.className = 'credit__number';
        this.creditCardNum.type = 'text';
        this.creditCardNum.placeholder = 'Card number';
        creditCard.append(this.creditImg);
        creditCard.append(this.creditCardNum);
        card.append(creditCard);

        const creditInfo = document.createElement('div');
        creditInfo.className = 'credit__info';
        const labelValid: HTMLLabelElement = document.createElement('labbel') as HTMLLabelElement;
        labelValid.setAttribute('for', 'valid');
        labelValid.className = 'credit__valid';
        const spanValid = document.createElement('span');
        spanValid.textContent = 'Valid: ';
        this.valid.className = 'credit__input-valid credit__info-input';
        this.valid.placeholder = 'Valid Thru';
        this.valid.type = 'text';
        this.valid.id = 'valid';
        labelValid.append(spanValid);
        labelValid.append(this.valid);
        creditInfo.append(labelValid);

        const labelCvv: HTMLLabelElement = document.createElement('labbel') as HTMLLabelElement;
        labelCvv.setAttribute('for', 'cvv');
        labelCvv.className = 'credit__cvv';
        const spanCvv = document.createElement('span');
        spanCvv.textContent = 'CVV: ';
        this.cvv.className = 'credit__input-cvv credit__info-input';
        this.cvv.placeholder = 'CVV';
        this.cvv.type = 'text';
        this.cvv.id = 'cvv';
        labelCvv.append(spanCvv);
        labelCvv.append(this.cvv);
        creditInfo.append(labelCvv);

        card.append(creditInfo);

        wrapper.append(card);

        const blockError = document.createElement('div');
        blockError.className = 'modal__error errors';
        this.error1.className = 'errors__item';
        this.error2.className = 'errors__item';
        this.error3.className = 'errors__item';
        blockError.append(this.error1);
        blockError.append(this.error2);
        blockError.append(this.error3);
        wrapper.append(blockError);

        this.btn.className = 'btn modal__btn';
        this.btn.textContent = 'Confirm';
        wrapper.append(this.btn);

        this.container.append(wrapper);
    }
    render(): HTMLElement {
        this.createModal();

        this.name.addEventListener('input', this.nameInput.bind(this));
        this.phone.addEventListener('input', this.phoneInput.bind(this));
        this.address.addEventListener('input', this.addressInput.bind(this));
        this.email.addEventListener('input', this.emailInput.bind(this));
        this.creditCardNum.addEventListener('input', this.creditCardNumInput.bind(this));
        this.name.addEventListener('change', this.nameChange.bind(this));
        this.phone.addEventListener('change', this.phoneChange.bind(this));
        this.address.addEventListener('change', this.addressChange.bind(this));
        this.email.addEventListener('change', this.emailChange.bind(this));
        this.creditCardNum.addEventListener('change', this.creditCardNumChange.bind(this));

        this.valid.addEventListener('input', this.validInput.bind(this));
        this.valid.addEventListener('change', this.validChange.bind(this));
        this.cvv.addEventListener('input', this.cvvInput.bind(this));
        this.cvv.addEventListener('change', this.cvvChange.bind(this));

        this.btn.addEventListener('click', this.checkForms.bind(this));
        this.container.addEventListener('click', this.removeModal.bind(this));
        return this.container;
    }
}
