export interface Translation {
  id: string;
  firstLangTranslation: string;
  secondLangTranslation: string;
}

export const Lang = {
  Russian: "FirstLang",
  English: "SecondLang",
} as const;

export type Lang = (typeof Lang)[keyof typeof Lang];
