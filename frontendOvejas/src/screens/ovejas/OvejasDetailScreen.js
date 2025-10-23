import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ImageBackground, Image, Pressable } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getDetail } from '../../api/OvejaFirebaseEndpoints'
import ImageCard from '../../components/ImageCard'
import TextRegular from '../../components/TextRegular'
import TextMedium from '../../components/TextMedium'
import * as GlobalStyles from '../../styles/GlobalStyles'
import DeleteModal from '../../components/DeleteModal'
import criaStandart from '../../../assets/criaStandart-fondoVerde.png'
import backgroundOveja from '../../../assets/backgroundOveja.jpg'
import {remove, getByOvejaId} from '../../api/CriaFirebaseEndpoints'


export default function OvejasDetailScreen ({ navigation, route }) {
    const [oveja, setOveja] = useState({})
    const [criaToBeDeleted, setCriaToBeDeleted] = useState(null)
    

    useEffect(() => {
        fetchOvejaDetails()
    }, [route])

      const renderEmptyCriasList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        Esta oveja no tiene crias todavia
      </TextRegular>
    )
  }

  const fetchOvejaDetails = async () => {
    try {
      const fetchedOveja = await getDetail(route.params.id)
      const fetchedCrias = await getByOvejaId(route.params.id)
      
      // Calcular crías vivas y muertas
      const criasVivas = fetchedCrias.filter(cria => cria.viva === true).length
      const criasMuertas = fetchedCrias.filter(cria => cria.viva === false).length
      
      // Calcular vecesParida (total de crías)
      const vecesParida = fetchedCrias.length

      // Encontrar la fecha del último parto (fecha de nacimiento de la cría más joven)
      let fechaUltimoParto = null
      if (fetchedCrias.length > 0) {
        const fechasNacimiento = fetchedCrias
          .map(cria => new Date(cria.fechaNacimiento))
          .filter(fecha => !isNaN(fecha.getTime())); // Filtrar fechas válidas
        
        if (fechasNacimiento.length > 0) {
          fechaUltimoParto = new Date(Math.max(...fechasNacimiento))
            .toISOString()
            .split('T')[0]; // Formato YYYY-MM-DD
        }
      }
      
      setOveja({
        ...fetchedOveja,
        crias: fetchedCrias,
        vecesParidaVivas: criasVivas,
        criasMuertas: criasMuertas,
        vecesParida: vecesParida,
        fechaUltimoParto: fechaUltimoParto
      })
    } catch (error) {
      showMessage({
        message: `Ha habido un error capturando los detalles de la oveja (id ${route.params.id}). ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

    const renderHeader= () => {
         return (
            <View>
                <ImageBackground source={backgroundOveja} style={styles.imageBackground}>
                <View style={styles.ovejaHeaderContainer}>
                    <TextMedium textStyle={styles.textTitle}> ID: {oveja.id}</TextMedium>
                    <TextMedium textStyle={styles.textTitle}> ――――――――――――――</TextMedium>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="calendar-month" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Edad: {oveja.edad} años</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="badge-account-horizontal" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Fecha Nacimiento: {oveja.fechaNacimiento}</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="google-analytics" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Produccion Leche: {oveja.estado}</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="reproduction" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Veces Parida: {oveja.vecesParida}</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="calendar-blank-multiple" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Fecha Ultimo Parto: {oveja.fechaUltimoParto}</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="tooltip-plus" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Crías Vivas: {oveja.vecesParidaVivas}</TextRegular>
                    </View>
                    <View style={styles.infoRow}> 
                        <MaterialCommunityIcons name="close-octagon" size={18} color="white" />
                        <TextRegular textStyle={styles.description}> Crías Muertas: {oveja.criasMuertas}</TextRegular>
                    </View>

                  <Pressable
                    onPress={() => navigation.navigate('EditOvejaScreen', { id: oveja.id })
                    }
                    style={({ pressed }) => [
                        {
                        backgroundColor: pressed
                            ? GlobalStyles.brandSecondaryTap
                            : GlobalStyles.brandSecondary
                        },
                        styles.button
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                        <MaterialCommunityIcons name='pencil' color={'white'} size={20} />
                        <TextRegular textStyle={styles.text}>
                        Editar Oveja
                        </TextRegular>
                    </View>
                </Pressable>
                </View>
                </ImageBackground>

                <Pressable
                    onPress={() => navigation.navigate('CreateCriaScreen', { id: oveja.id })
                    }
                    style={({ pressed }) => [
                        {
                        backgroundColor: pressed
                            ? GlobalStyles.brandGreenTap
                            : GlobalStyles.brandGreen
                        },
                        styles.button
                    ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                        <MaterialCommunityIcons name='plus-circle' color={'white'} size={20} />
                        <TextRegular textStyle={styles.text}>
                        Añadir Cria
                        </TextRegular>
                    </View>
                </Pressable>
            </View>
        )
    }

const renderCria = ({ item }) => {
    return (
      <View style={styles.cardWrapper}>
        <Pressable
          style={styles.trash}
          onPress={() => setCriaToBeDeleted(item)}>
            <MaterialCommunityIcons name='trash-can-outline' size={22} color={GlobalStyles.brandPrimary} />
        </Pressable>

        <ImageCard
        imageUri={criaStandart}
        title={`Cria: ${item.criaId || item.id}`}>
        { (item.viva === false) &&
            <TextMedium textStyle={styles.fallecimiento}>Fallecida</TextMedium>
        }
        <TextMedium>Fecha Nacimiento: <TextRegular>{item.fechaNacimiento}</TextRegular></TextMedium>
        <TextMedium>Sexo: <TextRegular>{item.sexo}</TextRegular></TextMedium>
        <View style={styles.actionButtonsContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate('EditCriaScreen', { 
                  id: item.id, 
                  ovejaId: item.ovejaId || route.params.ovejaId || route.params.id 
                });
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandGreenTap
                    : GlobalStyles.brandGreen
                },
                styles.actionButton
              ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='pencil' color={'white'} size={20}/>
              <TextRegular textStyle={styles.text}>
                Editar Cria
              </TextRegular>
            </View>
          </Pressable>
        </View>
      </ImageCard>

      </View>
     
    )
  }

  const removeCria = async () => {
    try {
      await remove(criaToBeDeleted.id)
      await fetchOvejaDetails()
      setCriaToBeDeleted(null)
      showMessage({
        message: `Cria con id: ${criaToBeDeleted.id} eliminada correctamente`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      setCriaToBeDeleted(null)
      showMessage({
        message: `Cria con id: ${criaToBeDeleted.id} no se ha podido borrar.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  return (
    <>
     <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyCriasList}
        style={styles.container}
        data={oveja.crias}
        renderItem={renderCria}
        keyExtractor={item => item.id.toString()}
      />

      <DeleteModal
        isVisible={criaToBeDeleted !== null}
        onCancel={() => setCriaToBeDeleted(null)}
        onConfirm={() => removeCria()}>
          <TextMedium>La Cria seleccionada será eliminada de la base de datos</TextMedium>
      </DeleteModal>
    </>
  )


}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  ovejaHeaderContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.69)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    width: '100%',
    height: 310,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  description: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
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
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
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
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'absolute',
    width: '180%'
  },
    infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  cardWrapper: {
    position: 'relative'
  },
  trash: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 10
  },
  fallecimiento: {
    color: GlobalStyles.brandPrimary
  }
})
