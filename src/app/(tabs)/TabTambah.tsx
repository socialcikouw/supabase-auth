import TombolDrop from "@/src/components/common/TombolDrop";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../../lib/styles/common";

export default function AddScreen() {
  const handleNasabahBaru = () => {
    router.push("/NasabahBaruFormScreen");
  };

  const handleNasabah = () => {
    router.push("/NasabahForm");
  };
  return (
    <View style={commonStyles.centeredContainer}>
      <TombolDrop />

      <TouchableOpacity onPress={handleNasabahBaru}>
        <Text style={styles.nasabahBaru}> Form Nasabah Baru</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNasabah}>
        <Text style={styles.nasabah}> Form Nasabah</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/NasabahBaru")}>
        <Text style={styles.nasabahBaru}> Detail Nasabah Baru</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Nasabah")}>
        <Text style={styles.nasabah}> Detail Nasabah</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nasabahBaru: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  nasabah: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
});
