import type { Metadata } from "next";
import "./globals.css";


// import GoalProvider from "../../Providers/GoalProvider";
// import HabitsProvider from "../../Providers/HabitsProvider";
// import TokenProvider from "../../Providers/TokenProvider";
// import UserProvider from "../../Providers/UserProvider";


export const metadata: Metadata = {
    title: "Habstrack",
    description: "A all in one self improvement app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            {/* <TokenProvider>
                <HabitsProvider>
                    <GoalProvider>
                        <UserProvider> */}
            <body>{children}</body>
            {/* </UserProvider>
                    </GoalProvider>
                </HabitsProvider>
            </TokenProvider> */}
        </html>
    );
}
