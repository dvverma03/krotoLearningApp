import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

export default function SignUp() {
  const [agree, setAgree]= useState(false)
  const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const ToggleAgree=()=>{
    setAgree(!agree)
  }

  async function SignUpUser() {
    const errMessage = SignupFormValidation(email, password);

    if (errMessage) {
      Alert.alert("Invalid Credentials", errMessage, [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ]);
    } else {
      setCreating(true);
      try {
        const user = await CreateUser(email, password);
        dispatch(addUser(user))
      } catch (error) {
        Alert.alert("Error", "Invalid credential. Please try again later.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } finally {
        setCreating(false);
      }
    }
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Bharat}>BHARAT</Text>
        <Text style={styles.Learn}>LEARN</Text>
      </View>
      <Text style={styles.Title}>अब सीखेगा भारत</Text>
      <ScrollView>

      <View style={styles.FormContainer}>
        <View>
          <AntDesign style={{marginLeft:10, marginTop:10}} name="arrowleft" size={30} color="black" />
        </View>
        <Text style={styles.SignInText}>Sign Up</Text>
        <View>
          <Text style={styles.EmailText}>Email Id</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.InputEmail}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.EmailText}>Phone Number</Text>
          <TextInput
            placeholder="+91 7999999999"
            style={styles.InputEmail}
            value={contact}
            onChangeText={setContact}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.EmailText}>Password</Text>
          <TextInput
            placeholder="* * * * * * * * *"
            value={password}
              onChangeText={setPassword}
            style={styles.InputEmail}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.EmailText}>Confirm Password</Text>
          <TextInput
            placeholder="* * * * * * * * *"
            value={confirmPassword}
              onChangeText={setConfirmPassword}
            style={styles.InputEmail}
          ></TextInput>
        </View>
        <Pressable onPress={SignUpUser} style={styles.PressableButton}>
          <Text style={styles.ButtonText}>Sign In</Text>
        </Pressable>
        <View style={styles.SignupLinkContainer}>
          <Pressable onPress={ToggleAgree} style={{paddingHorizontal:5}}>

          {agree ? <Entypo name="circle" size={22} color="gray" />:<Entypo name="controller-record" size={28} color="gray" />}
          </Pressable>
        
          <Text style={{ fontSize: 18 }}>By signing up, you agree to the terms of Service and Privacy policy </Text>
         
        </View>
      </View>
      </ScrollView>
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
    marginTop: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 22,
    marginTop: 10,
    fontWeight: "600",
  },
  InputEmail: {
    borderColor: "#eae3e3",
    borderWidth: 2,
    padding: 8,
    fontSize: 18,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  EmailText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 10,
    fontWeight: "500",
    marginTop: 10,
  },
  PressableButton: {
    backgroundColor: "#fd872e",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop:20
  },
  ButtonText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
  SignupLinkContainer: {
    flexDirection: "row",
    paddingRight: 10,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal:20
  },
});
