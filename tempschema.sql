
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
  ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;

-- copy product(id_product) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;

INSERT INTO product (id_product)
SELECT id_product
from temp
ON CONFLICT DO NOTHING;


COPY review(Review_id, id_product,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
  ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews.csv' delimiter ',' CSV header;

--convert date from ms to actual date
ALTER TABLE Review ALTER COLUMN date TYPE TIMESTAMP USING to_timestamp(date/1000);
-- ALTER TABLE Review ALTER COLUMN date SET DATA TYPE timestamp
-- USING
--   to_timestamp(SUBSTRING(date, 1, 6), 'YYYY-MM-DD HH:MI:SS:MS');


COPY photos(id_Photos, Review_id, url
  ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/reviews_photos.csv' delimiter ',' CSV header;

drop table temp;

-- CREATE TABLE temp ( --characteristics table csv
--   id_Product_Characteristic serial PRIMARY KEY,
--   id_product INT NOT NULL,
--   Description VARCHAR(50) NOT NULL
-- );

COPY Characteristics(id_Characteristics, id_product, Description
  ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/characteristics.csv' delimiter ',' CSV header;

COPY Characteristic_Review(id_Characteristic_Review, id_Characteristics, Review_id, score
  ) from '/Users/evansding/Desktop/hackreactor precourse/SDC/Reviews SDC/data/characteristic_reviews.csv' delimiter ',' CSV header;

-- INSERT INTO Characteristics (id_Characteristics, description)
-- SELECT id_Product_Characteristic, description
-- from temp
-- ON CONFLICT DO NOTHING;

-- INSERT INTO Characteristics (Value)
-- SELECT score
-- from Characteristic_Review
-- ON CONFLICT DO NOTHING;

-- with new_order as(
-- INSERT INTO Product_Characteristic (id_Product_Characteristic, id_product)
-- SELECT id_Product_Characteristic, id_product
-- from temp
-- ON CONFLICT DO NOTHING
-- )
-- INSERT INTO Product_Characteristic (id_Characteristics)
-- SELECT id_Characteristics
-- from Characteristics
-- ON CONFLICT DO NOTHING;



-- INSERT INTO Product_Characteristic (id_Characteristics,id_Product_Characteristic, id_product)
-- SELECT Characteristics.id_Characteristics, temp.id_Product_Characteristic, temp.id_product
-- FROM Characteristics
-- INNER JOIN temp
--   on temp.id_Product_Characteristic = Characteristics.id_Characteristics
-- INNER JOIN temp
--   on temp. = Characteristics.id_Characteristics

-- ORDER BY id_Product_Characteristic;

-- INSERT INTO Product_Characteristic (id_Characteristics)
-- SELECT id_Characteristics
-- from Characteristics




-- ALTER TABLE Characteristic_Review ADD FOREIGN KEY (Review_id) REFERENCES Review (Review_id);

-- ALTER TABLE Characteristic_Review ADD FOREIGN KEY (id_Characteristics) REFERENCES Characteristics(id_Characteristics);

-- ALTER TABLE Product_Characteristic ADD FOREIGN KEY (id_Product) REFERENCES Product (id_Product);

-- ALTER TABLE Product_Characteristic ADD FOREIGN KEY (id_Characteristics) REFERENCES Characteristics(id_Characteristics);



create index idx_review_product on review(id_product);

create index idx_photos_url on photos(url);

create index idx_review_photos on photos(review_id);

create index idx_characteristic_review_review on characteristic_review(review_id);

create index idx_product_characteristic on characteristics(id_product);

create index idx_characteristic on characteristic_review(id_Characteristics);





