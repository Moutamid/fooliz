import React, { useState } from 'react';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Link } from 'react-router-dom';

export default function Imgtogether() {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full h-screen overflow-auto relative">
      {/* Show loader while image is loading */}
      {!imageLoaded && (
        <div className="w-full h-screen flex items-center justify-center bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Image Preloading (Does not render UI yet) */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/foolee-inc.appspot.com/o/fooliz.-website-assets%2Flong-screenshots%2FQRScanner.png?alt=media&token=b297dc53-3516-49a3-a889-cc49a46cceb1"
        alt="Talk Image"
        className="hidden"
        onClick={() => window.open('https://www.moutamid.com/fooliz-old/mobile/qr-scanner/download/', '_blank')}
        style={{ cursor: 'pointer' }}
        onLoad={() => {
          setImageLoaded(true);
          setTimeout(() => setLoading(false), 10); // Minimal delay for a seamless transition
        }}
      />

      {/* Once the image is loaded, instantly show everything */}
      {!loading && (
        <>
          <Header />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/foolee-inc.appspot.com/o/fooliz.-website-assets%2Flong-screenshots%2FQRScanner.png?alt=media&token=b297dc53-3516-49a3-a889-cc49a46cceb1"
            alt="Talk Image"
            className="w-full h-auto object-cover"
            onClick={() => window.open('https://www.moutamid.com/fooliz-old/mobile/qr-scanner/download/', '_blank')}
            style={{ cursor: 'pointer' }}
          />
          <div className="mb-[-100px]">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
