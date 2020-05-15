import React, {memo, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from "../components/TextInput";
import AsyncStorage from '@react-native-community/async-storage';

import {List, Title} from 'react-native-paper';

const OfferDetailScreen = ({ route,navigation }) => {

    const [email,setEmail] = useState("");

    const [role,setRole]= useState("");

    const [offer, setOffer] = useState(null);

    const getTokenFromStorageAsync = async () => {
      return await AsyncStorage.getItem('token')
    }

    useEffect(() => {
        fetch('https://localhost:8443/current_user',
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
          });
      }, []);

    useEffect(() => {
        fetch('https://localhost:8443/offers/' + route.params.id,
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
            setOffer(data)
            console.log("OFFER DETAIL SCREEN", data)
          });
      }, []);



  const sendInvitation = () => {
    fetch('https://localhost:8443/invitations', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
        },
        body: JSON.stringify({
          email: email,
          offer: "/offers/"+ offer.id
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
      {
        offer &&
        <List.Section>
          <Title style={styles.title}>Titre du poste : { offer.name }</Title>
          <List.Subheader style={styles.taille}>Description de l'entreprise : { offer.companyDescription }</List.Subheader>
          <List.Subheader style={styles.taille}>Description de l'offre : { offer.offerDescription }</List.Subheader>
          <List.Subheader style={styles.taille}>Ville : { offer.place }</List.Subheader>
          <List.Subheader style={styles.taille}>Type de contrat : { offer.contractType }</List.Subheader>
          <List.Subheader style={styles.taille}>Date de début : { offer.beginAt.substring(0,10) }</List.Subheader>
        </List.Section>
      }

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
      </Button>
    }
    {offer && offer.applications ? <Text>Liste des candidatures : </Text> : <Text>""</Text>}
    {offer && offer.applications && offer.applications.map((application, index) =>
      <Text key={index} onPress={() => { navigation.navigate('ApplicationShow', {'applicationId': application.id}) }}>{`${application.firstname} ${application.lastname} - ${application.status}`}</Text>
    )}
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
