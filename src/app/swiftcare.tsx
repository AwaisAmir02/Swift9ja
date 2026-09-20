import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { servicesNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { swiftcareData, swiftcareServices } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');
const ACCENT = SwiftColors.amber;

export default function SwiftCareScreen() {
  const [selectedServiceId, setSelectedServiceId] = useState(swiftcareServices[0].id);
  const selectedService = swiftcareServices.find((service) => service.id === selectedServiceId) ?? swiftcareServices[0];

  const handleNavPress = (key: string) => {
    if (key === 'swiftcare') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <View>
              <Text style={styles.headerTitle} numberOfLines={1}>
                SwiftCare Roadside Assistance
              </Text>
              <Text style={styles.headerSubtitle}>{swiftcareData.networkStatus}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <Ionicons name="refresh" size={15} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.networkRow}>
          <View style={styles.networkLeft}>
            <Ionicons name="radio" size={13} color={SwiftColors.textSecondary} />
            <Text style={styles.networkLabel}>Live Patrol Network</Text>
          </View>
          <View style={styles.networkBadge}>
            <View style={styles.networkDot} />
            <Text style={styles.networkBadgeText}>24/7 Live Patrol Dispatch</Text>
          </View>
        </View>

        <View style={styles.breakdownCard}>
          <View style={styles.breakdownTopRow}>
            <View style={styles.breakdownPriorityBadge}>
              <Ionicons name="warning" size={11} color={SwiftColors.white} />
              <Text style={styles.breakdownPriorityText}>BREAKDOWN PRIORITY</Text>
            </View>
            <Text style={styles.breakdownEta}>~{swiftcareData.breakdownEtaMins} min arrival</Text>
          </View>
          <Text style={styles.breakdownTitle}>{swiftcareData.breakdownTitle}</Text>
          <Text style={styles.breakdownSubtitle}>{swiftcareData.breakdownSubtitle}</Text>
          <View style={styles.breakdownActionsRow}>
            <Pressable style={styles.sosButton}>
              <Ionicons name="alert-circle" size={15} color={SwiftColors.white} />
              <Text style={styles.sosButtonText}>Emergency SOS</Text>
            </Pressable>
            <Pressable style={styles.hotlineButton}>
              <Ionicons name="call" size={14} color={SwiftColors.textPrimary} />
              <Text style={styles.hotlineButtonText}>Call Hotline</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.vehicleRow, SwiftShadow.card]}>
          <View style={styles.vehicleLeft}>
            <View style={styles.vehicleIconWrap}>
              <Ionicons name="car-sport" size={18} color={SwiftColors.textPrimary} />
            </View>
            <View>
              <Text style={styles.vehicleName}>{swiftcareData.vehicle.name}</Text>
              <View style={styles.vehicleDetailRow}>
                <Text style={styles.vehicleDetail}>{swiftcareData.vehicle.detail}</Text>
                {!swiftcareData.vehicle.verified ? (
                  <View style={styles.unverifiedBadge}>
                    <Text style={styles.unverifiedBadgeText}>Unverified</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <Text style={styles.switchLink}>Switch</Text>
        </View>

        <View style={[styles.locationCard, SwiftShadow.card]}>
          <View style={styles.locationTopRow}>
            <Text style={styles.locationLabel}>ACCURATE BREAKDOWN PIN</Text>
            <View style={styles.gpsBadge}>
              <Ionicons name="radio-button-on" size={9} color={SwiftColors.emerald} />
              <Text style={styles.gpsBadgeText}>GPS Live</Text>
            </View>
          </View>
          <Text style={styles.locationTitle}>{swiftcareData.breakdownPin}</Text>
          <Text style={styles.locationSubtitle}>{swiftcareData.breakdownLocation}</Text>
          <View style={styles.mapStage}>
            <View style={styles.mapMarker}>
              <Ionicons name="car" size={16} color={SwiftColors.white} />
            </View>
            <View style={styles.mapFooterRow}>
              <Ionicons name="navigate-circle-outline" size={12} color={SwiftColors.textSecondary} />
              <Text style={styles.mapFooterText}>
                {swiftcareData.nearbyVans} Rescue Vans within {swiftcareData.nearbyRangeKm}km
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionTitle}>Automotive Services Suite</Text>
            <Text style={styles.sectionSubtitle}>Tap service to preview dispatch details</Text>
          </View>
          <View style={styles.availableBadge}>
            <Text style={styles.availableBadgeText}>{swiftcareData.servicesAvailable} Available</Text>
          </View>
        </View>

        <View style={styles.servicesList}>
          {swiftcareServices.map((service) => {
            const isActive = service.id === selectedServiceId;
            return (
              <Pressable
                key={service.id}
                style={[styles.serviceCard, isActive && styles.serviceCardActive, SwiftShadow.card]}
                onPress={() => setSelectedServiceId(service.id)}>
                <View style={styles.serviceIconWrap}>
                  <Ionicons name={service.icon as keyof typeof Ionicons.glyphMap} size={18} color={SwiftColors.textPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.serviceTopRow}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>₦{service.price.toLocaleString('en-NG')}</Text>
                  </View>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceTagsRow}>
                    {service.tags.map((tag) => (
                      <View key={tag} style={styles.serviceTag}>
                        <Text style={styles.serviceTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.assuranceBanner}>
          <Ionicons name="shield-checkmark" size={18} color={SwiftColors.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.assuranceTitle}>{swiftcareData.assuranceTitle}</Text>
            <Text style={styles.assuranceSubtitle}>{swiftcareData.assuranceSubtitle}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomBarLabel}>SELECTED SERVICE</Text>
          <Text style={styles.bottomBarValue}>
            {selectedService.name.split(' ').slice(0, 3).join(' ')} • ₦{selectedService.price.toLocaleString('en-NG')}
          </Text>
        </View>
        <Pressable style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request Patrol →</Text>
        </Pressable>
      </View>

      <BottomNav items={servicesNavItems} activeKey="swiftcare" activeColor={ACCENT} onPress={handleNavPress} />
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
    flex: 1,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
    maxWidth: 220,
  },
  headerSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 112,
    gap: 12,
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  networkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  networkLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  networkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  networkBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  breakdownCard: {
    backgroundColor: 'rgba(255,218,214,0.5)',
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 8,
  },
  breakdownTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownPriorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.error,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  breakdownPriorityText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    color: SwiftColors.white,
  },
  breakdownEta: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.errorDeep,
  },
  breakdownTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  breakdownSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  breakdownActionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  sosButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.error,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  sosButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  hotlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    paddingVertical: 12,
  },
  hotlineButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  vehicleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vehicleIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  vehicleDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  vehicleDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  unverifiedBadge: {
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  unverifiedBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  switchLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  locationCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 4,
  },
  locationTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  gpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  gpsBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emerald,
  },
  locationTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  locationSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginBottom: 8,
  },
  mapStage: {
    height: 100,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapMarker: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapFooterRow: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mapFooterText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  sectionSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  availableBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  availableBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  servicesList: {
    gap: 8,
  },
  serviceCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  serviceCardActive: {
    borderColor: SwiftColors.gold,
  },
  serviceIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  serviceName: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  servicePrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  serviceDescription: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  serviceTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  serviceTag: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  serviceTagText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  assuranceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  assuranceTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.white,
  },
  assuranceSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.mint,
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248,250,249,0.97)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SwiftColors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  bottomBarLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  bottomBarValue: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  requestButton: {
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  requestButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.amberDeepest,
  },
});
