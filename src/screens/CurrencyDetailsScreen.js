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
import LinearGradient from 'react-native-linear-gradient';

// imports internal
import { CURRENCY_DETAILS_ACTION_TYPE, TASK_STATUS, MESSAGE_BOX_TYPE } from '../common/consts';
import { MessageBox } from '../components/MessageBox';
import { STRINGS } from '../common/constsStrings';
import { theme } from '../../styles/theme';
import { colors } from '../../styles/colors';

class CurrencyDetailsScreen extends React.Component {

    componentDidMount() {
        // TODO
        // this.props?.getCurrencyDataForGivenMonth('10.11.2020', 'PLZ');
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    onClose = () => {
        this.props?.clearError()
    }

    render() {
        console.log(this.props?.currencyDetails?.taskStatus)
        return (<View style={styles.container}>
            <LinearGradient style={styles.gradientBackground}
                colors={colors.grayGradient}
                // colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }}
            >
                <SafeAreaView>
                    <Text>Details</Text>
                    {this.props?.currencyDetails?.dailyValues?.map((item, index) => {
                        return (<View key={`${index}`} style={{ flexDirection: 'row' }}><Text>{item?.date} </Text><Text>{item?.saleRateNB} </Text><Text>{item?.purchaseRateNB} </Text></View>)
                    })}
                    <TouchableOpacity onPress={() => this.goBack()} style={theme.buttonBlue}>
                        <Text style={theme.whiteText}>GoBack</Text>
                    </TouchableOpacity>
                    {this.props?.currencyDetails?.taskStatus === TASK_STATUS.PENDING ? (<View style={styles.activityIndicatorContainer}><ActivityIndicator size="large" color={colors.blueColor} /></View>) : null}
                    {this.props?.currencyDetails?.taskStatus === TASK_STATUS.ERROR ? (<MessageBox type={MESSAGE_BOX_TYPE.ERROR} header={STRINGS.MESSAGE_BOX_ERROR_HEADER} text={STRINGS.MESSAGE_BOX_ERROR_SERVER_COMMUNICATION} onClose={this.onClose} />) : null}
                    {this.props?.currencyDetails?.taskStatus === TASK_STATUS.ACCOMPLISHED ? (<MessageBox type={MESSAGE_BOX_TYPE.INFO} header={STRINGS.MESSAGE_BOX_ERROR_HEADER} text={STRINGS.MESSAGE_BOX_ERROR_SERVER_COMMUNICATION} onClose={this.onClose} />) : null}
                </SafeAreaView>
            </LinearGradient>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
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
})

const mapStateToProps = (state) => {
    return {
        currencyDetails: state.currencyDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyDataForGivenMonth: (month, currency) => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY,
            value: { month: 'SOME MONTH', currency: 'SOME CURENCY' } // TODO
        }),
        clearData: () => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_DATA
        }),
        clearError: () => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.CLEAR_ERROR
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetailsScreen);
