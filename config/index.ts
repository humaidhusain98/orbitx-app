import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { sepolia, polygon, mainnet, arbitrum } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'



// --- Get RainbowKit Project ID ---
export const projectId = process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID!

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// --- Supported networks ---
export const networks = [mainnet,polygon,arbitrum,sepolia] as [
  AppKitNetwork,
  ...AppKitNetwork[],
]

// --- Initialize Wagmi Adapter ---
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig
