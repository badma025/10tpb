import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {RecoilRoot, useRecoilState} from "recoil"
import { isLoadingState } from '../atoms/atoms'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
  <Component {...pageProps} />
  </RecoilRoot>
  )
}

export default MyApp
