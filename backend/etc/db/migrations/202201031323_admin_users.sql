--migrate:up


create TABLE admin_users (
    user_id INTEGER,
    en BOOLEAN DEFAULT true,
    ctime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (now() at time zone 'utc'),
    atime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    dtime TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL
);

create index admin_users_user_id_en on admin_users(user_id, en);
alter table admin_users
    add CONSTRAINT admin_users_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON delete CASCADE;


--migrate:down


drop table admin_users;