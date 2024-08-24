import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = () => {
    let valid = true;
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

    if (valid) {
      // Handle the signup logic here
      // Reset form fields
      setEmail("");
      setPassword("");

      // Navigate to the login screen or another screen after successful signup
      // router.push("/signin");
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
            value={email}
            className="bg-slate-100 shadow-sm text-black mt-4 rounded-lg py-5 px-5"
          />
          {errors.email ? (
            <Text className="text-red-500 mt-1">{errors.email}</Text>
          ) : null}
          <TextInput
            secureTextEntry={true}
            onChangeText={setPassword}
            placeholder={"Password"}
            placeholderTextColor={"#000000"}
            value={password}
            className="bg-slate-100 shadow-sm text-black mt-4 rounded-lg py-5 px-5"
          />
          {errors.password ? (
            <Text className="text-red-500 mt-1">{errors.password}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          className="bg-blue-600 items-center justify-center p-5 w-full rounded-lg mt-6"
          onPress={handleSignup}
        >
          <Text className="text-white font-bold">Sign In</Text>
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
