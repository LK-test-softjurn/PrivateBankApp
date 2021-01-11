// imports external
import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

// imports internal
import { MESSAGE_BOX_TYPE } from '../common/consts';
import { STRINGS } from '../common/constsStrings';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';

export const MessageBox = ({ header, text, type, onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.messageBoxContainer}>
                <View style={[styles.headerContainer, { borderColor: type === MESSAGE_BOX_TYPE.ERROR ? colors.redColor : colors.blueColor }]}>
                    <Text style={type === MESSAGE_BOX_TYPE.ERROR ? theme.redBoldText : theme.blueBoldText}>{header}</Text>
                </View>
                <View style={styles.textContainer}><Text style={theme.whiteText}>{text}</Text></View>
                {type === MESSAGE_BOX_TYPE.ERROR ? (<View>
                    <TouchableOpacity onPress={() => { onClose() }} style={theme.buttonRed}>
                        <Text style={theme.whiteText}>{STRINGS.MESSAGE_BOX_OK_BUTTON_TEXT}</Text>
                    </TouchableOpacity>
                </View>) : null}
                {type === MESSAGE_BOX_TYPE.INFO ? (<View>
                    <TouchableOpacity onPress={() => { onClose() }} style={theme.buttonBlue}>
                        <Text style={theme.whiteText}>{STRINGS.MESSAGE_BOX_OK_BUTTON_TEXT}</Text>
                    </TouchableOpacity>
                </View>) : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageBoxContainer: {
        alignSelf: 'stretch',
        backgroundColor: colors.modalBackgroundColor,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        elevation: 10
    },
    headerContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 1,
        marginHorizontal: 10
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },

})