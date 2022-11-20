import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../helpers/httpHelper";
import { updateExpenseList } from "../redux/reducers/expenseReducer";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

const RecentExpensesActivity = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expenseList = useSelector((state) => state.expense.expenseList);
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const response = await fetchExpenses();
        if (!response) {
          setError("Could not fetch Expenses!");
        }
        dispatch(updateExpenseList(response));
      } catch (error) {
        setError("Could not fetch Expenses!");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  const closeErrorOverlay = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={closeErrorOverlay} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.recentExpenseRoot}>
      {expenseList.length > 0 ? (
        <ExpensesOutput expenses={expenseList} expensesPeriod="Last 7 days" />
      ) : (
        <View style={styles.noRecordSection}>
          <Text style={styles.noRecordText}>No Record to Show</Text>
        </View>
      )}
    </View>
  );
};

export default RecentExpensesActivity;
const styles = StyleSheet.create({
  recentExpenseRoot: {
    flex: 1,
  },
  noRecordSection: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  noRecordText: {
    color: "#fff",
  },
});
