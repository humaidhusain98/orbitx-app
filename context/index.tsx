'use client'

import { wagmiAdapter, projectId, networks } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

const queryClient = new QueryClient()

const metadata = {
  name: 'Orbitx DAPP',
  description: 'This app fetches transaction history',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  themeMode: 'dark',
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', //Metamask
  ],
  enableNetworkSwitch: true,
  features: {
    socials: false,
    email: false,
    analytics: true
  },
  allowUnsupportedChain: false,
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
