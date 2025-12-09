'use client'
import TransactionItem from "@/components/TransactionItem";

import { chainList } from "@/config/chainHelper";
import { getAddressTransactionsAlchemy } from "@/services/apiService";
import { setTransactions } from "@/store/userSlice";
import { copyToClipboard } from "@/utils";
import { useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitState, useDisconnect } from "@reown/appkit/react";
import { Copy, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useBalance } from "wagmi";
import { RootState } from "@/store/store";


export default function Home() {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { chainId ,switchNetwork } = useAppKitNetwork();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedChains, setSelectedChains] = useState<number[]>([1,42161,137,11155111]);
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.user.transactions);

  useEffect(()=>{
    if(!address || selectedChains.length === 0){
      dispatch(setTransactions([]));
      return
    }
    setLoading(true);
    getAddressTransactionsAlchemy(address,selectedChains).then((resp)=>{
      if(resp){
        const sortedTxs = resp.sort((a: any, b: any) => {
          const timeA = a?.metadata?.blockTimestamp
            ? new Date(a.metadata.blockTimestamp).getTime()
            : 0;
          const timeB = b?.metadata?.blockTimestamp
            ? new Date(b.metadata.blockTimestamp).getTime()
            : 0;
          return timeB - timeA;
        });
        dispatch(setTransactions(sortedTxs.slice(0,10)));
      }
      else{
        dispatch(setTransactions([]));
      }
      setLoading(false);
    });

  },[address,selectedChains, dispatch])
  
  const handleConnect = ()=>{
    open()

  }

  const handleDisconnect = ()=>{
    disconnect();
  }

  const handleViewWallet = ()=>{
    open();
  }

  const { data: balanceData } = useBalance({
    address: address as `0x${string}` | undefined,
  });

  const handleSwitchNetwork = async (chainObject: any) => {
      toast.info(`Switching to ${chainObject?.name}`)
      switchNetwork(chainObject?.chainSwitchObject);
  
  };

  const handleChainFilter = (chainId: number) => {
    if (selectedChains.includes(chainId)) {
      if (selectedChains.length === 1) {
        toast.info("At least one chain must be selected.");
        return;
      }
      setSelectedChains(selectedChains.filter((id) => id !== chainId));
    } else {
      setSelectedChains([...selectedChains, chainId]);
    }
  };





  return (
    <>
    <div>
      <main>
        <div className="relative flex flex-col items-center justify-start  text-white mt-4">
          {
            isConnected && (
              <>
              <div className="">
                  <div className="flex flex-row items-center justify-start gap-3">
                      {
                        address && (
                          <div>{address?.substring(0,5)+"..."+address.substring(address?.length-10,address.length)}</div>
                        )
                      }
                    
                        <div
                          className="text-text-0 hover:text-primary-active cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            copyToClipboard(address ?? "NA");
                          }}
                        >
                          <Copy className=" !h-4 !w-4 " />
                        </div>

                  </div>
                  
                  {
                    chainId && (
                      <div className="network-div flex flex-row items-center gap-2 mt-2">
                        <Image src={chainList[Number(chainId)].logo} alt="chainlogo" width={30} height={30} />
                        <div className="name">{chainList[Number(chainId)].name}</div>
                      </div>
                    ) 
                  }
                
                <div className="mt-2 ">Switch Chain</div>
              <div className="network-list flex flex-row gap-4 mt-1">
                      
                {
                  chainList && Object.values(chainList).map((chain:any,index:number)=>(
                    <div className={chain.chainId==chainId?"chain-wrapper border border-blue-700 p-2 rounded-lg hover:scale-105 cursor-pointer":"chain-wrapper border p-2 rounded-lg hover:scale-105 cursor-pointer"} onClick={()=>{
                      handleSwitchNetwork(chain)
                    }} key={index}>
                       <div className="network-div flex flex-row items-center gap-2">
                        <Image src={chain.logo} alt="chainlogo" width={15} height={15} />

                      </div>
                    </div>
                  ))
                }
              </div>
      
              <div className="text-[16px] font-inter font-[400] mt-3">
                    {" "}
                    {balanceData
                      ? `${balanceData.formatted.substring(0, 6)} ${balanceData.symbol}`
                      : "--"}
                  </div>
                  
              <div  className="p-2 bg-blue-700 rounded-2xl text-center cursor-pointer text-white mt-3" onClick={handleViewWallet}>View Wallet</div>
               <div className="p-2 bg-red-600 rounded-2xl text-center cursor-pointer mt-3" onClick={handleDisconnect}>Disconnect</div>
              </div>
                      
              <></>
             

              <div className="text-[20px] mt-3">Filters</div>
              <div className="network-list flex flex-row gap-4 mt-4 ">

              {
                chainList && Object.values(chainList).map((chain:any,index:number)=>(
                  <div className={`chain-wrapper border p-2 rounded-lg hover:scale-105 cursor-pointer ${selectedChains.includes(chain.chainId) ? "border-blue-700" : ""}`} onClick={()=>{
                    handleChainFilter(chain.chainId)
                  }} key={index}>
                    <div className="network-div flex flex-row items-center gap-2">
                      <Image src={chain.logo} alt="chainlogo" width={20} height={20} />
                      <div className="name text-[8px]">{chain.name}</div>
                    </div>
                  </div>
                ))
              }
    
    
              </div>

              <div className="text-[25px] mt-3">Transactions</div>



                         {/* --- LOADING --- */}
      {loading && (
        <div className="w-[80vw] lg:w-[95vw] h-[80vh] flex flex-row items-center justify-center">
          <Loader2 className="h-5 w-5 lg:w-14 lg:h-14 animate-spin text-white relative z-10" />
        </div>
      )}

      {/* --- EMPTY --- */}
      {!loading &&
        transactions &&
        transactions.length === 0 && (
          <div className="flex flex-row items-center justify-center">
            No transactions available. Your activity will appear here once you
            start playing.
          </div>
        )}

      {/* --- TABLE --- */}
      {!loading &&
        transactions &&
        transactions.length > 0 && (
          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full shadow-lg overflow-hidden ">
              <thead className="text-gray-300 text-sm uppercase border-b border-[#CCCCCC]/40 bg-white/15 lg:h-[60px]">
                <tr>
                  <th className="px-4 py-3 text-left">Tx Hash</th>
                  <th className="px-4 py-3 text-left">To</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Value</th>
                  <th className="px-4 py-3 text-left">Value (USD)</th>
                  <th className="px-4 py-3 text-left">Token</th>
                  <th className="px-4 py-3 text-left">Chain</th>
                  <th className="px-4 py-3 text-left">Block Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((tx: any, idx: number) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-900 cursor-pointer transition"
                    onClick={() => {
                      // window.open(tx?.hash);
                    }}
                  >
                    <td className="px-4 py-3 truncate max-w-[150px] text-blue-400">
                      {tx.hash.slice(0, 10)}...
                    </td>
                    <td className="px-4 py-3 truncate max-w-[150px] text-blue-400">
                    {tx.to.slice(0, 10)}...
                    </td>
                    <td className="px-4 py-3">
                      {new Date(tx?.metadata?.blockTimestamp).toString().split("GMT")[0]}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        tx.from==address?.toLowerCase() ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {tx.from==address?.toLowerCase() ? "OUT" : "IN"}
                    </td>
                    <td className="px-4 py-3">
                     {tx.value}
                    </td>
                    <td className="px-4 py-3">
                        {tx.usdValue ? `$${(tx.usdValue * tx.value).toFixed(2)}` : "N/A"}
                    </td>
                    <td className="px-4 py-3">{tx.asset}</td>
                    <td className="px-4 py-3">{tx.chainName}</td>
                    <td className="px-4 py-3">
                      <div
                        className={`px-2 flex flex-row justify-center items-center capitalize ${
                          tx.txStatus === "rejected" ||
                          tx.txStatus === "pending"
                            ? "text-red-400 rounded-[4px] bg-red-200"
                            : "text-green-400 rounded-[4px] bg-[rgba(55,114,69,0.30)]"
                        }`}
                      >
                        {tx.blockNum}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- MOBILE CARDS --- */}
      {!loading &&
        transactions &&
        transactions.length > 0 && (
          <div className="w-full px-4 md:hidden">
            {transactions.map((tx: any, idx: number) => (
              <TransactionItem key={idx} tx={tx} address={address as string} />
            ))}
          </div>
        )}

              </>

          )
            
        
          }

          {!isConnected && (
                (
                  <>
                  <div className="text-[25px]">Orbitx Assignment</div>
                  <div onClick={handleConnect} className="text-white mt-11 bg-blue-700 p-3 rounded-xl cursor-pointer hover:scale-105">Connect Wallet</div>
                  </>
                )
          )}
  
        </div>

       
      
      </main>

    </div>

 
    </>
  );
}
