import React, {useEffect, useState, useContext} from 'react'
import { StyleSheet, View, FlatList, Pressable  } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextRegular from '../../components/TextRegular'
import {getAll, remove} from '../../api/OvejaEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
import ImageCard from '../../components/ImageCard'
import TextMedium from '../../components/TextMedium'
import  {AuthorizationContext} from '../../context/AuthorizationContext'
import {showMessage} from 'react-native-flash-message'
import ovejaStandart from '../../../assets/ovejaStandart-fondoAmarillo.png'
import DeleteModal from '../../components/DeleteModal'
import SearchOvejaById from '../../components/SearchOvejaById'


const { EXPO_PUBLIC_API_BASE_URL } = process.env;

export default function OvejasScreen ({navigation, route}) {
  const [ovejas, setOvejas] = useState([])
  const [ovejaToBeDeleted, setOvejaToBeDeleted] = useState(null)
  const {loggedInUser} = useContext(AuthorizationContext)

  useEffect(() => {
   if (loggedInUser) { 
     fetchOvejas()
   } else {
     setOvejas(null)
   }
 }, [loggedInUser, route]) 

 const fetchOvejas = async () => {
     try {
       const fetchedOvejas= await getAll()
       setOvejas(fetchedOvejas)
     } catch (error) { 
       showMessage({
         message: `Se ha producido un error cargando las ovejas. ${error} `,
         type: 'error',
         style: GlobalStyles.flashStyle,
         titleStyle: GlobalStyles.flashTextStyle
       })
     }
   }


  const renderHeader = () => {
    return (
      <>
      {loggedInUser &&
        <SearchOvejaById navigation={navigation}></SearchOvejaById>
      }
      { loggedInUser &&
      <Pressable
        onPress={() => navigation.navigate('CreateOvejaScreen')}
        style={({pressed}) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandGreenTap
              : GlobalStyles.brandGreen
          },
          styles.button
        ]}>
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
          <MaterialCommunityIcons name='plus-circle' color={'white'} size={20}/>
          <TextRegular textStyle={styles.text}>
            Añadir Oveja
          </TextRegular>
        </View>
      </Pressable>
      }
      </>
    )
  }


  const renderOveja = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <Pressable
          style={styles.trash}
          onPress={() => setOvejaToBeDeleted(item)}>
            <MaterialCommunityIcons name='trash-can-outline' size={22} color={GlobalStyles.brandPrimary} 
            />
        </Pressable>


        <ImageCard
          imageUri={item.logo ? { uri: EXPO_PUBLIC_API_BASE_URL + '/' + item.logo } : ovejaStandart}
          title= {`ID: ${item.id}`}
          onPress={() => {
            navigation.navigate('OvejasDetailScreen', { id: item.id })
          }}
        >
          <TextRegular>――――――――――</TextRegular>
          <TextMedium>Produccion de leche: <TextMedium textStyle={{color: GlobalStyles.brandGreen}}>{item.estado}</TextMedium></TextMedium>
          <TextMedium>Edad oveja: <TextRegular>{item.edad} años</TextRegular></TextMedium>
        </ImageCard>
      </View>
    )
  }

  const renderEmptyOvejasList = () => {
    return(
      <TextRegular textStyle={styles.emptyList}>
        Todavia no hay ovejas. Has iniciado sesion?
      </TextRegular>
    )
  }

  const removeOveja = async(oveja) => {
    try {
      await remove(oveja.id)
      await fetchOvejas()
      setOvejaToBeDeleted(null)
      showMessage({
        message: `Oveja con id: ${oveja.id} eliminada correctamente`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      setOvejaToBeDeleted(null)
      showMessage({
        message: `Oveja con id: ${oveja.id} no se ha podido borrar.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }


  return (
    <>
      <FlatList
        style={styles.container}
        data={ovejas}
        renderItem={renderOveja}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyOvejasList}
      />
      <DeleteModal
        isVisible={ovejaToBeDeleted !== null}
        onCancel={() => setOvejaToBeDeleted(null)}
        onConfirm={() => removeOveja(ovejaToBeDeleted)}>
          <TextMedium>Identificador Oveja: <TextRegular>{ovejaToBeDeleted?.id}</TextRegular></TextMedium>
      </DeleteModal>
    </>
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
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  trash: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 10
  },
  cardWrapper: {
    position: 'relative'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '90%'
  },
})
