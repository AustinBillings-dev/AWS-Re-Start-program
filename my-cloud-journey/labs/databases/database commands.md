Task 1: Connect to a database
In this task, you connect to an instance containing a database client, which is used to connect to a database. This instance is referred to as the Command Host.

In the AWS Management Console, choose the  Services menu. Under Compute, choose EC2.

In the left navigation pane, choose Instances.

Next to the instance labelled Command Host, select the check box  and then choose Connect.

Note: If you do not see the Command Host, the lab is possibly still being provisioned, or you may be using another Region.

For Connect to instance, choose the Session Manager tab.

Choose Connect to open a terminal window.

Note: If the Connect button is not available, wait for a few minutes and try again.

To configure the terminal to access all required tools and resources, run the following command:

sudo su
cd /home/ec2-user/
 Tips:

Copy and paste the command into the Session Manager terminal window.
If you are using a Windows system, press Shift+Ctrl+v to paste the command.
To connect to the database instance, run the following command in the terminal. A password was configured when the database was installed.

mysql -u root --password='re:St@rt!9'
 The MySQL command-line client is a SQL shell that you can use to interact with database engines.

Switch	Description
-u or --user	The MySQL user name used to connect to a database instance
-p or --password	The MySQL password used to connect to a database instance
  Tip: At any stage of the lab, if the Sessions Manager window is not responsive or if you need to reconnect to the database instance, then follow these steps:

Close the Sessions Manager window, and try to reconnect using the previous steps.
Run the following commands in the terminal.
sudo su
cd /home/ec2-user/
mysql -u root --password='re:St@rt!9'
To show the existing databases, enter the following command in the terminal. Make a note of the currently available databases.

SHOW DATABASES;



  

Task 2: Insert data into a table
In this task, you insert sample data into the country table.

To verify that the country table exists, run the following command. The SELECT statement is used to identify the columns that should be included in the result set. The use of the * denotes all columns. The FROM clause is used in the following example to specify the database and table that is queried.

SELECT * FROM world.country;
To insert rows into the country table, run the following commands. The values in the VALUES clause need to be in the same order as defined by the table schema. 

INSERT INTO world.country VALUES ('IRL','Ireland','Europe','British Islands',70273.00,1921,3775100,76.8,75921.00,73132.00,'Ireland/Éire','Republic',1447,'IE');

INSERT INTO world.country VALUES ('AUS','Australia','Oceania','Australia and New Zealand',7741220.00,1901,18886000,79.8,351182.00,392911.00,'Australia','Constitutional Monarchy, Federation',135,'AU');
To verify that two rows were successfully inserted into the country table, run the following query.

SELECT * FROM world.country WHERE Code IN ('IRL', 'AUS');
The table should now contain two rows and should appear as follows.

Code	Name	Continent	Region	SurfaceArea	IndepYear	Population	LifeExpectancy	GNP	GNPOld	LocalName	GovernmentForm	Capital	Code2
AUS	Australia	Oceania	Australia and New Zealand	7741220	1901	18886000	79.8	351182	392911	Australia	Constitutional Monarchy, Federation	135	AU
IRL	Ireland	Europe	British Islands	70273	1921	3775100	76.8	75921	73132	Ireland/Éire	Republic	1447	IE
 

Task 3: Update rows in a table
In this task, you update both rows in the country table using an UPDATE statement.

To set the value in the Population column to 0 for both rows in the country table, run the following UPDATE statement. 

UPDATE world.country SET Population = 0;
All rows are updated because the UPDATE statement does not include a WHERE condition. A WHERE clause uses conditions to filter rows returned by a query. The next lab introduces the WHERE clause.

To verify that the Population column in the country table was updated, run the following command.

SELECT * FROM world.country;
To update the Population and SurfaceArea columns for all rows in the country table, run the following UPDATE statement.

UPDATE world.country SET Population = 100, SurfaceArea = 100;
To verify that the Population and SurfaceArea columns in the country table were updated, run the following command.

SELECT * FROM world.country;
 

Task 4: Delete rows from a table
In this task, you delete rows in the country table using a DELETE statement. 

Exercise caution when using data manipulation statements such as UPDATE and DELETE because these changes may not be reversible. 

To delete ALL rows from the country table, run the following command. 

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM world.country;
Because the DELETE statement does not include a WHERE condition, all rows are deleted.

To verify that all rows have been deleted from the country table, run the following command.

SELECT * FROM world.country;
 

Task 5: Import data using an SQL file
In this task, you import sample data into the country table using an SQL file.

To exit the MySQL terminal, run the following command.

QUIT;
To verify that the world.sql file has been downloaded, run the following command.

ls /home/ec2-user/world.sql


Recall Linux commands
It is time-consuming to insert individual rows into a table. You can create a SQL script file containing a group of SQL statements to quickly load data into a database. To load rows into the country table, run the following command.

mysql -u root --password='re:St@rt!9' < /home/ec2-user/world.sql
This database file adds two additional tables and inserts data into all three tables.

