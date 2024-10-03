import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navigation from '../components/Navigasi'
import { FooterNav } from '@/components/footer'

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
      <FooterNav />
    </SessionProvider>
  )
}
export default MyApp