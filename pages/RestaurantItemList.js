import { useRouter } from "next/router";
const RestaurantItemList = () => {
  const router = useRouter();
  const data = router.query
  console.log(data)
  
  return (
    <>
      {/* <section class="text-gray-600 body-font mx-5">
        <div class="container px-20 py-5 mx-auto ">
          <div class="flex flex-wrap -m-5 px-24 py-1 sm:px-2 ">
        
            <div
              
              class="lg:w-1/4 md:w-1/3 lg:mx-8 p-4 w-auto px-10 cursor-pointer shadow-lg mx-8 mb-5 bg-gray-200 rounded-lg"
            >
              <a class="block relative rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  class="inset-0 w-full h-full object-cover object-center bg-black rounded-3xl"
                  src={props.itemSecondUrl}
                />
              </a>
              <div class="mt-2 text-center md:text-left">
                <h3 class="text-red-500 text-md  title-font ">
                   Name - {props.itemOneName}
                </h3>
                <div class="flex justify-start">
                  <h2 class=" text-gray-900 title-font text-sm  font-sans">
                    Price -  {props.itemOnePrice}
                  </h2>
                 
                </div>
              </div>
              <button class="flex mx-auto mt-6 text-white bg-red-400 border-0 py-2 px-5 focus:outline-none hover:bg-red-400 rounded-xl">
                Add To Cart
              </button>
            </div>
           
          </div>
        </div>
      </section> */}

      
    </>
  );
};

export default RestaurantItemList;
