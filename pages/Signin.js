import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SignInFormValidation } from "../utils/Validate";
import { Entypo } from "@expo/vector-icons";
import { login } from "../utils/Authentication";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addUser } from "../store/signinSlice";
import LoadingOverlay from "../components/LoadingOverlay";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);

  const SignInHandler = async () => {

    const NotValid = SignInFormValidation(email, contact);
    if (!agree) {
      Alert.alert("Please check the terms and condition box");
    } else {
      if (NotValid) {
        setError(NotValid);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        const length = contact.length;
        const contact_length = length - 10;
        const contactNumber = contact.slice(contact_length);
        const countryCode = contact.slice(0, contact_length);

        setSearching(true);
        try {
          console.log(email)
          console.log(contactNumber)
          console.log(countryCode)
          const User = await login(email, contactNumber, countryCode);
          console.log("User response ",User)
          if (User) {
            dispatch(addUser({ email, contactNumber, countryCode }));
            navigation.replace("Verification");
          }
        } catch (error) {
          Alert.alert("Error", "Invalid credential. Please try again later.", [
            { text: "OK"},
          ]);
        } finally {
          setSearching(false);
        }
      }
    }
  };

  const ToggleAgree = () => {
    setAgree(!agree);
  };
  
  if(searching) return <LoadingOverlay message="Searching user"/>

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Bharat}>BHARAT</Text>
        <Text style={styles.Learn}>LEARN</Text>
      </View>
      <Text style={styles.Title}>अब सीखेगा भारत</Text>

      <View style={styles.FormContainer}>
        <Text style={styles.SignInText}>Sign In</Text>
        <View>
          <Text style={styles.EmailText}>Email Id</Text>
          <TextInput
            placeholderTextColor="#ede8e8"
            placeholder="Enter your email"
            style={styles.InputEmail}
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.EmailText}>Phone Number</Text>
          <TextInput
            placeholderTextColor="#ede8e8"
            placeholder="+91 7999999999"
            style={styles.InputEmail}
            value={contact}
            onChangeText={setContact}
          ></TextInput>
        </View>
        {error && <Text style={styles.Error}>{error}</Text>}

        <Pressable onPress={SignInHandler} style={styles.PressableButton}>
          <Text style={styles.ButtonText}>Sign In</Text>
        </Pressable>
        <View style={styles.SignupLinkContainer}>
          <Pressable onPress={ToggleAgree} style={{ paddingHorizontal: 5 }}>
            {!agree ? (
              <Entypo name="circle" size={22} color="gray" />
            ) : (
              <Entypo name="controller-record" size={28} color="gray" />
            )}
          </Pressable>

          <Text style={{ fontSize: 18 }}>
            By signing up, you agree to the{" "}
            <Text style={{ fontWeight: "bold" }}>Terms of Service</Text> and{" "}
            <Text style={{ fontWeight: "bold" }}>Privacy Policy</Text>{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fD872E",
    height: "100%",
    alignItems: "center",
  },
  Header: {
    marginTop: 80,
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 1.5,
    width: "55%",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Bharat: {
    backgroundColor: "#ffffff",
    fontSize: 22,
    color: "#fD872E",
    padding: 5,
    fontWeight: "500",
    letterSpacing: 2,
  },
  Learn: {
    fontSize: 25,
    color: "#ffffff",
    padding: 5,
    fontWeight: "bold",
    letterSpacing: 2,
    fontWeight: "600",
  },
  Title: {
    fontSize: 20,
    color: "#ffffff",
    paddingTop: 8,
  },
  FormContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: "100%",
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 25,
    marginTop: 10,
    fontWeight: "600",
  },
  InputEmail: {
    borderColor: "#eae3e3",
    borderWidth: 2,
    padding: 12,
    fontSize: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  EmailText: {
    fontSize: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    fontWeight: "500",
    marginTop: 30,
  },
  PressableButton: {
    backgroundColor: "#fd872e",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 25,
  },
  ButtonText: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  SignupLinkContainer: {
    flexDirection: "row",
    paddingRight: 10,
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
  Error: {
    color: "red",
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 10,
    fontWeight: "600",
  },
});
