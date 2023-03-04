import { useState, useEffect } from "react";
import { useHackHound } from "../Connector/HackHound";
import { useRouter } from "next/router";
export function NavbarUtil() {
  const router = useRouter();

  const { initialized } = useHackHound();
  const [word, setWord] = useState(false);
  const [home,setHome] = useState(false)
  useEffect(() => {
    const manageState = () => {
      if (initialized == true) {
        setWord("DIVE IN");
      }
      if (initialized == false) {
        setWord("Create Your Account");
      }
      if(router.asPath=="/main" || router.asPath=="/upload" || router.asPath=="/myspace"){
        setWord("HOME")
        setHome(true)
      }
    };
    manageState();
  }, [initialized , router.asPath]);

  return {
    word,
    home
  };
}
