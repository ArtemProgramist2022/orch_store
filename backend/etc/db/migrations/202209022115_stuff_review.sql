-- migrate:up

CREATE TABLE stuff_review(
    id BIGSERIAl PRIMARY KEY,
    stuff_id BIGINT NOT NULL,
    review TEXT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    CONSTRAINT stuff_review_stuff_id_fkey FOREIGN KEY (stuff_id)
    REFERENCES stuff(id)
    ON DELETE CASCADE,
    CONSTRAINT stuff_review_reviewer_id_fkey FOREIGN KEY (reviewer_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- migrate:down

DROP TABLE stuff_review