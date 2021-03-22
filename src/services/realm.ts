import realm from 'realm';
import Realm from 'realm';
import { BIBLE_SCHEMA, databaseOptions, LIVRO_SCHEMA, VERSE_SCHEMA } from '../data/schema';

export default function getRealm() {
    return Realm.open(databaseOptions);
}

export const addBookFavorite = async (item: any) => {
    const realm = await getRealm();
    realm.write(() => {
        item.favorite = item.favorite == 0 ? 1 : 0
    })
}

export const getFavoriteBooks = async () => {
    const realm = await getRealm();
    return realm.objects(LIVRO_SCHEMA).filtered("favorite == 1");
}

export const getMarksByBook = async (abbrev: string) => {
    const realm = await getRealm();
    const book = realm.objects(LIVRO_SCHEMA).filtered(`abbrev == '${abbrev}'`);
    return book;
}

export const setMarkedColorVerse = async (item: any, color: string) => {
    const realm = await getRealm();
    realm.write(() => {
        item.marked = color === item.marked ? '' : color;
    });
}

export const getItemsByColor = async (color: string) => {
    const realm = await getRealm();
    return realm.objects(VERSE_SCHEMA).filtered(`marked == '${color}'`);
}

export const clearAllMarked = async () => {
    const realm = await getRealm();
    const verses = realm.objects(VERSE_SCHEMA).filtered(`marked != ''`);
    verses.map((verse: any) => {
        realm.write(() => {
            verse.marked = '';
        })
    })
}

export const getVerseByIds = async (bookId: number, chapterId: number, verseId: number) => {
    const realm = await getRealm();
    const books = realm.objects(LIVRO_SCHEMA);
    const book = books[bookId];

    // @ts-ignore
    const verse = books[bookId].chapters[chapterId].verses[verseId];
    return { book, verse }
}

export const getSearchByKeyword = async (keywords: string) => {
    const realm = await getRealm();
    const filteredBooks = realm.objects(LIVRO_SCHEMA).filtered(`name LIKE '${keywords.toLowerCase()}' || abbrev LIKE '${keywords.toLowerCase()}' `);
    const filteredVerses = realm.objects(VERSE_SCHEMA).filtered(`verse CONTAINS '${keywords.toLowerCase()}'`);
    console.log('keywordsRealm', keywords);

    return {
        books: filteredBooks,
        verses: filteredVerses
    }
}

export const getBibleVersion = async () => {
    const realm = await getRealm();
    const bible: any = realm.objects(BIBLE_SCHEMA)[0];
    return { version: bible.version, lang: bible.lang };
}

export const deleteAllDB = async () => {
    const realm = await getRealm();
    realm.write(() => {
        realm.deleteAll();
    })
}

// export const getValue = async (key: string, defaultValue?: number) => {
//     const realm = await getRealm();
//     const firstValue = realm.objectForPrimaryKey(SETTING_SCHEMA, key)

//     console.log('getValue', firstValue)

//     if (firstValue) {
//         // @ts-ignore
//         return firstValue.value
//     } else {
//         updateValue(key, defaultValue)
//         return defaultValue;
//     }
// }

// export const updateValue = async (key: string, value: any) => {
//     const realm = await getRealm();
//     realm.write(() => {
//         const first = realm.objectForPrimaryKey(SETTING_SCHEMA, key);
//         console.log('updateValue', first);
//         if (!first) {
//             realm.create(SETTING_SCHEMA, { key: key, value: value.toString() })
//         }
//     })
// };