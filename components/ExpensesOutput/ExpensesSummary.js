import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "./../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {
  const cExpenses = [...expenses];
  const expenseSum = cExpenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.totAmount}>${expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  period: {
    color: GlobalStyles.colors.primary500,
  },
  totAmount: {
    color: GlobalStyles.colors.primary700,
    fontWeight: "800",
  },
});
