import React from "react";
const HRightContent = React.lazy(() => import("@dashboard/layout/HRightContent"))
const DashboardRouter = [

    {
        path: "",
        children: [
            {
                index: true,
                lazy: async () => ({
                    Component: (await import("@dashboard/view/Dashboard.view")).default,
                }),
                handle: { rightHeadContent: <HRightContent /> }
            }
        ]
    }
]
export default DashboardRouter