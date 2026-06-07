export type FacilityType = 'Hospital' | 'Extended Health Center' | 'Health Center';

export interface Facility {
  wilayat: string;
  name: string;
  nameAr: string;
  type: FacilityType;
  lat: number;
  lng: number;
}

export interface WilayatRegion {
  id: string;
  name: string;
  path: string;
  center: [number, number]; // [x, y] on SVG
}

export interface MetricPlaceholder {
  population: number;
  staffCount: number;
  utilizationPercent: number;
  maintenanceStatus: 'Good' | 'Needs Review' | 'Critical';
  serviceCoveragePercent: number;
}
