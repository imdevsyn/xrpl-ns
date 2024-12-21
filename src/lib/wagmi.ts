import { http, createConfig } from "@wagmi/core";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, coinbaseWallet, rabbyWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { xrpl } from "./chains/xrplEvm";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, coinbaseWallet, rabbyWallet, walletConnectWallet, rainbowWallet]
    }
  ],
  {
  appName: "XRPL Names",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
});

export const config = createConfig({
  chains: [xrpl],
  connectors: connectors,
  transports: { [xrpl.id]: http() },
  ssr: true,
});
