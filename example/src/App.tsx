import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { claim } from 'web3-test-lib';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    const claimCoins = async () => {
      const address = await claim();
      setResult(address);
    };
    claimCoins();
  }, []);

  return (
    <View style={styles.container}>
      <Text>tokens claimed by: {result}</Text>
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
