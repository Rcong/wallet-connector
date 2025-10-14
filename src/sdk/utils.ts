import { ethers } from 'ethers';

/**
 * Truncates an Ethereum address to a displayable format
 * @param address Full Ethereum address
 * @param startLength Number of characters to show at start
 * @param endLength Number of characters to show at end
 * @returns Truncated address string
 */
export const truncateAddress = (
  address: string,
  startLength = 4,
  endLength = 4
): string => {
  if (!address) return '';
  
  const start = address.substring(0, startLength + 2);
  const end = address.substring(address.length - endLength);
  
  return `${start}...${end}`;
};

/**
 * Format ETH value to readable format
 * @param value Value in wei
 * @param decimals Number of decimals to display
 * @returns Formatted ETH value with symbol
 */
export const formatEther = (
  value: string | number,
  decimals = 4
): string => {
  if (!value) return '0 ETH';
  
  const formatted = parseFloat(ethers.formatEther(value.toString()))
    .toFixed(decimals)
    .replace(/\.?0+$/, ''); // Remove trailing zeros
  
  return `${formatted} ETH`;
};

/**
 * Gets local storage value with expiry check
 * @param key Storage key
 * @returns Stored value or null if expired/not found
 */
export const getStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  try {
    const { value, expiry } = JSON.parse(item);
    if (expiry && new Date().getTime() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return value as T;
  } catch (e) {
    return null;
  }
};

/**
 * Sets local storage value with optional expiry
 * @param key Storage key
 * @param value Value to store
 * @param expiryInHours Optional expiry in hours
 */
export const setStorageItem = <T>(
  key: string,
  value: T,
  expiryInHours?: number
): void => {
  const item = {
    value,
    expiry: expiryInHours
      ? new Date().getTime() + expiryInHours * 60 * 60 * 1000
      : null,
  };
  
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Detects if MetaMask is installed
 * @returns Boolean indicating if MetaMask is available
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && 
    typeof window.ethereum !== 'undefined' && 
    window.ethereum.isMetaMask === true;
};

/**
 * Check if we're in a mobile browser
 * @returns Boolean indicating if browser is mobile
 */
export const isMobileBrowser = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get network name from chain ID
 * @param chainId Ethereum chain ID
 * @returns Network name
 */
export const getNetworkName = (chainId: number): string => {
  const networks: Record<number, string> = {
    1: 'Ethereum',
    5: 'Goerli',
    11155111: 'Sepolia',
    137: 'Polygon',
    80001: 'Mumbai',
    42161: 'Arbitrum',
    10: 'Optimism',
    56: 'BSC',
    43114: 'Avalanche',
  };
  
  return networks[chainId] || `Chain ${chainId}`;
};