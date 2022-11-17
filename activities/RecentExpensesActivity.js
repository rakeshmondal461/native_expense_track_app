import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpensesActivity = () => {
  return (
    <View style={styles.recentExpenseRoot}>
      <ExpensesOutput expensesPeriod="Last 7 days" />
    </View>
  );
};

export default RecentExpensesActivity;
const styles = StyleSheet.create({
  recentExpenseRoot: {
    flex: 1,
  },
});
