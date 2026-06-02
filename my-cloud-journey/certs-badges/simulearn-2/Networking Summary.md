# Simulearn 2

Networking Concepts

## Topics Covered

-Configure VPC networking components, including routing tables, an internet gateway, and security groups, to enable secure internet connectivity.

Description

The bank wants to establish a network architecture that securely controls communication between its internal resources and the internet.


## Key Takeaways

-This solution demonstrates a network architecture that restricts internet traffic to designated public AWS resources.

-The architecture deploys web and database servers within a virtual private cloud (VPC), providing a logically isolated network environment in the AWS Cloud.

-A web server with a public IP address resides in a public subnet, enabling internet accessibility.The web server's security group permits HTTP traffic through port 80.

-The web server's security group permits HTTP traffic through port 80.

-The VPC route table directs internet traffic through an internet gateway exclusively to the public subnet.

-A database server operates in a private subnet, isolated from direct internet access through route table configuration.

-Database connectivity requires security group configuration permitting web server access through port 3306.

Screenshot of completion --
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a40d9d5f-7bb7-4659-98ab-e20390cfafe7" />

DIY Goals
Change the security group rules to allow traffic, over port 3306, into the DB server.
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/35091fa0-1cfd-4053-8297-8fefda953ba2" />







## Resources
-AWS Skill Builder
