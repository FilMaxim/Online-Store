import Modal from '../core/components/cart/modal/modal';

describe('Check email', () => {
    const testCase = [
        { in: 'ok@mail.ru', out: true },
        { in: 'helloo.ru', out: false },
        { in: '', out: false },
        { in: '@mail.ru', out: false },
        { in: 'ok.yan@yandex.ru', out: true },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Modal.checkEmail(item.in);
            expect(res).toBe(item.out);
        });
    });
});
