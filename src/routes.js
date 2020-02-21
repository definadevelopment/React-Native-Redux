import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/Home/Home';
import LoginScreen from './screens/Login/Login';
import SignupScreen from './screens/Signup/Signup';

import DefaultScreen from './screens/DefaultScreen';

const userStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home',
    },
);

const AuthStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
        },
        SignupScreen: {
            screen: SignupScreen,
        }
    },
    {
        initialRouteName: 'LoginScreen',
        headerMode: 'none',
    },
);

const App = createSwitchNavigator(
    {
        AuthLoading: {
            screen: DefaultScreen,
        },
        App: {
            screen: userStack,
        },
        Auth: {
            screen: AuthStack,
        },
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

export default createAppContainer(App);
