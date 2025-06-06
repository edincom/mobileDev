import { Pressable, StyleSheet, Text } from 'react-native';

type Card = {
  id: string;
  title: string;
};

type CardSheetProps = {
  card: Card;
  showDelete?: boolean;
  onPress?: (id: string) => void;
  onDelete?: (id: string) => void;
};


export default function CardSheet({ card, showDelete, onPress, onDelete }: CardSheetProps) {
  return (
    <Pressable
      onPress={() => onPress?.(card.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text style={styles.title}>{card.title}</Text>

      {showDelete && (
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete?.(card.id)}
        >
          <Text style={styles.deleteText}>X</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1,
    width: 150,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#3c3f45',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    position: 'relative',
  },
  title: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    padding: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
  },
});