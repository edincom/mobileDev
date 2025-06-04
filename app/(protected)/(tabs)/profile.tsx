import { useUser } from "@/lib/api/user"; // import the hook
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

const ProfileScreen = () => {
  const email = "edincomor@gmail.com"; // hardcoded for now

  // React Query hook to fetch user data
  const { data: user, isLoading, error } = useUser(email);

  // Local state for form fields
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");

  // When user data loads, populate the form
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setProfession(user.profession ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  const handleSave = () => {
    if (!name || !profession || !phone) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    // TODO: Send updated data to backend or update context
    console.log({ name, profession, phone });
    Alert.alert("Success", "Profile saved!");
  };

  if (isLoading) return <Text style={{ textAlign: "center", marginTop: 20 }}>Loading...</Text>;
  if (error) return <Text style={{ textAlign: "center", marginTop: 20 }}>Error: {error.message}</Text>;

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
