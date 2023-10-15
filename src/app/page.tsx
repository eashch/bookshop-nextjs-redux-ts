"use client"
import Slider from '@/components/Slider/Slider'
import Image from 'next/image'
import './page.scss';
import './basic-elements.scss';
import iconOpenBook from '../../public/content-menu__button.svg'
import ContentMenu from '@/components/ContentMenu/ContentMenu';
import BookItem from '@/components/BookItem/BookItem';
import { RootState } from './storage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IBookInfoGoogleBooksAPI } from './interfaces';

export default function Home() {
    const categorySlice = useSelector((state: RootState) => state.categorySlice);
    const dispatch = useDispatch();
    const [startIndex, setStartIndex] = useState<number>(0);
    const [books, setBooks] = useState<IBookInfoGoogleBooksAPI[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');

    useEffect(() => {
        setBooks([]);
        loadBooks(false);
        setCurrentCategory(categorySlice.lastCategory);
        
    }, [categorySlice.lastCategory]);

    const loadBooks = async function(addToExist: boolean) {
        const indexStart = currentCategory === categorySlice.lastCategory 
            ? startIndex : 0;

        // This request should be refetched on every request.
        // Similar to `getServerSideProps`.
        const resp = await fetch(`/api/books?category=${categorySlice.lastCategory}&startIndex=${indexStart}`,
                     { cache: 'no-store' });
        setStartIndex(indexStart + 6);
        
        if (resp.status == 200) {
            const booksData = await resp.json();
            if (!booksData || !booksData.items)
                    return;
            if (addToExist)
                setBooks(prev => [...prev, ...booksData.items]);
            else
                setBooks(prev => [...booksData.items]);
        }
    }

    const createBookItems = (): JSX.Element[] => {
        return books.map((item, index) => {
            return (
                <BookItem 
                    key={index}
                    {...item}
                />
            );
        });
    }

    return (
        <main className="main">
            <Slider 
                banners={[
                    {src: '/banner_cozy-books.png', 
                        alt: 'Cozy books banner'},
                    {src: '/banner_friday-sale.png', 
                        alt: 'Friday sale banner'},
                    {src: '/banner_top-10.png', 
                        alt: 'Top 10 banner'}
                ]}
            />
            <div className="content">
                <ContentMenu />
                <button className="button content-menu__button-open-mobile">
                    <Image className="content-menu__icon_open-book" 
                        src={iconOpenBook}
                        width="40" height="40" alt="Open book"
                    />
                </button>
                <div className="content-container">
                    <div className="books-container">
                        {createBookItems()}
                    </div>
                    <button className="text button_with-text content__button-load-more"
                        onClick={() => {
                            loadBooks(true);
                        }}
                    >
                        Load more
                    </button>
                </div>
            </div>
        </main>
    )
}
