import Modal from '../core/components/cart/modal/modal';

describe('Check name user', () => {
    const testCase = [
        { in: 'Kalinina Oksana', out: true },
        { in: 'helloo.ru', out: false },
        { in: '', out: false },
        { in: 'Kalinina Ok', out: false },
        { in: 'Kalinina Oksana Vladimirovna', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkName(item.in);
            expect(res).toBe(item.out);
        });
    });
});
