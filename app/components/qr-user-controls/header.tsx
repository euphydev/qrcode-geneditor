import QRGithub from "@/components/qr-github";
import QRImage from "@/components/qr-image";

export default function UserControlsHeader() {
  return (
    <article className="grid mb-5 place-content-center w-full">
      <QRGithub>
        <span className="group-hover:text-yellow transform transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-lg">
          Leave a star on GitHub
        </span>
        <QRImage
          src={"/star.svg"}
          alt={"github star"}
          width={30}
          height={5}
          className="h-5 w-5 object-cover ml-1 transform transition-transform duration-300 ease-in-out group-hover:-rotate-45"
        />
      </QRGithub>
    </article>
  );
}
