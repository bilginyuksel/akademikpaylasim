import React from 'react'
import Nav from './Nav'

import Head from 'next/head'
function Layout({ children }) {
    return (
        <>
            <Head>
              <title>Akademik Paylaşım</title>
            </Head>
            <Nav />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout
