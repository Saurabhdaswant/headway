import "./globals.css";
// import GoalProvider from "../../Providers/GoalProvider";
// import HabitsProvider from "../../Providers/HabitsProvider";
// import TokenProvider from "../../Providers/TokenProvider";
// import UserProvider from "../../Providers/UserProvider";


export default function RootLayout({
    children,
    pageProps,
}: {
    children: React.ReactNode;
    pageProps: any;
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
