// imports external
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

// imports internal 
import DashboardScreen from './screens/DashboardScreen';
import CurrencyDetailsScreen from './screens/CurrencyDetailsScreen';
import { store } from './redux/store';

const Stack = createStackNavigator();

const App: (props) => ReactNative = () => {
    
    useEffect(() => {

    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
            <Stack.Navigator initialRouteName="DashboardScreen"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
                <Stack.Screen name="CurrencyDetailsScreen" component={CurrencyDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    );
}

export default App;