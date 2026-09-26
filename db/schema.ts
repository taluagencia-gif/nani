import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const products = sqliteTable('products', { id: text('id').primaryKey(), data: text('data').notNull() });
export const settings = sqliteTable('settings', { key: text('key').primaryKey(), value: text('value').notNull() });
