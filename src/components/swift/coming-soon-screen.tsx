import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius } from '@/constants/swift-colors';
import { BottomNav, type BottomNavItem } from '@/components/swift/bottom-nav';

type ComingSoonScreenProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  navItems?: BottomNavItem[];
  activeKey?: string;
  activeColor?: string;
};

export function ComingSoonScreen({ title, icon, navItems, activeKey, activeColor }: ComingSoonScreenProps) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={navItems ? ['top'] : ['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Ionicons name={icon} size={32} color={SwiftColors.emerald} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>This section is being built. Check back soon.</Text>
          <Pressable style={styles.button} onPress={() => router.replace('/home')}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      {navItems && activeKey ? (
        <BottomNav
          items={navItems}
          activeKey={activeKey}
          activeColor={activeColor}
          onPress={(key) => {
            if (key === 'home') router.replace('/home');
            else if (key === 'market') router.replace('/marketplace');
            else if (key === 'trips') router.replace('/driver');
            else if (key !== activeKey) router.replace(`/${key}` as never);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
    gap: 8,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: SwiftRadius.lg,
    backgroundColor: 'rgba(0,109,64,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 20,
    color: SwiftColors.textPrimary,
  },
  subtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: SwiftColors.emerald,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: SwiftRadius.md,
  },
  buttonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
});
