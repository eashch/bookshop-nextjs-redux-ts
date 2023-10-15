"use client";
import { useEffect, useState } from 'react';
import Sticker from '../Sticker/Sticker';
import './style.scss';
import Image from 'next/image';
import { ISlider } from '../../app/interfaces';

function Slider(propsSlider: ISlider) {
    const switchTime = 5000;
    const [currentBanner, setCurrentBanner] = useState<number>(0);
    const [switcherInterval, setSwitcherInterval] 
        = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(prev => {
                return (prev + 1) % propsSlider.banners.length;
            });
        }, switchTime);
        setSwitcherInterval(interval);
        
        return () => clearInterval(interval);
    }, []);

    const addSwitcherButtons = (): JSX.Element[] => {
        const buttons: JSX.Element[] = [];
        propsSlider.banners.forEach((item, index) => {
            buttons.push(
                <button 
                    className={'button slider__switcher-button'
                        + (currentBanner === index 
                            ? ' slider__switcher-button_selected' 
                            : '')
                    }
                    key={index}
                    onClick={() => {
                        setCurrentBanner(index);
                        if (switcherInterval)
                            clearInterval(switcherInterval);
                        const interval = setInterval(() => {
                            setCurrentBanner(prev => {
                                return (prev + 1) % propsSlider.banners.length;
                            });
                        }, switchTime);
                        setSwitcherInterval(interval);
                    }}
                >

                </button>
            );
        });
        return buttons;
    }
    
    return (
    <div className="slider-container">
        <div className="slider">
            <Image className="slider__image" 
                src={propsSlider.banners[currentBanner].src}
                alt={propsSlider.banners[currentBanner].alt}
                width="1120" height="702"
            />
            <div className="slider__switcher">
                {addSwitcherButtons()}
            </div>
        </div>
        <Sticker 
            nameOfClass='sticker__old-book-exchange'
        >
            Change<br />old book<br />on new<br />
        </Sticker>
        <Sticker 
            nameOfClass='sticker__top-books-2022'
        >
            Top<br />100<br />books<br />2022<br />
        </Sticker>
    </div>
    )
}
  
export default Slider