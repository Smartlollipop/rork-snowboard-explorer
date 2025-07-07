import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  ChevronRight,
  X,
  Users,
  Watch
} from 'lucide-react-native';

import { useUserStore } from '@/store/user-store';
import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const { user } = useUserStore();
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Pressable style={styles.closeButton}>
            <X size={24} color={Colors.text.primary} />
          </Pressable>
        </View>
        
        <View style={styles.accountSection}>
          <Pressable style={[styles.settingItem, styles.firstItem]}>
            <View style={styles.signInIcon}>
              <User size={20} color={Colors.text.light} />
            </View>
            <View style={styles.signInContent}>
              <Text style={styles.settingText}>Sign in / Register</Text>
              <Text style={styles.settingSubtext}>Sync. Backup.</Text>
            </View>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
          
          <Pressable style={[styles.settingItem, styles.lastItem]}>
            <View style={[styles.settingIcon, { backgroundColor: '#007AFF' }]}>
              <Users size={16} color="white" />
            </View>
            <Text style={styles.settingText}>Manage Friends</Text>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
        </View>
        
        <View style={styles.premiumCard}>
          <View style={styles.premiumHeader}>
            <View style={styles.premiumIcon}>
              <View style={styles.mountainIcon}>
                <Text style={styles.mountainText}>🏂</Text>
              </View>
            </View>
            <Text style={styles.premiumTitle}>Try Snowboard Companion Premium</Text>
          </View>
          <View style={styles.premiumDescriptionContainer}>
            <Text style={styles.premiumDescription}>
              Get 1 week of Snowboard Companion Premium for free
            </Text>
          </View>
          <Pressable style={styles.premiumButton}>
            <Text style={styles.premiumButtonText}>Get Free Week</Text>
          </Pressable>
          <Text style={styles.premiumPrice}>Then $29.99 per year</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingsSection}>
          <Pressable style={[styles.settingItem, styles.firstItem]}>
            <View style={[styles.settingIcon, { backgroundColor: '#8E8E93' }]}>
              <SettingsIcon size={16} color="white" />
            </View>
            <Text style={styles.settingText}>General</Text>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
          
          <Pressable style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#000000' }]}>
              <Watch size={16} color="white" />
            </View>
            <Text style={styles.settingText}>Watch App</Text>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
          
          <Pressable style={styles.settingItem}>
            <View style={[styles.settingIcon, { backgroundColor: '#FF3B30' }]}>
              <Bell size={16} color="white" />
            </View>
            <Text style={styles.settingText}>Notifications</Text>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
          
          <Pressable style={[styles.settingItem, styles.lastItem]}>
            <View style={[styles.settingIcon, { backgroundColor: '#8E8E93' }]}>
              <Shield size={16} color="white" />
            </View>
            <Text style={styles.settingText}>Open System Permissions</Text>
            <ChevronRight size={18} color={Colors.text.light} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  accountSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  premiumCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumIcon: {
    marginRight: 10,
  },
  mountainIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F7F3E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mountainText: {
    fontSize: 14,
    color: '#8B4513',
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  premiumDescriptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  premiumDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  premiumButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 6,
  },
  premiumButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  premiumPrice: {
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  settingsSection: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  signInIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  signInContent: {
    flex: 1,
  },
  settingIcon: {
    width: 24,
    height: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
  },
  settingSubtext: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 1,
  },
});