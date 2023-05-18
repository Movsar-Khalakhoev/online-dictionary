export type Translation = {
  id: string;
  firstLangTranslation: string;
  firstLangDescription: string;
  secondLangTranslation: string;
  secondLangDescription: string;
};

export type DropdownTranslation = Pick<Translation, "id" | "firstLangTranslation" | "secondLangTranslation">;

export const Lang = {
  Russian: "FirstLang",
  English: "SecondLang",
} as const;

export type Lang = (typeof Lang)[keyof typeof Lang];
