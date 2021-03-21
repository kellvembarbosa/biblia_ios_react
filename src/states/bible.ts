import { createState, State, useState } from "@hookstate/core";

interface BibleStateProps {
    bookId: number;
    chapterId: number;
    verseId: number;
    selected: any;
}

export const bibleState = createState<BibleStateProps>({ bookId: 0, chapterId: 0, verseId: 0, selected: {} });


const actionsHook = (s: State<BibleStateProps>) => ({

    setBookId: (bookId: number) => s.bookId.set(bookId),
    setChapterId: (chapterId: number) => s.chapterId.set(chapterId),
    setVerseId: (verseId: number) => s.verseId.set(verseId),
    setSelected: (selected: any) => {
        console.log('s.value.selected setSelected', s.value.selected)
        return s.selected.set(selected)
    },

    bookId: () => s.value.bookId,
    chapterId: () => s.value.chapterId,
    verseId: () => s.value.verseId,

    selected: () => {
        console.log('s.value.selected selected', s.value.selected);
        return s.value.selected
    },

})

export const useBible = () => actionsHook(useState(bibleState));