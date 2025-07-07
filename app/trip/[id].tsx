import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Calendar, Clock, MapPin, CheckSquare, Cloud } from 'lucide-react-native';

import { useTripsStore } from '@/store/trips-store';
import { useResortsStore } from '@/store/resorts-store';
import { useChecklistStore } from '@/store/checklist-store';
import ActionButton from '@/components/ActionButton';
import Colors from '@/constants/colors';
import { formatDate, getTimeUntil } from '@/utils/date-utils';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips } = useTripsStore();
  const { getResortById } = useResortsStore();
  const { getCompletionPercentage } = useChecklistStore();
  
  const trip = trips.find(t => t.id === id);
  const resort = trip ? getResortById(trip.resortId) : null;
  const completionPercentage = getCompletionPercentage();
  
  if (!trip || !resort) {
    return (
      <View style={styles.container}>
        <Text>Trip not found</Text>
      </View>
    );
  }
  
  const tripDate = new Date(trip.date);
  const isUpcoming = tripDate > new Date();
  const timeUntil = isUpcoming ? getTimeUntil(trip.date) : '';
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Trip Details",
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Your Trip to {resort.name}</Text>
          
          <View style={styles.resortRow}>
            <Image
              source={{ uri: resort.image }}
              style={styles.resortImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.resortInfo}>
              <Text style={styles.resortName}>{resort.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color={Colors.text.secondary} />
                <Text style={styles.locationText}>{resort.location}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.tripDetails}>
            <View style={styles.tripDetail}>
              <Calendar size={20} color={Colors.primary} />
              <View style={styles.tripDetailTexts}>
                <Text style={styles.tripDetailLabel}>Date</Text>
                <Text style={styles.tripDetailValue}>{formatDate(trip.date)}</Text>
              </View>
            </View>
            
            <View style={styles.tripDetail}>
              <Clock size={20} color={Colors.primary} />
              <View style={styles.tripDetailTexts}>
                <Text style={styles.tripDetailLabel}>Duration</Text>
                <Text style={styles.tripDetailValue}>
                  {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
                </Text>
              </View>
            </View>
          </View>
          
          {isUpcoming && timeUntil && (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownLabel}>Trip starts in</Text>
              <Text style={styles.countdownValue}>{timeUntil}</Text>
            </View>
          )}
        </View>
        
        {isUpcoming && (
          <View style={styles.card}>
            <View style={styles.checklistHeader}>
              <View style={styles.checklistTitleContainer}>
                <CheckSquare size={20} color={Colors.primary} />
                <Text style={styles.checklistTitle}>Trip Checklist</Text>
              </View>
              <View style={styles.checklistBadge}>
                <Text style={styles.checklistBadgeText}>{completionPercentage}%</Text>
              </View>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
            
            <ActionButton 
              title="View Checklist" 
              variant="outline"
              style={styles.checklistButton}
            />
          </View>
        )}
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Weather Forecast</Text>
          <View style={styles.weatherContainer}>
            <View style={styles.weatherDay}>
              <Text style={styles.weatherDayText}>Today</Text>
              <Cloud size={24} color={Colors.primary} />
              <Text style={styles.weatherTemp}>{resort.temperature}°C</Text>
              <Text style={styles.weatherCondition}>{resort.conditions}</Text>
            </View>
            <View style={styles.weatherDay}>
              <Text style={styles.weatherDayText}>Tomorrow</Text>
              <Cloud size={24} color={Colors.primary} />
              <Text style={styles.weatherTemp}>{resort.temperature - 1}°C</Text>
              <Text style={styles.weatherCondition}>{resort.conditions}</Text>
            </View>
            <View style={styles.weatherDay}>
              <Text style={styles.weatherDayText}>Day 3</Text>
              <Cloud size={24} color={Colors.primary} />
              <Text style={styles.weatherTemp}>{resort.temperature - 2}°C</Text>
              <Text style={styles.weatherCondition}>Fresh Powder</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <ActionButton 
            title={isUpcoming ? "Edit Trip" : "Plan Another Trip"} 
            style={styles.button}
          />
        </View>
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
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  resortRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  resortImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  resortInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  resortName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 4,
  },
  tripDetails: {
    marginBottom: 16,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tripDetailTexts: {
    marginLeft: 12,
  },
  tripDetailLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  tripDetailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  countdownContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  countdownLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  countdownValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checklistTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  checklistBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  checklistBadgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  checklistButton: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherDay: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  weatherDayText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  weatherTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: 8,
  },
  weatherCondition: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    width: '100%',
  },
});