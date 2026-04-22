import { Spin } from 'antd';

interface LoadingFallbackProps {
  description?: string;
}

export default function LoadingFallback({ description }: LoadingFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Spin size="large" />
      {description && <p className="text-sm text-neutral-400 mt-1">{description}</p>}
    </div>
  );
}
