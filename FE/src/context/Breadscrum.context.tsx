import React from "react";
type Breadscrum = { text: string, link: string }
interface BreadscrumContextType {
    breadscrums: Breadscrum[] | undefined,
    setBreadscrum: React.Dispatch<React.SetStateAction<Breadscrum[] | undefined>>
}
export const BreadscrumContext = React.createContext<BreadscrumContextType>({ breadscrums: [{ link: "", text: "Dashboard" }], setBreadscrum: () => { } })

export default function BreadscrumContextProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const [breadscrums, setBreadscrum] = React.useState<Breadscrum[]>()
    return <BreadscrumContext.Provider value={{ breadscrums, setBreadscrum }}>
        {children}
    </BreadscrumContext.Provider>
}