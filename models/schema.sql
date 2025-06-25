
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS transfers CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS bases CASCADE;


CREATE TABLE bases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  location TEXT
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  type VARCHAR(50) CHECK (type IN ('vehicle', 'ammunition', 'surveillance'))
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) CHECK (role IN ('admin', 'commander', 'logistics')),
  base_id INT REFERENCES bases(id)
);


CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  base_id INT REFERENCES bases(id),
  asset_id INT REFERENCES assets(id),
  quantity INT,
  datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  from_base_id INT REFERENCES bases(id),
  to_base_id INT REFERENCES bases(id),
  asset_id INT REFERENCES assets(id),
  quantity INT,
  datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) CHECK (status IN ('requested', 'transferred', 'accepted'))
);


CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  base_id INT REFERENCES bases(id),
  asset_id INT REFERENCES assets(id),
  personnel VARCHAR(100),
  quantity_assigned INT,
  quantity_expended INT DEFAULT 0,
  datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
