import { Platform, SafeAreaView, StatusBar } from "react-native";

import styled from "styled-components";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;
