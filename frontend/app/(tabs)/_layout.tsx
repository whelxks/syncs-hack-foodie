import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false, // hide default labels, we’ll add custom ones
        tabBarStyle: {
          height: 85, // make room for icons + labels
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
      {/* LEFT TAB → Give */}
      <Tabs.Screen
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
          ),
        }}
      />

      {/* MIDDLE TAB → Profile */}
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

      {/* RIGHT TAB → Receive */}
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="hands"
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
                Receive
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}




