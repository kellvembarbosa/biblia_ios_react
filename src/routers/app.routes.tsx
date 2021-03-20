import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/app/HomeScreen';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import BibliaScreen from '../screens/app/BibliaScreen'
import ProfileScreen from '../screens/app/MinhBibliaScreen'
import { StatusBar } from 'expo-status-bar';
import RegisterScreen from '../screens/app/RegisterScreen';
import LoginScreen from '../screens/app/LoginScreen';
import VersiculoDiaScreen from '../screens/app/FavoritosScreen';
import FavoritosScreen from '../screens/app/FavoritosScreen';
import BookScreen from '../screens/app/FavoritosScreen/screens/BookScreen';
import MarkScreen from '../screens/app/FavoritosScreen/screens/MarkScreen';

type RootStackParamList = {
    Tabs: undefined;
    MarkInterna: { colorBg: string; };
    BookInterna: { bookName: string; abbrev: string };
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();


function AppRoutes() {
    const theme = useTheme();

    const BottomNav = () => (
        <Tab.Navigator
            tabBarOptions={theme.tabBarOptions}
            initialRouteName="Home" >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="list" size={22} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Biblia"
                component={BibliaScreen}
                options={{
                    tabBarLabel: 'Bíblia',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="menu-book" size={25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Favoritos"
                component={FavoritosScreen}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="star" size={25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Minha Bíblia',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people-alt" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator >
    )

    return (
        <>
            <StatusBar style={theme.isDarkTheme ? "light" : "dark"} />
            <Stack.Navigator

                screenOptions={{
                    headerTintColor: theme.colorText,
                    headerStyle: {
                        backgroundColor: theme.backgroundColor,
                        elevation: 0,
                        shadowRadius: 0,
                        shadowColor: "transparent"
                    },
                }}
                initialRouteName="Tabs">

                <Stack.Screen
                    name="Tabs"
                    options={{
                        title: 'Bíblia',
                        headerShown: false
                    }}
                    component={BottomNav} />

                <Stack.Screen
                    name="BookInterna"
                    component={BookScreen}
                    initialParams={{ abbrev: '', bookName: 'BookInterna' }}
                    options={({ route }) => ({
                        title: ` Favorite: ${route.params!.bookName}`
                    })} />

                <Stack.Screen
                    name="MarkInterna"
                    component={MarkScreen}
                    options={{
                        title: 'Marcações'
                    }} />

            </Stack.Navigator>
        </>
    )
}

export default AppRoutes;