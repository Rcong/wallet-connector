import React from 'react';
import { Wallet } from 'lucide-react';

export const MetaMaskIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1003 3L13.6 8.4L15.1 5.1L21.1003 3Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.89966 3L10.3 8.5L8.89966 5.1L2.89966 3Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.2 16.6L16.1 20.2L20.7 21.5L22 16.7L18.2 16.6Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 16.7L3.3 21.5L7.9 20.2L5.8 16.6L2 16.7Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.6 10.6L6.3 12.8L10.8 13L10.7 8.1L7.6 10.6Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.4 10.6L13.2 8L13.2 13L17.7 12.8L16.4 10.6Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.9 20.2L10.5 18.8L8.2 16.7L7.9 20.2Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.5 18.8L16.1 20.2L15.8 16.7L13.5 18.8Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WalletConnectIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.26304 9.4208C9.39758 6.33562 14.6023 6.33562 17.7369 9.4208L18.0836 9.76044C18.2342 9.90846 18.2342 10.147 18.0836 10.295L16.8452 11.5113C16.7699 11.5853 16.6475 11.5853 16.5722 11.5113L16.0938 11.0422C13.9086 8.89353 10.0913 8.89353 7.90609 11.0422L7.39516 11.5447C7.31984 11.6188 7.19744 11.6188 7.12212 11.5447L5.88372 10.3285C5.73313 10.1804 5.73313 9.94191 5.88372 9.79389L6.26304 9.4208ZM20.4937 12.1453L21.6103 13.2432C21.7609 13.3912 21.7609 13.6297 21.6103 13.7777L16.3913 18.9073C16.2407 19.0553 15.9959 19.0553 15.8453 18.9073L12.2596 15.3825C12.2219 15.3455 12.1622 15.3455 12.1245 15.3825L8.53883 18.9073C8.38824 19.0553 8.14347 19.0553 7.99288 18.9073L2.77372 13.7777C2.62313 13.6297 2.62313 13.3912 2.77372 13.2432L3.89027 12.1453C4.04086 11.9973 4.28563 11.9973 4.43622 12.1453L8.02192 15.6701C8.05965 15.7071 8.11932 15.7071 8.15706 15.6701L11.7427 12.1453C11.8933 11.9973 12.1381 11.9973 12.2887 12.1453L15.8744 15.6701C15.9121 15.7071 15.9718 15.7071 16.0095 15.6701L19.5952 12.1453C19.7458 11.9973 19.9906 11.9973 20.1412 12.1453H20.4937Z" fill="#3B99FC"/>
  </svg>
);

export const CoinbaseIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.47761 2 2 6.47761 2 12C2 17.5224 6.47761 22 12 22C17.5224 22 22 17.5224 22 12C22 6.47761 17.5224 2 12 2ZM12.8657 16.209C12.6866 16.3881 12.403 16.4776 12.1194 16.4776H9.08955C8.80597 16.4776 8.52239 16.2985 8.34328 16.0149C8.25373 15.8358 8.16418 15.6567 8.16418 15.4776V8.52239C8.16418 8.23881 8.34328 7.95522 8.52239 7.7761C8.70149 7.59701 8.89552 7.50746 9.17911 7.50746H12.1194C12.403 7.50746 12.6866 7.6866 12.8657 7.86567C13.0448 8.04478 13.1343 8.32836 13.1343 8.61194V15.4776C13.1343 15.7612 13.0448 16.0448 12.8657 16.209Z" fill="#0052FF"/>
    <path d="M11.9403 9.20898H10.0299V14.7761H11.9403C12.2239 14.7761 12.5075 14.597 12.5075 14.2239V9.76119C12.5075 9.47761 12.2239 9.20898 11.9403 9.20898Z" fill="#0052FF"/>
  </svg>
);

export const DefaultWalletIcon: React.FC = () => (
  <Wallet size={24} />
);