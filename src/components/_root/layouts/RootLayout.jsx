import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

export default function RootLayout() {
  return (
    <div className="hero">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
