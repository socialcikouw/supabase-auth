import { useAuth } from "@/src/lib/contexts/auth/AuthContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientButton from "../../components/common/GradientButton";
import { commonStyles } from "../../lib/styles/common";
import { theme } from "../../lib/styles/theme";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <View style={[commonStyles.container, commonStyles.paddedContainer]}>
      <View style={commonStyles.card}>
        <Text style={styles.profileItem}>
          Nama: {user?.user_metadata.display_name}
        </Text>
        <Text style={styles.profileEmail}>Email: {user?.email}</Text>
        <Text style={styles.profileId}>User ID: {user?.id}</Text>

        <GradientButton
          title="Keluar"
          icon="log-out"
          gradient={[theme.colors.error, "#dc2626"]}
          onPress={signOut}
          style={{ marginTop: theme.spacing.xl }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileItem: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.xs,
  },
  profileEmail: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    marginBottom: theme.spacing.xs,
  },
  profileId: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.gray[300],
    marginBottom: theme.spacing.lg,
  },
});
