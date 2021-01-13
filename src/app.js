// imports external
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

// imports internal 
import DashboardScreen from './screens/DashboardScreen';
import CurrencyDetailsScreen from './screens/CurrencyDetailsScreen';
import { colors } from '../styles/colors';
import { NAVIGATOR_SCREENS } from './common/consts';
import { store } from './redux/store';

const Stack = createStackNavigator();

const App: (props) => ReactNative = () => {
    
    useEffect(() => {

    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
            <Stack.Navigator initialRouteName={NAVIGATOR_SCREENS.DASHBOARD}
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: colors.liteGrayColor },
                }}
            >
                <Stack.Screen name={NAVIGATOR_SCREENS.DASHBOARD} component={DashboardScreen} />
                <Stack.Screen name={NAVIGATOR_SCREENS.CURRENCY_DETAILS} component={CurrencyDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    );
}

export default App;