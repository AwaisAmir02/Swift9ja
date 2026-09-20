import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily } from '@/constants/swift-colors';

export type BottomNavItem = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
};

type BottomNavProps = {
  items: BottomNavItem[];
  activeKey: string;
  activeColor?: string;
  onPress: (key: string) => void;
};

export function BottomNav({ items, activeKey, activeColor = SwiftColors.emerald, onPress }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <BlurView intensity={80} tint="light" style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.row}>
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <Pressable key={item.key} onPress={() => onPress(item.key)} style={styles.tab} hitSlop={8}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={isActive ? activeColor : SwiftColors.textSecondary}
                />
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.label, { color: isActive ? activeColor : SwiftColors.textSecondary }]}>
                {item.label}
              </Text>
              {isActive && item.key === items[0].key ? <View style={styles.indicator} /> : null}
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SwiftColors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    height: 64,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrap: {
    position: 'relative',
  },
  label: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.44,
  },
  indicator: {
    position: 'absolute',
    top: -4,
    width: 24,
    height: 4,
    borderRadius: 9999,
    backgroundColor: SwiftColors.gold,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: SwiftColors.emerald,
    borderRadius: 9999,
    paddingHorizontal: 4,
    minWidth: 14,
    alignItems: 'center',
  },
  badgeText: {
    color: SwiftColors.white,
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    lineHeight: 13,
  },
});
