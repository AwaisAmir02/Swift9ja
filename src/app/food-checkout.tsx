import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { checkoutOrder, featuredDish } from '@/services/dummy-data';

export default function FoodCheckoutScreen() {
  const [speedTier, setSpeedTier] = useState(checkoutOrder.defaultSpeedTier);
  const [sideQty, setSideQty] = useState(checkoutOrder.sidePortionQty);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [tip, setTip] = useState<number | null>(checkoutOrder.defaultCourierTip);

  const { summary } = checkoutOrder;
  const pointsAdjustment = redeemPoints ? checkoutOrder.swiftPointsRedeem : 0;
  const tipAmount = tip ?? 0;
  const totalPayable = summary.itemsSubtotal + summary.promoDiscount + summary.packagingLevy + tipAmount - pointsAdjustment;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {checkoutOrder.restaurantName} (1 item)
          </Text>
          <View style={styles.encryptedBadge}>
            <Ionicons name="lock-closed" size={11} color={SwiftColors.emerald} />
            <Text style={styles.encryptedText}>256-Bit Encrypted</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.expressRow}>
          <View style={styles.expressLeft}>
            <Ionicons name="bicycle" size={16} color={SwiftColors.emeraldDark} />
            <View>
              <Text style={styles.expressTitle}>EXPRESS DELIVERY</Text>
              <Text style={styles.expressSubtitle}>20-30 mins</Text>
            </View>
          </View>
          <Pressable>
            <Text style={styles.addNoteLink}>+ Add Note</Text>
          </Pressable>
        </View>

        <View style={[styles.addressCard, SwiftShadow.card]}>
          <View style={styles.addressTopRow}>
            <View style={styles.addressLabelRow}>
              <Ionicons name="location" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
            </View>
            <Text style={styles.changeLink}>Change</Text>
          </View>
          <Text style={styles.addressTitle}>{checkoutOrder.deliveryAddress.label}</Text>
          <Text style={styles.addressDetail}>{checkoutOrder.deliveryAddress.detail}</Text>
          <View style={styles.addressContactRow}>
            <Text style={styles.addressContact}>{checkoutOrder.deliveryAddress.contact}</Text>
            <Text style={styles.editLink}>Edit</Text>
          </View>
          <View style={styles.addressNoteRow}>
            <Ionicons name="chatbox-ellipses-outline" size={12} color={SwiftColors.textSecondary} />
            <Text style={styles.addressNoteText}>{checkoutOrder.deliveryAddress.note}</Text>
          </View>
        </View>

        <View style={styles.speedSection}>
          <Text style={styles.speedTitle}>Speed Tier</Text>
          <View style={styles.speedRow}>
            {checkoutOrder.speedTiers.map((tier) => {
              const isActive = tier.id === speedTier;
              return (
                <Pressable
                  key={tier.id}
                  style={[styles.speedCard, isActive && styles.speedCardActive]}
                  onPress={() => setSpeedTier(tier.id)}>
                  {tier.badge ? (
                    <View style={styles.speedBadge}>
                      <Text style={styles.speedBadgeText}>{tier.badge}</Text>
                    </View>
                  ) : null}
                  <Text style={styles.speedLabel}>{tier.label}</Text>
                  <Text style={styles.speedEta}>{tier.eta}</Text>
                  <Text style={styles.speedPrice}>{tier.price === 0 ? 'Free' : `₦${tier.price}`}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.restaurantRow}>
          <View style={styles.restaurantIconWrap}>
            <Ionicons name="restaurant" size={16} color={SwiftColors.textPrimary} />
          </View>
          <Text style={styles.restaurantName}>Kilimanjaro Restaurant</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={11} color={SwiftColors.emeraldDark} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <View style={[styles.itemCard, SwiftShadow.card]}>
          <View style={styles.itemImage}>
            <Ionicons name="fast-food" size={22} color={SwiftColors.textFaint} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName} numberOfLines={2}>
              {featuredDish.name}
            </Text>
            <Text style={styles.itemPrice}>₦{featuredDish.price.toLocaleString('en-NG')}</Text>
          </View>
          <Pressable>
            <Ionicons name="create-outline" size={16} color={SwiftColors.textSecondary} />
          </Pressable>
        </View>
        <Text style={styles.zeroTransferNote}>Zero Transfer Fee</Text>

        <Pressable style={styles.placeOrderButton} onPress={() => router.push('/food-order-tracking')}>
          <Text style={styles.placeOrderText}>
            Place Order & Pay with SwiftWallet • ₦{totalPayable.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </Text>
        </Pressable>
        <Text style={styles.termsNote}>
          By clicking place order, you agree to the Swift9JA Trial Dispatch & Delivery Terms.
        </Text>

        <View style={styles.stepperRow}>
          <Text style={styles.stepperLabel}>Side Portion</Text>
          <View style={styles.stepperControl}>
            <Pressable
              style={styles.stepperButton}
              onPress={() => setSideQty((prev) => Math.max(0, prev - 1))}>
              <Ionicons name="remove" size={14} color={SwiftColors.textPrimary} />
            </Pressable>
            <Text style={styles.stepperValue}>{sideQty}</Text>
            <Pressable style={styles.stepperButton} onPress={() => setSideQty((prev) => prev + 1)}>
              <Ionicons name="add" size={14} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.includedRow}>
          <Ionicons name="checkmark-circle" size={14} color={SwiftColors.emerald} />
          <Text style={styles.includedText}>Ice Cutlery & Napkins • Included at Zero extra cost</Text>
        </View>

        <Pressable onPress={() => router.push('/restaurant')}>
          <Text style={styles.addMoreLink}>+ Add more meals from Kilimanjaro</Text>
        </Pressable>

        <View style={styles.promoAppliedRow}>
          <View style={styles.promoAppliedLeft}>
            <Ionicons name="pricetag" size={13} color={SwiftColors.emeraldDark} />
            <Text style={styles.promoAppliedText}>{checkoutOrder.promoCode}</Text>
          </View>
          <View style={styles.promoAppliedRight}>
            <Text style={styles.promoAppliedDiscount}>
              -₦{checkoutOrder.promoDiscount.toLocaleString('en-NG')} discount collected
            </Text>
            <Text style={styles.changeLink}>Change</Text>
          </View>
        </View>

        <View style={styles.swiftPassRow}>
          <Ionicons name="ribbon" size={14} color={SwiftColors.amberDeep} />
          <Text style={styles.swiftPassText}>
            SwiftPass Zero Delivery • ₦0 delivery fee applied (Saved ₦{checkoutOrder.swiftPassDeliverySaved})
          </Text>
        </View>

        <Pressable style={styles.redeemRow} onPress={() => setRedeemPoints((prev) => !prev)}>
          <Ionicons
            name={redeemPoints ? 'checkbox' : 'square-outline'}
            size={16}
            color={redeemPoints ? SwiftColors.emerald : SwiftColors.textSecondary}
          />
          <Text style={styles.redeemText}>
            Redeem {checkoutOrder.swiftPointsRedeem} SwiftPoints • Save ₦{checkoutOrder.swiftPointsRedeem} (instant
            wallet credit)
          </Text>
        </Pressable>

        <View style={styles.tipSection}>
          <View style={styles.tipHeaderRow}>
            <Ionicons name="bicycle" size={15} color={SwiftColors.textPrimary} />
            <Text style={styles.tipTitle}>Naija Courier Love</Text>
          </View>
          <Text style={styles.tipSubtitle}>Appreciate your Rider who ensures ride-through Abuja traffic.</Text>
          <View style={styles.tipRow}>
            {checkoutOrder.courierTipOptions.map((amount) => {
              const isActive = tip === amount;
              return (
                <Pressable
                  key={amount}
                  style={[styles.tipChip, isActive && styles.tipChipActive]}
                  onPress={() => setTip(amount)}>
                  <Text style={[styles.tipChipText, isActive && styles.tipChipTextActive]}>
                    ₦{amount.toLocaleString('en-NG')}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable style={[styles.tipChip, tip === null && styles.tipChipActive]} onPress={() => setTip(null)}>
              <Text style={[styles.tipChipText, tip === null && styles.tipChipTextActive]}>Custom</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <Text style={styles.changeLink}>Change</Text>
          </View>
          <View style={styles.paymentCard}>
            <View style={styles.paymentTopRow}>
              <View style={styles.paymentLeft}>
                <Ionicons name="wallet" size={16} color={SwiftColors.mint} />
                <Text style={styles.paymentName}>SWIFTWALLET</Text>
              </View>
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>Selected</Text>
              </View>
            </View>
            <View style={styles.paymentBottomRow}>
              <Text style={styles.paymentBalance}>
                Bal: ₦{checkoutOrder.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })} + ₦
                {checkoutOrder.walletTopUp} top-up
              </Text>
              <Ionicons name="checkmark-circle" size={16} color={SwiftColors.mint} />
            </View>
          </View>
          <View style={styles.paymentTabsRow}>
            <View style={styles.paymentTab}>
              <Ionicons name="card-outline" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.paymentTabText}>Debit Card</Text>
            </View>
            <View style={styles.paymentTab}>
              <Ionicons name="keypad-outline" size={13} color={SwiftColors.textSecondary} />
              <Text style={styles.paymentTabText}>USSD Transfer</Text>
            </View>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items Subtotal (2 items)</Text>
            <Text style={styles.summaryValue}>₦{summary.itemsSubtotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabelAccent}>Promo Discount ({checkoutOrder.promoCode})</Text>
            <Text style={styles.summaryValueAccent}>
              -₦{Math.abs(summary.promoDiscount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Swift Dispatch Fee</Text>
            <Text style={styles.summaryValueFree}>FREE (SwiftPass)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Packaging & Kitchen Levy</Text>
            <Text style={styles.summaryValue}>₦{summary.packagingLevy.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Courier Tip</Text>
            <Text style={styles.summaryValue}>₦{tipAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>
              ₦{totalPayable.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <Text style={styles.pointsFooter}>+{checkoutOrder.pointsEarned} SwiftPoints on completion</Text>
        </View>
      </ScrollView>
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
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  encryptedText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emerald,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  expressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expressTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: SwiftColors.textPrimary,
  },
  expressSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  addNoteLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  addressCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 14,
    gap: 4,
  },
  addressTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addressLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: SwiftColors.textSecondary,
  },
  changeLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  addressTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  addressDetail: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  addressContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  addressContact: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  editLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.amber,
  },
  addressNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  addressNoteText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  speedSection: {
    gap: 8,
  },
  speedTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  speedRow: {
    flexDirection: 'row',
    gap: 8,
  },
  speedCard: {
    flex: 1,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  speedCardActive: {
    backgroundColor: SwiftColors.surface,
    borderColor: SwiftColors.emerald,
  },
  speedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: SwiftColors.goldPale,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginBottom: 4,
  },
  speedBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.amberDeep,
  },
  speedLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  speedEta: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 2,
  },
  speedPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 12,
    color: SwiftColors.emerald,
    marginTop: 4,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  restaurantIconWrap: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  verifiedText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  itemPrice: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.emerald,
    marginTop: 2,
  },
  zeroTransferNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: -6,
  },
  placeOrderButton: {
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    ...SwiftShadow.card,
  },
  placeOrderText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 14,
    color: SwiftColors.white,
    textAlign: 'center',
  },
  termsNote: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
    textAlign: 'center',
    marginTop: -6,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepperLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  stepperControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepperButton: {
    width: 24,
    height: 24,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  includedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  includedText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  addMoreLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  promoAppliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(138,245,180,0.2)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  promoAppliedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoAppliedText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 12,
    color: SwiftColors.emeraldDark,
  },
  promoAppliedRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  promoAppliedDiscount: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  swiftPassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,221,180,0.3)',
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  swiftPassText: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.amberDeep,
  },
  redeemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
  },
  redeemText: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  tipSection: {
    gap: 8,
    paddingTop: 8,
  },
  tipHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tipTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  tipSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipChip: {
    flex: 1,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tipChipActive: {
    backgroundColor: SwiftColors.emerald,
  },
  tipChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  tipChipTextActive: {
    color: SwiftColors.white,
  },
  paymentSection: {
    gap: 8,
    paddingTop: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  paymentCard: {
    backgroundColor: SwiftColors.charcoal,
    borderRadius: SwiftRadius.md,
    padding: 14,
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
  paymentName: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    letterSpacing: 0.5,
    color: SwiftColors.white,
  },
  selectedBadge: {
    backgroundColor: SwiftColors.gold,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  selectedBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amberDark,
  },
  paymentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentBalance: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: '#D8DADA',
  },
  paymentTabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    paddingVertical: 10,
  },
  paymentTabText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  summarySection: {
    gap: 8,
    paddingTop: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textSecondary,
  },
  summaryValue: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  summaryLabelAccent: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  summaryValueAccent: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 13,
    color: SwiftColors.emerald,
  },
  summaryValueFree: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.emerald,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: SwiftColors.border,
    marginVertical: 4,
  },
  totalLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  totalValue: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  pointsFooter: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
});
