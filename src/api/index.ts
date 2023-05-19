import axios from "axios";
import { Language, DropdownTranslation, Translation } from "types";

const BASE_URL = "http://81.200.150.21";

export async function fetchDropdownTranslations(part: string, translateFrom: Lang, limit: number, offset: number): Promise<DropdownTranslation[]> {
  const response = await axios.get<DropdownTranslation[]>(`/translations/dropdown`, {
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

export async function fetchTranslationsList(part: string, translateFrom: Lang, limit: number, offset: number): Promise<Translation[]> {
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
