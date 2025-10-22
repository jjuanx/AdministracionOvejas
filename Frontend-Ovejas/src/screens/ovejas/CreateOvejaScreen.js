import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create } from '../../api/OvejaFirebaseEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import ovejaLogo from '../../../assets/ovejaLogo.png'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateOvejaScreen ({ navigation }) {
  const [open, setOpen] = useState(false)
  const [backendErrors, setBackendErrors] = useState()
  const initialOvejaValues = { customId: '', estado: '', fechaNacimiento: '' }
  
  const estados = [
    { label: 'Buena', value: 'buena'},
    { label: 'Regular', value: 'regular'},
    { label: 'Mala', value: 'mala'},
  ]

  const [items, setItems] = useState(estados)


  
  const validationSchema = yup.object().shape({
    customId: yup
      .number()
      .typeError('El ID debe ser un número')
      .required('El ID numérico es obligatorio')
      .positive('El ID debe ser un número positivo')
      .integer('El ID debe ser un número entero')
      .min(1, 'El ID debe ser mínimo 1')
      .max(9999999999, 'El ID debe tener máximo 10 dígitos'),
    estado: yup
      .string()
      .oneOf(estados.map(e => e.value))
      .required('El nivel de producción de leche es obligatorio'),
    fechaNacimiento: yup
      .date()
      .required('La fecha de nacimiento es obligatoria'),
  })

  const createOveja = async (values) => {
    setBackendErrors([])
    try {
      // Calcular la edad automáticamente desde la fecha de nacimiento
      const birthDate = new Date(values.fechaNacimiento);
      const today = new Date();
      const ageInYears = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
      
      // Preparar los datos con la edad calculada
      const ovejaData = {
        ...values,
        edad: ageInYears >= 0 ? ageInYears : 0,
        id: values.customId // Usar el ID personalizado
      };
      
      const createdOveja = await create(ovejaData)
      showMessage({
        message: `Oveja ${createdOveja.customId || createdOveja.id} creada correctamente`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('OvejasScreen', { dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialOvejaValues}
      onSubmit={createOveja}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='customId'
                label='ID de la oveja:'
                placeholder='Ej: 1, 123, 9999999999'
                keyboardType='numeric'
              />
              <InputItem
                name='fechaNacimiento'
                label='Fecha de nacimiento:'
                placeholder='YYYY-MM-DD'
              />

              <DropDownPicker
                open={open}
                value={values.estado}
                items={items}
                setOpen={setOpen}
                setItems={items}
                setValue={callback => setFieldValue('estado', callback(values.estado))}
                listMode ="SCROLLVIEW"
                placeholder="Producción de leche"
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: GlobalStyles.brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              />
              <ErrorMessage name={'estado'} render={msg => <TextError>{msg}</TextError> }/>

              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
              }

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccess
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Guardar
                </TextRegular>
              </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
  





}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
