
DROP TABLE IF EXISTS TEMP;


CREATE TABLE TEMP(
  Review_id serial PRIMARY KEY,
  Rating INT NOT NULL,
  Summary VARCHAR NOT NULL,
  Recommend BOOLEAN NOT NULL,
  Reported BOOLEAN NOT NULL,
  Response TEXT NOT NULL,
  Body TEXT NOT NULL,
  "date"  VARCHAR NOT NULL,
  Reviewer_name VARCHAR(50) NOT NULL,
  Helpfulness INT NOT NULL,
  id_Product INT NOT NULL,
  Reviewer_email VARCHAR (255) NOT NULL
);

COPY temp(Review_id, id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
  ) from '/home/ubuntu/data/reviews.csv' delimiter ',' CSV header;

-- copy product(id_product) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;

INSERT INTO product (id_product)
SELECT id_product
from temp
ON CONFLICT DO NOTHING;


COPY review(Review_id, id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
  ) from '/home/ubuntu/data/reviews.csv' delimiter ',' CSV header;

--convert date from ms to actual date
ALTER TABLE Review ALTER COLUMN date TYPE TIMESTAMP USING to_timestamp(date/1000);
-- ALTER TABLE Review ALTER COLUMN date SET DATA TYPE timestamp
-- USING
--   to_timestamp(SUBSTRING(date, 1, 6), 'YYYY-MM-DD HH:MI:SS:MS');


COPY photos(id_Photos, Review_id, url
  ) from '/home/ubuntu/data/reviews_photos.csv' delimiter ',' CSV header;

drop table temp;

-- CREATE TABLE temp ( --characteristics table csv
--   id_Product_Characteristic serial PRIMARY KEY,
--   id_product INT NOT NULL,
--   Description VARCHAR(50) NOT NULL
-- );

COPY Characteristics(id_Characteristics, id_product, Description
  ) from '/home/ubuntu/data/characteristics.csv' delimiter ',' CSV header;

COPY Characteristic_Review(id_Characteristic_Review, id_Characteristics, Review_id, score
  ) from '/home/ubuntu/data/characteristic_reviews.csv' delimiter ',' CSV header;


