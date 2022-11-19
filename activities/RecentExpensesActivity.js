import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../helpers/httpHelper";

const RecentExpensesActivity = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    async function getExpenses() {
      const response = await fetchExpenses();
      if (response) {
        setExpenses(response);
      }
    }
    getExpenses();
  }, []);
  return (
    <View style={styles.recentExpenseRoot}>
      <ExpensesOutput expenses={expenses} expensesPeriod="Last 7 days" />
    </View>
  );
};

export default RecentExpensesActivity;
const styles = StyleSheet.create({
  recentExpenseRoot: {
    flex: 1,
  },
});
