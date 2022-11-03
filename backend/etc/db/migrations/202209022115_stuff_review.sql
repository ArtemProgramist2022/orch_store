-- migrate:up

CREATE TABLE stuff_review(
    id BIGSERIAl PRIMARY KEY,
    en BOOLEAN NOT NULL DEFAULT true,
    stuff_id BIGINT NOT NULL,
    review TEXT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    ctime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (NOW() at time zone 'utc'),
    atime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    dtime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    CONSTRAINT stuff_review_stuff_id_fkey FOREIGN KEY (stuff_id)
    REFERENCES stuff(id)
    ON DELETE CASCADE,
    CONSTRAINT stuff_review_reviewer_id_fkey FOREIGN KEY (reviewer_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- migrate:down

DROP TABLE stuff_review