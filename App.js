import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ManageExpensesActivity from "./activities/ManageExpensesActivity";
import AllExpensesActivity from "./activities/AllExpensesActivity";
import RecentExpensesActivity from "./activities/RecentExpensesActivity";
import IconButton from "./UI/IconButton";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpenseOverView = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "#fff",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add-circle"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpensesActivity}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpensesActivity}
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="ExpenseOverView"
              component={ExpenseOverView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpensesActivity}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
