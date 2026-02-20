import { Star, Fingerprint, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentItem {
  id: string;
  type: "ffp" | "diss";
  name: string;
  starred: boolean;
  editedBy: string;
  lastEdited: string;
}

const recentItems: RecentItem[] = [
  {
    id: "1",
    type: "ffp",
    name: "FFP 23",
    starred: true,
    editedBy: "Martin Landberger",
    lastEdited: "Gestern 16:30 Uhr",
  },
  {
    id: "2",
    type: "ffp",
    name: "FFP 2",
    starred: true,
    editedBy: "Martin Landberger",
    lastEdited: "Gestern 16:30 Uhr",
  },
  {
    id: "3",
    type: "ffp",
    name: "FFP 4",
    starred: true,
    editedBy: "Martin Landberger",
    lastEdited: "Gestern 16:30 Uhr",
  },
  {
    id: "4",
    type: "diss",
    name: "DISS 2324321 /Lorem Ipsum",
    starred: false,
    editedBy: "Daten Lorem Ipsum dolor sit amet consecutur",
    lastEdited: "Gestern 16:30 Uhr",
  },
];

function TypeIcon({ type }: { type: "ffp" | "diss" }) {
  if (type === "ffp") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded bg-primary">
        <Fingerprint className="h-3 w-3 text-primary-foreground" />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded bg-primary">
      <Shield className="h-3 w-3 text-primary-foreground" />
    </span>
  );
}

export function RecentItemsTable() {
  return (
    <section aria-labelledby="recent-heading">
      <h2
        id="recent-heading"
        className="mb-4 text-lg font-bold text-foreground md:text-xl"
      >
        Zuletzt bearbeitet / Favorisiert
      </h2>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-[40%] py-2 text-xs font-semibold text-foreground">Name</TableHead>
              <TableHead className="py-2 text-xs font-semibold text-foreground">Bearbeitet von</TableHead>
              <TableHead className="py-2 text-right text-xs font-semibold text-foreground">Zuletzt bearbeitet</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentItems.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer border-b border-border transition-colors hover:bg-secondary"
              >
                <TableCell className="py-1.5">
                  <div className="flex items-center gap-2">
                    <TypeIcon type={item.type} />
                    {item.starred && (
                      <Star className="h-4 w-4 shrink-0 fill-accent text-accent" />
                    )}
                    <span className="text-xs font-medium text-foreground">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-1.5 text-xs text-muted-foreground">{item.editedBy}</TableCell>
                <TableCell className="py-1.5 text-right text-xs font-medium text-foreground">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