To reconnect to the database, run the following command.

mysql -u root --password='re:St@rt!9'
To verify that the script ran successfully, run the following command.

USE world;
SHOW TABLES;
Observe that there are three tables named city, country, and countrylanguage.

To verify that the rows were loaded successfully, run the following command.Task 2: Query the world database
In this task, you query the world database using various SELECT statements and database operators.

To show the existing databases, enter the following command in the terminal.

SHOW DATABASES;
Verify that a database named world is available. If the world database is not available, then contact your instructor.

To list all rows and columns in the country table, run the following query.

SELECT * FROM world.country;
To query the number of rows in a table, you can use the COUNT() function in a SELECT statement. To count all the rows in table, you can use COUNT(*). To count the number of rows that have a value in a specific column, include the column name as a parameter in the COUNT() function: for example, COUNT(Population). To list the number of rows in the country table, run the following query.

SELECT COUNT(*) FROM world.country;
To list all columns in the country table, run the following query. You run this query to understand the table schema.

SHOW COLUMNS FROM world.country;
To query specific columns in the world table, run the following query to return a result set that includes the Name, Capital, Region, SurfaceArea, and Population columns.

SELECT Name, Capital, Region, SurfaceArea, Population FROM world.country;
Database column names are sometimes not user friendly. To add a more descriptive column name to the query output, you can use the AS option. Run the following query that includes this option.

SELECT Name, Capital, Region, SurfaceArea AS "Surface Area", Population FROM world.country;
If required, scroll to the top of the query results, and observe that the SurfaceArea column is displayed as Surface Area.

Ordered result sets are easier to view and work with. If you would like to order the output based on a column, you can use the ORDER BY option. In this example, you order the output based on the population.

SELECT Name, Capital, Region, SurfaceArea AS "Surface Area", Population FROM world.country ORDER BY Population;
The ORDER BY option orders data in ascending order.

To order data in descending order, use the DESC option with ORDER BY. Run the following command with this option.  

SELECT Name, Capital, Region, SurfaceArea AS "Surface Area", Population FROM world.country ORDER BY Population DESC;
You can add conditions to SELECT statements by using the WHERE clause. For example, to list all rows with a population greater than 50,000,000, run the following query.

SELECT Name, Capital, Region, SurfaceArea AS "Surface Area", Population FROM world.country WHERE Population > 50000000 ORDER BY Population DESC;
You have used the > comparison operator. Similarly, you can use other comparison operators to compare values.

You can construct a WHERE clause by using a number of conditions and operators. 

The following query uses two conditions: all rows with a population greater than 50,000,000 and all rows with a population less than 100,000,000. The query includes the AND operator to indicate that both the conditions must be true. Run the following query in your terminal.

SELECT Name, Capital, Region, SurfaceArea AS "Surface Area", Population FROM world.country WHERE Population > 50000000 AND Population < 100000000 ORDER BY Population DESC;

SELECT * FROM country;
Notice that there are more entries in the country table.

Similarly, use the SELECT statement to query the city and countrylanguage tables that were created when you imported the backup file.

Task 2: Query the world database
In this task, you will query the world database by using various SELECT statements and database functions.

To show the existing databases, run the following query. 

SHOW DATABASES;
Verify that a database named world is available. If the world database is not available, then contact your instructor.

To review the table schema, data, and number of rows in the country table, run the following query.

SELECT * FROM world.country;
By reducing the number of records, the result set would be smaller and easier to work with. To limit the number of records returned, you can use a WHERE clause to define the conditions that records must match.

Use the AND operator to combine two conditions. Each record is checked against both conditions before it's included in the result set. You can use the > operator and = operator to query values that are greater than or equal to a certain value. Similarly, you can combine the < operator and = operator to query values that are less than or equal to a certain value.

To reduce the number of records in the result set by using a WHERE clause and the AND operator, run the following query.

SELECT Name, Capital, Region, SurfaceArea, Population FROM world.country WHERE Population >= 50000000 AND Population <= 100000000;
When searching for records by using a range condition, you can use the BETWEEN operator instead of the >= operator and <= operator. By using the BETWEEN operator, the query is easier to read. Note that the operator is inclusive, meaning that the beginning and ending values are included.

To return the same records as the previous result set by using the BETWEEN operator, run the following query.

SELECT Name, Capital, Region, SurfaceArea, Population FROM world.country WHERE Population BETWEEN 50000000 AND 100000000;
You can use the LIKE function to search for a string pattern. The following query will return records that include the string Europe in the Region column. The percent symbol (%) is a wildcard character that represents any number of characters before or after the word Europe. The query will aggregate the population of all European countries by using the SUM function.

To return the population of all European countries by using the LIKE function and SUM function, run the following query.

SELECT sum(Population) from world.country WHERE Region LIKE "%Europe%";
In the previous query, the SELECT clause included a SUM function. In the following query, the SUM function is still used to calculate the total population of Europe. The query also includes a column alias, which makes the output easier to read. To define the column alias, the AS command is used in the SELECT statement.

