import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';




export const todos = pgTable("todos", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  done : boolean("false")
})
export const usersTable = pgTable('users_table', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),

});



export const authenticators = pgTable('authenticators', {
  id: text('id').primaryKey().notNull(),
  credentialID: text('credential_id').notNull().unique(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  providerAccountId: text('provider_account_id').notNull(),
  credentialPublicKey: text('credential_public_key').notNull(),
  counter: integer('counter').notNull(),
  credentialDeviceType: text('credential_device_type').notNull(),
  credentialBackedUp: boolean('credential_backed_up').notNull(),
  transports: text('transports').default(""),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;