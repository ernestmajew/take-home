import { FC } from "react";
import { ListItem } from "../api/getListData";
import { IconButton } from "./IconButton";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
  card: ListItem;
  expansion?: {
    isExpanded: boolean;
    onToggle: (id: number) => void;
  };
  action?: {
    icon: React.ReactNode;
    onClick: (id: number) => void;
  };
};

export const Card: FC<CardProps> = ({ card, expansion, action }) => {
  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5 items-center">
        <h1 className="font-medium">{card.title}</h1>
        <div className="flex">
          {expansion && (
            <IconButton
              onClick={() => expansion.onToggle(card.id)}
              icon={
                expansion.isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
            />
          )}
          {action && (
            <IconButton
              onClick={() => action.onClick(card.id)}
              icon={action.icon}
            />
          )}
        </div>
      </div>
      {expansion && (
        <div
          className={`grid transition-all duration-200 ease-in-out ${
            expansion.isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <p className="overflow-hidden text-sm ease-in-out">
            {card.description}
          </p>
        </div>
      )}
    </div>
  );
};
