import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from "@/components/react-native/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#AF7E00",
        headerShown: false,
        tabBarShowLabel: false, 
        tabBarStyle: {
          height: 85,
          paddingTop: 8,
          paddingBottom: 6,
          ...Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      {/*Give*/}
      {/* <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={(size ?? 28) + 6}
                color={color as string}
              />
              <Text
                style={{
                  color,
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: focused ? '700' : '500',
                }}
              >
                Give
              </Text>
            </View>
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            paddingTop: 8,
            height: 90,
          },
          default: {
            paddingTop: 20,
          },
        }),
        sceneStyle: {
          flex: 1,
          // height: "100%",
          // paddingHorizontal: 20,
          // paddingTop: 20,
        },
      }}
    > */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Receive",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />

      {/*Profile*/}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={(size ?? 28) + 6}
                color={color as string}
              />
              <Text
                style={{
                  color,
                  fontSize: 12,
                  marginTop: 4,
                  fontWeight: focused ? '700' : '500',
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />

      {/*Receive*/}
      <Tabs.Screen
        name="give"
        options={{
          // tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
          //   <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          //     <FontAwesome5
          //       name="hands"
          //       size={(size ?? 28) + 6}
          //       color={color as string}
          //     />
          //     <Text
          //       style={{
          //         color,
          //         fontSize: 12,
          //         marginTop: 4,
          //         fontWeight: focused ? '700' : '500',
          //       }}
          //     >
          //       Receive
          //     </Text>
          //   </View>

          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}




