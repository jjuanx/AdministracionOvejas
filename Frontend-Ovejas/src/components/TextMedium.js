import React from 'react'
import { StyleSheet, Text , Platform} from 'react-native'
export default function TextMedium (props) {
  const { textStyle, ...inputProps } = props

  return (
          <Text style={[styles.textMedium, textStyle]} {...inputProps}>
            {props.children}
          </Text>
  )
}

const styles = StyleSheet.create({
  textMedium: {
    fontFamily : Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
    fontWeight : '500'
  }
})
