import { Button } from '@/components/Button';
import { AuthContext } from '@/utils/authContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const authContext = useContext(AuthContext);
  const canSubmit = true;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stak</Text>
      <Button
        title="Log Out"
        onPress={() => authContext.logOut()}
        disabled={!canSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
