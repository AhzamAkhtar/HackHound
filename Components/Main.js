import { useState } from "react"
import Image from "next/image"
import { CiLogin } from "react-icons/ci";
import { BsArrowRight } from "react-icons/bs";
const Main = () => {
    const [initialized , setInitialized] = useState(true)
    const [publicKey , setPublicKey] = useState(true)
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
            {publicKey ? (
              <>
                {initialized ? (
                  <>
                    <button
                      //onClick={() => router.push("/main")}
                      class={`md:mr-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span>DIVE IN</span>
                      <BsArrowRight className="ml-1 w-5 text-3xl" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      //onClick={() => turnLoginTrue()}
                      class={`md:ml-5 bg-white text-black py-4 px-10 rounded-3xl inline-flex items-center mx-10 mt-10 `}
                    >
                      <span className="text-xl">Create Your Account</span>
                      //<CiLogin className="ml-1 w-8 text-3xl" />
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
          {/* {loginState ? (
            <>
              <Login />
            </>
          ) : (
            <></>
          )} */}
        </div>
      </div>
        </>
    )
}

export default Main