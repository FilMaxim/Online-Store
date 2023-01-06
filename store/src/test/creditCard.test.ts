import Modal from '../core/components/cart/modal/modal';

describe('Check number credit card', () => {
    const testCase = [
        { in: '9898 8787 7676 1212', out: true },
        { in: '9898 8787 7676 12', out: false },
        { in: '', out: false },
        { in: '9898 8787', out: false },
        { in: '0234 1234 2323 0000', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkCredit(item.in);
            expect(res).toBe(item.out);
        });
    });
});
