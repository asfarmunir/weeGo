import React, { useEffect, useCallback } from "react";
import { BackHandler, Alert, Platform, View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const HomeScreen: React.FC = () => {
  // const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       if (Platform.OS === "android") {
  //         Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
  //           {
  //             text: "Cancel",
  //             onPress: () => null,
  //             style: "cancel",
  //           },
  //           { text: "YES", onPress: () => BackHandler.exitApp() },
  //         ]);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //   }, [])
  // );

  // useEffect(() => {
  //   if (Platform.OS === "ios") {
  //     const beforeRemoveListener = navigation.addListener(
  //       "beforeRemove",
  //       (e) => {
  //         e.preventDefault();
  //         // You can show a custom alert here or any other logic
  //         Alert.alert(
  //           "Hold on!",
  //           "Are you sure you want to go back?",
  //           [
  //             {
  //               text: "Cancel",
  //               style: "cancel",
  //               onPress: () => {},
  //             },
  //             {
  //               text: "YES",
  //               onPress: () => navigation.dispatch(e.data.action),
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       }
  //     );

  //     return () => {
  //       navigation.removeListener("beforeRemove", beforeRemoveListener);
  //     };
  //   }
  // }, [navigation]);

  return (
    <View className="flex  h-screen items-center justify-center">
      <Text className="text-2xl bg-sky-600 ">Home Screen</Text>
      <Link href="/signup" className="text-blue-600">
        Go to Sign In
      </Link>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
