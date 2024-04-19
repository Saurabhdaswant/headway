import HabitsProvider from "../Providers/HabitsProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <HabitsProvider>
      <Component {...pageProps} />
    </HabitsProvider>
  );
}

export default MyApp;
