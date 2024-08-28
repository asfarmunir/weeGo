import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useUser } from "@/context/userContext";

export function CustomDrawerContent(props: any) {
  const { setUser, setIsLoggedIn, user } = useUser();
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

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
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 px-4">
        {/* User Profile */}
        <View className="items-center mt-6 mb-4">
          {user ? (
            <>
              <Image
                source={{ uri: "https://via.placeholder.com/150" }}
                className="w-24 h-24 rounded-full"
              />
              <Text className="mt-2 text-lg font-semibold">
                {user.firstname}
              </Text>
              <Text className="text-sm text-gray-500">{user.email}</Text>
            </>
          ) : (
            <Text className="mt-2 text-lg font-semibold">Guest</Text>
          )}
        </View>

        {/* Drawer Links */}
        <View className="mt-4 flex-1">
          <DrawerItemList {...props} />
        </View>

        {/* Logout Button */}
        <View
          className="mb-4"
          style={{
            marginBottom: bottom,
          }}
        >
          <TouchableOpacity
            className="bg-red-500 py-3 px-4 rounded-lg items-center"
            onPress={handleLogout}
          >
            <Text className="text-white text-lg font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

// Drawer navigator setup
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./home";
import NotificationsScreen from "./explore";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
      <StatusBar style="dark" />
    </>
  );
}
