-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Product'
--
-- ---

DROP TABLE IF EXISTS `Product`;

CREATE TABLE `Product` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Page` INTEGER NULL DEFAULT NULL,
  `Count` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Review'
--
-- ---

DROP TABLE IF EXISTS `Review`;

CREATE TABLE `Review` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Rating` INTEGER NULL DEFAULT NULL,
  `Summary` VARCHAR NULL DEFAULT NULL,
  `Recommend` BINARY NULL DEFAULT NULL,
  `Response` MEDIUMTEXT NULL DEFAULT NULL,
  `Body` VARCHAR NULL DEFAULT NULL,
  `Date` VARCHAR NULL DEFAULT NULL,
  `Reviewer_name` INTEGER NULL DEFAULT NULL,
  `Helpfulness` TINYINT NULL DEFAULT NULL,
  `id_Product` INTEGER NULL DEFAULT NULL,
  `id_User` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Review` INTEGER NULL DEFAULT NULL,
  `url` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Ratings'
--
-- ---

DROP TABLE IF EXISTS `Ratings`;

CREATE TABLE `Ratings` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Product` INTEGER NULL DEFAULT NULL,
  `id_Number` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Recommended Items'
--
-- ---

DROP TABLE IF EXISTS `Recommended Items`;

CREATE TABLE `Recommended Items` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_Product` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS `Characteristics`;

CREATE TABLE `Characteristics` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Current_Size` VARCHAR NULL DEFAULT NULL,
  `Current_Comfort` VARCHAR NULL DEFAULT NULL,
  `Current Width` VARCHAR NULL DEFAULT NULL,
  `id_Product` INTEGER NULL DEFAULT NULL,
  `id_Review` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Size'
--
-- ---

DROP TABLE IF EXISTS `Size`;

CREATE TABLE `Size` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Value` VARCHAR NULL DEFAULT NULL,
  `id_Characteristics` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Width'
--
-- ---

DROP TABLE IF EXISTS `Width`;

CREATE TABLE `Width` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Value` VARCHAR NULL DEFAULT NULL,
  `id_Characteristics` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Comfort'
--
-- ---

DROP TABLE IF EXISTS `Comfort`;

CREATE TABLE `Comfort` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Value` VARCHAR NULL DEFAULT NULL,
  `id_Characteristics` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'User'
--
-- ---

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Email` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Number'
--
-- ---

DROP TABLE IF EXISTS `Number`;

CREATE TABLE `Number` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Rate` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Review` ADD FOREIGN KEY (id_Product) REFERENCES `Product` (`id`);
ALTER TABLE `Review` ADD FOREIGN KEY (id_User) REFERENCES `User` (`id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (id_Review) REFERENCES `Review` (`id`);
ALTER TABLE `Ratings` ADD FOREIGN KEY (id_Product) REFERENCES `Product` (`id`);
ALTER TABLE `Ratings` ADD FOREIGN KEY (id_Number) REFERENCES `Number` (`id`);
ALTER TABLE `Recommended Items` ADD FOREIGN KEY (id_Product) REFERENCES `Product` (`id`);
ALTER TABLE `Characteristics` ADD FOREIGN KEY (id_Product) REFERENCES `Product` (`id`);
ALTER TABLE `Characteristics` ADD FOREIGN KEY (id_Review) REFERENCES `Review` (`id`);
ALTER TABLE `Size` ADD FOREIGN KEY (id_Characteristics) REFERENCES `Characteristics` (`id`);
ALTER TABLE `Width` ADD FOREIGN KEY (id_Characteristics) REFERENCES `Characteristics` (`id`);
ALTER TABLE `Comfort` ADD FOREIGN KEY (id_Characteristics) REFERENCES `Characteristics` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Ratings` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Recommended Items` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Characteristics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Size` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Width` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Comfort` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Number` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Product` (`id`,`Page`,`Count`) VALUES
-- ('','','');
-- INSERT INTO `Review` (`id`,`Rating`,`Summary`,`Recommend`,`Response`,`Body`,`Date`,`Reviewer_name`,`Helpfulness`,`id_Product`,`id_User`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `Photos` (`id`,`id_Review`,`url`) VALUES
-- ('','','');
-- INSERT INTO `Ratings` (`id`,`id_Product`,`id_Number`) VALUES
-- ('','','');
-- INSERT INTO `Recommended Items` (`id`,`id_Product`) VALUES
-- ('','');
-- INSERT INTO `Characteristics` (`id`,`Current_Size`,`Current_Comfort`,`Current Width`,`id_Product`,`id_Review`) VALUES
-- ('','','','','','');
-- INSERT INTO `Size` (`id`,`Value`,`id_Characteristics`) VALUES
-- ('','','');
-- INSERT INTO `Width` (`id`,`Value`,`id_Characteristics`) VALUES
-- ('','','');
-- INSERT INTO `Comfort` (`id`,`Value`,`id_Characteristics`) VALUES
-- ('','','');
-- INSERT INTO `User` (`id`,`Email`) VALUES
-- ('','');
-- INSERT INTO `Number` (`id`,`Rate`) VALUES
-- ('','');