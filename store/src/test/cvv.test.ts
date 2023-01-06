import Modal from '../core/components/cart/modal/modal';

describe('Check CVV', () => {
    const testCase = [{ in: '123' }, { in: '096' }, { in: '875' }];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: true`, () => {
            const res = Modal.checkCVV(item.in);
            expect(res).toBeTruthy();
        });
    });
});
