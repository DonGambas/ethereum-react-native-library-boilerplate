import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { createAddress, createAddressEthers } from 'web3-test-lib';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();
  const [resultEthers, setResultEthers] = React.useState<string | undefined>();

  React.useEffect(() => {
    const address = createAddress();
    const ethersAddress = createAddressEthers();
    console.log('address', address);
    console.log('ethers address', ethersAddress);
    setResult(address);
    setResultEthers(ethersAddress);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result web3js: {result}</Text>
      <Text>Result ethersjs: {resultEthers}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
