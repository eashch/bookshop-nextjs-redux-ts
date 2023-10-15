import { IBookInfoGoogleBooksAPI } from "./interfaces";


export function checkAndCutByCharNum(str: string, numOfChars: number): string {
    if (str === undefined)
        return "";
    return str.length < numOfChars
        ? str : str.slice(0, numOfChars - 3) + "...";
};

export function getPrice(book: IBookInfoGoogleBooksAPI): string {
    if (!book.saleInfo.retailPrice 
        || !book.saleInfo.retailPrice.amount
        || !book.saleInfo.retailPrice.currencyCode)
        return "";
    return (currencyCodeToSymbol(book.saleInfo.retailPrice.currencyCode)) 
            + book.saleInfo.retailPrice.amount;
}

export function getCurrencySymbol(book: IBookInfoGoogleBooksAPI): string {
    if (!book.saleInfo.retailPrice 
        || !book.saleInfo.retailPrice.amount
        || !book.saleInfo.retailPrice.currencyCode)
        return "$";
    return (currencyCodeToSymbol(book.saleInfo.retailPrice.currencyCode)) 
}

export function getPriceNumber(book: IBookInfoGoogleBooksAPI): number {
    if (!book.saleInfo.retailPrice 
        || !book.saleInfo.retailPrice.amount
        || !book.saleInfo.retailPrice.currencyCode)
        return 0;
    return book.saleInfo.retailPrice.amount;
}

export function currencyCodeToSymbol(currencyCode: string): string {
    const currencySymbols = {
        USD: '$',
        EUR: '€',
        CRC: '₡', 
        GBP: '£',
        ILS: '₪',
        INR: '₹',
        JPY: '¥',
        KRW: '₩',
        NGN: '₦',
        PHP: '₱',
        PLN: 'zł',
        PYG: '₲',
        THB: '฿',
        UAH: '₴',
        VND: '₫',
    };

    type ObjectKey = keyof typeof currencySymbols;
    return currencySymbols[currencyCode as ObjectKey] === undefined 
        ? "" : currencySymbols[currencyCode as ObjectKey];
}
