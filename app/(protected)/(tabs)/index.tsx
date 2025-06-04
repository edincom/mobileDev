import { Button } from '@/components/Button';
import CardSheet from '@/components/CardSheet';
import { deleteCard, useCards } from '@/lib/api/cards';
import { AuthContext } from '@/utils/authContext';
import { useRouter } from 'expo-router'; // ✅ import
import React, { useContext } from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';


export default function Index() {
  const authContext = useContext(AuthContext);
  const { email } = useContext(AuthContext); // get email from context
  //const email = 'edincomor@gmail.com';
  const { data: cards, isLoading, error, refetch } = useCards(email);
  const router = useRouter(); // ✅ get router

  const handleCardPress = (id: string) => {
    router.push(`/study/${id}`); // ✅ dynamic navigation
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCard(id);
      await refetch();
    } catch (err: any) {
      console.error('Failed to delete card', err);
    }
  };

  return (
    <View style={styles.container}>

      {isLoading && <Text style={styles.text}>Loading cards...</Text>}
      {error && <Text style={styles.text}>Error: {error.message}</Text>}

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CardSheet
            card={item}
            showDelete
            onPress={handleCardPress}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.cardGrid}
      />

      <Button
        title="Log Out"
        onPress={() => authContext?.logOut()}
        disabled={false}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
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
  logoutButton: {
    backgroundColor: "#ff4d4f",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});
