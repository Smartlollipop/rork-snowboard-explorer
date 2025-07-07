import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Thermometer, 
  Snowflake, 
  Wind, 
  MapPin, 
  Calendar,
  ArrowRight
} from 'lucide-react-native';

import { useResortsStore } from '@/store/resorts-store';
import { useTripsStore } from '@/store/trips-store';
import ActionButton from '@/components/ActionButton';
import Colors from '@/constants/colors';
import { formatDate } from '@/utils/date-utils';

export default function ResortDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getResortById } = useResortsStore();
  const { trips } = useTripsStore();
  
  const resort = getResortById(id);
  
  // Find upcoming trips to this resort
  const upcomingTrips = trips
    .filter(trip => trip.resortId === id && new Date(trip.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  if (!resort) {
    return (
      <View style={styles.container}>
        <Text>Resort not found</Text>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: resort.name,
          headerTransparent: true,
          headerTintColor: 'white',
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: resort.image }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <Text style={styles.heroTitle}>{resort.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="white" />
              <Text style={styles.locationText}>{resort.location}</Text>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Thermometer size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{resort.temperature}°C</Text>
            <Text style={styles.statLabel}>Temperature</Text>
          </View>
          
          <View style={styles.statCard}>
            <Snowflake size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{resort.snowDepth} cm</Text>
            <Text style={styles.statLabel}>Snow Depth</Text>
          </View>
          
          <View style={styles.statCard}>
            <Wind size={20} color={Colors.primary} />
            <Text style={styles.statValue}>{resort.conditions}</Text>
            <Text style={styles.statLabel}>Conditions</Text>
          </View>
        </View>
        
        <View style={styles.runsContainer}>
          <Text style={styles.sectionTitle}>Open Runs</Text>
          <View style={styles.runsInfo}>
            <Text style={styles.runsText}>
              {resort.openRuns}/{resort.totalRuns} runs open
            </Text>
            <View style={styles.runsBar}>
              <View 
                style={[
                  styles.runsProgress, 
                  { width: `${(resort.openRuns / resort.totalRuns) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {upcomingTrips.length > 0 && (
          <View style={styles.tripsContainer}>
            <Text style={styles.sectionTitle}>Your Upcoming Trips</Text>
            
            {upcomingTrips.map(trip => (
              <Pressable 
                key={trip.id}
                style={styles.tripCard}
                onPress={() => router.push(`/trip/${trip.id}`)}
              >
                <View style={styles.tripInfo}>
                  <Calendar size={20} color={Colors.primary} />
                  <View style={styles.tripDetails}>
                    <Text style={styles.tripDate}>{formatDate(trip.date)}</Text>
                    <Text style={styles.tripDuration}>
                      {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
                    </Text>
                  </View>
                </View>
                <ArrowRight size={20} color={Colors.text.light} />
              </Pressable>
            ))}
          </View>
        )}
        
        <ActionButton 
          title="Plan a Trip" 
          style={styles.planButton}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  heroContainer: {
    height: 300,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  runsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  runsInfo: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  runsText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  runsBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  runsProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  tripsContainer: {
    padding: 16,
    paddingTop: 8,
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDetails: {
    marginLeft: 12,
  },
  tripDate: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  tripDuration: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  planButton: {
    margin: 16,
  },
});