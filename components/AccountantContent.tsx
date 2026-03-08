import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    hero: {
      backgroundColor: colors.primary + '20',
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    heroIcon: { marginBottom: spacing.md },
    heroTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
    heroDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm, lineHeight: 22 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.md },
    step: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
    stepNum: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    stepNumText: { fontSize: 14, fontWeight: '700', color: '#fff' },
    stepText: { flex: 1, fontSize: 15, color: colors.text },
    inviteBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: spacing.md,
      gap: 8,
      marginBottom: spacing.lg,
    },
    inviteBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
    label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8 },
    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
    section: { marginBottom: spacing.lg },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
    accRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    accAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    accAvatarText: { fontSize: 18, fontWeight: '700', color: '#fff' },
    accInfo: { flex: 1 },
    accName: { fontSize: 16, fontWeight: '600', color: colors.text },
    accEmail: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
    empty: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.xl,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
    },
    emptyText: { fontSize: 15, color: colors.textSecondary, marginTop: spacing.sm },
    emptySub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    findCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.lg,
    },
    findTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: spacing.sm },
    findDesc: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 },
    findBtn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: spacing.md,
      alignItems: 'center',
      marginTop: spacing.md,
    },
    findBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  });
}

export function AccountantContent() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { accountants, addAccountant } = useApp();
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    const name = email ? email.split('@')[0] : 'นักบัญชี';
    addAccountant({ name, email: email || 'accountant@sample.co.th' });
    Alert.alert('ส่งคำเชิญแล้ว', `ส่งคำเชิญไปยัง ${email || 'accountant@sample.co.th'} แล้ว`, () =>
      setEmail('')
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons name="people" size={48} color={colors.primary} />
        </View>
        <Text style={styles.heroTitle}>เชื่อมต่อกับนักบัญชี</Text>
        <Text style={styles.heroDesc}>
          แชร์ข้อมูลบัญชีกับนักบัญชีหรือที่ปรึกษาได้อย่างปลอดภัย
          นักบัญชีจะเห็นรายรับ-รายจ่าย เอกสาร และรายงานที่คุณอนุญาต
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>วิธีเชื่อมต่อ</Text>
        <View style={styles.step}>
          <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
          <Text style={styles.stepText}>ส่งลิงก์เชิญหรืออีเมลให้นักบัญชี</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View>
          <Text style={styles.stepText}>นักบัญชีลงทะเบียนและยอมรับคำเชิญ</Text>
        </View>
        <View style={styles.step}>
          <View style={styles.stepNum}><Text style={styles.stepNumText}>3</Text></View>
          <Text style={styles.stepText}>ตั้งสิทธิ์การเข้าถึง (ดูได้/แก้ไขได้)</Text>
        </View>
      </View>

      <Text style={styles.label}>อีเมลนักบัญชี</Text>
      <TextInput
        style={styles.input}
        placeholder="เช่น accountant@office.co.th"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.inviteBtn} onPress={handleInvite}>
        <Ionicons name="person-add" size={22} color="#fff" />
        <Text style={styles.inviteBtnText}>เชิญนักบัญชี</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>หาสำนักงานบัญชี</Text>
        <View style={styles.findCard}>
          <Ionicons name="business" size={32} color={colors.primary} />
          <Text style={styles.findTitle}>VeloLedger ช่วยจัดหาสำนักงานบัญชี</Text>
          <Text style={styles.findDesc}>
            เราช่วยจัดหาสำนักงานบัญชีหรือนักบัญชีอิสระ ที่เหมาะกับธุรกิจของคุณ
            การันตีความเชี่ยวชาญด้านโปรแกรมบัญชีออนไลน์
          </Text>
          <TouchableOpacity style={styles.findBtn}>
            <Text style={styles.findBtnText}>ค้นหาสำนักงานบัญชี</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>นักบัญชีที่เชื่อมต่อแล้ว</Text>
        {accountants.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="person-outline" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyText}>ยังไม่มีนักบัญชีที่เชื่อมต่อ</Text>
            <Text style={styles.emptySub}>กด "เชิญนักบัญชี" เพื่อส่งคำเชิญ</Text>
          </View>
        ) : (
          accountants.map((acc) => (
            <View key={acc.id} style={styles.accRow}>
              <View style={styles.accAvatar}>
                <Text style={styles.accAvatarText}>{acc.name.charAt(0)}</Text>
              </View>
              <View style={styles.accInfo}>
                <Text style={styles.accName}>{acc.name}</Text>
                <Text style={styles.accEmail}>{acc.email}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
