import React, { memo, useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from "../components/TextInput";
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';

import {List, Title} from 'react-native-paper';

const OfferDetailScreen = ({ route,navigation }) => {

    const [email,setEmail] = useState("");

    const [role,setRole]= useState("");

    const getTokenFromStorageAsync = async () => {
        var value = await AsyncStorage.getItem('token')
        return value
      }

    useEffect(() => {
        fetch(API_URL+'/current_user',
          {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setRole(data.roles[0])
        }).catch((err) => {
          alert(err)
        });
      }, []);

  const sendInvitation = () => {
    fetch(API_URL+'/invitations', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
        },
        body: JSON.stringify({
          email: email,
          offer: "/offers/"+ route.params.offer.id
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        navigation.navigate('ListAnnounce');
    }).catch((err) => {
      alert(err);
    });

  };

  return (
    <ScrollView>
    <Background>
        <List.Section>
        <Title style={styles.title}>Titre du poste : { route.params.offer.name }</Title>
        <List.Subheader style={styles.taille}>Description de l'entreprise : { route.params.offer.companyDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Description de l'offre : { route.params.offer.offerDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Ville : { route.params.offer.place }</List.Subheader>
        <List.Subheader style={styles.taille}>Type de contrat : { route.params.offer.contractType }</List.Subheader>
        <List.Subheader style={styles.taille}>Date de début : { route.params.offer.beginAt.substring(0,10) }</List.Subheader>
     </List.Section>
     { role === 'ROLE_RECRUITER' &&
     <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />}
    { role === 'ROLE_RECRUITER' &&
      <Button mode="contained" onPress={() => sendInvitation()}>
              Envoyer l'offre
      </Button>}
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    taille: {
      width:300,
    },
    title: {
        width:300,
        borderWidth: 4,
        borderColor: "#20232a",
        marginTop: 16,
        paddingVertical: 8,
        textAlign: "center",

    }
  });


export default memo(OfferDetailScreen);
