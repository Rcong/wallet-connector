export interface Wallet {
  id: string;
  name: string;
  icon: React.FC;
  connector: () => Promise<any>;
  description?: string;
  installed?: boolean;
  downloadUrl?: string;
}

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

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  ensName: string | null;
  error: Error | null;
}

export interface WalletContextValue extends WalletState {
  connect: (walletId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
  provider: any;
  chains: Chain[];
}

export interface WalletProviderProps {
  children: React.ReactNode;
  chains: Chain[];
  wallets: Wallet[];
  autoConnect?: boolean;
  theme?: Theme;
}

export interface Theme {
  accentColor?: string;
  accentColorForeground?: string;
  borderRadius?: string;
  fontStack?: string;
  overlayBlur?: string;
}

export interface ConnectButtonProps {
  label?: string;
  showBalance?: boolean;
  chainStatus?: 'icon' | 'name' | 'full' | 'none';
  accountStatus?: 'address' | 'avatar' | 'full' | 'none';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onConnect?: (address: string, chainId: number) => void;
  onDisconnect?: () => void;
  onChainSwitch?: (fromChainId: number, toChainId: number) => void;
  onBalanceChange?: (balance: string) => void;
}

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
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  error: Error | null;
}

export interface ConnectButtonCustomProps {
  children: (props: ConnectButtonRenderProps) => React.ReactNode;
  className?: string;
}

export interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: Wallet[];
  onSelectWallet: (walletId: string) => Promise<void>;
  connecting: boolean;
  error: Error | null;
}