import React, { useEffect, useState } from "react";
import { AdForm } from "../../Components/User/Promotions/AdForm";
import SidebarTest from "../../Components/User/Sidebar/SidebarTest";
import Ads from "../../Components/User/Promotions/Ads";
import AdIntroCard from "../../Components/User/Promotions/AdIntroCard";

function Promotions() {
  const [openAdModal, setOpenAdModal] = useState(false);

  return (
    <div>
      {openAdModal && (
        <AdForm setOpenAdModal={setOpenAdModal} openAdModal={openAdModal} />
      )}
      <div className="float-left fixed">
        <SidebarTest />
      </div>

      <div style={{ marginLeft: "250px", height: "1000px" }}>
        <AdIntroCard />

        <Ads setOpenAdModal={setOpenAdModal} />
      </div>
    </div>
  );
}

export default Promotions;
