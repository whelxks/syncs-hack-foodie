import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  // get current permissions to access location here, for child page
  const handleLogin = () => {
    router.push({
      pathname: "/(tabs)",
      // params: {
      //   lat: location?.coords.latitude?.toString(), // must pass as string
      //   long: location?.coords.longitude?.toString(), // must pass as string
      // },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Center className="flex-1">
        <VStack className="w-full max-w-sm px-6 gap-8 items-center">
          <VStack className="gap-2 items-center">
            <Text className="text-3xl font-bold text-foodie-y-800">
              Welcome
            </Text>
            <Text className="text-lg text-gray-600 text-center">
              Share items, reduce waste, build your community
            </Text>
          </VStack>

          <Text className="text-8xl p-3 items-center justify-center animate-wave">
            👋
          </Text>

          {/* <Text>{location?.coords.latitude ?? ""} </Text>
          <Text> {location?.coords.longitude ?? ""}</Text> */}

          {/* <GoogleSignIn /> */}

          <Button
            size="lg"
            className="w-full bg-foodie-y-600 rounded-xl 
            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
  hover:bg-blue-700 disabled:hover:bg-gray-300
  "
            onPress={handleLogin}
            // disabled={!!errorMsg}
          >
            <ButtonText>Login</ButtonText>
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
