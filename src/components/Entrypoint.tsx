import { Card } from "./Card";
import { useCardsStore, useCards } from "../store/CardStateStore";
import { Spinner } from "./Spinner";
import { Skeleton } from "./Skeleton";
import { RevertIcon, XMarkIcon } from "./icons";
import { useState } from "react";

export const Entrypoint = () => {
  const { isLoading, isError, refetch } = useCards();
  const {
    cards,
    deletedCards,
    toggleExpanded,
    deleteCard,
    expandedCards,
    isInitialized,
  } = useCardsStore((state) => state);
  const [isDeletedCardsExpanded, setIsDeletedCardsExpanded] = useState(false);

  if (isLoading && !isInitialized) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16 justify-center w-full">
      <div className="w-5/12">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({cards.length})
          </h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            onClick={() => refetch()}
          >
            Refetch
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {isError && <div>Error loading cards</div>}
          {isLoading ? (
            <>
              <Skeleton />
            </>
          ) : (
            cards?.map((card) => (
              <Card
                {...card}
                key={card.id}
                expansion={{
                  isExpanded: expandedCards.includes(card.id),
                  onToggle: toggleExpanded,
                }}
                action={{
                  icon: <XMarkIcon />,
                  onClick: deleteCard,
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-5/12">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards {deletedCards.length}
          </h1>
          <button
            onClick={() => setIsDeletedCardsExpanded((prev) => !prev)}
            className="text-white text-sm transition-all hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            {isDeletedCardsExpanded ? "Hide" : "Reveal"}
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {isDeletedCardsExpanded &&
            deletedCards.map((card) => (
              <Card
                key={card.id}
                {...card}
                action={{
                  icon: <RevertIcon />,
                  onClick: () => {},
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
