import realm from 'realm';
import Realm from 'realm';
import { databaseOptions, SETTING_SCHEMA, LIVRO_SCHEMA, VERSE_SCHEMA } from '../data/schema';

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