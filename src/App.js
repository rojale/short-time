import { useState, createContext } from "react";
import AppStyles from "./App.module.css";
import Header from "./Placeholders/Header";
import TabsBar from "./Placeholders/TabsBar";
import PackWithTitle from "./Placeholders/PackWIthTitle";
import PackModal from "./PackModal/PackModal";

export const SetActivePackContext = new createContext(() => {});

function App() {
  const [activePack, setActivePack] = useState(null);
  return (
    <div className={AppStyles.App}>
      <Header />
      <TabsBar />
      <SetActivePackContext.Provider value={setActivePack}>
        <div className={AppStyles.packGrid}>
          <PackWithTitle />
          <PackWithTitle />
          <PackWithTitle />
        </div>
      </SetActivePackContext.Provider>
      <PackModal
        pack={activePack}
        closeModal={() => {
          setActivePack(null);
        }}
      />
    </div>
  );
}

export default App;
