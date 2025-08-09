import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Selamat Bergabung {user?.user_metadata.display_name}</Text>
    </View>
  );
}
