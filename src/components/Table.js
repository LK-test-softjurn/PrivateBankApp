// imports external
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// imports internal
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';

export const Table = ({ headers, data, onHeadersSelected, onRowSelected, sortable }) => {
    const PRESET_COLUMNS = 3;
    const NONE = -1;

    const [columns, setColumns] = useState(PRESET_COLUMNS)
    const [dataToShow, setDataToShow] = useState([]);
    const [currentColumnSelected, setCurrentColumnSelected] = useState(NONE);
    const [sortDesc, setSortDesc] = useState(true);

    useEffect(() => {

        if (data !== undefined && data !== null && headers !== undefined && headers !== null) {

            const headersCount = headers.length;
            const dataCount = data.length;

            if (headersCount !== PRESET_COLUMNS) {
                setColumns(headersCount);
            }

            const tempTable = [];

            for (let i = 0; i < headersCount; i++) {
                tempTable.push({ value: headers[i], id: `h${i}` })
            }

            for (let i = 0; i < dataCount; i++) {
                for (const property in data[i]) {
                    tempTable.push({ value: data[i][property], id: `d${i}` });
                }
            }

            setDataToShow([...tempTable]);
        }

    }, []);

    const onSelectedColumn = (column) => {
        setCurrentColumnSelected(column);
        setSortDesc(!sortDesc);
    }

    const renderItem = ({ item, index }) => {
        const headersCallBacks = onHeadersSelected?.length;
        const curentColumn = index % columns;

        if (index < columns) {
            if (sortable === false) {
                return (<View style={[styles.headerItemStyle, { flex: index === 0 ? 2 : 1 }]}>
                    <Text style={theme.whiteBoldText}>{item.value}</Text>
                </View>)
            } else {
                return (<View style={[styles.headerItemStyle, { flex: index === 0 ? 2 : 1 }]}>
                    <TouchableOpacity onPress={() => {onHeadersSelected[index](); onSelectedColumn(index)}} >
                        <View style={{flexDirection: 'row'}}>
                            <Text style={theme.whiteBoldText}>{item.value}</Text>
                            {curentColumn === currentColumnSelected ? (<Icon name={sortDesc === true ? "arrow-drop-down" : "arrow-drop-up"} size={24} color={'#e6e6e6'} />) : null }
                        </View>
                    </TouchableOpacity>
                </View >)
            }
        } else {        
            return (<View style={[styles.dataItemStyle, { borderRightWidth: curentColumn < columns ? 0 : 1, flex: curentColumn === 0 ? 2 : 1 }]}>
                <TouchableOpacity onPress={() => onRowSelected(Math.floor(index / columns))}>
                    <Text style={theme.whiteBoldText}>{item.value}</Text>
                </TouchableOpacity>
            </View>)
        }
    }

    return (<View style={styles.container}>
        <FlatList
            style={styles.flatList}
            data={dataToShow}
            renderItem={renderItem}
            numColumns={columns}
            horizontal={false}
            keyExtractor={item => item.id}
        />
    </View>)

}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        alignSelf: 'stretch',
        backgroundColor: colors.modalBackgroundColor
    },
    flatList: {
        alignSelf: 'stretch'
    },
    headerItemStyle: {
        margin: 0,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.blueColor,
        backgroundColor: colors.blueColor,
    },
    dataItemStyle: {
        margin: 0,
        padding: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: colors.blueColor
    }
})
