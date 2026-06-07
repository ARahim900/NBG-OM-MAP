import { Facility, WilayatRegion } from './types';

export const facilitiesList: Facility[] = [
  // SOHAR
  { name: "Sohar Hospital", nameAr: "مستشفى صحار", type: "Hospital", wilayat: "Sohar", lat: 24.3473, lng: 56.7459 },
  { name: "Sohar Extended Health Center", nameAr: "مركز صحار الصحي الممتد", type: "Extended Health Center", wilayat: "Sohar", lat: 24.3512, lng: 56.7321 },
  { name: "Al Multaqa Health Center", nameAr: "مركز الملتقى الصحي", type: "Health Center", wilayat: "Sohar", lat: 24.3680, lng: 56.7200 },
  { name: "Al Uwaynat Health Center", nameAr: "مركز العوينات الصحي", type: "Health Center", wilayat: "Sohar", lat: 24.3900, lng: 56.7100 },
  { name: "Falaj Al Qabail Health Center", nameAr: "مركز فلج القبائل الصحي", type: "Health Center", wilayat: "Sohar", lat: 24.3300, lng: 56.7600 },
  { name: "Wadi Ahin Health Center", nameAr: "مركز وادي أهين الصحي", type: "Health Center", wilayat: "Sohar", lat: 24.3100, lng: 56.6900 },
  { name: "Al Turaif Health Center", nameAr: "مركز الطريف الصحي", type: "Health Center", wilayat: "Sohar", lat: 24.4100, lng: 56.7800 },
  
  // SAHAM
  { name: "Saham Hospital", nameAr: "مستشفى صحم", type: "Hospital", wilayat: "Saham", lat: 24.1720, lng: 56.8870 },
  { name: "Saham Extended Health Center", nameAr: "مركز صحم الصحي الممتد", type: "Extended Health Center", wilayat: "Saham", lat: 24.1680, lng: 56.8950 },
  { name: "Wadi Bani Omar Health Center", nameAr: "مركز وادي بني عمر الصحي", type: "Health Center", wilayat: "Saham", lat: 24.1500, lng: 56.8600 },
  { name: "Hafit Health Center", nameAr: "مركز هفيت الصحي", type: "Health Center", wilayat: "Saham", lat: 24.1300, lng: 56.9100 },
  { name: "Al Ghuwaisah Health Center", nameAr: "مركز الغويصة الصحي", type: "Health Center", wilayat: "Saham", lat: 24.1900, lng: 56.9300 },
  
  // AL KHABURAH
  { name: "Wadi Al Hawasinah Hospital", nameAr: "مستشفى وادي الحواسنة", type: "Hospital", wilayat: "Al Khaburah", lat: 23.9810, lng: 57.0870 },
  { name: "Al Khaburah Extended Health Center", nameAr: "مركز الخابورة الصحي الممتد", type: "Extended Health Center", wilayat: "Al Khaburah", lat: 23.9760, lng: 57.0920 },
  { name: "Wadi Shafan Health Center", nameAr: "مركز وادي شفن الصحي", type: "Health Center", wilayat: "Al Khaburah", lat: 23.9500, lng: 57.0600 },
  { name: "Qasabiya Health Center", nameAr: "مركز القصبية الصحي", type: "Health Center", wilayat: "Al Khaburah", lat: 24.0100, lng: 57.1100 },
  
  // AL SUWAYQ
  { name: "Al Suwayq Extended Health Center", nameAr: "مركز السويق الصحي الممتد", type: "Extended Health Center", wilayat: "Al Suwayq", lat: 23.8480, lng: 57.4380 },
  { name: "Mishayiq Health Center", nameAr: "مركز مشايق الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8300, lng: 57.4100 },
  { name: "Wadi Al Jahawir Health Center", nameAr: "مركز وادي الجواهر الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8100, lng: 57.3800 },
  { name: "Al Bidayah Health Center", nameAr: "مركز البداية الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8700, lng: 57.4600 },
  { name: "Al Khadra Health Center", nameAr: "مركز الخضراء الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8600, lng: 57.3600 },
  { name: "Al Shureesa Health Center", nameAr: "مركز الشريصة الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8900, lng: 57.4900 },
  { name: "Al Tharmed Health Center", nameAr: "مركز الثرمد الصحي", type: "Health Center", wilayat: "Al Suwayq", lat: 23.8200, lng: 57.5100 },
  
  // LIWA
  { name: "Liwa Health Center", nameAr: "مركز لوى الصحي", type: "Health Center", wilayat: "Liwa", lat: 24.5090, lng: 56.5280 },
  { name: "Nabr Health Center", nameAr: "مركز نبر الصحي", type: "Health Center", wilayat: "Liwa", lat: 24.5300, lng: 56.5100 },
  { name: "Rahb Health Center", nameAr: "مركز رحب الصحي", type: "Health Center", wilayat: "Liwa", lat: 24.4900, lng: 56.5500 },
  
  // SHINAS
  { name: "Shinas Extended Health Center", nameAr: "مركز شناص الصحي الممتد", type: "Extended Health Center", wilayat: "Shinas", lat: 24.7460, lng: 56.4610 },
  { name: "Abu Baqrah Health Center", nameAr: "مركز أبو بقرة الصحي", type: "Health Center", wilayat: "Shinas", lat: 24.7700, lng: 56.4400 }
];

export const wilayatsList = ["Sohar", "Saham", "Al Khaburah", "Al Suwayq", "Liwa", "Shinas"];

export const colorPalette = {
  // Hospital - teal/emerald range
  hospital: 'bg-emerald-600',
  hospitalText: 'text-emerald-700 dark:text-emerald-400',
  hospitalDot: 'fill-emerald-500',
  // Extended Health Center - blue range
  extended: 'bg-blue-600',
  extendedText: 'text-blue-700 dark:text-blue-400',
  extendedDot: 'fill-blue-500',
  // Health Center - amber/teal range
  healthCenter: 'bg-teal-500',
  healthCenterText: 'text-teal-700 dark:text-teal-400',
  healthCenterDot: 'fill-teal-400',
  
  // Map highlights
  mapSelected: 'fill-emerald-600/80 stroke-emerald-800 dark:fill-emerald-500/80 dark:stroke-emerald-300',
  mapHover: 'fill-emerald-500/50 stroke-emerald-600 dark:fill-emerald-400/50 dark:stroke-emerald-300',
  mapDefault: 'fill-slate-200 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-600',
  mapDimmed: 'fill-slate-100/50 stroke-slate-300 dark:fill-slate-800/50 dark:stroke-slate-700'
};
