import Modal from '../core/components/cart/modal/modal';

describe('Check address', () => {
    const testCase = [
        { in: 'Sergiev Posad street Kalinina house5', out: true },
        { in: 'Sergiev Posad street Kalinina house 5a', out: false },
        { in: '', out: false },
        { in: 'Sergiev Posad', out: false },
        { in: 'Sergiev Posad house5', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkAdress(item.in);
            expect(res).toBe(item.out);
        });
    });
});
