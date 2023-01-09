import Modal from '../core/components/cart/modal/modal';

describe('Check number credit card', () => {
    const testCase = [
        { in: '12/23', out: true },
        { in: '23/23', out: false },
        { in: '', out: false },
        { in: '10/21', out: false },
        { in: '09/23', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkValid(item.in);
            expect(res).toBe(item.out);
        });
    });
});
