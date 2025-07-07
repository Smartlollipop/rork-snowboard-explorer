import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { Calendar, Clock, MapPin, Gauge, LightbulbIcon } from 'lucide-react-native';

import { useSessionsStore } from '@/store/sessions-store';
import { useResortsStore } from '@/store/resorts-store';
import Colors from '@/constants/colors';
import { formatDate } from '@/utils/date-utils';

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sessions } = useSessionsStore();
  const { getResortById } = useResortsStore();
  
  const session = sessions.find(s => s.id === id);
  const resort = session ? getResortById(session.resortId) : null;
  
  if (!session || !resort) {
    return (
      <View style={styles.container}>
        <Text>Session not found</Text>
      </View>
    );
  }
  
  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Session Details",
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Session Summary</Text>
          
          <View style={styles.dateContainer}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.dateText}>{formatDate(session.date)}</Text>
          </View>
          
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
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Clock size={24} color={Colors.primary} />
            <Text style={styles.statValue}>{formatDuration(session.duration)}</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
          
          <View style={styles.statCard}>
            <MapPin size={24} color={Colors.primary} />
            <Text style={styles.statValue}>{session.distance.toFixed(1)} km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          
          <View style={styles.statCard}>
            <Gauge size={24} color={Colors.primary} />
            <Text style={styles.statValue}>{session.maxSpeed} km/h</Text>
            <Text style={styles.statLabel}>Max Speed</Text>
          </View>
        </View>
        
        {session.feedback && (
          <View style={styles.feedbackCard}>
            <View style={styles.feedbackHeader}>
              <LightbulbIcon size={24} color={Colors.warning} />
              <Text style={styles.feedbackTitle}>AI Feedback</Text>
            </View>
            <Text style={styles.feedbackText}>{session.feedback}</Text>
          </View>
        )}
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>
          
          <View style={styles.insightRow}>
            <View style={styles.insightLabel}>
              <Text style={styles.insightLabelText}>Turns</Text>
            </View>
            <View style={styles.insightBar}>
              <View style={[styles.insightProgress, { width: '85%' }]} />
            </View>
            <Text style={styles.insightValue}>8.5/10</Text>
          </View>
          
          <View style={styles.insightRow}>
            <View style={styles.insightLabel}>
              <Text style={styles.insightLabelText}>Speed Control</Text>
            </View>
            <View style={styles.insightBar}>
              <View style={[styles.insightProgress, { width: '70%' }]} />
            </View>
            <Text style={styles.insightValue}>7/10</Text>
          </View>
          
          <View style={styles.insightRow}>
            <View style={styles.insightLabel}>
              <Text style={styles.insightLabelText}>Balance</Text>
            </View>
            <View style={styles.insightBar}>
              <View style={[styles.insightProgress, { width: '90%' }]} />
            </View>
            <Text style={styles.insightValue}>9/10</Text>
          </View>
          
          <View style={styles.insightRow}>
            <View style={styles.insightLabel}>
              <Text style={styles.insightLabelText}>Stamina</Text>
            </View>
            <View style={styles.insightBar}>
              <View style={[styles.insightProgress, { width: '75%' }]} />
            </View>
            <Text style={styles.insightValue}>7.5/10</Text>
          </View>
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 8,
  },
  resortRow: {
    flexDirection: 'row',
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  feedbackCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginLeft: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: Colors.text.primary,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightLabel: {
    width: 100,
  },
  insightLabelText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  insightBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  insightProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  insightValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.primary,
    width: 40,
    textAlign: 'right',
  },
});