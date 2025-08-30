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
import { createRef, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { toNumber5DP } from "../../functions/map";

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
  const { lat, long } = useLocalSearchParams<{ lat: string; long: string }>();
  const latNum = toNumber5DP(lat);
  const longNum = toNumber5DP(long);

  const mapRef = createRef<MapView | null>();
  const [itemArr, setItemArr] = useState<ItemSchema[]>([]);
  const initialItemsRef = useRef<ItemSchema[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const ini = [
      {
        id: "1",
        title: "hihi",
        category: Category.FOOD_AND_DRINKS,
        condition: Condition.NEW,
        description: "hihi",
        reserved: false,
        address: "",
        location: { lat: latNum + 0.003, long: longNum + 0.003 },
      },
      {
        id: "2",
        title: "aaaaa",
        category: Category.EDUCATION,
        condition: Condition.NEW,
        description: "aaaa",
        reserved: false,
        address: "",
        location: { lat: latNum + 0.005, long: longNum + 0.005 },
      },
      {
        id: "3",
        title: "bbbb",
        category: Category.ELECTRONICS,
        condition: Condition.NEW,
        description: "bbbb",
        reserved: false,
        address: "",
        location: { lat: latNum + 0.001, long: longNum + 0.004 },
      },
    ];

    // call for db for all items
    // optimise next time: pass in params as user scrolls for pagination type query
    initialItemsRef.current = ini; // permanent copy
    setItemArr(ini);
  }, [latNum, longNum]);

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
        className="absolute top-[220] left-5 right-5 h-fit"
      >
        {/* <Text className="text-lg text-black font-bold">Categories:</Text> */}
        <HStack space="md">
          {Object.values(Category).map((category) => (
            <Box
              key={category}
              className="p-3 rounded-full"
              style={{
                backgroundColor: CategoryColour[category],
                paddingHorizontal: 16, // horizontal padding for pill shape
                paddingVertical: 8, // vertical padding
                borderRadius: 999, // large radius makes it fully rounded
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                className="text-white font-bold"
                onPress={() => onFilter(category)}
              >
                {category}
              </Text>
            </Box>
          ))}
        </HStack>
      </ScrollView>
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
