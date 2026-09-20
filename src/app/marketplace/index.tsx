import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { ProductCard } from '@/components/swift/product-card';
import { marketplaceNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { exploreCategories, marketplaceCategories, products } from '@/services/dummy-data';

const LOGO = require('../../assets/images/logo.jpg');
const MARKET_ACCENT = '#835500';

function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);
  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  return { hours, minutes, seconds };
}

export default function MarketplaceScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { hours, minutes, seconds } = useCountdown(4 * 3600 + 18 * 60 + 21);

  const handleNavPress = (key: string) => {
    if (key === 'market') return;
    if (key === 'rides') router.push('/ride-selection');
    else router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <View>
              <Text style={styles.headerEyebrow}>SWIFT9JA</Text>
              <Text style={styles.headerTitle}>Marketplace Hub</Text>
              <View style={styles.headerLocationRow}>
                <Ionicons name="location" size={11} color={SwiftColors.textSecondary} />
                <Text style={styles.headerLocation}>Abuja CBD / Wuse 2</Text>
                <Ionicons name="chevron-down" size={9} color={SwiftColors.textSecondary} />
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={18} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productColumns}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => router.push(`/marketplace/${item.id}`)} onAdd={() => {}} />
        )}
        ListHeaderComponent={
          <View style={{ gap: 20 }}>
            <View style={styles.searchRow}>
              <View style={[styles.searchInput, SwiftShadow.card]}>
                <Ionicons name="search" size={16} color={SwiftColors.textMuted} />
                <Text style={styles.searchPlaceholder}>Search phones, rice, inverters, fabrics...</Text>
                <Pressable style={styles.searchIconButton}>
                  <Ionicons name="camera-outline" size={16} color={SwiftColors.textSecondary} />
                </Pressable>
                <Pressable style={styles.searchIconButton}>
                  <Ionicons name="mic-outline" size={16} color={SwiftColors.textSecondary} />
                </Pressable>
              </View>
              <Pressable style={[styles.filterButton, SwiftShadow.card]}>
                <Ionicons name="options" size={16} color={SwiftColors.textPrimary} />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {marketplaceCategories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <Pressable
                    key={category.id}
                    style={[styles.categoryChip, isActive && styles.categoryChipActive, SwiftShadow.card]}
                    onPress={() => setActiveCategory(category.id)}>
                    {category.id === 'naija' && !isActive ? (
                      <View style={styles.naijaDot} />
                    ) : null}
                    <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                      {category.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={[styles.flashSale, SwiftShadow.raised]}>
              <View style={styles.flashSaleTopRow}>
                <View style={styles.flashSaleBadge}>
                  <Ionicons name="flame" size={12} color={SwiftColors.amberDark} />
                  <Text style={styles.flashSaleBadgeText}>NAIJA MEGA FLASH SALE</Text>
                </View>
                <Text style={styles.flashSaleDiscount}>UP TO 45% OFF</Text>
              </View>
              <Text style={styles.flashSaleTitle}>Deals Hot Pass Fire!</Text>
              <View style={styles.flashSaleSubRow}>
                <Ionicons name="wallet-outline" size={12} color={SwiftColors.surfaceMuted2} />
                <Text style={styles.flashSaleSub}>
                  Pay Small Small with <Text style={styles.flashSaleSubStrong}>SwiftWallet Zero-Interest</Text>
                </Text>
              </View>
              <View style={styles.flashSaleTimerRow}>
                <View style={styles.timerGroup}>
                  {[
                    { value: hours, label: 'HRS' },
                    { value: minutes, label: 'MIN' },
                    { value: seconds, label: 'SEC' },
                  ].map((unit, index) => (
                    <View key={unit.label} style={styles.timerUnitWrap}>
                      {index > 0 ? <Text style={styles.timerColon}>:</Text> : null}
                      <View style={styles.timerUnit}>
                        <Text style={styles.timerValue}>{unit.value}</Text>
                        <Text style={styles.timerLabel}>{unit.label}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <Pressable style={styles.shopDealsButton}>
                  <Text style={styles.shopDealsText}>Shop Deals</Text>
                  <Ionicons name="arrow-forward" size={11} color={SwiftColors.amberDark} />
                </Pressable>
              </View>
            </View>

            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="grid" size={16} color={SwiftColors.textPrimary} />
                <Text style={styles.sectionTitle}>Explore Categories</Text>
              </View>
              <Text style={[styles.sectionAction, { color: MARKET_ACCENT }]}>See All (24)</Text>
            </View>
            <View style={styles.exploreGrid}>
              {exploreCategories.map((category) => (
                <Pressable key={category.id} style={styles.exploreItem}>
                  <View style={[styles.exploreIconWrap, { backgroundColor: category.bg }]}>
                    <Ionicons
                      name={category.icon as keyof typeof Ionicons.glyphMap}
                      size={24}
                      color={SwiftColors.textPrimary}
                    />
                  </View>
                  <Text style={styles.exploreLabel}>{category.label}</Text>
                  <Text style={styles.exploreDetail}>{category.detail}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="trending-up" size={16} color={SwiftColors.textPrimary} />
                <Text style={styles.sectionTitle}>Trending in Abuja CBD</Text>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={[styles.trustBanner, SwiftShadow.card]}>
            <View style={styles.trustLeft}>
              <View style={styles.trustIconWrap}>
                <Ionicons name="shield-checkmark" size={18} color={SwiftColors.textPrimary} />
              </View>
              <View>
                <Text style={styles.trustTitle}>Swift9JA Escrow Protection</Text>
                <Text style={styles.trustBody}>Funds released only after confirmation</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={14} color={SwiftColors.textSecondary} />
          </View>
        }
      />

      <View style={styles.cartBar}>
        <View style={styles.cartLeft}>
          <View style={styles.cartIconWrap}>
            <Ionicons name="cart" size={18} color={SwiftColors.white} />
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>3</Text>
            </View>
          </View>
          <View>
            <View style={styles.cartLabelRow}>
              <Text style={styles.cartLabel}>SWIFTCART</Text>
              <Text style={styles.cartDot}>•</Text>
              <Text style={styles.cartItems}>3 items</Text>
            </View>
            <Text style={styles.cartTotal}>₦2,048,000</Text>
          </View>
        </View>
        <Pressable style={styles.viewCartButton}>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Ionicons name="arrow-forward" size={12} color={SwiftColors.amberDark} />
        </Pressable>
      </View>

      <BottomNav
        items={marketplaceNavItems}
        activeKey="market"
        activeColor={MARKET_ACCENT}
        onPress={handleNavPress}
      />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerEyebrow: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: MARKET_ACCENT,
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  headerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  headerLocation: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textSecondary,
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
  listContent: {
    padding: 16,
    paddingBottom: 160,
    gap: 16,
  },
  productColumns: {
    gap: 10,
    marginBottom: 10,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    height: 52,
    paddingHorizontal: 16,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textMuted,
  },
  searchIconButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    flexGrow: 0,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: MARKET_ACCENT,
  },
  naijaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  flashSale: {
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 24,
    gap: 8,
    overflow: 'hidden',
  },
  flashSaleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flashSaleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  flashSaleBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.55,
    color: SwiftColors.amberDark,
  },
  flashSaleDiscount: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.55,
    color: SwiftColors.goldPale,
  },
  flashSaleTitle: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 26,
    color: '#EFF1F0',
    letterSpacing: -0.3,
  },
  flashSaleSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flashSaleSub: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: '#E6E9E8',
  },
  flashSaleSubStrong: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    color: SwiftColors.mint,
  },
  flashSaleTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timerGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerUnitWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerColon: {
    fontFamily: SwiftFontFamily.bodyBold,
    fontSize: 18,
    color: SwiftColors.goldPale,
  },
  timerUnit: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  timerValue: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: '#EFF1F0',
  },
  timerLabel: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 8,
    color: '#D8DADA',
    marginTop: 2,
  },
  shopDealsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  shopDealsText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.amberDark,
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
  sectionAction: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exploreItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  exploreIconWrap: {
    width: 64,
    height: 64,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  exploreDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted3,
    borderRadius: SwiftRadius.md,
    padding: 16,
  },
  trustLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  trustIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  trustBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  cartBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(46,49,49,0.95)',
    borderRadius: SwiftRadius.md,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.white,
  },
  cartLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.goldPale,
  },
  cartDot: {
    fontSize: 11,
    color: '#D8DADA',
  },
  cartItems: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: '#EFF1F0',
  },
  cartTotal: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: '#EFF1F0',
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 16,
    height: 44,
  },
  viewCartText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.amberDark,
  },
});
