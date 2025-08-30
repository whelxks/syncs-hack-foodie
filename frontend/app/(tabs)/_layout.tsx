import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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




