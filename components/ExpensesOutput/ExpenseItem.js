import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const ExpenseItem = ({ id, description, date, amount }) => {
  const navigation = useNavigation();

  const pressExpenseItemHandler = () => {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  };
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedItem}
      onPress={pressExpenseItemHandler}
    >
      <View style={styles.mainContainer}>
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.amountText}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary500,
    marginVertical: 8,
    padding: 10,
    borderRadius: 6,
    elevation: 4,
  },
  descriptionSection: {
    justifyContent: "center",
  },
  description: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "700",
    fontSize: 15,
  },
  dateText: {
    color: GlobalStyles.colors.primary100,
  },
  amountSection: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  amountText: {
    color: GlobalStyles.colors.primary700,
    fontWeight: "800",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
