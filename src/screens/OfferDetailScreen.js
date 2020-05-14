import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from "../components/TextInput";

import { List } from 'react-native-paper';

const OfferDetailScreen = ({ route,navigation }) => {

    const [email,setEmail] = useState("");



  const sendInvitation = () => {
    fetch('https://localhost:8443/invitations', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
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
        });

  };

  return (
    <ScrollView>
    <Background>
        <List.Section>
        <List.Subheader style={styles.taille}>Offre : { route.params.offer.name }</List.Subheader>
        <List.Subheader style={styles.taille}>Description de l'entreprise : { route.params.offer.companyDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Description de l'offre : { route.params.offer.offerDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Poste : { route.params.offer.place }</List.Subheader>
        <List.Subheader style={styles.taille}>Type de contrat : { route.params.offer.contractType }</List.Subheader>
        <List.Subheader style={styles.taille}>Date de début : { route.params.offer.beginAt.substring(0,10) }</List.Subheader>
     </List.Section>
     <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />
      <Button mode="contained" onPress={() => sendInvitation()}>
              Envoyer l'offre
      </Button>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    taille: {
      width:300,
    }
  });


export default memo(OfferDetailScreen);
