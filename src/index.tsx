import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'web3-test-lib' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Web3TestLib = NativeModules.Web3TestLib
  ? NativeModules.Web3TestLib
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Web3TestLib.multiply(a, b);
}
