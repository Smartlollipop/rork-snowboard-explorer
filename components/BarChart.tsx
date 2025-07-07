import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Colors from '@/constants/colors';

interface BarChartProps {
  data: number[];
  maxValue?: number;
  labels?: string[];
  height?: number;
}

export default function BarChart({ 
  data, 
  maxValue, 
  labels, 
  height = 100 
}: BarChartProps) {
  const calculatedMaxValue = maxValue || Math.max(...data, 1);
  
  return (
    <View style={[styles.container, { height }]}>
      {data.map((value, index) => {
        const barHeight = (value / calculatedMaxValue) * height;
        return (
          <View key={index} style={styles.barContainer}>
            <View 
              style={[
                styles.bar, 
                { 
                  height: barHeight,
                  backgroundColor: value > 0 ? Colors.secondary : Colors.border,
                }
              ]} 
            />
            {labels && (
              <Text style={styles.label}>{labels[index]}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: '60%',
    minHeight: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  label: {
    fontSize: 10,
    color: Colors.text.light,
    marginTop: 4,
  },
});