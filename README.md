# Solana Meme & NFT Marketplace

## BLUENODE 학회 프로젝트 (2025)

---

## Overview

The **Solana Meme & NFT Marketplace** was initiated as a decentralized platform to enable seamless trading of **memes and NFTs**, leveraging Solana's high-speed and low-cost blockchain infrastructure. This project began as a vision to create a hub for meme and NFT enthusiasts, combining blockchain's transparency with creative content trading.

Currently, the platform is in its **development phase**, focusing on basic features like social login, product uploads, and general item trading. These foundational features will evolve into a full-fledged NFT and meme marketplace.

---

## Key Features

### **Social Login**
Enables users to log in securely using their wallets via **Web3Auth**.

**Relevant Code:**
```ts
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

const wallets = [new PhantomWalletAdapter()];

export const Wallet: React.FC = () => {
  const login = async () => {
    if (!web3auth) {
      console.error("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  return (
    <Button onClick={login}>
      Connect Wallet
    </Button>
  );
};
```

---

### **Product Listing**
Allows users to upload items (name, price, description, image, etc.) to the marketplace.

**Relevant Code:**
```ts
export const SellProduct: React.FC = () => {
  const onSubmit = async (data: FormValues) => {
    try {
      const formData = { ...data, owner: account };
      await pb.collection("xchainshop").create(formData);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input placeholder="Product name" />
      <Button type="submit">Create</Button>
    </form>
  );
};
```

---

### **Product Details**
Each product has a dedicated page where users can view detailed information about the item, including the seller, price, and description.

---

## Pages

### **Homepage (`/`)**
Displays a grid of all products listed on the marketplace.

---

### **My Buy (`/my-buy`)**
Lists all items the logged-in user has purchased.

---

### **My Sell (`/my-sell`)**
Shows all items the user has listed for sale, along with their current statuses.

---

### **Sell Page (`/sell`)**
Allows users to list products by filling out a form with necessary details.

---

### **Product Detail Page (`/products/[id]`)**
Provides detailed information about a selected product.

---

## Future Roadmap

1. **Meme & NFT Trading**
   - Enable users to mint memes or NFTs.
   - Add functionality for bidding and auctions.

2. **Metadata Enhancements**
   - Include meme-specific data, such as cultural relevance and creator royalties.

3. **Blockchain Analytics**
   - Provide transaction and ownership history.

4. **Scalability**
   - Optimize for high-volume transactions.

---

## Project Structure

```plaintext
/app
  /charge           // Page for charging wallets (future integration)
  /my-buy           // My Buy page
  /my-sell          // My Sell page
  /products/[id]    // Product details page
  /sell             // Product listing page
  layout.tsx        // Layout component for shared layout logic
  page.tsx          // Homepage
```

### Final Note

This project started with the goal of creating a **meme and NFT marketplace**. The current implementation is a stepping stone, focusing on foundational features like wallet integration and product listings. Future updates will build on this to achieve the platform's ultimate vision.


