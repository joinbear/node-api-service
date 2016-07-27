/*
 Navicat Premium Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost
 Source Database       : demo

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : utf-8

 Date: 07/27/2016 17:38:45 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `demo`
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo` (
  `regin` varchar(50) DEFAULT NULL,
  `subregin` varchar(50) DEFAULT NULL,
  `trade_time` varchar(20) DEFAULT NULL,
  `custom_type` varchar(50) DEFAULT NULL,
  `custom_name` varchar(10) DEFAULT NULL,
  `custom_phone` decimal(11,0) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
