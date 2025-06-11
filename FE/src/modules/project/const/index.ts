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
export const MilestoneStatusColor: Record<string, string> = {
    "not_started": "text-orange-400",
    "in_progress": "text-blue-400",
    "blocked": "text-red-400",
    "done": "text-green-400"
}
export const MilestoneStatusBgColor: Record<string, string> = {
    "not_started": "bg-orange-400",
    "in_progress": "bg-blue-400",
    "blocked": "bg-red-400",
    "done": "bg-green-400"
}
export const MilestoneStatus: EnumSelectType = [
    { value: "not_started", text: "Not started" },
    { value: "in_progress", text: "In progress" },
    { value: "blocked", text: "Blocked" },
    { value: "done", text: "Done" }
]
export const DocumentStatus: EnumSelectType = [
    { value: "uptodate", text: "Up To Date" },
    { value: "deprecated", text: "Deprecated" },
]