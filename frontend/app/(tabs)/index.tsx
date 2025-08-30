import {SafeAreaView, View, Text, BackHandler, StyleSheet, Image } from "react-native";

type User = {
  name: string;
  avatarUrl: string;
}

const user: User = {
  name: 'Helena Cumberback',
  avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image 
          source = {{ uri: user.avatarUrl }}
          style = {styles.avatar}
        />
      </View>
      <View className='flex-row, gap-3'>
        <Text>{user.name}</Text>
        <Text>{user.name}</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    marginHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minWidth: 220,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
});
