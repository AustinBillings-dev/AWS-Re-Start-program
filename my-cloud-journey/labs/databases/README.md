# Database Labs

Migrating to Amazon RDS
Lab overview
In this lab, you migrate the café web application to use a fully managed Amazon Relational Database Service (Amazon RDS) database (DB) instance instead of a local database instance.

You begin by generating some data on the existing database. This data is migrated to the new Amazon RDS instance.

During the migration process, you build the required components, including two private subnets in different Availability Zones, a security group for the database instance, and the RDS DB instance itself. After the database has been migrated, you reconfigure the café application to use the Amazon RDS instance instead of a local database.

Objectives

After completing this lab, you will be able to do the following:

Create an Amazon RDS MariaDB instance by using the AWS CLI.
Migrate data from a MariaDB database on an EC2 instance to an Amazon RDS MariaDB instance.
Monitor the Amazon RDS instance by using Amazon CloudWatch metrics.

## Labs
Task 1: Generating order data on the café website
In this task, you browse the café website and place a few orders that are stored in the existing database. Placing orders creates data for the application before the application is migrated to new Amazon RDS instance.

Now, you open the café web application, and place some orders.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b79c7c1e-161b-42c3-87f1-c62b3b8c8dda" />

Task 2 
2.1)connect to CLI instance

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0a7c8ec7-953a-4ff2-b1f1-5c60b228a5e3" />

2.2) Configuring the AWS CLI
In this task, you configure the AWS CLI by providing the configuration parameters that were made available to you when the lab was provisioned. After configuration, you run AWS CLI commands to interact with AWS services.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/264d34ba-f2c7-4943-92ce-79c4e514f233" />

2.3)Task 2.3: Creating prerequisite components
In this task, you create the prerequisite infrastructure components for the Amazon RDS instance. Specifically, you create the following components that are shown in the final architecture diagram:

CafeDatabaseSG (Security group for the Amazon RDS database)
CafeDB Private Subnet 1
CafeDB Private Subnet 2
CafeDB Subnet Group (Database subnet group)

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/bbf10ff4-90da-4039-a504-2c1172537f4e" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d6550f51-42cf-485b-860c-ddaf1a422203" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9b514c97-31a0-4edc-9913-3851cf58474c" />




