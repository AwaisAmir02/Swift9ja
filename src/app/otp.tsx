import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius, SwiftShadow } from '@/constants/swift-colors';

const LOGO = require('../assets/images/logo.jpg');
const OTP_LENGTH = 6;
const KEYPAD_ROWS: { digit: string; sub?: string }[][] = [
  [{ digit: '1' }, { digit: '2', sub: 'ABC' }, { digit: '3', sub: 'DEF' }],
  [{ digit: '4', sub: 'GHI' }, { digit: '5', sub: 'JKL' }, { digit: '6', sub: 'MNO' }],
  [{ digit: '7', sub: 'PQRS' }, { digit: '8', sub: 'TUV' }, { digit: '9', sub: 'WXYZ' }],
];

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const [digits, setDigits] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(43);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const appendDigit = (digit: string) => {
    setDigits((prev) => (prev.length < OTP_LENGTH ? [...prev, digit] : prev));
  };

  const removeDigit = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  const handleResend = () => {
    setSecondsLeft(60);
    setDigits([]);
  };

  const handleVerify = () => {
    if (digits.length === OTP_LENGTH) {
      router.replace('/home');
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable style={[styles.roundButton, SwiftShadow.card]} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
          </Pressable>
          <View style={[styles.brandPill, SwiftShadow.card]}>
            <Image source={LOGO} style={styles.brandLogo} />
            <Text style={styles.brandText}>Swift9JA</Text>
            <View style={styles.brandDot} />
          </View>
          <Pressable style={[styles.roundButton, SwiftShadow.card]}>
            <Ionicons name="help-circle-outline" size={18} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoIconWrap}>
            <Ionicons name="chatbubble-ellipses" size={26} color={SwiftColors.emeraldDark} />
          </View>
          <Text style={styles.infoTitle}>Verify Phone Number</Text>
          <Text style={styles.infoBody}>
            We sent a 6-digit code to <Text style={styles.infoBodyStrong}>+234 {phone ?? '803 555 0192'}</Text> via
            SMS
          </Text>
          <Pressable style={styles.editRow} onPress={() => router.back()}>
            <Text style={styles.editText}>Edit phone number</Text>
            <Ionicons name="pencil" size={11} color={SwiftColors.amberDeep} />
          </Pressable>
        </View>

        <View style={styles.otpRow}>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const value = digits[index];
            const isActive = index === digits.length;
            return (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  value ? SwiftShadow.card : undefined,
                  !value && !isActive ? styles.otpBoxEmpty : undefined,
                ]}>
                {value ? (
                  <>
                    <Text style={styles.otpDigit}>{value}</Text>
                    <View style={styles.otpUnderline} />
                  </>
                ) : isActive ? (
                  <View style={styles.otpCursor} />
                ) : (
                  <View style={styles.otpEmptyDot} />
                )}
              </View>
            );
          })}
        </View>

        <View style={[styles.resendCard, SwiftShadow.card]}>
          <View style={styles.resendRow}>
            <View style={styles.resendLeft}>
              <Ionicons name="time-outline" size={15} color={SwiftColors.textSecondary} />
              <Text style={styles.resendText}>Didn&apos;t receive SMS?</Text>
            </View>
            <Pressable
              style={styles.resendPill}
              onPress={secondsLeft === 0 ? handleResend : undefined}
              disabled={secondsLeft > 0}>
              <Text style={styles.resendPillLabel}>{secondsLeft > 0 ? 'Resend in' : 'Resend now'}</Text>
              {secondsLeft > 0 ? (
                <Text style={styles.resendPillTime}>
                  {minutes}:{seconds}
                </Text>
              ) : null}
            </Pressable>
          </View>
          <View style={styles.divider} />
          <Pressable style={styles.whatsappRow}>
            <View style={styles.whatsappLeft}>
              <View style={styles.whatsappIconWrap}>
                <Ionicons name="logo-whatsapp" size={16} color={SwiftColors.emeraldDark} />
              </View>
              <View>
                <Text style={styles.whatsappTitle}>Send code via WhatsApp</Text>
                <Text style={styles.whatsappSubtitle}>Instant delivery to linked number</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color={SwiftColors.textSecondary} />
          </Pressable>
        </View>

        <Pressable
          style={[styles.verifyButton, digits.length < OTP_LENGTH && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={digits.length < OTP_LENGTH}>
          <Text style={styles.verifyButtonText}>Verify & Continue</Text>
          <Ionicons name="arrow-forward" size={14} color={SwiftColors.white} />
        </Pressable>

        <View style={styles.footnote}>
          <Ionicons name="shield-checkmark" size={13} color={SwiftColors.emerald} />
          <Text style={styles.footnoteText}>
            Bank-Grade Security • <Text style={styles.footnoteStrong}>CBN Licensed & NDPR Compliant</Text>
          </Text>
        </View>

        <View style={[styles.keypad, SwiftShadow.card]}>
          {KEYPAD_ROWS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map((key) => (
                <Pressable key={key.digit} style={styles.keypadButton} onPress={() => appendDigit(key.digit)}>
                  <Text style={styles.keypadDigit}>{key.digit}</Text>
                  {key.sub ? <Text style={styles.keypadSub}>{key.sub}</Text> : null}
                </Pressable>
              ))}
            </View>
          ))}
          <View style={styles.keypadRow}>
            <Pressable style={styles.keypadBiometric}>
              <Ionicons name="finger-print" size={22} color={SwiftColors.emeraldDark} />
            </Pressable>
            <Pressable style={styles.keypadButton} onPress={() => appendDigit('0')}>
              <Text style={styles.keypadDigit}>0</Text>
            </Pressable>
            <Pressable style={styles.keypadButton} onPress={removeDigit}>
              <Ionicons name="backspace-outline" size={20} color={SwiftColors.textPrimary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  brandLogo: {
    width: 22,
    height: 22,
    borderRadius: SwiftRadius.pill,
  },
  brandText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 16,
    color: SwiftColors.emerald,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: SwiftColors.gold,
  },
  infoSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    gap: 4,
  },
  infoIconWrap: {
    width: 56,
    height: 56,
    borderRadius: SwiftRadius.lg,
    backgroundColor: 'rgba(0,109,64,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 24,
    color: SwiftColors.textPrimary,
  },
  infoBody: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 14,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  infoBodyStrong: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    color: SwiftColors.textPrimary,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  editText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.amberDeep,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: SwiftRadius.md,
    backgroundColor: SwiftColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxEmpty: {
    backgroundColor: SwiftColors.surfaceMuted,
  },
  otpDigit: {
    fontFamily: SwiftFontFamily.headingExtraBold,
    fontSize: 26,
    color: SwiftColors.textPrimary,
  },
  otpUnderline: {
    marginTop: 4,
    width: 16,
    height: 4,
    borderRadius: 9999,
    backgroundColor: SwiftColors.emerald,
  },
  otpCursor: {
    width: 2,
    height: 24,
    borderRadius: 9999,
    backgroundColor: SwiftColors.gold,
  },
  otpEmptyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(215,195,174,0.5)',
  },
  resendCard: {
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.lg,
    padding: 16,
    gap: 12,
    marginBottom: 24,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resendText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
  },
  resendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  resendPillLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  resendPillTime: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.emerald,
  },
  divider: {
    height: 1,
    backgroundColor: SwiftColors.surfaceMuted,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  whatsappLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  whatsappIconWrap: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  whatsappSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: SwiftColors.emerald,
    borderRadius: SwiftRadius.md,
    height: 52,
    marginBottom: 16,
    ...SwiftShadow.card,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 15,
    color: SwiftColors.white,
  },
  footnote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
  },
  footnoteText: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    textAlign: 'center',
  },
  footnoteStrong: {
    color: SwiftColors.textPrimary,
    fontFamily: SwiftFontFamily.headingSemiBold,
  },
  keypad: {
    backgroundColor: SwiftColors.surface,
    borderRadius: 24,
    padding: 12,
    gap: 8,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 8,
  },
  keypadButton: {
    flex: 1,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  keypadBiometric: {
    flex: 1,
    backgroundColor: 'rgba(141,248,183,0.4)',
    borderRadius: SwiftRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  keypadDigit: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 18,
    color: SwiftColors.textPrimary,
  },
  keypadSub: {
    fontFamily: SwiftFontFamily.bodySemiBold,
    fontSize: 9,
    letterSpacing: 0.9,
    color: SwiftColors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
