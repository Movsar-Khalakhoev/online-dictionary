export type Translation = {
  id: string;
  firstLangTranslation: string;
  firstLangDescription: string;
  secondLangTranslation: string;
  secondLangDescription: string;
};

export type DropdownTranslation = Pick<Translation, "id" | "firstLangTranslation" | "secondLangTranslation">;

export const Language = {
  Russian: "FirstLang",
  English: "SecondLang",
} as const;

export type Language = (typeof Language)[keyof typeof Language];
