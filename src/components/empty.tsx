import { Empty as AntEmpty } from 'antd';

interface EmptyProps {
  text?: string;
}

export default function Empty({ text = 'No se encontraron resultados.' }: EmptyProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <AntEmpty description={<span className="text-sm text-neutral-400">{text}</span>} />
    </div>
  );
}
