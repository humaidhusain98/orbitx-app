import { getChainDetailsByChainId } from "@/config/chainHelper";
import axios from "axios";
import { cryptoCompareApi } from "./apiConfig";


export const getAddressTransactionsAlchemy = async(address:string,chainIds:number[])=>{
    try{
        const promises = chainIds.map(async (chainId) => {
            const chainInfo =  getChainDetailsByChainId(chainId);
            const categories =
            chainId === 42161
              ? ["external", "erc20", "erc721", "erc1155"]
              : ["external", "internal", "erc20", "erc721", "erc1155"];
            const payload = {
                jsonrpc: "2.0",
                id: 0,
                method: "alchemy_getAssetTransfers",
                params: [
                  {
                    fromBlock: "0x0",
                    fromAddress: address,
                    category: categories,
                    withMetadata: true,
                  },
                ],
            
              };
          
              const response = await axios.post(chainInfo?.provider??"", payload, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              
              const transfers = response.data.result.transfers;
    
              const pricePromises = transfers.map((tx: any) => {
                return axios.get(cryptoCompareApi, {
                  params: {
                    fsym: tx.asset,
                    tsyms: "USD",
                  },
                });
              });
        
              const prices = await Promise.all(pricePromises);
        
              const transfersWithUsdValue = transfers.map((tx: any, index: number) => {
                return {
                  ...tx,
                  usdValue: prices[index].data.USD,
                  chainName: chainInfo?.name,
                };
              });
        
              return transfersWithUsdValue;
        });

        const results = await Promise.all(promises);
        const allTransactions = results.flat();

        return allTransactions;
    }
    catch(e){
        console.log("Error occured "+e);
        return null;
    }
}

