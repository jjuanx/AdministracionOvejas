import { Platform } from 'react-native';

/* ─── Paleta de marca ────────────────────────────────────── */
const brandPrimary        = 'rgb(131, 54, 73)';   // burdeos
const brandPrimaryTap     = 'rgb(126, 33, 56)';   // burdeos más oscuro
const brandSecondary      = 'rgb(28, 124, 153)';   // azul
const brandSecondaryTap   = 'rgb(22, 102, 126)';   // azul más oscuro
const brandSuccess        = '#95be05';   // verde “ok”
const brandSuccessDisabled = `${brandSuccess}a8`
const brandBackground     = '#fff9f0';   // marfil muy claro    (#f2f2f2 si prefieres gris)
const brandCard           = '#fff4cc';   // fondo tarjetas      (amarillo pastel)
const flashStyle = { paddingTop: 50, fontSize: 20 }
const flashTextStyle = { fontSize: 18 }
const brandGreen = '#059f94'
const brandGreenTap = '#059f94'

/* ─── Tipografía ─────────────────────────────────────────── */
const fontRegular = {
  fontFamily : Platform.select({ ios: 'System', android: 'Roboto' }),
  fontWeight : '400'
};
const fontMedium = {
  fontFamily : Platform.select({ ios: 'System', android: 'Roboto-Medium' }),
  fontWeight : '500'
};
const fontBold   = {
  fontFamily : Platform.select({ ios: 'System', android: 'Roboto-Bold' }),
  fontWeight : '700'
};

/* ─── Tema para React Navigation ─────────────────────────── */
const navigationTheme = {
  dark  : false,
  colors: {
    primary     : brandSecondary,
    background  : brandBackground,
    card        : brandPrimary,
    text        : '#ffffff',
    border      : `${brandPrimary}99`,  // 60 % opacidad
    notification: brandSecondaryTap     // badge en la tab bar
  },
  fonts: {
    regular: fontRegular,
    medium : fontMedium,
    bold   : fontBold
  }
};

/* ─── Sombra y radios que repetirás ───────────────────────── */
const elevation = Platform.select({
  ios : { shadowColor:'#000', shadowOpacity:0.08, shadowOffset:{ width:0, height:2 }, shadowRadius:4 },
  android: { elevation:4 }
});
const cardRadius = 16;

export {
  brandPrimary, brandPrimaryTap,
  brandSecondary, brandSecondaryTap,
  brandSuccess, brandSuccessDisabled,
  brandBackground, brandCard,
  fontRegular, fontMedium, fontBold,
  navigationTheme,
  elevation, cardRadius,
  flashStyle, flashTextStyle,
  brandGreen, brandGreenTap
};
