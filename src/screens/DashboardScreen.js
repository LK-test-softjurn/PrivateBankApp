// imports external
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// imports internal
import { Table } from '../components/Table';
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../common/consts';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { MonthPicker } from '../components/MonthPicker';
import { YearPicker } from '../components/YearPicker';
import { STRINGS } from '../common/constsStrings';

class DashboardScreen extends React.Component {

    constructor() {
        super();

        this.year = new Date(Date.now()).getFullYear();
        this.month = new Date(Date.now()).getMonth();

        this.state = {
            showMonthPicker: false

        }
    }

    componentDidMount() {
        this.props?.getCurrencyAverageForGivenMonthRedux({month: this.month, year: this.year});
    }

    goToTheDetails = () => {
        this.props.navigation.navigate('CurrencyDetailsScreen');
    };

    onCloseMonthPicker = (value) => {
        this.setState({
            showMonthPicker: false
        });

        if (value !== null) {
            this.month = value;
            this.props?.setMonthRedux(value);
            this.props?.getCurrencyAverageForGivenMonthRedux({month: this.month, year: this.year});
        }
    }

    onCloseYearPicker = (value) => {
        const currentDate = Date.now();
        const currentYear = new Date(currentDate).getFullYear();
        const currentMonth = new Date(currentDate).getMonth();

        this.setState({
            showYearPicker: false
        });

        if (value !== null) {
            if(currentYear === value && this.props?.currency?.month > currentMonth) {
                this.month = currentMonth;
                this.props?.setMonthRedux(currentMonth);
            }
            
            this.year = value;
            this.props?.setYearRedux(value);
            this.props?.getCurrencyAverageForGivenMonthRedux({month: this.month, year: this.year});
        }
    }

    onCurrency = () => {
        console.log('Currency tapped');
    }
    
    onBuy = () => {
        console.log('Buy tapped');
    }
    
    onSell = () => {
        console.log('Sell tapped');
    }

    onRow = (value) => {
        console.log('Row tapped', value);
    }

    render() {
        console.log(`month: ${this.props?.currency.month}, year: ${this.props?.currency.year}`);
        return (
            <View style={styles.container}>
                <LinearGradient style={styles.gradientBackground}
                    colors={colors.grayGradient}
                    start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
                >
                    <SafeAreaView>
                        <View style={styles.screanTitleContainer}>
                            <Text style={theme.screanTitle}>{STRINGS.DASHBOARD_TITLE}</Text>
                        </View>
                        <View style={styles.selectorsContainer}>
                            <View style={styles.leftSelectorContainer}>
                            <View style={styles.selectorArrowBackground}/>
                                <TouchableOpacity onPress={() => { this.setState({ showMonthPicker: true }) }} style={styles.monthSelector}>
                                    
                                    <View style={styles.selectorTextContainer}>
                                        <Text style={[theme.whiteBoldText, {marginRight: 20}]}>{STRINGS.MONTHS[this.props?.currency?.month]}</Text>
                                    </View>
                                    <View style={styles.selectorArrowContainer}>
                                        <Icon name="arrow-drop-down" size={24} color={'#e6e6e6'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rightSelectorContainer}>
                            <View style={styles.selectorArrowBackground}/>
                            <TouchableOpacity onPress={() => { this.setState({ showYearPicker: true }) }} style={styles.monthSelector}>
                                    <View style={styles.selectorTextContainer}>
                                        <Text style={[theme.whiteBoldText, {marginRight: 20}]}>{this.props?.currency?.year}</Text>
                                    </View>
                                    <View style={styles.selectorArrowContainer}>
                                        <Icon name="arrow-drop-down" size={24} color={'#e6e6e6'} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Table headers={[STRINGS.CURRENCY, STRINGS.BUY, STRINGS.SELL]} 
                            data={this.props?.currency?.averageValues} 
                            onHeadersSelected={[this.onCurrency, this.onBuy, this.onSell]} 
                            onRowSelected={this.onRow}
                            sortable={false}/>

                        <View style={styles.labelTextContainer}>
                            <Text style={theme.whiteBoldText}>{STRINGS.DASHBOARD_TABLE_BOTTOM_LABEL}</Text>
                        </View>

                        {this.state.showMonthPicker === true ? (<View style={styles.modal}><MonthPicker onClose={this.onCloseMonthPicker}  year={this.props?.currency?.year} month={this.props?.currency?.month} /></View>) : null}
                        {this.state.showYearPicker === true ? (<View style={styles.modal}><YearPicker onClose={this.onCloseYearPicker} year={this.props?.currency?.year} /></View>) : null}
                        {this.props?.currency?.taskStatus === TASK_STATUS.PENDING ? (<View style={styles.activityIndicatorContainer}><ActivityIndicator size="large" color={colors.blueColor} /></View>) : null}
                    </SafeAreaView>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screanTitleContainer: {
        marginTop: 10,
        marginBottom: 80,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientBackground: {
        flex: 1,
    },
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
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        width: 40,
        backgroundColor: colors.blueColor,
    },
    selectorArrowContainer: {
        width: 30,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelTextContainer: {
        marginTop: 5,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const mapStateToProps = (state) => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyAverageForGivenMonthRedux: (value) => dispatch({
            type: CURRENCY_ACTION_TYPE.GET_AVERAGE_FOR_GIVEN_MONTH,
            value
        }),
        clearDataRedux: () => dispatch({
            type: CURRENCY_ACTION_TYPE.CLEAR_DATA
        }),
        setMonthRedux: (value) => dispatch({
            type: CURRENCY_ACTION_TYPE.SET_CHOSEN_MONTH,
            value
        }),
        setYearRedux: (value) => dispatch({
            type: CURRENCY_ACTION_TYPE.SET_CHOSEN_YEAR,
            value
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
