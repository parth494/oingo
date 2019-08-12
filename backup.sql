-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `commentid` varchar(40) NOT NULL,
  `noteid` varchar(40) NOT NULL,
  `userid` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentid`),
  KEY `comments_fk0` (`noteid`),
  KEY `comments_fk1` (`userid`),
  CONSTRAINT `comments_fk0` FOREIGN KEY (`noteid`) REFERENCES `notes` (`noteid`),
  CONSTRAINT `comments_fk1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('2d8e6280-fb58-11e8-bffd-c34a6beba284','ca189cd0-fb56-11e8-a9d3-152200c62c57','ea29d950-fb40-11e8-91d3-03c382bf3182','Hey','2018-12-09 02:14:37','2018-12-09 02:14:37'),('7b9953e0-fb58-11e8-b9a6-114e5e9356a9','ca189cd0-fb56-11e8-a9d3-152200c62c57','ea29d950-fb40-11e8-91d3-03c382bf3182','Me too here at 6 Metro','2018-12-09 02:16:48','2018-12-09 02:16:48');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filters`
--

DROP TABLE IF EXISTS `filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filters` (
  `filterid` varchar(40) NOT NULL,
  `userid` varchar(40) NOT NULL,
  `stateid` varchar(40) DEFAULT NULL,
  `visibility` enum('me','friends','all') DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `radius` int(3) DEFAULT NULL,
  `scheduleid` varchar(40) DEFAULT NULL,
  `tagid` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`filterid`),
  KEY `filters_fk0` (`userid`),
  KEY `filters_fk1` (`stateid`),
  KEY `filters_fk2` (`scheduleid`),
  KEY `filters_fk3` (`tagid`),
  CONSTRAINT `filters_fk0` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `filters_fk1` FOREIGN KEY (`stateid`) REFERENCES `states` (`stateid`),
  CONSTRAINT `filters_fk2` FOREIGN KEY (`scheduleid`) REFERENCES `schedules` (`scheduleid`),
  CONSTRAINT `filters_fk3` FOREIGN KEY (`tagid`) REFERENCES `tags` (`tagid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filters`
--

LOCK TABLES `filters` WRITE;
/*!40000 ALTER TABLE `filters` DISABLE KEYS */;
/*!40000 ALTER TABLE `filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `friendid` varchar(40) NOT NULL,
  `user1` varchar(40) NOT NULL,
  `user2` varchar(40) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`friendid`),
  KEY `friends_fk0` (`user1`),
  KEY `friends_fk1` (`user2`),
  CONSTRAINT `friends_fk0` FOREIGN KEY (`user1`) REFERENCES `users` (`userid`),
  CONSTRAINT `friends_fk1` FOREIGN KEY (`user2`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_tag`
--

DROP TABLE IF EXISTS `note_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note_tag` (
  `noteid` varchar(40) NOT NULL,
  `tagid` varchar(40) NOT NULL,
  PRIMARY KEY (`noteid`,`tagid`),
  KEY `note_tag_fk1` (`tagid`),
  CONSTRAINT `note_tag_fk0` FOREIGN KEY (`noteid`) REFERENCES `notes` (`noteid`),
  CONSTRAINT `note_tag_fk1` FOREIGN KEY (`tagid`) REFERENCES `tags` (`tagid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_tag`
--

LOCK TABLES `note_tag` WRITE;
/*!40000 ALTER TABLE `note_tag` DISABLE KEYS */;
INSERT INTO `note_tag` VALUES ('5c4728d1-fb46-11e8-8863-2b278443033e','29168ab0-f0ff-11e8-a3ff-f34d35dbfac1'),('c3a51771-fb42-11e8-9a3c-8b9317d75dc6','29168ab0-f0ff-11e8-a3ff-f34d35dbfac1'),('ca189cd0-fb56-11e8-a9d3-152200c62c57','29168ab0-f0ff-11e8-a3ff-f34d35dbfac1'),('e6984190-fb55-11e8-b2c6-4f0b9d35c174','29168ab0-f0ff-11e8-a3ff-f34d35dbfac1'),('5c4728d1-fb46-11e8-8863-2b278443033e','dcb8a170-f43d-11e8-a8c7-f12240d03e54'),('ca189cd0-fb56-11e8-a9d3-152200c62c57','dcb8a170-f43d-11e8-a8c7-f12240d03e54');
/*!40000 ALTER TABLE `note_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `noteid` varchar(40) NOT NULL,
  `userid` varchar(40) NOT NULL,
  `title` varchar(140) NOT NULL,
  `description` text NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `radius` int(3) NOT NULL,
  `scheduleid` varchar(40) NOT NULL,
  `visibility` enum('me','friends','all') NOT NULL,
  `allowcomment` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`noteid`),
  KEY `notes_fk0` (`userid`),
  KEY `notes_fk1` (`scheduleid`),
  CONSTRAINT `notes_fk0` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `notes_fk1` FOREIGN KEY (`scheduleid`) REFERENCES `schedules` (`scheduleid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES ('5c4728d1-fb46-11e8-8863-2b278443033e','ea29d950-fb40-11e8-91d3-03c382bf3182','Creating note at Dibner ','I am here at Dibner',40.69476883,-73.98588517,20,'5c4728d0-fb46-11e8-8863-2b278443033e','all',1,'2018-12-09 00:07:05','2018-12-09 00:07:05'),('c3a51771-fb42-11e8-9a3c-8b9317d75dc6','ea29d950-fb40-11e8-91d3-03c382bf3182','First note from home','Hey, I am creating a note to tag my house in Bayridge using locate Me. Please comment guys!',40.61747800,-74.02412520,10,'c3a51770-fb42-11e8-9a3c-8b9317d75dc6','all',1,'2018-12-08 23:41:20','2018-12-08 23:41:20'),('ca189cd0-fb56-11e8-a9d3-152200c62c57','ea29d950-fb40-11e8-91d3-03c382bf3182','Another note at 6 Metrotech','Rogers hall here and near to library',40.69420793,-73.98657918,9,'ca173d40-fb56-11e8-a9d3-152200c62c57','all',1,'2018-12-09 02:04:41','2018-12-09 02:04:41'),('e6984190-fb55-11e8-b2c6-4f0b9d35c174','ea29d950-fb40-11e8-91d3-03c382bf3182','No Comment allowed','Hey, this note at 88th St cannot be commented',40.61747800,-74.02412520,2,'e697cc60-fb55-11e8-b2c6-4f0b9d35c174','all',0,'2018-12-09 01:58:19','2018-12-09 01:58:19');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `scheduleid` varchar(40) NOT NULL,
  `type` enum('daily','weekly','monthly','custom') NOT NULL,
  `frequency` int(3) NOT NULL,
  `day` varchar(30) DEFAULT NULL,
  `starttime` time NOT NULL,
  `endtime` time NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`scheduleid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES ('5c4728d0-fb46-11e8-8863-2b278443033e','weekly',2,'2','00:00:00','23:59:59','2018-12-02','2018-12-30','2018-12-09 00:07:04','2018-12-09 00:07:04'),('c3a51770-fb42-11e8-9a3c-8b9317d75dc6','weekly',1,'1,2,3,4,5,6','00:00:00','23:59:59','2018-12-09','2018-12-15','2018-12-08 23:41:20','2018-12-08 23:41:20'),('ca173d40-fb56-11e8-a9d3-152200c62c57','weekly',1,'1','00:00:00','23:59:59','2018-12-04','2018-12-28','2018-12-09 02:04:41','2018-12-09 02:04:41'),('e697cc60-fb55-11e8-b2c6-4f0b9d35c174','weekly',2,'2','00:00:00','23:59:59','2018-12-09','2018-12-11','2018-12-09 01:58:19','2018-12-09 01:58:19');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('HRM1gXGzI9_gVbe2-02kgUSw9lLFZe8F',1544459689,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"sessId\":null,\"username\":null,\"current_date\":\"2018-12-07\",\"current_time\":\"12:02:01\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `stateid` varchar(40) NOT NULL,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`stateid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES ('1e921980-f102-11e8-b017-29c4b4ddf6dc','At home');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `tagid` varchar(40) NOT NULL,
  `tagname` varchar(30) NOT NULL,
  `suggested` tinyint(1) NOT NULL,
  PRIMARY KEY (`tagid`),
  UNIQUE KEY `tagname` (`tagname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('172641b0-f0ff-11e8-a2a8-5b6fc9dd7103','manhattan',1),('29168ab0-f0ff-11e8-a3ff-f34d35dbfac1','brooklyn',1),('dcb8a170-f43d-11e8-a8c7-f12240d03e54','library',0);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_location`
--

DROP TABLE IF EXISTS `user_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_location` (
  `userid` varchar(40) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  PRIMARY KEY (`userid`,`timestamp`),
  CONSTRAINT `user_location_fk0` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_location`
--

LOCK TABLES `user_location` WRITE;
/*!40000 ALTER TABLE `user_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` varchar(40) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` char(32) NOT NULL,
  `current_state` varchar(40) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  KEY `users_fk0` (`current_state`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ea29d950-fb40-11e8-91d3-03c382bf3182','Parth Shah','pjs520@nyu.edu','ce74d2ef1c4ba01b76843330820a7f11','1e921980-f102-11e8-b017-29c4b4ddf6dc',40.61747800,-74.02412520,'2018-12-09 03:55:34','2018-12-09 03:55:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-09 23:18:35
