import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Mention {
  id: string;
  userName: string;
  avatarFallback: string;
  avatarSrc?: string;
  timeAgo: string;
  reference: string;
  codes: string;
  message: string;
}

const mentions: Mention[] = [
  {
    id: "1",
    userName: "Anh Nguyen",
    avatarFallback: "AN",
    avatarSrc: "https://i.pravatar.cc/40?img=5",
    timeAgo: "1 day ago",
    reference: "FFP-001",
    codes: "XXXXXX  XXXXX",
    message: "@User can u please check if this Clustering fits? Thank you!",
  },
  {
    id: "2",
    userName: "Alexander Riederhofer",
    avatarFallback: "AR",
    timeAgo: "1 day ago",
    reference: "FFP-001",
    codes: "XXXXXX  XXXXX",
    message: "@User @User2 Updated",
  },
  {
    id: "3",
    userName: "Alexander Riederhofer",
    avatarFallback: "AR",
    timeAgo: "1 day ago",
    reference: "FFP-001",
    codes: "XXXXXX  XXXXX",
    message: "@User @User2 Updated",
  },
  {
    id: "4",
    userName: "Alexander Riederhofer",
    avatarFallback: "AR",
    timeAgo: "1 day ago",
    reference: "FFP-001",
    codes: "XXXXXX  XXXXX",
    message: "@User @User2 Updated",
  },
];

export function MentioningsPanel() {
  return (
    <aside className="flex w-72 shrink-0 flex-col rounded-lg border border-border bg-background p-5">
      <h3 className="mb-4 text-lg font-bold text-foreground">Mentionings</h3>
      <div className="flex flex-col gap-5 overflow-y-auto">
        {mentions.map((mention) => (
          <div key={mention.id} className="flex gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              {mention.avatarSrc && (
                <AvatarImage src={mention.avatarSrc || "/placeholder.svg"} alt={mention.userName} />
              )}
              <AvatarFallback className="bg-primary text-[10px] text-primary-foreground">
                {mention.avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{mention.userName}</span>{" "}
                <span className="text-muted-foreground">mentioned</span>{" "}
                <span className="font-semibold">you</span>{" "}
                <span className="text-muted-foreground">{mention.timeAgo}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {mention.reference}{"    "}{mention.codes}
              </p>
              <div className="mt-1.5 rounded-md border border-border bg-muted/50 px-3 py-2">
                <p className="text-xs leading-relaxed text-foreground">
                  {mention.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
