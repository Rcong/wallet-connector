import { ethers } from 'ethers';

/**
 * Truncates an Ethereum address for display purposes.
 * @param address The full Ethereum address.
 * @param startLength The number of characters to show at the beginning.
 * @param endLength The number of characters to show at the end.
 * @returns The truncated address (e.g., "0x1234...5678").
 */
export const truncateAddress = (
  address: string,
  startLength = 6,
  endLength = 4
): string => {
  if (!address) return '';
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
};

/**
 * Formats a BigInt value from Wei to Ether.
 * @param wei The amount in Wei.
 * @param decimals The number of decimal places to show.
 * @returns The formatted Ether string.
 */
export const formatEther = (wei: bigint, decimals = 4): string => {
  const etherString = ethers.formatEther(wei);
  const etherValue = parseFloat(etherString);
  return etherValue.toFixed(decimals);
};

/**
 * Gets the name of a network from its chain ID.
 * @param chainId The chain ID.
 * @returns The name of the network or "Unknown Network".
 */
export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case 1:
      return 'Ethereum';
    case 10:
      return 'Optimism';
    case 137:
      return 'Polygon';
    case 42161:
      return 'Arbitrum';
    case 11155111:
      return 'Sepolia';
    default:
      return 'Unknown Network';
  }
};

/**
 * Checks if the MetaMask extension is installed.
 * @returns True if MetaMask is installed, false otherwise.
 */
export const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask === true;
};

/**
 * Retrieves an item from local storage and handles expiry.
 * @param key The key of the item to retrieve.
 * @returns The retrieved item or null if it's expired or doesn't exist.
 */
export const getStorageItem = <T>(key: string): T | null => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (item.expiry && now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    // If parsing fails, it might be a non-JSON string, return as is
    return itemStr as T;
  }
};

/**
 * Sets an item in local storage with an optional expiry time.
 * @param key The key of the item to set.
 * @param value The value to store.
 * @param expiryInHours The expiry time in hours.
 */
export const setStorageItem = <T>(
  key: string,
  value: T,
  expiryInHours?: number
): void => {
  const now = new Date();
  const item = {
    value,
    expiry: expiryInHours
      ? now.getTime() + expiryInHours * 60 * 60 * 1000
      : null,
  };
  localStorage.setItem(key, JSON.stringify(item));
};