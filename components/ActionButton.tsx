import React from 'react';
import { StyleSheet, Text, Pressable, PressableProps } from 'react-native';
import Colors from '@/constants/colors';

interface ActionButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function ActionButton({ 
  title, 
  variant = 'primary', 
  style, 
  ...props 
}: ActionButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
        style,
      ]} 
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: Colors.primary,
  },
});