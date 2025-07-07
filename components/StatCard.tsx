import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from '@/constants/colors';

interface StatCardProps {
  icon?: ReactNode;
  title: string;
  content: ReactNode;
  actionText?: string;
  onPress?: () => void;
}

export default function StatCard({ 
  icon, 
  title, 
  content, 
  actionText, 
  onPress 
}: StatCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {content}
      </View>
      {actionText && (
        <Pressable 
          style={styles.actionButton} 
          onPress={onPress}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  actionButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});