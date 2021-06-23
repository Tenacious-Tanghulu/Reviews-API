-- ---
-- Globals
-- ---

-- SET SQL_MODE=NO_AUTO_VALUE_ON_ZERO;
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---


DROP TABLE IF EXISTS Product;

CREATE TABLE Product (
  id_Product serial PRIMARY KEY
);

-- ---
-- Table 'Review'
--
-- ---

DROP TABLE IF EXISTS Review;

CREATE TABLE Review (
  id_Review serial PRIMARY KEY,
  Rating INT NOT NULL,
  Summary VARCHAR NOT NULL,
  Recommend BOOLEAN NOT NULL,
  Response TEXT NOT NULL,
  Body TEXT  NOT NULL,
  Posting_date DATE NOT NULL DEFAULT CURRENT_DATE
  Reviewer_name VARCHAR(50) NOT NULL,
  Helpfulness INT NOT NULL,
  id_Product INT NOT NULL,
  Email VARCHAR (255) UNIQUE NOT NULL,
  FOREIGN KEY (id_Product)
  REFERENCES Product (id_Product)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id_Photos serial PRIMARY KEY,
  id_Review INT NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (id_Review)
  REFERENCES Review (id_Review)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS Characteristics;

CREATE TABLE Characteristics (
  id_Characteristics serial PRIMARY KEY,
  Description VARCHAR NOT NULL,
  Value VARCHAR(50) NOT NULL
);

-- ---
-- Table 'Product Characteristic'
--
-- ---

DROP TABLE IF EXISTS Product_Characteristic;

CREATE TABLE Product_Characteristic (
  id_Product_Characteristic serial PRIMARY KEY,
  id_Product INT NOT NULL,
  id_Characteristics INT NOT NULL,
  FOREIGN KEY (id_Product)
  REFERENCES Product (id_Product),
  FOREIGN KEY (id_Characteristics)
  REFERENCES Characteristics (id_Characteristics)
);


-- ---
-- Table 'Characteristic Review'
--
-- ---

DROP TABLE IF EXISTS Characteristic_Review;

CREATE TABLE Characteristic_Review (
  id_Characteristic_Review serial PRIMARY KEY,
  id_Review INT NOT NULL,
  id_Characteristics INT NOT NULL,
  Score VARCHAR(50) NOT NULL,
  FOREIGN KEY (id_Review)
  REFERENCES Review (id_Review),
  FOREIGN KEY (id_Characteristics)
  REFERENCES Characteristics (id_Characteristics)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE Review ADD FOREIGN KEY (id_Product) REFERENCES Product (id);
-- ALTER TABLE Photos ADD FOREIGN KEY (id_Review) REFERENCES Review (id);
-- ALTER TABLE Characteristics ADD FOREIGN KEY (id_Review) REFERENCES Review (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Product ENGINE=InnoDB NOT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Review ENGINE=InnoDB NOT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Photos ENGINE=InnoDB NOT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Characteristics ENGINE=InnoDB NOT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Product (id) VALUES
-- ('');
-- INSERT INTO Review (id,Rating,Summary,Recommend,Response,Body,Date,Reviewer_name,Helpfulness,id_Product,Email) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO Photos (id,id_Review,url) VALUES
-- ('','','');
-- INSERT INTO Characteristics (id,Description,Value,id_Review) VALUES
-- ('','','','');