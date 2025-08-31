import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import useFetch from "@/hooks/useFetch";
import { fetchUserItems } from "@/services/firestore";
import ProfileCard from "@/components/ProfileCard";
import { useLocalSearchParams } from "expo-router";

const user = {
  id: "TJzpl1aCKjxoIKDZiyQ0",
  name: "Alison Cumberback",
  avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  points: 120,
  itemsGiven: 8,
  itemsReceived: 5,
};

let fakeItems = [
  {
    id: "1",
    title: "Red Mug",
    category: "Others",
    condition: "New",
    description:
      "Brand new Owala Color Drop insulated water bottle, still sealed in its original packaging. This 40 oz (1185 mL) bottle is leak-proof and features a convenient built-in straw. It is designed to keep drinks cold for up to 24 hours. Perfect for staying hydrated on the go, at the gym, or for daily use.",
    imageUrl: "https://syncshack.s3.ap-southeast-2.amazonaws.com/bottle.jpg",
  },
  {
    id: "2",
    title: "Black Ergonomic Mesh Office Chair",
    category: "Furniture",
    condition: "Well Used",
    description:
      "A comfortable office chair with adjustable height and lumbar support.",
    imageUrl: "https://syncshack.s3.ap-southeast-2.amazonaws.com/chair.jpg",
  },
];

const newFakeItem = {
  id: "3",
  title: "Lightweight Casual Messenger Bag",
  category: "Fashion",
  condition: "Used",
  description:
    "A stylish and functional messenger bag, perfect for carrying your daily essentials.",
  imageUrl: "https://syncshack.s3.ap-southeast-2.amazonaws.com/bag.jpg",
};

export default function ProfileScreen() {
  const {
    data: items,
    loading,
    error,
  } = useFetch(() => fetchUserItems(user.id), true);
  const displayItems = items && items.length > 0 ? items : fakeItems;

  const params = useLocalSearchParams();
  const previousScreen = params.previousScreen;

  useEffect(() => {
    if (previousScreen === "/give") {
      // Populate form fields with camera data

      fakeItems = [...fakeItems, newFakeItem];
    }
  }, [previousScreen]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#f8f9fa",
        gap: 20,
        padding: 20,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <ProfileCard
            name={user.name}
            avatarUrl={user.avatarUrl}
            points={user.points}
            itemsGiven={user.itemsGiven}
            itemsReceived={user.itemsReceived}
          />
          <View style={styles.itemsContainer}>
            <Text style={styles.itemsTitle}>Items for Giving</Text>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}
            {displayItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemRow}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.itemImage}
                  />
                  <View className="flex-1 ml-2 gap-1">
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemMeta}>
                      {item.category} • {item.condition}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  itemsContainer: {
    marginTop: 32,
    width: 320,
    alignItems: "center",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    width: "100%",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemMeta: {
    color: "#888",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
});
