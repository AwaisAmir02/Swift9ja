import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { homeNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { currentUser, rideCategories, rideRoute } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function RideSelectionScreen() {
  const [selectedId, setSelectedId] = useState(rideCategories[0].id);
  const selected = rideCategories.find((category) => category.id === selectedId) ?? rideCategories[0];

  const handleNavPress = (key: string) => {
    if (key === 'home') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <View>
              <Text style={styles.headerBrand}>SWIFT9JA</Text>
              <Text style={styles.headerTitle}>Home</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={18} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={14} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mapStage}>
          <View style={styles.pin}>
            <View style={[styles.pinDot, { backgroundColor: SwiftColors.gold }]}>
              <Ionicons name="ellipse" size={10} color={SwiftColors.white} />
            </View>
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>{rideRoute.pickup}</Text>
            </View>
          </View>
          <View style={[styles.pin, styles.pinRight]}>
            <View style={[styles.pinDot, { backgroundColor: SwiftColors.emerald }]}>
              <Ionicons name="flag" size={11} color={SwiftColors.white} />
            </View>
            <View style={styles.pinLabel}>
              <Text style={styles.pinLabelText}>{rideRoute.destination}</Text>
            </View>
          </View>

          <View style={styles.routeMetaBar}>
            <View style={[styles.routeMetaCard, SwiftShadow.raised]}>
              <View style={styles.routeMetaDot} />
              <View>
                <Text style={styles.routeMetaTitle}>
                  {rideRoute.durationMins} mins • {rideRoute.distanceKm} km
                </Text>
                <Text style={styles.routeMetaSubtitle}>
                  {rideRoute.pickup} → {rideRoute.destination}
                </Text>
              </View>
            </View>
            <Pressable style={[styles.addStopButton, SwiftShadow.raised]}>
              <Ionicons name="add-circle-outline" size={15} color={SwiftColors.textPrimary} />
              <Text style={styles.addStopText}>Add Stop</Text>
            </Pressable>
          </View>

          <Pressable style={[styles.recenterButton, SwiftShadow.raised]}>
            <Ionicons name="locate" size={18} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.sheetHeaderRow}>
            <View>
              <Text style={styles.sheetTitle}>Available Rides</Text>
              <Text style={styles.sheetSubtitle}>Optimal routes for Abuja traffic conditions</Text>
            </View>
            <View style={styles.dispatchBadge}>
              <View style={styles.dispatchDot} />
              <Text style={styles.dispatchBadgeText}>Fast Dispatch</Text>
            </View>
          </View>

          <View style={styles.categoriesList}>
            {rideCategories.map((category) => {
              const isSelected = category.id === selectedId;
              return (
                <Pressable
                  key={category.id}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  onPress={() => setSelectedId(category.id)}>
                  <View style={styles.categoryLeft}>
                    <View style={[styles.categoryIconWrap, { backgroundColor: category.iconBg }]}>
                      <Ionicons
                        name={category.icon as keyof typeof Ionicons.glyphMap}
                        size={22}
                        color={category.id === 'premium' ? SwiftColors.white : SwiftColors.textPrimary}
                      />
                      <View style={[styles.categoryTag, { backgroundColor: category.tagBg }]}>
                        <Text style={[styles.categoryTagText, { color: category.tagColor }]}>{category.tag}</Text>
                      </View>
                    </View>
                    <View style={styles.categoryInfo}>
                      <View style={styles.categoryNameRow}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                        <View style={styles.categorySeatsRow}>
                          <Ionicons name="people" size={11} color={SwiftColors.textSecondary} />
                          <Text style={styles.categorySeatsText}>{category.seats}</Text>
                        </View>
                      </View>
                      <Text style={styles.categoryDescription} numberOfLines={1}>
                        {category.description}
                      </Text>
                      <View style={styles.categoryPickupRow}>
                        <Ionicons name="time" size={11} color={category.pickupMins <= 3 ? SwiftColors.emerald : SwiftColors.textSecondary} />
                        <Text
                          style={[
                            styles.categoryPickupText,
                            { color: category.pickupMins <= 3 ? SwiftColors.emerald : SwiftColors.textSecondary },
                          ]}>
                          Pickup in {category.pickupMins} mins
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.categoryRight}>
                    <Text style={styles.categoryPrice}>₦{category.price.toLocaleString('en-NG')}</Text>
                    {category.originalPrice ? (
                      <Text style={styles.categoryOriginalPrice}>
                        ₦{category.originalPrice.toLocaleString('en-NG')}
                      </Text>
                    ) : (
                      <Text style={styles.categoryPriceNote}>{category.priceNote}</Text>
                    )}
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected ? <Ionicons name="checkmark" size={12} color={SwiftColors.white} /> : null}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.paymentCard}>
            <View style={styles.paymentTopRow}>
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconWrap}>
                  <Ionicons name="wallet" size={15} color={SwiftColors.white} />
                </View>
                <View>
                  <View style={styles.paymentNameRow}>
                    <Text style={styles.paymentName}>Swift Wallet</Text>
                    <View style={styles.paymentBalanceBadge}>
                      <Text style={styles.paymentBalanceText}>
                        ₦{currentUser.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.paymentSubtitle}>Instant settlement • Auto-deduct</Text>
                </View>
              </View>
              <Pressable style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change</Text>
                <Ionicons name="chevron-forward" size={12} color={SwiftColors.amber} />
              </Pressable>
            </View>
            <View style={styles.promoRow}>
              <View style={styles.promoLeft}>
                <Ionicons name="pricetag" size={13} color={SwiftColors.emerald} />
                <Text style={styles.promoText}>20% Promo: SWIFTABUJA (-₦900)</Text>
              </View>
              <Ionicons name="close" size={12} color={SwiftColors.textSecondary} />
            </View>
          </View>

          <View style={styles.actionRow}>
            <Pressable style={[styles.scheduleButton, SwiftShadow.card]}>
              <Ionicons name="calendar-outline" size={20} color={SwiftColors.textPrimary} />
            </Pressable>
            <Pressable style={styles.requestButton} onPress={() => router.push('/active-ride-tracking')}>
              <Ionicons name="flash" size={15} color={SwiftColors.amberDeepest} />
              <Text style={styles.requestButtonText}>
                Request {selected.name} • ₦{selected.price.toLocaleString('en-NG')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.trustRow}>
            <Ionicons name="shield-checkmark" size={13} color={SwiftColors.textSecondary} />
            <Text style={styles.trustText}>
              Verified NTPP Chauffeurs • 4-digit Safety PIN & live trip sharing active
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav items={homeNavItems} activeKey="home" onPress={handleNavPress} />
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
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerBrand: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    letterSpacing: 0.8,
    color: SwiftColors.emerald,
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
    paddingBottom: 96,
  },
  mapStage: {
    height: 260,
    backgroundColor: SwiftColors.surfaceMuted2,
  },
  pin: {
    position: 'absolute',
    left: 40,
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pinRight: {
    left: undefined,
    right: 32,
    top: 92,
  },
  pinDot: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinLabel: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pinLabelText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  routeMetaBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  routeMetaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexShrink: 1,
  },
  routeMetaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: SwiftColors.emerald,
  },
  routeMetaTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  routeMetaSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  addStopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addStopText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    backgroundColor: SwiftColors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 9999,
    backgroundColor: SwiftColors.border,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  sheetSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textSecondary,
    marginTop: 2,
    maxWidth: 220,
  },
  dispatchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dispatchDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  dispatchBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emeraldDark,
  },
  categoriesList: {
    gap: 8,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  categoryCardSelected: {
    backgroundColor: 'rgba(255,221,180,0.2)',
    ...SwiftShadow.card,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIconWrap: {
    width: 52,
    height: 56,
    borderRadius: SwiftRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: SwiftRadius.md,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  categoryTagText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
  },
  categoryInfo: {
    flex: 1,
    gap: 1,
  },
  categoryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  categorySeatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  categorySeatsText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  categoryDescription: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  categoryPickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  categoryPickupText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
  },
  categoryRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  categoryPrice: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  categoryOriginalPrice: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textMuted,
    textDecorationLine: 'line-through',
  },
  categoryPriceNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  radioSelected: {
    backgroundColor: SwiftColors.gold,
  },
  paymentCard: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 8,
  },
  paymentTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  paymentBalanceBadge: {
    backgroundColor: SwiftColors.mint,
    borderRadius: 4,
    paddingHorizontal: 6,
  },
  paymentBalanceText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  paymentSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.amber,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  scheduleButton: {
    width: 52,
    height: 52,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  requestButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDeepest,
    textAlign: 'center',
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  trustText: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
});
