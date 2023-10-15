"use client"
import Image from 'next/image'
import { IBookInfoGoogleBooksAPI } from '../../app/interfaces'
import './style.scss';
import { useDispatch } from 'react-redux';
import { addBook } from '../../app/cartSlice';
import imageFiller from '../../../public/book_filler.png'
import Rating from '../Rating/Rating';
import { checkAndCutByCharNum, getPrice } from '@/app/utils';

function BookItem(bookInfo: IBookInfoGoogleBooksAPI) {
    const dispatch = useDispatch();
    const charLimitDescription = 97;
    const charLimitAuthors = 40;
    const charLimitTitle = 40;
    
    return (
    <div className='book'>
        <Image className="book__image" 
            src={bookInfo.volumeInfo.imageLinks?.thumbnail 
                ? bookInfo.volumeInfo.imageLinks.thumbnail : imageFiller} 
            alt="Book cover" 
            width="212" height="300"
        />
        <div className="book-description">
            <span className="text-description book-description__author ellipsis">
                {checkAndCutByCharNum(
                    bookInfo.volumeInfo.authors 
                        ? bookInfo.volumeInfo.authors.join(", ") : "",
                    charLimitAuthors)
                }
            </span>
            <h3 className="book-description__title ellipsis">
                {checkAndCutByCharNum(
                    bookInfo.volumeInfo.title,
                    charLimitTitle)
                }
            </h3>
            <Rating 
                averageRating={bookInfo.volumeInfo.averageRating 
                    ? bookInfo.volumeInfo.averageRating : 0}
                reviews={bookInfo.volumeInfo.ratingsCount 
                    ? bookInfo.volumeInfo.ratingsCount : 0}
            />
            <p className="text-description book-description__description ellipsis">
                {checkAndCutByCharNum(
                    bookInfo.volumeInfo.description, 
                    charLimitDescription)
                }
            </p>
            <span className="text book-description__price">
                {getPrice(bookInfo)}
            </span>
            <button className="button_with-text book-description__button-buy"
                onClick={() => {
                    const info: IBookInfoGoogleBooksAPI = {
                        id: "",
                        volumeInfo: {
                            title: "asd",
                            authors: [],
                            description: "sfsafas",
                            imageLinks: {
                                thumbnail: "fasdf"
                            },
                            averageRating: 3,
                            ratingsCount: 4
                        },
                        saleInfo: {
                            retailPrice: {
                                amount: 12,
                                currencyCode: "asdf"
                            }
                        }
                    };
                    dispatch(addBook(bookInfo));
                }}
            >
                Buy now
            </button>
        </div>
    </div>
    )
}
  
export default BookItem