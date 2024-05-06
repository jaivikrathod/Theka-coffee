-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2024 at 06:28 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theka_coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `Order_id` int(11) NOT NULL,
  `Stock_id` varchar(10) NOT NULL,
  `Sender_id` varchar(10) NOT NULL,
  `Reciever_id` varchar(10) NOT NULL,
  `Product_id` varchar(10) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Order_date` date NOT NULL DEFAULT current_timestamp(),
  `Due_date` date NOT NULL,
  `Shipment_date` date NOT NULL,
  `Order_status` varchar(10) NOT NULL,
  `Order_received_date` date NOT NULL,
  `Return_date` date NOT NULL,
  `Description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`Order_id`, `Stock_id`, `Sender_id`, `Reciever_id`, `Product_id`, `Quantity`, `Order_date`, `Due_date`, `Shipment_date`, `Order_status`, `Order_received_date`, `Return_date`, `Description`) VALUES
(1, '', 'SUBWM1', 'CWM1', 'COPO1', 10, '2024-04-07', '2024-04-16', '0000-00-00', 'Accepted', '0000-00-00', '0000-00-00', 'Send this Product ASAP!!..'),
(3, '', 'SUBWM1', 'CWM1', 'FFPO1', 30, '2024-04-07', '2024-04-17', '0000-00-00', 'pending', '0000-00-00', '0000-00-00', 'nothing..');

-- --------------------------------------------------------

--
-- Table structure for table `product_table`
--

CREATE TABLE `product_table` (
  `Product_id` varchar(10) NOT NULL,
  `Product_name` varchar(20) NOT NULL,
  `Product_descripiton` varchar(50) NOT NULL,
  `Expire_limit` int(3) NOT NULL,
  `category` varchar(15) NOT NULL,
  `weight` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_table`
--

INSERT INTO `product_table` (`Product_id`, `Product_name`, `Product_descripiton`, `Expire_limit`, `category`, `weight`) VALUES
('BOBO1', 'Bottle Large ', 'Large Rounded bottles', 0, 'Bottle', '50'),
('CJBR1', 'CJ_Brew', 'nothing', 10, 'Brew', '100'),
('COPO1', 'COCO powder', 'nothing', 70, 'Powder', '100'),
('FFPO1', 'FFO powder', 'nothing', 100, 'Powder', '50'),
('PTBR1', 'PT_Brew', 'nothing', 10, 'Brew', '100');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` varchar(20) NOT NULL,
  `Product_name` varchar(20) NOT NULL,
  `User_id` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `manufacture_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `supplier_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `Product_name`, `User_id`, `quantity`, `manufacture_date`, `expiry_date`, `supplier_name`) VALUES
