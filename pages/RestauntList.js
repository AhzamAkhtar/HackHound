import { useEffect, useState } from "react";
import { useHackHound } from "../Connector/HackHound";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
const RestaurantList = () => {
  const router = useRouter();
  const { restaurentList, loading } = useHackHound();
  const [itemList, setItemList] = useState([]);
  const [showMenuItem, setShowMenuItem] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const goToItemList = () => {
    if (showMenuItem == true) {
      setShowMenuItem(false);
    }
    if (showMenuItem == false) {
      setShowMenuItem(true);
    }
  };

  const manageCartIncrement = () => {
    setItemCount(itemCount + 1);
  };
  const manageCartDecrement = () => {
    setItemCount(itemCount - 1);
  };
  return (
    <>
      <section class="text-gray-600 body-font mx-5">
        <div class="container px-20 py-5 mx-auto ">
          <div class="flex flex-wrap -m-5 px-24 py-1 sm:px-2 ">
            {restaurentList.map((item, keys) => {
              return (
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
                              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                                Master Cleanse Reliac Heirloom
                              </h1>
                            </div>
                          </div>

                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src={item.account.itemOneUrl}
                              />
                            </a>
                            <div class="mt-4">
                             
                              <h2 class="text-white title-font text-lg font-medium">
                                {item.account.itemOne}
                              </h2>
                              <p class="mt-1 text-white">Price - {item.account.itemOnePrice} Sol</p>
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src={item.account.itemSecondUrl}
                              />
                            </a>
                            <div class="mt-4">
                            
                              <h2 class="text-white title-font text-lg font-medium ">
                                {item.account.itemSecond}
                              </h2>
                              <p class="mt-1 text-white">Price - {item.account.itemSecondPrice} Sol</p>
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src={item.account.itemFourthUrl}
                              />
                            </a>
                            <div class="mt-4">
                            
                              <h2 class=" title-font text-lg font-medium text-white">
                                {item.account.itemFourth}
                              </h2>
                              <p class="mt-1 text-white">Price - {item.account.itemFourthPrice} Sol</p>
                            </div>
                          </div>
                          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a class="block relative h-48 rounded overflow-hidden">
                              <img
                                alt="ecommerce"
                                class="object-cover object-center w-full h-full block"
                                src={item.account.itemFifthUrl}
                              />
                            </a>
                            <div class="mt-4">
                            
                              <h2 class=" title-font text-lg font-medium text-white">
                                {item.account.itemFifth}
                              </h2>
                              <p class="mt-1 text-white">Price - {item.account.itemFifthPrice} Sol</p>
                            </div>
                          </div>
                         
                        </>
                      ) : (
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
                                Restaurant Name - {item.account.restaurantName}
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
                      )}
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantList;
