import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

const faqs = [
  {
    q: 'โปรแกรมบัญชี VeloLedger เหมาะกับธุรกิจแบบไหน?',
    a: 'เหมาะกับฟรีแลนซ์ เจ้าของธุรกิจขนาดเล็ก SMEs หรือธุรกิจที่ต้องการเครื่องมือช่วยออกเอกสารธุรกิจออนไลน์ ใช้งานได้ทั้งคอมพิวเตอร์ แท็บเล็ต หรือมือถือ ช่วยให้ทำงานร่วมกับนักบัญชีสะดวกในระบบเดียวกัน',
  },
  {
    q: 'ออกเอกสาร ใบกำกับภาษี และหนังสือรับรองหัก ณ ที่จ่ายได้ไหม?',
    a: 'สามารถใช้แอป VeloLedger ออกใบกำกับภาษี และหนังสือรับรองหัก ณ ที่จ่ายได้ ตามรูปแบบของสรรพากร',
  },
  {
    q: 'ข้อมูลในโปรแกรมบัญชีมีความปลอดภัยแค่ไหน?',
    a: 'VeloLedger ใช้ระบบคลาวด์ที่มีความปลอดภัยสูง มีการสำรองข้อมูลอย่างสม่ำเสมอ ผู้ใช้งานเข้าสู่ระบบผ่านอีเมลและการเข้ารหัส (เมื่อเชื่อม Backend จริง)',
  },
  {
    q: 'วิธีบันทึกค่าใช้จ่าย?',
    a: 'ไปที่ ภาพรวม > สแกนบันทึกค่าใช้จ่าย หรือถ่ายรูปใบเสร็จ แล้วกรอกจำนวนเงินและหมายเหตุ',
  },
  {
    q: 'ออกใบเสนอราคา / ใบแจ้งหนี้ / ใบเสร็จรับเงิน / ใบกำกับภาษีอย่างไร?',
    a: 'ไปที่แท็บ เอกสาร เลือกประเภทเอกสารที่ต้องการ กรอกรายละเอียดลูกค้าและจำนวนเงิน แล้วกดบันทึก',
  },
  {
    q: 'เชิญนักบัญชีหรือหาสำนักงานบัญชีได้อย่างไร?',
    a: 'ไปที่ เพิ่มเติม > เชื่อมต่อนักบัญชี เพื่อเชิญนักบัญชีด้วยอีเมล หรือใช้บริการ "หาสำนักงานบัญชี" เพื่อให้ VeloLedger ช่วยจัดหาที่เหมาะกับธุรกิจ',
  },
  {
    q: 'ต้องติดตั้งโปรแกรมคอมพิวเตอร์หรือไม่?',
    a: 'VeloLedger ทำงานผ่านเว็บและแอปมือถือ ไม่จำเป็นต้องติดตั้งโปรแกรม เพียงล็อกอินเพื่อเข้าใช้งานได้ทันที',
  },
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
    faq: { marginBottom: spacing.md },
    faqQ: { fontSize: 15, fontWeight: '600', color: colors.text },
    faqA: { fontSize: 14, color: colors.textSecondary, marginTop: 4, lineHeight: 22 },
    contact: { backgroundColor: colors.card, borderRadius: 16, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
    contactTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 },
    contactDesc: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.sm },
    contactRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginTop: spacing.md },
    contactBlock: { flex: 1 },
    contactText: { fontSize: 15, color: colors.primary },
    contactSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
    footer: { alignItems: 'center', marginTop: spacing.xl, paddingVertical: spacing.lg },
    footerText: { fontSize: 12, color: colors.textSecondary },
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>ช่วยเหลือ</Text>
      <Text style={styles.subtitle}>คำถามที่พบบ่อย</Text>

      <View style={styles.card}>
        {faqs.map((item, i) => (
          // @ts-expect-error - key is valid for React list items; RN ViewProps omits it
          <View key={i} style={styles.faq}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contact}>
        <Text style={styles.contactTitle}>ติดต่อเรา</Text>
        <Text style={styles.contactDesc}>ทีมงานพร้อมให้บริการ ทุกท่านสามารถติดต่อได้ทาง</Text>
        <View style={styles.contactRow}>
          <Ionicons name="call" size={22} color={colors.primary} />
          <View style={styles.contactBlock}>
            <Text style={styles.contactText}>02-026-8989</Text>
            <Text style={styles.contactSub}>จันทร์–ศุกร์ 08:00–22:00 น. เสาร์–อาทิตย์ 09:00–20:00 น.</Text>
          </View>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="mail" size={22} color={colors.primary} />
          <View style={styles.contactBlock}>
            <Text style={styles.contactText}>support@flowaccount.com</Text>
            <Text style={styles.contactSub}>ฝ่ายบริการลูกค้า</Text>
          </View>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="briefcase" size={22} color={colors.primary} />
          <View style={styles.contactBlock}>
            <Text style={styles.contactText}>02-026-8991 • demo@flowaccount.com</Text>
            <Text style={styles.contactSub}>ฝ่ายขาย / นัดสาธิตการใช้งานฟรี</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>VeloLedger v1.0 • โปรแกรมบัญชีออนไลน์ สำหรับ SME ไทย</Text>
      </View>
    </ScrollView>
  );
}
