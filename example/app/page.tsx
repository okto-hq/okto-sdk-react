"use client";
import { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "./components/LoginButton";
import { useOkto, OktoContextType } from "okto-sdk-react";
import GetButton from "./components/GetButton";
import TransferTokens from "./components/TransferTokens";

export default function Home() {
  const { data: session } = useSession();
  const {
    isLoggedIn,
    authenticate,
    logOut,
    getPortfolio,
    transferTokens,
    getWallets,
    createWallet,
    getSupportedNetworks,
    getSupportedTokens,
    getUserDetails,
    orderHistory,
    getNftOrderDetails,
  } = useOkto() as OktoContextType;
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  function handleAuthenticate(){
     if (!idToken) {
      return;
    }
    authenticate(idToken, (result: any, error: any) => {
      if (result) {
        console.log("Authentication successful");
      }
      if (error) {
        console.error("Authentication error:", error);
        signOut(); // Google SignOut
      }
    });
  }

  useEffect(()=>{
    if(isLoggedIn){
      console.log("Okto is authenticated")
    }
  }, [isLoggedIn])

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
      <div className="text-white font-bold text-2xl">Okto SDK API</div>
      <LoginButton />
      <GetButton title="Okto Authenticate" apiFn={async () => handleAuthenticate()} />
      <GetButton title="Okto Log out" apiFn={async () => logOut()} />
      <GetButton title="getPortfolio" apiFn={getPortfolio} />
      <GetButton title="getSupportedNetworks" apiFn={getSupportedNetworks} />
      <GetButton title="getSupportedTokens" apiFn={getSupportedTokens} />
      <GetButton title="getUserDetails" apiFn={getUserDetails} />
      <GetButton title="getWallets" apiFn={getWallets} />
      <GetButton title="createWallet" apiFn={createWallet} />
      <GetButton title="orderHistory" apiFn={() => orderHistory({})} />
      <GetButton
        title="getNftOrderDetails"
        apiFn={() => getNftOrderDetails({})}
      />
      <TransferTokens apiFn={transferTokens} />
    </main>
  );
}
