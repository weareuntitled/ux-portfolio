import { FFP } from "./types";

export const mockFFPs: FFP[] = [
  {
    id: "FFP-003",
    name: "Rear view camera screen remains black",
    status: "Electrical",
    count: 4857,
    percentChange: 12.5,
    value: "2354 €",
    vstCode: "VST-004",
    description: "Rear view camera screen remains black during operation",
    kpmId: "000123",
    tpiId: "000245",
    pccId: "D000123.000231",
    lastUpdate: "05.04.23",
    opened: "02.05.22",
    generalInfo: {
      versionId: "1.0",
      type: "Failure",
      creator: "Koehler, Ulrich (COX-QI/2)",
      created: "26.11.2021",
      edited: "26.11.2021",
      editor: "System",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    },
    comments: [
      {
        id: "1",
        author: "Laura Schreier",
        timestamp: "15.07 um 24.07.2023",
        text: "@DP Due to ...I assume the problem affects the gear shift",
        avatar: "👤",
      },
      {
        id: "2",
        author: "Peter Mannheimer",
        timestamp: "14.07 um 24.07.2023",
        text: "@AB Can you have a look at Attachment1",
        avatar: "👤",
      },
      {
        id: "3",
        author: "Daniel Peters",
        timestamp: "13.07 um 24.07.2023",
        text: "Oh this seems to be similar to FFP123",
        avatar: "👤",
      },
      {
        id: "4",
        author: "Daniel Peters",
        timestamp: "13.07 um 24.07.2023",
        text: "Note: Example ipsum dolor sit amet",
        avatar: "👤",
      },
    ],
    attachments: [
      { id: "1", type: "image", name: "Attachment 1" },
      { id: "2", type: "video", name: "Attachment 2" },
      { id: "3", type: "image", name: "Attachment 3" },
    ],
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [
              { key: "GemIon_Familie", value: "SO301" },
              { key: "HW", value: "AND" },
              { key: "ZFS-Date", value: "01.08.2020" },
              { key: "AND", value: "Factory (Seeznn)" },
              { key: "Factory", value: "14.WOB" },
            ],
          },
        ],
      },
      {
        title: "Vehicles & technology",
        content: [
          {
            name: "Diagnosis failure memory",
            attributes: [
              { key: "DFCC", value: "10887" },
              { key: "AND", value: "DFCC" },
              { key: "DFCC", value: "10787" },
              { key: "AND", value: "DFCC" },
              { key: "DFCC", value: "10887" },
            ],
          },
        ],
      },
      {
        title: "Usage & conditions",
        content: [
          {
            name: "Diagnosis",
            attributes: [
              { key: "Clutch_temperature_maximum", value: "400 Degrees" },
            ],
          },
        ],
      },
      {
        title: "Cause",
        content: [
          {
            name: "ARES",
            attributes: [
              { key: "Failure cause", value: "Multiple coupling K1 burned" },
            ],
          },
          {
            name: "ARES",
            attributes: [
              { key: "ARES-ID", value: "3080 0000 0037 0078 0000" },
            ],
          },
        ],
      },
      {
        title: "Actions",
        content: [
          {
            name: "ARES",
            attributes: [
              { key: "Actions-Text", value: "Lorem ipsum" },
              { key: "Actions-№", value: "12345" },
              { key: "Actions-Deployment date", value: "05.02.2021" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "FFP-002",
    name: "Engine warning light illuminates",
    status: "Gearbox",
    count: 3012,
    percentChange: 10.3,
    value: "123 €",
    vstCode: "CDE-051",
    description: "Engine warning light stays illuminated",
    kpmId: "000234",
    tpiId: "000456",
    pccId: "D000234.000456",
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [{ key: "Model", value: "XYZ" }],
          },
        ],
      },
    ],
  },
  {
    id: "FFP-001",
    name: "Brake pedal feels soft",
    status: "HV",
    count: 1212,
    percentChange: 14,
    value: "121.77 €",
    vstCode: "VST-006",
    description: "Brake pedal has reduced responsiveness",
    kpmId: "000345",
    tpiId: "000567",
    pccId: "D000345.000567",
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [{ key: "Type", value: "Brake System" }],
          },
        ],
      },
    ],
  },
  {
    id: "FFP-004",
    name: "Transmission shift delay",
    status: "Mechanical",
    count: 333,
    percentChange: 0,
    value: "321.50 €",
    vstCode: "VST-124",
    description: "Automatic transmission has delayed shift response",
    kpmId: "000456",
    tpiId: "000678",
    pccId: "D000456.000678",
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [{ key: "Component", value: "Transmission" }],
          },
        ],
      },
    ],
  },
  {
    id: "FFP-005",
    name: "Steering wheel vibration",
    status: "Customer Satisfaction",
    count: 1243,
    percentChange: 23.7,
    value: "1212 €",
    vstCode: "VST-112",
    description: "Steering wheel vibrates at highway speeds",
    kpmId: "000567",
    tpiId: "000789",
    pccId: "D000567.000789",
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [{ key: "Component", value: "Steering" }],
          },
        ],
      },
    ],
  },
  {
    id: "FFP-006",
    name: "Sunroof malfunction",
    status: "Factory",
    count: 234,
    percentChange: 34.8,
    value: "3121 €",
    vstCode: "VST-327",
    description: "Sunroof fails to open or close properly",
    kpmId: "000678",
    tpiId: "000890",
    pccId: "D000678.000890",
    sections: [
      {
        title: "Failure characteristic",
        content: [
          {
            name: "Vehicle",
            attributes: [{ key: "Component", value: "Roof" }],
          },
        ],
      },
    ],
  },
];

export const statusColors: Record<string, string> = {
  Electrical:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Gearbox: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  Factory: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  HV: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Mechanical:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  "Customer Satisfaction":
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};
