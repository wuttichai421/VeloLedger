import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';

const videos = [
  { id: '1', title: 'สาธิตการใช้งานฟรี 45 นาที', desc: 'แนะนำระบบและฟีเจอร์หลัก' },
  { id: '2', title: 'คอร์สสอนสด ใช้เป็นใน 4 ชั่วโมง', desc: 'ตั้งค่าการใช้งานแบบส่วนตัว' },
  { id: '3', title: 'ติดทักษะการใช้งานแบบเข้มข้นใน 2 วัน', desc: 'สำหรับทีมบัญชีและผู้จัดการ' },
  { id: '4', title: 'วิดีโอสอนออกเอกสาร (ใบเสนอราคา, ใบแจ้งหนี้)', desc: 'ทำเอกสารขาย step-by-step' },
  { id: '5', title: 'วิดีโอสอนสแกนค่าใช้จ่ายและจัดการใบเสร็จ', desc: 'ใช้ AutoKey และรายการค่าใช้จ่าย' },
];

export default function VideosScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    thumb: {
      width: 64,
      height: 64,
      borderRadius: 8,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
    cardDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
    footer: { alignItems: 'center', marginTop: spacing.xl },
    footerText: { fontSize: 12, color: colors.textSecondary },
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>วิดีโอสอนใช้งาน</Text>
      <Text style={styles.subtitle}>ครบทุกฟังก์ชั่น ให้คุณเริ่มต้นใช้งานระบบด้วยตัวเองได้เลย</Text>

      {videos.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={styles.thumb}>
            <Ionicons name="play-circle" size={48} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>วิดีโอเพิ่มเติมได้ที่ flowaccount.com</Text>
      </View>
    </ScrollView>
  );
}
