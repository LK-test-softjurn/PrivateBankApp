// imports external
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// imports internal
import {
    CURRENCY_ACTION_TYPE,
    CURRENCY_DETAILS_ACTION_TYPE,
    TASK_STATUS,
    MESSAGE_BOX_TYPE,
    SORT_FIELD_TYPE
} from '../common/consts';
import { Table } from '../components/Table';
import { MessageBox } from '../components/MessageBox';
import { STRINGS } from '../common/constsStrings';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { PikerPanel } from '../components/PikerPanel';
import { MonthPicker } from '../components/MonthPicker';
import { YearPicker } from '../components/YearPicker';

class CurrencyDetailsScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            showMonthPicker: false,
            showYearPicker: false
        }
    }

    componentDidMount() {
        const { month, year } = this.props?.currency;

        this.props.getCurrencyDataForGivenMonthRedux(this.props.route?.params?.currency, month, year, SORT_FIELD_TYPE.DATE, false);
    }

    onCloseMonthPicker = (value) => {
        this.setState({
            showMonthPicker: false
        });

        if (value !== null) {
            this.props?.setMonthRedux(value);
            this.props?.getCurrencyDataForGivenMonthRedux(this.props.route?.params?.currency, value, this.props?.currency?.year, SORT_FIELD_TYPE.DATE, false);
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
            this.props?.setYearRedux(value);
            if (currentYear === value && this.props?.currency?.month > currentMonth) {
                this.props?.setMonthRedux(currentMonth);
                this.props?.getCurrencyDataForGivenMonthRedux(this.props.route.params.currency, currentMonth, value, SORT_FIELD_TYPE.DATE, false);
            } else {
                this.props?.getCurrencyDataForGivenMonthRedux(this.props.route.params.currency, this.props?.currency?.month, value, SORT_FIELD_TYPE.DATE, false);
            }
        }
    }

    goBack = () => {
        if (this.props?.currencyDetails?.taskStatus === TASK_STATUS.NONE) {
            this.props.navigation.goBack();
        }
    }

    onCloseErrorMessageBox = () => {
        this.props?.clearErrorRedux()
    }

    onDate = (value) => {
        this.props?.getCurrencyDataForGivenMonthRedux(this.props.route.params.currency, this.props?.currency?.month, this.props?.currency?.year, SORT_FIELD_TYPE.DATE, value);
    }

    onBuy = (value) => {
        this.props?.getCurrencyDataForGivenMonthRedux(this.props.route.params.currency, this.props?.currency?.month, this.props?.currency?.year, SORT_FIELD_TYPE.BUY, value);
    }

    onSell = (value) => {
        this.props?.getCurrencyDataForGivenMonthRedux(this.props.route.params.currency, this.props?.currency?.month, this.props?.currency?.year, SORT_FIELD_TYPE.SELL, value);
    }

    onYearPiker = () => {
        if (this.props?.currencyDetails?.taskStatus === TASK_STATUS.NONE) {
            this.setState({ showYearPicker: true })
        }
    }

    onMonthPiker = () => {
        if (this.props?.currencyDetails?.taskStatus === TASK_STATUS.NONE) {
            this.setState({ showMonthPicker: true })
        }
    }

    render() {

        return (<View style={styles.container}>

            <SafeAreaView>
                <View style={styles.screanTitleContainer}>
                    <TouchableOpacity onPress={() => this.goBack()} style={styles.headerButtonContainer}>
                        <Icon name="arrow-left" size={32} color={colors.whiteColor} />
                        <Text style={theme.whiteBoldText}>{STRINGS.BACK}</Text>
                    </TouchableOpacity>
                    <Text style={theme.screanTitle}>{this.props.route.params.currency}</Text>
                    <View style={styles.headerButtonContainer} />
                </View>
                <PikerPanel month={this.props?.currency?.month} year={this.props?.currency?.year} onYearPiker={this.onYearPiker} onMonthPiker={this.onMonthPiker} />
                <View style={styles.tableContainer}>
                    <Table headers={[STRINGS.DATE, STRINGS.BUY, STRINGS.SELL]}
                        data={this.props?.currencyDetails?.dailyValues}
                        onHeadersSelected={[this.onDate, this.onBuy, this.onSell]}
                        sortable={true} />
                </View>
            </SafeAreaView>

            {this.state.showMonthPicker === true ? (<View style={styles.modal}><MonthPicker onClose={this.onCloseMonthPicker} year={this.props?.currency?.year} month={this.props?.currency?.month} /></View>) : null}
            {this.state.showYearPicker === true ? (<View style={styles.modal}><YearPicker onClose={this.onCloseYearPicker} year={this.props?.currency?.year} /></View>) : null}
            {this.props?.currencyDetails?.taskStatus === TASK_STATUS.PENDING ? (<View style={styles.activityIndicatorContainer}><ActivityIndicator size="large" color={colors.greenColor} /></View>) : null}
            {this.props?.currencyDetails?.taskStatus === TASK_STATUS.ERROR ? (<MessageBox type={MESSAGE_BOX_TYPE.ERROR} header={STRINGS.MESSAGE_BOX_ERROR_HEADER} text={STRINGS.MESSAGE_BOX_ERROR_SERVER_COMMUNICATION} onClose={this.onCloseErrorMessageBox} />) : null}
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.liteGrayColor
    },
    activityIndicatorContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableContainer: {
        height: '60%'
    },
    screanTitleContainer: {
        marginTop: 10,
        marginBottom: 80,
        marginVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
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
    headerButtonContainer: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    }
})

const mapStateToProps = (state) => {
    return {
        currencyDetails: state.currencyDetails,
        currency: state.currency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyDataForGivenMonthRedux: (currency, month, year, sortByField, asc) => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY,
            value: { currency, month, year, sortByField, asc }
        }),
        clearDataRedux: () => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_DATA
        }),
        setMonthRedux: (value) => dispatch({
            type: CURRENCY_ACTION_TYPE.SET_CHOSEN_MONTH,
            value
        }),
        setYearRedux: (value) => dispatch({
            type: CURRENCY_ACTION_TYPE.SET_CHOSEN_YEAR,
            value
        }),
        clearErrorRedux: () => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_ERROR,
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetailsScreen);
