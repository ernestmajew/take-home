import { FC } from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse w-full h-10 ${className}`}
    />
  );
};
