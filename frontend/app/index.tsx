// app/index.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import * as Location from "expo-location";

export default function IndexScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  // get current permissions to access location here, for child page
  const handleLogin = () => {
    getCurrentLocationAndProceed();
  };

  async function getCurrentLocationAndProceed() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);
    router.push("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Center className="flex-1">
        <VStack className="w-full max-w-sm px-6 gap-8 items-center">
          <VStack className="gap-2 items-center">
            <Text className="text-3xl font-bold text-gray-900">Welcome</Text>
            <Text className="text-lg text-gray-600 text-center">
              Share food, reduce waste, build community
            </Text>
          </VStack>

          <Text>{location?.coords.latitude ?? ""} </Text>

          <Text> {location?.coords.longitude ?? ""}</Text>

          <Button
            size="lg"
            className="w-full bg-blue-600 rounded-xl 
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
  hover:bg-blue-700 disabled:hover:bg-gray-300
  "
            onPress={handleLogin}
            disabled={!!errorMsg}
          >
            <Text className="text-white">Login</Text>
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
