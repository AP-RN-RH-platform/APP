import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {RadioButton, List, Title} from "react-native-paper";
import Button from '../components/Button';
import Background from "../components/Background";
import { API_URL } from 'react-native-dotenv';


const ApplicationShowScreen = ({route, navigation}) => {

  const applicationId = route.params.applicationId;
  const [application, setApplication] = useState({})
  const [checked, setChecked] = useState(null)
  const [role,setRole]= useState("");

  const getTokenFromStorageAsync = async () => {
    return await AsyncStorage.getItem('token')
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
          setRole(data.roles)
      }).catch((err) => {
          alert(err);
      });
    }, []);

  const updateApplication = async () => {
    console.log("checked : ",checked);
    if(checked === null) {
      return;
    }
    fetch(API_URL+`/applications/${applicationId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
        },
        body: JSON.stringify({status: checked})
      }).then((response) => {
        const status = response.status;
        if (status === 200) {
          navigation.navigate('OfferDetail', { id: application.id })
        }
        else {
          response.json().then((data) => {
            console.log(data);
            alert(data.detail);
          })
        }
      });

  }


  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch(API_URL+`/applications/${applicationId}`,
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


        { role.includes("ROLE_RECRUITER") &&
        <>
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
        </>
        }
        <Button mode="contained" onPress={updateApplication}>
          Mettre à jour le status
        </Button>
      </Background>
    </ScrollView>
  )


}

export default ApplicationShowScreen
