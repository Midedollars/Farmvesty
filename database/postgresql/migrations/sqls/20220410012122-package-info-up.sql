/* Replace with your SQL commands */
CREATE TYPE package_status AS ENUM(
    'Available',
    'Unavailable'
);

CREATE TABLE IF NOT EXISTS package_info(
    id SERIAL PRIMARY KEY,
    package_name VARCHAR(100) NOT NULL,
    farm_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    amount_per_unit INTEGER NOT NULL,
    status package_status NOT NULL DEFAULT 'Available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);