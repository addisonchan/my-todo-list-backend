-- Create a Todos table in a PostgreSQL database with the following columns in the db named postgres:
-- id: a unique identifier for each todo
-- text: the description text of the todo
-- isDone: a boolean indicating whether the todo is completed or not

CREATE TABLE todos (
    "id" VARCHAR(255) PRIMARY KEY,
    "text" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL
);