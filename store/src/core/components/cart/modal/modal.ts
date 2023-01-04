import Component from '../../../templates/components';

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

    checkForms() {
        const arrCheck: boolean[] = [];
        arrCheck.unshift(this.nameChange(), this.phoneChange(), this.addressChange(), this.emailChange());
        if (!arrCheck.every((i) => i)) return;
        console.log(12);
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

        this.btn.className = 'btn modal__btn';
        this.btn.textContent = 'Confirm';
        wrapper.append(this.btn);

        this.container.append(wrapper);

        //   this.container.innerHTML = `  <div class="modal__wrapper">
        //   <h3 class="modal__title">Personal details</h3>
        //   <div class = 'modal__personal'>
        //   <label class='modal__name-label modal__label' for='name'>
        //   <input type="text" id='name' class="modal__name modal__input" placeholder="Name"><span class=modal__error></span>
        //   </label>
        //   <label class='modal__phone-label modal__label' for='phone'>
        //   <input type="text" id='phone' class="modal__phone modal__input" placeholder="Phone"><span class=modal__error>   </span>
        //   </label>
        //   <label class='modal__adress-label modal__label' for='adress'>
        //   <input type="text" d='adress' class="modal__adress modal__input" placeholder="Adress"><span class=modal__error>Rrror</span>
        //   </label>
        //   <label class='modal__email-label modal__label' for='email'>
        //   <input type="text" id='email' class="modal__email modal__input" placeholder="Email"><span class=modal__error></span>
        //   </div>
        //   </label>
        //   <h3 class="modal__title">Credit card details </h3>
        //   <div class="modal__card credit">
        //     <div class="credit__card">
        //       <div class="credit__bank"></div>
        //       <input type="text" class="credit__number">
        //     </div>
        //     <div class="credit__info">
        //       <label for="valid" class="credit__valid">
        //         <span>Valid</span>
        //         <input type="text" id="valid" class="credit__input-vald credit__info-input">
        //       </label>
        //       <label for="cvv" class="credit__cvv">
        //         <span>CVV</span>
        //         <input type="text" id="cvv" class="credit__input-cvv credit__info-input">
        //       </label>

        //     </div>
        //   </div>

        // </div>`;
    }
    render(): HTMLElement {
        this.createModal();
        this.name.addEventListener('change', this.nameChange.bind(this));
        this.name.addEventListener('input', this.nameInput.bind(this));
        this.phone.addEventListener('change', this.phoneChange.bind(this));
        this.phone.addEventListener('input', this.phoneInput.bind(this));
        this.address.addEventListener('change', this.addressChange.bind(this));
        this.address.addEventListener('input', this.addressInput.bind(this));
        this.email.addEventListener('change', this.emailChange.bind(this));
        this.email.addEventListener('input', this.emailInput.bind(this));
        this.btn.addEventListener('click', this.checkForms.bind(this));
        this.container.addEventListener('click', this.removeModal.bind(this));
        return this.container;
    }
}
