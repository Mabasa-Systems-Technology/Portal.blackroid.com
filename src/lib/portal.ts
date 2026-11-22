export type InternalRole = "platform_admin" | "operations_manager" | "specialist" | "reviewer";
export type ClientRole = "client_admin" | "client_member";

export type EngagementStatus = "Active" | "Under review" | "Awaiting approval" | "Blocked";

export const portalNavigation = [
  { label: "Overview", href: "/portal" },
  { label: "My services", href: "/portal/services" },
  { label: "Requests", href: "/portal/requests" },
  { label: "Documents", href: "/portal/documents" },
  { label: "Billing", href: "/portal/billing" },
] as const;

export const adminNavigation = [
  { label: "Today", href: "/admin" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Engagements", href: "/admin/engagements" },
  { label: "Work queue", href: "/admin/work" },
  { label: "Documents", href: "/admin/documents" },
] as const;

export const portalEngagements = [
  {
    id: "eng-claims",
    name: "Claims verification operations",
    category: "Insurance operations",
    status: "Active" as const,
    progress: 68,
    contact: "Thandi Mokoena",
    next: "Weekly exception report due 28 Nov 2026",
    scope: "Verification of submitted claims, exception triage and a reviewed weekly report.",
  },
  {
    id: "eng-recovery",
    name: "Payment recovery support",
    category: "Healthcare operations",
    status: "Under review" as const,
    progress: 42,
    contact: "Daniel Naidoo",
    next: "Awaiting two supporting schedules",
    scope: "Reconciliation support and recovery opportunity reporting for approved claim batches.",
  },
];

export const adminClients = [
  { name: "Mosaic Insurance Group", sector: "Insurance", status: "Active", engagement: "Claims verification operations", owner: "Thandi Mokoena", attention: "2 requests" },
  { name: "MedSure Administrators", sector: "Healthcare", status: "Active", engagement: "Payment recovery support", owner: "Daniel Naidoo", attention: "Review due" },
  { name: "Northstar Capital", sector: "Finance", status: "Onboarding", engagement: "Fund operations discovery", owner: "Lerato Dlamini", attention: "Awaiting approval" },
];

export const adminWork = [
  { title: "Review exception report", client: "Mosaic Insurance Group", type: "Deliverable", owner: "Thandi Mokoena", due: "Today", tone: "urgent" },
  { title: "Request missing claim schedules", client: "MedSure Administrators", type: "Information request", owner: "Daniel Naidoo", due: "Tomorrow", tone: "normal" },
  { title: "Quality review: batch 014", client: "Mosaic Insurance Group", type: "Quality review", owner: "Lerato Dlamini", due: "28 Nov", tone: "normal" },
  { title: "Confirm discovery scope", client: "Northstar Capital", type: "Approval", owner: "Lerato Dlamini", due: "30 Nov", tone: "normal" },
];
