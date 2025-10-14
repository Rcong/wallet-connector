import React from 'react';
import { Wallet } from '../types';
import { ExternalLink, Download } from 'lucide-react';
import { 
  MetaMaskIcon, 
  WalletConnectIcon, 
  CoinbaseIcon,
  DefaultWalletIcon
} from '../icons';

interface WalletButtonProps {
  wallet: Wallet;
  onClick: () => void;
  disabled?: boolean;
}

const WalletButton: React.FC<WalletButtonProps> = ({ 
  wallet, 
  onClick, 
  disabled = false 
}) => {
  // Determine the icon to use
  const getWalletIcon = () => {
    switch (wallet.id) {
      case 'metamask':
        return <MetaMaskIcon />;
      case 'walletconnect':
        return <WalletConnectIcon />;
      case 'coinbase':
        return <CoinbaseIcon />;
      default:
        return <DefaultWalletIcon />;
    }
  };

  // If wallet needs to be installed
  if (wallet.downloadUrl && wallet.installed === false) {
    return (
      <a
        href={wallet.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
            {getWalletIcon()}
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-white">{wallet.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Not installed</p>
          </div>
        </div>
        <Download size={18} className="text-gray-400" />
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 ${
        disabled
          ? 'opacity-70 cursor-not-allowed'
          : 'hover:bg-gray-50 dark:hover:bg-gray-750 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
          {getWalletIcon()}
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900 dark:text-white">{wallet.name}</p>
          {wallet.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.description}</p>
          )}
        </div>
      </div>
      {wallet.downloadUrl && (
        <ExternalLink size={18} className="text-gray-400" />
      )}
    </button>
  );
};

export default WalletButton;