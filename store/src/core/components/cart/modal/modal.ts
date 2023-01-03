import Component from '../../../templates/components';

export default class Modal extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    removeModal(e: Event) {
        const target = e.target as HTMLElement;
        if (!target.matches('.modal')) return;
        this.container.remove();
    }
    createModal() {
        this.container.innerHTML = `  <div class="modal__wrapper">
        <h3 class="modal__title">Personal details</h3>
        <div class = 'modal__personal'>
        <input type="text" class="modal__name modal__input" placeholder="Name"><span class=modal__error>Error</span>
        <input type="text" class="modal__phone modal__input" placeholder="Phone"><span class=modal__error>Error</span>
        <input type="text" class="modal__adress modal__input" placeholder="Adress"><span class=modal__error></span>
        <input type="text" class="modal__email modal__input" placeholder="Email"><span class=modal__error></span>
        </div>
        <h3 class="modal__title">Credit card details </h3>
        <div class="modal__card credit">
          <div class="credit__card">
            <div class="credit__bank"></div>
            <input type="text" class="credit__number">
          </div>
          <div class="credit__info">
            <label for="valid" class="credit__valid">
              <span>Valid</span>
              <input type="text" id="valid" class="credit__input-vald credit__info-input">
            </label>
            <label for="cvv" class="credit__cvv">
              <span>CVV</span>
              <input type="text" id="cvv" class="credit__input-cvv credit__info-input">
            </label>
    
          </div>
        </div>
    
    
      </div>`;
    }
    render(): HTMLElement {
        this.createModal();
        this.container.addEventListener('click', this.removeModal.bind(this));
        return this.container;
    }
}
