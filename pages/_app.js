import HabitsProvider from "../Providers/HabitsProvider";
import TokenProvider from "../Providers/TokenProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <TokenProvider>
      <HabitsProvider>
        <Component {...pageProps} />
      </HabitsProvider>
    </TokenProvider>
  );
}

export default MyApp;
