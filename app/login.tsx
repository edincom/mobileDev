import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { AuthContext } from "@/utils/authContext";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      authContext.logIn();
      return;
    }
    authContext.logIn();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText size="heading" center style={styles.title}>
        Login
      </AppText>
      

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Log in!" onPress={handleLogin} />

      <Button
        title="Register"
        onPress={() => router.push("/register")}
        style={styles.registerButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff", // match your register background if needed
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 12,
  },
});
