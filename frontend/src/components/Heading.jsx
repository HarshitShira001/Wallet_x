export function Heading({ text, className = "" }) {
  return (
    <h1 className={`text-4xl font-bold mb-4 ${className}`}>
      {text}
    </h1>
  );
}
