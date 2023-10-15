"use client"
import Image from 'next/image';
import './style.scss';
import iconMenuMobile from '../../../public/header__icon_menu-mobile.svg';
import iconUser from '../../../public/header__icon_user.svg';
import iconShopBag from '../../../public/header__icon_shop-bag.svg';
import LogInBlock from '../LogInBlock/LogInBlock';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/storage';

function HeaderBlock() {
    const router = useRouter();
    const [logInMenuOpen, setLogInMenuOpen] = useState<boolean>(false);
    const cartState = useSelector((state: RootState) => state.cartSlice);

    return (
    <header className="header">
        <div className="header-content">
                <h1 className="title" 
                    onClick={() => router.push('/')}
                >
                    Bookshop
                </h1>
            <nav className="navigation">
                <ul>
                    <li className="navigation__li-item">
                        <a className="navigation__link navigation__link_active">Books</a>
                    </li>
                    <li className="navigation__li-item">
                        <a className="navigation__link">Audiobooks</a>
                    </li>
                    <li className="navigation__li-item">
                        <a className="navigation__link">Stationery & gifts</a>
                    </li>
                    <li className="navigation__li-item">
                        <a className="navigation__link">Blog</a>
                    </li>
                </ul>
            </nav>
            <div className="header-buttons">
                <button className="button header-buttons__button header-buttons__button_menu-mobile">
                    <Image className="header-buttons__icon_menu-mobile" 
                        src={iconMenuMobile}
                        width="12" height="15" alt="Menu icon" 
                    />
                </button>
                <div className='header-buttons__button-profile-container'>
                    <button className="button header-buttons__button header-buttons__button_user"
                        onClick={() => {
                            setLogInMenuOpen(prevState => !prevState);
                        }}
                    >
                        <Image className="header-buttons__icon_user" 
                            src={iconUser}
                            width="12" height="15" alt="User profile icon" 
                        />
                    </button>
                    <div className="shopping-cart__wrapper">
                        {logInMenuOpen ? <LogInBlock /> : <></>}
                    </div>
                </div>
                <button className="button header-buttons__button header-buttons__button_shopping-cart"
                    onClick={() => router.push('/cart')}
                >
                    <Image className="header-buttons__shopping-cart"
                        src={iconShopBag} 
                        width="13.68" height="17" alt="Shopping bag icon"
                    />
                    <div className="shopping-cart__wrapper">
                        <div className="books-counter">
                            {cartState.books.length}
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </header>
    )
}
  
export default HeaderBlock