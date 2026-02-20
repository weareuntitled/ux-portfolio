export interface Comment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  type: "image" | "video" | "document";
  name: string;
}

export interface FailureCharacteristic {
  name: string;
  attributes: Array<{
    key: string;
    value: string;
  }>;
}

export interface ExpandableSection {
  title: string;
  icon?: string;
  content: FailureCharacteristic[];
}

export interface FFP {
  id: string;
  name: string;
  status:
    | "Electrical"
    | "Gearbox"
    | "Factory"
    | "HV"
    | "Mechanical"
    | "Customer Satisfaction";
  count: number;
  percentChange: number;
  value: string;
  vstCode?: string;
  description: string;
  kpmId?: string;
  tpiId?: string;
  pccId?: string;
  lastUpdate?: string;
  opened?: string;
  comments?: Comment[];
  attachments?: Attachment[];
  generalInfo?: {
    versionId: string;
    type: string;
    creator: string;
    created: string;
    edited: string;
    editor: string;
    description: string;
  };
  sections?: ExpandableSection[];
}
