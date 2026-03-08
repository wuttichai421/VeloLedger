import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '@/constants/theme';
import { useApp, type DocumentType, type Document } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

const DOC_PREFIX: Record<DocumentType, string> = {
  quote: 'Q',
  invoice: 'INV',
  receipt: 'REC',
  tax_invoice: 'TAX',
  delivery_order: 'DO',
};

const DOC_LABELS: Record<DocumentType, { create: string; submit: string; done: string }> = {
  quote: { create: 'สร้างใบเสนอราคา', submit: 'บันทึกและส่งใบเสนอราคา', done: 'บันทึกใบเสนอราคาแล้ว' },
  invoice: { create: 'สร้างใบแจ้งหนี้', submit: 'ออกใบแจ้งหนี้', done: 'ออกใบแจ้งหนี้แล้ว' },
  receipt: { create: 'สร้างใบเสร็จรับเงิน', submit: 'ออกใบเสร็จรับเงิน', done: 'ออกใบเสร็จรับเงินแล้ว' },
  tax_invoice: { create: 'สร้างใบกำกับภาษี', submit: 'ออกใบกำกับภาษี', done: 'ออกใบกำกับภาษีแล้ว' },
  delivery_order: { create: 'สร้างใบวางบิล', submit: 'ออกใบวางบิล', done: 'ออกใบวางบิลแล้ว' },
};

function useStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.md, paddingBottom: spacing.xl * 2 },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
    label: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 8 },
    input: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: spacing.md,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
    inputMultiline: { minHeight: 80, textAlignVertical: 'top' },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: spacing.md,
      gap: 8,
      marginBottom: spacing.md,
    },
    btnText: { fontSize: 16, fontWeight: '600', color: '#fff' },
    hint: { fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  });
}

export default function DocumentFormScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const { documents, addDocument } = useApp();
  const docType = (['quote', 'invoice', 'receipt', 'tax_invoice', 'delivery_order'].includes(type || '') ? type : 'invoice') as DocumentType;
  const labels = DOC_LABELS[docType];
  const showDueDate = docType === 'invoice';

  const [customer, setCustomer] = useState('');
  const [items, setItems] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const nums = documents
    .filter((d: Document) => d.type === docType)
    .map((d: Document) => parseInt(d.no.replace(/\D/g, ''), 10))
    .filter((n: number) => !isNaN(n));
  const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  const prefix = DOC_PREFIX[docType];
  const docNo = `${prefix}-${String(nextNum).padStart(3, '0')}`;

  const handleSubmit = () => {
    const customerName = customer.trim() || 'ลูกค้า';
    const typeTitles: Record<DocumentType, string> = {
      quote: 'ใบเสนอราคา',
      invoice: 'ใบแจ้งหนี้',
      receipt: 'ใบเสร็จรับเงิน',
      tax_invoice: 'ใบกำกับภาษี',
      delivery_order: 'ใบวางบิล',
    };
    const title = `${typeTitles[docType]} - ${customerName}`;
    const value = amount ? Number(amount) : 0;
    if (value <= 0 || isNaN(value)) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกจำนวนเงิน');
      return;
    }
    addDocument({
      type: docType,
      title,
      amount: value,
      customer: customer.trim() || undefined,
      items: items.trim() || undefined,
      dueDate: showDueDate && dueDate.trim() ? dueDate.trim() : undefined,
    });
    Alert.alert('บันทึกสำเร็จ', labels.done, [{ text: 'ตกลง', onPress: () => router.back() }]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {labels.create}
        </Text>

        <Text style={styles.label}>เลขที่เอกสาร</Text>
        <TextInput
          style={styles.input}
          value={docNo}
          placeholderTextColor={colors.textSecondary}
          editable={false}
        />

        <Text style={styles.label}>ลูกค้า / ผู้รับ</Text>
        <TextInput
          style={styles.input}
          placeholder="ชื่อลูกค้าหรือบริษัท"
          placeholderTextColor={colors.textSecondary}
          value={customer}
          onChangeText={setCustomer}
        />

        <Text style={styles.label}>รายการ</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="รายการสินค้าหรือบริการ"
          placeholderTextColor={colors.textSecondary}
          value={items}
          onChangeText={setItems}
          multiline
        />

        <Text style={styles.label}>จำนวนเงิน (บาท)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        {showDueDate && (
          <>
            <Text style={styles.label}>วันครบกำหนด (ใบแจ้งหนี้)</Text>
            <TextInput
              style={styles.input}
              placeholder="วัน/เดือน/ปี"
              placeholderTextColor={colors.textSecondary}
              value={dueDate}
              onChangeText={setDueDate}
            />
          </>
        )}
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Ionicons name="document-text" size={22} color="#fff" />
        <Text style={styles.btnText}>
          {labels.submit}
        </Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        เอกสารจะถูกบันทึกบนคลาวด์ และสามารถส่งลิงก์หรือ PDF ให้ลูกค้าได้
      </Text>
    </ScrollView>
  );
}
