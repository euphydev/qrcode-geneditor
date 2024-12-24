type WrapperProps = {
  title?: string;
  text?: string;
  children: React.ReactNode;
};

export default function Wrapper({ title, text, children }: WrapperProps) {
  let className = "grid place-content-center h-full";
  if (text) {
    className += " place-items-start";
  }
  return (
    <section className={className}>
      {title && <h1 className="w-full text-center">{title}</h1>}
      {children}
    </section>
  );
}
