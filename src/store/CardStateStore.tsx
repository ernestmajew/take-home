import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem, useGetListData } from "../api/getListData";
import { useEffect } from "react";

interface CardsState {
  cards: ListItem[];
  expandedCards: number[];
  deletedCards: ListItem[];
  isInitialized: boolean;
  setCards: (cards: ListItem[]) => void;
  toggleExpanded: (id: number) => void;
  deleteCard: (id: number) => void;
}

export const useCardsStore = create<CardsState>()(
  persist(
    (set) => ({
      cards: [],
      expandedCards: [],
      deletedCards: [],
      isInitialized: false,
      setCards: (newCards) =>
        set((state) => {
          // Filter out any cards that exist in deletedCards
          const filteredCards = newCards.filter(
            (newCard) =>
              !state.deletedCards.some(
                (deletedCard) => deletedCard.id === newCard.id
              )
          );

          return {
            cards: filteredCards,
            isInitialized: true,
          };
        }),
      toggleExpanded: (id) =>
        set((state) => ({
          expandedCards: state.expandedCards.includes(id)
            ? state.expandedCards.filter((cardId) => cardId !== id)
            : [...state.expandedCards, id],
        })),
      deleteCard: (id) =>
        set((state) => {
          const cardToDelete = state.cards.find((card) => card.id === id);
          return {
            cards: state.cards.filter((card) => card.id !== id),
            deletedCards: cardToDelete
              ? [...state.deletedCards, cardToDelete]
              : state.deletedCards,
          };
        }),
    }),
    {
      name: "cards-storage",
      partialize: (state) => ({
        cards: state.cards,
        deletedCards: state.deletedCards,
        expandedCards: state.expandedCards,
      }),
    }
  )
);

export const useCards = () => {
  const { isInitialized, setCards } = useCardsStore();
  const query = useGetListData();

  useEffect(() => {
    if (!isInitialized && query.data) {
      setCards(query.data);
    }
  }, [query.data, isInitialized, setCards]);

  const retryFetch = async (retries = 3): Promise<boolean> => {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await query.refetch();
        if (result.data) {
          setCards(result.data);
          return true;
        }
      } catch {
        if (i === retries - 1) return false;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    return false;
  };

  return {
    isLoading: (!isInitialized && query.isLoading) || query.isFetching,
    isError: query.isError,
    refetch: () => retryFetch(),
  };
};
