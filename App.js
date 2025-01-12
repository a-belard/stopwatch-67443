import { View, StyleSheet } from "react-native";
import Stopwatch from "./stopwatch";

export default function App() {
  return (
    <View style={styles.container}>
      <Stopwatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
