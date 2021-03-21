import Realm from 'realm'

export const BIBLE_SCHEMA = 'Bible'
export const LIVRO_SCHEMA = 'Book'
export const CHAPTER_SCHEMA = 'Chapter'
export const VERSE_SCHEMA = 'Verse'
export const SETTING_SCHEMA = 'Setting'

export const BibleSchema = {
    name: BIBLE_SCHEMA,
    properties: {
        objectId: 'string',
        version: 'string?',
        lang: 'string?',
        favorite: { type: 'int?', default: 0 },
        livro: { type: 'list', objectType: `${LIVRO_SCHEMA}` },
    },
    primaryKey: 'objectId'
}

export const LivroSchema = {
    name: LIVRO_SCHEMA,
    properties: {
        abbrev: 'string?',
        favorite: { type: 'int?', default: 0 },
        chapters: { type: 'list', objectType: `${CHAPTER_SCHEMA}` },
        name: { type: 'string', indexed: true }
    }
}

export const ChapterSchema = {
    name: CHAPTER_SCHEMA,
    properties: {
        verses: { type: 'list', objectType: `${VERSE_SCHEMA}` }
    }
}

export const VerseSchema = {
    name: VERSE_SCHEMA,
    properties: {
        verse: { type: 'string', indexed: true },
        favorite: { type: 'int?', default: 0 },
        marked: { type: 'string?', default: '' }
    }
}

// export const SettingSchema = {
//     name: SETTING_SCHEMA,
//     primaryKey: 'key',
//     properties: {
//         key: { type: 'string' },
//         value: { type: 'string' }
//     }
// }

export const databaseOptions: Realm.Configuration = {
    schema: [BibleSchema, LivroSchema, ChapterSchema, VerseSchema],
    schemaVersion: 1,
    path: 'bdbibliaabaaaa',
    migration: (oldRealm: Realm, newRealm: Realm) => {
        console.log('migration: ', oldRealm.schemaVersion, ' new ', newRealm.schemaVersion)
    }
}