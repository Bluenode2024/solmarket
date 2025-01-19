"use client";

import { CustomChainConfig, IProvider } from "@web3auth/base";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { accountState } from "@/atom/account";
import { balanceState } from "@/atom/balance";
import { ellipsisAddress } from "@/utils/strings";
import { web3auth } from "@/utils/web3-auth";

import RPC from "../types/solanaRPC";

export const Wallet: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useRecoilState(accountState);
  const [balance, setBalance] = useRecoilState(balanceState);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const getAccounts = async () => {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const rpc = new RPC(provider);
      const address = await rpc.getAccounts();
      console.log(address);
      setAccount(address[0]);

      const Balance = await rpc.getBalance();
      setBalance(Balance);
      console.log(Balance);
    };
    if (loggedIn) {
      getAccounts();
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn && account ? (
        <Button
          onClick={() => {
            logout();
          }}
        >
          {ellipsisAddress(account)} ( {balance} SOL )
        </Button>
      ) : (
        <Button
          onClick={() => {
            login();
          }}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
};
