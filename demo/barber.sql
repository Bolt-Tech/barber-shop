-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2021 at 02:00 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barber`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `first_name` varchar(22) NOT NULL,
  `last_name` varchar(22) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Jackie', 'Maram', 'jackie@hotmail.com', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(2, 'Levi', 'Mikas', 'levi@git.com', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `time` varchar(6) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `time`, `customer_id`, `available`) VALUES
(1, '09:00', 15, 0),
(2, '10:00', 16, 0),
(3, '11:00', NULL, 1),
(4, '12:00', 11, 0),
(5, '13:00', NULL, 1),
(6, '14:00', NULL, 1),
(7, '15:00', NULL, 1),
(8, '16:00', NULL, 1),
(9, '17:00', 4, 0),
(10, '18:00', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(22) NOT NULL,
  `last_name` varchar(22) NOT NULL,
  `email` varchar(25) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone`, `password`) VALUES
(1, 'Muli', 'Levi', 'muli@hotmail.com', '0528977859', '$2a$10$XUxQzZvL6Ktkc/eb0mDU4uCWOh/mpeCqGV/CMZb101fKNCzHyTvG2'),
(2, 'George', 'Winston', 'georgewinstone@gmail.com', '0543388598', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(3, 'Jack', 'Fisher', 'jack@gmail.com', '058984532', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(4, 'Jackie', 'Fisher', 'jackie@gmail.com', '058984538', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(5, 'Jane', 'Fisher', 'jane@hotmail.com', '0597898758', '$2a$10$3AYADkCaGeqm7BtkARqbTOARcD.a9DeWk.MOKTNW8Lj33DNrjN1na'),
(6, 'Peter', 'Parker', 'parker@gmail.com', '05987546', '$2a$10$EkUpa94uJsO/hf7/4jVBEedHaeWj83VZMuM5gxrucnquIk8U4MKe2'),
(7, 'Alen', 'Max', 'alen@github.com', '0579856325', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(11, 'Mastery', 'Merry', 'mastery@hotmail.com', '036986343434', '$2a$10$jQxOE.QQaedn5qxBkiZSh.9CWZiwZZHniUyFj2IJlrks6SDN/l3L6'),
(12, 'Earl', 'Johson', 'earl@maky.com', '056987856', '$2a$10$kE/NwtkxUgAUCel3JKKFMuYXv72ZCxUz5OWnaxGWW5YT7sAH1srZC'),
(13, 'Pooly', 'johson', 'pooly@yahoo.com', '05139875', '$2a$10$XUxQzZvL6Ktkc/eb0mDU4uCWOh/mpeCqGV/CMZb101fKNCzHyTvG2'),
(15, 'Adam', 'Every', 'adam@gmail.com', '054213698', '$2a$10$z.nud5pNLFZyL4MQVgva2uWwUKIqdYs3vl1vVcPUQhPtoMtEwU.4y'),
(16, 'Mul', 'Muly', 'mul@yahoo.com', '05498521', '$2a$10$zYQX0bTQALkbWtuAX3avyusK1kqyE222b1.8VEE6NHSN31NwDTXQG'),
(17, 'Brack', 'Bracky', 'brack@gmail.com', '05489785', '$2a$10$Zs3uUx2FmlsN7ra7hfjGY..XKuaWbueLn7a5Gp8terIoCcRE2ssri');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
