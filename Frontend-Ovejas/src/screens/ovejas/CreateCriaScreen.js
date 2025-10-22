import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View, Switch} from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { create } from '../../api/CriaFirebaseEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextMedium from '../../components/TextMedium'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'

export default function CreateCriaScreen ({ navigation, route }) {
 const [open, setOpen] = useState(false)
  const [backendErrors, setBackendErrors] = useState()
  const initialCriaValues = { id: '', fechaNacimiento: null, sexo: null, ovejaId: route.params.id, viva: true}
  
  const sexos = [
    { label: 'Macho', value: 'macho'},
    { label: 'Hembra', value: 'hembra'}
  ]
 
  const [items, setItems] = useState(sexos)


  
  const validationSchema = yup.object().shape({
    id: yup
      .number()
      .typeError('El ID debe ser un número')
      .positive('El ID debe ser un número positivo')
      .integer('El ID debe ser un número entero')
      .min(1, 'El ID debe ser mínimo 1')
      .max(9999999999, 'El ID debe tener máximo 10 dígitos')
      .nullable()
      .transform((value, originalValue) => originalValue === '' ? null : value),
    fechaNacimiento: yup
      .date()
      .required('La fecha de nacimiento es obligatoria'),
    sexo: yup
      .string()
      .oneOf(sexos.map(e => e.value))
      .required('El sexo del animal es obligatorio'),
    viva: yup
      .boolean()
  })

  const createCria = async (values) => {
    setBackendErrors([])
    try {
      const createdCria = await create(values)
      showMessage({
        message: `Cria ${createdCria.id} creada correctamente`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('OvejasDetailScreen', { id: route.params.id })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialCriaValues}
      onSubmit={createCria}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='id'
                label='ID de la cría (opcional):'
                placeholder='Ej: 1, 123... (vacío = ID automático)'
                keyboardType='numeric'
              />
              <InputItem
                name='fechaNacimiento'
                label='Fecha Nacimiento:'
                placeholder='YYYY-MM-DD'
              />

              <DropDownPicker
                open={open}
                value={values.sexo}
                items={items}
                setOpen={setOpen}
                setItems={items}
                setValue={callback => setFieldValue('sexo', callback(values.sexo))}
                listMode ="SCROLLVIEW"
                placeholder="Sexo del Animal"
                containerStyle={{ height: 40, marginTop: 20 }}
                style={{ backgroundColor: GlobalStyles.brandBackground }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              />
              <ErrorMessage name={'sexo'} render={msg => <TextError>{msg}</TextError> }/>

              <View style={{marginTop: 25}}>
                <TextMedium>¿Se encuentra viva esta cría?</TextMedium>
                <Switch
                  trackColor={{ false: GlobalStyles.brandSecondary, true: GlobalStyles.brandPrimary }}
                  thumbColor={values.viva ? GlobalStyles.brandSecondary : '#f4f3f4'}
                  // onValueChange={toggleSwitch}
                  value={values.viva}
                  style={styles.switch}
                  onValueChange={value =>
                    setFieldValue('viva', value)
                  }
                />
              </View>

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
  },
  switch: {
    marginTop: 5
  }
})
