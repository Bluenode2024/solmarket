import { CHAIN_NAMESPACES } from "@web3auth/base";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { Web3Auth } from "@web3auth/modal";

const clientId =
  "BIDKZ3f2QOYeATbQ-6K3z9MT836zvCzLf0mh35ZB930bQpzcl4w6KJ--okRFMr7vxL5XBxK38I6nsyVIFrri3P8";

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x2", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    rpcTarget: "https://api.testnet.solana.com",
    displayName: "Solana Testnet",
    blockExplorerUrl: "https://explorer.solana.com",
    ticker: "SOL",
    tickerName: "Solana",
    logo: "https://images.toruswallet.io/solana.svg",
  };

const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig },
});

export const web3auth = new Web3Auth({
  clientId,
  uiConfig: {
    logoLight: "https://web3auth.io/images/web3auth-logo.svg",
    logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
  },
  privateKeyProvider,
  web3AuthNetwork: "sapphire_devnet",
});



