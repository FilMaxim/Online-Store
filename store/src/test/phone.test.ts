import Modal from '../core/components/cart/modal/modal';

describe('Check phone', () => {
    const testCase = [{ in: '909098709897766' }, { in: '+989+989898989' }, { in: '' }, { in: '7878' }, { in: '+9087' }];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: false`, () => {
            const res = Modal.checkPhone(item.in);
            expect(res).toBeFalsy();
        });
    });
});
