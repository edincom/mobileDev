import { generateCard } from "@/lib/api/create";
import { AuthContext } from "@/utils/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { email } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    if (!title || !category || !content) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const newCard = await generateCard({
        title,
        category,
        content,
        owner: email,
      });
      queryClient.invalidateQueries({ queryKey: ['cards', email] }); // invalidate the query to trigger refetch

      console.log("✅ Card created:", newCard);
      Alert.alert("Success", "Card generated and saved!");
      setTitle("");
      setCategory("");
      setContent("");

      router.replace('/'); // navigate back to home
    } catch (error: any) {
      console.error("❌ Error generating card:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        editable={!loading}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Content"
        multiline
        numberOfLines={6}
        value={content}
        onChangeText={setContent}
        editable={!loading}
      />

      {loading ? (
        <View style={{ marginVertical: 20 }}>
          <ActivityIndicator size="large" color="#1e90ff" />
          <Text style={{ textAlign: "center", marginTop: 8 }}>Generating cards...</Text>
        </View>
      ) : (
        <Button title="Generate" onPress={handleGenerate} />
      )}
    </ScrollView>
  );
};

export default CreateScreen;

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
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});
