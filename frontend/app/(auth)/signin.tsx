import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome";
import { useUser } from "@/context/userContext";
import { Redirect } from "expo-router";
const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("asfar@gmail.com");
  const [password, setPassword] = useState<string>("asfarasfar");
  const [loading, setLoading] = useState<boolean>(false);
  const [validation, setValidation] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const {
    loading: userLoading,
    isLoggedIn,
    setUser,
    setIsLoggedIn,
  } = useUser();

  if (!userLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = async () => {
    let valid = true;
    setValidation(null);
    let errors = {
      email: "",
      password: "",
    };

    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(errors);

    // if (valid) {
    //   setLoading(true);

    //   axios
    //     .post("http://192.168.100.23:3000/auth/login", {
    //       email,
    //       password,
    //     })
    //     .then((res) => {
    //       console.log(res.data);
    //       SecureStore.setItemAsync("token", res.data.token);
    //       let result = SecureStore.getItemAsync("token");
    //       console.log("🚀 ~ .then ~ result:", result);

    //       setLoading(false);
    //       // router.push("/home");
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //       setValidation(err.response.data.error);
    //       setLoading(false);
    //     });
    // }
    if (valid) {
      setLoading(true);

      try {
        const res = await axios.post("http://192.168.100.23:3000/auth/login", {
          email,
          password,
        });

        console.log(res.data);

        await SecureStore.setItemAsync("token", res.data.token);
        await SecureStore.setItemAsync("isLoggedIn", "true");
        setUser(res.data.user);
        setIsLoggedIn(true);
        router.push("/");
      } catch (err: any) {
        if (err.response && err.response.data) {
          console.log(err.response.data);
          setValidation(err.response.data.error);
        } else {
          console.log(err);
          setValidation("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mt-12">
          <Text className="text-4xl font-bold pb-3 w-full">Sign In</Text>
        </View>
        <View className="mt-5">
          <TextInput
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder={"Email"}
            placeholderTextColor={"#000000"}
            defaultValue="asfar@gmail.com"
            value={email}
            className="bg-slate-100 shadow-sm text-black mt-4 rounded-lg py-5 px-5"
          />
          {errors.email ? (
            <Text className="text-red-500 font-semibold ml-0.5 mt-2">
              {errors.email}
            </Text>
          ) : null}

          <View className="flex flex-row items-center shadow-sm rounded-lg pr-3 mt-4 bg-slate-100 justify-between">
            <TextInput
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              placeholder={"Password"}
              placeholderTextColor={"#000000"}
              defaultValue="asfarasfar"
              value={password}
              className="  text-black flex-grow  py-5 px-5"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Icon name="eye-slash" size={20} color="gray" />
              ) : (
                <Icon name="eye" size={20} color="gray" />
              )}
            </TouchableOpacity>
          </View>
          {/* 
          <TextInput
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder={"Password"}
            placeholderTextColor={"#000000"}
            value={password}
            className="bg-slate-100 shadow-sm text-black mt-4 rounded-lg py-5 px-5"
          /> */}

          {errors.password ? (
            <Text className="text-red-500 font-semibold ml-0.5 mt-2">
              {errors.password}
            </Text>
          ) : null}
          {validation && (
            <Text className="text-red-500 font-semibold ml-0.5 mt-2">
              {validation}
            </Text>
          )}
        </View>
        <TouchableOpacity
          className="bg-blue-600 items-center justify-center p-5 w-full rounded-lg mt-6"
          onPress={handleSignup}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffff" />
          ) : (
            <Text className="text-white font-bold">Sign In</Text>
          )}
        </TouchableOpacity>
        <View className="mt-8 flex flex-row items-center justify-center">
          <Text className="text-black">New to weeGo?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text className="font-extrabold text-blue-600 ml-1">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
