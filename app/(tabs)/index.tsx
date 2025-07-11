import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cloud, Calendar, LightbulbIcon } from 'lucide-react-native';

import { useUserStore } from '@/store/user-store';
import { useResortsStore } from '@/store/resorts-store';
import { useTripsStore } from '@/store/trips-store';
import { useSessionsStore } from '@/store/sessions-store';
import { useChecklistStore } from '@/store/checklist-store';

import ResortCard from '@/components/ResortCard';
import InfoCard from '@/components/InfoCard';
import ActionButton from '@/components/ActionButton';
import StatCard from '@/components/StatCard';
import BarChart from '@/components/BarChart';

import Colors from '@/constants/colors';
import { formatDate, getTimeUntil, getDayOfWeekShort } from '@/utils/date-utils';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { getPreferredResort } = useResortsStore();
  const { getNextTrip } = useTripsStore();
  const { getLastSession, getWeeklySessions } = useSessionsStore();
  
  const preferredResort = getPreferredResort(user?.preferredResortId);
  const nextTrip = getNextTrip();
  const lastSession = getLastSession();
  
  // Weekly sessions data for chart
  const weeklySessions = getWeeklySessions();
  const sessionCounts = weeklySessions.map(session => session.count);
  // Use single letter day abbreviations
  const sessionLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Create calendar icon with date number
  const CalendarIcon = ({ date }: { date: string }) => {
    const dayNumber = new Date(date).getDate();
    return (
      <View style={styles.calendarIcon}>
        <View style={styles.calendarTop} />
        <Text style={styles.calendarNumber}>{dayNumber}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>{user?.name}</Text>
        
        <ResortCard 
          title="Snow Resort Overview" 
          image={preferredResort.image}
          onPress={() => router.push(`/resort/${preferredResort.id}`)}
        />
        
        <InfoCard 
          icon={<Cloud size={24} color={Colors.secondary} />}
          title="Snow"
          subtitle={preferredResort.name}
          rightText={preferredResort.conditions}
          onPress={() => router.push('/resorts')}
        />
        
        <InfoCard 
          icon={<CalendarIcon date="2025-01-21" />}
          title="Next Trip"
          subtitle="January 21"
          rightText={nextTrip ? getTimeUntil(nextTrip.date) : ""}
          onPress={() => nextTrip && router.push(`/trip/${nextTrip.id}`)}
          actionButton={
            <ActionButton 
              title="Prepare Checklist" 
              style={styles.checklistButton}
              onPress={() => router.push('/checklist')}
            />
          }
        />
        
        <View style={styles.statsContainer}>
          <StatCard 
            icon={<LightbulbIcon size={20} color={Colors.warning} />}
            title="Last AI Feedback"
            content={
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText} numberOfLines={3}>
                  {lastSession?.feedback || "No feedback yet"}
                </Text>
              </View>
            }
            actionText="View All"
            onPress={() => router.push('/analyze')}
          />
          
          <StatCard 
            title="Weekly Ski Log"
            content={
              <BarChart 
                data={sessionCounts}
                labels={sessionLabels}
                height={80}
              />
            }
            actionText="View All"
            onPress={() => router.push('/analyze')}
          />
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
  greeting: {
    fontSize: 18,
    color: Colors.text.secondary,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 24,
  },
  checklistButton: {
    marginTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  feedbackContainer: {
    width: '100%',
    paddingHorizontal: 12,
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.text.primary,
    fontWeight: '500',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calendarTop: {
    position: 'absolute',
    top: 2,
    left: 4,
    right: 4,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  calendarNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
  },
});