"use client"
import { Inter } from 'next/font/google'
import HeaderBlock from '@/components/HeaderBlock/HeaderBlock'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './storage';
import store from './storage'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className + " body text"}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HeaderBlock />
                    {children}
                </PersistGate>
            </Provider>
        </body>
    </html>
  )
}
