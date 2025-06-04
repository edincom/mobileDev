import { Pressable, StyleSheet, Text } from 'react-native';

type Card = {
  id: string;
  title: string;
};

type CardSheetProps = {
  card: Card;
  showDelete?: boolean;
  onPress?: (id: string) => void;
};

export default function CardSheet({ card, showDelete, onPress }: CardSheetProps) {
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
          onPress={() => {
            // No delete logic yet
            console.log('Delete button pressed (noop)');
          }}
        >
          <Text style={styles.deleteText}>🗑️</Text>
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
    backgroundColor: '#38bdf8',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    position: 'relative',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#dc2626',
    borderRadius: 12,
    padding: 4,
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
  },
});
