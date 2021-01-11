// imports external
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// imports internal
import { STRINGS } from '../common/constsStrings';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';

export const MonthPicker = ({ month, year, onClose }) => {
    const [chosenMonth, setChosenMonth] = useState(month);
    const [monthsShortcuts, setMonthsShortcuts] = useState([]);
    
    useEffect(() => {
        const currentDate = Date.now();
        const currentYear = new Date(currentDate).getFullYear();
        const currentMonth = new Date(currentDate).getMonth();

        const tempTable = [];
        if(currentYear === year) {

            for (let i = 0; i < 12; i++) {
                tempTable.push({id: i, monthShortcut: STRINGS.MONTHS_SHORTCUTS[i], isAvailable: i > currentMonth ? false : true });
            }
        } else {
            for (let i = 0; i < 12; i++) {
                tempTable.push({id: i, monthShortcut: STRINGS.MONTHS_SHORTCUTS[i], isAvailable: true });
            }
        }
        
        setMonthsShortcuts([...tempTable]);
    }, []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => { if(item.isAvailable === true) { setChosenMonth(index) }}}>
            <View style={index === chosenMonth ? styles.selectedMonth : styles.unSelectedMonth}><Text style={item.isAvailable === true ? theme.whiteBoldText : theme.grayBoldText}>{item.monthShortcut}</Text></View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.pickerContainer}>
            <View style={styles.headerContainer}>
                <Text style={theme.whiteBoldText}>{STRINGS.MONTHS[chosenMonth]}</Text>
            </View>
            <View style={styles.monthsContainer}>
            <FlatList
                    data={monthsShortcuts}
                    renderItem={renderItem}
                    numColumns={3}
                    horizontal={false}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => {onClose(null)}} style={{marginRight: 20}}>
                    <Text style={theme.whiteBoldText}>{STRINGS.CANCEL}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {onClose(chosenMonth)}}>
                <Text style={theme.whiteBoldText}>{STRINGS.OK}</Text>
                </TouchableOpacity>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        backgroundColor: colors.modalBackgroundColor,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        elevation: 10,
        alignSelf: 'stretch'
    },
    headerContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderBottomWidth: 1,
        marginHorizontal: 10,
        borderColor: colors.whiteColor
    },
    selectedMonth: {
        backgroundColor: colors.blueColor,
        padding: 10,
        margin: 10,
    },
    unSelectedMonth: {
        backgroundColor: 'transparent',
        padding: 10,
        margin: 10,
    },
    monthsContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: 0,
        borderTopWidth: 1,
        marginHorizontal: 10,
        borderColor: colors.whiteColor
    }
});
