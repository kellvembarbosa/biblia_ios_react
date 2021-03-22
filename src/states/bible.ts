import { createState, State, useState } from "@hookstate/core";
import { deviceLanguage } from "../utils/settings";

interface BibleStateProps {
    bookId: number;
    chapterId: number;
    verseId: number;
    lang: string;
    version: string;
}

export const bibleState = createState<BibleStateProps>({
    bookId: 0,
    chapterId: 0,
    verseId: 0,
    lang: deviceLanguage().length > 0 ? deviceLanguage() : 'en',
    version: ''
});


const actionsHook = (s: State<BibleStateProps>) => ({

    setBookId: (bookId: number) => s.bookId.set(bookId),
    setChapterId: (chapterId: number) => s.chapterId.set(chapterId),
    setVerseId: (verseId: number) => s.verseId.set(verseId),

    isHydrateTime: () => {
        // @ts-ignore
        if (s.value.hydrateTime)
            return true;
        else
            return false;
    },

    bookId: () => s.value.bookId,
    chapterId: () => s.value.chapterId,
    verseId: () => s.value.verseId,
    version: () => s.value.version,
    lang: () => s.value.lang,

})

export const useBible = () => actionsHook(useState(bibleState));