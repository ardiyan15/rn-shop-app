import React from "react";
import { Button, Text, Platform, SafeAreaView, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const productsHeaderOptions = (navigation) => {
  return {
    headerTitle: "e-Komers",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const productDetailOptions = ({ route, navigation }) => {
  const productTitle = route.params.productTitle;
  return {
    headerTitle: productTitle,
  };
};

const orderScreenOptions = (navigation) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const adminScreenOptions = (navigation) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-create"
          onPress={() => {
            navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const ProductsNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverview"
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsHeaderOptions(props.navigation)}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route, navigation }) =>
          productDetailOptions({ route, navigation })
        }
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
    </Stack.Navigator>
  );
};

const OrdersNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={orderScreenOptions(props.navigation)}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="User Products"
        component={UserProductScreen}
        options={adminScreenOptions(props.navigation)}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </Stack.Navigator>
  );
};

const ShopNavigator = (props) => {
  const dispatch = useDispatch();
  // const { navigation } = props;
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 40 }}>
            <DrawerItemList {...props} />
            <DrawerItem
              {...props}
              label={({ color }) => {
                return (
                  <View>
                    <Button
                      title="Logout"
                      color={Colors.primary}
                      onPress={() => {
                        dispatch(authActions.logout());
                        // navigation.navigate("auth");
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-cart" size={23} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-list" size={23} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-create" size={23} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const StartupNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="startup" component={StartupScreen} />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
