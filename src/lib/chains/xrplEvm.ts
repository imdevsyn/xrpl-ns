import { Chain } from "@rainbow-me/rainbowkit";

// V1
// export const xrpl = {
//   id: 1440002,
//   name: "XRPL EVM Devnet",
//   nativeCurrency: { name: "XRP", symbol: "XRP", decimals: 18 },
//   rpcUrls: {
//     default: { http: ["https://rpc-evm-sidechain.xrpl.org"] },

//   },
//   blockExplorers: {
//     default: {
//       name: "XRPL EVM Explorer",
//       url: "https://explorer.xrplevm.org/",
//     },
//   },
//   testnet: true,
// } as const satisfies Chain;

// V2
export const xrpl = {
  id: 1449000,
  name: "XRPL EVM Testnet",
  nativeCurrency: { name: "XRP", symbol: "XRP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.xrplevm.org/"] },
  },
  blockExplorers: {
    default: {
      name: "XRPL EVM Explorer",
      url: "https://explorer.testnet.xrplevm.org/",
    },
  },
  testnet: true,
} as const satisfies Chain;
