import Realm from 'realm';
import { databaseOptions } from '../data/schema';

export default function getRealm() {
    return Realm.open(databaseOptions);
}

export const addBookFavorite = async (item: any) => {
    const realm = await getRealm();
    realm.write(() => {
        item.favorite = item.favorite == 0 ? 1 : 0
    })
}