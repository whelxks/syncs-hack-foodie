import React from "react";
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { Button, ButtonText } from "@/components/ui/button";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/services/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  // console.log('Web Client ID:', process.env.EXPO_PUBLIC_WEB_CLIENT_ID);
  // console.log('iOS Client ID:', process.env.EXPO_PUBLIC_IOS_CLIENT_ID);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    redirectUri: "https://auth.expo.io/@anonymous/foodie",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <TouchableOpacity
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
      style={styles.button}
    >
      <Image
        source={{
          uri: "https://developers.google.com/identity/images/g-logo.png",
        }}
        style={styles.icon}
      />
      <Text style={styles.text}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderColor: "#dadce0",
    borderWidth: 1,
    borderRadius: 52,
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 16,
    minWidth: 280,
    minHeight: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: '#3c4043',
    fontSize: 20,
    fontWeight: "600",
    fontFamily: 'System'
  },
});
