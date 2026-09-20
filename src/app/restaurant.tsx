import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { featuredDish, menuCategories, menuItems, restaurantDetail } from '@/services/dummy-data';

export default function RestaurantScreen() {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(5400);

  const addToCart = (price: number) => {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => prev + price);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={15} color={SwiftColors.textPrimary} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>{restaurantDetail.name.split(' ')[0]}</Text>
            <Text style={styles.headerSubtitle}>{restaurantDetail.location}</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerIconButton}>
              <Ionicons name="search" size={14} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.headerIconButton}>
              <Ionicons name="heart-outline" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.headerIconButton}>
              <Ionicons name="share-social-outline" size={14} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.deliveryBar}>
          <View style={styles.deliveryLeft}>
            <Ionicons name="location" size={13} color={SwiftColors.textPrimary} />
            <Text style={styles.deliveryText} numberOfLines={1}>
              Delivering to: <Text style={styles.deliveryTextStrong}>{restaurantDetail.deliverTo}</Text>
            </Text>
          </View>
          <View style={styles.deliveryEtaPill}>
            <Text style={styles.deliveryEtaText}>{restaurantDetail.deliverEta}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroImage}>
          <View style={styles.openBadge}>
            <View style={styles.openDot} />
            <Text style={styles.openBadgeText}>{restaurantDetail.status}</Text>
          </View>
        </View>

        <View style={[styles.identityCard, SwiftShadow.raised]}>
          <View style={styles.identityTopRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.identityNameRow}>
                <Text style={styles.identityName}>{restaurantDetail.name}</Text>
                <Ionicons name="checkmark-circle" size={16} color={SwiftColors.emerald} />
              </View>
              <Text style={styles.identityCuisine}>{restaurantDetail.cuisine}</Text>
            </View>
            <View style={styles.identityRatingWrap}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color={SwiftColors.amberDeepest} />
                <Text style={styles.ratingBadgeText}>{restaurantDetail.rating}</Text>
              </View>
              <Text style={styles.ratingCount}>{restaurantDetail.ratingsCount.toLocaleString('en-NG')}+ ratings</Text>
            </View>
          </View>

          <View style={styles.metricsStrip}>
            <View style={styles.metricGroup}>
              <Ionicons name="time" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.metricText}>{restaurantDetail.etaMins}</Text>
            </View>
            <Text style={styles.metricDot}>•</Text>
            <View style={styles.metricGroup}>
              <Ionicons name="navigate" size={12} color={SwiftColors.textSecondary} />
              <Text style={styles.metricText}>{restaurantDetail.distanceKm} km</Text>
            </View>
            <Text style={styles.metricDot}>•</Text>
            <View style={styles.metricGroup}>
              <Ionicons name="bicycle" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.metricText}>{restaurantDetail.deliveryFee}</Text>
            </View>
          </View>

          <View style={styles.perkRow}>
            <Ionicons name="ribbon" size={13} color={SwiftColors.emerald} />
            <Text style={styles.perkText}>
              Free delivery active with <Text style={styles.perkTextStrong}>Swift9JA Pass</Text>
            </Text>
          </View>
        </View>

        <View style={styles.promoSection}>
          <View style={styles.promoRow}>
            <View style={styles.promoLeft}>
              <View style={styles.promoIconWrap}>
                <Ionicons name="pricetag" size={14} color={SwiftColors.white} />
              </View>
              <View>
                <Text style={styles.promoTitle}>
                  {restaurantDetail.promoDiscount} • Code: {restaurantDetail.promoCode}
                </Text>
                <Text style={styles.promoSubtitle}>
                  Min. order ₦{restaurantDetail.promoMinOrder.toLocaleString('en-NG')} | Applied at checkout
                </Text>
              </View>
            </View>
            <Pressable style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Apply</Text>
            </Pressable>
          </View>
          <View style={styles.pointsRow}>
            <Ionicons name="trophy-outline" size={13} color={SwiftColors.textSecondary} />
            <Text style={styles.pointsText}>
              Earn <Text style={styles.pointsTextStrong}>2x SwiftPoints ({restaurantDetail.swiftPoints} pts)</Text> on
              this kitchen order today!
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
          {menuCategories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <Pressable
                key={category.id}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setActiveCategory(category.id)}>
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <Ionicons name="flame" size={16} color={SwiftColors.textPrimary} />
              <Text style={styles.sectionTitle}>Kilimanjaro Signature</Text>
            </View>
            <Text style={styles.chefsPick}>Chef&apos;s Pick</Text>
          </View>

          <View style={[styles.featuredCard, SwiftShadow.card]}>
            <View style={styles.featuredImage}>
              <View style={styles.featuredBadgesRow}>
                <View style={styles.bestsellerBadge}>
                  <Text style={styles.bestsellerBadgeText}>{featuredDish.badge}</Text>
                </View>
                <View style={styles.recipeBadge}>
                  <Text style={styles.recipeBadgeText}>{featuredDish.subBadge}</Text>
                </View>
              </View>
              <Ionicons name="restaurant" size={44} color={SwiftColors.textFaint} style={styles.featuredIcon} />
            </View>
            <View style={styles.featuredBody}>
              <View style={styles.featuredTopRow}>
                <Text style={styles.featuredName}>{featuredDish.name}</Text>
                <View style={styles.featuredPriceWrap}>
                  <Text style={styles.featuredPrice}>₦{featuredDish.price.toLocaleString('en-NG')}</Text>
                  <Text style={styles.featuredOriginalPrice}>
                    ₦{featuredDish.originalPrice.toLocaleString('en-NG')}
                  </Text>
                </View>
              </View>
              <Text style={styles.featuredDescription}>{featuredDish.description}</Text>
              <View style={styles.featuredBottomRow}>
                <View style={styles.featuredNoteRow}>
                  <Ionicons name="options-outline" size={12} color={SwiftColors.textFaint} />
                  <Text style={styles.featuredNote}>{featuredDish.note}</Text>
                </View>
                <Pressable style={styles.addOrderButton} onPress={() => addToCart(featuredDish.price)}>
                  <Ionicons name="add" size={13} color={SwiftColors.amberDark} />
                  <Text style={styles.addOrderButtonText}>Add to Order</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Delicacies</Text>
            <Text style={styles.itemCount}>{menuItems.length + 14} Items</Text>
          </View>

          <View style={styles.menuList}>
            {menuItems.map((item) => (
              <View key={item.id} style={[styles.menuCard, SwiftShadow.card]}>
                <View style={styles.menuInfo}>
                  <View style={styles.menuNameRow}>
                    {item.dotColor ? <View style={[styles.menuDot, { backgroundColor: item.dotColor }]} /> : null}
                    <Text style={styles.menuName}>{item.name}</Text>
                  </View>
                  <Text style={styles.menuDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.menuBottomRow}>
                    <Text style={styles.menuPrice}>₦{item.price.toLocaleString('en-NG')}</Text>
                    {item.tag ? (
                      <View style={[styles.menuTag, { backgroundColor: item.tag.bg }]}>
                        <Text style={[styles.menuTagText, { color: item.tag.color }]}>{item.tag.text}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <Pressable style={styles.menuAddButton} onPress={() => addToCart(item.price)}>
                  <Ionicons name="add" size={16} color={SwiftColors.textPrimary} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {cartCount > 0 ? (
        <SafeAreaView style={styles.cartBarWrap} edges={['bottom']}>
          <Pressable style={[styles.cartBar, SwiftShadow.raised]} onPress={() => router.push('/food-checkout')}>
            <View style={styles.cartLeft}>
              <View style={styles.cartCountWrap}>
                <Text style={styles.cartCountText}>{cartCount}</Text>
              </View>
              <View>
                <View style={styles.cartTotalRow}>
                  <Text style={styles.cartTotal}>₦{cartTotal.toLocaleString('en-NG')}</Text>
                  <Text style={styles.cartRestaurant}>• {restaurantDetail.name.split(' ')[0]}</Text>
                </View>
                <Text style={styles.cartNote}>SwiftPass: ₦0 Delivery applied</Text>
              </View>
            </View>
            <View style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
              <Ionicons name="arrow-forward" size={12} color={SwiftColors.amberDark} />
            </View>
          </Pressable>
        </SafeAreaView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  header: {
    backgroundColor: 'rgba(248,250,249,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: SwiftColors.border,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 6,
  },
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deliveryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  deliveryText: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  deliveryTextStrong: {
    fontFamily: SwiftFontFamily.headingBold,
  },
  deliveryEtaPill: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  deliveryEtaText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  heroImage: {
    height: 152,
    backgroundColor: SwiftColors.surfaceMuted2,
    justifyContent: 'flex-start',
  },
  openBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 12,
  },
  openDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.mint,
  },
  openBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    letterSpacing: 0.25,
    color: SwiftColors.white,
    textTransform: 'uppercase',
  },
  identityCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    marginHorizontal: 16,
    marginTop: -40,
    gap: 10,
  },
  identityTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  identityNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  identityName: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 22,
    color: SwiftColors.textPrimary,
    letterSpacing: -0.22,
  },
  identityCuisine: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  identityRatingWrap: {
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.goldPale,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ratingBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.amberDeepest,
  },
  ratingCount: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.textFaint,
    marginTop: 2,
  },
  metricsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(242,244,243,0.7)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  metricGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  metricDot: {
    fontSize: 11,
    color: SwiftColors.textFaint,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  perkText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  perkTextStrong: {
    fontFamily: SwiftFontFamily.headingBold,
  },
  promoSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  promoIconWrap: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDeepest,
  },
  promoSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  promoButton: {
    backgroundColor: SwiftColors.amber,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  promoButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.white,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  pointsText: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  pointsTextStrong: {
    fontFamily: SwiftFontFamily.headingBold,
    color: SwiftColors.textSecondary,
  },
  categoryRow: {
    flexGrow: 0,
    marginTop: 16,
  },
  categoryChip: {
    backgroundColor: SwiftColors.border,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 16,
  },
  categoryChipActive: {
    backgroundColor: SwiftColors.emerald,
  },
  categoryChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  categoryChipTextActive: {
    color: SwiftColors.white,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  chefsPick: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.emerald,
  },
  itemCount: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  featuredCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 176,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredIcon: {
    opacity: 0.6,
  },
  featuredBadgesRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 6,
  },
  bestsellerBadge: {
    backgroundColor: SwiftColors.amber,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  bestsellerBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.white,
  },
  recipeBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  recipeBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.textPrimary,
  },
  featuredBody: {
    padding: 16,
    gap: 10,
  },
  featuredTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  featuredName: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 17,
    color: SwiftColors.textPrimary,
  },
  featuredPriceWrap: {
    alignItems: 'flex-end',
  },
  featuredPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.emerald,
  },
  featuredOriginalPrice: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textFaint,
    textDecorationLine: 'line-through',
  },
  featuredDescription: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    lineHeight: 19.5,
    color: SwiftColors.textSecondary,
  },
  featuredBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredNote: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textFaint,
  },
  addOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addOrderButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.amberDark,
  },
  menuList: {
    gap: 10,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 8,
  },
  menuInfo: {
    flex: 1,
    gap: 4,
  },
  menuNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  menuName: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  menuDescription: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  menuBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  menuPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.emerald,
  },
  menuTag: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  menuTagText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
  },
  menuAddButton: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBarWrap: {
    backgroundColor: 'transparent',
  },
  cartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartCountWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDark,
  },
  cartTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartTotal: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: '#EFF1F0',
  },
  cartRestaurant: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: '#C3C8C4',
  },
  cartNote: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.mint,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  checkoutButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.amberDark,
  },
});
