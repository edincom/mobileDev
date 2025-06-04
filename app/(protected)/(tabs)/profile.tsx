import { updateUserInfo, useUser } from "@/lib/api/user"; // import updateUserInfo too
import { AuthContext } from "@/utils/authContext";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

const ProfileScreen = () => {
  //const email = "edincomor@gmail.com"; // hardcoded for now
  const { email } = useContext(AuthContext); // get email from context

  // React Query hook to fetch user data
  const { data: user, isLoading, error } = useUser(email);

  // Local state for form fields
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");

  // Loading state for saving
  const [isSaving, setIsSaving] = useState(false);

  // When user data loads, populate the form
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setProfession(user.profession ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !profession || !phone) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    setIsSaving(true);

    try {
      await updateUserInfo({ email, name, profession, phone });
      Alert.alert("Success", "Profile saved!");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
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

      {isSaving ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Save" onPress={handleSave} />
      )}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#25292e",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  input: {
    backgroundColor: "#3c3f45",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
