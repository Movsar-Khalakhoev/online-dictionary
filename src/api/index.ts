import axios from "axios";
import { Lang, Translation } from "types";

const BASE_URL = "http://81.200.150.21";

export async function fetchTranslations(part: string, translateFrom: Lang, limit: number, offset: number): Promise<Translation[]> {
  const response = await axios.get<Translation[]>(`/translations`, {
    baseURL: BASE_URL,
    params: {
      part,
      translateFrom,
      limit,
      offset,
    },
  });

  return response.data;
}
