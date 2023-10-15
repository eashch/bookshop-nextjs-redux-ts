"use client"
import './page.scss';
import CartItem from '@/components/CartItem/CartItem';
import { RootState } from '../storage';
import { useSelector } from 'react-redux';
import { getCurrencySymbol, getPriceNumber } from '../utils';

function Cart() {
    const cartSlice = useSelector((state: RootState) => state.cartSlice);
    const auth = useSelector((state: RootState) => state.authSlice);

    const addCartItems = (): JSX.Element[] => {
        return cartSlice.books.map((item, index) => {
            return (
                <CartItem 
                    key={item.book.id}
                    {...item}
                />
            );
        });
    }

    return (
    <main className='main'>
        <div className='cart'>
            <h3 className='cart__text-title'>
                SHOPPING CART
            </h3>
            <div className='cart-header'>
                <span className='cart-header__text-header cart-header__text-header_item'>
                    ITEM
                </span>
                <span className='cart-header__text-header cart-header__text-header_quantity'>
                    QUANTITY
                </span>
                <span className='cart-header__text-header  cart-header__text-header_price'>
                    PRICE
                </span>
                <span className='cart-header__text-header'>
                    DELIVERY
                </span>
            </div>
            <div className='cart-items'>
                {addCartItems()}
            </div>
            <h3 className='cart__text-total-price'>
                TOTAL PRICE: {cartSlice.books.length > 0 
                    ? (getCurrencySymbol(cartSlice.books[0].book) 
                        + (cartSlice.books.reduce((accumulator, cartItem) => accumulator + getPriceNumber(cartItem.book) * cartItem.amount, 0)))
                    : 0
                }
            </h3>
            {auth.isLoggedIn 
                ? 
                <button className='text button_with-text cart__button-checkout'>
                    CHECKOUT
                </button>
                :
                <p className='cart__text-error'>
                    Please log in to checkout
                </p>
            }
            
        </div>
    </main>
    )
}
  
export default Cart