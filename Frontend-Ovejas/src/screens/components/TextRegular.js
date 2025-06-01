import React from 'react'
import { StyleSheet, Text } from 'react-native'
export default function TextRegular (props) {
  const { textStyle, ...inputProps } = props

  return (
          <Text style={[styles.fontRegular, textStyle]} {...inputProps}>
            {props.children}
          </Text>
  )
}

const styles = StyleSheet.create({
  fontRegular: {
    fontFamily : Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight : '400'
  }
})
