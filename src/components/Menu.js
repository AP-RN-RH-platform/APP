import React, {useContext} from 'react';
import { AppContext } from '../context/AppContext';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';
import { theme } from '../core/theme';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 60,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
    fontSize: 40,
  },
  item: {
    fontSize: 21,
    fontWeight: '300',
    fontFamily:'ruda-regular',
    paddingTop: 5,
    width:175
  },
  logout:{
    color:"red",
    fontFamily:"ruda-bold",
    fontSize: 21,
    paddingTop: 5,
    width:175
  },
  modeButton: {
    fontSize: 21,
    fontFamily:'ruda-bold'
  },
  menuOptions: {
      margin:2,
      marginLeft:1,
      flexDirection:"row"
  },
  icon:{
      width:25,
      marginRight:10,
      alignItems:"center",
      justifyContent:"center"
  },
  mode: {
    position: 'absolute',
    bottom: 20,
    justifyContent:"center",
    padding:10,
    borderColor:theme.colors.primary,
    color:theme.colors.primary,
    borderWidth:1,
    borderRadius:10,
    flexDirection:"row",
    alignSelf: 'stretch',
    textAlign: 'center',
    marginLeft:'7%',
    width:'60%'
  },
});

export default function Menu({ onItemSelected }) {
  const { appState, setAppState } = useContext(AppContext)

  const changeMode = () => {
   
    if(appState.driverMode === "Mode Driver"){
      onItemSelected('mode');
      setAppState({...appState,driverMode: "Mode Client"});
    } else if(appState.driverMode === "Mode Client") {
      onItemSelected('map');
      setAppState({...appState,driverMode: "Mode Driver"});
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    onItemSelected('logout')
  };

  return (
      <View style={styles.menu}>
    <ScrollView scrollsToTop={false} >
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../assets/drayber.png') }
        />
      </View>

      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='map-marker' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('map')} style={styles.item}>
            Carte
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='user' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('compte')} style={styles.item}>
            Mon compte
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='credit-card' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('infoBancaire')} style={styles.item}>
            Mes informations
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='cog' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('param')} style={styles.item}>
            Paramètres
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='car' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('beDriver')} style={styles.item}>
            Devenir chauffeur
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='info-circle' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('about')} style={styles.item}>
            A propos
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='envelope-open' size={22} color='black'/>
        <Text  onPress={() => onItemSelected('contact')} style={styles.item}>
            Contact
        </Text>     
      </View>
      <View style={styles.menuOptions}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='power-off' size={22} color='red'/>
        <Text  onPress={() => logout()} style={styles.logout}>
            Déconnexion
        </Text>     
      </View>
    </ScrollView>
    <View style={styles.mode}>
        <Icon style={styles.icon} type={ 'font-awesome'} name='random' size={22} color='black'/>
        <Text  onPress={() => changeMode()} style={styles.modeButton}>
            {appState.driverMode}
        </Text>     
    </View>
    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};