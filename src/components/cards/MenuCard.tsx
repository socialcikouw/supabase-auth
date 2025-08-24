import {
  menuGroups,
  MenuGroupType,
  MenuItemType,
} from "@/src/lib/config/menuItem";
import { theme } from "@/src/lib/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuCardItemProps {
  item: MenuItemType;
  index: number;
  isLast: boolean;
}

interface MenuGroupProps {
  group: MenuGroupType;
  isLastGroup: boolean;
}

function MenuCardItem({ item, index, isLast }: MenuCardItemProps) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, !isLast && styles.menuItemBorder]}
      onPress={item.onPress}
      activeOpacity={0.6}
    >
      <View style={styles.menuContent}>
        <View style={[styles.iconContainer, { backgroundColor: item.warna }]}>
          <Ionicons name={item.ikon} size={24} color={theme.colors.white} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.judul}>{item.judul}</Text>
          <Text style={styles.deskripsi}>{item.deskripsi}</Text>
        </View>

        <View style={styles.chevronContainer}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.gray[300]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function MenuGroup({ group, isLastGroup }: MenuGroupProps) {
  return (
    <View style={[styles.groupContainer, !isLastGroup && styles.groupMargin]}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{group.groupTitle}</Text>
      </View>

      <View style={styles.menuContainer}>
        {group.items.map((item, index) => (
          <MenuCardItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === group.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function MenuCard() {
  return (
    <View style={styles.container}>
      {menuGroups.map((group, index) => (
        <MenuGroup
          key={group.id}
          group={group}
          isLastGroup={index === menuGroups.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
    paddingHorizontal: theme.spacing.lg,
  },

  groupContainer: {
    marginTop: theme.spacing.lg,
  },

  groupMargin: {
    marginBottom: theme.spacing.md,
  },

  groupHeader: {
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },

  groupTitle: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.gray[400],
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  menuContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    ...theme.shadows.sm,
  },

  menuItem: {
    backgroundColor: theme.colors.white,
  },

  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },

  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  judul: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.gray[500],
    marginBottom: theme.spacing.xs,
  },

  deskripsi: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    lineHeight: 18,
  },

  chevronContainer: {
    marginLeft: theme.spacing.sm,
  },
});
