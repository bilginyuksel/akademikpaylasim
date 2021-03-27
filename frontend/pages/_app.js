import Layout from "../components/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfessionContextProvider from "../contexts/ProfessionContext";
function MyApp({ Component, pageProps }) {
  return (
    <ProfessionContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProfessionContextProvider>
  );
}

export default MyApp;
