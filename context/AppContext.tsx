import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { apiGet, apiPost, healthCheck } from '@/constants/api';

export type TransactionType = 'income' | 'expense';
export type DocumentType = 'quote' | 'invoice' | 'receipt' | 'tax_invoice' | 'delivery_order';

export interface Transaction {
  id: string;
  label: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface Document {
  id: string;
  no: string;
  type: DocumentType;
  title: string;
  date: string;
  amount: number;
  customer?: string;
  items?: string;
  dueDate?: string;
}

export interface Accountant {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  transactions: Transaction[];
  documents: Document[];
  accountants: Accountant[];
}

interface AppContextValue extends AppState {
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  addDocument: (doc: Omit<Document, 'id' | 'no' | 'date'> & { customer?: string; items?: string; dueDate?: string }) => void;
  addAccountant: (acc: Omit<Accountant, 'id'>) => void;
  useBackend: boolean;
  loading: boolean;
}

const defaultState: AppState = {
  transactions: [
    { id: '1', label: 'รับเงินจาก ลูกค้า A', amount: 15000, type: 'income', date: '5 มี.ค. 2568' },
    { id: '2', label: 'ค่าส่งของ - Kerry', amount: 120, type: 'expense', date: '4 มี.ค. 2568' },
    { id: '3', label: 'ใบเสนอราคา #Q-001', amount: 25000, type: 'income', date: '3 มี.ค. 2568' },
    { id: '4', label: 'ค่าเช่าห้อง - มี.ค.', amount: 8000, type: 'expense', date: '1 มี.ค. 2568' },
    { id: '5', label: 'ขายสินค้าออนไลน์', amount: 8500, type: 'income', date: '28 ก.พ. 2568' },
  ],
  documents: [
    { id: '1', no: 'Q-001', type: 'quote', title: 'ใบเสนอราคา - บริษัท ABC', date: '5 มี.ค. 2568', amount: 25000, customer: 'บริษัท ABC จำกัด', items: 'บริการที่ปรึกษา 1 โปรเจกต์' },
    { id: '2', no: 'INV-002', type: 'invoice', title: 'ใบแจ้งหนี้ - ร้าน XYZ', date: '4 มี.ค. 2568', amount: 15000, customer: 'ร้าน XYZ', items: 'สินค้าตามรายการ' },
    { id: '3', no: 'REC-001', type: 'receipt', title: 'ใบเสร็จรับเงิน - ลูกค้า A', date: '5 มี.ค. 2568', amount: 15000, customer: 'ลูกค้า A' },
    { id: '4', no: 'TAX-001', type: 'tax_invoice', title: 'ใบกำกับภาษี - ร้าน XYZ', date: '4 มี.ค. 2568', amount: 10700, customer: 'ร้าน XYZ' },
    { id: '5', no: 'DO-001', type: 'delivery_order', title: 'ใบวางบิล - ร้าน ABC', date: '5 มี.ค. 2568', amount: 8500, customer: 'ร้าน ABC', items: 'สินค้าส่งมอบตามรายการ' },
  ],
  accountants: [],
};

function formatDate() {
  const d = new Date();
  const y = d.getFullYear() + 543;
  const m = d.toLocaleDateString('th-TH', { month: 'short' });
  const day = d.getDate();
  return `${day} ${m} ${y}`;
}

const DOC_PREFIX: Record<DocumentType, string> = {
  quote: 'Q',
  invoice: 'INV',
  receipt: 'REC',
  tax_invoice: 'TAX',
  delivery_order: 'DO',
};

function nextDocNo(existing: Document[], type: DocumentType): string {
  const prefix = DOC_PREFIX[type];
  const nums = existing
    .filter((d) => d.type === type)
    .map((d) => parseInt(d.no.replace(/\D/g, ''), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
  return `${prefix}-${String(next).padStart(3, '0')}`;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [useBackend, setUseBackend] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    healthCheck().then((ok) => {
      if (cancelled || !ok) {
        setLoading(false);
        return;
      }
      setUseBackend(true);
      Promise.all([
        apiGet<Transaction[]>('/api/transactions'),
        apiGet<Document[]>('/api/documents'),
        apiGet<Accountant[]>('/api/accountants'),
      ])
        .then(([transactions, documents, accountants]) => {
          if (!cancelled) {
            setState((prev: AppState) => ({
              ...prev,
              transactions: transactions?.length ? transactions : prev.transactions,
              documents: documents?.length ? documents : prev.documents,
              accountants: accountants ?? prev.accountants,
            }));
          }
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });
    return () => { cancelled = true; };
  }, []);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'date'>) => {
    if (useBackend) {
      apiPost<Transaction>('/api/transactions', tx)
        .then((created) => setState((prev: AppState) => ({ ...prev, transactions: [created, ...prev.transactions] })))
        .catch(() => {
          const date = formatDate();
          setState((prev: AppState) => ({ ...prev, transactions: [{ ...tx, id: String(Date.now()), date }, ...prev.transactions] }));
        });
    } else {
      const date = formatDate();
      setState((prev: AppState) => ({ ...prev, transactions: [{ ...tx, id: String(Date.now()), date }, ...prev.transactions] }));
    }
  }, [useBackend]);

  const addDocument = useCallback((doc: Omit<Document, 'id' | 'no' | 'date'> & { customer?: string; items?: string; dueDate?: string }) => {
    if (useBackend) {
      apiPost<Document>('/api/documents', { ...doc, dueDate: doc.dueDate }).then((created) =>
        setState((prev: AppState) => ({ ...prev, documents: [created, ...prev.documents] }))
      ).catch(() => {
        const date = formatDate();
        setState((prev: AppState) => {
          const no = nextDocNo(prev.documents, doc.type);
          return { ...prev, documents: [{ ...doc, id: String(Date.now()), no, date }, ...prev.documents] };
        });
      });
    } else {
      const date = formatDate();
      setState((prev: AppState) => {
        const no = nextDocNo(prev.documents, doc.type);
        return { ...prev, documents: [{ ...doc, id: String(Date.now()), no, date }, ...prev.documents] };
      });
    }
  }, [useBackend]);

  const addAccountant = useCallback((acc: Omit<Accountant, 'id'>) => {
    if (useBackend) {
      apiPost<Accountant>('/api/accountants', acc)
        .then((created) => setState((prev: AppState) => ({ ...prev, accountants: [created, ...prev.accountants] })))
        .catch(() => setState((prev: AppState) => ({ ...prev, accountants: [{ ...acc, id: String(Date.now()) }, ...prev.accountants] })));
    } else {
      setState((prev: AppState) => ({ ...prev, accountants: [...prev.accountants, { ...acc, id: String(Date.now()) }] }));
    }
  }, [useBackend]);

  const value: AppContextValue = {
    ...state,
    addTransaction,
    addDocument,
    addAccountant,
    useBackend,
    loading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
