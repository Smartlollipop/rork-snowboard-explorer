import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Plus, Play, TrendingUp } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

// --- 修改数据源，直接引用本地图片 ---
const aiSuggestions = [
  {
    id: '1',
    title: 'Good parallel turns',
    image: require('@/assets/images/suggestion-1.jpg'),
  },
  {
    id: '2',
    title: 'Work on upper body stability',
    image: require('@/assets/images/suggestion-2.jpg'),
  },
  {
    id: '3',
    title: 'Focus on smoother turning',
    image: require('@/assets/images/suggestion-3.jpg'),
  },
  {
    id: '4',
    title: 'Keep a consistent stance',
    image: require('@/assets/images/suggestion-4.jpg'),
  },
];

export default function AnalyzeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/suggestion-4.jpg')} // 背景也使用本地图片
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <BlurView intensity={20} style={styles.backgroundBlur} />
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.8)', '#FFFFFF']}
          locations={[0, 0.3, 0.6, 1]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView 
              style={styles.scrollView}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>AI Analyze</Text>
                  <BlurView intensity={25} style={styles.addButton}>
                    <Plus size={18} color="#333" strokeWidth={2.5} />
                  </BlurView>
                </View>
              </View>
              
              <BlurView intensity={35} style={styles.overviewCard}>
                <View style={styles.overviewContent}>
                  <View style={styles.overviewText}>
                    <Text style={styles.overviewTitle}>Recent Perfect Turns</Text>
                    <Text style={styles.overviewSubtitle}>Overview</Text>
                  </View>
                  <View style={styles.trendIcon}>
                    <TrendingUp size={28} color="#333" strokeWidth={2.5} />
                  </View>
                </View>
              </BlurView>
              
              <View style={styles.suggestionsSection}>
                <Text style={styles.sectionTitle}>AI Suggestions</Text>
                
                <View style={styles.suggestionsGrid}>
                  {aiSuggestions.map((suggestion) => (
                    <Pressable key={suggestion.id} style={styles.suggestionCard}>
                      <Image
                        source={suggestion.image} // --- 现在 source 直接是 require(...) 的结果 ---
                        style={styles.suggestionImage}
                        contentFit="cover"
                        transition={200}
                      />
                      
                      <View style={styles.playButton}>
                        <Play size={14} color="white" fill="white" />
                      </View>
                      
                      <View style={styles.suggestionTextContainer}>
                        <BlurView intensity={45} tint="dark" style={styles.suggestionTextOverlay}>
                          <Text style={styles.suggestionText} numberOfLines={2}>
                            {suggestion.title}
                          </Text>
                        </BlurView>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  overviewCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 36,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  overviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewText: {
    flex: 1,
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  overviewSubtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  trendIcon: {
    marginLeft: 20,
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  suggestionCard: {
    width: '47%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  suggestionImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 16,
    zIndex: 1,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -24,
    marginLeft: -24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 3,
  },
  suggestionTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 2,
  },
  suggestionTextOverlay: {
    flex: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  suggestionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: -0.2,
  },
});