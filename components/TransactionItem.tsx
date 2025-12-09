
import { copyToClipboard } from "@/utils";
import { Copy } from "lucide-react";
import React from "react";

interface TransactionItemProps {
  tx: any;
  address: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ tx, address }) => {
  return (
    <div className="bg-white/10 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-400">Tx Hash</div>
          <div className="text-blue-400 flex items-center">
            <span className="truncate max-w-[150px]">{tx.hash}</span>
            <Copy
              className="!h-4 !w-4 ml-2 cursor-pointer"
              onClick={() => copyToClipboard(tx.hash)}
            />
          </div>
        </div>
        <div
          className={`font-semibold ${
            tx.from === address?.toLowerCase()
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {tx.from === address?.toLowerCase() ? "OUT" : "IN"}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400">To</div>
          <div className="text-blue-400 truncate max-w-[150px]">{tx.to}</div>
        </div>
        <div>
          <div className="text-gray-400">Time</div>
          <div>{new Date(tx?.metadata?.blockTimestamp).toLocaleDateString()}</div>
        </div>
        <div>
          <div className="text-gray-400">Value</div>
          <div>{tx.value}</div>
        </div>
        <div>
          <div className="text-gray-400">Value (USD)</div>
          <div>{tx.usdValue ? `$${(tx.usdValue * tx.value).toFixed(2)}` : "N/A"}</div>
        </div>
        <div>
          <div className="text-gray-400">Token</div>
          <div>{tx.asset}</div>
        </div>
        <div>
          <div className="text-gray-400">Chain</div>
          <div>{tx.chainName}</div>
        </div>
        <div>
          <div className="text-gray-400">Block Number</div>
          <div>{tx.blockNum}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
