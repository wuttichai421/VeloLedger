import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

const plans = [
  { id: 'free', name: 'Free', tag: 'เหมาะกับฟรีแลนซ์', price: '0', period: 'บาท/ปี', note: 'ฟรีตลอดชีพ', cta: 'เริ่มต้นใช้งาน', badge: null as string | null, features: ['1 สิทธิ์ผู้ใช้งาน', 'รูปแบบเอกสารมาตรฐาน', 'สร้างเอกสารได้ ไม่จำกัด', 'รายงานสรุปยอดขายและภาษี', 'แดชบอร์ดสรุปการเงิน', 'ใช้งานผ่านแอปมือถือ'] },
  { id: 'standard', name: 'Standard', tag: 'เหมาะสำหรับธุรกิจเริ่มต้น', price: '1,990', period: 'บาท/ปี', note: '165 บาท/เดือน', cta: 'ทดลองฟรี 30 วัน', badge: null as string | null, features: ['ทุกฟังก์ชั่นใน Free', 'กระทบยอดธนาคาร', 'ส่ง e-Tax Invoice', 'จดค่าใช้จ่ายและออกหัก ณ ที่จ่าย', 'จัดการภาษีมูลค่าเพิ่ม', 'ดูงบการเงินแบบเรียลไทม์'] },
  { id: 'pro', name: 'Pro', tag: 'เหมาะสำหรับธุรกิจที่กำลังเติบโต', price: '2,990', period: 'บาท/ปี', note: '249 บาท/เดือน', cta: 'ทดลองฟรี 30 วัน', badge: null as string | null, features: ['ทุกฟังก์ชั่นใน Standard', 'เพิ่มสิทธิ์ผู้ใช้งานได้ไม่จำกัด', 'ออกเอกสารขายได้ทุกรูปแบบ', 'บริหารสต็อกสินค้า', 'ระบบแบ่งรับชำระ รับมัดจำ'] },
  { id: 'pro-business', name: 'Pro Business', tag: 'เหมาะสำหรับธุรกิจที่เชื่อมต่อหลายระบบ', price: '5,490', period: 'บาท/ปี', note: 'เริ่มต้น 457 บาท/เดือน', cta: 'ทดลองฟรี 30 วัน', badge: 'แนะนำ', features: ['ทุกฟังก์ชั่นใน Pro', 'จัดการหลายคลังสินค้า', 'เชื่อมต่อ Shopee / Lazada / TikTok Shop', 'สแกนค่าใช้จ่ายไม่จำกัดจำนวน'] },
];

export default function PricingScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 4 },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },
    toggle: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, padding: 4, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
    toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
    toggleBtnActive: { backgroundColor: colors.primary },
    toggleText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
    toggleTextActive: { color: '#fff', fontWeight: '600' },
    toggleBadge: { fontSize: 11, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
    badge: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderTopRightRadius: 16, borderBottomLeftRadius: 8 },
    badgeText: { fontSize: 12, fontWeight: '600', color: '#fff' },
    planTag: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
    planName: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 8 },
    priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
    price: { fontSize: 24, fontWeight: '800', color: colors.primary },
    period: { fontSize: 14, color: colors.textSecondary, marginLeft: 4 },
    note: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.md },
    ctaBtn: { backgroundColor: colors.primary, borderRadius: 12, padding: spacing.md, alignItems: 'center', marginBottom: spacing.md },
    ctaText: { fontSize: 16, fontWeight: '600', color: '#fff' },
    features: { marginTop: spacing.sm },
    featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    featureText: { fontSize: 14, color: colors.text, flex: 1 },
    footer: { alignItems: 'center', marginTop: spacing.lg },
    footerText: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ</Text>
      <Text style={styles.subtitle}>แพ็กเกจและราคา (อ้างอิง VeloLedger)</Text>

      <View style={styles.toggle}>
        <View style={styles.toggleBtn}>
          <Text style={styles.toggleText}>รายเดือน</Text>
        </View>
        <View style={[styles.toggleBtn, styles.toggleBtnActive]}>
          <Text style={styles.toggleTextActive}>รายปี</Text>
          <Text style={styles.toggleBadge}>ส่วนลด 17%</Text>
        </View>
      </View>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.card}>
          {plan.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{plan.badge}</Text>
            </View>
          )}
          <Text style={styles.planTag}>{plan.tag}</Text>
          <Text style={styles.planName}>{plan.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.period}>{plan.period}</Text>
          </View>
          <Text style={styles.note}>{plan.note}</Text>
          <TouchableOpacity style={styles.ctaBtn}>
            <Text style={styles.ctaText}>{plan.cta}</Text>
          </TouchableOpacity>
          <View style={styles.features}>
            {plan.features.map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <Text style={styles.featureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>ปรึกษาแพ็กเกจที่เหมาะกับธุรกิจ สอบถามฝ่ายขาย 02-026-8991</Text>
      </View>
    </ScrollView>
  );
}
