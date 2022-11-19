-- migrate:up


ALTER TABLE users
    DROP COLUMN email;


ALTER TABLE users
    ADD COLUMN phone VARCHAR(255);



-- migrate:down