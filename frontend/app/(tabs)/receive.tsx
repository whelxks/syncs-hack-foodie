import { SearchBar } from "@/components/custom";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import {
  Category,
  CategoryColour,
  CategoryEmoji,
  Condition,
} from "@/constants/Enums";
import { ItemSchema } from "@/types/item";
import { useLocalSearchParams } from "expo-router";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  getLatitudeDelta,
  getLongitudeDelta,
  isValidCoordinates,
  toNumber5DP,
} from "../../functions/map";
import * as Location from "expo-location";
import { LinkText } from "@/components/ui/link";
import { Button, ButtonText } from "@/components/ui/button";

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const MarkerComponent = (
  latNum: number,
  longNum: number,
  colour: string,
  emoji: string,
  key: string,
  title: string,
  description: string
) => {
  return (
    <Marker
      key={key}
      id={key}
      identifier={key}
      coordinate={{ latitude: latNum, longitude: longNum }}
      anchor={{ x: 0.5, y: 1 }}
    >
      <Callout
        tooltip={false}
        onPress={() => console.log("vieew more details???")}
      >
        <View
          style={{
            width: 300,
            padding: 10,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>{description}</Text>

          <Button onPress={() => console.log("reserve")}>
            <ButtonText>Reserve</ButtonText>
          </Button>
        </View>
      </Callout>

      <View
        style={[
          styles.customMarker,
          { borderColor: colour, backgroundColor: hexToRgba(colour, 0.5) },
        ]}
      >
        <Text style={styles.markerText}>{emoji}</Text>
      </View>
    </Marker>
  );
};

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.1; // standard starting delta (about 10km)
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function ReceiveScreen() {
  const [radius, setRadius] = useState<number>(500);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const latNum = useMemo(
    () => toNumber5DP(location?.coords.latitude ?? 0),
    [location]
  );
  const longNum = useMemo(
    () => toNumber5DP(location?.coords.longitude ?? 0),
    [location]
  );

  const mapRef = createRef<MapView | null>();
  const [itemArr, setItemArr] = useState<ItemSchema[]>([]);
  const initialItemsRef = useRef<ItemSchema[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    Object.values(Category)
  );

  useEffect(() => {
    // request perms
    const reqPerms = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    reqPerms(); // Call the async function
  }, []);

  useEffect(() => {
    if (isValidCoordinates(location) && mapRef.current) {
      // populate
      const ini = [
        {
          id: "1",
          title: "Coke",
          category: Category.FOOD_AND_DRINKS,
          condition: Condition.NEW,
          description: "I cannot finish",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.003, long: longNum + 0.003 },
        },
        {
          id: "2",
          title: "Books",
          category: Category.EDUCATION,
          condition: Condition.NEW,
          description: "It is too heavy to bring back",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.005, long: longNum + 0.005 },
        },
        {
          id: "3",
          title: "Monitor",
          category: Category.ELECTRONICS,
          condition: Condition.NEW,
          description: "Too bulky",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.001, long: longNum + 0.004 },
        },
        {
          id: "4",
          title: "Pasta",
          category: Category.FOOD_AND_DRINKS,
          condition: Condition.NEW,
          description: "Too much",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.003333, long: longNum - 0.013 },
        },
        {
          id: "5",
          title: "Old pants",
          category: Category.FASHION,
          condition: Condition.NEW,
          description: "Please upcycle",
          reserved: false,
          address: "",
          location: { lat: latNum - 0.005, long: longNum - 0.005 },
        },
        {
          id: "6",
          title: "bbbb",
          category: Category.FASHION,
          condition: Condition.NEW,
          description: "bbbb",
          reserved: false,
          address: "",
          location: { lat: latNum - 0.00999999999, long: longNum - 0.009 },
        },
        {
          id: "7",
          title: "Bread",
          category: Category.FOOD_AND_DRINKS,
          condition: Condition.NEW,
          description: "Bulk deal",
          reserved: false,
          address: "",
          location: { lat: latNum - 0.01231, long: longNum - 0.023123 },
        },
        {
          id: "8",
          title: "Old dictionary",
          category: Category.EDUCATION,
          condition: Condition.WELL_USED,
          description: "Chinese",
          reserved: false,
          address: "",
          location: { lat: latNum - 0.0085, long: longNum + 0.0095 },
        },
        {
          id: "9",
          title: "Old Gaming mouse",
          category: Category.ELECTRONICS,
          condition: Condition.NEW,
          description: "Works super well",
          reserved: false,
          address: "",
          location: { lat: latNum - 0.022921, long: longNum - 0.004 },
        },
        {
          id: "10",
          title: "Flowers",
          category: Category.OTHERS,
          condition: Condition.NEW,
          description: "I cannot have these plants anymore",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.0163, long: longNum + 0.003 },
        },
        {
          id: "11",
          title: "Chair",
          category: Category.FURNITURE,
          condition: Condition.NEW,
          description: "i am moving out",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.0011, long: longNum + 0.00545 },
        },
        {
          id: "12",
          title: "Peanut Butter",
          category: Category.FOOD_AND_DRINKS,
          condition: Condition.NEW,
          description: "I cannot finish this item",
          reserved: false,
          address: "",
          location: { lat: latNum + 0.005, long: longNum + 0.0007 },
        },
      ];

      // call for db for all items
      // optimise next time: pass in params as user scrolls for pagination type query
      initialItemsRef.current = ini; // permanent copy
      setItemArr(ini);

      mapRef.current.animateToRegion(
        {
          latitude: latNum,
          longitude: longNum,
          // reference from: https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        1000 // Animation duration in milliseconds
      );
    }
  }, [location]);

  //   useEffect(() => {
  //     console.log(itemArr);
  //   }, [itemArr]);

  const onSearch = (str: string) => {
    if (!str.trim()) {
      setItemArr(initialItemsRef.current);
      return;
    }


    // const strUpperCase = str.toUpperCase();
    // const filteredItems = initialItemsRef.current.filter((item) =>
    //   item.title.toUpperCase().includes(strUpperCase)
    // );

    // setItemArr(() => filteredItems);
  };

  const onFilter = (category: Category) => {
    // const newSelected = selectedCategories.includes(category)
    //   ? selectedCategories.filter((c) => c !== category)
    //   : [...selectedCategories, category];

    const newCat = (prev: Category[]) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    };

    setSelectedCategories((prev) => newCat(prev));
    setItemArr((prev) => {
      const filteredItems = initialItemsRef.current.filter((item) =>
        newCat(selectedCategories).includes(item.category)
      );
      return filteredItems;
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latNum,
          longitude: longNum,
          // reference from: https://stackoverflow.com/questions/36685372/how-to-zoom-in-out-in-react-native-map/36688156#36688156
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation
        showsMyLocationButton
        style={styles.map}
      >
        {itemArr.map((marker, index) =>
          /*<Marker
            key={marker.id}
            id={marker.id}
            identifier={marker.id}
            pinColor={CategoryColour[marker.category]}
            icon={ CategoryEmoji[marker.category]}
            coordinate={{
              latitude: marker.location.lat,
              longitude: marker.location.long,
            }}
            title={marker.title}
            description={marker.description}
            //anchor={{ x: 0.5, y: 1 }}
          />*/
          MarkerComponent(
            marker.location.lat,
            marker.location.long,
            CategoryColour[marker.category],
            CategoryEmoji[marker.category],
            marker.id,
            marker.title,
            marker.description
          )
        )}

        {/* this is your location */}
        {/* <Marker
          key={`user_location-${latNum}-${longNum}`}
          coordinate={{ latitude: latNum, longitude: longNum }}
          title={"This is your location"}
          anchor={{ x: 0.5, y: 1 }}
        >
          <View style={styles.customMarker}>
            <Text style={styles.markerText}>🧑🏻</Text>
          </View>
        </Marker> */}

        {/* who is within me */}
        <Circle
          center={{ latitude: latNum, longitude: longNum }}
          radius={radius} // in m
          strokeColor="rgb(100, 100, 100)"
          strokeWidth={3}
          fillColor="rgba(192, 192, 192, 0.3)"
        />
      </MapView>
      <SearchBar onSearch={onSearch} />
      <Center className="flex flex-row gap-5 h-[150px] absolute top-28 left-5 right-5">
        <Slider
          defaultValue={1000}
          minValue={500}
          maxValue={2000}
          size="md"
          orientation="horizontal"
          isDisabled={false}
          isReversed={false}
          onChange={(value) => setRadius(value)}
          step={100}
          className="w-[70%]"
        >
          <SliderTrack>
            <SliderFilledTrack className="bg-[#646464]" />
          </SliderTrack>
          <SliderThumb className="bg-[#646464]" />
        </Slider>
        <Text className="text-[#646464] text-xl font-bold">{radius}m</Text>
      </Center>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="absolute top-[210] left-5 right-5 h-fit"
      >
        {/* <Text className="text-lg text-black font-bold">Categories:</Text> */}
        <HStack space="md">
          {Object.values(Category).map((category) => (
            <Box
              key={category}
              className="p-3 rounded-full"
              style={{
                backgroundColor: selectedCategories.includes(category)
                  ? CategoryColour[category]
                  : "white",
                paddingHorizontal: 16, // horizontal padding for pill shape
                paddingVertical: 8, // vertical padding
                borderRadius: 999, // large radius makes it fully rounded
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: selectedCategories.includes(category)
                  ? "white"
                  : CategoryColour[category],
              }}
            >
              <Text
                style={{
                  color: selectedCategories.includes(category)
                    ? "white"
                    : CategoryColour[category],
                  fontWeight: "bold",
                }}
                onPress={() => {
                  onFilter(category);
                }}
              >
                {category}
              </Text>
            </Box>
          ))}
        </HStack>
      </ScrollView>

      {!!errorMsg && (
        <Center className="gap-2 absolute bottom-28 left-5 right-5 bg-white p-5 rounded-lg">
          <Text>{errorMsg}</Text>
          <TouchableOpacity onPress={() => Linking.openSettings()}>
            <LinkText>Go to settings to enable</LinkText>
          </TouchableOpacity>
        </Center>
      )}
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
  customMarker: {
    backgroundColor: "#fafafa",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
