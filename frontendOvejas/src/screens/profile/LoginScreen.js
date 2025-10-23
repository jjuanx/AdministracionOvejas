import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Image } from 'react-native'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { Formik } from 'formik'
import * as yup from 'yup'
import InputItem from '../../components/InputItem'
import { useAuth } from '../../context/FirebaseAuthContext'
import TextRegular from '../../components/TextRegular'
import logo from '../../../assets/ovejaLogo.png'
import TextError from '../../components/TextError'
import { showMessage } from 'react-native-flash-message'

export default function LoginScreen ({ navigation }) {
  const { login } = useAuth()
  const [backendErrors, setBackendErrors] = useState()
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Por favor introduce un email valido')
      .required('El email es obligatorio'),
    password: yup
      .string()
      .min(3, ({ min }) => `La contraseña debe teber minimo ${min} caracteres`)
      .matches(/^\S*$/, 'No se permiten espacios')
      .required('La contraseña es obligatoria')
  })

  const loginHandler = async (values) => {
    setBackendErrors([])
    try {
      await login(values.email, values.password)
      showMessage({
        message: 'Bienvenido de vuelta.',
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      showMessage({
        message: error.message || 'Error al iniciar sesión',
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      setBackendErrors([error.message])
    }
  }

  return (

    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={loginHandler}>
      {({ handleSubmit }) => (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.container}>
            <Image style={styles.image} source={logo} />
            <InputItem
              name='email'
              label='email:'
              placeholder='propietario1@ejemplo.com'
              textContentType='emailAddress'
            />
            <InputItem
              name='password'
              label='password:'
              placeholder='secret'
              textContentType='password'
              secureTextEntry={true}
            />

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
              <TextRegular textStyle={styles.text}>
                Sign in
              </TextRegular>
            </Pressable>

            <TextRegular textStyle={{ textAlign: 'center' }}>Not a member?</TextRegular>
            <Pressable
              onPress={() => navigation.navigate('Register')
              }
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandGreenTap
                    : GlobalStyles.brandGreen
                },
                styles.button
              ]}>
              <TextRegular textStyle={styles.text}>
                Create account
              </TextRegular>
            </Pressable>
          </View>
        </View>
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
    margin: 50
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
