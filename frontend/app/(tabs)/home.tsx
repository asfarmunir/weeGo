import React, { useEffect, useCallback } from "react";
import { BackHandler, Alert, Platform, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/context/userContext";
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useUser(); // Ensure you have these functions in your context to update the state

  const handleLogout = async () => {
    try {
      // Clear secure storage
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("isLoggedIn");
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <View className="flex h-screen items-center justify-center">
      <Text className="text-2xl bg-sky-600">Home Screen</Text>
      <Link href="/signup" className="text-blue-600">
        Go to Sign In
      </Link>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-blue-500 p-2 px-5 rounded-md mt-4"
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
