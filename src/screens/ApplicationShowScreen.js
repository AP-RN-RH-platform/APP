import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {RadioButton, List, Title} from "react-native-paper";
import Button from '../components/Button';
import Background from "../components/Background";


const ApplicationShowScreen = ({route, navigation}) => {

  const applicationId = route.params.applicationId;
  const [application, setApplication] = useState({})
  const [checked, setChecked] = useState(null)

  const getTokenFromStorageAsync = async () => {
    return await AsyncStorage.getItem('token')
  }

  const updateApplication = async () => {
    if(checked === null) {
      return;
    }
    const response = await fetch(`https://localhost:8443/applications/${applicationId}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/ld+json',
          'Content-Type': 'application/merge-patch+json',
          'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
        },
        body: JSON.stringify({status: checked})
      });
    const status = response.status;
    if (status === 200) {
      navigation.navigate('OfferDetail', { id: application.id })
    }

  }


  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch(`https://localhost:8443/applications/${applicationId}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
          }
        });
      const data = await response.json();
      const {status} = data;
      setApplication(data);
      setChecked(status);
    }
    fetchData();
  }, [])




  return (
    <ScrollView>
      <Background>
        <List.Section>
          <List.Subheader>Prénom : {application.firstname}</List.Subheader>
          <List.Subheader>Nom : {application.lastname}</List.Subheader>
          {application.sex ? <List.Subheader>Genre : Homme</List.Subheader> : <List.Subheader>Genre : Femme</List.Subheader>}
          <List.Subheader>Age : {application.age}</List.Subheader>
          <List.Subheader>Ville : {application.city}</List.Subheader>
          <List.Subheader>Adresse : {application.address}</List.Subheader>
          <List.Subheader>Prétention salariale : {application.expectedSalary} euros</List.Subheader>
          <List.Subheader>Status : {application.status}</List.Subheader>
          <List.Subheader>Email : {application.email}</List.Subheader>
          <List.Subheader>Motivations : {application.motives}</List.Subheader>
        </List.Section>

        <Text>Mettre à jour l'état</Text>
        <View>
          <Text>RDV Fixé</Text>
          <RadioButton
            value="first"
            status={checked === 'RDV fixé' ? 'checked' : 'unchecked'}
            onPress={() => { setChecked('RDV fixé') }}
          />
          <Text>Accepté</Text>
          <RadioButton
            value="first"
            status={checked === 'Accepté' ? 'checked' : 'unchecked'}
            onPress={() => { setChecked('Accepté') }}
          />
          <Text>Refusé</Text>
          <RadioButton
            value="first"
            status={checked === 'Refusé' ? 'checked' : 'unchecked'}
            onPress={() => { setChecked('Refusé') }}
          />
        </View>
        <Button mode="contained" onPress={updateApplication}>
          Mettre à jour le status
        </Button>
      </Background>
    </ScrollView>
  )


}

export default ApplicationShowScreen
