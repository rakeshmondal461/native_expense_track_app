import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const AllExpensesActivity = () => {
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
    <View style={styles.allExpenseRoot}>
      <ExpensesOutput expenses={expenses} expensesPeriod="All" />
    </View>
  );
};

export default AllExpensesActivity;

const styles = StyleSheet.create({
  allExpenseRoot: {
    flex: 1,
  },
});
