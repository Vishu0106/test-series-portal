/* eslint-disable react/prop-types */
import Header from "../components/Header";
import Footer from "../components/Footer";

function HomeLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;