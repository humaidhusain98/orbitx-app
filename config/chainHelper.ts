import { sepolia, mainnet, arbitrum,polygon } from '@reown/appkit/networks'

interface ChainConfig {
  chainId: number
  name: string
  chainType: 'mainnet' | 'testnet'
  provider?: string
  chainSwitchObject: any
  isEVM: boolean
  symbol:string
  logo:string
  currencyName:string
}

const eth_mainnet_provider_url = "https://eth-mainnet.g.alchemy.com/v2/"+process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const eth_sepolia_provider_url = "https://eth-sepolia.g.alchemy.com/v2/"+process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const arb_mainnet_provider_url = "https://arb-mainnet.g.alchemy.com/v2/"+process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const polygon_mainnet_provider_url = "https://polygon-mainnet.g.alchemy.com/v2/"+process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const chainList: Record<number, ChainConfig> = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    chainType: 'mainnet',
    provider: eth_mainnet_provider_url,
    chainSwitchObject: mainnet,
    isEVM: true,
    symbol:"ETH",
    logo:"/chain/eth.png",
    currencyName:"Ethereum"
  },
  42161: {
    chainId: 42161,
    name: 'Arbitrum Mainnet',
    chainType: 'mainnet',
    provider: arb_mainnet_provider_url,
    chainSwitchObject: arbitrum,
    isEVM: true,
    symbol:"ARB",
    logo:"/chain/arb.png",
    currencyName:"ARB"
  },
  137: {
    chainId: 137,
    name: 'Polygon Mainnet',
    chainType: 'mainnet',
    provider: polygon_mainnet_provider_url,
    chainSwitchObject: polygon,
    isEVM: true,
    symbol:"MATIC",
    logo:"/chain/pol.png",
    currencyName:"MATIC"
  },

  11155111: {
    chainId: 11155111,
    name: 'Ethereum Sepolia',
    chainType: 'testnet',
    provider: eth_sepolia_provider_url,
    chainSwitchObject: sepolia,
    isEVM: true,
    symbol:"ETH",
    logo:"/chain/eth.png",
    currencyName:"Ethereum"
  },


}

export const getChainDetailsByChainId = (chainId?: number) => {
  try {
    const id = chainId || 1 
    return chainList[id] || null
  } catch (e) {
    console.error('Error occurred while getting chain details:', e)
    return null
  }
}
