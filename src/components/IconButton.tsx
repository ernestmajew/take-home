import { FC } from "react";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

export const IconButton: FC<IconButtonProps> = ({
  onClick,
  icon,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 hover:bg-gray-100 rounded ${className}`}
    >
      {icon}
    </button>
  );
};
