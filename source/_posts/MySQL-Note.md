---
title: MySQL Note
date: 2017-02-10 18:46:49
categories: Note
---

<center>
開篇謎之音：...... 寒假一直開坑，卻一直沒好好填。
之前想寫個 OJ 所以才接觸 MySQL，但一碰 MySQL 後 OJ 卻沒甚麼動力去玩了。
一切都靜止下來了。
一年後，突然想起，才在這裡慢慢填，主要是 [w3school](http://www.w3schools.com/sql/default.asp) 的筆記。
利益相關：老爸是寫 ERP 管理資料庫的，然後他老人家表示現在都用 stored procedure 了。
</center>

<!-- more -->

## 環境配置

還是在 Cygwin 上，相關辦法可以參考不才的[這篇](http://no8dyzxc.pixnet.net/blog/post/103827086)。
練習的 database 就用 [w3school](http://www.w3schools.com/sql/default.asp) 教的 [northwind](https://github.com/dalers/mywind) 吧。
```bash
git clone https://github.com/dalers/mywind.git
cat northwind.sql | mysql -u root -p
cat northwind-default-current-timestamp.sql | mysql -u root -p
cat northwind-data.sql | mysql -u root -p
# -u 引數看你的配置
```

## 筆 (ㄉㄨㄟ) 記 (ㄐㄧ) 開始

* create , show
```sql
-- create database db_name;
create database test;

-- create table tb_name (column_1 data_type [constraint], ...)
-- use test;
-- create table custs;

create table test.custs
(
 id int ,
 name varchar(255) ,
 addr varchar(255) ,
 city(255)
);

show databases;
show tables;

-- add constraints
// 1.
alter table tb_name
add constraint constraint_var_name constraint_type (cond | col_x)
[references table_name(col_name)] -- foreign key
alter table tb_name
// 2.
add constraint_type (col_x) -- () is important

-- add default
alter table tb_name
alter col_x set default val

-- drop constraints
alter table tb_name
drop [index constraint_var_name | index col_x | primary_key |
      foreign key col_x | check col_x ]

-- drop default
alter table tb_name
alter col_x drop default
```
* constraint list
  * **not null**      - col can't be null
  * **unique**        - row for col must be unique
  * **primary key**   - not null union unique
  * **foreign key**   - ensure the key must exist in other table
  (ex: In order table have a foreign key customer , refers to customers table)
  * **check** (cond)  - check the condtition
  * **default** (val) - assign the default val to col


* comment
```sql
-- it's a comment , MySQL 3.23.3 supports ,
-- I like the style becuase it likes haskell

#  it's also a comment

/* inline comment */

/*
multiple line
comments
*/
```

* select [columns] from [database]
```sql
select * from customers;
select city from customers;
```

* distinct
```sql
-- distinct the entry
select distinct city from customers;
```

* where [column] [value]
```sql
select company from customers where id < 10;
```
|    op      |   example   | note |
|:----------:|:-----------:|:----:|
|`=`         |||
|`<>`[or`!=`]|||
|`>`         |||
|`>=`        |||
|`<`         |||
|`<=`        |||
|`between`   | select id , company from customers where id between 3 and 9 ||
|`like`      | select id , city from customers where city like 'M%'; | `%` [通配符](#wildcard) |
|`in`        | select * from customers where id in (1 , 2 , 3 , 4) ||
|`not`       |||
|`and`       |||
|`or`        ||||

* order by [column] [asc|desc] , [column] [asc|desc]
```sql
select id , company from customers order by id asc;
```

* insert into
```sql
insert into strings values (1 , "String for id 1");
insert into strings (string_id) values (115)
```

* update
```sql
-- revise value in entry
update strings
set string_data = 'revised string_data'
where string_id = 1;
-- 注意要下 where 條件，不然會都改，和 where 1 = 1 一樣啦。
```

* delete
```sql
-- delete entry
delete from strings where string_id = 1;
-- 注意要下 where 條件，不然會都刪，和 where 1 = 1 一樣啦。
```

* limit
```sql
-- MySQL
select * from strings limit 10

-- Oracle
select * from strings where rownum <= 10

-- MS Access
select top 10 * from strings
```
<a name="wildcard" id="wildcard"></a>
* wildcard

| wildcard | meaning |
|:--------:|:-------:|
|   `%`    | likes `*` in shell |
|   `_`    | likes `?` in shell |
|   `[]`   | likes the char set that scanf supports |
|`[!]` or `[^]` | same as above ||

* alias
```sql
select id as sn from customers;
select c.id from customers as c;
```

* join

  * inner join -- 要有關聯才 show
  * left join  -- 左邊全都 show ， 右邊看關聯
  * right join -- 右邊全都 show ， 左邊看關聯
  * full join  -- 都 show , [MySQL gg](http://stackoverflow.com/questions/4796872/full-outer-join-in-MySQL)
  * join       -- same as join
```sql
select o.id as order_id , c.first_name as customer
from orders as o
inner join customers as c
on o.customer_id = c.id
order by o.id;
```

* union
```sql
-- union two select
select first_name from suppliers
union
select first_name from customers;

-- union allow duplicate values
select first_name from suppliers
union all
select first_name from customers;
```

* select into , insert into
```sql
-- select entry insert to table [ in other db ] from origin_table
-- but sadly , the method is from SQL.
-- In mySQL , we should use
create test.xs select * from strings
insert into test.ss select * from strings
```

* create index
```sql
-- accelerate the speed of searching
create [unique] index idx_name on tb_name (col_name)
```
* drop
```sql
-- index
alter table tb_name drop index idx_name

-- table
drop table tb_name

-- database
drop database db_name

-- clear the table
truncate table tb_name
```

* alter table
```sql
-- add col
alter table tb_name
add col_name data_type

-- del col
alter table tb_name
drop column col_name

-- change type
alter table tb_name
modify column col_name data_type
```

* auto\_increment
```sql
create table test.custs
(
 id int not null auto_increment,
 name varchar(255) ,
 addr varchar(255) ,
 city(255)
);
alert table test.custs auto_increment = 100;
```
* view
```sql
-- view is a virtual table , well , likes call by references
create view v_name as
[ select statement ];

-- update
create or replace view v_name as
[ select statement ];

-- drop
drop view v_name;
```

* date functions
```sql
select now() , curdate() , curtime() , date(now());

-- extract(unit_value from date)
select extract(hour from now()) , extract(minute from now());

select date_add(now() , interval 2 day) , date_sub(now() , interval 2 day);

select datediff(date_add(now() , interval 2 day) , now());

select date_format(now() , "%Y-%M-%D-%a");
```

* null
```sql
select * from tb_name where col_name is null;
select * from tb_name where col_name is not null;

-- ifnull or coalesce func let us def the rtn val when data is null
select ifnull(address , "NULL ADDRESS") from tb_name;
select coalesce(address , "NULL ADDRESS") from tb_name;
```

* type
  * text
    * char(size < 255) - const length
    * varchar(size < 256) - var length , when over 255 -> text
    * tinytext - a string whose length < 256
    * text - a string whose length < 65536
    * mediumtext - a string whose length = 16777215
    * mediumbolb - to store bin obj , max size = 16777215
    * longtext  - a string whose max length = 4,294,967,295
    * longbolb  - a binobj whose max  size  = 4,294,967,295
    * enum(elm , ...) - a list with max length = 65535
    * set - likes enum. wait me to find out.
  * number (can add `unsigned` prefix)
    * tinyint(size)   - 1 byte
    * smallint(size)  - 2 bytes
    * mediumint(size) - 3 bytes
    * int             - 4 bytes
    * bigint          - 8 bytes
    * float           - omit
    * double          - omit
    * decimal         - float represented by string
  * date
    * date      - YYYY-MM-DD
    * datetime  - YYYY-MM-DD HH:MM:SS
    * time      - HH:MM:SS
    * year      - YYYY
    * timestamp - YYYY-MM-DD HH:MM:SS (UTC)


* functions
  * group by before order by
  * MySQL doesn't support first() , last() , alternatively , you should use order by and limit
```sql
select ship_city from orders
group by ship_city order by id desc limit 1;
```
  * having example:
```sql
select ship_city  from orders
group by ship_city having count(ship_city) = 4;
```
  * mid(string , start from 1 , length)
  * MySQL doesn't support len() , you should use length()

