import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { API_URL } from 'react-native-dotenv';

import AsyncStorage from '@react-native-community/async-storage';

const CreateOfferScreen = ({ navigation }) => {


  const [libelle,setLibelle]= useState("");
  const [companyDescription,setCompanyDescription]= useState("");
  const [offerDescription,setOfferDescription]= useState("");
  const [beginAt,setBeginAt]= useState("");
  const [contractType,setContractType]= useState("");
  const [place,setPlace]= useState("");



  const getTokenFromStorageAsync = async () => {
    var value = await AsyncStorage.getItem('token')
    return value
  }

  const createOffer = () => {

    if(libelle === "" || companyDescription === "" || beginAt === ""){
      return alert("Veuillez remplir tout les champs requis.");
    }

    fetch(API_URL+'/offers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
      },
      body: JSON.stringify({
        name: libelle,
        companyDescription: companyDescription,
        offerDescription: offerDescription,
        beginAt: beginAt,
        contractType: contractType,
        place: place
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      navigation.navigate('ListAnnounce')
    }).catch((err) => {
      alert(err);
    });
  };

  return (
    <ScrollView>
    <Background>
      <TextInput
        label="Libelle"
        returnKeyType="next"
        onChangeText={(text) => setLibelle(text)}
      />

        <TextInput
          label="Description de l'entreprise"
          returnKeyType="next"
          onChangeText={(text) => setCompanyDescription(text)}
        />
        <TextInput
          label="Description de l'offre"
          returnKeyType="next"
          onChangeText={(text) => setOfferDescription(text)}
        />

     <TextInput
          label="Lieu"
          returnKeyType="next"
          onChangeText={(text) => setPlace(text)}
        />
        <TextInput
        label="Type de contrat"
        onChangeText={(text) => setContractType(text)}
        />
        <TextInput
        label="Date de début"
        onChangeText={(text) => setBeginAt(text)}
        />


      <Button mode="contained"  onPress={() => createOffer()} >
        Valider
      </Button>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.recruteurary,
  },
  bk: {
    flex: 1,
    width: '100%'
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(CreateOfferScreen);
