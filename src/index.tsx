import 'react-native-get-random-values';
import '@ethersproject/shims';

import { Wallet } from 'ethers';
import Web3 from 'web3';
import { RelayProvider } from '@opengsn/provider';
import type { GSNConfig } from '@opengsn/common';
//import { tokenFaucet } from './contracts/tokenFaucet';

export interface NetworkConfig {
  rpcUrl: string;
  contracts: {
    paymaster: string;
    tokenFaucet: string;
  };
  gsn: GSNConfig;
}

export const localNetworkConfig: NetworkConfig = {
  rpcUrl: 'http://localhost:8545',
  contracts: {
    paymaster: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    tokenFaucet: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  },
  gsn: {
    paymasterAddress: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
    auditorsCount: 0,
    loggerConfiguration: {
      logLevel: 'info',
    },
  } as GSNConfig,
};

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

const getGSNProvider = async (account: Wallet) => {
  const { rpcUrl, gsn } = localNetworkConfig;
  const web3provider = new Web3.providers.HttpProvider(rpcUrl);

  let gsnProvider = RelayProvider.newProvider({
    provider: web3provider,
    config: gsn,
  });

  console.log(gsnProvider);

  await gsnProvider.init();
  //add user account to gsn provider

  gsnProvider.addAccount(account.privateKey);

  //wrap gsnProvider in ethersprovider for contract interactions
  //@ts-ignore
  return new providers.Web3Provider(gsnProvider);
};

export async function claim(): Promise<string> {
  const account = Wallet.createRandom();
  const provider = await getGSNProvider(account);
  console.log(provider);
  //const provider = await getGSNProvider(account);
  //const faucet = tokenFaucet(localNetworkConfig, provider);
  //await faucet.claim();
  console.log('tokens claimed by', account.address);
  return account.address;
}
