CREATE DATABASE IF NOT EXISTS `dbserver` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- 步驟 1
-- --------------------------
-- 建立使用者資料表：  user --
-- --------------------------
CREATE TABLE `dbserver`.`db_user` (
  `user_id`    int(11)      UNSIGNED AUTO_INCREMENT NOT NULL COMMENT '使用者編號',
  `user_user`  varchar(32)  COLLATE utf8_unicode_ci NOT NULL COMMENT '使用者帳號',
  `user_pwd`   varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '使用者密碼',
  `user_rmb`   varchar(100) COLLATE utf8_unicode_ci COMMENT '使用者登入驗證',
  `user_ip`    varchar(100) COLLATE utf8_unicode_ci COMMENT '使用者網路地址',
  `user_img`   varchar(100) COLLATE utf8_unicode_ci DEFAULT 'avatar.jpg' COMMENT '使用者圖示',
  `user_level` tinyint(1)   DEFAULT '0' COMMENT '使用者權限',
  `user_login` timestamp    DEFAULT CURRENT_TIMESTAMP COMMENT '使用者登入時間',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_user` (`user_user`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='使用者資料表';

-- 步驟 2
-- --------------------------
-- 建立使用者資料：    user --
-- --------------------------
INSERT INTO `dbserver`.`db_user` (
  `user_user`, 
  `user_pwd`
) VALUES (
  'test',
  '$2y$10$zO0QpoMysSPRkRmCf0vI6eDRPVf6JRzscbOlUyw28DkbYzmwt.Dea'
);