import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: "1", earnings: 15 },
  { quarter: "2", earnings: 75 },
  { quarter: "3", earnings: 33 },
  { quarter: "4", earnings: 60 },
  { quarter: "5", earnings: 50 },
  { quarter: "6", earnings: 100 },
  { quarter: "7", earnings: 50 }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Biểu đồ thi các Part </Text>
        <VictoryChart
          domain={{ x: [0, 7], y: [0, 100] }}
          domainPadding={{ x: 5 }}
          animate={{ duration: 1000 }}
          width={350}
        //theme={VictoryTheme.material}
        >
          <VictoryBar data={data}
            x="quarter" y="earnings"
          // barRatio={0.8}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});