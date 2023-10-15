import { PropsWithChildren } from 'react';
import Image from 'next/image'
import './style.scss';
import iconArrow from '../../../public/sticker_arrow.svg';
import { ISticker } from '../../app/interfaces';

function Sticker(propsISticker: PropsWithChildren<ISticker>) {
    return (
    <div className={propsISticker.nameOfClass}>
        <a className="link text-highlight">
            {propsISticker.children}
            <Image className="sticker__arrow" 
                src={iconArrow}
                width="55" height="12" alt="Arrow points right" 
            />
        </a>
    </div>
    )
}
  
export default Sticker