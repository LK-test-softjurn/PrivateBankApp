// imports external
import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

// imports internal
import { Table } from '../components/Table';
import {
    CURRENCY_ACTION_TYPE,
    MESSAGE_BOX_TYPE,
    TASK_STATUS,
    NAVIGATOR_SCREENS
} from '../common/consts';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { MonthPicker } from '../components/MonthPicker';
import { YearPicker } from '../components/YearPicker';
import { STRINGS } from '../common/constsStrings';
import { PikerPanel } from '../components/PikerPanel';
import { MessageBox } from '../components/MessageBox';

class DashboardScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            showMonthPicker: false,
            showYearPicker: false
        }
    }

    componentDidMount() {
        this.props?.getCurrencyAverageForGivenMonthRedux(this.props?.currency?.month, this.props?.currency?.year);
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                this.props?.getCurrencyAverageForGivenMonthRedux(this.props?.currency?.month, this.props?.currency?.year);
            }
        );
    }

    componentWillUnmount() {
        if(this.willFocusSubscription) {
            this?.willFocusSubscription();
        }
    }

    onCloseMonthPicker = (value) => {
        this.setState({
            showMonthPicker: false
        });

        if (value !== null) {
            this.props?.setMonthRedux(value);
            this.props?.getCurrencyAverageForGivenMonthRedux(value, this.props?.currency?.year);
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
                this.props?.getCurrencyAverageForGivenMonthRedux(currentMonth, value);
            } else {
                this.props?.getCurrencyAverageForGivenMonthRedux(this.props?.currency?.month, value);
            }
        }
    }

    onRow = (value) => {

        if (this.props?.currency?.averageValues?.length > value) {
            this.props.navigation.navigate(NAVIGATOR_SCREENS.CURRENCY_DETAILS,
                {
                    currency: this.props?.currency?.averageValues[value].currency,
                    month: this.props?.currency?.month,
                    year: this.props?.currency?.year
                });
        }
    }

    onYearPiker = () => {
        if(this.props?.currency?.taskStatus === TASK_STATUS.NONE) {
            this.setState({ showYearPicker: true })
        }
    }

    onMonthPiker = () => {
        if(this.props?.currency?.taskStatus === TASK_STATUS.NONE) {
            this.setState({ showMonthPicker: true })
        }
    }

    onCloseErrorMessageBox = () => {
        this.props?.clearErrorRedux()
    }

    render() {

        return (
            <View style={styles.container}>

                <SafeAreaView>
                    <View style={styles.screanTitleContainer}>
                        <Text style={theme.screanTitle}>{STRINGS.DASHBOARD_TITLE}</Text>
                    </View>
                    <PikerPanel month={this.props?.currency?.month} year={this.props?.currency?.year} onYearPiker={this.onYearPiker} onMonthPiker={this.onMonthPiker} />

                    <Table headers={[STRINGS.CURRENCY, STRINGS.BUY, STRINGS.SELL]}
                        data={this.props?.currency?.averageValues}
                        onRowSelected={this.onRow}
                        sortable={false} />

                    <View style={styles.labelTextContainer}>
                        <Text style={theme.whiteBoldText}>{STRINGS.DASHBOARD_TABLE_BOTTOM_LABEL}</Text>
                    </View>

                </SafeAreaView>

                {this.state.showMonthPicker === true ? (<View style={styles.modal}><MonthPicker onClose={this.onCloseMonthPicker} year={this.props?.currency?.year} month={this.props?.currency?.month} /></View>) : null}
                {this.state.showYearPicker === true ? (<View style={styles.modal}><YearPicker onClose={this.onCloseYearPicker} year={this.props?.currency?.year} /></View>) : null}
                {this.props?.currency?.taskStatus === TASK_STATUS.PENDING ? (<View style={styles.activityIndicatorContainer}><ActivityIndicator size="large" color={colors.greenColor} /></View>) : null}
                {this.props?.currency?.taskStatus === TASK_STATUS.ERROR ? (<MessageBox type={MESSAGE_BOX_TYPE.ERROR} header={STRINGS.MESSAGE_BOX_ERROR_HEADER} text={STRINGS.MESSAGE_BOX_ERROR_SERVER_COMMUNICATION} onClose={this.onCloseErrorMessageBox} />) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.liteGrayColor
    },
    screanTitleContainer: {
        marginTop: 10,
        marginBottom: 80,
        marginVertical: 20,
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
        getCurrencyAverageForGivenMonthRedux: (month, year) => dispatch({
            type: CURRENCY_ACTION_TYPE.GET_AVERAGE_FOR_GIVEN_MONTH,
            value: { month, year }
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
        }),
        clearErrorRedux: () => dispatch({
            type: CURRENCY_ACTION_TYPE.CLEAR_ERROR,
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
