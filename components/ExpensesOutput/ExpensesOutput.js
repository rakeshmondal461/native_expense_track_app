import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";
import { useSelector, useDispatch } from "react-redux";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const EXPENSES = [
  {
    id: "e1",
    description: "Iphone 5",
    amount: 1200,
    date: new Date("2022-11-01"),
  },
  {
    id: "e2",
    description: "Iphone 6",
    amount: 1500,
    date: new Date("2022-11-02"),
  },
  {
    id: "e3",
    description: "Iphone 10",
    amount: 2000,
    date: new Date("2022-10-01"),
  },
  {
    id: "e4",
    description: "Iphone 11",
    amount: 2500,
    date: new Date("2022-09-01"),
  },
  {
    id: "e5",
    description: "Iphone 12",
    amount: 2500,
    date: new Date("2022-09-01"),
  },
  {
    id: "e6",
    description: "Iphone 12 pro",
    amount: 3000,
    date: new Date("2022-09-01"),
  },
  {
    id: "e7",
    description: "Iphone 12 pro max",
    amount: 3500,
    date: new Date("2022-09-01"),
  },
  {
    id: "e8",
    description: "Iphone 13",
    amount: 3700,
    date: new Date("2022-09-01"),
  },
  {
    id: "e9",
    description: "Iphone 13 pro",
    amount: 3800,
    date: new Date("2022-09-01"),
  },
  {
    id: "e10",
    description: "Iphone 13 pro max",
    amount: 3900,
    date: new Date("2022-09-01"),
  },
  {
    id: "e11",
    description: "Iphone 14",
    amount: 4000,
    date: new Date("2022-09-11"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  const expenseList = useSelector((state) => state.expense.expenseList);
  return (
    <View style={styles.mainContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
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
