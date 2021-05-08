DROP DATABASE IF EXISTS naboo;

CREATE DATABASE naboo;

USE naboo;
/* Table 'products' */
CREATE TABLE products (
id integer NOT NULL,
"name" varchar,
slogan varchar,
description text,
category varchar,
default_price integer,
PRIMARY KEY(id));

COMMENT ON TABLE products IS 'all the basic product info';

/* Table 'features' */
CREATE TABLE features (
id integer NOT NULL,
"productId" integer NOT NULL,
feature varchar,
"value" varchar,
PRIMARY KEY(id));

/* Table 'styles' */
CREATE TABLE styles (
id integer NOT NULL,
"productId" integer NOT NULL,
"name" varchar,
sale_price integer,
original_price integer,
default_style boolean,
PRIMARY KEY(id));

/* Table 'photos' */
CREATE TABLE photos (
id integer NOT NULL,
"styleId" integer NOT NULL,
url varchar,
thumbnail_url varchar,
PRIMARY KEY(id));

/* Table 'skus' */
CREATE TABLE skus (
id integer NOT NULL,
"styleId" integer NOT NULL,
size varchar,
quantity integer,
PRIMARY KEY(id));

/* Table 'related' */
CREATE TABLE related (
id integer NOT NULL,
current_product_id integer NOT NULL,
related_product_id integer NOT NULL,
PRIMARY KEY(id));

/* Relation 'products-features' */
ALTER TABLE features ADD CONSTRAINT "products-features"
FOREIGN KEY ("productId")
REFERENCES products(id);

/* Relation 'products-styles' */
ALTER TABLE styles ADD CONSTRAINT "products-styles"
FOREIGN KEY ("productId")
REFERENCES products(id);

/* Relation 'styles-photos' */
ALTER TABLE photos ADD CONSTRAINT "styles-photos"
FOREIGN KEY ("styleId")
REFERENCES styles(id);

/* Relation 'styles-skus' */
ALTER TABLE skus ADD CONSTRAINT "styles-skus"
FOREIGN KEY ("styleId")
REFERENCES styles(id);

/* Relation 'products-related' */
ALTER TABLE related ADD CONSTRAINT "products-related"
FOREIGN KEY (current_product_id)
REFERENCES products(id);

/* Relation 'products-related' */
ALTER TABLE related ADD CONSTRAINT "products-related"
FOREIGN KEY (related_product_id)
REFERENCES products(id);