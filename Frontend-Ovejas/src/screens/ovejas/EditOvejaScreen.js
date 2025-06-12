import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { update, getDetail } from '../../api/OvejaEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import { buildInitialValues } from '../Helper'

export default function EditOvejaScreen ({ navigation, route }) {
    const [open, setOpen] = useState(false)
    const [backendErrors, setBackendErrors] = useState()
    const [oveja, setOveja] = useState({})
    
    const estados = [
        { label: 'Buena', value: 'buena'},
        { label: 'Regular', value: 'regular'},
        { label: 'Mala', value: 'mala'},
    ]
    const [items, setItems] = useState(estados)

    const [initialOvejaValues, setInitialOvejaValues] = useState({ estado: null, fechaNacimiento: null})
    const validationSchema = yup.object().shape({
    estado: yup
        .string()
        .oneOf(estados.map(e => e.value))
        .required('El nivel de producción de leche es obligatorio'),
    fechaNacimiento: yup
        .date()
        .required('La fecha de nacimiento es obligatoria'),
    })

    const fetchOvejaDetails = async () => {
        try {
            const fetchedOveja = await getDetail(route.params.id)
            setOveja(fetchedOveja)
            const initialValues = buildInitialValues(fetchedOveja, initialOvejaValues)
            setInitialOvejaValues(initialValues)
        } catch (error) {
            showMessage({
            message: `Ha habido un error cargando los datos de la oveja (id ${route.params.id}). ${error}`,
            type: 'error',
            style: GlobalStyles.flashStyle,
            titleStyle: GlobalStyles.flashTextStyle
            })
        }
    }

    useEffect(() => {
        fetchOvejaDetails()
    }, [route])

    const updateOveja = async (values) => {
        setBackendErrors([])
        try {
            const updatedOveja = await update(oveja.id, values)
            showMessage({
                message: `Oveja ${updatedOveja.id} actualizada correctamente`,
                type: 'success',
                style: GlobalStyles.flashStyle,
                titleStyle: GlobalStyles.flashTextStyle
            })
            navigation.navigate('OvejasDetailScreen', {id: oveja.id, dirty: true })
        } catch (error) {
            console.log(error)
            setBackendErrors(error.errors)
        }
    }

    return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialOvejaValues}
      onSubmit={updateOveja}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
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