import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import { theme } from "@/src/lib/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderDashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Selamat Bergabung di Koplin,</Text>
        <Text style={styles.user}>
          {user?.user_metadata?.display_name || "User"} 👋🏻
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/ProfileScreen")}
        style={{ position: "absolute", right: 16 }}
      >
        <Ionicons name="person-circle" size={28} color={"#2196F3"} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 16,
    position: "relative",
  },
  header: {
    flexDirection: "column",
    gap: 2,
  },
  text: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.gray[500],
  },
  user: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary,
  },
});
