// imports external
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// imports internal
import { STRINGS } from '../common/constsStrings';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { minYear } from '../common/config';

export const YearPicker = ({ year, onClose }) => {
    const [yearsTable, setYearsTable] = useState([]);
    const [chosenYear, setChosenYear] = useState(year);

    useEffect(() => {
        const maxYear = new Date(Date.now()).getFullYear();
        const tempTable = [];
        for (let i = minYear; i < maxYear + 1; i++) {
            tempTable.push({id: `${i}`, year: i});
        }
        setYearsTable([...tempTable]);
    }, []);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => setChosenYear(item.year)} style={styles.flatListItem}>
            <View style={item === chosenYear ? styles.selectedMonth : styles.unSelectedMonth}><Text style={theme.whiteBoldText}>{item.year}</Text></View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.pickerContainer}>
            <View style={styles.headerContainer}>
                <Text style={theme.pickerSelectedText}>{chosenYear}</Text>
            </View>
            <View style={styles.monthsContainer}>
            <FlatList
                    style={styles.flatList}
                    data={yearsTable}
                    renderItem={renderItem}
                    horizontal={false}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => {onClose(null)}} style={{marginRight: 20}}>
                    <Text style={theme.whiteBoldText}>{STRINGS.CANCEL}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {onClose(chosenYear)}}>
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
    flatList: {
        alignSelf: 'stretch'
    },
    flatListItem: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center',
        height: 200
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


// // imports external
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// // imports internal
// import { minYear } from '../common/config';
// import { colors } from '../../styles/colors';

// export const YearPicker = ({ year, onSelected }) => {
//     const [yearsTable, setYearsTable] = useState([]);
//     const [chosenyear, setChosenYear] = useState(year);

//     useEffect(() => {
//         maxYear = new Date(Date.now()).getFullYear();
//         tempTable = [];
//         for (let i = minYear; i < maxYear + 1; i++) {
//             tempTable.push(i);
//         }
//         setYearsTable([...tempTable]);
//     }, []);

//     return (
//         <Picker
//             selectedValue={chosenyear}
//             style={styles.pickerStyle}
//             dropdownIconColor={colors.whiteColor}
//             onValueChange={(itemValue) => {
//                 setChosenYear(itemValue)
//                 onSelected(itemValue);
//             }
//             }>
//             {yearsTable?.map((item, index) => {
//                 return (<Picker.Item label={item.toString()} value={item} key={index.toString()}/>)
//             })}
//         </Picker>
//     )
// }

// const styles = StyleSheet.create({
//     pickerStyle: {
//         width: 110,
//         color: colors.whiteColor,
//     }
// })