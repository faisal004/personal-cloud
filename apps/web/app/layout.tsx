import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import Provider from './_trpc/Provider'
import { Roboto } from 'next/font/google'
import Footer from './_components/footer'
import { Toaster } from './ui/toaster'

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
// })
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
// })

export const metadata: Metadata = {
  title: 'myCloud',
  description: 'Personal Cloud Storage App',
  openGraph: {
    title: 'myCloud',
    description: 'Personal Cloud Storage App.',

    images:[
      {
        url:"https://www.icloud.com/system/icloud.com/2420Hotfix12/7cb9ecdad2b384754de394732519f658.png",
        width:1200,
        height:639,
        alt:"Personal Cloud Storage App"
      }
    ]
  },
  twitter:{
    card:"summary_large_image",
    title:"myCloud",
    description:"Personal Cloud Storage App",
    images:[
      {
        url:"https://www.icloud.com/system/icloud.com/2420Hotfix12/7cb9ecdad2b384754de394732519f658.png",
        width:1200,
        height:639,
        alt:"Personal Cloud Storage App"
      }
    ]

  }
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
          {children}
          <Footer/>
          <Toaster />


          </Provider>
          </SessionProvider>

        </body>
      </html>
  )
}
