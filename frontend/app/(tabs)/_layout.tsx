import { Tabs } from "expo-router";
import React from "react";
import { View, Text, Platform } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HapticTab } from "@/components/react-native/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E1A200",
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          paddingBottom: 10,
          // ...Platform.select({
          //   ios: { position: 'absolute' },
          //   default: {},
          // }),
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -3, // shadow above the tab bar
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5, // Android shadow
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="receive"
        options={{
          title: "Receive",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />

      {/*Profile*/}
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#FEF7E6",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 5,

                // marginBottom: 20, // "float" effect
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Ionicons name="person" size={28} color={color} />
            </View>
          ),
        }}
      />

      {/*Receive*/}
      <Tabs.Screen
        name="give"
        options={{
          title: "Give",
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => (
            <View>
              <Ionicons
                // name={focused ? 'person' : 'person-outline'}
                name="gift"
                size={28}
                color={color}
                style={{
                  paddingBottom: 3,
                }}
              />
            </View>
          ),
        }}

        // tabBarIcon: ({ color }) => (
        //   <IconSymbol size={28} name="paperplane.fill" color={color} />
        // ),
        // }}
      />
    </Tabs>
  );
}
