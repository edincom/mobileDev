import { useCardById } from '@/lib/api/cards';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

// 👇 Define param list inline
type StackParamList = {
  Study: { id: string };
};

type StudyScreenRouteProp = RouteProp<StackParamList, 'Study'>;
type StudyScreenNavigationProp = StackNavigationProp<StackParamList, 'Study'>;

export default function StudyScreen() {
  const route = useRoute<StudyScreenRouteProp>();
  const navigation = useNavigation<StudyScreenNavigationProp>();
  const { id } = route.params;

  const { data: card, isLoading, error } = useCardById(id);

  const [isStarted, setIsStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  const getRandomQuestion = () => {
    if (!card?.content?.question_answers?.length) return null;
    const index = Math.floor(Math.random() * card.content.question_answers.length);
    return card.content.question_answers[index];
  };

  const getNextQuestion = () => {
    const next = getRandomQuestion();
    setCurrentQuestion(next);
    setShowAnswer(false);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (error || !card) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Card not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <>
          <Text style={styles.title}>
            Studying <Text style={styles.highlight}>{card.title}</Text>!
          </Text>
          <Text style={styles.subtitle}>Ready to study? Let’s GO!</Text>
          <View style={styles.buttonGroup}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setIsStarted(true);
                getNextQuestion();
              }}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQuestion?.question}</Text>
            {showAnswer && (
              <Text style={styles.answerText}>{currentQuestion?.answer}</Text>
            )}
          </View>
          <View style={styles.buttonGroup}>
            <Pressable style={styles.button} onPress={() => setShowAnswer(true)}>
              <Text style={styles.buttonText}>Show Answer</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={getNextQuestion}>
              <Text style={styles.buttonText}>Next Question</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Done</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  highlight: {
    color: '#facc15',
  },
  subtitle: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: '#0ea5e9',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    marginBottom: 24,
  },
  questionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  answerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    margin: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
