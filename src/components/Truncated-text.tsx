interface TruncatedTextProps {
  text: string;
  expanded: boolean;
  onToggle: () => void;
  className?: string;
  maxLength?: number;
}

export default function TruncatedText({
  text,
  expanded,
  onToggle,
  className = '',
  maxLength = 25,
}: TruncatedTextProps) {
  const shouldTruncate = text.length > maxLength;
  const visibleText = expanded ? text : text.slice(0, maxLength - 3);

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={`${className} cursor-pointer`} onClick={onToggle}>
      {visibleText}
      <span className="text-[#7B3FE4] font-bold ml-1">...</span>
    </p>
  );
}
