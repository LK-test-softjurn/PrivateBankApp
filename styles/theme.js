// imports external
import { StyleSheet } from 'react-native';

// imports internal
import { colors } from './colors';

export const theme = StyleSheet.create({
    grayText: {
        fontFamily: 'Roboto-regular',
        fontSize: 12,
        color: colors.grayColor
    },
    whiteText: {
        fontFamily: 'Roboto-regular',
        fontSize: 12,
        color: colors.whiteColor
    },
    blueText: {
        fontFamily: 'Roboto-regular',
        fontSize: 12,
        color: colors.blueColor
    },
    redText: {
        fontFamily: 'Roboto-regular',
        fontSize: 12,
        color: colors.redColor
    },
    grayBoldText: {
        fontFamily: 'Roboto-bold',
        fontSize: 14,
        color: colors.grayColor
    },
    whiteBoldText: {
        fontFamily: 'Roboto-bold',
        fontSize: 14,
        color: colors.whiteColor
    },
    blueBoldText: {
        fontFamily: 'Roboto-bold',
        fontSize: 14,
        color: colors.blueColor
    },
    redBoldText: {
        fontFamily: 'Roboto-bold',
        fontSize: 14,
        color: colors.redColor
    },
    buttonBlue: {
        alignSelf: 'stretch',
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blueColor
    },
    buttonRed: {
        alignSelf: 'stretch',
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.redColor
    },
    screanTitle: {
        fontFamily: 'Roboto-bold',
        fontSize: 24,
        color: colors.whiteColor
    }
})

