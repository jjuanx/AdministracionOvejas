import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View , Switch} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as yup from 'yup'
import DropDownPicker from 'react-native-dropdown-picker'
import { update, getDetail } from '../../api/CriaFirebaseEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { ErrorMessage, Formik } from 'formik'
import TextError from '../../components/TextError'
import { buildInitialValues } from '../Helper'
import TextMedium from '../../components/TextMedium'

export default function EditCriaScreen ({ navigation, route }) {
    const [open, setOpen] = useState(false)
    const [backendErrors, setBackendErrors] = useState()
    const [cria, setCria] = useState({})
    
    const sexos = [
    { label: 'Macho', value: 'macho'},
    { label: 'Hembra', value: 'hembra'}
    ]

    const [items, setItems] = useState(sexos)

    const [initialCriaValues, setInitialOvejaValues] = useState({ viva: null, fechaNacimiento: null, sexo: null, ovejaId: route.params.ovejaId || null})
    const validationSchema = yup.object().shape({
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

    const fetchCriaDetails = async () => {
        try {
            const fetchedCria = await getDetail(route.params.id)
            setCria(fetchedCria)
            const initialValues = buildInitialValues(fetchedCria, initialCriaValues)
            setInitialOvejaValues(initialValues)
        } catch (error) {
            console.error('❌ Error en fetchCriaDetails:', error);
            showMessage({
            message: `Ha habido un error cargando los datos de la cria (id ${route.params.id}). ${error}`,
            type: 'error',
            style: GlobalStyles.flashStyle,
            titleStyle: GlobalStyles.flashTextStyle
            })
        }
    }

    useEffect(() => {
        fetchCriaDetails()
    }, [route])

    const updateCria = async (values) => {
        setBackendErrors([])
        try {
            const updatedCria = await update(cria.id, values)
            showMessage({
                message: `Cria ${updatedCria.id} actualizada correctamente`,
                type: 'success',
                style: GlobalStyles.flashStyle,
                titleStyle: GlobalStyles.flashTextStyle
            })
            navigation.navigate('OvejasDetailScreen', {id: cria.ovejaId, dirty: true })
        } catch (error) {
            console.log(error)
            setBackendErrors(error.errors)
        }
    }

    return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialCriaValues}
      onSubmit={updateCria}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
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
  switch: {
    marginTop: 5
  }
})
