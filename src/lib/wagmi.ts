import { http, createConfig } from "@wagmi/core";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { xrpl } from "./chains/xrplEvm";

const { connectors } = getDefaultWallets({
  appName: "XRPL Names",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
});

export const config = createConfig({
  chains: [xrpl],
  connectors: connectors,
  transports: { [xrpl.id]: http() },
  ssr: true,
});
