import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const todos = sqliteTable('tasks', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    isCompleted: integer('is_completed', { mode: 'boolean' })
        .notNull()
        .default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
        () => new Date()
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});

export const selectTaskSchema = createSelectSchema(todos);
export const insertTaskSchema = createInsertSchema(todos, {
    name: (schema) => schema.name.min(1),
})
    .required({
        isCompleted: true,
    })
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    });
