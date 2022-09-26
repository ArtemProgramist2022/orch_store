-- migrate:up


CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


CREATE TABLE stuff (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    count_on_warehouse BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    CONSTRAINT stuff_category_id_fkey FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);

-- migrate:down

DRop TABLE categories CASCADE;
DROP TABLE stuff CASCADE;


