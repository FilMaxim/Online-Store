import { Product } from '../types';
import SortSelect from '../core/components/main/sortSelect';

interface Prod {
    in: Product[];
}

describe('Check selection of all categories and brands', () => {
    const testCase: Prod[] = [
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
        },
        { in: [] },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.in.length}`, () => {
            const res = SortSelect.sortObj(item.in, ['abs,price']);
            expect(res).toHaveLength(item.in.length);
        });
    });
});
