import { SQL, sql } from 'drizzle-orm';
import {
  AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const users = sqliteTable(
  'users',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
      () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    // emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
    emailUniqueIndex: uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  })
);

export const selectUserSchema = createSelectSchema(users).omit({
  password: true,
});

export const insertUserSchema = createInsertSchema(users, {
  firstName: (schema) => schema.firstName.min(1).max(50),
  lastName: (schema) => schema.lastName.min(1).max(50),
  email: (schema) => schema.email.email(),
  password: (schema) => schema.password.min(6),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export function lower(email: AnySQLiteColumn): SQL {
  return sql`lower(${email})`;
}

export const patchUserSchema = insertUserSchema.partial();
