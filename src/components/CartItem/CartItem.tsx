import Image from 'next/image'
import { ICartItem } from '../../app/interfaces'
import './style.scss';
import Rating from '../Rating/Rating';
import iconMinus from '../../../public/minus-sign.svg';
import iconPlus from '../../../public/plus-sign.svg';
import imageFiller from '../../../public/book_filler.png'
import { checkAndCutByCharNum, currencyCodeToSymbol, getCurrencySymbol, getPrice, getPriceNumber } from '@/app/utils';
import { removeBook, addBook } from '@/app/cartSlice';
import { useDispatch } from 'react-redux';

function CartItem(cartItem: ICartItem) {
    const dispatch = useDispatch();
    const charLimitAuthors = 40;
    const charLimitTitle = 40;

    return (
    <div className='cart-item'>
        <Image className="cart-item__image" 
            src={cartItem.book.volumeInfo.imageLinks?.thumbnail 
                ? cartItem.book.volumeInfo.imageLinks.thumbnail : imageFiller}
            alt="Book cover" 
            width='102'
            height='151'
        />
        <div className='cart-item-info'>
            <span className='cart-item-info__text-title'>
                {checkAndCutByCharNum(
                    cartItem.book.volumeInfo.title,
                    charLimitTitle)
                }
            </span>
            <span className='cart-item-info__text-authors'>
                {checkAndCutByCharNum(
                    cartItem.book.volumeInfo.authors 
                        ? cartItem.book.volumeInfo.authors.join(", ") : "",
                    charLimitAuthors)
                }
            </span>
            <Rating 
                averageRating={cartItem.book.volumeInfo.averageRating 
                    ? cartItem.book.volumeInfo.averageRating : 0}
                reviews={cartItem.book.volumeInfo.ratingsCount 
                    ? cartItem.book.volumeInfo.ratingsCount : 0}
            />
        </div>
        <div className='cart-item-amount'>
            <button className='cart-item-amount__button_minus'
                onClick={() => {
                    dispatch(removeBook(cartItem.book));
                }}
            >
                <Image className="cart-item-amount__image" 
                    src={iconMinus} 
                    alt="minus sign" 
                    width='22'
                    height='25'
                />
            </button>
            <span className='cart-item-amount__text-total'>
                {cartItem.amount}
            </span>
            <button className='cart-item-amount__button_plus'
                onClick={() => {
                    dispatch(addBook(cartItem.book));
                }}
            >
                <Image className="cart-item-amount__image" 
                    src={iconPlus} 
                    alt="plus sign" 
                    width='22'
                    height='25'
                />
            </button>

        </div>
        <span className='cart-item__text-price'>
            {getCurrencySymbol(cartItem.book) 
                + (getPriceNumber(cartItem.book) * cartItem.amount).toFixed(2)}
        </span>
        <span className='cart-item__text-delivery'>
            Shipping: delivery
        </span>
    </div>
    )
}
  
export default CartItem