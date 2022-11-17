import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";
import { getFormattedDate } from "../../util/getFormattedDate";

const ExpensesList = ({ expenses }) => {
  const renderItem = (itemData) => {
    return (
      <ExpenseItem
        description={itemData.item.description}
        date={
          itemData?.item?.date
            ? getFormattedDate(new Date(itemData.item.date))
            : ""
        }
        amount={itemData.item.amount}
        id={itemData.item.id}
      />
    );
  };
  return (
    <View style={styles.expenseListContainer}>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  expenseListContainer: {
    marginVertical: 20,
  },
});
