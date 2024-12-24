import Link from "next/link";

type QRGithubProps = {
  children?: React.ReactNode;
};

export default function QRGithub({ children }: QRGithubProps) {
  return (
    <Link
      className="flex items-center group outline-none justify-center mb-5"
      href="https://github.com/euphydev/qrcode-geneditor"
      target="_blank"
    >
      {children}
    </Link>
  );
}
