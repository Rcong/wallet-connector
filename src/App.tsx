import { useState, useEffect } from 'react';
import ConnectButton from './sdk/components/ConnectButton';
import { metaMaskWallet } from './sdk/connectors/metamask';
// import { getSigner, getAddress, getBalance } from './sdk';

const wallets = [metaMaskWallet];

function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [signer, setSigner] = useState<any>(null);

  // 事件处理函数
  const handleConnect = (address: string, chainId: number) => {
    console.info(`钱包已连接: ${address} 在链 ${chainId}`);
  };

  const handleDisconnect = () => {
    console.info('钱包已断开连接');
  };

  const handleChainSwitch = (fromChainId: number, toChainId: number) => {
    console.info(`网络切换: ${fromChainId} → ${toChainId}`);
  };

  const handleBalanceChange = (balance: string) => {
    console.info(`余额更新: ${balance}`);
  };

  const connectWallet = async () => {
    // try {
    //   const signer = await getSigner();
    //   setSigner(signer);
    //   if (signer) {
    //     const addr = await getAddress();
    //     setAddress(addr);
    //     const bal = await getBalance();
    //     setBalance(bal);
    //   }
    // } catch (error) {
    //   console.error("Failed to connect wallet", error);
    // }
  };

  useEffect(() => {
    if (signer) {
      // Optional: Add listeners for account or network changes
    }
  }, [signer]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-teal-400">Wallet Connector SDK</h1>
        
        {!address ? (
          // <button 
          //   onClick={connectWallet}
          //   className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          // >
          //   Connect Wallet
          // </button>
          <ConnectButton 
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onChainSwitch={handleChainSwitch}
            onBalanceChange={handleBalanceChange}
          />
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Connected Address:</p>
              <p className="text-lg font-mono break-all">{address}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Balance:</p>
              <p className="text-2xl font-bold text-teal-400">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Loading...'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;