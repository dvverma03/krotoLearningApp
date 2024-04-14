import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VerifyUser, login } from "../utils/Authentication";
import { useSelector } from "react-redux";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Verification() {
  const e1 = useRef(null);
  const e2 = useRef("");
  const e3 = useRef("");
  const e4 = useRef("");
  const e5 = useRef("");
  const e6 = useRef("");
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const [d4, setD4] = useState("");
  const [d5, setD5] = useState("");
  const [d6, setD6] = useState("");

  const [verifying, setVerifying] = useState(false);
  const[resend, setResend]= useState(false)
  const navigation = useNavigation();
  const Otp = `${d1}${d2}${d3}${d4}${d5}${d6}`;
  const data = useSelector((store) => store.contact);

  const VerifyOtp = async () => {
    setVerifying(true);
    try {
      const Verified = await VerifyUser(
        data.email,
        data.contactNumber,
        data.countryCode,
        Otp
      );
      if(Verified){
        navigation.navigate("/Home")
      }
    } catch (error) {
      Alert.alert("Error", "Invalid credential. Please try again later.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } finally {
      setCreating(false);
    }

  };

  const ResendOTPHandler = async ()=>{
    setResend(true);
    try {
      const Verified = await login(
        data.email,
        data.contactNumber,
        data.countryCode,
      );
    } catch (error) {
      Alert.alert("Error", "Invalid credential. Please try again later.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } finally {
      setResend(false);
    }
  }

  if (verifying) {
    return <LoadingOverlay message="Verifying user" />;
  }

  if (resend) {
    return <LoadingOverlay message="Sending OTP" />;
  }

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.Bharat}>BHARAT</Text>
        <Text style={styles.Learn}>LEARN</Text>
      </View>
      <Text style={styles.Title}>अब सीखेगा भारत</Text>

      <View style={styles.FormContainer}>
        <View>
          <AntDesign
            onPress={() => {
              navigation.replace("SignIn");
            }}
            style={{ marginLeft: 10, marginTop: 10 }}
            name="arrowleft"
            size={30}
            color="black"
          />
        </View>
        <Text style={styles.SignInText}>Verify OTP</Text>
        <View>
          <Text style={{fontSize:18, paddingHorizontal:10, paddingVertical:10, color:"gray"}}>Enter the verification code we've just sent to the {data.contactNumber}</Text>
        </View>
        <View style={styles.OtpContainer}>
          <TextInput
            ref={e1}
            value={d1}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d1.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD1(txt);
                e2.current.focus();
              } else if (txt.length <= 0) {
                e1.current.focus();
                setD1("");
              }
            }}
          ></TextInput>
          <TextInput
            ref={e2}
            value={d2}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d2.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD2(txt);
                e3.current.focus();
              } else if (txt.length <= 0) {
                setD2("");
                e1.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e3}
            value={d3}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d3.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD3(txt);
                e4.current.focus();
              } else if (txt.length <= 0) {
                setD3("");
                e2.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e4}
            value={d4}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d4.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD4(txt);
                e5.current.focus();
              } else if (txt.length <= 0) {
                setD4("");
                e3.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e5}
            value={d5}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d5.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD5(txt);
                e6.current.focus();
              } else if (txt.length <= 0) {
                setD5("");
                e4.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e6}
            value={d6}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d6.length >= 1 ? "#847e7e" : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD6(txt);
                e6.current.focus();
              } else if (txt.length <= 0) {
                setD6("");
                e5.current.focus();
              }
            }}
          ></TextInput>
        </View>
        <Pressable
          onPress={VerifyOtp}
          style={[
            styles.PressableButton,
            { backgroundColor: d6.length != 1 ? "#f3cbac" : "#fD872E" },
          ]}
        >
          <Text style={styles.ButtonText}>Verify code</Text>
        </Pressable>

        <Pressable onPress={ResendOTPHandler}>
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10,
              paddingTop: 10,
              fontWeight: "600",
            }}
          >
            Resend Code
          </Text>
        </Pressable>
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
  otpBox: {
    borderColor: "gray",
    borderWidth: 2,
    width: 45,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 30,
    fontSize: 18,
    textAlign: "center",
  },
  OtpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
