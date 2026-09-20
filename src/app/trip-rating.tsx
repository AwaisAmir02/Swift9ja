import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';
import { tripRatingData } from '@/services/dummy-data';

export default function TripRatingScreen() {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(tripRatingData.defaultSelectedTags);
  const [note, setNote] = useState(tripRatingData.complimentNote);
  const [selectedTip, setSelectedTip] = useState<number | null>(tripRatingData.defaultTip);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  const tipAmount = selectedTip ?? 0;
  const total = tripRatingData.fare + tipAmount;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Trip Rating & Receipt</Text>
          <View style={styles.headerRight}>
            <Pressable style={styles.headerButton}>
              <Ionicons name="help-circle-outline" size={17} color={SwiftColors.textPrimary} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={13} color={SwiftColors.white} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.completedPill}>
            <Ionicons name="checkmark-circle" size={15} color={SwiftColors.emeraldDark} />
            <Text style={styles.completedPillText}>TRIP COMPLETED</Text>
          </View>
          <Pressable style={styles.dismissButton} onPress={() => router.replace('/home')}>
            <Ionicons name="close" size={15} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={[styles.summaryCard, SwiftShadow.card]}>
          <View style={styles.summaryTop}>
            <View style={styles.summaryAvatarWrap}>
              <View style={styles.summaryAvatar}>
                <Ionicons name="checkmark-done" size={28} color={SwiftColors.emeraldDark} />
              </View>
              <View style={styles.arrivedBadge}>
                <Ionicons name="location" size={9} color={SwiftColors.amberDeepest} />
                <Text style={styles.arrivedBadgeText}>Arrived</Text>
              </View>
            </View>
          </View>
          <Text style={styles.summaryDestination}>{tripRatingData.destination}</Text>
          <Text style={styles.summarySubtitle}>
            Total Trip: {tripRatingData.distanceKm} km in {tripRatingData.durationMins} mins
          </Text>

          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={20} color={SwiftColors.textFaint} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.driverNameRow}>
                <Text style={styles.driverName}>{tripRatingData.driverName}</Text>
                <View style={styles.driverRatingRow}>
                  <Ionicons name="star" size={12} color={SwiftColors.amber} />
                  <Text style={styles.driverRatingText}>{tripRatingData.rating}</Text>
                </View>
              </View>
              <Text style={styles.driverVehicle}>
                {tripRatingData.vehicle} • {tripRatingData.plate}
              </Text>
              <Text style={styles.driverTrips}>
                {tripRatingData.completedTrips.toLocaleString('en-NG')}+ completed trips
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.ratingCard, SwiftShadow.card]}>
          <Text style={styles.ratingTitle}>How was your journey with {tripRatingData.driverFirstName}?</Text>
          <Text style={styles.ratingSubtitle}>
            Your feedback keeps the Swift9JA fleet sovereign and safe
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable key={value} onPress={() => setRating(value)} hitSlop={4}>
                <Ionicons
                  name={value <= rating ? 'star' : 'star-outline'}
                  size={30}
                  color={value <= rating ? SwiftColors.gold : SwiftColors.border}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.tagsSection}>
            <Text style={styles.tagsLabel}>WHAT WENT GREAT?</Text>
            <View style={styles.tagsWrap}>
              {tripRatingData.positiveTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Pressable
                    key={tag}
                    style={[styles.tagChip, isSelected && styles.tagChipSelected]}
                    onPress={() => toggleTag(tag)}>
                    <Text style={[styles.tagChipText, isSelected && styles.tagChipTextSelected]}>
                      {tag}
                      {isSelected ? ' ✓' : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.noteSection}>
            <Text style={styles.tagsLabel}>ADD A COMPLIMENT NOTE</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Share more about your trip..."
              placeholderTextColor={SwiftColors.textMuted}
            />
          </View>
        </View>

        <View style={[styles.tipCard, SwiftShadow.card]}>
          <View style={styles.tipTopRow}>
            <View>
              <Text style={styles.tipTitle}>Add a tip for {tripRatingData.driverFirstName}</Text>
              <Text style={styles.tipSubtitle}>Abuja traffic champion • 100% goes directly to driver</Text>
            </View>
            <Ionicons name="heart" size={22} color={SwiftColors.gold} />
          </View>
          <View style={styles.tipRow}>
            {tripRatingData.tipOptions.map((amount) => {
              const isSelected = selectedTip === amount;
              return (
                <Pressable
                  key={amount}
                  style={[styles.tipChip, isSelected && styles.tipChipSelected]}
                  onPress={() => setSelectedTip(amount)}>
                  <Text style={[styles.tipChipText, isSelected && styles.tipChipTextSelected]}>
                    ₦{amount.toLocaleString('en-NG')}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable
              style={[styles.tipChip, selectedTip === null && styles.tipChipSelected]}
              onPress={() => setSelectedTip(null)}>
              <Text style={[styles.tipChipText, selectedTip === null && styles.tipChipTextSelected]}>Custom</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.receiptCard, SwiftShadow.card]}>
          <View style={styles.receiptTopRow}>
            <View>
              <Text style={styles.receiptLabel}>TOTAL RIDE FARE</Text>
              <Text style={styles.receiptFare}>₦{tripRatingData.fare.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
            </View>
            <View style={styles.receiptRight}>
              <View style={styles.walletBadge}>
                <Ionicons name="wallet" size={11} color={SwiftColors.emeraldDark} />
                <Text style={styles.walletBadgeText}>SwiftWallet</Text>
              </View>
              <Text style={styles.receiptRef}>{tripRatingData.reference}</Text>
            </View>
          </View>

          <View style={styles.breakdownBox}>
            {tripRatingData.breakdown.map((item) => (
              <View key={item.label} style={styles.breakdownRow}>
                <View style={styles.breakdownLeft}>
                  {item.accent ? (
                    <Ionicons name="pricetag" size={12} color={SwiftColors.emerald} style={{ marginRight: 4 }} />
                  ) : null}
                  <Text style={[styles.breakdownLabel, item.accent && styles.breakdownLabelAccent]}>
                    {item.label}
                  </Text>
                </View>
                <Text style={[styles.breakdownValue, item.accent && styles.breakdownLabelAccent]}>
                  {item.value < 0 ? '-' : ''}₦{Math.abs(item.value).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </Text>
              </View>
            ))}
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownLeft}>
                <Ionicons name="hand-left" size={12} color={SwiftColors.textSecondary} style={{ marginRight: 4 }} />
                <Text style={styles.breakdownLabel}>Driver Appreciation Tip</Text>
              </View>
              <Text style={styles.breakdownValue}>₦{tipAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>

          <View style={styles.pointsRow}>
            <View style={styles.pointsLeft}>
              <View style={styles.pointsIconWrap}>
                <Ionicons name="trophy" size={15} color={SwiftColors.white} />
              </View>
              <Text style={styles.pointsText}>+{tripRatingData.swiftPoints} SwiftPoints credited</Text>
            </View>
            <View style={styles.tierBadge}>
              <Text style={styles.tierBadgeText}>{tripRatingData.tier}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Pressable style={styles.submitButton} onPress={() => router.replace('/home')}>
            <Ionicons name="thumbs-up" size={17} color={SwiftColors.white} />
            <Text style={styles.submitButtonText}>
              Submit Rating & Tip (₦{total.toLocaleString('en-NG')} Total)
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <Ionicons name="download" size={14} color={SwiftColors.textPrimary} />
            <Text style={styles.secondaryButtonText}>Download PDF E-Receipt / Split Fare</Text>
          </Pressable>
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
    backgroundColor: 'rgba(248,250,249,0.8)',
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
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    paddingBottom: 32,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.3)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  completedPillText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.emeraldDark,
  },
  dismissButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    overflow: 'hidden',
  },
  summaryTop: {
    alignItems: 'center',
  },
  summaryAvatarWrap: {
    marginBottom: 8,
  },
  summaryAvatar: {
    width: 64,
    height: 64,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrivedBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.gold,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  arrivedBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amberDark,
  },
  summaryDestination: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.45,
  },
  summarySubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 15,
    color: SwiftColors.textPrimary,
  },
  driverRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  driverRatingText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  driverVehicle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  driverTrips: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 11,
    color: SwiftColors.emerald,
    marginTop: 2,
  },
  ratingCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  ratingTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
    textAlign: 'center',
  },
  ratingSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
    marginTop: -12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  tagsSection: {
    gap: 6,
  },
  tagsLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.textSecondary,
    textTransform: 'uppercase',
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagChipSelected: {
    backgroundColor: SwiftColors.emerald,
  },
  tagChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  tagChipTextSelected: {
    color: SwiftColors.white,
  },
  noteSection: {
    gap: 6,
  },
  noteInput: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  tipCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 8,
  },
  tipTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tipTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  tipSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 2,
    maxWidth: 260,
  },
  tipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  tipChip: {
    backgroundColor: SwiftColors.surfaceMuted2,
    borderRadius: SwiftRadius.sm,
    height: 44,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipChipSelected: {
    backgroundColor: SwiftColors.gold,
    ...SwiftShadow.card,
  },
  tipChipText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  tipChipTextSelected: {
    fontFamily: SwiftFontFamily.headingBold,
    color: SwiftColors.amberDark,
  },
  receiptCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.md,
    padding: 16,
    gap: 16,
  },
  receiptTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  receiptLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    letterSpacing: 0.55,
    color: SwiftColors.textSecondary,
  },
  receiptFare: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 28,
    color: SwiftColors.textPrimary,
    letterSpacing: -0.56,
    marginTop: 4,
  },
  receiptRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  walletBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emeraldDark,
  },
  receiptRef: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  breakdownBox: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    padding: 12,
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  breakdownLabelAccent: {
    color: SwiftColors.emerald,
  },
  breakdownValue: {
    fontFamily: SwiftFontFamily.bodyMedium,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,221,180,0.4)',
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  pointsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsIconWrap: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsText: {
    fontFamily: SwiftFontFamily.headingMedium,
    fontSize: 13,
    color: SwiftColors.amberDeep,
  },
  tierBadge: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    ...SwiftShadow.card,
  },
  tierBadgeText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.amber,
  },
  actionsSection: {
    gap: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    minHeight: 52,
    ...SwiftShadow.card,
  },
  submitButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.white,
    textAlign: 'center',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    minHeight: 48,
  },
  secondaryButtonText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
});
