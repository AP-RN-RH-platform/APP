import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import AsyncStorage from "@react-native-community/async-storage";
import RNFetchBlob from 'rn-fetch-blob';

import ImagePicker from 'react-native-image-picker'

import { RadioButton, List } from 'react-native-paper';
import { API_URL } from 'react-native-dotenv';

const RegisterScreen = ({ navigation }) => {

  const [checked, setChecked] = useState('candidat');
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [confirmPassword,setConfirmPassword]= useState("");
  const [firstname,setFirstname]= useState("");
  const [lastname,setLastName]= useState("");
  const [gender,setGender]= useState("homme");
  const [picture,setPicture]= useState(null);
  const [address,setAddress]= useState("");
  const [city,setCity]= useState("");

  const getTokenFromStorageAsync = async () => {
      var value = await AsyncStorage.getItem('token')
      return value
  }

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPicture(response)
      }
    })
  }

  const register = () => {

    if(password === "" || confirmPassword === "" || email === ""){
      return alert("Veuillez remplir tout les champs requis.");
    }
    if(password !== confirmPassword){
      return alert("Les deux mot de passe ne correspondent pas.");
    }

    if(checked === "candidat"){
      if(picture !== null){
        RNFetchBlob.fetch('POST', API_URL+'/media_objects', {
              Authorization : 'Bearer ' + getTokenFromStorageAsync(),
              'Content-Type' : 'multipart/form-data',
        }, [{ name : 'file', filename : picture.fileName, type: picture.type, data:RNFetchBlob.wrap(picture.uri)},
        ]).then((response) => {
          const res = response.json();
          const photo_iri = res.id ? "/media_objects/"+res.id : null;
          fetch(API_URL+'/users', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              firstname:firstname,
              lastname:lastname,
              genre:gender,
              photo:photo_iri,
              address:address,
              city:city,
              roles: [
                "ROLE_APPLICANT"
              ]
            })
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            navigation.navigate('Login')
          }).catch((err) => {
            alert(err.message)
          });
        }).catch((err) => {
          alert(err.message)
        });
      } else {
        fetch(API_URL+'/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstname:firstname,
            lastname:lastname,
            genre:gender,
            photo:"",
            address:address,
            city:city,
            roles: [
              "ROLE_APPLICANT"
            ]
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('Login')
        }).catch((err) => {
          alert(err.message)
        });
      }
    } else {
      fetch(API_URL+'/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          roles:["ROLE_RECRUITER"]
        })
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('Login')
      })
      .catch((err) => {
        alert(err.message);
      });
    }

  };

  return (
    <ScrollView>
    <Background>
        <List.Section >
        <List.Subheader>Creer un compte</List.Subheader>
        <List.Item
          title="Candidat"
          left={() => 
            <RadioButton
            value="candidat"
            status={checked === 'candidat' ? 'checked' : 'unchecked'}
            onPress={() => { setChecked('candidat') }}
          />}
       />
        <List.Item
          title="Recruteur"
          left={() => 
          <RadioButton
            value="recruteur"
            status={checked === 'recruteur' ? 'checked' : 'unchecked'}
            onPress={() => { setChecked('recruteur'); }}
          />}
       />
     </List.Section>
      <TextInput
        label="Email"
        returnKeyType="next"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      { checked === 'candidat' && 
        <View style={styles.bk}>
        <TextInput
          label="Prénom"
          returnKeyType="next"
          textContentType="name"
          onChangeText={(text) => setFirstname(text)}
        />
        <TextInput
          label="Nom"
          returnKeyType="next"
          textContentType="familyName"
          onChangeText={(text) => setLastName(text)}
        />
                <List.Section >
        <List.Subheader>Genre</List.Subheader>
        <List.Item
          title="Homme"
          left={() => 
            <RadioButton
            value="homme"
            status={gender === 'homme' ? 'checked' : 'unchecked'}
            onPress={() => { setGender('homme') }}
          />}
       />
        <List.Item
          title="Femme"
          left={() => 
          <RadioButton
            value="femme"
            status={gender === 'femme' ? 'checked' : 'unchecked'}
            onPress={() => { setGender('femme'); }}
          />}
       />
     </List.Section>
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {picture && (
          <Image
            source={{ uri: picture.uri }}
            style={{ width: 150, height: 150 }}
          />
        )}
       
     <Button mode="contained" onPress={() => handleChoosePhoto()} >  Choisissez une photo </Button>
      </View>
        <TextInput
          label="Adresse"
          returnKeyType="next"
          textContentType="fullStreetAddress"
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          label="Ville"
          returnKeyType="next"
          autoCapitalize="none"
          textContentType="location"
          onChangeText={(text) => setCity(text)}
        />
       
        </View>

    }
     <TextInput
          label="Mot de passe"
          returnKeyType="next"
          secureTextEntry
          textContentType="password"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
        label="Confirmation mot de passe"
        returnKeyType="done"
        secureTextEntry
        textContentType="password"
        onChangeText={(text) => setConfirmPassword(text)}
  />


      <Button mode="contained"  onPress={() => register()} >
        Valider
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Déjà inscrit? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Se connecter</Text>
        </TouchableOpacity>
      </View>
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

export default memo(RegisterScreen);
