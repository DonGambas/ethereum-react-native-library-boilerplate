import 'react-native-get-random-values';
import '@ethersproject/shims';

import { Wallet } from 'ethers';
import Web3 from 'web3';

export function createAddress(): string {
  const web3 = new Web3('http://localhost:8545');
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];
  return newAccount?.address || 'wallet not created';
}

export function createAddressEthers(): string {
  const newWallet = Wallet.createRandom();
  return newWallet.address;
}
