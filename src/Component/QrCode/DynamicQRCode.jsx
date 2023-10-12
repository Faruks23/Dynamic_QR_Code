import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

const DynamicQRCode = () => {
  const [data, setData] = useState("initial_data"); // Initial data for the QR code
  const [exp,setExp]=useState(false)
  const [expirationTime, setExpirationTime] = useState(Date.now()+ 1000); // 5 minutes in milliseconds
   const minutes = Math.floor((expirationTime / (1000 * 60)) % 60);
    console.log(minutes);
  // Update the QR code data when the component mounts and every 10 seconds
  useEffect(() => {
    // Function to update the QR code data
    const updateQRCode = () => {
      // Update data to be a combination of your unique identifier and the expiration time
      setData(`your_unique_identifier|${expirationTime}`);
    };

    // Initial update
    updateQRCode();

    // Set an interval to update the QR code data every 10 seconds
    const intervalId = setInterval(updateQRCode, 1000); // 10 seconds in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [expirationTime]); // Re-run effect when expirationTime changes

  // Check if the QR code has expired
  useEffect(() => {
    
    if (Date.now()> expirationTime) {
      // The QR code has expired, you can take action here
      console.log("QR Code Expired");
      setExp(true);
    }

  }, [expirationTime]);

  return (
    <div>
      <h2>Dynamic QR Code with 5-Minute Time Limit</h2>
      {exp ? (
        <>
          <div className="">Qr code expiration time limit</div>
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
