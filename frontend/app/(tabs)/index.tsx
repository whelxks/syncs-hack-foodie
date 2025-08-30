import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import { toNumber5DP } from "../../functions/map";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "@/components/custom";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922; // standard starting delta (about 10km)
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function ReceiveScreen() {
  const { lat, long } = useLocalSearchParams<{ lat: string; long: string }>();
  const latNum = toNumber5DP(lat);
  const longNum = toNumber5DP(long);

  const onSearch = () => {
    console.log("hihi");
  };

  // call for db for all items
  // optimise next time: pass in params as user scrolls for pagination type query

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latNum,
          longitude: longNum,
          // reference from: https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* this is your location */}
        <Marker
          coordinate={{ latitude: latNum, longitude: longNum }}
          // image={{ uri: "custom_pin" }}
          title={"sdasdasd"}
          description={"sdasdsd"}
        />
      </MapView>

      <SearchBar onSearch={(text) => console.log(text)} />
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
