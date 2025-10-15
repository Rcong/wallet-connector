import type { BrowserProvider, Eip1193Provider } from 'ethers';

// 钱包对象
export interface Wallet {
  id: string;
  name: string;
  icon: React.FC;
  connector: () => Promise<any>;
  installed?: boolean;
  downloadUrl?: string;
  description?: string;
}

// 链对象
export interface Chain {
  id: number;
  name: string;
  rpcUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorer?: {
    name: string;
    url: string;
  };
}

// WalletProvider的Props
export interface WalletProviderProps {
  children: React.ReactNode;
  chains: Chain[];
  wallets: Wallet[];
  autoConnect?: boolean;
  theme?: Record<string, any>;
}

// Wallet上下文的值
export interface WalletContextValue extends WalletState {
  connect: (walletId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  provider: BrowserProvider | null;
  chains: Chain[];
}

// 钱包状态
export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  ensName: string | null;
  error: Error | null;
}

// 钱包弹窗的Props
export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: Wallet[];
  onSelectWallet: (walletId: string) => void;
  connecting: boolean;
  error: Error | null;
}

// ConnectButton的Props
export interface ConnectButtonProps {
  label?: string;
  showBalance?: boolean;
  chainStatus?: 'full' | 'name' | 'icon' | 'none';
  accountStatus?: 'full' | 'address' | 'avatar' | 'none';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onConnect?: (address: string, chainId: number) => void;
  onDisconnect?: () => void;
  onChainSwitch?: (oldChainId: number, newChainId: number) => void;
  onBalanceChange?: (balance: string) => void;
}

// ConnectButton.Custom的Props
export interface ConnectButtonCustomProps {
  children: (props: ConnectButtonRenderProps) => React.ReactNode;
  className?: string;
}

// ConnectButton.Custom的渲染属性
export interface ConnectButtonRenderProps {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  ensName: string | null;
  balance: string | null;
  chainId: number | null;
  currentChain: Chain | null;
  chains: Chain[];
  connect: () => void;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
    };
  }
}