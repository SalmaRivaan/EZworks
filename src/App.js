import { useEffect, useState } from "react";
import "./App.css";

import ClientContent from "./Components/ClientContent";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import { data } from "./data";
import { useStateValue } from "./Components/state/StateProvider";
import { motion } from "framer-motion";

function App() {
  const [{ user }, dispatch] = useStateValue();

  const [client, setClient] = useState(data[0]);
  const [mobileView, setView] = useState(false);
  const [clientSelected, selectClient] = useState(false);
  const widthManagement = () => {
    if (window.screen.width <= 640) {
      setView(true);
    } else setView(false);
  };
  window.addEventListener("resize", () => {
    widthManagement();
  });
  useEffect(() => {
    widthManagement();
  }, []);

  return (
    <div className="app">
      <div className="profile">
        <div className="username">
          {user ? user.displayName : <span>Hello Salma</span>}
        </div>
        <motion.img
          whileTap={{ scale: 0.5 }}
          src="https://www.onetip.net/wp-content/uploads/2012/08/professional-objectives.jpg"
          className=""
          alt="userprofile"
        />
      </div>
      <Sidebar />
      {!mobileView && (
        <>
          <ClientContent setClient={setClient} selectClient={selectClient} />
          <Main client={client} />
        </>
      )}
      {mobileView && clientSelected && <Main client={client} />}
      {mobileView && !clientSelected && (
        <ClientContent setClient={setClient} selectClient={selectClient} />
      )}
    </div>
  );
}

export default App;
