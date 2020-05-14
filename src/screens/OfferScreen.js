import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';

import { List } from 'react-native-paper';
import { Title } from 'react-native-paper';

const OfferScreen = ({ route,navigation }) => {


  const applyOffer = () => {



    //   fetch('https://localhost:8443/media_objects', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: createFormData(picture)
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });


  };

  return (
    <ScrollView>
    <Background>
        <List.Section>
            <Title style={styles.title}>Titre du poste: { route.params.data.name }</Title>
        <List.Subheader style={styles.taille}>Description de l'entreprise : { route.params.data.companyDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Description de l'offre : { route.params.data.offerDescription }</List.Subheader>
        <List.Subheader style={styles.taille}>Ville : { route.params.data.place }</List.Subheader>
        <List.Subheader style={styles.taille}>Type de contrat : { route.params.data.contractType }</List.Subheader>
        <List.Subheader style={styles.taille}>Date de début : { route.params.data.beginAt.substring(0,10) }</List.Subheader>
     </List.Section>
      <Button mode="contained" onPress={() => navigation.navigate('FormCandidate')}>
              Valider
      </Button>
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


export default memo(OfferScreen);
