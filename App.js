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
import ApplicationShowScreen from './src/screens/ApplicationShowScreen'

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Mot de passe oublié' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mon profil' }} />
          <Stack.Screen name="ListAnnounce" component={ListAnnounce} options={{ title: 'Liste des offres' }} />
          <Stack.Screen name="CreateOffer" component={CreateOffer} options={{ title: 'Créer une offre' }} />
          <Stack.Screen name="Token" component={TokenScreen} options={{ title: 'Accéder à une offre' }}/>
          <Stack.Screen name="Offer" component={OfferScreen} />
          <Stack.Screen name="FormCandidate" component={FormCandidateScreen} options={{ title: 'Formulaire Candidature' }} />
          <Stack.Screen name="OfferDetail" component={OfferDetailScreen} options={{ title: 'Offre' }} />
          <Stack.Screen name="ApplicationShow" component={ApplicationShowScreen} options={{ title: 'Candidature' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;
