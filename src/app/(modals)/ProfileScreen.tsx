import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        gap: 5,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Nama: {user?.user_metadata.display_name}
      </Text>
      <Text style={{ fontSize: 14, color: "gray" }}>Email: {user?.email}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>User ID: {user?.id}</Text>

      <TouchableOpacity
        onPress={signOut}
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 15,
          margin: 15,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Keluar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
