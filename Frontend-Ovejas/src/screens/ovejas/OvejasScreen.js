import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, View, FlatList, Pressable,  } from 'react-native'
import TextRegular from '../../components/TextRegular'
import {getAll} from '../../api/OvejaEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
import ImageCard from '../../components/ImageCard'
import TextMedium from '../../components/TextMedium'
import  {AuthorizationContext} from '../../context/AuthorizationContext'
import {showMessage} from 'react-native-flash-message'
import ovejaStandart from '../../../assets/ovejaStandart-fondoAmarillo.png'

const { EXPO_PUBLIC_API_BASE_URL } = process.env;

export default function OvejasScreen ({navigation}) {
  const [ovejas, setOvejas] = useState([])

  const {loggedInUser} = useContext(AuthorizationContext)

  useEffect(() => {
   async function fetchOvejas () {
     try {
       const fetchedOvejas= await getAll()
       setOvejas(fetchedOvejas)
     } catch (error) { 
       showMessage({
         message: `There was an error while retrieving ovejas. ${error} `,
         type: 'error',
         style: GlobalStyles.flashStyle,
         titleStyle: GlobalStyles.flashTextStyle
       })
     }
   }
   if (loggedInUser) { 
     fetchOvejas()
   } else {
     setOvejas(null)
   }
 }, [loggedInUser]) 


const renderOvejaWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: EXPO_PUBLIC_API_BASE_URL + '/' + item.logo } : ovejaStandart}
        title= {`ID: ${item.id}`}
        onPress={() => {
          navigation.navigate('OvejasDetailScreen', { id: item.id })
        }}
      >
        <TextMedium>Produccion de leche: <TextMedium textStyle={{color: GlobalStyles.brandGreen}}>{item.estado}</TextMedium></TextMedium>
        <TextMedium>Edad: <TextRegular>{item.edad.toString()}</TextRegular></TextMedium>
      </ImageCard>
    )
  }

    const renderEmptyOvejasList = () => {
      return(
        <TextRegular textStyle={styles.emptyList}>
          No ovejas were retreived. Are you logged in?
        </TextRegular>
      )
    }


  return (
    <FlatList
      style={styles.container}
      data={ovejas}
      renderItem={renderOvejaWithImageCard}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={renderEmptyOvejasList}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  }
})
