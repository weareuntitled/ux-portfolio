export interface DiagnoseData {
  dtc: string;
  dfcc: string;
  projectNumber: string;
  modelYear: string;
}

export interface ActivityFFP {
  id: string;
  name: string;
  diagnoseData: DiagnoseData;
  cw12AffectedVehicles: number;
  cw13AffectedVehicles: number;
  deltaAffectedVehicles: number;
  trend: "up" | "down" | "stable";
}

export interface Mentioning {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  mentions: string[];
}

export interface DISSRecommendation {
  id: string;
  tags: string[];
  dissAffected: number;
  modelYear: number;
  country: string;
}
