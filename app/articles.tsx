import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

const articles = [
  { id: '1', title: '8 ฟังก์ชั่น โปรแกรมบัญชี ฟรี ที่คุณเอาไว้ใช้ทำธุรกิจได้', desc: 'เรียนรู้ฟีเจอร์พื้นฐานที่ใช้ได้ฟรี' },
  { id: '2', title: 'เชื่อมต่อ โปรแกรมบัญชี กับ Lazada และ Shopee', desc: 'วิธีเชื่อมออเดอร์ออนไลน์กับระบบบัญชี' },
  { id: '3', title: 'ภาษีเงินได้ หัก ณ ที่จ่าย คืออะไร', desc: 'ทำความเข้าใจการหักภาษี ณ ที่จ่าย' },
  { id: '4', title: 'จ้างสำนักงานบัญชี ยังจำเป็นอยู่ไหม', desc: 'เมื่อใช้โปรแกรมบัญชีอยู่แล้ว' },
  { id: '5', title: 'ไฟล์ หัก ณ ที่จ่าย สำหรับใช้ในโปรแกรม RD Prep', desc: 'วิธีเตรียมไฟล์ยื่นภาษี' },
];

export default function ArticlesScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
    cardIcon: { marginRight: spacing.md },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
    cardDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    readMore: { fontSize: 13, color: colors.primary, marginTop: 6, fontWeight: '500' },
    footer: { alignItems: 'center', marginTop: spacing.xl },
    footerText: { fontSize: 12, color: colors.textSecondary },
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>บทความบัญชี ภาษี อ่านง่าย</Text>
      <Text style={styles.subtitle}>แหล่งข้อมูลที่เป็นประโยชน์ต่อธุรกิจและนักบัญชี</Text>

      {articles.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="document-text-outline" size={28} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            <Text style={styles.readMore}>อ่านเพิ่มเติม</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>บทความเพิ่มเติมได้ที่ flowaccount.com</Text>
      </View>
    </ScrollView>
  );
}
