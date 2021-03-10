import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/app/HomeScreen';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import BibliaScreen from '../screens/app/BibliaScreen'
import ProfileScreen from '../screens/app/ProfileScreen'
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                    tabBarLabel: 'Home',
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
            <BottomNav />

            <StatusBar style={theme.isDarkTheme ? "light" : "dark"} />
        </>
        // <Stack.Navigator
        //     screenOptions={{
        //         headerTintColor: 'white',
        //         headerStyle: {
        //             backgroundColor: 'tomato',
        //             elevation: 0,
        //             shadowRadius: 0,
        //             shadowColor: "transparent"
        //         },
        //     }}

        //     initialRouteName="Tabs">

        //     <Stack.Screen
        //         name="Tabs"
        //         options={{
        //             title: 'Bíblia Sagrada',
        //             // headerTransparent: true,
        //         }}
        //         component={bottomNav} />
        // </Stack.Navigator>
    )
}

export default AppRoutes;