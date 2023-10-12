import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

const DynamicQRCode = () => {
  const [data, setData] = useState("initial_data"); // Initial data for the QR code
  const [exp, setExp] = useState(false);
  const [expirationTime, setExpirationTime] = useState(100); // 5 minutes in seconds
  const [intervalId, setIntervalId] = useState(null);

  // Function to convert seconds to a time string
  const secondsToTime = (seconds) => {
    if (seconds < 0) {
      return "Expired";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes, ${remainingSeconds} seconds`;
  };

  // Update the QR code data when the component mounts and every second
  useEffect(() => {
    // Function to update the QR code data
    const updateQRCode = () => {
      if (expirationTime > 0) {
        setExpirationTime((prev) => prev - 1);
      } else {
        // The QR code has expired
        setExp(true);
        clearInterval(intervalId);
        console.log("QR Code Expired");
      }
    };

    // Set an interval to update the QR code data every second
    const id = setInterval(updateQRCode, 1000); // 1 second in milliseconds
    setIntervalId(id);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [expirationTime]);

  return (
    <div>
      <h2>Dynamic QR Code with 5-Minute Time Limit</h2>
      <p>Remaining Time: {secondsToTime(expirationTime)}</p>
      {exp ? (
        <>
          <div className="">QR code has expired</div>
        </>
      ) : (
        <>
          <QRCode value={data} />
        </>
      )}
    </div>
  );
};

export default DynamicQRCode;
