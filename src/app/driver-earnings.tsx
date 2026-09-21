import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { driverNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { driverEarningsSummary } from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');
const PERIOD_TABS = ['Today', 'This Week', 'This Month', 'Custom'];

export default function DriverEarningsScreen() {
  const [periodTab, setPeriodTab] = useState('This Week');
  const summary = driverEarningsSummary;

  const handleNavPress = (key: string) => {
    if (key === 'driver-earnings') return;
    router.push(`/${key}` as never);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={LOGO} style={styles.headerLogo} />
            <Text style={styles.headerBrand}>Swift9JA</Text>
            <Text style={styles.headerSubtitle}>DRIVER PARTNER</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlinePillText}>ONLINE</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={15} color={SwiftColors.textPrimary} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>Earnings & Payouts</Text>
            <Text style={styles.titleSubtitle}>Abuja Central & Lagos Fleet</Text>
          </View>
          <Pressable style={styles.refreshButton}>
            <Ionicons name="refresh" size={15} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.cashoutCard}>
          <View style={styles.cashoutTopRow}>
            <Text style={styles.cashoutLabel}>AVAILABLE FOR CASHOUT</Text>
            <View style={styles.tierBadge}>
              <Text style={styles.tierBadgeText}>{summary.tier}</Text>
            </View>
          </View>
          <Text style={styles.cashoutValue}>
            ₦{summary.availableForCashout.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </Text>

          <View style={styles.bankRow}>
            <Ionicons name="business" size={16} color={SwiftColors.mint} />
            <View style={{ flex: 1 }}>
              <Text style={styles.bankText}>{summary.bankAccount}</Text>
              <Text style={styles.bankSubtext}>{summary.bankNote}</Text>
            </View>
            <Text style={styles.changeLink}>Change</Text>
          </View>

          <Pressable style={styles.cashoutButton}>
            <Ionicons name="flash" size={15} color={SwiftColors.amberDeepest} />
            <Text style={styles.cashoutButtonText}>Cash Out to Bank Now</Text>
          </Pressable>
          <Text style={styles.cashoutNote}>{summary.cashoutNote}</Text>

          <Pressable style={styles.fuelCreditRow}>
            <Ionicons name="water" size={13} color={SwiftColors.mint} />
            <Text style={styles.fuelCreditText}>
              SwiftNigerian Fuel Credit • ₦{summary.fuelCredit.toLocaleString('en-NG')} credit
            </Text>
            <Ionicons name="chevron-forward" size={13} color={SwiftColors.mint} />
          </Pressable>
        </View>

        <View style={styles.periodTabsRow}>
          {PERIOD_TABS.map((tab) => {
            const isActive = tab === periodTab;
            return (
              <Pressable
                key={tab}
                style={[styles.periodTab, isActive && styles.periodTabActive]}
                onPress={() => setPeriodTab(tab)}>
                <Text style={[styles.periodTabText, isActive && styles.periodTabTextActive]}>{tab}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.netEarnedSection}>
          <View style={styles.netEarnedTopRow}>
            <Text style={styles.netEarnedLabel}>{summary.periodLabel}</Text>
            <Text style={styles.netEarnedLink}>{summary.periodLink}</Text>
          </View>
          <View style={styles.netEarnedValueRow}>
            <Text style={styles.netEarnedValue}>₦{summary.netEarned.toLocaleString('en-NG')}</Text>
            <View style={styles.netEarnedChangeBadge}>
              <Text style={styles.netEarnedChangeText}>+{summary.netEarnedChangePercent}%</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            {summary.stats.map((stat) => (
              <View key={stat.id} style={styles.statItem}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.patternHeaderRow}>
            <Text style={styles.patternLabel}>Daily Earnings Pattern</Text>
            <Text style={styles.patternHint}>Peak Surge (Fri - Sat)</Text>
          </View>
          <View style={styles.patternBarsRow}>
            {summary.dailyPattern.map((day, index) => (
              <View key={`${day.day}-${index}`} style={styles.patternBarWrap}>
                <View
                  style={[
                    styles.patternBar,
                    { height: Math.max(8, day.level * 48) },
                    day.accent === 'gold' && styles.patternBarGold,
                    day.accent === 'emerald' && styles.patternBarEmerald,
                  ]}
                />
                <Text style={styles.patternDayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.questBanner}>
          <View style={styles.questTopRow}>
            <View style={styles.questTopLeft}>
              <Ionicons name="flash" size={15} color={SwiftColors.amberDeep} />
              <Text style={styles.questTitle}>{summary.surgeQuest.title}</Text>
            </View>
            <Text style={styles.questReward}>+₦{summary.surgeQuest.reward.toLocaleString('en-NG')}</Text>
          </View>
          <Text style={styles.questLocation}>{summary.surgeQuest.location}</Text>
          <View style={styles.questProgressHeader}>
            <Text style={styles.questProgressLabel}>
              {summary.surgeQuest.completed} of {summary.surgeQuest.total} trips completed
            </Text>
            <Text style={styles.questProgressPercent}>{summary.surgeQuest.progressPercent}% Completed</Text>
          </View>
          <View style={styles.questProgressTrack}>
            <View style={[styles.questProgressFill, { width: `${summary.surgeQuest.progressPercent}%` }]} />
          </View>
          <Text style={styles.questFooterText}>
            {summary.surgeQuest.hoursLeft} hours left for bonus • {summary.surgeQuest.tripsRemaining} trips
            remaining
          </Text>
        </View>

        <View style={styles.statementSection}>
          <View style={styles.statementHeaderRow}>
            <Text style={styles.sectionTitle}>Weekly Fare Statement</Text>
            <View style={styles.statementLink}>
              <Ionicons name="document-text-outline" size={12} color={SwiftColors.amber} />
              <Text style={styles.statementLinkText}>PDF Tax Receipt</Text>
            </View>
          </View>
          {summary.weeklyStatement.map((item) => (
            <View key={item.label} style={styles.statementRow}>
              <Text style={styles.statementLabel}>{item.label}</Text>
              <Text style={[styles.statementValue, item.value < 0 && styles.statementValueNegative]}>
                {item.value < 0 ? '-' : '+'}₦{Math.abs(item.value).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          ))}
          <View style={styles.statementDivider} />
          <View style={styles.statementRow}>
            <Text style={styles.netTotalLabel}>Net Take-Home Pay</Text>
            <Text style={styles.netTotalValue}>
              ₦{summary.netTakeHome.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Trip Settlements</Text>
          <Text style={styles.viewLedgerLink}>View Full Ledger</Text>
        </View>

        <View style={styles.settlementsList}>
          {summary.settlements.map((item) => (
            <View key={item.id} style={[styles.settlementRow, SwiftShadow.card]}>
              <View style={styles.settlementLeft}>
                <View style={[styles.settlementIconWrap, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={16} color={SwiftColors.textPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settlementTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.settlementSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.settlementRight}>
                <Text style={[styles.settlementAmount, item.amount > 0 && styles.settlementAmountPositive]}>
                  {item.amount > 0 ? '+' : '-'}₦{Math.abs(item.amount).toLocaleString('en-NG')}
                </Text>
                <View style={styles.settlementStatusBadge}>
                  <Text style={styles.settlementStatusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNav items={driverNavItems} activeKey="driver-earnings" onPress={handleNavPress} />
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
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  headerBrand: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  headerSubtitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    letterSpacing: 0.4,
    color: SwiftColors.emerald,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SwiftColors.emerald,
  },
  onlinePillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
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
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  titleSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashoutCard: {
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 10,
  },
  cashoutTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cashoutLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: '#D8DADA',
  },
  tierBadge: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tierBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDeepest,
  },
  cashoutValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 30,
    color: SwiftColors.white,
    letterSpacing: -0.5,
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bankText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.white,
  },
  bankSubtext: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: '#D8DADA',
  },
  changeLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.gold,
  },
  cashoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingVertical: 12,
  },
  cashoutButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.amberDeepest,
  },
  cashoutNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
  },
  fuelCreditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(138,245,180,0.15)',
    borderRadius: SwiftRadius.sm,
    padding: 8,
  },
  fuelCreditText: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.mint,
  },
  periodTabsRow: {
    flexDirection: 'row',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 4,
    gap: 4,
  },
  periodTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: SwiftRadius.sm,
  },
  periodTabActive: {
    backgroundColor: SwiftColors.surface,
    ...SwiftShadow.card,
  },
  periodTabText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  periodTabTextActive: {
    color: SwiftColors.textPrimary,
  },
  netEarnedSection: {
    gap: 4,
  },
  netEarnedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  netEarnedLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: SwiftColors.textSecondary,
  },
  netEarnedLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  netEarnedValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  netEarnedValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 26,
    color: SwiftColors.textPrimary,
  },
  netEarnedChangeBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  netEarnedChangeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 12,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  statValue: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  patternHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  patternLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  patternHint: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  patternBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
    marginTop: 8,
  },
  patternBarWrap: {
    alignItems: 'center',
    gap: 6,
  },
  patternBar: {
    width: 16,
    borderRadius: 4,
    backgroundColor: SwiftColors.surfaceMuted2,
  },
  patternBarGold: {
    backgroundColor: SwiftColors.gold,
  },
  patternBarEmerald: {
    backgroundColor: SwiftColors.emerald,
  },
  patternDayLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 9,
    color: SwiftColors.textFaint,
  },
  questBanner: {
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 6,
  },
  questTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  questTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  questReward: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.amberDeep,
  },
  questLocation: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  questProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  questProgressLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  questProgressPercent: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
  },
  questProgressTrack: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.6)',
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    borderRadius: 9999,
    backgroundColor: SwiftColors.gold,
  },
  questFooterText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  statementSection: {
    gap: 8,
  },
  statementHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  statementLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statementLinkText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  statementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statementLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  statementValue: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  statementValueNegative: {
    color: SwiftColors.error,
  },
  statementDivider: {
    height: 1,
    backgroundColor: SwiftColors.border,
    marginVertical: 4,
  },
  netTotalLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  netTotalValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewLedgerLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  settlementsList: {
    gap: 8,
  },
  settlementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 8,
  },
  settlementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  settlementIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settlementTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  settlementSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  settlementRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  settlementAmount: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.error,
  },
  settlementAmountPositive: {
    color: SwiftColors.emerald,
  },
  settlementStatusBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  settlementStatusText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
});
