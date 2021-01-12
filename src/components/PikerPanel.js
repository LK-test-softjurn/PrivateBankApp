// imports external
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

// imports internal
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { STRINGS } from '../common/constsStrings';

export const PikerPanel = ({month, year, onMonthPiker, onYearPiker}) => {
      
    return (
        <View style={styles.selectorsContainer}>
        <View style={styles.leftSelectorContainer}>
        <View style={styles.selectorArrowBackground}/>
            <TouchableOpacity onPress={() => { onMonthPiker() }} style={styles.monthSelector}>
                
                <View>
                    <Text style={[theme.whiteBoldText, {marginRight: 20}]}>{STRINGS.MONTHS[month]}</Text>
                </View>
                <View style={styles.selectorArrowContainer}>
                    <Icon name="arrow-drop-down" size={24} color={'#e6e6e6'} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.rightSelectorContainer}>
        <View style={styles.selectorArrowBackground}/>
        <TouchableOpacity onPress={() => { onYearPiker() }} style={styles.monthSelector}>
                <View>
                    <Text style={[theme.whiteBoldText, {marginRight: 20}]}>{year}</Text>
                </View>
                <View style={styles.selectorArrowContainer}>
                    <Icon name="arrow-drop-down" size={24} color={'#e6e6e6'} />
                </View>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    selectorsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20
    },
    leftSelectorContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.blueColor,
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.modalBackgroundColor
    },
    rightSelectorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.blueColor,
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.modalBackgroundColor
    },
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectorArrowBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        width: 40,
        backgroundColor: colors.blueColor,
    },
    selectorArrowContainer: {
        width: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})