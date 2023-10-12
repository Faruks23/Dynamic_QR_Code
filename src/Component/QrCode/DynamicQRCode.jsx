import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

const DynamicQRCode = () => {
  const [data, setData] = useState("https://protfolio-bb50e.web.app/"); // Initial data for the QR code
  const [exp, setExp] = useState(false);
  const [expirationTime, setExpirationTime] = useState(300); // 5 minutes in seconds
  const [intervalId, setIntervalId] = useState(null);

  // Function to convert seconds to a time string
  const secondsToTime = (seconds) => {
    if (seconds < 0) {
      return "QR Code Time Expired Please Refresh The Page";
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
        console.log("QR Code Expired",data);

      }
    };

    // Set an interval to update the QR code data every second
    const id = setInterval(updateQRCode, 1000); // 1 second in milliseconds
    setIntervalId(id);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [expirationTime]);

  return (
    <div className="flex justify-center flex-col items-center w-full h-[100vh] bg-[#141B3D] text-white font-serif">
      <h2>Dynamic QR Code with 5-Minute Time Limit</h2>
      <p className="mt-10 mb-6">
        Remaining Time: {secondsToTime(expirationTime)}
      </p>
      {exp ? (
        <>
          <div className="">QR code is expired</div>
        </>
      ) : (
        <>
          <div className=" bg-[#1B234D] shadow-xl p-20 ">
            <QRCode value={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicQRCode;
