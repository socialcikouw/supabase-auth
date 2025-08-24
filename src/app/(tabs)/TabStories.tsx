import React from "react";
import { Text, View } from "react-native";
import { commonStyles } from "../../lib/styles/common";

export default function StoriesScreen() {
  return (
    <View style={[commonStyles.centeredContainer, commonStyles.title]}>
      <Text>Stories</Text>
    </View>
  );
}
