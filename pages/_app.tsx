import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { NavMenuProvider } from '../components/Layout/NavMenuContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavMenuProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NavMenuProvider>
  )
}

export default MyApp
