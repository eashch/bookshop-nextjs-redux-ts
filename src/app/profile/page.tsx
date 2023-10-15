"use client"
import './page.scss';
import Image from 'next/image';
import imageProfile from '../../../public/profile.png';
import { RootState } from '../storage';
import { useSelector } from 'react-redux';

function Profile() {
    const auth = useSelector((state: RootState) => state.authSlice);

    return (
    <main className='main'>
        <div className='profile'>
            <div className='profile-container'>
                <h3 className='profile-container__text-title'>PROFILE</h3>
                <div>
                    <Image 
                        src={imageProfile}
                        alt='Profile picture'
                        width={235}
                        height={235}
                    />
                    <div className='profile-info'>
                        <div>
                            <span className='profile-info__text_small'>
                                YOUR NAME
                            </span>
                            <h3 className='profile-info__text_big'>
                                John Smith
                            </h3>
                        </div>
                        <div>
                            <span className='profile-info__text_small'>
                                YOUR EMAIL
                            </span>
                            <h3 className='profile-info__text_big'>
                                {auth.email}
                            </h3>
                        </div>
                        <button className='button button_with-text profile-info__button-edit'>
                            EDIT PROFILE
                        </button>
                    </div>
                </div>
            </div>
            <div className='about-me'>
                <p className='about-me__text-title'>
                    ABOUT ME
                </p>
                <span className='about-me__text-description'>
                    Lorem ipsum dolor sit amet, consectetur<br />adipiscing elit. Sed in ante consequat,<br /> 
                    ornare nisi et, ultrices libero. Nunc nibh dolor,<br />maximus quis auctor nec, tempor<br />
                    quis ipsum. Proin mollis pellentesque nulla ac<br />varius.
                </span>
            </div>
        </div>
    </main>
    )
}
  
export default Profile