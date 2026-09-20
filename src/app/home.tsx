import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { ServiceGridItem } from '@/components/swift/service-grid-item';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { homeNavItems } from '@/constants/nav-items';
import {
  currentUser,
  everydayServices,
  quickServices,
  recentPlaces,
  recommendedRestaurant,
  savedPlaces,
} from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function HomeScreen() {
  const handleNavPress = (key: string) => {
    if (key === 'home') return;
    router.push(`/${key}` as never);
  };

  const handleServicePress = (id: string) => {
    if (id === 'market') router.push('/marketplace');
    else if (id === 'ride' || id === 'shared') router.push('/ride-selection');
    else if (id === 'food') router.push('/restaurant');
    else if (id === 'courier') router.push('/courier-booking');
    else if (id === 'swiftcare') router.push('/swiftcare');
    else router.push('/activity');
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
        <View style={styles.topRow}>
          <View style={styles.userRow}>
            <View style={styles.userAvatarWrap}>
              <Image source={LOGO} style={styles.userAvatar} />
            </View>
            <View>
              <Text style={styles.greeting}>
                {currentUser.greeting}, {currentUser.firstName} 👋
              </Text>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={12} color={SwiftColors.textPrimary} />
                <Text style={styles.locationText}>{currentUser.location}</Text>
                <Ionicons name="chevron-down" size={10} color={SwiftColors.textPrimary} />
              </View>
            </View>
          </View>
          <View style={styles.vipBadge}>
            <Ionicons name="diamond" size={12} color={SwiftColors.amber} />
            <Text style={styles.vipBadgeText}>{currentUser.tier}</Text>
          </View>
        </View>

        <View style={[styles.walletCard, SwiftShadow.raised]}>
          <View style={styles.walletTopRow}>
            <View style={styles.walletTopLeft}>
              <Text style={styles.walletLabel}>SWIFT WALLET</Text>
              <View style={styles.walletVerifiedPill}>
                <Text style={styles.walletVerifiedText}>Verified Tier-3</Text>
              </View>
            </View>
            <Ionicons name="eye-outline" size={16} color={SwiftColors.mint} />
          </View>

          <View style={styles.walletBalanceRow}>
            <Text style={styles.walletBalance}>
              ₦{currentUser.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>
            <View style={styles.cashbackPill}>
              <Text style={styles.cashbackText}>+{currentUser.cashbackPercent}% cashback</Text>
            </View>
          </View>

          <View style={styles.walletActions}>
            <Pressable style={styles.walletActionPrimary}>
              <Ionicons name="add-circle" size={15} color={SwiftColors.emerald} />
              <Text style={styles.walletActionPrimaryText}>Add Money</Text>
            </Pressable>
            <Pressable style={styles.walletActionGhost}>
              <Ionicons name="arrow-up" size={13} color={SwiftColors.white} />
              <Text style={styles.walletActionGhostText}>Send</Text>
            </Pressable>
            <Pressable style={styles.walletActionGhost}>
              <Ionicons name="qr-code" size={15} color={SwiftColors.white} />
              <Text style={styles.walletActionGhostText}>Scan QR</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.rideCard, SwiftShadow.card]}>
          <View style={styles.rideTopRow}>
            <View style={styles.rideTopLeft}>
              <View style={styles.rideIconWrap}>
                <Ionicons name="car-sport" size={16} color={SwiftColors.amberDeep} />
              </View>
              <View>
                <Text style={styles.rideTitle}>Swift Mobility</Text>
                <Text style={styles.rideSubtitle}>Instant pickup in under 3 minutes</Text>
              </View>
            </View>
            <View style={styles.rideLivePill}>
              <Text style={styles.rideLiveText}>1,240 Drivers Live</Text>
            </View>
          </View>

          <Pressable style={styles.rideSearchInput} onPress={() => router.push('/ride-selection')}>
            <Ionicons name="search" size={16} color={SwiftColors.textSecondary} />
            <Text style={styles.rideSearchPlaceholder}>Where are you going today?</Text>
            <View style={styles.rideNowButton}>
              <Text style={styles.rideNowText}>Ride Now</Text>
              <Ionicons name="arrow-forward" size={11} color={SwiftColors.amberDark} />
            </View>
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shortcutRow}>
            {savedPlaces.map((place) => (
              <Pressable key={place.id} style={styles.shortcutChip}>
                <Ionicons name={place.icon as keyof typeof Ionicons.glyphMap} size={13} color={SwiftColors.textPrimary} />
                <View>
                  <Text style={styles.shortcutLabel}>{place.label}</Text>
                  <Text style={styles.shortcutDetail}>{place.detail}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionTitle}>Everyday Services</Text>
            <View style={styles.sectionDot} />
          </View>
          <Text style={styles.sectionAction}>View All (16)</Text>
        </View>

        <View style={styles.servicesGrid}>
          {Array.from({ length: 2 }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.servicesRow}>
              {everydayServices.slice(rowIndex * 4, rowIndex * 4 + 4).map((service) => (
                <ServiceGridItem key={service.id} service={service} onPress={() => handleServicePress(service.id)} />
              ))}
            </View>
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickServicesRow}>
          {quickServices.map((label) => (
            <View key={label} style={styles.quickServiceChip}>
              <Text style={styles.quickServiceText}>{label}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Offers & Perks</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerRow} pagingEnabled>
          <View style={[styles.bannerCard, { backgroundColor: SwiftColors.surface }]}>
            <View style={styles.bannerTopRow}>
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>PROMO CODE</Text>
              </View>
              <Ionicons name="gift" size={16} color={SwiftColors.gold} />
            </View>
            <Text style={styles.bannerTitle}>Get 20% off your next 5 rides</Text>
            <Text style={styles.bannerBody}>
              Use code <Text style={styles.bannerBodyStrong}>SWIFT9JA</Text> at checkout.
            </Text>
            <View style={styles.bannerBottomRow}>
              <Text style={styles.bannerValidity}>Valid till Sunday</Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Apply</Text>
              </View>
            </View>
          </View>

          <View style={[styles.bannerCard, { backgroundColor: SwiftColors.emerald }]}>
            <View style={styles.bannerTopRow}>
              <View style={[styles.promoBadge, { backgroundColor: SwiftColors.mintAlt }]}>
                <Text style={[styles.promoBadgeText, { color: SwiftColors.emeraldDark }]}>VIP MEMBER</Text>
              </View>
              <Ionicons name="ribbon" size={16} color={SwiftColors.mint} />
            </View>
            <Text style={[styles.bannerTitle, { color: SwiftColors.white }]}>SwiftPass Club: Zero Delivery Fees</Text>
            <Text style={[styles.bannerBody, { color: SwiftColors.mint }]}>
              Unlimited ₦0 courier & food delivery all month.
            </Text>
            <View style={styles.bannerBottomRow}>
              <Text style={[styles.bannerValidity, { color: SwiftColors.mint }]}>Active tier</Text>
              <View style={[styles.bannerButton, { backgroundColor: SwiftColors.white }]}>
                <Text style={[styles.bannerButtonText, { color: SwiftColors.emerald }]}>Manage</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Places</Text>
          <Text style={styles.sectionAction}>Clear</Text>
        </View>
        <View style={styles.placesList}>
          {recentPlaces.map((place) => (
            <View key={place.id} style={[styles.placeCard, SwiftShadow.card]}>
              <View style={styles.placeLeft}>
                <View style={styles.placeIconWrap}>
                  <Ionicons name={place.icon as keyof typeof Ionicons.glyphMap} size={15} color={SwiftColors.textPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.placeTitle}>{place.title}</Text>
                  <Text style={styles.placeSubtitle}>{place.subtitle}</Text>
                </View>
              </View>
              <View style={styles.bookPill}>
                <Text style={styles.bookPillText}>Book</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <Pressable style={[styles.foodCard, SwiftShadow.card]} onPress={() => router.push('/restaurant')}>
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']} style={styles.foodImage}>
            <View style={styles.foodEtaPill}>
              <Text style={styles.foodEtaText}>{recommendedRestaurant.eta}</Text>
            </View>
            <View style={styles.foodRatingPill}>
              <Ionicons name="star" size={11} color={SwiftColors.white} />
              <Text style={styles.foodRatingText}>{recommendedRestaurant.rating}</Text>
            </View>
            <View style={styles.foodTextWrap}>
              <Text style={styles.foodTitle}>{recommendedRestaurant.name}</Text>
              <Text style={styles.foodSubtitle}>{recommendedRestaurant.subtitle}</Text>
            </View>
          </LinearGradient>
          <View style={styles.foodBottomRow}>
            <Text style={styles.foodDelivery}>{recommendedRestaurant.deliveryFee}</Text>
            <View style={styles.orderNowButton}>
              <Text style={styles.orderNowText}>Order Now</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.trustBanner}>
          <View style={styles.trustIconWrap}>
            <Ionicons name="shield-checkmark" size={18} color={SwiftColors.emeraldDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustTitle}>Verified & Licensed by NTPP Nigeria</Text>
            <Text style={styles.trustBody}>National Transport & Passenger Safety Commission standard fleet.</Text>
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
    padding: 16,
    paddingBottom: 96,
    gap: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userAvatarWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted2,
    padding: 3,
  },
  userAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  greeting: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 17,
    color: SwiftColors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  vipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(131,85,0,0.1)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  vipBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.amber,
  },
  walletCard: {
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.lg,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
  walletTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    letterSpacing: 0.6,
    color: SwiftColors.mint,
  },
  walletVerifiedPill: {
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  walletVerifiedText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.mintAlt,
  },
  walletBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletBalance: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.white,
    letterSpacing: -0.5,
  },
  cashbackPill: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cashbackText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10.5,
    color: SwiftColors.amberDark,
  },
  walletActions: {
    flexDirection: 'row',
    gap: 8,
  },
  walletActionPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.white,
    borderRadius: SwiftRadius.md,
    height: 40,
  },
  walletActionPrimaryText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 12.5,
    color: SwiftColors.emerald,
  },
  walletActionGhost: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: SwiftRadius.md,
    height: 40,
  },
  walletActionGhostText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12.5,
    color: SwiftColors.white,
  },
  rideCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    padding: 16,
    gap: 12,
  },
  rideTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rideTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rideIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.md,
    backgroundColor: 'rgba(245,166,35,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  rideSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  rideLivePill: {
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rideLiveText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  rideSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
  },
  rideSearchPlaceholder: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textMuted,
  },
  rideNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rideNowText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 12.5,
    color: SwiftColors.amberDark,
  },
  shortcutRow: {
    flexGrow: 0,
  },
  shortcutChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  shortcutLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  shortcutDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  sectionAction: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  servicesGrid: {
    gap: 10,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickServicesRow: {
    flexGrow: 0,
  },
  quickServiceChip: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  quickServiceText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  bannerRow: {
    flexGrow: 0,
  },
  bannerCard: {
    width: 320,
    borderRadius: SwiftRadius.lg,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
    gap: 8,
  },
  bannerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoBadge: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  promoBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    color: SwiftColors.amberDark,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  bannerBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  bannerBodyStrong: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    color: SwiftColors.amber,
  },
  bannerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerValidity: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  bannerButton: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bannerButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDark,
  },
  placesList: {
    gap: 8,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    padding: 12,
  },
  placeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  placeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  placeSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  bookPill: {
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bookPillText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  foodCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    overflow: 'hidden',
  },
  foodImage: {
    height: 144,
    backgroundColor: SwiftColors.surfaceMuted2,
    padding: 12,
    justifyContent: 'space-between',
  },
  foodEtaPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  foodEtaText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  foodRatingPill: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  foodRatingText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.white,
  },
  foodTextWrap: {
    gap: 2,
  },
  foodTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.white,
  },
  foodSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.white,
    opacity: 0.9,
  },
  foodBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  foodDelivery: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  orderNowButton: {
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  orderNowText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDark,
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(230,233,232,0.6)',
    borderRadius: SwiftRadius.lg,
    padding: 12,
  },
  trustIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.md,
    backgroundColor: 'rgba(0,109,64,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  trustBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
});
