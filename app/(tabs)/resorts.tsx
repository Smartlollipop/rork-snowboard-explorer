import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  Map, 
  Download, 
  Car, 
  ChevronRight, 
  Share,
  Mountain
} from 'lucide-react-native';

import { useUserStore } from '@/store/user-store';
import { useResortsStore } from '@/store/resorts-store';
import Colors from '@/constants/colors';

export default function ResortsScreen() {
  const { user } = useUserStore();
  const { getPreferredResort } = useResortsStore();
  const [searchText, setSearchText] = useState('');
  
  const resort = getPreferredResort(user?.preferredResortId);
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Map Section - Fixed Background */}
        <View style={styles.mapContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070' }}
            style={styles.mapBackground}
            imageStyle={styles.mapBackgroundImage}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.9)']}
              locations={[0, 0.7, 1]}
              style={styles.mapOverlay}
            >
              {/* Ski trail lines overlay */}
              <View style={styles.trailsOverlay}>
                <View style={[styles.trailLine, styles.trailLine1]} />
                <View style={[styles.trailLine, styles.trailLine2]} />
                <View style={[styles.trailLine, styles.trailLine3]} />
              </View>
              
              {/* 3D Button */}
              <Pressable style={styles.threeDButton}>
                <Mountain size={16} color={Colors.primary} />
                <Text style={styles.threeDButtonText}>3D</Text>
              </Pressable>
            </LinearGradient>
          </ImageBackground>
        </View>
        
        {/* Content Section - Overlaying */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
        >
          {/* Spacer to push content below map initially */}
          <View style={styles.spacer} />
          
          {/* Content Card that slides over map */}
          <View style={styles.contentCard}>
            {/* Resort Info */}
            <View style={styles.resortHeader}>
              <View style={styles.resortTitleRow}>
                <Text style={styles.resortName}>{resort.name}</Text>
                <Pressable style={styles.shareButton}>
                  <Share size={20} color={Colors.primary} />
                </Pressable>
              </View>
              <Text style={styles.resortLocation}>{resort.location}</Text>
            </View>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Search size={20} color={Colors.text.light} />
              <TextInput
                style={styles.searchInput}
                placeholder={`Search ${resort.name}`}
                placeholderTextColor={Colors.text.light}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Pressable style={styles.actionButton}>
                <Map size={24} color={Colors.primary} />
                <Text style={styles.actionButtonText}>Paper Map</Text>
              </Pressable>
              
              <Pressable style={styles.actionButton}>
                <Download size={24} color={Colors.primary} />
                <Text style={styles.actionButtonText}>Download</Text>
              </Pressable>
            </View>
            
            {/* Resort Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>612 m</Text>
                <Text style={styles.statLabel}>↗ vertical</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{resort.totalRuns}</Text>
                <Text style={styles.statLabel}># trails</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>824 m</Text>
                <Text style={styles.statLabel}>↗ base alt</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1,436 m</Text>
                <Text style={styles.statLabel}>↗ summit alt</Text>
              </View>
            </View>
            
            {/* Route to Resort */}
            <View style={styles.routeSection}>
              <Text style={styles.routeTitle}>Route to Resort</Text>
              
              <Pressable style={styles.routeItem}>
                <View style={styles.routeInfo}>
                  <Car size={20} color={Colors.primary} />
                  <Text style={styles.routeText}>35 min drive</Text>
                </View>
                <ChevronRight size={20} color={Colors.text.light} />
              </Pressable>
            </View>
            
            {/* Extra content to ensure proper scrolling */}
            <View style={styles.extraContent}>
              <Text style={styles.extraContentText}>
                Additional resort information and features will be displayed here.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 1,
  },
  mapBackground: {
    flex: 1,
  },
  mapBackgroundImage: {
    opacity: 0.8,
  },
  mapOverlay: {
    flex: 1,
    position: 'relative',
  },
  trailsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  trailLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#E53E3E',
  },
  trailLine1: {
    width: 120,
    top: 80,
    left: 50,
    transform: [{ rotate: '-25deg' }],
  },
  trailLine2: {
    width: 100,
    top: 120,
    left: 80,
    transform: [{ rotate: '-30deg' }],
  },
  trailLine3: {
    width: 80,
    top: 160,
    left: 110,
    transform: [{ rotate: '-20deg' }],
  },
  threeDButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  threeDButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  spacer: {
    height: 200,
  },
  contentCard: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    paddingBottom: 32,
    minHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  resortHeader: {
    marginBottom: 20,
  },
  resortTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resortName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  shareButton: {
    padding: 8,
  },
  resortLocation: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  routeSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  extraContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
  },
  extraContentText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});