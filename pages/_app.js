import { WalletConnectProvider } from '../Components/WalletConnectProvider'
import '../styles/globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import Navbar from '../Components/Navbar'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <WalletConnectProvider>
    <Navbar/>
    {/* <Hero/> */}
    <Component {...pageProps} />
    </WalletConnectProvider>
    </>
  )
}

export default MyApp
