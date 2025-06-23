export type EnumSelectType = { value: string, text: string }[]
export const TypeDataSet: EnumSelectType = [
    { value: "web", text: "Website (focus UI and SEO)" },
    { value: "web_app", text: "Webapp (focus feature and functionally)" },
    { value: "mobile_app", text: "Mobile app" },
    { value: "api", text: "API Client" },
    { value: "other", text: "Other" }
]

export const EnvironmentStatus: EnumSelectType = [
    { value: "active", text: "Active" },
    { value: "inactive", text: "Inactive" },
    { value: "maintance", text: "Maintance" },
]

export const EnvironmentColor: Record<string, string> = {
    "active": "text-green-400",
    "inactive": "text-red-400",
    "maintance": "text-orange-400",
}
export const EnvironmentBgColor: Record<string, string> = {
    "active": "bg-green-50",
    "inactive": "bg-red-50",
    "maintance": "bg-orange-50",
}
export const MilestoneStatus: EnumSelectType = [
    { value: "not_started", text: "Not started" },
    { value: "in_progress", text: "In progress" },
    { value: "blocked", text: "Blocked" },
    { value: "done", text: "Done" }
]
export const MilestoneStatusColor: Record<string, string> = {
    "not_started": "text-orange-400",
    "in_progress": "text-blue-400",
    "blocked": "text-red-400",
    "done": "text-green-400"
}
export const MilestoneStatusHex: Record<string, string> = {
    "not_started": "#fb923c",  // orange-400
    "in_progress": "#60a5fa",  // blue-400
    "blocked": "#f87171",      // red-400
    "done": "#4ade80",         // green-400
};
export const MilestoneStatusBgColor: Record<string, string> = {
    "not_started": "bg-orange-50",
    "in_progress": "bg-blue-50",
    "blocked": "bg-red-50",
    "done": "bg-green-50"
}
export const DocumentStatus: EnumSelectType = [
    { value: "uptodate", text: "Up To Date" },
    { value: "deprecated", text: "Deprecated" },
]
export const CommunitationMeeting: EnumSelectType = [
    { value: "no", text: "No meeting" },
    { value: "daily", text: "Daily" },
    { value: "weekly", text: "Weekly" },
    { value: "monthly", text: "Monthly" },
    { value: "custom", text: "Custom" }
]

export const STEPS = [
    { id: "01", name: "Overview" },
    { id: "02", name: "Technical" },
    { id: "03", name: "Milestones" },
    { id: "04", name: "Roles & Members" },
    { id: "05", name: "Documents & More Infomation" },
]
export const STEP_DETAILS = [
    { id: "01", name: "Overview" },
    { id: "02", name: "Milestones" },
    { id: "03", name: "Roles & Members" },
    { id: "04", name: "Documents & More Infomation" },
]