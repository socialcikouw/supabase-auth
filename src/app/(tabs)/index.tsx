import NasabahList from "@/src/components/cards/NasabahList";
import HeaderDashboard from "@/src/components/shared/HeaderDashboard";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderDashboard />
      <NasabahList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