To return the same information as the previous query with the column alias, run the following query.

SELECT sum(population) as "Europe Population Total" from world.country WHERE region LIKE "%Europe%";
Note that SQL is not a case-sensitive language. You can use either SELECT or select when writing a query. However, databases that you query might be configured with a case-sensitive collation. If the database was case sensitive, you would not be able to query a column named Population by using the following: select population from world.country

Even though the database used in this lab is not case sensitive, we recommended making your queries consistent with the naming convention that is used in the database.

The following example demonstrates how to perform a case-sensitive search. Depending on the database configuration, when comparing Central to central, the outcome might be false, because the strings don't use the same case. To solve this problem, you can use the LOWER function in the WHERE clause to compare the strings both as lowercase.

To perform a case-sensitive search by using the LOWER function, run the following query.

SELECT Name, Capital, Region, SurfaceArea, Population from world.country WHERE LOWER(Region) LIKE "%central%";
Task 2: Query the world database
In this task, you query the world database using various SELECT statements and database functions. You use a function to process and manipulate data in a query. There are a wide range of SQL functions, and this lab reviews a subset of commonly used functions.

To show the existing databases, enter the following command in the terminal.

SHOW DATABASES;
Verify that a database named world is available. If the world database is not available, contact your instructor.

To review the table schema, data, and number of rows in the country table, run the following query.

SELECT * FROM world.country;
The following query demonstrates how to use aggregate functions SUM(), MIN(), MAX(), and AVG() to summarize data. Because the query does not include a WHERE condition, the functions aggregate data from all records in the country table. Run the following query.

SELECT sum(Population), avg(Population), max(Population), min(Population), count(Population) FROM world.country;
SUM() adds all the population values together.
AVG() generates an average across all the population values.
MAX() finds the row with the highest population value.
MIN() finds the row with the lowest population value.
COUNT() finds the number of rows with a population value.
In some cases, you might need to split a string. The following query uses SUBSTRING_FUNCTION() to spilt a string where a space occurs. Run the following query.

SELECT Region, substring_index(Region, " ", 1) FROM world.country;
After you run the query, you notice that the second column includes the beginning of each region name. 

Sometimes you may need to search rows using a string fragment. The following query includes SUBSTRING_FUNCTION() as part of a condition in the WHERE clause to filter records that include Southern in the first part of the region name. Run the following query.

SELECT Name, Region from world.country WHERE substring_index(Region, " ", 1) = "Southern";
You can use the LENGTH() and TRIM() functions to determine how many characters are in a string. TRIM() clears leading and trailing blank spaces, and the LENGTH() function returns a count of the remaining characters. The next example returns only regions that have fewer than 10 characters in their names. Run the following query.

SELECT Region FROM world.country WHERE LENGTH(TRIM(Region)) < 10;
You might have noticed duplicate records in the previous example. You can use the DISTINCT() function to filter the duplicates. Run the following query.

SELECT DISTINCT(Region) FROM world.country WHERE LENGTH(TRIM(Region)) < 10;

To return a list of records where the Region is Australia and New Zealand, run the following query. This query includes an ORDER BY clause (which a previous lab introduced) that arranges the results by Population in descending order.

SELECT Region, Name, Population FROM world.country WHERE Region = 'Australia and New Zealand' ORDER By Population desc;
You can use the GROUP BY clause to group related records together. The following example starts by filtering records using a condition where the region is equal to Australia and New Zealand. The results are then grouped together by using a GROUP BY clause. The SUM() function is then applied to the grouped results to generate a total population for that region. Run the following query in your terminal.

SELECT Region, SUM(Population) FROM world.country WHERE Region = 'Australia and New Zealand' GROUP By Region ORDER By SUM(Population) desc;
This query returns a SUM() of the Population for the Australia and New Zealand region. Because the WHERE clause is filtered by Region, only the Australia and New Zealand records are aggregated. 

The following example uses a windowing function to generate a running total by adding the Population of the first record to the Population of the second record and subsequent records. This query uses the OVER() clause to group the records by Region and uses the SUM() function to aggregate the records. The output displays the population of a country along side a running total of the region. Run the following query in your terminal.

SELECT Region, Name, Population, SUM(Population) OVER(partition by Region ORDER BY Population) as 'Running Total' FROM world.country WHERE Region = 'Australia and New Zealand';
The following query groups the records by Region and orders them by Population with the OVER() clause. This query also includes the RANK() function to generate a rank number indicating the position of each record in the result set. The RANK() function is useful when dealing with large groups of records. Run the following query in your terminal.

SELECT Region, Name, Population, SUM(Population) OVER(partition by Region ORDER BY Population) as 'Running Total', RANK() over(partition by region ORDER BY population) as 'Ranked' FROM world.country WHERE region = 'Australia and New Zealand';
 

