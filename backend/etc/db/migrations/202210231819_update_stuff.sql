-- migrate:up


ALTER TABLE stuff
    ADD COLUMN stuff_link VARCHAR(255);


-- migrate:down