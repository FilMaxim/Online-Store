import { Product } from '../types';
import Filter from '../core/components/main/filter';

interface TestCatBrand {
    [key: string]: number;
}
interface TestProducts {
    in: Product[];
    out: {
        category: TestCatBrand[];
        brand: TestCatBrand[];
    };
}

describe('Check selection of all categories and brands', () => {
    const testCase: TestProducts[] = [
        {
            in: [
                {
                    brand: 'as',
                    category: 'ni',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 23,
                    rating: 23,
                    stock: 23,
                    thumbnail: 'ss',
                    title: 'sd',
                },
                {
                    brand: 'ti',
                    category: 'all',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 23,
                    rating: 23,
                    stock: 23,
                    thumbnail: 'ss',
                    title: 'sd',
                },
            ],
            out: { category: [{ ni: 1 }, { all: 1 }], brand: [{ as: 1 }, { ti: 1 }] },
        },
        {
            in: [],
            out: { category: [], brand: [] },
        },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Filter.arrCategories(item.in);
            expect(res).toEqual(item.out);
        });
    });
});
