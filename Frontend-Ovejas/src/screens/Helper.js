import maleAvatar from '../../assets/maleAvatar.png';


const buildInitialValues = (entity, initialEntityValues) => {
  const initialValues = { ...initialEntityValues }
  Object.keys(initialEntityValues).forEach(key => {
    if (key in entity) {
      initialValues[key] = entity[key]
    }
  })
  return initialValues
}

const avatarSource = (avatar) => {
  if (!avatar) return maleAvatar;                 // sin avatar ⇒ imagen local

  // avatar desde BBDD (ya procesado por prepareEntityImages)
  if (avatar.uri) return { uri: avatar.uri };

  // string devuelto por API (‘public/avatars/maleAvatar.png’)
  if (typeof avatar === 'string') {
    if (avatar.includes('maleAvatar')) return maleAvatar;  // ← fallback local
    return { uri: EXPO_PUBLIC_API_BASE_URL + '/' + avatar };
  }

  // objeto de ImagePicker
  if (avatar.assets?.length) return { uri: avatar.assets[0].uri };

  return maleAvatar;
};


export { buildInitialValues, avatarSource }
