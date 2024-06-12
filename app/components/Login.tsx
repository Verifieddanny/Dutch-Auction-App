"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain } from "../utils/constant";
import Auction from "./Auction";

function Login() {
  const account: any = useActiveAccount?.();
  console.log(account);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {account != undefined ? (
        <div className="text-center">
          <ConnectButton client={client} chain={chain} />
          <Auction />
        </div>
      ) : (
        <div className="text-center">
          <ConnectButton client={client} chain={chain} />
        </div>
      )}
    </div>
  );
}

export default Login;
