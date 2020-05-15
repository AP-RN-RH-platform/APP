import React, { memo, useState, useEffect } from 'react';
import  ListItem  from '../components/ListItem';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { Surface } from 'react-native-paper';
import Background from '../components/Background';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const ListAnnounce = ({ navigation }) => {
  const [offers, setOffers] = useState([])

  const getTokenFromStorageAsync = async () => {
    var value = await AsyncStorage.getItem('token')
    return value
  }
  //console.log(getTokenFromStorageAsync());

  const getOffersUser =  async() => {
  fetch('https://localhost:8443/offers', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
    },
  }
  ).then((response) => response.json())
   .then((data) => {
    console.log(data)
    setOffers(data);

  });
};


    useEffect(() => {
      // Met à jour le titre du document via l’API du navigateur
      getOffersUser();
    },[]);




  return(

    <ScrollView>
     { offers.map( (offer,i) =>
     <TouchableOpacity onPress={() => navigation.navigate('OfferDetail',{
      id: offer.id
    })}>
     <ListItem key={offer.id} children={{'title':offer.name, 'company':offer.companyDescription, 'offerdesc':offer.offerDescription, 'place':offer.place,"type":offer.type}}/>
     </TouchableOpacity>
    )}
    </ScrollView>
    )



};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default memo(ListAnnounce);

