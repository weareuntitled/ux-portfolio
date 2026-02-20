import type { ActivityFFP, Mentioning, DISSRecommendation } from "./types";

export const activityFFPs: ActivityFFP[] = [
  {
    id: "FFP-055",
    name: "Name of FFP might be quite long",
    diagnoseData: {
      dtc: "XXXXXXXXX",
      dfcc: "XXXXXXXXXX",
      projectNumber: "XXXXXXXXX",
      modelYear: "XXXXXXXX",
    },
    cw12AffectedVehicles: 20,
    cw13AffectedVehicles: 22,
    deltaAffectedVehicles: 2,
    trend: "up",
  },
  {
    id: "FFP-007",
    name: "Name of FFP might be quite long",
    diagnoseData: {
      dtc: "XXXXXXXXX",
      dfcc: "XXXXXXXXXX",
      projectNumber: "XXXXXXXXX",
      modelYear: "XXXXXXXX",
    },
    cw12AffectedVehicles: 20,
    cw13AffectedVehicles: 20,
    deltaAffectedVehicles: 0,
    trend: "stable",
  },
  {
    id: "FFP-321",
    name: "Name of FFP might be quite long",
    diagnoseData: {
      dtc: "XXXXXXXXX",
      dfcc: "XXXXXXXXXX",
      projectNumber: "XXXXXXXXX",
      modelYear: "XXXXXXXX",
    },
    cw12AffectedVehicles: 20,
    cw13AffectedVehicles: 18,
    deltaAffectedVehicles: -2,
    trend: "down",
  },
  {
    id: "FFP-322",
    name: "Name of FFP might be quite long",
    diagnoseData: {
      dtc: "XXXXXXXXX",
      dfcc: "XXXXXXXXXX",
      projectNumber: "XXXXXXXXX",
      modelYear: "XXXXXXXX",
    },
    cw12AffectedVehicles: 20,
    cw13AffectedVehicles: 18,
    deltaAffectedVehicles: -2,
    trend: "down",
  },
];

export const diagnoseMentionings: Mentioning[] = [
  {
    id: "1",
    user: "Anh Ngyuen",
    avatar: "",
    message: "@User can u please check if this Clustering fits? Thank you!",
    timestamp: "1 day ago",
    mentions: ["@User"],
  },
  {
    id: "2",
    user: "Alexander Riederhofer",
    avatar: "",
    message: "@User @User2 Updated",
    timestamp: "1 day ago",
    mentions: ["@User", "@User2"],
  },
  {
    id: "3",
    user: "Alexander Riederhofer",
    avatar: "",
    message: "@User @User2 Updated",
    timestamp: "1 day ago",
    mentions: ["@User", "@User2"],
  },
];

export const dissRecommendations: DISSRecommendation[] = [
  {
    id: "1",
    tags: [
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
    ],
    dissAffected: 16,
    modelYear: 2014,
    country: "UK",
  },
  {
    id: "2",
    tags: [
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
    ],
    dissAffected: 12,
    modelYear: 2014,
    country: "DEU",
  },
  {
    id: "3",
    tags: [
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
      "Tag bei maximal 30-35 Zeichen lang",
    ],
    dissAffected: 11,
    modelYear: 2014,
    country: "CHI",
  },
];
