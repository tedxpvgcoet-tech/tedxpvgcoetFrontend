import React, { useState, useEffect } from "react";
import BridgekeeperAuth from "../components/Internal/BridgekeeperAuth";
import BillsUploadForm from "../components/Internal/BillsUploadForm";

export default function InternalBillsPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("BRIDGE_KEY");
    if (savedKey) {
      setSecretKey(savedKey);
      setIsAuthorized(true);
    }
  }, []);

  const handleAuthorized = (key) => {
    setSecretKey(key);
    setIsAuthorized(true);
  };

  if (!isAuthorized)
    return <BridgekeeperAuth onAuthorized={handleAuthorized} />;
  return <BillsUploadForm secretKey={secretKey} />;
}
