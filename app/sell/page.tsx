import { SellProduct } from "@/components/sell-product";
import Image from "next/image";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="z-10 w-full max-w-md font-mono mt-10 text-white">
        <SellProduct />
      </div>
    </Layout>
  );
}
