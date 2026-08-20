import { createContext, useContext, type ReactNode } from "react";
import type { InvitationData } from "@/lib/invitation-data";

const InvitationContext = createContext<InvitationData | null>(null);

export function InvitationProvider({
  value,
  children,
}: {
  value: InvitationData;
  children: ReactNode;
}) {
  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}

/** Every section reads its content from here — one design, many clients. */
export function useInvitation(): InvitationData {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error("useInvitation must be used inside InvitationProvider");
  return ctx;
}
