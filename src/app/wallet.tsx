import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/swift/bottom-nav';
import { homeNavItems } from '@/constants/nav-items';
import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import {
  fundingAccount,
  linkedCard,
  subWallets,
  virtualCard,
  walletActivity,
  walletDetail,
  walletPromoBanner,
} from '@/services/dummy-data';

const LOGO = require('../assets/images/logo.jpg');

export default function WalletScreen() {
  const handleNavPress = (key: string) => {
    if (key === 'wallet') return;
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
              <Text style={styles.headerTitle}>Wallet</Text>
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
        <View style={styles.verificationRow}>
          <View style={styles.verificationLeft}>
            <Ionicons name="checkmark-circle" size={13} color={SwiftColors.emerald} />
            <View>
              <Text style={styles.verificationTitle}>{walletDetail.verificationTier}</Text>
              <Text style={styles.verificationSubtitle}>{walletDetail.verificationSubtitle}</Text>
            </View>
          </View>
          <View style={styles.verificationActions}>
            <Ionicons name="options-outline" size={16} color={SwiftColors.textSecondary} />
          </View>
        </View>

        <View style={[styles.balanceCard, SwiftShadow.raised]}>
          <View style={styles.balanceTopRow}>
            <View style={styles.balanceLabelRow}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Ionicons name="information-circle-outline" size={13} color={SwiftColors.mint} />
            </View>
            <Pressable style={styles.scanButton}>
              <Ionicons name="qr-code-outline" size={13} color={SwiftColors.charcoal} />
              <Text style={styles.scanButtonText}>Scan QR</Text>
            </Pressable>
          </View>

          <Text style={styles.balanceValue}>
            ₦{walletDetail.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </Text>

          <View style={styles.balanceMetaRow}>
            <View style={styles.balanceMetaGroup}>
              <Ionicons name="lock-closed" size={11} color="#D8DADA" />
              <Text style={styles.balanceMetaText}>
                Escrow & In-transit: ₦{walletDetail.escrowAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.balanceMetaGroup}>
              <Ionicons name="shield-checkmark" size={11} color="#D8DADA" />
              <Text style={styles.balanceMetaText}>Protected by SwiftGuard</Text>
            </View>
          </View>

          <View style={styles.balanceActionsRow}>
            {[
              { key: 'add', icon: 'add', label: 'Add Money' },
              { key: 'send', icon: 'arrow-redo', label: 'Send Cash' },
              { key: 'withdraw', icon: 'business', label: 'Withdraw' },
              { key: 'bills', icon: 'flash', label: 'Bills & Topup' },
            ].map((action) => (
              <View key={action.key} style={styles.balanceAction}>
                <View style={[styles.balanceActionCircle, action.key !== 'add' && styles.balanceActionCircleMuted]}>
                  <Ionicons
                    name={action.icon as keyof typeof Ionicons.glyphMap}
                    size={16}
                    color={action.key === 'add' ? SwiftColors.amberDeepest : SwiftColors.white}
                  />
                </View>
                <Text style={styles.balanceActionLabel}>{action.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Sub-Wallets & Perks</Text>
          <Text style={styles.manageAll}>Manage All</Text>
        </View>
        <View style={styles.subWalletsRow}>
          {subWallets.map((wallet) => (
            <View key={wallet.id} style={[styles.subWalletCard, SwiftShadow.card]}>
              <View style={styles.subWalletTopRow}>
                <Text style={styles.subWalletName}>{wallet.name}</Text>
                <View style={[styles.subWalletBadge, { backgroundColor: wallet.badgeBg }]}>
                  <Text style={[styles.subWalletBadgeText, { color: wallet.badgeColor }]}>{wallet.badge}</Text>
                </View>
              </View>
              <View style={styles.subWalletValueRow}>
                <Text style={styles.subWalletValue}>{wallet.value}</Text>
                <Text style={styles.subWalletValueUnit}>{wallet.valueUnit}</Text>
              </View>
              <Text style={styles.subWalletSubtext}>{wallet.subtext}</Text>
              <Pressable style={styles.subWalletCta}>
                <Text style={styles.subWalletCtaText}>{wallet.cta} ›</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={[styles.fundingRow, SwiftShadow.card]}>
          <View style={styles.fundingLeft}>
            <Ionicons name="business" size={16} color={SwiftColors.emeraldDark} />
            <Text style={styles.fundingText}>
              Instant Funding Account{'\n'}
              <Text style={styles.fundingTextStrong}>
                {fundingAccount.bank} • {fundingAccount.number}
              </Text>
            </Text>
          </View>
          <Pressable style={styles.copyButton}>
            <Ionicons name="copy-outline" size={12} color={SwiftColors.textPrimary} />
            <Text style={styles.copyButtonText}>Copy</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <Text style={styles.manageAll}>+ Link New</Text>
        </View>

        <View style={[styles.virtualCard]}>
          <View style={styles.virtualCardTopRow}>
            <View>
              <Text style={styles.virtualCardLabel}>{virtualCard.label}</Text>
              <View style={styles.virtualCardToggleRow}>
                <Text style={styles.virtualCardToggleText}>{virtualCard.currencyToggle}</Text>
              </View>
            </View>
            <Switch value trackColor={{ true: SwiftColors.gold, false: SwiftColors.border }} thumbColor={SwiftColors.white} />
          </View>
          <Text style={styles.virtualCardNumber}>•••• •••• •••• {virtualCard.last4}</Text>
          <View style={styles.virtualCardBottomRow}>
            <View>
              <Text style={styles.virtualCardMetaLabel}>CARDHOLDER</Text>
              <Text style={styles.virtualCardMetaValue}>{virtualCard.cardholder}</Text>
            </View>
            <View>
              <Text style={styles.virtualCardMetaLabel}>EXPIRES</Text>
              <Text style={styles.virtualCardMetaValue}>{virtualCard.expiry}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.linkedCardRow, SwiftShadow.card]}>
          <View style={styles.linkedCardLeft}>
            <Ionicons name="card" size={20} color={SwiftColors.textSecondary} />
            <View>
              <View style={styles.linkedCardNameRow}>
                <Text style={styles.linkedCardName}>{linkedCard.name}</Text>
                <View style={styles.linkedCardBadge}>
                  <Text style={styles.linkedCardBadgeText}>{linkedCard.badge}</Text>
                </View>
              </View>
              <Text style={styles.linkedCardDetail}>{linkedCard.detail}</Text>
            </View>
          </View>
          <Ionicons name="ellipsis-vertical" size={16} color={SwiftColors.textSecondary} />
        </View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.sectionDot} />
          </View>
          <Text style={styles.manageAll}>See Statement</Text>
        </View>

        <View style={styles.activityList}>
          {walletActivity.map((item) => (
            <View key={item.id} style={[styles.activityRow, SwiftShadow.card]}>
              <View style={styles.activityLeft}>
                <View style={[styles.activityIconWrap, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={17} color={SwiftColors.textPrimary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.activityRight}>
                <Text style={[styles.activityAmount, item.amount > 0 && styles.activityAmountPositive]}>
                  {item.amount > 0 ? '+' : '-'}₦{Math.abs(item.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </Text>
                {item.status ? (
                  <View style={[styles.activityStatusBadge, { backgroundColor: item.statusBg }]}>
                    <Text style={[styles.activityStatusText, { color: item.statusColor }]}>{item.status}</Text>
                  </View>
                ) : (
                  <Text style={styles.activityAction}>{item.action} ›</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.promoBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoLabel}>{walletPromoBanner.label}</Text>
            <Text style={styles.promoTitle}>{walletPromoBanner.title}</Text>
            <Text style={styles.promoSubtitle}>{walletPromoBanner.subtitle}</Text>
          </View>
          <View style={styles.promoIconWrap}>
            <Ionicons name="flash" size={16} color={SwiftColors.white} />
          </View>
        </View>
      </ScrollView>

      <BottomNav items={homeNavItems} activeKey="wallet" onPress={handleNavPress} />
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
    gap: 16,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verificationTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.44,
    color: SwiftColors.textPrimary,
  },
  verificationSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  verificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  balanceCard: {
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  balanceLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: '#D8DADA',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scanButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.charcoal,
  },
  balanceValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 32,
    color: SwiftColors.white,
    letterSpacing: -0.5,
  },
  balanceMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  balanceMetaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceMetaText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: '#D8DADA',
  },
  balanceActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceAction: {
    alignItems: 'center',
    gap: 6,
  },
  balanceActionCircle: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceActionCircleMuted: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  balanceActionLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: '#D8DADA',
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
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.emerald,
  },
  manageAll: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  subWalletsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  subWalletCard: {
    flex: 1,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 6,
  },
  subWalletTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subWalletName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  subWalletBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  subWalletBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
  },
  subWalletValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  subWalletValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  subWalletValueUnit: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  subWalletSubtext: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  subWalletCta: {
    backgroundColor: 'rgba(255,221,180,0.5)',
    borderRadius: SwiftRadius.sm,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 2,
  },
  subWalletCtaText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDeep,
  },
  fundingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  fundingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  fundingText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    lineHeight: 16,
  },
  fundingTextStrong: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    color: SwiftColors.textPrimary,
    fontSize: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  copyButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  virtualCard: {
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  virtualCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  virtualCardLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: SwiftColors.mint,
  },
  virtualCardToggleRow: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  virtualCardToggleText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.white,
  },
  virtualCardNumber: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 20,
    letterSpacing: 3,
    color: SwiftColors.white,
  },
  virtualCardBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  virtualCardMetaLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 9,
    letterSpacing: 0.5,
    color: SwiftColors.mint,
  },
  virtualCardMetaValue: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.white,
    marginTop: 2,
  },
  linkedCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
  },
  linkedCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkedCardNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkedCardName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  linkedCardBadge: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  linkedCardBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.textSecondary,
  },
  linkedCardDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  activityList: {
    gap: 10,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 8,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  activityIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  activitySubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  activityRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  activityAmount: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.error,
  },
  activityAmountPositive: {
    color: SwiftColors.emerald,
  },
  activityStatusBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  activityStatusText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
  },
  activityAction: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 12,
  },
  promoLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: SwiftColors.emerald,
  },
  promoTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
    marginTop: 2,
  },
  promoSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  promoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
