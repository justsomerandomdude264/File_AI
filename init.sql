-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: fileai_db
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `fileai_db`
--

/*!40000 DROP DATABASE IF EXISTS `fileai_db`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fileai_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `fileai_db`;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `PasswordHash` varchar(64) NOT NULL,
  `PhoneNo` varchar(20) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  CONSTRAINT `auth_chk_1` CHECK ((length(`Username`) > 3)),
  CONSTRAINT `auth_chk_2` CHECK ((length(`Email`) > 3))
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (11,'abcdeawdaohawofu','abc@abc.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+90123456789'),(12,'1123121222112121212','12121212@1121212.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+910123456789'),(13,'awdawdawdaawdwdwdwdw','wdwdwwdwdw@wdwwwwd.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+121234567890'),(14,'awdawdawdawdawdwdwdwdw','wdwdwdwdwdw@eerrr.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+9801010101010'),(15,'1234567','1234567@112121.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+91234567890'),(16,'awdawdawddw','1232@2342.fr','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+981234567890'),(17,'12123232','1232@4532.yu','0e1157475ef1fc10aaf67593ca1ca33148ca93ceec4b11dcc7419adaf2d6ff06','+918765432109'),(18,'OMGOMG','omgomg@omg.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+129454288772'),(19,'abcdefgh','gyh@gyh.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+121234567890'),(20,'12IAfbifb','awfawfawb@abdaijb.canwjodnaw','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+911234567890'),(21,'qwertyqwerty','qwerty@qwerty.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+911234567890'),(22,'asdefgh','asd@asd.asd','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+911234567098'),(23,'eihfbifb','ajhwbfwb@knajfn.aifbawifbwa','19461b43bbba8a3a4da70703bda96dbc6dcdc2ee78507e34d2bf0f281932fd1f','+123456789012'),(24,'awdawaww','aadwdw@rt.gty','19461b43bbba8a3a4da70703bda96dbc6dcdc2ee78507e34d2bf0f281932fd1f','+919191919191'),(25,'awdawdwty','wwww@ry.oi','19461b43bbba8a3a4da70703bda96dbc6dcdc2ee78507e34d2bf0f281932fd1f','+987123456781'),(26,'awdde','123@ab.hu','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+121234567890'),(27,'awdadaw','awdwad@adawd.awdawd','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+123456789012'),(28,'awdawder','1223@324.er','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+198765432113'),(29,'awdawdawdwader','aawdwa4@ty.lk','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+1121234567899'),(30,'12er','12er@tr.oi','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+911234567890'),(31,'awdawdaw1','awdawdawd@awdad.awd','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+987654321012'),(32,'awdwdtr','try@34.lo','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+123456789012'),(33,'awgh','hgui@sejf.78','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+911234567890'),(34,'1234567h','hi@rt.re','19461b43bbba8a3a4da70703bda96dbc6dcdc2ee78507e34d2bf0f281932fd1f','+123456789009'),(35,'abcdef123','erf@tyu.io','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+711234567890'),(36,'123456','abc@def.gh','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+121234565890'),(37,'12345678','wef@wef.wef','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+981234567690'),(38,'example_user','example.email@example.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+119999999999'),(130,'randomdude235','randomdude235@email.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+12345665909'),(131,'beluga','beluga@email.com','8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414','+12321212112');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add auth',7,'add_auth'),(26,'Can change auth',7,'change_auth'),(27,'Can delete auth',7,'delete_auth'),(28,'Can view auth',7,'view_auth'),(29,'Can add Token',8,'add_token'),(30,'Can change Token',8,'change_token'),(31,'Can delete Token',8,'delete_token'),(32,'Can view Token',8,'view_token'),(33,'Can add Token',9,'add_tokenproxy'),(34,'Can change Token',9,'change_tokenproxy'),(35,'Can delete Token',9,'delete_tokenproxy'),(36,'Can view Token',9,'view_tokenproxy'),(37,'Can add auth token',10,'add_authtoken'),(38,'Can change auth token',10,'change_authtoken'),(39,'Can delete auth token',10,'delete_authtoken'),(40,'Can view auth token',10,'view_authtoken'),(41,'Can add auth',11,'add_auth'),(42,'Can change auth',11,'change_auth'),(43,'Can delete auth',11,'delete_auth'),(44,'Can view auth',11,'view_auth'),(45,'Can add user token auth',12,'add_usertokenauth'),(46,'Can change user token auth',12,'change_usertokenauth'),(47,'Can delete user token auth',12,'delete_usertokenauth'),(48,'Can view user token auth',12,'view_usertokenauth');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$720000$Sb6MiYJoeNcnPWLdNfymn3$tf1o3XEJ/s6aPVwVivpsJUfw8OaX1YP942q8Li04eqA=','2024-10-26 06:17:15.063656',1,'krishnapaliwal','','','krishna.plwl264@gmail.com',1,1,'2024-10-24 13:11:06.446540'),(2,'pbkdf2_sha256$720000$0XsL9IbaSJX5oIKIBGL27y$Sno9KWxAW5Q8GLv2W9pKzaItCcato41yvQ0tfbJTUN4=','2024-12-19 13:55:19.340385',1,'krishna','','','krishna.plwl264@gmail.com',1,1,'2024-12-19 13:54:51.069658');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'auth','auth'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(8,'authtoken','token'),(9,'authtoken','tokenproxy'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(11,'user_auth','auth'),(10,'user_auth','authtoken'),(12,'user_auth','usertokenauth');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-10-23 14:43:48.402608'),(2,'auth','0001_initial','2024-10-23 14:44:05.189341'),(3,'admin','0001_initial','2024-10-23 14:44:09.301351'),(4,'admin','0002_logentry_remove_auto_add','2024-10-23 14:44:09.399369'),(5,'admin','0003_logentry_add_action_flag_choices','2024-10-23 14:44:09.540067'),(6,'contenttypes','0002_remove_content_type_name','2024-10-23 14:44:11.114340'),(7,'auth','0002_alter_permission_name_max_length','2024-10-23 14:44:12.933748'),(8,'auth','0003_alter_user_email_max_length','2024-10-23 14:44:13.275319'),(9,'auth','0004_alter_user_username_opts','2024-10-23 14:44:13.387499'),(10,'auth','0005_alter_user_last_login_null','2024-10-23 14:44:14.764852'),(11,'auth','0006_require_contenttypes_0002','2024-10-23 14:44:14.898008'),(12,'auth','0007_alter_validators_add_error_messages','2024-10-23 14:44:14.977451'),(13,'auth','0008_alter_user_username_max_length','2024-10-23 14:44:18.040826'),(14,'auth','0009_alter_user_last_name_max_length','2024-10-23 14:44:20.049661'),(15,'auth','0010_alter_group_name_max_length','2024-10-23 14:44:20.421976'),(16,'auth','0011_update_proxy_permissions','2024-10-23 14:44:20.620658'),(17,'auth','0012_alter_user_first_name_max_length','2024-10-23 14:44:22.846583'),(18,'sessions','0001_initial','2024-10-23 14:44:23.818267'),(19,'auth','0013_auth','2024-10-24 14:17:39.750945'),(20,'auth','0014_alter_auth_options','2024-10-24 14:17:40.145698'),(21,'authtoken','0001_initial','2024-10-26 08:21:55.040066'),(22,'authtoken','0002_auto_20160226_1747','2024-10-26 08:21:55.165417'),(23,'authtoken','0003_tokenproxy','2024-10-26 08:21:55.236046'),(24,'authtoken','0004_alter_tokenproxy_options','2024-10-26 08:21:55.300854'),(25,'auth','0015_delete_auth','2024-10-26 08:54:30.750502'),(26,'user_auth','0001_initial','2024-10-26 08:54:33.703876'),(27,'user_auth','0002_usertokenauth_delete_authtoken','2024-10-26 11:22:07.192378'),(28,'user_auth','0003_alter_auth_table_alter_usertokenauth_table','2024-12-19 14:09:31.567732'),(29,'user_auth','0004_alter_auth_table_alter_usertokenauth_table','2024-12-19 14:09:31.693219'),(30,'user_auth','0005_alter_auth_options_alter_usertokenauth_options','2025-03-23 07:57:34.754500');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('7dd0iwfxpj6hu2i22ip4unj457dtdnxx','.eJxVjDsOwyAQBe9CHSHAmE_K9D4D2oUlOIlAMnYV5e6xJRdJ-2bmvVmAbS1h67SEObErU-zyuyHEJ9UDpAfUe-Ox1XWZkR8KP2nnU0v0up3u30GBXvYaZJQmOsjOe5RqsBnRWkpgsvJkvFM4uEy7oCEbEjqOwuRBWuFGcFqyzxf8fzgX:1tOGzn:j8tatPcFZZ7L-cE39GpBm3n7sCzHrNJo4uLGESD8CzU','2025-01-02 13:55:19.727035'),('avaaexyoe6w3ykp4ctzogcpi3zbhdxp0','.eJxVjDsOwjAQBe_iGln-s6ak5wzWetfgALKlOKkQd4dIKaB9M_NeIuG61LSOMqeJxUlocfjdMtKjtA3wHdutS-ptmacsN0XudMhL5_I87-7fQcVRv7VRwWSwkQJmtlqbYkLEKzOgiyUweOeyJWC2GNXRGxMJQiZFgBQ9iPcH3fc33A:1t4a6t:x8YA50Rs08UtWjwG3lTDvIpYkjZKfGv4jdc_x1BTbC4','2024-11-09 06:17:15.260807'),('m1hib82c6473hgmrv8iji7rlb8bj22hq','.eJxVjDsOwjAQBe_iGln-s6ak5wzWetfgALKlOKkQd4dIKaB9M_NeIuG61LSOMqeJxUlocfjdMtKjtA3wHdutS-ptmacsN0XudMhL5_I87-7fQcVRv7VRwWSwkQJmtlqbYkLEKzOgiyUweOeyJWC2GNXRGxMJQiZFgBQ9iPcH3fc33A:1t3xch:aF7_oilusR5Wrb4bdTvKqx4DsRyEznZ-00-db8urp9c','2024-11-07 13:11:31.326730');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertokenauth`
--

DROP TABLE IF EXISTS `usertokenauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertokenauth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(40) NOT NULL,
  `user_id` int NOT NULL,
  `request_count` int DEFAULT '0',
  `last_request_date` date DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `OTP` int DEFAULT NULL,
  `EmailVerified` tinyint(1) DEFAULT '0',
  `PhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `usertokenauth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth` (`UserID`) ON DELETE CASCADE,
  CONSTRAINT `usertokenauth_chk_1` CHECK ((`OTP` > 1000000)),
  CONSTRAINT `usertokenauth_chk_2` CHECK ((`OTP` < 9999999))
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertokenauth`
--

LOCK TABLES `usertokenauth` WRITE;
/*!40000 ALTER TABLE `usertokenauth` DISABLE KEYS */;
INSERT INTO `usertokenauth` VALUES (22,'aMCtpQlLqGGR3P9jbzTtTXioDgA',11,0,NULL,'2024-12-02 00:54:24',NULL,0,0),(23,'ZkZxnRg0XfsAOm3Rhk_gQj92b2Q',12,0,NULL,'2024-12-02 00:56:18',NULL,0,0),(24,'Cnu-8PgSEOIJpgJ5ry5wSXvjfPE',13,0,NULL,'2024-12-02 01:03:29',NULL,0,0),(25,'Flzm-XhLnZlNLze-7xZA0dk5UVo',14,0,NULL,'2024-12-02 01:04:31',1234567,0,0),(26,'4eU_0CNVJ_q7nMtsnKKyDENoFyk',15,0,NULL,'2024-12-02 01:05:23',1234567,0,0),(27,'oV1MS-KoVQAwVE2dWPduuMd53yk',16,0,NULL,'2024-12-02 01:09:08',1234567,0,0),(34,'cjv1MWWnn_GH5GlD42EK8iG6SOw',19,0,NULL,'2024-12-07 09:33:10',1234567,0,0),(35,'iPrcCX5rkclJdAWJS0xPpBqGjpM',20,0,NULL,'2024-12-07 09:36:36',1234567,0,0),(38,'yLoayY96cs7ldfu-5I2MT17JeUE',23,0,NULL,'2024-12-08 04:23:58',1234567,0,0),(39,'fD_TT9NIdvP68GvhzztsCJKUQyU',24,0,NULL,'2024-12-08 04:27:32',1234567,0,0),(41,'4oBDc9CHKRfLIfxHNAmyqRuklE8',26,0,NULL,'2024-12-08 04:43:18',1234567,0,0),(42,'TZNZkvZWEv6EHd_9BqnK3S0YlF4',27,0,NULL,'2024-12-08 04:50:17',1234567,0,0),(43,'m6Wk_dLxiouN-litxavLx8XIMjA',28,0,NULL,'2024-12-08 04:52:47',NULL,0,0),(44,'8OFbe7F9TAO8_roG7xDB0i-ZUsQ',29,0,NULL,'2024-12-08 04:53:31',1234567,0,0),(45,'aPKlFnZTGJpvfakp52qcWLZI-Kk',30,0,NULL,'2024-12-08 04:58:35',1234567,0,0),(46,'4N3mI5Q_EJkf1ktsdRxv8vjOQms',31,0,NULL,'2024-12-08 05:13:01',1234567,0,0);
/*!40000 ALTER TABLE `usertokenauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `fileai_test`
--

/*!40000 DROP DATABASE IF EXISTS `fileai_test`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fileai_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `fileai_test`;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `PasswordHash` varchar(64) NOT NULL,
  `PhoneNo` varchar(20) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`),
  CONSTRAINT `auth_chk_1` CHECK ((length(`Username`) > 3)),
  CONSTRAINT `auth_chk_2` CHECK ((length(`Email`) > 3))
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertokenauth`
--

DROP TABLE IF EXISTS `usertokenauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertokenauth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(40) NOT NULL,
  `user_id` int NOT NULL,
  `request_count` int DEFAULT '0',
  `last_request_date` date DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `OTP` int DEFAULT NULL,
  `EmailVerified` tinyint(1) DEFAULT '0',
  `PhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `usertokenauth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth` (`UserID`) ON DELETE CASCADE,
  CONSTRAINT `usertokenauth_chk_1` CHECK ((`OTP` > 1000000)),
  CONSTRAINT `usertokenauth_chk_2` CHECK ((`OTP` < 9999999))
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertokenauth`
--

LOCK TABLES `usertokenauth` WRITE;
/*!40000 ALTER TABLE `usertokenauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertokenauth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-23 16:52:39
