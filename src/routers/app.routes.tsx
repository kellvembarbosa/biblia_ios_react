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
import i18n from 'i18n-js';
import SearchScreen from '../screens/app/SearchScreen';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: {
        TAB_FEED_TITLE: 'Feed',
        TAB_BIBLE_TITLE: 'Bible',
        TAB_FAVORITE_TITLE: 'Favorites',
        TAB_MYBIBLE_TITLE: 'My Bible',

        STACK_MARKED_TITLE: 'Markings',

        SEARCH_TITLE: 'Search',


        VERSE_TITLE: 'Verses for reflection',
        BOOK_TITLE: 'Favorite: ',

        ACTIONS_SHARE: 'Share:',
        ACTIONS_SELECT_VERSE: 'Select a color to mark the verse:',
        ACTIONS_CANCEL: 'Cancel',
        ACTIONS_CLEAN: 'Clean',

        PAGE_TITLE_FAVORITES: 'Favorites and Marked',

        SUBTILE_SECTION_MARKEDS: 'Choose a bookmark to see the marked verses:',
        SUBTILE_SECTION_BOOKS: 'See favorite books:',

        NO_FOUNDS_BOOKS: 'No marked verses were found in this book.',
        NO_FOUNDS_BOOKS_FAV: 'No favorite books were found.',
        NO_FOUNDS_MARKEDS: 'No verses marked with this color were found.',

        SETTINGS_GENERAL: 'General',
        SETTINGS_TERMS: 'Terms and conditions',
        SETTINGS_PRIVACY: 'Privacy Policy',
        SETTINGS_CLEAR_MARKEDS: 'Clear marked',
        SETTINGS_CLEAR: 'Clean',
        SETTINGS_NOTIFICATIONS: 'Notifications',
        SETTINGS_FOOTER: 'You can change the options at any time!',


        SETTINGS_DESIGN: 'Design',
        SETTINGS_MODO_DARK: 'Dark mode',

        SETTINGS_TIPOGRAFIA: 'Typography',
        SETTINGS_FT_BIBLE: 'Bible page',
        SETTINGS_FT_HOME: 'Home page',
        SETTINGS_FOOTER_RN: 'You can increase the apps fonts in school!',
        SETTINGS_VERSION_BIBLE: 'Change version'

    },
    pt: {
        TAB_FEED_TITLE: 'Feed',
        TAB_BIBLE_TITLE: 'B??blia',
        TAB_FAVORITE_TITLE: 'Favoritos',
        TAB_MYBIBLE_TITLE: 'Minha B??blia',

        STACK_MARKED_TITLE: 'Marca????es',
        SEARCH_TITLE: 'Buscando',

        VERSE_TITLE: 'Vers??culos para reflex??o',
        BOOK_TITLE: 'Favorito: ',

        ACTIONS_SHARE: 'Compartilhe:',
        ACTIONS_SELECT_VERSE: 'Selecione uma cor para marcar o vers??culo:',
        ACTIONS_CANCEL: 'Cancelar',
        ACTIONS_CLEAN: 'Limpar',

        PAGE_TITLE_FAVORITES: 'Favoritos e Marcados',

        SUBTILE_SECTION_MARKEDS: 'Escolha um marcador para ver os versiculos marcados:',
        SUBTILE_SECTION_BOOKS: 'Veja os livros favoritados:',

        NO_FOUNDS_BOOKS: 'N??o foi encontrado vers??culos marcados neste livro.',
        NO_FOUNDS_BOOKS_FAV: 'N??o foi encontrado livros favoritados.',
        NO_FOUNDS_MARKEDS: 'N??o foi encontrado vers??culos marcados com esta cor.',

        SETTINGS_GENERAL: 'Geral',
        SETTINGS_TERMS: 'Termos e condi????es',
        SETTINGS_PRIVACY: 'Pol??tica de Privacidade',
        SETTINGS_CLEAR_MARKEDS: 'Limpar marca????es',
        SETTINGS_CLEAR: 'Limpar',
        SETTINGS_NOTIFICATIONS: 'Notifica????es',
        SETTINGS_FOOTER: 'Voc?? pode alterar as op????es a qualquer momento!',


        SETTINGS_DESIGN: 'Design',
        SETTINGS_MODO_DARK: 'Modo escuro',

        SETTINGS_TIPOGRAFIA: 'Tipografia',
        SETTINGS_FT_BIBLE: 'P??gina da b??blia',
        SETTINGS_FT_HOME: 'P??gina da inicial',
        SETTINGS_FOOTER_RN: 'Voc?? pode aumentar em escole as fontes do app!',

        SETTINGS_VERSION_BIBLE: 'Alterar vers??o'

    },
};


type RootStackParamList = {
    Tabs: undefined;
    MarkInterna: { colorBg: string; };
    BookInterna: { bookName: string; abbrev: string };
    SearchScreen: undefined;
};


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();


function AppRoutes() {
    const theme = useTheme();

    const BottomNav = () => (
        <Tab.Navigator
            tabBarOptions={theme.tabBarOptions}
            initialRouteName="Biblia" >

            <Tab.Screen
                name="Biblia"
                component={BibliaScreen}
                options={{
                    tabBarLabel: i18n.t('TAB_BIBLE_TITLE'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="menu-book" size={25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Feed"
                component={HomeScreen}
                options={{
                    tabBarLabel: i18n.t('TAB_FEED_TITLE'),
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="list" size={22} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Favoritos"
                component={FavoritosScreen}
                options={{
                    tabBarLabel: i18n.t('TAB_FAVORITE_TITLE'),
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="star" size={25} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: i18n.t('TAB_MYBIBLE_TITLE'),
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
                        title: i18n.t('TAB_BIBLE_TITLE'),
                        headerShown: false
                    }}
                    component={BottomNav} />

                <Stack.Screen
                    name="BookInterna"
                    component={BookScreen}
                    initialParams={{ abbrev: '', bookName: 'BookInterna' }}
                    options={({ route }) => ({
                        title: ` ${i18n.t('BOOK_TITLE')}${route.params!.bookName}`
                    })} />

                <Stack.Screen
                    name="MarkInterna"
                    component={MarkScreen}
                    options={{
                        title: i18n.t('STACK_MARKED_TITLE'),
                    }} />

                <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{
                        title: i18n.t('SEARCH_TITLE'),
                    }} />

            </Stack.Navigator>
        </>
    )
}

export default AppRoutes;