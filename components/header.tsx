"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Wallet } from "./wallet";
import Link from "next/link";
import { accountState } from "@/atom/account";
import { useRecoilValue } from "recoil";

export const Header: React.FC = () => {
  const router = useRouter();
  const account = useRecoilValue(accountState);

  return (
    <header
      className="z-10 w-full bg-gradient-to-r from-purple-800 to-teal-500 text-white px-6 py-4 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="font-extrabold text-lg tracking-wider hover:text-gray-300 transition duration-300">
              SolMarket
            </h1>
          </Link>
        </div>

        <nav className="flex space-x-6 gap-20">
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-transparent transition duration-300"
            onClick={() => {
              router.push("/sell");
            }}
          >
            Sell
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-transparent transition duration-300"
            onClick={() => {
              router.push("/my-buy");
            }}
          >
            My Buy
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-transparent transition duration-300"
            onClick={() => {
              router.push("/my-sell");
            }}
          >
            My Sell
          </Button>
        </nav>

        <div>
          <Wallet />
        </div>
      </div>
    </header>
  );
};
