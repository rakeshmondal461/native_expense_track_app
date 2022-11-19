import axios from "axios";
const FIREBSE_URL =
  "https://react-native-expense-tra-24a08-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  try {
    const response = await axios.post(
      FIREBSE_URL + "/expenses.json",
      expenseData
    );
    if (!response.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(FIREBSE_URL + "/expenses.json");
    if (!response.data) {
      return null;
    }
    const expenses = [];
    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: response.data[key].date,
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.log(error);
  }
};
