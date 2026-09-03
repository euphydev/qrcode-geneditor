'use client';

import { useState, useEffect } from 'react';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

type ErrorCorrection = 'L' | 'M' | 'Q' | 'H';
type OutputType = 'image/png' | 'image/jpeg' | 'image/webp';

const ERROR_CORRECTION_OPTIONS: { value: ErrorCorrection; label: string }[] = [
  { value: 'L', label: 'Low' },
  { value: 'M', label: 'Medium' },
  { value: 'Q', label: 'Quartile' },
  { value: 'H', label: 'High' },
];

const OUTPUT_TYPES: { value: OutputType; label: string; ext: string }[] = [
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/webp', label: 'WEBP', ext: 'webp' },
];

export default function QRPage() {
  const [text, setText] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [padding, setPadding] = useState(2);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(320);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrection>('H');
  const [type, setType] = useState<OutputType>('image/png');
  const [quality, setQuality] = useState(0.8);

  useEffect(() => {
    if (!text.trim()) {
      setQrCodeData('');
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const options: QRCodeToDataURLOptions =
          type === 'image/png'
            ? {
                errorCorrectionLevel: errorCorrection,
                type,
                margin: padding,
                color: { dark: fgColor, light: bgColor },
                width: size,
              }
            : {
                errorCorrectionLevel: errorCorrection,
                type,
                margin: padding,
                color: { dark: fgColor, light: bgColor },
                width: size,
                rendererOpts: { quality },
              };
        const dataUrl = await QRCode.toDataURL(text, options);
        if (!cancelled) setQrCodeData(dataUrl);
      } catch (err) {
        console.error('Error generating QR code', err);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, padding, fgColor, bgColor, size, errorCorrection, type, quality]);

  const downloadQRCode = () => {
    if (!qrCodeData) return;
    const ext = OUTPUT_TYPES.find((o) => o.value === type)?.ext ?? 'png';
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = `qrcode.${ext}`;
    link.click();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 sm:px-10">
      <header className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            QR Code Editor
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Generate and style a QR code, live, right in your browser.
          </p>
        </div>
        <a
          href="https://github.com/euphydev/qrcode-geneditor"
          target="_blank"
          rel="noreferrer"
          className="group flex shrink-0 items-center gap-1.5 whitespace-nowrap pt-1 text-sm text-ink-dim transition-colors hover:text-accent"
        >
          <img
            src="/star.svg"
            alt=""
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45"
          />
          Star on GitHub
        </a>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-10 md:grid-cols-2">
        <section className="flex flex-col">
          <div className="relative aspect-square w-full border border-line bg-paper-raised p-8">
            <CropMarks />
            <div className="flex h-full w-full items-center justify-center">
              {qrCodeData ? (
                <img
                  src={qrCodeData}
                  alt="Generated QR code"
                  className="max-h-full max-w-full"
                  style={{ imageRendering: 'pixelated' }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div
                    className="h-28 w-28 border border-dashed border-line"
                    style={{
                      backgroundImage: 'radial-gradient(var(--line) 1px, transparent 1px)',
                      backgroundSize: '8px 8px',
                    }}
                  />
                  <p className="max-w-[16rem] text-sm text-ink-dim">
                    Your QR code will appear here once you enter some content.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-line border border-line font-mono text-xs">
            <Stat label="Size" value={`${size}×${size}`} />
            <Stat label="Format" value={OUTPUT_TYPES.find((o) => o.value === type)?.label ?? ''} />
            <Stat label="ECC" value={errorCorrection} />
          </div>

          <button
            onClick={downloadQRCode}
            disabled={!qrCodeData}
            className="mt-4 w-full border border-ink bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-ink-dim"
          >
            Download image
          </button>
        </section>

        <section className="flex flex-col gap-8">
          <Field label="Content">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a URL, message, or any text…"
              rows={3}
              className="w-full resize-none border border-line bg-paper-raised px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
            />
          </Field>

          <Group title="Appearance">
            <div className="flex gap-6">
              <ColorField label="Foreground" value={fgColor} onChange={setFgColor} />
              <ColorField label="Background" value={bgColor} onChange={setBgColor} />
            </div>
          </Group>

          <Group title="Output">
            <Field label="Error correction">
              <Segmented
                options={ERROR_CORRECTION_OPTIONS}
                value={errorCorrection}
                onChange={(v) => setErrorCorrection(v)}
              />
            </Field>
            <Field label="File format">
              <Segmented options={OUTPUT_TYPES} value={type} onChange={(v) => setType(v)} />
            </Field>
            {type !== 'image/png' && (
              <SliderField
                label="Quality"
                value={quality}
                min={0.1}
                max={1}
                step={0.1}
                display={quality.toFixed(1)}
                onChange={setQuality}
              />
            )}
          </Group>

          <Group title="Dimensions">
            <SliderField
              label="Size"
              value={size}
              min={128}
              max={1024}
              step={32}
              display={`${size}px`}
              onChange={setSize}
            />
            <SliderField
              label="Margin"
              value={padding}
              min={0}
              max={10}
              step={1}
              display={`${padding}`}
              onChange={setPadding}
            />
          </Group>
        </section>
      </div>
    </div>
  );
}

function CropMarks() {
  const corner = 'absolute h-3 w-3 border-ink-dim';
  return (
    <>
      <span className={`${corner} left-2 top-2 border-l border-t`} />
      <span className={`${corner} right-2 top-2 border-r border-t`} />
      <span className={`${corner} bottom-2 left-2 border-b border-l`} />
      <span className={`${corner} bottom-2 right-2 border-b border-r`} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2">
      <div className="text-ink-dim">{label}</div>
      <div className="mt-0.5 text-ink">{value}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-6">
      <h2 className="mb-4 text-sm font-medium text-ink">{title}</h2>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer"
        />
        <span className="font-mono text-xs text-ink-dim">{value.toUpperCase()}</span>
      </div>
    </label>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap border border-line">
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex-1 whitespace-nowrap px-3 py-1.5 text-sm transition-colors ${
            i !== 0 ? 'border-l border-line' : ''
          } ${
            value === option.value
              ? 'bg-ink text-paper'
              : 'bg-transparent text-ink-dim hover:text-ink'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        <span className="font-mono text-xs font-normal text-ink-dim">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
