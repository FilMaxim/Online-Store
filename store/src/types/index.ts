export interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    textContent?: string;
    thumbnail: string;
    title: string;
}

//для страницы main
export interface IUrlHashParametr {
    [key: string]: string;
}

//для фильтра
interface ICountProduct {
    [key: string]: number;
}
export interface ICountProducts {
    category: ICountProduct[];
    brand: ICountProduct[];
}
export interface IParametrs {
    category: string[];
    brand: string[];
    sort: string;
    search: string;
    big: boolean;
    price: number[];
    stok: number[];
}
