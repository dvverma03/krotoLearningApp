import axios from "axios";

export const login = async(email, phone,countryCode)=>{
  const url = "https://www.kroto.in/api/auth/client/signin_request"
  const loginData = {
      email,
      phone,
      phoneCountryCode: countryCode
  }
  try {
     const loginInfo = await axios.post(url,loginData) 
     console.log(loginInfo)
     return loginInfo
  } catch (error) {
      console.log("Error in loggging in",error)
  }
}

export async function VerifyUser(email, contact, countryCode, otp) {
  try {
    const response = await axios.post(
      `https://www.kroto.in/api/auth/client/verify_signin`,
      {
        email:  email ,
        phone:  contact ,
        phoneCountryCode: countryCode ,
        otp:  otp ,
      }
    );
    return response.data;
  } catch (error) {
    Alert.alert("Error", "Invalid credential. Please try again later.", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }
}
