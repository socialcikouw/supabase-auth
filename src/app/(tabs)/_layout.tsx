import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const sizeIcon = 26;
  const fontSize = 11;
  const fontWeight = "600";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#000",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderBottomColor: "#e0e0e0",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          paddingBottom: Platform.OS === "ios" ? 25 : 12,
          paddingTop: 8,
          paddingHorizontal: 15,
          shadowColor: "#2196F3",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: fontSize,
          fontWeight: fontWeight,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Nasabah",
          headerTitle: "Supabase-Auth",
          headerShown: false,
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account-group" : "account-group-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/ProfileScreen")}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="person-circle" size={28} color={"#2196F3"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="TabMenu"
        options={{
          title: "Menu",
          headerTitle: "Menu Utama",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "menu" : "menu-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="TabTambah"
        options={{
          title: "Tambah",
          headerTitle: "Tambah",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="TabStories"
        options={{
          title: "Stories",
          headerTitle: "Stories",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#2196F3",
          },
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              color={color}
              size={sizeIcon}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    position: "absolute",
    top: -25,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 10,
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonFocused: {
    backgroundColor: "#2196F3",
  },
});
