import HabitsProvider from "../Providers/HabitsProvider";
import TokenProvider from "../Providers/TokenProvider";
import GoalProvider from "../Providers/GoalProvider";
import "../styles/globals.css";
import UserProvider from "../Providers/UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <TokenProvider>
        <HabitsProvider>
          <GoalProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </GoalProvider>
        </HabitsProvider>
      </TokenProvider>
    </main>
  );
}

export default MyApp;
