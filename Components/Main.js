import { useState  , useEffect} from "react"
import dynamic from "next/dynamic";
import Image from "next/image"
import { CiLogin } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useHackHound } from "../Connector/HackHound";
import Login from "./Login";
import { LoginUtil } from "./LoginUtil";
const Main = () => {
  const router = useRouter()
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  )
  const { publicKey } = useWallet();
    const {
      initialized,
      currentUserName,
      currentUserEmail
    } = useHackHound()
    const [isPublicKey, setPublicKey] = useState(false);
    const { loginState, turnLoginTrue } = LoginUtil();
    useEffect(() => {
      const check = () => {
        if (publicKey) {
          setPublicKey(true);
        }
      };
      check();
    }, [publicKey]);
    return(
        <>
        <div id="top">
        <div
          style={{
            zIndex: -1,
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Image
            src="/maintheme.gif"
            className="rounded-3xl"
            alt="Oops! we will fix this real quick..."
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1
            style={{
              paddingTop: "20vh",
              fontFamily: "monospace",
              fontSize:"3.5rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <p >Start a Delicious Journey</p>
            <p >With Starlight Café... </p>
          </h1>
          <div class="flex justify-center">
            {isPublicKey ? (
              <>
                {initialized ? (
                  <>
                    <button
                      onClick={() => router.push("/RestauntList")}
                      class={`md:mr-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span>DIVE IN</span>
                      <BsArrowRight className="ml-1 w-5 text-3xl" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => turnLoginTrue()}
                      class={`md:ml-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span className="text-xl">Create Your Account</span>
                      <CiLogin className="ml-1 w-8 text-3xl" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <WalletMultiButtonDynamic
                  style={{
                    marginRight: "10px",
                    borderRadius: "50vw",
                  }}
                />
              </>
            )}
          </div>
          {loginState ? (
            <>
              <Login/>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
        </>
    )
}

export default Main