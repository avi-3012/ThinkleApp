import { FetchPopulationData } from '@/api';
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

type ContextType = {
  populationList: any;
  years: string[] | undefined;
  population: number[] | undefined;
  isLoading: boolean;
  index: number;
  setIndex: (index:number) => void;
  status: any;
};

const defaultValues:ContextType = {
  populationList: null,
  years: [],
  population: [],
  isLoading: true,
  index: 0,
  setIndex: () => {},
  status: null,
};
const ApiContext = createContext(defaultValues);

import { ReactNode } from "react";

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);
  const response = useQuery({
    queryKey: ["DATA_API"],
    queryFn: FetchPopulationData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  const populationList = response?.data?.data.map((item,index)=>response?.data?.data[index]).reverse();
  const years = response?.data?.data.map((item) => item.Year).reverse();
  const population = response?.data?.data.map((item) => item.Population).reverse();
  const isLoading = response.isLoading;
  const status = response.status;

  return (
    <ApiContext.Provider value={{ populationList, years, population, isLoading, index, setIndex, status }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the context
export const useApi = () => useContext(ApiContext);
