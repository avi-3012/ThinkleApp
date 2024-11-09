import { URLs } from "@/constants/urls";
import { PopulationApiResponse } from "@/types";
import axios from "axios";

export async function FetchPopulationData(): Promise<PopulationApiResponse> {
    const response = await axios.get<PopulationApiResponse>(URLs.populationData);
    return response.data;
  }