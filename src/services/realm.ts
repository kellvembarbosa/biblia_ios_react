import Realm from 'realm';
import { databaseOptions, SETTING_SCHEMA } from '../data/schema';

export default function getRealm() {
    return Realm.open(databaseOptions);
}

export const addBookFavorite = async (item: any) => {
    const realm = await getRealm();
    realm.write(() => {
        item.favorite = item.favorite == 0 ? 1 : 0
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