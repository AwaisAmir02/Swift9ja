import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { productDetail, products } from '@/services/dummy-data';

const LOGO = require('../../assets/images/logo.jpg');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [storageIndex, setStorageIndex] = useState(1);
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
            </Pressable>
            <Image source={LOGO} style={styles.headerLogo} />
            <Text style={styles.headerTitle}>Product Checkout</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="help-circle-outline" size={18} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topUtilityRow}>
          <View style={styles.authenticBadge}>
            <Ionicons name="shield-checkmark" size={12} color={SwiftColors.emeraldDark} />
            <Text style={styles.authenticBadgeText}>Authentic Guaranteed</Text>
          </View>
          <View style={styles.utilityActions}>
            <Pressable style={styles.utilityButton}>
              <Ionicons name="share-social-outline" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.utilityButton}>
              <Ionicons name="heart-outline" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.imageGallery, SwiftShadow.card]}>
          <Ionicons name={product.icon as keyof typeof Ionicons.glyphMap} size={72} color={SwiftColors.textFaint} />
          <View style={styles.warrantyPill}>
            <Ionicons name="shield-checkmark" size={11} color="#EFF1F0" />
            <Text style={styles.warrantyPillText}>1-Yr Apple + Swift9ja Swap</Text>
          </View>
          <View style={styles.viewHint}>
            <Ionicons name="camera-reverse-outline" size={11} color={SwiftColors.textSecondary} />
            <Text style={styles.viewHintText}>360° View</Text>
          </View>
        </View>
        <View style={styles.paginationDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleBadgeRow}>
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>OFFICIAL NIGERIAN STOCK</Text>
            </View>
            {product.originalPrice ? (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>
                  Save ₦{(product.originalPrice - product.price).toLocaleString('en-NG')}
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.title}>{productDetail.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₦{product.price.toLocaleString('en-NG')}</Text>
            {product.originalPrice ? (
              <Text style={styles.originalPrice}>₦{product.originalPrice.toLocaleString('en-NG')}</Text>
            ) : null}
          </View>

          <LinearGradient
            colors={['#FFDDB4', 'rgba(255,185,85,0.4)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.perkCard, SwiftShadow.card]}>
            <View style={styles.perkLeft}>
              <View style={styles.perkIconWrap}>
                <Ionicons name="diamond" size={15} color={SwiftColors.white} />
              </View>
              <View>
                <Text style={styles.perkTitle}>SwiftPass Exclusive Perk</Text>
                <Text style={styles.perkSubtitle}>Instant ₦15,000 cash rebate on checkout</Text>
              </View>
            </View>
            <Pressable style={styles.perkButton}>
              <Text style={styles.perkButtonText}>Apply</Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View style={[styles.bnplBanner, SwiftShadow.card]}>
          <View style={styles.bnplIconWrap}>
            <Ionicons name="card" size={16} color={SwiftColors.emeraldDark} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <View style={styles.bnplTopRow}>
              <Text style={styles.bnplTitle}>SwiftPay BNPL (4 Months)</Text>
              <View style={styles.bnplInterestBadge}>
                <Text style={styles.bnplInterestText}>0% Interest</Text>
              </View>
            </View>
            <Text style={styles.bnplBody}>
              Pay <Text style={styles.bnplBodyStrong}>₦{productDetail.bnplMonthly.toLocaleString('en-NG')}/mo</Text>{' '}
              with instant Providus Bank approval.
            </Text>
          </View>
        </View>

        <View style={styles.specsSection}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Storage Capacity</Text>
            <Text style={styles.specSelected}>
              Selected: <Text style={styles.specSelectedStrong}>{productDetail.storageOptions[storageIndex].label}</Text>
            </Text>
          </View>
          <View style={styles.storageRow}>
            {productDetail.storageOptions.map((option, index) => {
              const isActive = index === storageIndex;
              return (
                <Pressable
                  key={option.label}
                  style={[styles.storageOption, isActive && styles.storageOptionActive]}
                  onPress={() => setStorageIndex(index)}>
                  <Text style={[styles.storageOptionLabel, isActive && styles.storageOptionLabelActive]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.storageOptionPrice, isActive && styles.storageOptionPriceActive]}>
                    {option.price}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Finish Color</Text>
            <Text style={styles.specSelectedAccent}>{productDetail.colorOptions[colorIndex].label}</Text>
          </View>
          <View style={styles.colorRow}>
            {productDetail.colorOptions.map((option, index) => {
              const isActive = index === colorIndex;
              return (
                <Pressable
                  key={option.label}
                  style={[styles.colorSwatchWrap, isActive && styles.colorSwatchWrapActive]}
                  onPress={() => setColorIndex(index)}>
                  <View style={[styles.colorSwatch, { backgroundColor: option.hex }]} />
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.deliveryCard, SwiftShadow.card]}>
          <View style={styles.deliveryTopRow}>
            <View style={styles.deliveryIconWrap}>
              <Ionicons name="bicycle" size={18} color={SwiftColors.emeraldDark} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.deliveryTitleRow}>
                <Text style={styles.deliveryTitle}>SwiftCourier Express</Text>
                <View style={styles.deliveryDot} />
              </View>
              <Text style={styles.deliveryBody}>
                Dispatches in <Text style={styles.deliveryBodyStrong}>45 mins</Text> {productDetail.dispatch.split('mins')[1]}
              </Text>
            </View>
          </View>
          <View style={styles.escrowRow}>
            <View style={styles.escrowLeft}>
              <Ionicons name="shield-checkmark-outline" size={14} color={SwiftColors.textSecondary} />
              <Text style={styles.escrowText}>Escrow payment protected</Text>
            </View>
            <Text style={styles.freeDeliveryText}>FREE DELIVERY</Text>
          </View>
        </View>

        <View style={[styles.sellerCard, SwiftShadow.card]}>
          <View style={styles.sellerLeft}>
            <View style={styles.sellerAvatar}>
              <Ionicons name="storefront" size={22} color={SwiftColors.textPrimary} />
            </View>
            <View>
              <View style={styles.sellerNameRow}>
                <Text style={styles.sellerName}>{productDetail.seller.name}</Text>
                <Ionicons name="checkmark-circle" size={13} color={SwiftColors.emerald} />
              </View>
              <View style={styles.sellerStatsRow}>
                <View style={styles.sellerStatGroup}>
                  <Ionicons name="star" size={11} color={SwiftColors.gold} />
                  <Text style={styles.sellerStatRating}>{productDetail.seller.rating}</Text>
                </View>
                <Text style={styles.sellerStatDot}>•</Text>
                <Text style={styles.sellerStatText}>{productDetail.seller.orders} orders</Text>
                <Text style={styles.sellerStatDot}>•</Text>
                <Text style={styles.sellerStatOnTime}>{productDetail.seller.onTime} On-Time</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.sellerChevron}>
            <Ionicons name="chevron-forward" size={14} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.trustBadgesRow}>
          {[
            { icon: 'checkmark-circle', title: '100% Genuine', sub: 'Direct Apple seal' },
            { icon: 'refresh-circle', title: '7 Days Return', sub: 'Zero penalty swap' },
            { icon: 'shield-checkmark', title: 'SwiftShield', sub: 'Theft protection' },
          ].map((badge) => (
            <View key={badge.title} style={[styles.trustBadge, SwiftShadow.card]}>
              <Ionicons name={badge.icon as keyof typeof Ionicons.glyphMap} size={18} color={SwiftColors.emeraldDark} />
              <Text style={styles.trustBadgeTitle}>{badge.title}</Text>
              <Text style={styles.trustBadgeSub}>{badge.sub}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView style={styles.checkoutBar} edges={['bottom']}>
        <View style={styles.checkoutRow}>
          <Pressable style={styles.chatButton}>
            <Ionicons name="chatbubble-ellipses-outline" size={17} color={SwiftColors.textPrimary} />
            <Text style={styles.chatButtonText}>Chat</Text>
          </Pressable>
          <LinearGradient
            colors={[SwiftColors.emerald, SwiftColors.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyNowButton}>
            <Pressable style={styles.buyNowInner} onPress={() => router.push('/marketplace')}>
              <View>
                <Text style={styles.buyNowLabel}>Instant SwiftCheckout</Text>
                <Text style={styles.buyNowText}>Buy Now</Text>
              </View>
              <View style={styles.buyNowPriceWrap}>
                <Text style={styles.buyNowPrice}>₦{product.price.toLocaleString('en-NG')}</Text>
                <Ionicons name="arrow-forward" size={12} color={SwiftColors.goldPale} />
              </View>
            </Pressable>
          </LinearGradient>
        </View>
      </SafeAreaView>
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 140,
    gap: 16,
  },
  topUtilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authenticBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.mint,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  authenticBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  utilityActions: {
    flexDirection: 'row',
    gap: 4,
  },
  utilityButton: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGallery: {
    aspectRatio: 4 / 3,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warrantyPill: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(46,49,49,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  warrantyPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: '#EFF1F0',
  },
  viewHint: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(248,250,249,0.8)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  viewHintText: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  paginationDots: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 6,
    borderRadius: 9999,
    backgroundColor: SwiftColors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: SwiftColors.gold,
  },
  titleSection: {
    gap: 8,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    gap: 4,
  },
  stockBadge: {
    backgroundColor: 'rgba(141,248,183,0.5)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  stockBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  saveBadge: {
    backgroundColor: 'rgba(255,218,214,0.6)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  saveBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.error,
  },
  title: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 22,
    color: SwiftColors.textPrimary,
    letterSpacing: -0.2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.textPrimary,
  },
  originalPrice: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textMuted,
    textDecorationLine: 'line-through',
  },
  perkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: SwiftRadius.md,
    padding: 8,
    marginTop: 4,
  },
  perkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  perkIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.amberDeepest,
  },
  perkSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.amberDeep,
    marginTop: 1,
  },
  perkButton: {
    backgroundColor: SwiftColors.amberDeepest,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  perkButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.goldPale,
  },
  bnplBanner: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
  },
  bnplIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.sm,
    backgroundColor: 'rgba(141,248,183,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bnplTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bnplTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  bnplInterestBadge: {
    backgroundColor: 'rgba(138,245,180,0.5)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bnplInterestText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  bnplBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textSecondary,
  },
  bnplBodyStrong: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    color: SwiftColors.textPrimary,
  },
  specsSection: {
    gap: 8,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  specSelected: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  specSelectedStrong: {
    color: SwiftColors.textPrimary,
    fontFamily: SwiftFontFamily.headingExtraBold,
  },
  specSelectedAccent: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
  },
  storageRow: {
    flexDirection: 'row',
    gap: 8,
  },
  storageOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SwiftColors.surfaceMuted3,
    borderRadius: SwiftRadius.md,
    paddingVertical: 10,
  },
  storageOptionActive: {
    backgroundColor: SwiftColors.gold,
  },
  storageOptionLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  storageOptionLabelActive: {
    color: SwiftColors.amberDark,
    fontFamily: SwiftFontFamily.headingBold,
  },
  storageOptionPrice: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 10,
    color: SwiftColors.textFaint,
    marginTop: 2,
  },
  storageOptionPriceActive: {
    color: 'rgba(100,64,0,0.8)',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorSwatchWrap: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatchWrapActive: {
    borderWidth: 2,
    borderColor: SwiftColors.gold,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
  },
  deliveryCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 8,
  },
  deliveryTopRow: {
    flexDirection: 'row',
    gap: 8,
  },
  deliveryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(141,248,183,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliveryTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  deliveryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.emerald,
  },
  deliveryBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  deliveryBodyStrong: {
    fontFamily: SwiftFontFamily.bodyBold,
    color: SwiftColors.textPrimary,
  },
  escrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  escrowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  escrowText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  freeDeliveryText: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    fontSize: 12,
    color: SwiftColors.emeraldDark,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
  },
  sellerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sellerName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  sellerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  sellerStatGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sellerStatRating: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    fontSize: 12,
    color: SwiftColors.gold,
  },
  sellerStatDot: {
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  sellerStatText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  sellerStatOnTime: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  sellerChevron: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    gap: 4,
  },
  trustBadge: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingVertical: 8,
    gap: 4,
  },
  trustBadgeTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
  },
  trustBadgeSub: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textMuted,
    textAlign: 'center',
  },
  checkoutBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SwiftColors.border,
  },
  checkoutRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chatButton: {
    width: 60,
    minHeight: 52,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  chatButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.textPrimary,
  },
  buyNowButton: {
    flex: 1,
    borderRadius: SwiftRadius.md,
  },
  buyNowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buyNowLabel: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  buyNowText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.white,
  },
  buyNowPriceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(46,49,49,0.3)',
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buyNowPrice: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 14,
    color: SwiftColors.goldPale,
  },
});
