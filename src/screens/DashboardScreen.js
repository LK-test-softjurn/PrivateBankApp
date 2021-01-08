// imports external
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

// imports internal
import Table from '../components/Table';
import { CURRENCY_ACTION_TYPE } from '../common/consts';

class DashboardScreen extends React.Component {

    goToTheDetails = () => {
        this.props.navigation.navigate('CurrencyDetailsScreen');
    };

    render() {
        return (
                <View style={styles.container}>
                    <LinearGradient style={styles.gradientBackground}
                        colors={['#3d3d3d', '#353535', '#2b2b2b', '#1f1f1f','#1b1b1b', '#171717']} 
                        // colors={['#4c669f', '#3b5998', '#192f6a']}
                        start={{ x: 0.0, y: 0.3 }} end={{ x: 1.0, y: 1.0 }} 
                    >
                        <SafeAreaView>
                        <Text>DASHBOARD</Text>
                        <Table />
                        <TouchableOpacity onPress={() => this.goToTheDetails()} style={{ backgroundColor: '#ff0000' }}>
                            <Text>To the details</Text>
                        </TouchableOpacity>
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
    gradientBackground: {
        flex: 1,
    },
});


const mapStateToProps = (state) => {
    return {
        currency: state.currency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrencyAverageForGivenMonth: () => dispatch({
            type: CURRENCY_ACTION_TYPE.GET_AVERAGE_FOR_GIVEN_MONTH,
            value: 'SOME MONTH' // TODO
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
