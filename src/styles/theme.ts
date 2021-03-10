import { DefaultTheme } from "styled-components/native";

declare module "styled-components" {
    export interface DefaultTheme {
        isDarkTheme: boolean;
        primaryColor: string;
        secondaryColor: string;

        backgroundColor: string;
        cardColor: string;
        colorText: string;
        tabBarOptions: {
            // activeBackgroundColor: string;
            // inactiveBackgroundColor: string;

            opacity: number;

            activeTintColor: string;
            inactiveTintColor: string;

            style: {
                backgroundColor: string;
                borderTopWidth: number;
                borderTopColor: string;
            }
        },

        colorSocial: {
            colorIcons: string;
            colorWhatsApp: string;
            colorFacebook: string;
            colorInstagram: string;
            colorTelegram: string;
        }
    }
}

export const lightTheme: DefaultTheme = {
    isDarkTheme: false,
    primaryColor: "#F79C4D",
    secondaryColor: "#E46B10",

    backgroundColor: "#f3f3f3",
    cardColor: "#fff",

    colorText: "#222",

    tabBarOptions: {
        // activeBackgroundColor: "#fff",
        // inactiveBackgroundColor: "#fff",
        activeTintColor: "#F79C4D",
        inactiveTintColor: "#333",
        opacity: 0.5,
        style: {
            backgroundColor: '#f3f3f3',
            borderTopWidth: 0,
            borderTopColor: '#D3D3D3',
        }
    },

    colorSocial: {
        colorIcons: "#fff",
        colorWhatsApp: "#00af4b",
        colorFacebook: "#4d7dcf",
        colorInstagram: "#d13418",
        colorTelegram: "#4d7dcf"
    }
};

export const darkTheme: DefaultTheme = {
    isDarkTheme: true,
    primaryColor: "#F79C4D",
    secondaryColor: "#E46B10",

    backgroundColor: "#000",
    cardColor: "#222",

    colorText: "#fff",

    tabBarOptions: {
        // activeBackgroundColor: "#000",
        // inactiveBackgroundColor: "#000",
        activeTintColor: "#F79C4D",
        inactiveTintColor: "#fff",
        opacity: 0.2,
        style: {
            backgroundColor: '#000',
            borderTopWidth: 0,
            borderTopColor: '#000',
        }
    },

    colorSocial: {
        colorIcons: "#fff",
        colorWhatsApp: "#25d366",
        colorFacebook: "#1877f2",
        colorInstagram: "#c32aa3",
        colorTelegram: "#0088cc"
    }
};