import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { View, Text } from 'react-native'
import HomeScreen from '../screens/app/HomeScreen';

const Stack = createStackNavigator();

function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}

export default AuthRoutes