('STCK2', 'CJ_Brew', 'CWM1', 10, '2024-04-09', '2024-04-16', 'dev'),
('STCK3', 'FFO powder', 'CWM1', 20, '2024-04-07', '2024-04-10', 'jaivik'),
('STCK5', 'COCO powder', 'CWM1', 2, '2024-04-07', '2024-04-16', 'Jaivik');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `sr_no` int(11) NOT NULL,
  `User_id` varchar(15) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Dedicated_Warehouse` varchar(20) NOT NULL,
  `Superior_Manager` varchar(20) NOT NULL,
  `First_Name` text NOT NULL,
  `Last_Name` text NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Mobile_number` varchar(10) NOT NULL,
  `User_type` text NOT NULL,
  `Date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`sr_no`, `User_id`, `Password`, `Dedicated_Warehouse`, `Superior_Manager`, `First_Name`, `Last_Name`, `Email`, `Mobile_number`, `User_type`, `Date`) VALUES
(1, 'Admin', '$2a$10$lUk0a/DZaqpkO1uXh20w3OJwI6fxun5dL4C4sRpUq6XjfntHQnLta', '-', '-', 'jitesh', 'patel', 'hitesh123@gmail.com', '9887675643', 'admin', '2024-02-02 23:15:33'),
(32, 'CWM1', '$2a$10$mFsPXx/GNPVZN263J08CfuxcNmiAlEa679x27Ck2unb9cUgF579zi', 'CWGU1', '-', 'jaivik', 'rathod', 'jaivikrathod7@gmail.com', '9173164696', 'Center warehouse manager', '2024-03-29 18:18:26'),
(68, 'CWM2', '$2a$10$A/dRIVIfLta9ZDvw6CEes.40go5vV0UcEUDVJ6eV26jP3bGEmAJW.', 'CWPU1', 'Admin', 'lav', 'Rathod', 'lav@gmail.com', '9887765443', 'Center warehouse manager', '2024-04-04 11:31:18'),
(73, 'CWM3', '$2a$10$CLR5wtG9DCYICPFCXxTmk.i9ABTDtbRcnjtc0cVcyBDvuZNHt6f2K', 'CWMA2', 'Admin', 'dev', 'valand', 's@gmail.com', '12345679', 'Center warehouse manager', '2024-04-06 16:55:15'),
(66, 'OTM1', '$2a$10$yU2qAvwZTTzgr09OFBcLpO/zJEref0IQy/b5KNLRInNkY8TCfWBXK', 'OTLVA1', 'SUBWM1', 'sufyan', 'shaikh', 's@gmail.com', '1234567891', 'Outlet manager', '2024-04-03 23:15:24'),
(75, 'OTM2', '$2a$10$/JiT3G1FlRazzRFachCiyu5bAX8H8q/i..LmuRfrwDLKXMzUTqby2', 'OTLPA1', 'SUBWM2', 'Abhay', 'Valand', 'abhay12@gmail.com', '9898786764', 'Outlet manager', '2024-04-07 01:19:20'),
(54, 'SUBWM1', '$2a$10$D.tCa3wFH0hxR/tLp5kntOtJkBQHOTWgtBJTdyITHa1hexl9CDhEq', 'SUBWAH1', 'CWM1', 'dev', 'valand', 's@gmail.com', '1234567891', 'Sub warehouse manager', '2024-03-29 23:39:10'),
(70, 'SUBWM2', '$2a$10$hjhxexalTbMXTaspNvesi./0NJ74NG4nmJBpoabkwFxKKAjXwNFpe', 'SUBWAM1', 'CWM2', 'jay', 'upadyay', 's@gmail.com', '1234567891', 'Sub warehouse manager', '2024-04-04 11:52:22');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `Warehouse_id` varchar(20) NOT NULL,
  `Warehouse_type` varchar(20) NOT NULL,
  `State` varchar(10) NOT NULL,
  `city` varchar(15) NOT NULL,
  `area` varchar(15) NOT NULL,
  `SuperiorWarehouse` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`Warehouse_id`, `Warehouse_type`, `State`, `city`, `area`, `SuperiorWarehouse`) VALUES
('CWGU1', 'Center warehouse', 'Gujarat', 'Ahmedabad', 'Iscon', ''),
('CWMA2', 'Center warehouse', 'Maharashtr', 'mumbai', 'goregao', '-'),
('CWPU1', 'Center warehouse', 'Punjab', 'Amritsar', 'Amrit Nagar', '-'),
('OTLPA1', 'Outlet', 'Punj', 'Amritsar', 'patiala', 'SUBWAM1'),
('OTLVA1', 'Outlet', 'Gujarat', 'Ahmedabad', 'vadaj', 'SUBWAH1'),
('SUBWAH1', 'Sub warehouse', 'Gujarat', 'Ahmedabas', 'Ranip', 'CWGU1'),
('SUBWAM1', 'Sub warehouse', 'Punjab', 'amritsar', 'mira road', 'CWPU1'),
('SUBWGA1', 'Sub warehouse', 'Gujarat', 'Gandhinagar', 'Sector 5', 'CWGU1'),
('SUBWSU1', 'Sub warehouse', 'Gujarat', 'Surat', 'Mandvi', 'CWGU1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `Test` (`Product_id`),
  ADD KEY `Test2` (`Sender_id`),
  ADD KEY `Test3` (`Reciever_id`);

--
-- Indexes for table `product_table`
--
ALTER TABLE `product_table`
  ADD PRIMARY KEY (`Product_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`),
  ADD UNIQUE KEY `sr_no` (`sr_no`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`Warehouse_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `sr_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Test` FOREIGN KEY (`Product_id`) REFERENCES `product_table` (`Product_id`),
  ADD CONSTRAINT `Test2` FOREIGN KEY (`Sender_id`) REFERENCES `users` (`User_id`),
  ADD CONSTRAINT `Test3` FOREIGN KEY (`Reciever_id`) REFERENCES `users` (`User_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
