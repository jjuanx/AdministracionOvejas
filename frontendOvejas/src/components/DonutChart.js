/* ─── src/components/DonutChart.js ────────────────────────────────────── */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import * as d3Shape from 'd3-shape/dist/d3-shape.min.js';
import TextRegular from './TextRegular';
import * as GlobalStyles from '../styles/GlobalStyles';

/* eslint-disable react/prop-types */
export default function DonutChart ({ data, size = 160, innerRadius = 60 }) {
  /* Construimos los arcos */
  const arcs = d3Shape
    .pie()
    .value(d => d.value)
    (data);

  const arcGenerator = d3Shape
    .arc()
    .outerRadius(size / 2)
    .innerRadius(innerRadius);     // para crear el agujero

  /* Colores (puedes refinarlos) */
  const palette = [GlobalStyles.brandSuccess, GlobalStyles.brandSecondary, GlobalStyles.brandPrimary];
  const color = (i) => palette[i % palette.length];

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <G x={size / 2} y={size / 2}>
          {arcs.map((arc, idx) => (
            <Path
              key={idx}
              d={arcGenerator(arc)}
              fill={color(idx)}
            />
          ))}

          {/* círculo blanco para simular borde fino */}
          <Circle r={innerRadius} fill="#ffffff" />
        </G>
      </Svg>

      {/* Leyenda simple */}
      <View style={styles.legend}>
        {data.map((s, i) => (
          <View key={i} style={styles.legendRow}>
            <View style={[styles.swatch, { backgroundColor: color(i) }]} />
            <TextRegular>{s.label}: {s.value}</TextRegular>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center'
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    width: '80%'
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginVertical: 2
  },
  swatch: {
    width: 12,
    height: 12,
    marginRight: 6,
    borderRadius: 2
  }
});
