"use client"
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/storage';
import { setCategory } from '@/app/categorySlice';

class BookCategory {
    name: string;
    apiName: string;
    constructor(name: string, apiName: string) {
        this.name = name;
        this.apiName = apiName;
    }
}

function ContentMenu() {
    const categorySlice = useSelector((state: RootState) => state.categorySlice);
    const dispatch = useDispatch();
    const menuCategories: BookCategory[] = [
        new BookCategory("Architecture", "Architecture"), 
        new BookCategory("Art & Fashion", "Art"), 
        new BookCategory("Biography", "Biography & Autobiography"), 
        new BookCategory("Business", "Business"), 
        new BookCategory("Crafts & Hobbies", "Crafts & Hobbies"),
        new BookCategory("Drama", "Drama"),
        new BookCategory("Fiction", "Fiction"),
        new BookCategory("Food & Drink", "Cooking"),
        new BookCategory("Health & Wellbeing", "Health & Fitness"),
        new BookCategory("History & Politics", "History"),
        new BookCategory("Humor", "Humor"),
        new BookCategory("Poetry", "Poetry"),
        new BookCategory("Psychology", "Psychology"),
        new BookCategory("Science", "Science"),
        new BookCategory("Technology", "Technology"),
        new BookCategory("Travel & Maps", "Travel"),
    ];

    const fillWithCategories = (): JSX.Element[] => {
        const categories: JSX.Element[] = menuCategories.map((element: BookCategory, index: number) => {
            return (
                <a className={'link content-menu__option'
                        + (categorySlice.lastCategory === element.apiName
                            ? ' content-menu__option_selected' : '')
                    }
                    key={index}
                    onClick={() => {
                        dispatch(setCategory(element.apiName));
                    }}
                >
                    <div className='content-menu__option-indicator'
                        style={{visibility: (categorySlice.lastCategory === element.apiName 
                            ? 'visible' : 'hidden')}}
                    >
                    </div>
                    {element.name}
                </a>
            );
        });
        return categories
    }

    return (
        <div className="content-menu">
            {fillWithCategories()}
        </div>
    )
}
  
export default ContentMenu