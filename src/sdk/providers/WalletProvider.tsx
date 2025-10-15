import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  WalletContextValue, 
  WalletProviderProps, 
  WalletState, 
  Wallet
} from '../types';
import { getStorageItem, setStorageItem } from '../utils';
import WalletModal from '../components/WalletModal';
import { BrowserProvider } from 'ethers'

// Create context with default values
const WalletContext = createContext<WalletContextValue>({
  address: null,
  chainId: null,
  isConnecting: false,
  isConnected: false,
  ensName: null,
  error: null,
  connect: async () => {},
  disconnect: async () => {},
  switchChain: async () => {},
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false,
  provider: null,
  chains: [],
});

export const WalletProvider: React.FC<WalletProviderProps> = ({ 
  children, 
  chains, 
  wallets,
  autoConnect = true,
  theme = {},
}) => {
  // Wallet state
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
    ensName: null,
    error: null,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Wallets map for quick lookup
  const walletsMap = useMemo(() => {
    return wallets.reduce((acc, wallet) => {
      acc[wallet.id] = wallet;
      return acc;
    }, {} as Record<string, Wallet>);
  }, [wallets]);

  // Auto-connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      const lastConnectedWallet = getStorageItem<string>('lastConnectedWallet');
      if (lastConnectedWallet && walletsMap[lastConnectedWallet]) {
        connect(lastConnectedWallet).catch(console.error);
      }
    }
  }, [autoConnect, walletsMap]);

  // Set up event listeners for wallet events
  useEffect(() => {
    const handleAccountsChanged = (event: CustomEvent<{ accounts: string[] }>) => {
      const [newAddress] = event.detail.accounts;
      setState(prev => ({
        ...prev,
        address: newAddress || null,
        isConnected: !!newAddress,
      }));
    };

    const handleChainChanged = (event: CustomEvent<{ chainId: number }>) => {
      setState(prev => ({
        ...prev,
        chainId: event.detail.chainId,
      }));
    };

    const handleDisconnect = () => {
      setState({
        address: null,
        chainId: null,
        isConnecting: false,
        isConnected: false,
        ensName: null,
        error: null,
      });
      localStorage.removeItem('lastConnectedWallet');
    };

    window.addEventListener('wallet_accountsChanged', handleAccountsChanged as EventListener);
    window.addEventListener('wallet_chainChanged', handleChainChanged as EventListener);
    window.addEventListener('wallet_disconnected', handleDisconnect);

    return () => {
      window.removeEventListener('wallet_accountsChanged', handleAccountsChanged as EventListener);
      window.removeEventListener('wallet_chainChanged', handleChainChanged as EventListener);
      window.removeEventListener('wallet_disconnected', handleDisconnect);
    };
  }, []);

  // Connect to wallet
  const connect = async (walletId: string): Promise<void> => {
    try {
      const wallet = walletsMap[walletId];
      if (!wallet) {
        throw new Error(`Wallet with id "${walletId}" not found`);
      }

      setState(prev => ({ ...prev, isConnecting: true, error: null }));

      const { address, chainId, provider, signer } = await wallet.connector();

      setState({
        address,
        chainId,
        isConnecting: false,
        isConnected: true,
        ensName: null, // ENS resolution would be implemented here
        error: null,
      });

      // Store the connected wallet for auto-connect
      setStorageItem('lastConnectedWallet', walletId, 24); // 24 hour expiry
      
      // Attempt to resolve ENS name in the background
      try {
        // This would call the ENS resolver in a full implementation
        // For now, we'll leave it as null
      } catch (error) {
        console.error('Error resolving ENS name:', error);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('Connection error:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        isConnected: false,
        error: error as Error,
      }));
    }
  };

  // Disconnect wallet
  const disconnect = async (): Promise<void> => {
    setState({
      address: null,
      chainId: null,
      isConnecting: false,
      isConnected: false,
      ensName: null,
      error: null,
    });
    localStorage.removeItem('lastConnectedWallet');
    // In a full implementation, you might need to call disconnect on the provider
  };

  // Switch chain
  const switchChain = async (chainId: number): Promise<void> => {
    try {
      setState(prev => ({ ...prev, error: null }));
      
      // Check if the chain is supported
      const targetChain = chains.find(chain => chain.id === chainId);
      if (!targetChain) {
        throw new Error(`Chain with id "${chainId}" not supported`);
      }
      
      // Get provider from window.ethereum (simplified for this example)
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Try to switch to the chain
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
          });
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: targetChain.name,
                  rpcUrls: [targetChain.rpcUrl],
                  nativeCurrency: targetChain.currency,
                  blockExplorerUrls: targetChain.blockExplorer 
                    ? [targetChain.blockExplorer.url] 
                    : undefined,
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
        
        // Update state with new chain ID
        setState(prev => ({ ...prev, chainId }));
      } else {
        throw new Error('No Ethereum provider found');
      }
    } catch (error) {
      console.error('Error switching chain:', error);
      setState(prev => ({ ...prev, error: error as Error }));
    }
  };

  // Modal controls
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Context value
  const value: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    switchChain,
    openModal,
    closeModal,
    isModalOpen,
    chains,
    provider: new BrowserProvider(window.ethereum!), // 假设这里需要一个 provider
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
      <WalletModal
        isOpen={isModalOpen}
        onClose={closeModal}
        wallets={wallets}
        onSelectWallet={connect}
        connecting={state.isConnecting}
        error={state.error}
      />
    </WalletContext.Provider>
  );
};

// Hook to use wallet context
export const useWallet = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export default WalletProvider;