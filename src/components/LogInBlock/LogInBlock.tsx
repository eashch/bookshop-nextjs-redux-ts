"use client"
import { useRouter } from 'next/navigation';
import './style.scss';
import { ILogInField } from '../../app/interfaces';
import { useState } from 'react';
import { RootState } from '@/app/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, setIsLoggedIn } from '@/app/authSlice';

function LogInField(propsField: ILogInField) {
    return (
        <div className='log-in-field'>
            <label className='log-in-field__text-name'>
                {propsField.name}
            </label>
            <input className='log-in-field__input' 
                type={propsField.type}
                name={propsField.name}
                onChange={(event: React.FormEvent<HTMLInputElement>) => propsField.onChange(event)}
            />
            <label className='log-in-field__text-error'
                style={{visibility: propsField.showError ? "visible" : "hidden"}}
            >
                {propsField.textError}
            </label>
        </div>
    )
}



function LogInBlock() {
    const router = useRouter();
    const [emailText, setEmailText] = useState<string>('');
    const [passwordText, setPasswordText] = useState<string>('');
    const [hasErrorEmail, setHasErrorEmail] = useState<boolean>(false);
    const [hasErrorPassword, setHasErrorPassword] = useState<boolean>(false);
    const auth = useSelector((state: RootState) => state.authSlice);
    const dispatch = useDispatch();

    const logIn = async function() {
        const emailPreSend = emailText;
        const passPreSend = passwordText;
        const resp = await fetch(`/api/auth?email=${emailPreSend}&password=${passPreSend}`,
            { cache: 'no-store' });           
        setHasErrorEmail(resp.statusText.includes('email'));
        setHasErrorPassword(resp.statusText.includes('password'));
        
        if (resp.status == 200) {
            dispatch(setEmail(emailPreSend));
            dispatch(setPassword(passPreSend));
            dispatch(setIsLoggedIn(true));
        }
    }

    return (
        !auth.isLoggedIn ?
        (
            <div className='log-in-block'
                onClick={(event) => event.stopPropagation()}
            >
                <p className='log-in-block__title'>
                    Log in
                </p>
                <LogInField 
                    name='Email'
                    type='email'
                    textError='Invalid email'
                    showError={hasErrorEmail}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        setEmailText(event.currentTarget.value);
                    }}
                />
                <LogInField 
                    name='Password'
                    type='password'
                    textError='Your password must be at least 6 characters long'
                    showError={hasErrorPassword}
                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                        setPasswordText(event.currentTarget.value);
                    }}
                />
                <button
                    className='button log-in-field__button-submit'
                    onClick={() => {
                        logIn();
                    }}
                >
                    Log in
                </button>
            </div>
        )
        : (
            <div className='log-in-block logout-block'
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className='button log-in-field__button-submit logout-button'
                    onClick={() => {
                        router.push('/profile');
                    }}
                >
                    Profile
                </button>
                <button
                    className='button log-in-field__button-submit logout-button'
                    onClick={() => {
                        dispatch(setIsLoggedIn(false));
                        router.push('/');
                    }}
                >
                    Log out
                </button>
            </div>
        )
    )
}
  
export default LogInBlock