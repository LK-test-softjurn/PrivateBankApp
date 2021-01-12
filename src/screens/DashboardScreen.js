// imports external
import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

// imports internal
import { Table } from '../components/Table';
import { CURRENCY_ACTION_TYPE, TASK_STATUS } from '../common/consts';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';
import { MonthPicker } from '../components/MonthPicker';
import { YearPicker } from '../components/YearPicker';
import { STRINGS } from '../common/constsStrings';
import { PikerPanel } from '../components/PikerPanel';

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
            if (currentYear === value && this.props?.currency?.month > currentMonth) {
                this.props?.setMonthRedux(currentMonth);
            }

            this.props?.setYearRedux(value);
            this.props?.getCurrencyAverageForGivenMonthRedux(this.props?.currency?.month, value);
        }
    }

    onRow = (value) => {

        if (this.props?.currency?.averageValues?.length > value) {
            this.props.navigation.navigate('CurrencyDetailsScreen',
                {
                    currency: this.props?.currency?.averageValues[value].currency,
                    month: this.props?.currency?.month,
                    year: this.props?.currency?.year
                });
        }
    }

    onYearPiker = () => {
        this.setState({ showYearPicker: true })
    }

    onMonthPiker = () => {
        this.setState({ showMonthPicker: true })
    }

    render() {

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
                        <PikerPanel month={this.props?.currency?.month} year={this.props?.currency?.year} onYearPiker={this.onYearPiker} onMonthPiker={this.onMonthPiker} />

                        <Table headers={[STRINGS.CURRENCY, STRINGS.BUY, STRINGS.SELL]}
                            data={this.props?.currency?.averageValues}
                            // onHeadersSelected={[this.onCurrency, this.onBuy, this.onSell]}
                            onRowSelected={this.onRow}
                            sortable={false} />

                        <View style={styles.labelTextContainer}>
                            <Text style={theme.whiteBoldText}>{STRINGS.DASHBOARD_TABLE_BOTTOM_LABEL}</Text>
                        </View>


                    </SafeAreaView>
                </LinearGradient>
                {this.state.showMonthPicker === true ? (<View style={styles.modal}><MonthPicker onClose={this.onCloseMonthPicker} year={this.props?.currency?.year} month={this.props?.currency?.month} /></View>) : null}
                        {this.state.showYearPicker === true ? (<View style={styles.modal}><YearPicker onClose={this.onCloseYearPicker} year={this.props?.currency?.year} /></View>) : null}
                        {this.props?.currency?.taskStatus === TASK_STATUS.PENDING ? (<View style={styles.activityIndicatorContainer}><ActivityIndicator size="large" color={colors.blueColor} /></View>) : null}
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
            value : { month, year }
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
