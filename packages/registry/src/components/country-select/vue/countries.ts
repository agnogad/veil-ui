export interface Country {
  code: string;
  name: string;
  dial: string;
}

export const countries: Country[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "GH", name: "Ghana", dial: "+233" },
  { code: "MA", name: "Morocco", dial: "+212" },
];

export function flagEmoji(code: string) {
  return code.replace(/./g, (char) =>
    String.fromCodePoint(127397 + char.charCodeAt(0)),
  );
}
