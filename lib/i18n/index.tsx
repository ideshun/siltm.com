"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dict, type Lang } from "./dict";

const STORAGE_KEY = "siltm-lang";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

/**
 * 轻量中英双语：默认跟随浏览器语言（zh-* → 中文，其余英文），
 * localStorage 记忆用户选择；切换时同步 <html lang>。
 * 字典需为等宽结构，useT 直接按 lang 索引取值。
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
    } else if (navigator.language.toLowerCase().startsWith("zh")) {
      setLangState("zh");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  }, []);
  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "zh" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </I18nContext.Provider>
  );
}

/** 取当前语言；字典键用 useLang().lang 索引，如 dict.hero.titleA[lang] */
export function useLang(): I18nContextValue {
  return useContext(I18nContext);
}

export { dict };
export type { Lang };
