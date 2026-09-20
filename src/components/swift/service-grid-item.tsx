import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import type { ServiceItem } from '@/services/dummy-data';

type ServiceGridItemProps = {
  service: ServiceItem;
  onPress: () => void;
};

export function ServiceGridItem({ service, onPress }: ServiceGridItemProps) {
  return (
    <Pressable style={[styles.card, SwiftShadow.card]} onPress={onPress}>
      {service.badge ? (
        <View style={[styles.badge, { backgroundColor: service.badge.bg }]}>
          <Text style={[styles.badgeText, { color: service.badge.color }]}>{service.badge.text}</Text>
        </View>
      ) : null}
      <View style={[styles.iconWrap, { backgroundColor: service.iconBg }]}>
        <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={22} color={SwiftColors.textPrimary} />
      </View>
      <Text style={styles.label}>{service.label}</Text>
      <Text style={styles.sublabel} numberOfLines={1}>
        {service.sublabel}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -4,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 6,
  },
  badgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  label: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  sublabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
});
