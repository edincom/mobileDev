import { Button } from '@/components/Button';
import CardSheet from '@/components/CardSheet';
import { useCards } from '@/lib/api/cards';
import { AuthContext } from '@/utils/authContext';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const authContext = useContext(AuthContext);
  const email = 'leo@messi.com'; // hardcoded
  const { data: cards, isLoading, error } = useCards(email);

  const handleCardPress = (id: string) => {
    console.log(`Navigate to /study/${id}`); // navigation not implemented yet
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stak</Text>

      {isLoading && <Text style={styles.text}>Loading cards...</Text>}
      {error && <Text style={styles.text}>Error: {error.message}</Text>}

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CardSheet
            card={item}
            showDelete // just for display
            onPress={handleCardPress}
          />
        )}
        contentContainerStyle={styles.cardGrid}
      />

      <Button
        title="Log Out"
        onPress={() => authContext?.logOut()}
        disabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 16,
  },
  text: {
    color: '#fff',
  },
  cardGrid: {
    paddingHorizontal: 16,
  },
});
