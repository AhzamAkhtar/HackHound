import { useEffect, useState } from "react";
// import { Keypair } from "@solana/web3.js";
import QRCode from "qrcode-generator";
import { useHackHound } from "../Connector/HackHound";
import { useRouter } from "next/router";
import jsPDF from "jspdf";
const solanaWeb3 = require("@solana/web3.js");
const qrCode = require("qrcode");
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";
const RestaurantList = () => {
  const [finalqr , setFinalQr] = useState()
  const [showQR, setShowQR] = useState(false);
  const [qrcodeUrl, setQrCodeUrl] = useState();
  const generateQr = async () => {
    const connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl("devnet")
    );
    const recentBlockhash = await connection.getRecentBlockhash();

    const YOUR_WALLET_ADDRESS = "EZwmRqCe7EzQMvDxX9eqKgCG4oyACMh2Yqg9pp7qookQ";
    const RECIPIENT_ADDRESS = "2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767";
    const AMOUNT = 10;
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: new solanaWeb3.PublicKey(YOUR_WALLET_ADDRESS),
        toPubkey: new solanaWeb3.PublicKey(RECIPIENT_ADDRESS),
        lamports: solanaWeb3.LAMPORTS_PER_SOL * AMOUNT,
      })
    );
    transaction.feePayer = new solanaWeb3.PublicKey(YOUR_WALLET_ADDRESS);
    transaction.recentBlockhash = recentBlockhash.blockhash;

    console.log(transaction.serializeMessage().toString());
    const qrCodeData = JSON.stringify(
      transaction.serializeMessage().toString()
    );
    qrCode.toDataURL(qrCodeData, (err, qrCodeUrl) => {
      if (err) {
        console.error(err);
      } else {
        // display the QR code to the user
        console.log(qrCodeUrl);
        setQrCodeUrl(qrCodeUrl);
      }
    });
  };

  generateQr();

  const getQR = () => {
    const url = qrcodeUrl;
    const qr = QRCode(0, "L");
    qr.addData(url);
    qr.make();

    const qrCodeImage = qr.createDataURL();
    setFinalQr(qrCodeImage)
  };

  //getQR()

  //   async function main() {
  //     // Variable to keep state of the payment status
  //     //let paymentStatus: string;
  //     // Connecting to devnet for this example
  //     console.log('1. ✅ Establish connection to the network');
  //     const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  // }
  // const recipent = new PublicKey("2JSg1MdNqRg9z4RP7yiE2NV86fux2BNtF3pSDjhoi767");
  // const amount = new BigNumber(20);
  // const reference = new Keypair().publicKey;
  // const label = 'Jungle Cats store';
  // const message = 'Jungle Cats store - your order - #001234';
  // const memo = 'JC#4098';
  // const splToken = new PublicKey('96bnZMDpCHWfUTRAfrjYLGXGmFYNDUqEqPWEGK78mK7K');
  // console.log('3. 💰 Create a payment request link \n');
  // const url = encodeURL({
  //     recipent,
  //     amount,
  //     splToken,
  //     reference,
  //     label,
  //     message,
  //     memo,
  // }).toString();

  // console.log(url)
  const router = useRouter();
  const { restaurentList, loading } = useHackHound();
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [itemCount1, setItemCount1] = useState(0);
  const [itemCount2, setItemCount2] = useState(0);
  const [itemCount3, setItemCount3] = useState(0);
  const [itemCount4, setItemCount4] = useState(0);

  const [pprice, setPrice] = useState(0);
  const goToItemList = () => {
    if (showMenuItem == true) {
      setShowMenuItem(false);
    }
    if (showMenuItem == false) {
      setShowMenuItem(true);
    }
  };

  const downloadPdf = () => {
    var docD = new jsPDF("p", "pt");
    docD.setFont("courier-bold");
    docD.setFontSize(30);
    docD.text(150, 35, "Starlight Café");
    docD.setFontSize(20);
    docD.text(200, 70, "INVOICE");
    docD.setFontSize(20);

    const date = new Date();
    const n = date.toDateString();

    docD.text(70, 150, "Date Of Order : ");
    docD.text(300, 150, n);

    docD.text(70, 150, "Gross Amount : ");
    docD.text(300, 150, pprice + 0.18 * pprice);

    docD.text(70, 150, "Taxable Value: ");
    docD.text(300, 150, pprice);
  };

  const manageCartIncrement2 = (price) => {
    setItemCount2(itemCount2 + 1);
    setPrice(pprice + 1);
  };
  const manageCartDecrement2 = (price) => {
    setItemCount2(itemCount2 - 1);
    setPrice(pprice - 1);
  };

  const manageCartIncrement3 = (price) => {
    setItemCount3(itemCount3 + 1);
    setPrice(pprice + 1);
  };
  const manageCartDecrement3 = (price) => {
    setItemCount3(itemCount3 - 1);
    setPrice(pprice - 1);
  };

  const manageCartIncrement4 = (price) => {
    setPrice(pprice + 1);
    setItemCount4(itemCount4 + 1);
  };
  const manageCartDecrement4 = (price) => {
    setItemCount4(itemCount4 - 1);
    setPrice(pprice - 1);
  };

  const manageCartIncrement1 = (price) => {
    setItemCount1(itemCount1 + 1);
    setPrice(pprice + 1);
  };
  const manageCartDecrement1 = (price) => {
    setItemCount1(itemCount1 - 1);
    setPrice(pprice - 1);
  };
  const handleQR = () => {
    setShowQR(true);
  };
  return (
    <>
      {showQR ? (
        <>
          <Image
            src={finalqr}
            width={50}
            height={50}
            className="m-auto"
          />
        </>
      ) : (
        <>
          <section class="text-gray-600 body-font mx-5">
            <div class="container px-20 py-5 mx-auto ">
              <div class="flex flex-wrap -m-5 px-24 py-1 sm:px-2 ">
                <>
                  {loading ? (
                    <>
                      <Image
                        src="/yellowLoader.gif"
                        width={50}
                        height={50}
                        className="m-auto"
                      />
                    </>
                  ) : (
                    <>
                      {showMenuItem ? (
                        <>
                          <div class="container px-5 py-2 mx-auto">
                            <div class="flex flex-col text-center w-full mb-12">
                              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                                Menu Items
                              </h1>
                              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
                                Total Price - {pprice} Sol
                              </h1>
                            </div>
                          </div>

                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src="https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                            </a>
                            <div class="mt-4">
                              <h2 class="text-white title-font text-lg font-medium">
                                Chicken Pizza
                              </h2>
                              <p class="mt-1 text-white">Price - 1 Sol</p>
                            </div>
                            <div className="flex">
                              <AiFillPlusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartIncrement1()}
                              />
                              <button class="flex mx-auto mt-10 text-white bg-indigo-500 border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                {itemCount1}
                              </button>
                              <AiFillMinusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartDecrement1()}
                              />
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src="https://images.pexels.com/photos/343871/pexels-photo-343871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                            </a>
                            <div class="mt-4">
                              <h2 class="text-white title-font text-lg font-medium ">
                                Fried Rice
                              </h2>
                              <p class="mt-1 text-white">Price - 1 Sol Sol</p>
                            </div>
                            <div className="flex">
                              <AiFillPlusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartIncrement2()}
                              />
                              <button class="flex mx-auto mt-10 text-white bg-indigo-500 border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                {itemCount2}
                              </button>
                              <AiFillMinusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartDecrement2()}
                              />
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-crover object-cente w-full h-full block"
                                src="https://th.bing.com/th/id/OIP.kpdBkNSGcI5WXwZQ8fMb4QHaHa?pid=ImgDet&w=800&h=800&rs=1"
                              />
                            </a>
                            <div class="mt-4">
                              <h2 class=" title-font text-lg font-medium text-white">
                                "Dim Sums"
                              </h2>
                              <p class="mt-1 text-white">Price - 1 Sol Sol</p>
                            </div>
                            <div className="flex">
                              <AiFillPlusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartIncrement3()}
                              />
                              <button class="flex mx-auto mt-10 text-white bg-indigo-500 border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                {itemCount3}
                              </button>
                              <AiFillMinusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartDecrement3()}
                              />
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src="https://images.pexels.com/photos/960856/pexels-photo-960856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              />
                            </a>
                            <div class="mt-4">
                              <h2 class=" title-font text-lg font-medium text-white">
                                Dumplings
                              </h2>
                              <p class="mt-1 text-white">Price - 1 Sol</p>
                            </div>
                            <div className="flex">
                              <AiFillPlusCircle
                                className="mt-10 text-3xl"
                                onClick={() => manageCartIncrement4()}
                              />
                              <button class="flex mx-auto mt-10 text-white bg-indigo-500 border-0  px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                {itemCount4}
                              </button>
                              <AiFillMinusCircle
                                className="mt-10 text-3xl"
                                onCanPlay={() => manageCartDecrement4()}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div class="container px-5 py-2 mx-auto">
                            <div class="flex flex-col text-center w-full mb-12">
                              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-red-300">
                                Indulge In a symphony Of flavours at Your
                                Favourite Martian Restaurant
                              </h1>
                            </div>
                          </div>
                          {restaurentList.map((item, keys) => {
                            return (
                              <>
                                <div
                                  key={keys}
                                  class="lg:w-1/4 md:w-1/3 lg:mx-8 p-4 w-auto px-10 cursor-pointer shadow-lg mx-8 mb-5 bg-gray-200 rounded-lg"
                                >
                                  <a class="block relative rounded overflow-hidden">
                                    <img
                                      alt="ecommerce"
                                      class="inset-0 w-full h-full object-cover object-center bg-black rounded-3xl"
                                      src={item.account.imageUrl}
                                    />
                                  </a>
                                  <div class="mt-2 text-center md:text-left">
                                    <h3 class="text-red-500 text-md  title-font ">
                                      Restaurant Name -{" "}
                                      {item.account.restaurantName}
                                    </h3>
                                    <div class="flex justify-start">
                                      <h2 class=" text-gray-900 title-font text-sm  font-sans">
                                        {item.account.restaurantTag}
                                      </h2>
                                      <h2 class=" text-gray-900 title-font text-sm mx-5 font-sans">
                                        Rating - {item.account.rating}
                                      </h2>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      goToItemList();
                                    }}
                                    class="flex mx-auto mt-6 text-white bg-red-400 border-0 py-2 px-5 focus:outline-none hover:bg-red-400 rounded-xl"
                                  >
                                    Order Now{" "}
                                  </button>
                                </div>
                              </>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </>
              </div>
              <button
                onClick={() => handleQR()}
                class="flex mx-auto mt-6 text-white bg-red-400 border-0 py-2 px-5 focus:outline-none hover:bg-red-400 rounded-xl"
              >
                Generate QR
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default RestaurantList;
