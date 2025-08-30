import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";


const ITEMS: Record<
  string,
  { title: string; description: string; image: string }
> = {
  a1:  { title: "Apples",      description: "Crisp and sweet. Great for snacks.", image: "https://picsum.photos/id/1080/400/600" },
  a2:  { title: "Bananas",     description: "Rich in potassium.",                 image: "https://picsum.photos/id/292/400/600" },
  a3:  { title: "Grapes",      description: "Perfect for a quick bite.",          image: "https://picsum.photos/id/433/400/600" },
  a4:  { title: "Pasta",       description: "Versatile and comforting.",          image: "https://picsum.photos/id/152/400/600" },
  a5:  { title: "Sushi",       description: "Fresh and delicate flavors.",        image: "https://picsum.photos/id/292/400/600" },
  a6:  { title: "Tacos",       description: "Spicy and fun to eat.",              image: "https://picsum.photos/id/1025/400/600" },
  a7:  { title: "Ramen",       description: "Warm broth, chewy noodles.",         image: "https://picsum.photos/id/1062/400/600" },
  a8:  { title: "Salad",       description: "Light and refreshing.",              image: "https://picsum.photos/id/102/400/600" },
  a9:  { title: "Pizza",       description: "Cheesy goodness, endless toppings.", image: "https://picsum.photos/id/1080/400/600" },
  a10: { title: "Blueberries", description: "Antioxidant-packed berries.",        image: "https://picsum.photos/id/433/400/600" },
};

const DATA = Object.entries(ITEMS).map(([id, v]) => ({ id, ...v }));

export default function ProfileScreen() {
  const { width: screenW } = useWindowDimensions();

  const H_PADDING = 16 * 2;
  const GAP = 14;
  const cardWidth = (screenW - H_PADDING - GAP) / 2;

  const CARD_ASPECT = 1.6; 
  const CARD_HEIGHT = Math.round(cardWidth * CARD_ASPECT);

  const IMAGE_FRACTION = 0.4;
  const IMAGE_HEIGHT = Math.round(CARD_HEIGHT * IMAGE_FRACTION);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/*Dashboard*/}
        <View style={styles.topHalf}>
          <View style={[styles.card, styles.cardTop]}>
            <Text style={styles.welcome}>Welcome Back, Joanna!</Text>

            <View style={styles.pointsWrapper}>
              <Text style={styles.pointsNumber}>400</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>

            <View style={styles.squaresRow}>
              <View style={styles.square}>
                <Text style={styles.squareNumber}>2</Text>
                <Text style={styles.squareCaption}>given</Text>
              </View>
              <View style={styles.square}>
                <Text style={styles.squareNumber}>3</Text>
                <Text style={styles.squareCaption}>received</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomHalf}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: GAP }}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <View style={[styles.itemCard, { width: cardWidth, height: CARD_HEIGHT }]}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: IMAGE_HEIGHT }}
                  resizeMode="cover"
                />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemLine} numberOfLines={1} ellipsizeMode="tail">
                    <Text style={styles.itemLabel}>Title: </Text>
                    <Text style={styles.itemText}>{item.title}</Text>
                  </Text>
                  <Text style={styles.itemLine} numberOfLines={4} ellipsizeMode="tail">
                    <Text style={styles.itemLabel}>Description: </Text>
                    <Text style={styles.itemDesc}>{item.description}</Text>
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  root: { flex: 1, padding: 16, gap: 16 },

  topHalf: { flex: 1, minHeight: 0 },
  bottomHalf: { flex: 1, minHeight: 0 },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 3 },
    }),
  },
  cardTop: { justifyContent: "space-between", alignItems: "center" },
  welcome: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  pointsWrapper: { alignItems: "center", justifyContent: "center", paddingVertical: 6 },
  pointsNumber: { fontSize: 72, lineHeight: 78, fontWeight: "900", color: "#111827", textAlign: "center" },
  pointsLabel: { fontSize: 18, fontWeight: "600", color: "#6b7280", marginTop: 2, textAlign: "center" },

  squaresRow: { flexDirection: "row", gap: 12, width: "100%", marginTop: 6 },
  square: {
    flex: 1,
    height: 84,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  squareNumber: { fontSize: 28, fontWeight: "800", color: "#111827" },
  squareCaption: { position: "absolute", bottom: 8, fontSize: 12, color: "#6b7280", fontWeight: "600" },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
  },
  itemLine: { fontSize: 13, color: "#111827", marginBottom: 4 },
  itemLabel: { fontWeight: "700", color: "#374151" },
  itemText: { fontWeight: "700", color: "#111827" },
  itemDesc: { color: "#4b5563" },
});
