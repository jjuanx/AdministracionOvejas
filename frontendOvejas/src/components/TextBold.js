import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
export default function TextBold (props) {
  const { textStyle, ...inputProps } = props

  return (
          <Text style={[styles.fontBold, textStyle]} {...inputProps}>
            {props.children}
          </Text>
  )
}

const styles = StyleSheet.create({
  fontBold: {
    fontFamily : Platform.select({ ios: 'System', android: 'Roboto-Bold' }),
    fontWeight : '700'
  }
})
