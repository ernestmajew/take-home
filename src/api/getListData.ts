import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

export const useGetListData = () => {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      if (getRandom() > 85) {
        throw new Error("Failed to fetch list data: Random error simulation");
      }

      try {
        const mockData = mockJson as Omit<ListItem, "isVisible">[];
        return shuffle(mockData).map((item) => ({
          ...item,
          isVisible: getRandom() > 50,
        }));
      } catch (error) {
        console.error("[ListData]", error);
        throw error instanceof Error
          ? error
          : new Error("Unknown error occurred");
      }
    },
  });

  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
