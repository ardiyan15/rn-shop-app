import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ShopNavigator, {
  AuthNavigator,
  StartupNavigator,
} from "./ShopNavigator";

const Stack = createStackNavigator();

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth && <Stack.Screen name="shop" component={ShopNavigator} />}
        {!isAuth && didTryAutoLogin && (
          <Stack.Screen name="auth" component={AuthNavigator} />
        )}
        {!isAuth && !didTryAutoLogin && (
          <Stack.Screen name="startup" component={StartupNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
