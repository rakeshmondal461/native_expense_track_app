import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpensesActivity = () => {
  return (
    <View style={styles.allExpenseRoot}>
      <ExpensesOutput expensesPeriod="All" />
    </View>
  );
};

export default AllExpensesActivity;

const styles = StyleSheet.create({
  allExpenseRoot: {
    flex: 1,
  },
});
