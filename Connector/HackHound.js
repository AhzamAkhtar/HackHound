import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import { TODO_PROGRAM_PUBKEY } from "../constants";
import todoIDL from "../constants/HackHound.json";
import { toast, ToastContainer } from "react-toastify";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";

export function useHackHound() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [loading,setLoading] = useState(false)
  const [transactionPending, setTransactionPending] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [currentUserName, setCurrnetUserName] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState();
  const [restaurentList , setRestaurentList] = useState([])

  const [name , setName] = useState()
  const [email , setEmail] = useState()

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(todoIDL, TODO_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const getAllUsers = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          const [profilePda] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const userAcount = await program.account.userProfile.fetch(
            profilePda
          );

          const allRestaurent = await program.account.restaurantAccount.all()
          setRestaurentList(allRestaurent)
          console.log(allRestaurent)

          if (userAcount) {
            setInitialized(true);
            setCurrnetUserName(userAcount.name);
            setCurrentUserEmail(userAcount.email);
          } else {
            setInitialized(false);
          }
        } catch (error) {
          console.log(error);
          setInitialized(false);
        } finally {
        }
      }
    };
    getAllUsers()
  }, [publicKey, program, transactionPending, currentUserName]);

  const nameHandler = (e) => {
    setName(e.target.value)
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const initializeUser = async () => {
    if(program && publicKey){
      try{
        setLoading(true)
        setTransactionPending(true)
        const [profilePda] = findProgramAddressSync(
          [utf8.encode("USER_STATE"),publicKey.toBuffer()],
          program.programId
        )
        if(name && email){
          const tsx = await program.methods
          .initializeUser(name , email)
          .accounts({
            userProfile : profilePda,
            authority : publicKey,
            SystemProgram : SystemProgram.programId
          })
          .rpc();
          setInitialized(true)
          setTimeout(() => {
            window.location.reload();
          }, [2000]);
        }
      } catch(error){
        console.log(error)
        setLoading(false)
        setTransactionPending(false)
      } finally {
        setLoading(false)
        setTransactionPending(false)
        setName("")
        setEmail("")
      }
    }
  }

  const getAllRestaurent = async () => {
    if(program && publicKey){
      try{
        setLoading(true)
        setTransactionPending(true)
        const [statusPda] = findProgramAddressSync(
          [utf8.encode("RESTAURANT_STATE") , publicKey.toBuffer()],
          program.programId
        )
        const allRestaurent = await program.account.restaurantAccount.all()
        //setRestaurentList(allRestaurent)
        console.log(allRestaurent)
      } catch(error){
        setLoading(false)
        setTransactionPending(false)
        console.log(error)
      }
      finally{
        setLoading(false)
        setTransactionPending(false)
      }
    }
  }

  return {
    loading,
    initialized,
    transactionPending,
    currentUserName,
    currentUserEmail,
    name,
    email,
    restaurentList,
    nameHandler,
    emailHandler,
    initializeUser,
    getAllRestaurent,
  }
}
