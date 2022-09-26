-- migrate:up



CREATE TABLE stuff_in_cart (
    user_id BIGINT NOT NULL,
    stuff_id BIGINT NOT NULL,
    stuff_count BIGINT NOT NULL DEFAULT 1,
    CONSTRAINT user_cart_fkey FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT stuff_id_fkey FOREIGN KEY (stuff_id)
    REFERENCES stuff(id)
    ON DELETE CASCADE
);