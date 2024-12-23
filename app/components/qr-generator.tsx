'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QRPage() {
  const [text, setText] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [padding, setPadding] = useState(1);
  const [fgColor, setFgColor] = useState("#000000FF");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [size, setSize] = useState(256);
  const errorCorrectionOptions = [
    { value: 'L', label: 'Low' },
    { value: 'M', label: 'Medium' },
    { value: 'Q', label: 'Quartile' },
    { value: 'H', label: 'High' },
  ];
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [selectedErrorCorrection, setSelectedErrorCorrection] = useState(errorCorrectionOptions[3]);
  const [type, setType] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState(0.3);

  const generateQRCode = async () => {
    try {
      const options = {
        errorCorrectionLevel: errorCorrection,
        type: type,
        quality: quality,
        margin: padding,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        width: size,
      };

      const qrData = await QRCode.toDataURL(text, options);
      setQrCodeData(qrData);
    } catch (err) {
      console.error('Error generating QR code', err);
    }
  };

  useEffect(() => {
    if (text) {
      generateQRCode();
    }
  }, [padding, fgColor, bgColor, size, errorCorrection, type, quality]);

  const handleErrorCorrectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as 'L' | 'M' | 'Q' | 'H';
    setErrorCorrection(selectedValue);
    setSelectedErrorCorrection(errorCorrectionOptions.find(option => option.value === selectedValue) || errorCorrectionOptions[3]);
  };

  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement('a');
      link.href = qrCodeData;
      link.download = 'qrcode.png'; // Change the file name here if needed
      link.click();
    }
  };

  return (
    <div className='flex' style={{ textAlign: 'center', padding: '20px' }}>

      {qrCodeData && (
        <div style={{ marginTop: '20px' }}>
          <img src={qrCodeData} alt="Generated QR Code" />
        </div>
      )}

      {qrCodeData && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={downloadQRCode}
            style={{ padding: '8px 16px', marginTop: '10px', color: 'black' }}
          >
            Download QR Code
          </button>
        </div>
      )}

      <div>
        <h1>QR Code Editor</h1>

        <div style={{ marginBottom: '20px' }}>
          <div className='flex items-center group justify-center' onClick={() => window.open('https://github.com/euphydev/qrcode-geneditor', '_blank')}>
            <span className='hover:text-yellow hover:font-bold hover:text-lg'>
              Leave a star on GitHub

            </span>

            <img
              src={'/star.svg'}
              alt={'github star'}
              style={{
                height: "30px",
                padding: "5px",
              }}
              className="transform transition-transform duration-300 ease-in-out group-hover:-rotate-45"
            />
          </div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text for QR code"
            style={{ padding: '8px', width: '300px', color: 'black' }}
          />
          <button
            onClick={generateQRCode}
            style={{ padding: '8px 16px', marginLeft: '10px' }}
          >
            Generate QR Code
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Error Correction Level:</label>
          <select
            value={selectedErrorCorrection.value}
            onChange={handleErrorCorrectionChange}
            style={{ padding: '8px', marginLeft: '10px', color: 'black' }}
          >
            {errorCorrectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Output Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp')}
            style={{ padding: '8px', marginLeft: '10px', color: 'black' }}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WEBP</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Quality (0-1):</label>
          <input
            type="number"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            min="0"
            max="1"
            step="0.1"
            style={{ padding: '8px', width: '80px', marginLeft: '10px', color: 'black' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Padding (Margin):</label>
          <input
            type="number"
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            style={{ padding: '8px', width: '50px', marginLeft: '10px', color: 'black' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Size (px):</label>
          <input
            type="number"
            step={20}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ padding: '8px', width: '80px', marginLeft: '10px', color: 'black' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Foreground Color (Dark):</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            style={{ padding: '2px', width: '50px', marginLeft: '10px', color: 'black' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Background Color (Light):</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ padding: '2px', width: '50px', marginLeft: '10px', color: 'black' }}
          />
        </div>
        <div>
          <span>=== under construction ===</span>
        </div>

      </div>
    </div>
  );
}
