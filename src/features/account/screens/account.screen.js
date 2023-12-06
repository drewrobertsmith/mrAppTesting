import { Button, SafeAreaView } from "react-native";

import { SafeArea } from "../../../components/utility/safeArea.component";

export default function AccountScreen({ navigation }) {
  return (
    <SafeArea>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </SafeArea>
  );
}
