import Modal from '../core/components/cart/modal/modal';

describe('Check phone', () => {
    const testCase = [
        { in: '+89234567656', out: true },
        { in: '+989+989898989', out: false },
        { in: '', out: false },
        { in: '+7878', out: false },
        { in: '+90876765454342', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkPhone(item.in);
            expect(res).toBe(item.out);
        });
    });
});
