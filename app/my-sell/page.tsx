"use client";

import { useRouter } from "next/navigation";
import useProducts from "@/hooks/useProducts";
import React from "react";
import { useRecoilValue } from "recoil";
import { accountState } from "@/atom/account";
import { ProductCard } from "@/components/ProductCard";
import { SkeletonCards } from "@/components/skeleton-cards";
import { Layout } from "@/components/Layout";

export default function MySell() {
  const router = useRouter();
  const { data: products } = useProducts();
  const account = useRecoilValue(accountState);

  const renderMySells = () => {
    return (
      <div className="flex flex-wrap gap-10">
        {products ? (
          products
            .filter((product) => product.owner === account)
            .map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price.toString()}
                state={product.state}
                address={account || ""}
              />
            ))
        ) : (
          <SkeletonCards />
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Sell</h1>
        {renderMySells()}
      </div>
    </Layout>
  );
}
