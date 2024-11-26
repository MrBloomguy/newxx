// src/app/providers.tsx
'use client';

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { mainnet, polygon, optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ 
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
        showQrModal: true, // Changed from qrcode to showQrModal
        metadata: {
          name: 'Polls.bet',
          description: 'Web3 Prediction Market Platform',
          url: typeof window !== 'undefined' ? window.location.origin : '',
          icons: []
        }
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Polls.bet',
      },
    }),
  ],
  publicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}