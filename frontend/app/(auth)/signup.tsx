import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useUser } from "@/context/userContext";
import { Redirect } from "expo-router";

const Signup: React.FC = () => {
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const {
    loading: userLoading,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
  } = useUser();

  if (!userLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = async () => {
    setLoading(true);

    let valid = true;
    let errors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };

    if (!firstname.trim()) {
      errors.firstname = "First Name is required.";
      valid = false;
    }
    if (!lastname.trim()) {
      errors.lastname = "Last Name is required.";
      valid = false;
    }
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      const data = {
        firstname,
        lastname,
        email,
        password,
      };
      axios
        .post("http://192.168.100.23:3000/auth/register", { data })
        .then((response) => {
          console.log(response.data.message);
          SecureStore.setItemAsync("isLoggedIn", "true");
          SecureStore.setItemAsync("token", response.data.token);
          setUser(response.data.user);
          setIsLoggedIn(true);
          router.push("/home");
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error:", error.response.data.error);
            alert(error.response.data.error);
          } else if (error.request) {
            console.log("Request Error:", error.request);
            alert("No response from server. Please try again later.");
          } else {
            console.log("General Error:", error.message);
            alert("An unexpected error occurred.");
          }
        });

      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mt-12">
          <Text className="text-4xl font-bold pb-3 w-full">Sign Up</Text>
        </View>
        <View className="mt-5">
          <TextInput
            onChangeText={setFirstName}
            placeholder={"First Name"}
            placeholderTextColor={"#000000"}
            value={firstname}
            className="bg-slate-100 shadow-sm text-black rounded-lg py-5 px-5"
          />
          {errors.firstname ? (
            <Text className="text-red-500 text-xs font-semibold ml-0.5 mt-1.5">
              {errors.firstname}
            </Text>
          ) : null}
          <TextInput
            onChangeText={setLastname}
            placeholder={"Last Name"}
            placeholderTextColor={"#000000"}
            value={lastname}
            className="bg-slate-100 shadow-sm text-black mt-3 rounded-lg py-5 px-5"
          />
          {errors.lastname ? (
            <Text className="text-red-500 text-xs font-semibold ml-0.5 mt-1.5">
              {errors.lastname}
            </Text>
          ) : null}
          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder={"Email"}
            placeholderTextColor={"#000000"}
            value={email}
            className="bg-slate-100 shadow-sm text-black mt-3 rounded-lg py-5 px-5"
          />
          {errors.email ? (
            <Text className="text-red-500 text-xs font-semibold ml-0.5 mt-1.5">
              {errors.email}
            </Text>
          ) : null}
          <TextInput
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder={"Password"}
            placeholderTextColor={"#000000"}
            value={password}
            className="bg-slate-100 shadow-sm text-black mt-3 rounded-lg py-5 px-5"
          />
          {errors.password ? (
            <Text className="text-red-500 text-xs font-semibold ml-0.5 mt-1.5">
              {errors.password}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          className="bg-blue-600 items-center justify-center p-5 w-full rounded-lg mt-6"
          onPress={handleSignup}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffff" />
          ) : (
            <Text className="text-white font-bold">Sign Up</Text>
          )}
        </TouchableOpacity>
        <View className="mt-8 flex flex-row items-center justify-center">
          <Text className="text-black">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signin")}>
            <Text className="font-extrabold text-blue-600 ml-1">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
