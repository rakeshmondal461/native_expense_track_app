import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  const sevenDaysAgo = new Date(new Date() - 7 * 86400000);
  const filteredData = [...expenses].filter((item) => {
    return new Date(item.date) > sevenDaysAgo;
  });

  return (
    <View style={styles.mainContainer}>
      <ExpensesSummary
        expenses={expensesPeriod === "All" ? expenses : filteredData}
        periodName={expensesPeriod}
      />
      <ExpensesList
        expenses={expensesPeriod === "All" ? expenses : filteredData}
      />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 20,
  },
});
