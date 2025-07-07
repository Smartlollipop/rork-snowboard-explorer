import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
  actionButton?: ReactNode;
}

export default function InfoCard({ 
  icon, 
  title, 
  subtitle, 
  rightText, 
  onPress,
  actionButton
}: InfoCardProps) {
  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.mainContent} 
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.leftContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        <View style={styles.rightContent}>
          {rightText && <Text style={styles.rightText} numberOfLines={1} ellipsizeMode="tail">{rightText}</Text>}
          {onPress && <ChevronRight size={20} color={Colors.text.light} />}
        </View>
      </Pressable>
      {actionButton && (
        <View style={styles.actionContainer}>
          {actionButton}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 12,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.secondary,
    marginRight: 4,
    maxWidth: '70%',
    textAlign: 'right',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});