import { createState, State, useState } from "@hookstate/core";

interface BibleStateProps {
    bookId: number;
    chapterId: number;
    verseId: number
}

export const bibleState = createState<BibleStateProps>({
    bookId: 0,
    chapterId: 0,
    verseId: 0
});


const actionsHook = (s: State<BibleStateProps>) => ({

    setBookId: (bookId: number) => s.bookId.set(bookId),
    setChapterId: (chapterId: number) => s.chapterId.set(chapterId),
    setVerseId: (verseId: number) => s.verseId.set(verseId),

    bookId: () => s.value.bookId,
    chapterId: () => s.value.chapterId,
    verseId: () => s.value.verseId,

})

export const useBible = () => actionsHook(useState(bibleState));