// // import { SignedIn, SignedOut, useUser, useOAuth } from '@clerk/clerk-expo'
// // import { Link } from 'expo-router'
// // import { Text, View, Button } from 'react-native'
// // import * as WebBrowser from 'expo-web-browser'
// // import { useCallback } from 'react'
// // import { ClerkProvider } from "@clerk/clerk-expo";  // ✅


// // WebBrowser.maybeCompleteAuthSession();

// // const CLERK_PUBLISHABLE_KEY = "pk_test_Y2xlcmstaW50YWtlLmNvbS0xMjMuY2xlcmsuYWNjb3VudHMuZGV2JA";


// // export default function Page() {
// //   const { user } = useUser()
// //   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

// //   const onPress = useCallback(async () => {
// //     try {
// //       const { createdSessionId, signIn, signUp, setActive } = 
// //         await startOAuthFlow();
// //       if (createdSessionId) {
// //         setActive?.({ session: createdSessionId });
// //       } else {
// //         // Use signIn or signUp for next steps such as MFA
// //       }
// //     } catch (err) {
// //       console.error("OAuth error:", err);
// //     }
// //   }, []);

// //   return (
// //     <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
// //       <View>
// //         <SignedIn>
// //           <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
// //         </SignedIn>
// //         <SignedOut>
// //           <Link href="/(auth)/sign-in">
// //             <Text>Sign in</Text>
// //           </Link>
// //           <Link href="/(auth)/sign-up">
// //             <Text>Sign up</Text>
// //           </Link>
// //           <Button 
// //             title="Sign in with Google"
// //             onPress={onPress}
// //           />
// //         </SignedOut>
// //       </View>
// //     </ClerkProvider>
// //   )
// // }


// import { ClerkProvider } from "@clerk/clerk-expo";
// import { SignedIn, SignedOut, useUser, useOAuth } from "@clerk/clerk-expo";
// import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import * as SecureStore from "expo-secure-store";
// import { useClerk } from "@clerk/clerk-expo";

// WebBrowser.maybeCompleteAuthSession();

// const CLERK_PUBLISHABLE_KEY = "pk_test_Y2xlcmstaW50YWtlLmNvbS0xMjMuY2xlcmsuYWNjb3VudHMuZGV2JA";

// export default function AuthLayout() {
//   const { user } = useUser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//   const navigation = useNavigation();

//   // ✅ Google Sign-In Function (Fixed)
//   const onGooglePress = useCallback(async () => {
//     try {
//       const { createdSessionId, setActive } = await startOAuthFlow();
//       if (createdSessionId) {
//         await setActive?.({ session: createdSessionId });
//         Alert.alert("Success", "Google login successful!");
//         navigation.navigate("Home");
//       }
//     } catch (err) {
//       console.error("OAuth error:", err);
//       Alert.alert("Error", "Google login failed. Please try again.");
//     }
//   }, []);

//   return (
//     <ClerkProvider
//       publishableKey={CLERK_PUBLISHABLE_KEY}
//       tokenCache={useClerk().tokenCache({
//         async getToken(key) {
//           return SecureStore.getItemAsync(key);
//         },
//         async setToken(key, value) {
//           return SecureStore.setItemAsync(key, value);
//         },
//       })}
//     >
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <SignedIn>
//           <Text>Hello {user?.emailAddresses[0]?.emailAddress}</Text>
//         </SignedIn>
//         <SignedOut>
//           <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
//             <Text>Sign in</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//             <Text>Sign up</Text>
//           </TouchableOpacity>
//           <Button title="Sign in with Google" onPress={onGooglePress} />
//         </SignedOut>
//       </View>
//     </ClerkProvider>
//   );
// }
