/* src/screens/controlPanel/ControlPanelScreen.js */
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { getResumen } from '../../api/AnalyticsFirebaseEndpoints';
import { useAuth } from '../../context/FirebaseAuthContext';
import TextMedium   from '../../components/TextMedium';
import TextRegular  from '../../components/TextRegular';
import * as GlobalStyles from '../../styles/GlobalStyles';
import DonutChart    from '../../components/DonutChart'; 

export default function ControlPanelScreen () {
  const { currentUser, userData } = useAuth();
  const [data, setData] = useState(null);

  const renderEmptyOvejasList = () => {
    return(
      <View>
        <TextRegular textStyle={styles.emptyList}>
          Todavia no hay ovejas. Has iniciado sesion?
        </TextRegular>
      </View>
    )
  }

  const fetchResumen = async () => {
    try {
      const resumen = await getResumen()
      setData(resumen)
    } catch (error) {
      showMessage({
        message: `Se ha producido un error cargando los datos. ${error} `,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        fetchResumen();
      }
      return () => {};
    }, [currentUser]) 
  );


  useEffect(() => {
  if (!currentUser) { 
    renderEmptyOvejasList() 
  }
  if (currentUser){
    fetchResumen()
  }
}, [currentUser]);

if (!data) return renderEmptyOvejasList()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TextMedium textStyle={styles.titulo}>Total de ovejas</TextMedium>
        <TextMedium textStyle={styles.big}>{data?.totalOvejas || 0}</TextMedium>
      </View>

      <View style={styles.card}>
        <TextMedium textStyle={styles.titulo}>Total de crías</TextMedium>
        <TextMedium textStyle={styles.big}>{data?.totalCrias || 0}</TextMedium>
      </View>

      <View style={styles.card}>
        <TextMedium textStyle={styles.titulo}>Resumen estado rebaño</TextMedium>
        <DonutChart
          data={[
            { label: 'Buena',   value: data?.estados?.buena   || 0 },
            { label: 'Regular', value: data?.estados?.regular || 0 },
            { label: 'Mala',    value: data?.estados?.mala    || 0 }
          ]}
        />
      </View>

      <View style={styles.card}>
        <TextMedium textStyle={styles.titulo}>Estado de las crías</TextMedium>
        <DonutChart data={[
            { label: 'Viva',   value: data?.criasVivas   || 0 },
            { label: 'Muerta', value: data?.criasMuertas || 0 }
          ]}/>
      </View>

      <View style={styles.card}>
        <TextMedium textStyle={styles.titulo}>Edad media oveja</TextMedium>
        <TextMedium textStyle={styles.big}>{data?.edadMedia || 0} años</TextMedium>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: GlobalStyles.brandBackground
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3  
  },
  big: {
    fontSize: 32,
    color: GlobalStyles.brandPrimary,
    textAlign: 'center'
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  },
  titulo: {
    fontSize: 20,
    marginVertical: 9,
    textAlign: 'center'
  }
});
