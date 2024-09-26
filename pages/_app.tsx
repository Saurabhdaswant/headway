import HabitsProvider from "../Providers/HabitsProvider";
import TokenProvider from "../Providers/TokenProvider";
import GoalProvider from "../Providers/GoalProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <TokenProvider>
        <HabitsProvider>
          <GoalProvider>
            <Component {...pageProps} />
          </GoalProvider>
        </HabitsProvider>
      </TokenProvider>
    </main>
  );
}

export default MyApp;
