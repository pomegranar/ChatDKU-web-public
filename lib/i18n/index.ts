import en from "./en";
import zh from "./zh";

export type Language = "en" | "zh";
export type DictionaryKey = keyof typeof en;
export type Dictionary = Record<DictionaryKey, string>;

export const dictionaries: Record<Language, Dictionary> = { en, zh };
