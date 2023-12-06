import {
  ActivityIndicator,
  Button,
  Pressable,
  SafeAreaView,
  Text,
} from "react-native";
import { useContext, useState } from "react";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safeArea.component";
import { TextInput } from "react-native-paper";

export default function RegisterScreen() {
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <SafeArea>
      <Text>Register</Text>
      <TextInput
        label="Your Email"
        textContentType="emailAddress"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Your password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        secureTextEntry
      />
      <TextInput
        label="Re-enter password"
        value={repeatedPassword}
        onChangeText={setRepeatedPassword}
        textContentType="password"
        secureTextEntry
      />
      {error && <Text>{error}</Text>}
      {!isLoading ? (
        <Button
          title="Register"
          onPress={() => onRegister(email, password, repeatedPassword)}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeArea>
  );
}
