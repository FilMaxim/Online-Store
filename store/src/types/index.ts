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
    num?: number;
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
//тип для корзины в localStorage
export interface TypeCart {
    id: number;
    count: number;
    price: number;
}

//тип для промокода
export interface IPromo {
    id: string;
    text: string;
    proc: number;
}

export type FunctionalType = (p1: number) => null;
