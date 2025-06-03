import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (!name || !profession || !phone) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    // Here you could send the data to backend or update context
    console.log({ name, profession, phone });
    Alert.alert("Success", "Profile saved!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Profession"
        value={profession}
        onChangeText={setProfession}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
