import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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
      {/* Give */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, size }: { focused: boolean; size: number }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name={focused ? 'heart' : 'heart-outline'}
                size={(size ?? 28) + 6}
                className="text-foodie-y-500"
              />
              <Text
                className={`mt-1 text-xs ${focused ? 'font-bold text-foodie-y-500' : 'font-medium text-foodie-y-500'}`}
              >
                Give
              </Text>
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size }: { focused: boolean; size: number }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={(size ?? 28) + 6}
                className="text-foodie-y-500"
              />
              <Text
                className={`mt-1 text-xs ${focused ? 'font-bold text-foodie-y-500' : 'font-medium text-foodie-y-500'}`}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />

      {/* Receive */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused, size }: { focused: boolean; size: number }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="hands"
                size={(size ?? 28) + 6}
                className="text-foodie-y-500"
              />
              <Text
                className={`mt-1 text-xs ${focused ? 'font-bold text-foodie-y-500' : 'font-medium text-foodie-y-500'}`}
              >
                Receive
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}









