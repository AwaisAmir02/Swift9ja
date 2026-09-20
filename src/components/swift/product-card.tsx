import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import type { Product } from '@/services/dummy-data';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
};

export function ProductCard({ product, onPress, onAdd }: ProductCardProps) {
  return (
    <Pressable style={[styles.card, SwiftShadow.card]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: product.imageColor }]}>
        <Ionicons name={product.icon as keyof typeof Ionicons.glyphMap} size={40} color={SwiftColors.textFaint} />
      </View>

      <View style={styles.badgesRow}>
        {product.badge ? (
          <View style={[styles.badge, { backgroundColor: product.badge.bg }]}>
            <Text style={[styles.badgeText, { color: product.badge.color }]}>{product.badge.text}</Text>
          </View>
        ) : null}
        {product.discountBadge ? (
          <View style={[styles.badge, { backgroundColor: SwiftColors.errorBg }]}>
            <Text style={[styles.badgeText, { color: SwiftColors.errorDeep }]}>{product.discountBadge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.wishlistButton}>
        <Ionicons name="heart-outline" size={15} color={SwiftColors.textPrimary} />
      </View>

      <View style={styles.body}>
        <View style={styles.ratingRow}>
          <View style={styles.ratingGroup}>
            <Ionicons name="star" size={11} color={SwiftColors.gold} />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviews})</Text>
          </View>
          <Text style={styles.stockText}>{product.stockLabel}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₦{product.price.toLocaleString('en-NG')}</Text>
          {product.originalPrice ? (
            <Text style={styles.originalPrice}>₦{product.originalPrice.toLocaleString('en-NG')}</Text>
          ) : null}
        </View>

        <Pressable style={styles.addButton} onPress={onAdd} hitSlop={4}>
          <Ionicons name="cart" size={14} color={SwiftColors.white} />
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    overflow: 'hidden',
  },
  image: {
    height: 144,
    margin: 12,
    marginBottom: 4,
    borderRadius: SwiftRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    gap: 4,
  },
  badge: {
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  reviewsText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  stockText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emerald,
  },
  title: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
    minHeight: 40,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 2,
  },
  price: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  originalPrice: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textMuted,
    textDecorationLine: 'line-through',
  },
  addButton: {
    marginTop: 8,
    height: 40,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.emerald,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
});
