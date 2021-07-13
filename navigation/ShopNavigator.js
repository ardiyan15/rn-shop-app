// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator } from "react-navigation-drawer";

// import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
// import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
// import CartScreen from "../screens/shop/CartScreen";
// import OrderScreen from "../screens/shop/OrdersScreen";

// const Productsnavigator = createStackNavigator(
//   {
//     ProducsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrderScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

// const ShopNavigator = createDrawerNavigator({
//   Products: Productsnavigator,
//   Orders: OrdersNavigator,
// },{
//   contentOptions: {
//     activeTintColor: Colors.primary
//   }
// });

// export default createAppContainer(ShopNavigator);

import React, { useEffect, useCallback } from "react";
import { Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";

import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

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
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{ activeTintColor: Colors.primary }}
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
    </NavigationContainer>
  );
};

export default ShopNavigator;
