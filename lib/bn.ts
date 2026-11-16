const BN = "০১২৩৪৫৬৭৮৯";
/** Bengali digits -> western digits so numbers can be parsed/sorted correctly */
export const toEn = (s: string) => s.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))).replace(/[,،]/g, "");
export const bn = (n: number, frac = 0) =>
  n.toLocaleString("bn-BD", { minimumFractionDigits: frac, maximumFractionDigits: frac });
export const bnDate = (d = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(d);
