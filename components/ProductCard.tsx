"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  state: string;
  address: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  description,
  price,
  state,
  address,
}) => {
  const router = useRouter();

  return (
    <Card
      className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden w-[350px] h-[550px] flex flex-col transition-transform duration-300 hover:scale-105"
    >
      <CardContent className="p-0">
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-300"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col p-4">
        <div className="mb-4 flex flex-col gap-3">
          <Badge
            variant="outline"
            className={`flex items-center ${
              state === "Sell"
                ? "bg-green-200 text-green-900"
                : "bg-gray-200 text-gray-600"
            } font-medium border-none rounded-xl px-2 py-1 w-[90px]`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                state === "Sell" ? "bg-green-700" : "bg-gray-600"
              }`}
            ></span>
            {state === "Sell" ? "For Sale" : "Reserved"}
          </Badge>

          <div className="w-full flex flex-col gap-1">
            <h2 className="text-xl font-bold min-h-[40px] flex items-center">
              {name}
            </h2>
            <p
              className="text-sm min-h-[60px] flex items-center text-muted-foreground"
              style={{ color: "#B0BEC5" }}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between items-center mt-auto">
          <p className="text-lg font-semibold">{price} SOL</p>
          <Button
            onClick={() => router.push(`/products/${id}`)}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-transform duration-300 hover:scale-105 py-2 px-4 rounded-lg"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
