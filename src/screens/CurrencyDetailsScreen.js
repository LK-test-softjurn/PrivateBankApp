// imports external
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// imports internal
import {CURRENCY_DETAILS_ACTION_TYPE } from '../common/consts';

class CurrencyDetailsScreen extends React.Component {

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return(<View>
            <Text>Details</Text>
            <TouchableOpacity onPress={()=>this.goBack()} style={{backgroundColor: '#ff0000'}}>
                <Text>GoBack</Text>
            </TouchableOpacity>
            </View>)
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyDataForGivenMonth: () => dispatch({
            type: CURRENCY_DETAILS_ACTION_TYPE.GET_DATA_FOR_GIVEN_MONTH_BY_CURRENCY,
            value: {month: 'SOME MONTH', currency: 'SOME CURENCY'} // TODO
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDetailsScreen);
