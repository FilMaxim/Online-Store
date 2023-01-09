import Range from '../core/components/main/range';
import { Product } from '../types';
interface TestProducts {
    in: Product[];
    category: 'price' | 'stock';
    out: Product[];
}

describe('Check sort on range', () => {
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
                    price: 12,
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
            category: 'price',
            out: [
                {
                    brand: 'as',
                    category: 'ni',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 12,
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
        {
            in: [
                {
                    brand: 'as',
                    category: 'ni',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 12,
                    rating: 23,
                    stock: 56,
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
                    stock: 12,
                    thumbnail: 'ss',
                    title: 'sd',
                },
            ],
            category: 'stock',
            out: [
                {
                    brand: 'ti',
                    category: 'all',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 23,
                    rating: 23,
                    stock: 12,
                    thumbnail: 'ss',
                    title: 'sd',
                },
                {
                    brand: 'as',
                    category: 'ni',
                    description: 'test',
                    discountPercentage: 2,
                    id: 2,
                    images: [],
                    price: 12,
                    rating: 23,
                    stock: 56,
                    thumbnail: 'ss',
                    title: 'sd',
                },
            ],
        },

        {
            in: [],
            category: 'stock',
            out: [],
        },
    ];
    testCase.forEach((item) => {
        it(`Enter: ${item.in} expect: ${item.out}`, () => {
            const res = Range.sortObj(item.in, item.category);
            expect(res).toEqual(item.out);
        });
    });
});
