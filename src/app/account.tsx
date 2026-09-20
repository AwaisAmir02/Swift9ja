import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { homeNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { accountPreferences, accountProfile, appSettings, membershipPerks, safetySettings } from '@/services/dummy-data';

export default function AccountScreen() {
  const [safetyToggles, setSafetyToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(safetySettings.map((item) => [item.id, item.enabled])),
  );
  const [settingsToggles, setSettingsToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(appSettings.map((item) => [item.id, item.enabled])),
  );
  const [corporateMode, setCorporateMode] = useState(false);

  const toggleSafety = (id: string) => setSafetyToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSetting = (id: string) => setSettingsToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleNavPress = (key: string) => {
    if (key === 'account') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Swift9JA</Text>
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
        <View style={styles.profileRow}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={28} color={SwiftColors.textFaint} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{accountProfile.name}</Text>
            <Text style={styles.profilePhone}>{accountProfile.phone}</Text>
            <View style={styles.profileBadgeRow}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={11} color={SwiftColors.gold} />
                <Text style={styles.ratingBadgeText}>
                  {accountProfile.rating} {accountProfile.tier}
                </Text>
              </View>
              <View style={styles.eliteBadge}>
                <Ionicons name="ribbon-outline" size={11} color={SwiftColors.amberDeep} />
                <Text style={styles.eliteBadgeText}>{accountProfile.badge}</Text>
              </View>
            </View>
          </View>
          <Pressable style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color={SwiftColors.textSecondary} />
          </Pressable>
        </View>

        <Pressable style={styles.walletRow} onPress={() => router.push('/wallet')}>
          <View style={styles.walletLeft}>
            <Ionicons name="wallet" size={16} color={SwiftColors.emeraldDark} />
            <View>
              <Text style={styles.walletLabel}>SwiftWallet Balance</Text>
              <Text style={styles.walletValue}>
                ₦{accountProfile.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View style={styles.topUpButton}>
            <Ionicons name="add" size={13} color={SwiftColors.white} />
            <Text style={styles.topUpButtonText}>Top Up</Text>
          </View>
        </Pressable>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Membership & Perks</Text>
          <View style={styles.tierBadge}>
            <Text style={styles.tierBadgeText}>Tier Gold</Text>
          </View>
        </View>

        <View style={styles.perksRow}>
          {membershipPerks.map((perk) => (
            <View key={perk.id} style={[styles.perkCard, SwiftShadow.card]}>
              <View style={styles.perkTopRow}>
                <Text style={styles.perkName}>{perk.name}</Text>
                <View
                  style={[
                    styles.perkBadge,
                    { backgroundColor: perk.badge === 'Active' ? 'rgba(138,245,180,0.4)' : SwiftColors.goldPale },
                  ]}>
                  <Text
                    style={[
                      styles.perkBadgeText,
                      { color: perk.badge === 'Active' ? SwiftColors.emeraldDark : SwiftColors.amberDeep },
                    ]}>
                    {perk.badge}
                  </Text>
                </View>
              </View>
              <Text style={styles.perkValue}>{perk.value}</Text>
              <Text style={styles.perkSubtitle}>{perk.subtitle}</Text>
              <Pressable>
                <Text style={styles.perkCta}>{perk.cta} ›</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={[styles.referRow, SwiftShadow.card]}>
          <View style={styles.referIconWrap}>
            <Ionicons name="gift" size={18} color={SwiftColors.amberDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.referTitle}>Refer Friends, Earn ₦2,000</Text>
            <Text style={styles.referSubtitle}>They and 80% off their first ride.</Text>
          </View>
          <Pressable style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Safety & Emergency Center</Text>
          <View style={styles.shieldBadge}>
            <Ionicons name="shield-checkmark" size={11} color={SwiftColors.emeraldDark} />
            <Text style={styles.shieldBadgeText}>24/7 Shield On</Text>
          </View>
        </View>

        <View style={styles.sosCard}>
          <View style={styles.sosIconWrap}>
            <Text style={styles.sosIconText}>SOS</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTitle}>Emergency SOS Dispatch</Text>
            <Text style={styles.sosSubtitle}>Instant Nigeria Police & SwiftPatrol alert</Text>
          </View>
          <Pressable style={styles.sosButton}>
            <Text style={styles.sosButtonText}>Trigger SOS</Text>
          </Pressable>
        </View>

        <View style={styles.settingsList}>
          {safetySettings.map((item) => (
            <View key={item.id} style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={SwiftColors.textSecondary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={safetyToggles[item.id]}
                onValueChange={() => toggleSafety(item.id)}
                trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
                thumbColor={SwiftColors.white}
              />
            </View>
          ))}
        </View>

        <View style={styles.complianceRow}>
          <View style={styles.complianceItem}>
            <Ionicons name="shield-checkmark-outline" size={12} color={SwiftColors.textSecondary} />
            <Text style={styles.complianceText}>CBN Licensed PSP</Text>
          </View>
          <View style={styles.complianceItem}>
            <Ionicons name="checkmark-circle-outline" size={12} color={SwiftColors.textSecondary} />
            <Text style={styles.complianceText}>NTPP Transit Compliant</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account & Preferences</Text>
        <View style={styles.preferencesList}>
          {accountPreferences.map((item) => (
            <Pressable key={item.id} style={[styles.preferenceRow, SwiftShadow.card]}>
              <View style={styles.preferenceLeft}>
                <View style={styles.preferenceIconWrap}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={SwiftColors.textPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.preferenceTitle}>{item.title}</Text>
                  <Text style={styles.preferenceSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              {item.badge ? (
                <View style={styles.preferenceBadge}>
                  <Text style={styles.preferenceBadgeText}>{item.badge}</Text>
                </View>
              ) : item.toggle !== undefined ? (
                <Switch
                  value={corporateMode}
                  onValueChange={setCorporateMode}
                  trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
                  thumbColor={SwiftColors.white}
                />
              ) : (
                <Ionicons name="chevron-forward" size={16} color={SwiftColors.textSecondary} />
              )}
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionTitle}>App Settings & Security</Text>
        <View style={styles.settingsList}>
          {appSettings.map((item) => (
            <View key={item.id} style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={SwiftColors.textSecondary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Switch
                value={settingsToggles[item.id]}
                onValueChange={() => toggleSetting(item.id)}
                trackColor={{ true: SwiftColors.emerald, false: SwiftColors.border }}
                thumbColor={SwiftColors.white}
              />
            </View>
          ))}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="language" size={16} color={SwiftColors.textSecondary} />
              <View>
                <Text style={styles.settingTitle}>App Language</Text>
                <Text style={styles.settingSubtitle}>English (Nigeria)</Text>
              </View>
            </View>
            <View style={styles.languageRow}>
              <Text style={styles.languageText}>5 Nigerian Dialects</Text>
              <Ionicons name="chevron-down" size={14} color={SwiftColors.textSecondary} />
            </View>
          </View>
        </View>

        <Pressable style={styles.logoutRow}>
          <Ionicons name="log-out-outline" size={16} color={SwiftColors.error} />
          <Text style={styles.logoutText}>Log Out of Swift9JA</Text>
        </Pressable>

        <Text style={styles.footerText}>Swift9JA v2.4.0 (Build 412) • Abuja / Lagos Core</Text>
        <Text style={styles.footerText}>Made with pride in Nigeria 🇳🇬</Text>
      </ScrollView>

      <BottomNav items={homeNavItems} activeKey="account" onPress={handleNavPress} />
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
    gap: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  profilePhone: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  profileBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.goldPale,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ratingBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDeepest,
  },
  eliteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,221,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  eliteBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDeep,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  walletLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  walletValue: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  topUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  topUpButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.white,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  tierBadge: {
    backgroundColor: SwiftColors.goldPale,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tierBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
  },
  perksRow: {
    flexDirection: 'row',
    gap: 10,
  },
  perkCard: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 4,
  },
  perkTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  perkName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  perkBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  perkBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
  },
  perkValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 17,
    color: SwiftColors.textPrimary,
  },
  perkSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  perkCta: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amber,
    marginTop: 2,
  },
  referRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  referIconWrap: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: 'rgba(255,221,180,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  referTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  referSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  shareButton: {
    borderWidth: 1,
    borderColor: SwiftColors.border,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shareButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  shieldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  shieldBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  sosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,218,214,0.5)',
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  sosIconWrap: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosIconText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.white,
  },
  sosTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  sosSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  sosButton: {
    backgroundColor: SwiftColors.error,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sosButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.white,
  },
  settingsList: {
    gap: 14,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  settingTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  settingSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  languageText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  complianceRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  complianceText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  preferencesList: {
    gap: 8,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  preferenceIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferenceTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  preferenceSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  preferenceBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  preferenceBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  logoutText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.error,
  },
  footerText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
});
