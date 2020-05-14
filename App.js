/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ListAnnounce from './src/screens/ListAnnounce';
import CreateOffer from './src/screens/CreateOfferScreen';
import TokenScreen from "./src/screens/TokenScreen";
import OfferScreen from './src/screens/OfferScreen';
import FormCandidateScreen from "./src/screens/FormCandidateScreen";
import OfferDetailScreen from './src/screens/OfferDetailScreen';


const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ListAnnounce" component={ListAnnounce} />
          <Stack.Screen name="CreateOffer" component={CreateOffer} />
          <Stack.Screen name="Token" component={TokenScreen} />
          <Stack.Screen name="Offer" component={OfferScreen} />
          <Stack.Screen name="FormCandidate" component={FormCandidateScreen} />
          <Stack.Screen name="OfferDetail" component={OfferDetailScreen} />

        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
