import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwiftColors, SwiftFontFamily, SwiftRadius } from '@/constants/swift-colors';
import { chatSupportData } from '@/services/dummy-data';

export default function ChatSupportScreen() {
  const [draft, setDraft] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={16} color={SwiftColors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>Customer Support Chat</Text>
          <Pressable style={styles.headerButton}>
            <Ionicons name="help-circle-outline" size={18} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={styles.orderBar}>
        <View style={styles.orderLeft}>
          <View style={styles.agentAvatar}>
            <Ionicons name="person" size={18} color={SwiftColors.textFaint} />
          </View>
          <View>
            <View style={styles.agentNameRow}>
              <Text style={styles.agentName}>{chatSupportData.agent.name}</Text>
              <Ionicons name="checkmark-circle" size={12} color={SwiftColors.gold} />
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityBadgeText}>{chatSupportData.agent.badge}</Text>
              </View>
            </View>
            <Text style={styles.orderContext} numberOfLines={1}>
              Order {chatSupportData.order.id} • {chatSupportData.order.context}
            </Text>
          </View>
        </View>
        <View style={styles.orderActions}>
          <Pressable style={styles.orderActionButton}>
            <Ionicons name="call" size={14} color={SwiftColors.emeraldDark} />
          </Pressable>
          <Pressable style={styles.orderActionButton}>
            <Ionicons name="receipt-outline" size={14} color={SwiftColors.textPrimary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.riderBar}>
        <View style={styles.riderBarLeft}>
          <View style={styles.riderIconWrap}>
            <Ionicons name="bicycle" size={14} color={SwiftColors.amberDeep} />
          </View>
          <View>
            <Text style={styles.riderBarTitle}>
              {chatSupportData.rider.name} • {chatSupportData.rider.etaText}
            </Text>
            <Text style={styles.riderBarSubtitle}>{chatSupportData.rider.vehicle}</Text>
          </View>
        </View>
        <View style={styles.pinChip}>
          <Text style={styles.pinChipLabel}>PIN</Text>
          <Text style={styles.pinChipValue}>{chatSupportData.rider.pin}</Text>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.encryptionPill}>
            <Ionicons name="lock-closed" size={11} color={SwiftColors.textSecondary} />
            <Text style={styles.encryptionText}>{chatSupportData.encryptionNote}</Text>
          </View>

          <Text style={styles.dateLabel}>{chatSupportData.dateLabel}</Text>

          {chatSupportData.messages.map((message) => {
            const isUser = message.from === 'user';
            return (
              <View key={message.id} style={[styles.messageRow, isUser && styles.messageRowUser]}>
                <View style={[styles.messageBubble, isUser ? styles.messageBubbleUser : styles.messageBubbleAgent]}>
                  <Text style={[styles.messageText, isUser && styles.messageTextUser]}>{message.text}</Text>

                  {message.card ? (
                    <View style={styles.messageCard}>
                      <View style={styles.messageCardTopRow}>
                        <Text style={styles.messageCardLabel}>Live Dispatch Status</Text>
                        <View style={styles.messageCardBadge}>
                          <Text style={styles.messageCardBadgeText}>{message.card.status}</Text>
                        </View>
                      </View>
                      <View style={styles.messageCardItemRow}>
                        <View style={styles.messageCardIconWrap}>
                          <Ionicons name="fast-food" size={13} color={SwiftColors.amberDeep} />
                        </View>
                        <View>
                          <Text style={styles.messageCardItem}>{message.card.item}</Text>
                          <Text style={styles.messageCardDropoff}>Drop-off: {message.card.dropoff}</Text>
                        </View>
                      </View>
                      <View style={styles.messageCardFooterRow}>
                        <Ionicons name="call-outline" size={11} color={SwiftColors.textSecondary} />
                        <Text style={styles.messageCardContact}>{message.card.riderContact}</Text>
                        <Text style={styles.copyPinLink}>Copy PIN</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <View style={styles.messageMetaRow}>
                  <Text style={styles.messageTime}>{message.time}</Text>
                  {isUser ? <Ionicons name="checkmark-done" size={13} color={SwiftColors.emerald} /> : null}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.quickRepliesRow}>
          {chatSupportData.quickReplies.map((reply) => (
            <Pressable key={reply} style={styles.quickReplyChip} onPress={() => setDraft(reply)}>
              <Text style={styles.quickReplyText}>{reply}</Text>
            </Pressable>
          ))}
        </View>

        <SafeAreaView edges={['bottom']} style={styles.inputBar}>
          <Pressable style={styles.inputIconButton}>
            <Ionicons name="add" size={18} color={SwiftColors.textSecondary} />
          </Pressable>
          <TextInput
            style={styles.textInput}
            value={draft}
            onChangeText={setDraft}
            placeholder={`Type a message to ${chatSupportData.agent.name}...`}
            placeholderTextColor={SwiftColors.textMuted}
          />
          <Pressable style={styles.inputIconButton}>
            <Ionicons name="mic-outline" size={18} color={SwiftColors.textSecondary} />
          </Pressable>
          <Pressable style={styles.sendButton} onPress={() => setDraft('')}>
            <Ionicons name="arrow-up" size={18} color={SwiftColors.white} />
          </Pressable>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SwiftColors.background,
  },
  header: {
    backgroundColor: SwiftColors.surface,
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
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 16,
    color: SwiftColors.textPrimary,
  },
  orderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SwiftColors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: SwiftColors.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  orderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentName: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 14,
    color: SwiftColors.textPrimary,
  },
  priorityBadge: {
    backgroundColor: 'rgba(138,245,180,0.4)',
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  priorityBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.emeraldDark,
  },
  orderContext: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
    marginTop: 1,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  orderActionButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,221,180,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  riderBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  riderIconWrap: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderBarTitle: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  riderBarSubtitle: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  pinChip: {
    alignItems: 'center',
    backgroundColor: SwiftColors.surface,
    borderRadius: SwiftRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pinChipLabel: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 8,
    letterSpacing: 0.5,
    color: SwiftColors.textSecondary,
  },
  pinChipValue: {
    fontFamily: SwiftFontFamily.headingBold,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  encryptionPill: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  encryptionText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textSecondary,
  },
  dateLabel: {
    alignSelf: 'center',
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 11,
    color: SwiftColors.textFaint,
  },
  messageRow: {
    maxWidth: '82%',
    alignSelf: 'flex-start',
    gap: 4,
  },
  messageRowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: SwiftRadius.md,
    padding: 12,
  },
  messageBubbleAgent: {
    backgroundColor: SwiftColors.surface,
    borderTopLeftRadius: 4,
  },
  messageBubbleUser: {
    backgroundColor: SwiftColors.emerald,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    lineHeight: 19,
    color: SwiftColors.textPrimary,
  },
  messageTextUser: {
    color: SwiftColors.white,
  },
  messageMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  messageTime: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textFaint,
  },
  messageCard: {
    marginTop: 10,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.sm,
    padding: 10,
    gap: 8,
  },
  messageCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageCardLabel: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  messageCardBadge: {
    backgroundColor: 'rgba(138,245,180,0.5)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  messageCardBadgeText: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 9,
    color: SwiftColors.emeraldDark,
  },
  messageCardItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageCardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: SwiftRadius.sm,
    backgroundColor: SwiftColors.goldPale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageCardItem: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 11,
    color: SwiftColors.textPrimary,
  },
  messageCardDropoff: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  messageCardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: SwiftColors.border,
    paddingTop: 8,
  },
  messageCardContact: {
    flex: 1,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 10,
    color: SwiftColors.textSecondary,
  },
  copyPinLink: {
    fontFamily: SwiftFontFamily.headingSemiBold,
    fontSize: 10,
    color: SwiftColors.amber,
  },
  quickRepliesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickReplyChip: {
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickReplyText: {
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 12,
    color: SwiftColors.textPrimary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: SwiftColors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SwiftColors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputIconButton: {
    width: 32,
    height: 32,
    borderRadius: SwiftRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: SwiftColors.surfaceMuted,
    borderRadius: SwiftRadius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: SwiftFontFamily.bodyRegular,
    fontSize: 13,
    color: SwiftColors.textPrimary,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: SwiftRadius.pill,
    backgroundColor: SwiftColors.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
