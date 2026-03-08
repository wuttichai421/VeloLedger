import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    title: { fontSize: 20, fontWeight: '700', color: colors.text },
    subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.lg },
    photoSection: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      minHeight: 200,
      justifyContent: 'center',
    },
    photoButtons: { flexDirection: 'row', justifyContent: 'space-around' },
    photoBtn: { alignItems: 'center' },
    photoBtnText: { marginTop: 8, fontSize: 14, color: colors.primary, fontWeight: '500' },
    imageWrap: { position: 'relative', borderRadius: 12, overflow: 'hidden' },
    preview: { width: '100%', height: 200, borderRadius: 12 },
    removeImage: { position: 'absolute', top: 8, right: 8 },
    form: { marginBottom: spacing.lg },
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
    inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
    saveBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: spacing.md,
      gap: 8,
    },
    saveBtnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  });
}

export default function ScanExpenseScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const router = useRouter();
  const { addTransaction } = useApp();
  const [image, setImage] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('ต้องการสิทธิ์กล้อง', 'เปิดใช้งานกล้องเพื่อสแกนใบเสร็จ');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('ต้องการสิทธิ์รูปภาพ', 'เปิดใช้งานคลังรูปเพื่อเลือกใบเสร็จ');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const saveExpense = () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกจำนวนเงิน');
      return;
    }
    const value = Number(amount);
    addTransaction({
      label: note.trim() || `ค่าใช้จ่าย ฿${value.toLocaleString('th-TH')}`,
      amount: value,
      type: 'expense',
    });
    Alert.alert('บันทึกสำเร็จ', `บันทึกค่าใช้จ่าย ฿${value.toLocaleString('th-TH')} แล้ว`, [
      { text: 'ตกลง', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>สแกนหรืออัปโหลดใบเสร็จ</Text>
      <Text style={styles.subtitle}>ถ่ายรูปหรือเลือกจากคลังรูป แล้วกรอกรายละเอียด</Text>

      <View style={styles.photoSection}>
        {image ? (
          <View style={styles.imageWrap}>
            <Image source={{ uri: image }} style={styles.preview} resizeMode="cover" />
            <TouchableOpacity
              style={styles.removeImage}
              onPress={() => setImage(null)}
            >
              <Ionicons name="close-circle" size={32} color={colors.danger} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoButtons}>
            <TouchableOpacity style={styles.photoBtn} onPress={takePhoto}>
              <Ionicons name="camera" size={40} color={colors.primary} />
              <Text style={styles.photoBtnText}>ถ่ายรูป</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
              <Ionicons name="images" size={40} color={colors.primary} />
              <Text style={styles.photoBtnText}>เลือกจากคลัง</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>จำนวนเงิน (บาท) *</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.label}>หมายเหตุ (ไม่บังคับ)</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="เช่น ค่าอาหารประชุม, ค่าเดินทาง"
          placeholderTextColor={colors.textSecondary}
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={saveExpense}>
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
        <Text style={styles.saveBtnText}>บันทึกค่าใช้จ่าย</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
