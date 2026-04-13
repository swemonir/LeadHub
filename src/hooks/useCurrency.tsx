import React, { useEffect, useState, createContext, useContext } from 'react';
export type Currency =
'BDT' |
'USD' |
'INR' |
'EUR' |
'GBP' |
'AED' |
'CAD' |
'AUD' |
'SGD' |
'JPY' |
'KRW' |
'BRL' |
'MXN' |
'ZAR' |
'THB' |
'MYR' |
'PHP' |
'IDR' |
'PKR' |
'TRY' |
'PLN' |
'CZK' |
'HUF' |
'RON' |
'SEK' |
'NOK' |
'DKK' |
'CHF' |
'NZD' |
'HKD' |
'TWD' |
'NGN' |
'EGP' |
'SAR' |
'QAR' |
'KWD' |
'BHD' |
'OMR' |
'JOD' |
'CLP' |
'COP' |
'PEN' |
'ARS' |
'VND' |
'KES';
export interface CurrencyConfig {
  symbol: string;
  price: string;
  originalPrice: string;
  flag: string;
  label: string;
  name: string;
  gateway: string;
  gatewayLabel: string;
}
export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  BDT: {
    symbol: '৳',
    price: '৳১,৪৯০',
    originalPrice: '৳৫,০০০',
    flag: '🇧🇩',
    label: 'BDT',
    name: 'Bangladeshi Taka',
    gateway: 'bKash',
    gatewayLabel: '(bKash Merchant)'
  },
  USD: {
    symbol: '$',
    price: '$24',
    originalPrice: '$99',
    flag: '🇺🇸',
    label: 'USD',
    name: 'US Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  INR: {
    symbol: '₹',
    price: '₹2,000',
    originalPrice: '₹8,299',
    flag: '🇮🇳',
    label: 'INR',
    name: 'Indian Rupee',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  EUR: {
    symbol: '€',
    price: '€22',
    originalPrice: '€89',
    flag: '🇪🇺',
    label: 'EUR',
    name: 'Euro',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  GBP: {
    symbol: '£',
    price: '£19',
    originalPrice: '£79',
    flag: '🇬🇧',
    label: 'GBP',
    name: 'British Pound',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  AED: {
    symbol: 'د.إ',
    price: 'AED 89',
    originalPrice: 'AED 365',
    flag: '🇦🇪',
    label: 'AED',
    name: 'UAE Dirham',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  CAD: {
    symbol: 'C$',
    price: 'C$33',
    originalPrice: 'C$135',
    flag: '🇨🇦',
    label: 'CAD',
    name: 'Canadian Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  AUD: {
    symbol: 'A$',
    price: 'A$37',
    originalPrice: 'A$149',
    flag: '🇦🇺',
    label: 'AUD',
    name: 'Australian Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  SGD: {
    symbol: 'S$',
    price: 'S$32',
    originalPrice: 'S$132',
    flag: '🇸🇬',
    label: 'SGD',
    name: 'Singapore Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  JPY: {
    symbol: '¥',
    price: '¥3,600',
    originalPrice: '¥14,900',
    flag: '🇯🇵',
    label: 'JPY',
    name: 'Japanese Yen',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  KRW: {
    symbol: '₩',
    price: '₩32,000',
    originalPrice: '₩132,000',
    flag: '🇰🇷',
    label: 'KRW',
    name: 'Korean Won',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  BRL: {
    symbol: 'R$',
    price: 'R$120',
    originalPrice: 'R$499',
    flag: '🇧🇷',
    label: 'BRL',
    name: 'Brazilian Real',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  MXN: {
    symbol: 'MX$',
    price: 'MX$410',
    originalPrice: 'MX$1,699',
    flag: '🇲🇽',
    label: 'MXN',
    name: 'Mexican Peso',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  ZAR: {
    symbol: 'R',
    price: 'R 440',
    originalPrice: 'R 1,799',
    flag: '🇿🇦',
    label: 'ZAR',
    name: 'South African Rand',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  THB: {
    symbol: '฿',
    price: '฿850',
    originalPrice: '฿3,499',
    flag: '🇹🇭',
    label: 'THB',
    name: 'Thai Baht',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  MYR: {
    symbol: 'RM',
    price: 'RM 110',
    originalPrice: 'RM 449',
    flag: '🇲🇾',
    label: 'MYR',
    name: 'Malaysian Ringgit',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  PHP: {
    symbol: '₱',
    price: '₱1,400',
    originalPrice: '₱5,599',
    flag: '🇵🇭',
    label: 'PHP',
    name: 'Philippine Peso',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  IDR: {
    symbol: 'Rp',
    price: 'Rp 380,000',
    originalPrice: 'Rp 1,550,000',
    flag: '🇮🇩',
    label: 'IDR',
    name: 'Indonesian Rupiah',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  PKR: {
    symbol: '₨',
    price: '₨6,700',
    originalPrice: '₨27,500',
    flag: '🇵🇰',
    label: 'PKR',
    name: 'Pakistani Rupee',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  TRY: {
    symbol: '₺',
    price: '₺780',
    originalPrice: '₺3,199',
    flag: '🇹🇷',
    label: 'TRY',
    name: 'Turkish Lira',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  PLN: {
    symbol: 'zł',
    price: 'zł 97',
    originalPrice: 'zł 399',
    flag: '🇵🇱',
    label: 'PLN',
    name: 'Polish Zloty',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  CZK: {
    symbol: 'Kč',
    price: 'Kč 560',
    originalPrice: 'Kč 2,299',
    flag: '🇨🇿',
    label: 'CZK',
    name: 'Czech Koruna',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  HUF: {
    symbol: 'Ft',
    price: 'Ft 8,900',
    originalPrice: 'Ft 36,500',
    flag: '🇭🇺',
    label: 'HUF',
    name: 'Hungarian Forint',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  RON: {
    symbol: 'lei',
    price: 'lei 112',
    originalPrice: 'lei 459',
    flag: '🇷🇴',
    label: 'RON',
    name: 'Romanian Leu',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  SEK: {
    symbol: 'kr',
    price: 'kr 255',
    originalPrice: 'kr 1,049',
    flag: '🇸🇪',
    label: 'SEK',
    name: 'Swedish Krona',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  NOK: {
    symbol: 'kr',
    price: 'kr 260',
    originalPrice: 'kr 1,069',
    flag: '🇳🇴',
    label: 'NOK',
    name: 'Norwegian Krone',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  DKK: {
    symbol: 'kr',
    price: 'kr 165',
    originalPrice: 'kr 679',
    flag: '🇩🇰',
    label: 'DKK',
    name: 'Danish Krone',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  CHF: {
    symbol: 'CHF',
    price: 'CHF 21',
    originalPrice: 'CHF 89',
    flag: '🇨🇭',
    label: 'CHF',
    name: 'Swiss Franc',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  NZD: {
    symbol: 'NZ$',
    price: 'NZ$40',
    originalPrice: 'NZ$165',
    flag: '🇳🇿',
    label: 'NZD',
    name: 'New Zealand Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  HKD: {
    symbol: 'HK$',
    price: 'HK$187',
    originalPrice: 'HK$769',
    flag: '🇭🇰',
    label: 'HKD',
    name: 'Hong Kong Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  TWD: {
    symbol: 'NT$',
    price: 'NT$770',
    originalPrice: 'NT$3,159',
    flag: '🇹🇼',
    label: 'TWD',
    name: 'Taiwan Dollar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  NGN: {
    symbol: '₦',
    price: '₦37,000',
    originalPrice: '₦152,000',
    flag: '🇳🇬',
    label: 'NGN',
    name: 'Nigerian Naira',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  EGP: {
    symbol: 'E£',
    price: 'E£ 1,180',
    originalPrice: 'E£ 4,849',
    flag: '🇪🇬',
    label: 'EGP',
    name: 'Egyptian Pound',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  SAR: {
    symbol: 'SR',
    price: 'SR 90',
    originalPrice: 'SR 369',
    flag: '🇸🇦',
    label: 'SAR',
    name: 'Saudi Riyal',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  QAR: {
    symbol: 'QR',
    price: 'QR 87',
    originalPrice: 'QR 359',
    flag: '🇶🇦',
    label: 'QAR',
    name: 'Qatari Riyal',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  KWD: {
    symbol: 'KD',
    price: 'KD 7.3',
    originalPrice: 'KD 30',
    flag: '🇰🇼',
    label: 'KWD',
    name: 'Kuwaiti Dinar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  BHD: {
    symbol: 'BD',
    price: 'BD 9',
    originalPrice: 'BD 37',
    flag: '🇧🇭',
    label: 'BHD',
    name: 'Bahraini Dinar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  OMR: {
    symbol: 'OMR',
    price: 'OMR 9.2',
    originalPrice: 'OMR 38',
    flag: '🇴🇲',
    label: 'OMR',
    name: 'Omani Rial',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  JOD: {
    symbol: 'JD',
    price: 'JD 17',
    originalPrice: 'JD 70',
    flag: '🇯🇴',
    label: 'JOD',
    name: 'Jordanian Dinar',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  CLP: {
    symbol: 'CL$',
    price: 'CL$22,500',
    originalPrice: 'CL$92,000',
    flag: '🇨🇱',
    label: 'CLP',
    name: 'Chilean Peso',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  COP: {
    symbol: 'COL$',
    price: 'COL$95,000',
    originalPrice: 'COL$390,000',
    flag: '🇨🇴',
    label: 'COP',
    name: 'Colombian Peso',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  PEN: {
    symbol: 'S/',
    price: 'S/ 90',
    originalPrice: 'S/ 369',
    flag: '🇵🇪',
    label: 'PEN',
    name: 'Peruvian Sol',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  ARS: {
    symbol: 'AR$',
    price: 'AR$21,000',
    originalPrice: 'AR$86,000',
    flag: '🇦🇷',
    label: 'ARS',
    name: 'Argentine Peso',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  VND: {
    symbol: '₫',
    price: '₫600,000',
    originalPrice: '₫2,460,000',
    flag: '🇻🇳',
    label: 'VND',
    name: 'Vietnamese Dong',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  },
  KES: {
    symbol: 'KSh',
    price: 'KSh 3,100',
    originalPrice: 'KSh 12,700',
    flag: '🇰🇪',
    label: 'KES',
    name: 'Kenyan Shilling',
    gateway: '2Checkout',
    gatewayLabel: '(2Checkout / Verifone)'
  }
};
export const FEATURED_CURRENCIES: Currency[] = ['BDT', 'USD'];
export const POPULAR_CURRENCIES: Currency[] = [
'INR',
'EUR',
'GBP',
'AED',
'CAD',
'AUD',
'SGD'];

export const ALL_CURRENCIES = Object.keys(CURRENCY_CONFIG) as Currency[];
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  hasSelected: boolean;
  setHasSelected: (v: boolean) => void;
  config: CurrencyConfig;
  isBDT: boolean;
}
const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);
export function CurrencyProvider({ children }: {children: React.ReactNode;}) {
  const [currency, setCurrencyState] = useState<Currency>('BDT');
  const [hasSelected, setHasSelected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('leadhub-currency') as Currency | null;
    if (stored && CURRENCY_CONFIG[stored]) {
      setCurrencyState(stored);
      setHasSelected(true);
    }
    setIsInitialized(true);
  }, []);
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('leadhub-currency', c);
  };
  if (!isInitialized) return null;
  const config = CURRENCY_CONFIG[currency];
  const isBDT = currency === 'BDT';
  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        hasSelected,
        setHasSelected,
        config,
        isBDT
      }}>
      
      {children}
    </CurrencyContext.Provider>);

}
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
// Country code → Currency mapping for Cloudflare detection
const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  BD: 'BDT',
  US: 'USD',
  IN: 'INR',
  GB: 'GBP',
  AE: 'AED',
  CA: 'CAD',
  AU: 'AUD',
  SG: 'SGD',
  JP: 'JPY',
  KR: 'KRW',
  BR: 'BRL',
  MX: 'MXN',
  ZA: 'ZAR',
  TH: 'THB',
  MY: 'MYR',
  PH: 'PHP',
  ID: 'IDR',
  PK: 'PKR',
  TR: 'TRY',
  PL: 'PLN',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  CH: 'CHF',
  NZ: 'NZD',
  HK: 'HKD',
  TW: 'TWD',
  NG: 'NGN',
  EG: 'EGP',
  SA: 'SAR',
  QA: 'QAR',
  KW: 'KWD',
  BH: 'BHD',
  OM: 'OMR',
  JO: 'JOD',
  CL: 'CLP',
  CO: 'COP',
  PE: 'PEN',
  AR: 'ARS',
  VN: 'VND',
  KE: 'KES',
  // EUR zone
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  IE: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  SK: 'EUR',
  SI: 'EUR',
  LT: 'EUR',
  LV: 'EUR',
  EE: 'EUR',
  LU: 'EUR',
  MT: 'EUR',
  CY: 'EUR',
  HR: 'EUR'
};
/**
 * Shared IP-based currency detection with session caching.
 * Uses Cloudflare (no rate limits) as primary, with API fallbacks.
 * Returns detected currency code or null if all methods fail.
 */
export async function detectCurrencyByIP(): Promise<Currency | null> {
  // 1. Check session cache first
  const cached = sessionStorage.getItem('leadhub-ip-currency');
  if (cached && ALL_CURRENCIES.includes(cached as Currency)) {
    return cached as Currency;
  }
  let currencyCode: string | null = null;
  // 2. Primary: Cloudflare (zero rate limits, always available)
  try {
    const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    if (res.ok) {
      const text = await res.text();
      const locMatch = text.match(/loc=(\w+)/);
      if (locMatch) {
        const country = locMatch[1];
        const mapped = COUNTRY_TO_CURRENCY[country];
        if (mapped) currencyCode = mapped;
      }
    }
  } catch {}
  // 3. Fallback: ipapi.co
  if (!currencyCode) {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data.currency) currencyCode = data.currency;
      }
    } catch {}
  }
  // 4. Fallback: ipwho.is
  if (!currencyCode) {
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data.currency?.code) currencyCode = data.currency.code;
      }
    } catch {}
  }
  // Cache successful result for this session
  if (currencyCode && ALL_CURRENCIES.includes(currencyCode as Currency)) {
    sessionStorage.setItem('leadhub-ip-currency', currencyCode);
    return currencyCode as Currency;
  }
  return null;
}