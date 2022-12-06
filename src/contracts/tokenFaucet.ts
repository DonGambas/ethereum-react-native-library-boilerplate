import '@ethersproject/shims';
import { Contract, Signer } from 'ethers';
import * as TokenFaucet from './tokenFaucet.json';

export const tokenFaucet = (config: any, signer: Signer): Contract => {
  //@ts-ignore
  return new Contract(config.contracts.tokenFaucet, TokenFaucet.abi, signer);
};
