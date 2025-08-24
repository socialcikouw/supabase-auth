import MenuCard from "@/src/components/cards/MenuCard";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function TabMenu() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <MenuCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
