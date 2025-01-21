"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import pb from "@/api/pocketbase";
import { IProductProps } from "@/types/product";
import { useRecoilState } from "recoil";
import { accountState } from "@/atom/account";
import { Layout } from "@/components/Layout";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const [product, setProduct] = useState<IProductProps | null>(null);
  const [account] = useRecoilState(accountState);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    if (productId) {
      try {
        const response = await pb.collection("xchainshop").getOne(productId);

        const mappedProduct: IProductProps = {
          id: response.id || "Unknown ID",
          name: response.name || "Unknown Name",
          description: response.description || "No description available.",
          price: response.price || "0",
          location: response.location || "Unknown Location",
          image: response.image || "/default-image.png",
          state: response.state || "Unknown State",
          tx: response.tx || "No Transaction Info",
          buyer: response.buyer || "No Buyer Info",
          owner: response.owner || "Unknown Owner",
          destination: response.destination || "Unknown Destination",
        };

        setProduct(mappedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  };

  const handleBuy = async () => {
    if (!account) {
      alert("지갑이 연결되지 않았습니다. 먼저 지갑을 연결해주세요!");
      return;
    }

    try {
      await pb.collection("xchainshop").update(productId, {
        buyer: account,
        state: "Approve",
      });
      alert("구매가 완료되었습니다!");
      fetchProduct();
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("구매 처리 중 오류가 발생했습니다.");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, price, image, state, owner } = product;

  return (
    <Layout>
      <div className="w-full max-w-md font-mono text-white space-y-5">
        <Image src={image} width={500} height={500} alt={name} />
        <Badge variant="secondary" className="text-2xl">
          {state}
        </Badge>
        <h1 className="text-2xl font-extrabold">{name}</h1>
        <p>{description}</p>

        <div className="space-y-5">
          <h1>Price: {price} SOL</h1>

          {state === "Sell" && owner !== account && (
            <div className="flex space-x-4">
              <Button onClick={handleBuy}>Buy</Button>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={() => router.push("/")}
        className="mt-10 bg-gray-800 text-white hover:bg-gray-600"
      >
        Go Back
      </Button>
    </Layout>
  );
}
