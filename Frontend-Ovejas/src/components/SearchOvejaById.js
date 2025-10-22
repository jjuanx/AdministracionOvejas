/* src/components/SearchOvejaById.js */
import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import * as GlobalStyles from '../styles/GlobalStyles';
import { getDetail } from '../api/OvejaFirebaseEndpoints';

/* eslint-disable react/prop-types */
export default function SearchOvejaById ({ navigation }) {
  const [idInput, setIdInput] = useState('');

  // Ejecuta la búsqueda
  const search = useCallback(async () => {
    const id = idInput.trim();
    if (id.length === 0) {
      showMessage({
        message: 'Por favor ingresa un ID válido',
        type: 'warning',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      });
      return;
    }
    try {
      const oveja = await getDetail(id);
      if (oveja) {
        navigation.navigate('OvejasDetailScreen', { id: oveja.id });
      } else {
        throw new Error('No encontrada');
      }
    } catch {
      showMessage({
        message: `No se encontró ninguna oveja con id ${id}`,
        type: 'danger',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      });
    }
  }, [idInput, navigation]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Buscar oveja por ID (8 dígitos)"
        value={idInput}
        onChangeText={text => {
            setIdInput(text)
            if(text.length === 8) search()
        }}
        onSubmitEditing={search}       // ↵ en teclado
      />
      <Pressable onPress={search} style={styles.button}>
        <MaterialCommunityIcons name="magnify" color="white" size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: GlobalStyles.brandPrimary,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff'
  },
  button: {
    marginLeft: 8,
    backgroundColor: GlobalStyles.brandPrimary,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center'
  }
});
