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
    "not_started": "orange",
    "in_progress": "blue",
    "blocked": "red",
    "done": "green"
}
export const MilestoneStatus: EnumSelectType = [
    { value: "not_started", text: "Not started" },
    { value: "in_progress", text: "In progress" },
    { value: "blocked", text: "Blocked" },
    { value: "done", text: "Done" }
]
