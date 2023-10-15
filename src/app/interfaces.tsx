
export interface IBookInfoGoogleBooksAPI {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        imageLinks: {
            thumbnail: string;
        }
        averageRating: number;
        ratingsCount: number;
    }
    saleInfo: {
        retailPrice: {
            amount: number,
            currencyCode: string
        }
    }
}

export interface ICartItem {
    book: IBookInfoGoogleBooksAPI,
    amount: number
}

export interface IBanner {
    src: string,
    alt: string
} 

export interface ISlider {
    banners: IBanner[]
}

export interface ISticker {
    nameOfClass: string
}

export interface ILogInField {
    name: string,
    type: string,
    textError: string,
    showError: boolean,
    onChange: (event: React.FormEvent<HTMLInputElement>) => void 
}

export interface IRating {
    averageRating: number,
    reviews: number
}