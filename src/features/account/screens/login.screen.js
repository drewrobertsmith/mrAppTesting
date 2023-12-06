import { Button, SafeAreaView, Text } from "react-native";
import { useContext, useState } from "react";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SafeArea } from "../../../components/utility/safeArea.component";
import { TextInput } from "react-native-paper";

export default function LoginScreen() {
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeArea>
      <Text>Login</Text>
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
      {error && <Text>{error}</Text>}
      {!isLoading ? (
        <Button title="Login" onPress={() => onLogin(email, password)} />
      ) : (
        <ActivityIndicator size="small"/>
      )}
    </SafeArea>
  );
}
