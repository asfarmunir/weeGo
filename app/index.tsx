import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
const index = () => {
  const handlePress = () => {
    router.push("/signup");
  };
  return (
    <SafeAreaView className=" ">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className=" w-full items-center justify-center h-full p-5">
          <Text className=" text-3xl font-bold">weeGo</Text>
          <Text className=" text-xl">sharing Ride, saving Miles</Text>
          <TouchableOpacity
            onPress={handlePress}
            className=" bg-blue-600 my-7  items-center justify-center  p-4 w-full rounded-lg"
          >
            <Text className=" text-white text-lg font-semibold tracking-wide capitalize">
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
