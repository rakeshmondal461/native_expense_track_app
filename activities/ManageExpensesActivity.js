import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

import IconButton from "../UI/IconButton";
import Button from "../UI/Button";
import { GlobalStyles } from "../constants/styles";
import { updateExpenseList } from "../redux/reducers/expenseReducer";
import { storeExpense } from "../helpers/httpHelper";

const ManageExpensesActivity = ({ route, navigation }) => {
  const choosedExpenseId = route.params?.expenseId;
  const isEditing = !!choosedExpenseId;
  const expenseList = useSelector((state) => state.expense.expenseList);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: { data: "", isValid: true },
    amount: { data: "", isValid: true },
    expenseDate: { data: new Date().toISOString(), isValid: true },
  });
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing]);

  useEffect(() => {
    const myData = [...expenseList].find(
      (elem) => elem.id === choosedExpenseId
    );
    if (myData) {
      setFormData({
        description: { data: myData.description, isValid: true },
        amount: { data: myData.amount.toString(), isValid: true },
        expenseDate: { data: myData.date, isValid: true },
      });
    }
  }, []);

  const handleInput = (identifier, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [identifier]: { data: value, isValid: true },
      };
    });
  };

  const onChangeDateHandler = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFormData((prev) => {
      return {
        ...prev,
        expenseDate: { data: currentDate.toISOString(), isValid: true },
      };
    });
    // setShow(false);
  };

  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };

  const handleDeleteExpense = () => {
    const index = expenseList.findIndex((x) => x.id === choosedExpenseId);
    if (index > -1) {
      const newExpenseList = [...expenseList];
      newExpenseList.splice(index, 1);
      dispatch(updateExpenseList(newExpenseList));
    }
    navigation.navigate("ExpenseOverView");
  };

  const handleCancelExpense = () => {
    navigation.goBack();
  };

  const addOrUpdateButtonHandler = async () => {
    const isValidDescription = formData?.description?.data ? true : false;
    const isValidAmount = formData?.amount?.data ? true : false;
    if (!isValidDescription) {
      setFormData((prev) => {
        return {
          ...prev,
          description: {
            data: formData.description.data,
            isValid: false,
          },
        };
      });
    }
    if (!isValidAmount) {
      setFormData((prev) => {
        return {
          ...prev,
          amount: {
            data: formData.amount.data,
            isValid: false,
          },
        };
      });
    }

    if (!isValidDescription || !isValidAmount) {
      return;
    }

    if (isEditing) {
      const expenseData = {
        id: choosedExpenseId,
        date: formData.expenseDate.data,
        description: formData.description.data,

        amount: parseInt(formData.amount.data),
      };

      const index = expenseList.findIndex((x) => x.id === choosedExpenseId);
      if (index > -1) {
        const newExpenseList = [...expenseList];
        newExpenseList[index] = expenseData;
        dispatch(updateExpenseList(newExpenseList));
      }
    } else {
      const expenseData = {
        date: formData.expenseDate.data,
        description: formData.description.data,
        amount: parseInt(formData.amount.data),
      };
      const storeExpenseResponse = await storeExpense(expenseData);
      console.log("storeExpenseResponse", storeExpenseResponse);
      if (!storeExpenseResponse) {
        return;
      }
      expenseData.id = storeExpenseResponse.name;
      const newExpenseList = [...expenseList];
      newExpenseList.push(expenseData);
      dispatch(updateExpenseList(newExpenseList));
    }
    setFormData({
      description: { data: "", isValid: true },
      amount: { data: "", isValid: true },
      expenseDate: { data: new Date().toISOString(), isValid: true },
    });

    navigation.navigate("ExpenseOverView");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Description"
          value={formData?.description?.data}
          style={[
            styles.input,
            !formData?.description?.isValid && styles.inValidInput,
          ]}
          //onChangeText={setDescription}
          onChangeText={handleInput.bind(this, "description")}
          autoCorrect={false}
          multiline={true}
        />
        <TextInput
          placeholder="Enter Amount"
          style={[
            styles.input,
            !formData?.amount?.isValid && styles.inValidInput,
          ]}
          keyboardType="numeric"
          value={formData?.amount?.data}
          onChangeText={handleInput.bind(this, "amount")}
        />
        <View style={styles.datePickerSec}>
          <TextInput
            value={
              formData?.expenseDate?.data
                ? formData.expenseDate?.data
                : new Date().toISOString()
            }
            style={[styles.input, styles.dateInput]}
          />

          <Button onPress={showDatepicker}> Show date picker</Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={
              formData?.expenseDate?.data
                ? new Date(formData.expenseDate.data)
                : new Date()
            }
            mode={mode}
            is24Hour={true}
            onChange={onChangeDateHandler}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="flat"
          style={styles.buttonStyle}
          onPress={handleCancelExpense}
        >
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={addOrUpdateButtonHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing ? (
        <View style={styles.iconButtonContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ManageExpensesActivity;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  iconButtonContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  inputContainer: {
    margin: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 4,
    marginVertical: 5,
  },
  datePickerSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  inValidInput: {
    borderColor: "#FF0000",
    borderWidth: 1,
    backgroundColor: "#ffdede",
  },
});
