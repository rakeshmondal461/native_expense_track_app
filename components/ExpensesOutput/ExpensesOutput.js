import { View, Text } from "react-native";
import React from "react";

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
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;
