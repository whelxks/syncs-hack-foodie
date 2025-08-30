import { View, Text, Image } from "react-native";
import useFetch from "@/hooks/useFetch";
import { fetchUserItems } from "@/services/firestore";
import ProfileCard from "@/components/ProfileCard";

const user = {
  id: "TJzpl1aCKjxoIKDZiyQ0",
  name: "Alison Cumberback",
  avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  points: 120,
  itemsGiven: 8,
  itemsReceived: 5,
};

export default function ProfileScreen() {
  const {
    data: items,
    loading,
    error,
  } = useFetch(() => fetchUserItems(user.id), true);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <ProfileCard
        name={user.name}
        avatarUrl={user.avatarUrl}
        points={user.points}
        itemsGiven={user.itemsGiven}
        itemsReceived={user.itemsReceived}
      />
      <View style={{ marginTop: 32, width: "80%" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          Items for Giving
        </Text>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        {items && items.length === 0 && <Text>No items found.</Text>}
        {items &&
          items.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 12,
                marginVertical: 6,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#333" }}>
                {item.title}
              </Text>
              <Text style={{ color: "#888" }}>
                {item.category} • {item.condition}
              </Text>
              <Text style={{ color: "#888" }}>{item.description}</Text>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                />
              )}
            </View>
          ))}
      </View>
    </View>
  );
}
