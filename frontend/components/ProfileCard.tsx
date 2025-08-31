import { View, Text, StyleSheet, Image } from 'react-native';

export type ProfileCardProps = {
  name: string;
  avatarUrl?: string;
  points: number;
  itemsGiven: number;
  itemsReceived: number;
};

export default function ProfileCard({ name, avatarUrl, points, itemsGiven, itemsReceived }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.pointsSection}>
        <Text style={styles.pointsLabel}>Points</Text>
        <Text style={styles.pointsValue}>{points}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Given</Text>
          <Text style={styles.statValue}>{itemsGiven}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Received</Text>
          <Text style={styles.statValue}>{itemsReceived}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 260,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  pointsSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#888',
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 8,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
});
