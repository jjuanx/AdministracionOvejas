import React, {useState, useEffect} from 'react'
import { Image, Keyboard,KeyboardAvoidingView, Platform, Pressable, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import { doc, updateDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import { db } from '../../config/firebase'

import { useAuth } from '../../context/FirebaseAuthContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import { showMessage } from 'react-native-flash-message'
import * as GlobalStyles from '../../styles/GlobalStyles'
import SystemInfo from '../../components/SystemInfo'
import maleAvatar from '../../../assets/maleAvatar.png'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextError from '../../components/TextError'
import { prepareEntityImages } from '../../api/helpers/FileUploadHelper'
import { buildInitialValues } from '../Helper'
import * as ExpoImagePicker from 'expo-image-picker'

export default function ProfileScreen () {
  const { currentUser, userData, logout } = useAuth()
  const [backendErrors, setBackendErrors] = useState()

  const [initialUserValues, setInitialUserValues] = useState({ nombre: null, apellidos: null, numeroTelefono: null, direccion: null, codigoPostal: null })

  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .max(255, 'El nombre es demasiado largo')
      .required('El nombre es obligatorio'),
    apellidos: yup
      .string()
      .max(255, 'Los apellidos son demasiado largos')
      .required('Los apellidos son obligatorios'),
    numeroTelefono: yup
      .string()
      .max(255, 'El numero es demasiado largo')
      .required('El numero es obligatorio'),
    direccion: yup
      .string()
      .max(255, 'La direccion es demasiado larga')
      .required('La direccion es obligatoria'),
    codigoPostal: yup
      .string()
      .max(255, 'El codigo postal es demasiado largo')
      .required('El codigo postal es obligatorio')
  })

  useEffect(() => {
    if (userData) {
      const preparedUser = prepareEntityImages(userData, ['avatar'])
      const initialValues = buildInitialValues(preparedUser, initialUserValues)
      setInitialUserValues(initialValues)
    }
  }, [userData])

  const signOutAndNavigate = async () => {
    try {
      await logout()
      showMessage({
        message: 'Se ha cerrado sesión correctamente',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle,
        backgroundColor: GlobalStyles.brandSecondary
      })
    } catch (error) {
      showMessage({
        message: 'Error al cerrar sesión',
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      if (onSuccess) {
        onSuccess(result)
      }
    }
  }

  const update = async (data) => {
    setBackendErrors([])
    try {
      const userDocRef = doc(db, 'usuarios', currentUser.uid);
      let updateData = {
        nombre: data.nombre,
        apellidos: data.apellidos,
        numeroTelefono: data.numeroTelefono,
        direccion: data.direccion,
        codigoPostal: data.codigoPostal,
        updatedAt: new Date()
      };
      
      await updateDoc(userDocRef, updateData);
      
      if (data.nombre || data.apellidos) {
        await updateProfile(currentUser, {
          displayName: `${data.nombre} ${data.apellidos}`
        });
      }
      
      showMessage({
        message: 'Perfil actualizado correctamente',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      });
    } catch (error) {
      console.error(error);
      setBackendErrors([{ msg: error.message }]);
      showMessage({
        message: 'Error al actualizar el perfil',
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      });
    }
  }
  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={initialUserValues}
      onSubmit={update}>
      {({ handleSubmit, setFieldValue, values, isValid }) => (
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={75}>
            <Pressable onPress={Platform.OS === 'ios' ? Keyboard.dismiss : undefined}>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.container}>
                  <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <View>
                      <Image style={styles.image} source={maleAvatar} />
                    </View>
                  </View>
                  <InputItem
                    name='nombre'
                    label='Nombre:'
                    textContentType='name'
                  />
                  <InputItem
                    name='apellidos'
                    label='Apellidos:'
                    textContentType='familyName'
                  />
                  <InputItem
                    name='numeroTelefono'
                    label='Numero de Telefono:'
                    textContentType='telephoneNumber'
                  />
                  <InputItem
                    name='direccion'
                    label='Direccion:'
                    textContentType='fullStreetAddress'
                  />
                  <InputItem
                    name='codigoPostal'
                    label='Codigo Postal'
                    textContentType='postalCode'
                  />
                  {backendErrors &&
                    backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
                  }

                  <Pressable disabled={!isValid} onPress={handleSubmit}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandSuccess
                          : GlobalStyles.brandSuccess
                      },
                      {
                        backgroundColor: !isValid
                          ? GlobalStyles.brandSuccessDisabled
                          : GlobalStyles.brandSuccess
                      },
                      styles.button]}
                  >
                    <TextRegular textStyle={styles.text}>Save</TextRegular>
                  </Pressable>
                  <Pressable onPress={() => signOutAndNavigate()}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? GlobalStyles.brandPrimaryTap
                          : GlobalStyles.brandPrimary
                      },
                      styles.button]} >
                    <TextRegular textStyle={styles.text}>Sign out</TextRegular>
                  </Pressable>
                  <SystemInfo />
                </View>
              </View>
            </Pressable>
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '60%'
  },
  image: {
    width: 100,
    height: 100,
    borderColor: GlobalStyles.brandPrimary,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: -20,
    alignSelf: 'center'
  },
  button: {
    borderRadius: 8,
    height: 40,
    margin: 12,
    padding: 10,
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
})