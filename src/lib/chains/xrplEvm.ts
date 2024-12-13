import { type Chain } from "viem";

export const xrpl = {
  id: 1440002,
  name: "XRPL EVM Devnet",
  nativeCurrency: { name: "XRP", symbol: "XRP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },
  },
  blockExplorers: {
    default: { name: "XRPL EVM Explorer", url: "https://evm-sidechain.xrpl.org" },
  },
  testnet: true,
} as const satisfies Chain;
