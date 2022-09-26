-- migrate:up


CREATE TABLE stuff_images (
    stuff_id BIGINT NOT NULL,
    stuff_link VARCHAR(255),
    CONSTRAINT stuff_id_fkey FOREIGN KEY (stuff_id)
    REFERENCES stuff(id)
    ON DELETE CASCADE
);


-- migrate:down

DROP TABLE stuff_images;
