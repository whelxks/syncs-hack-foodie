import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { kMToLongitudes } from "../functions/map";

export default function ReceiveScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          // reference from: https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156
          latitudeDelta: 0.00001, // any number significantly smaller than longitudeDelta
          longitudeDelta: kMToLongitudes(1.0, 51.588491), // 1 km radius from ur location
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
