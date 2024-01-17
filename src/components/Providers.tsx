'use client'

import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
// import { SessionProvider } from 'next-auth/react'
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode,
  session: any
}

const index = ({ children, session }: Props) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider session={session}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <SessionProvider> */}
            {children}
          {/* </SessionProvider> */}
          <Toaster />
        </PersistGate>
      </SessionProvider>
    </ReduxProvider>
  )
}

export default index