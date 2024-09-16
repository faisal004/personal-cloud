import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Provider from './_trpc/Provider'
import { Roboto } from 'next/font/google'
import Navbar from './_components/navbar'
import Footer from './_components/footer'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
// })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
const roboto=Roboto({
  subsets:['latin'],
  weight: '400',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={roboto.className}>
        <SessionProvider>

          <Provider>
          <Navbar/>
          {children}
          <Footer/>


          </Provider>
          </SessionProvider>

        </body>
      </html>
  )
}
