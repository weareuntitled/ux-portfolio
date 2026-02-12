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
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <Fingerprint className="h-4 w-4 text-primary-foreground" />
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
      <Shield className="h-4 w-4 text-primary-foreground" />
    </span>
  );
}

export function RecentItemsTable() {
  return (
    <section aria-labelledby="recent-heading">
      <h2
        id="recent-heading"
        className="mb-6 text-2xl font-bold text-foreground md:text-3xl"
      >
        Zuletzt bearbeitet / Favorisiert
      </h2>

      <div className="overflow-x-auto rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="w-[40%] text-sm font-semibold text-foreground">
                Name
              </TableHead>
              <TableHead className="text-sm font-semibold text-foreground">
                Bearbeitet von
              </TableHead>
              <TableHead className="text-right text-sm font-semibold text-foreground">
                Zuletzt bearbeitet:
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentItems.map((item) => (
              <TableRow
                key={item.id}
                className="cursor-pointer border-b border-border transition-colors hover:bg-secondary"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <TypeIcon type={item.type} />
                    {item.starred && (
                      <Star className="h-5 w-5 shrink-0 fill-accent text-accent" />
                    )}
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.editedBy}
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {item.lastEdited}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
