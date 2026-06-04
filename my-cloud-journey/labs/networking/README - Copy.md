# Networking Labs

Creating Networking Resources in an Amazon Virtual Private Cloud (VPC)
 

Objectives
In this lab, you will:

Summarize the customer scenario
Create a VPC, Internet Gateway, Route Table, Security Group, Network Access List, and EC2 instance to create a routable network within the VPC
Familiarize yourself with the console
Develop a solution to the customers issue found within this lab.
The lab is complete once you can successfully utilize the command ping outside the VPC.


Scenario

Your role is a Cloud Support Engineer at Amazon Web Services (AWS). During your shift, a customer from a startup company requests assistance regarding a networking issue within their AWS infrastructure. The email and an attachment of their architecture is below.

Email from the customer
Hello Cloud Support!

I previously reached out to you regarding help setting up my VPC. I thought I knew how to attach all the resources to make an internet connection, but I cannot even ping outside the VPC. All I need to do is ping! Can you please help me set up my VPC to where it has network connectivity and can ping? The architecture is below. Thanks!

Brock, startup owner
 
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c539acca-05d6-40ec-b99d-b76759437817" />


## Labs
Task 1: Investigate the customer's needs
Recall
For task 1, you will investigate the customer's request and build a VPC that has network connectivity. You will complete this lab when you can successfully ping from your EC2 instance to the internet showing that the VPC has network connectivity.

In the scenario, Brock, the customer requesting assistance, has requested help in creating resources for his VPC to be routable to the internet. Keep the VPC CIDR at 192.168.0.0/18 and public subnet CIDR of 192.168.1.0/26.

On the left hand navigation pane in the VPC main page, you will see a pattern to build a VPC. Starting with "Your VPCs" working your way down.
Figure: A great guide to building a VPC is to follow the left hand navigation pane, starting from "Your VPCs" and working your way down.

Before you start, let's review VPC and its components to make it network compatible.

A Virtual Private Cloud (VPC) is like a data center but in the cloud. Its logically isolated from other virtual networks from which you can spin up and launch your AWS resources within minutes.
Private Internet Protocol (IP) addresses are how resources within the VPC communicate with each other. An instance needs a public IP address for it to communicate outside the VPC. The VPC will need networking resources such as an Internet Gateway (IGW) and a route table in order for the instance to reach the internet.
An Internet Gateway (IGW) is what makes it possible for the VPC to have internet connectivity. It has two jobs: perform network address translation (NAT) and be the target to route traffic to the internet for the VPC. An IGW's route on a route table is always 0.0.0.0/0.
A subnet is a range of IP addresses within your VPC.
A route table contains routes for your subnet and directs traffic using the rules defined within the route table. You associate the route table to a subnet. If an IGW was on a route table, the destination would be 0.0.0.0/0 and the target would be IGW.
Security groups and Network Access Control Lists (NACLs) work as the firewall within your VPC. Security groups work at the instance level and are stateful, which means they block everything by default. NACLs work at the subnet level and are stateless, which means they do not block everything by default.

Steps

Creating the VPC
Recall
Start at the top of the left navigation pane at Your VPCs and work your way down. Select Your VPCs, navigate to the top right corner, and select Create VPC.

Note

Note, you will be using a top-down theory with the top being the VPC.

 

This picture shows the VPC home page when "your VPCs" is clicked. This is where you will navigate to the top right button and select Create VPC.
       Figure: Navigate to "Your VPCs" and select Create VPC.

Name the VPC: Test VPC

IPv4 CIDR block: 192.168.0.0/18

Leave everything else as default, and select Create VPC.

This picture shows how it should be configured. Name tag should say: Test VPC, IPv4 CIDR block: 192.168.0.0/18, and leave everything else as default.
    Figure: VPC settings configuration

 

Creating Subnets
Recall
Now that the VPC is complete, look at the left navigation pane and select Subnets. In the top right corner, select Create subnet.

Note

Please note: Although almost anything can be created in any order, it is easier to have an approach. Having a flow or an approach will assist you in troubleshooting issues and ensure that you do not forget a resource.

  This picture shows the subnet home page when "Subnets" is clicked. This is where you will navigate to the top right button and select Create subnet.
  Figure: Select Create subnet

Configure like the following picture:

 This picture shows how it should be configured. VPC ID will be the "Test VPC", under subnet settings, subnet name will be "Public subnet", Availability Zone will be "no preference", IPv4 CIDR block will be "192.168.1.0/28" once complete, hit launch.
       Figure: Subnet configuration

 

Create Route Table
Recall
Navigate to the left navigation pane, and select Route Tables. In the top right corner select Create route table.

This picture shows the route table home page when "Route Tables" is clicked. This is where you will navigate to the top right button and select Create route table.
   Figure: Select Create route table.

Configure like the following picture:

   The route table should be configured like the following: Name will be "Public route table", VPC will be "Test VPC" and everything else is left as default and select "Create route table".
   Figure: Route table configuration

 

Create Internet Gateway and attach Internet Gateway
In this lab
From the left navigation pane, select Internet Gateways. Create an Internet Gateway (IGW) by selecting Create internet gateway at the top right corner.

This picture shows the Internet Gateways home page when "Internet Gateways" is clicked. This is where you will navigate to the top right button and select Create internet gateway.
    Figure: Select Create internet gateway

Configure like the following picture:

The internet gateway is configured like the following: the name will be "IGW test VPC" and everything else is default. Select "Create internet gateway".
    Figure: Internet gateway configuration

Once created, attach the Internet Gateway to the VPC by selecting Actions at the top right corner and clicking Attach to VPC.

In this picture, it shows that it takes you back to the IGW you created and for you to navigate to the actions button at the top and select "Attach to VPC".
     Figure: Attaching the IGW that was just created.

Now your IGW is attached! You now need to add its route to the route table and associate the subnet you created to the route table.

 

Add route to route table and associate subnet to route table
Navigate to the Route Table section on the left navigation pane. Select Public Route Table, and the scroll to the bottom and select the Routes tab. Select the Edit routes button located in the routes box.

On the Edit routes page, the first IP address is the local route and cannot be changed.

Select Add route.

In the Destination section, type 0.0.0.0/0 in the search box. This is the route to the IGW. You are telling the route table that any traffic that needs internet connection will use 0.0.0.0/0 to reach the IGW so that it can reach the internet.
Click in the Target section and select Internet Gateway since you are targeting any traffic that needs to go to the internet to the IGW. Once you select the IGW, you will see your TEST VPC IGW appear. Select that IGW, navigate to the bottom right, and select Save changes.
In this picture, you are adding the IGW route as 0.0.0.0/0 in the destination section in the route table, and IGW (IGW test VPC) as the target and saving the changes.
Figure: Adding the IGW in the route table (0.0.0.0/0 as the destination and IGW as the target).

Now your traffic has a route to the internet via the IGW.

From the Public route table dashboard, select the Subnet associations tab. Select the Edit subnet associations button.

When selecting he subnet to associate, select the Public subnet and select save.
Figure: Associate the Public subnet and select save association.

Select Save assocation.

Note: Every route table needs to be associated to a subnet. You are now associating this route table to this subnet. As you probably noticed, the naming convention is kept the same (public route table, public subnet, etc) in order to associate the same resources together. Keep this in mind when your network and resources grow. You can have multiples of the same resources and it can get confusing to which belongs where.

 

Creating a Network ACL
Recall

**Recall** that an NACL is a layer of security that acts like a firewall at the subnet level. The rules to set up a NACL are similar to security groups in the way that they control traffic. The following rules apply: NACLs must be associated to a subnet, NACLs are stateless, and they have the following parts:
  - Rule number: The lowest number rule gets evaluated first. As soon as a rule matches traffic, its applied; for example: 10 or 100. Rule 10 would get evaluated first.
  - Type of traffic; for example: HTTP or SSH
  - Protocol: You can specify all or certain types here
  - Port range: All or specific ones
  - Destination: Only applies to outbound rules  
  - Allow or Deny specified traffic.


From the left navigation pane, select Network ACLs. Navigate to the top right corner and select Create network ACL to create a Network Access Control Lists (NACLs).

This picture shows the Network ACLs home page when "Network ACLs" is selected. This is where you will navigate to the top right button and select Create network ACL.
  Figure: Select Create network ACL

On the Create network ACL, configure the following:
    - Name: Public Subnet NACL
    - VPC: Choose Test VPC from dropdown
    - Choose Create network ACL

On the Network ACLs option, from the list of ACLs select Public Subnet ACL

From the tabs below, select Inbound rules and then choose Edit inbound rules

On the Edit inbound rules, choose Add new rule and configure:

Rule number: Enter 100
Type: Choose All traffic from dropdown
Choose Save changes

Back on the  Network ACLs option, ensure that Public Subnet ACL is selected

Choose Outbound rules and then choose *Edit outbound rules

On the Edit outbound rules, choose Add new rule and configure:

Rule number: Enter 100
Type: Choose All traffic from dropdown
Choose Save changes
​ 
Inbound After creating the NACL, it will should look like the following. This indicates there is only one rule number, which is 100, that states that all traffic, all protocols, all port ranges, from any source (0.0.0.0/0) are allowed to enter (inbound) the subnet. The asterisk * indicates that anything else that does not match this rule is denied.

This picture shows the inbound rules for the NACL, rule number is 100 which is allowing all traffic from all protocols, from any range, from any source that comes inside the subnet. It will deny anything else that does not match this rule.
Figure: Default inbound rule configuration for NACL. This will allow all traffic from anywhere and deny anything else that does not match this rule at the subnet level.

Outbound What do you think this rule says?
This picture shows the outbound rules for the NACL, rule number is 100 which is allowing all traffic from all protocols, from any range, from any source to go outside the subnet. It will deny anything else that does not match this rule.
Figure: Default outbound rule configuration for NACL. This will allow all traffic from anywhere and deny anything else that does not match this rule at the subnet level.

 

Creating a Security Group
Recall
Recall that a security group is a virtual firewall at the instance level that controls inbound and outbound traffic. Just like a NACL, security groups control traffic; however, security groups cannot deny traffic. Security groups are stateful; you must allow traffic through the security group as it blocks everything by default, and it must be associated to an instance. A security group has the following parts for both inbound and outbound rules:

Inbound Source: It can be an IP or a specific resource
Outbound Destination: Can by an IP such as anywhere (0.0.0.0/0)
Protocol: Example UDP or TCP
Port range: All or specific range
Description: You can input a description
From the left navigation pane, select Security Groups. Navigate to the top right corner and select Create security group to create a security group.

This picture shows the Security Groups home page when "Security Groups" is selected. This is where you will navigate to the top right button and select Create security group.
	
Figure: Select Create security group

Configure like the following image of the Basic details page:

Note: In the VPC portion, remove the current VPC, and select Test VPC.

This is the basic details configuration of the security group. The security group name is "public security group", description is "allows public access", and VPC is the "test public VPC".
      Figure: Configure the Basic details page

The completed security group is shown below. This indicates that for Inbound rules you are allowing SSH, HTTP, and HTTPS types of traffic, each of which has its own protocols and port range. The source from which this traffic reaches your instance can be originating from anywhere. For Outbound rules, you are allowing all traffic from outside your instance.

This picture shows the inbound and outbound rules configuration of the security group. This picture has the inbound rules allowing traffic from SSH, HTTP and HTTPS from anywhere. And outbound all traffic from anywhere.
Figure: Configuration details for inbound and outbound rules for the security group

You now have a functional VPC. The next task is to launch an EC2 instance to ensure that everything works.

 

Task 2: Launch EC2 instance and SSH into instance
In task 2, you will launch an EC2 instance within your Public subnet and test connectivity by running the command ping. This will validate that your infrastructure is correct, such as security groups and network ACLs, to ensure that they are not blocking any traffic from your instance to the internet and vice versa. This will validate that you have a route to the IGW via the route table and that the IGW is attached.

On the AWS Management Console, in the Search bar, enter and choose EC2 to go to the EC2 Management Console.
In the left navigation pane, choose Instances.
Choose Launch instances and configure the following options:
In the Name and tags section, leave the Name blank.

In the Application and OS Images (Amazon Machine Image) section, configure the following options:

Quick Start: Choose Amazon Linux.
Amazon Machine Image (AMI): Choose Amazon Linux 2023 AMI.
In the Instance type section, choose t3.micro.

In the Key pair (login) section, choose vockey.

In the Network settings section, choose Edit and configure the following options:
VPC - required: Choose Test VPC.

Subnet: Choose Public Subnet.

Auto-assign public IP: Choose Enable.

Firewall (security groups): Choose Select existing security group.

Choose public security group.
Choose Launch instance.
To display the launched instance, choose View all instances.

 The EC2 instance named Bastion Server is initially in a Pending state. The Instance state then changes to  Running to indicate that the instance has finished booting.

 

    

Use SSH to connect to an Amazon Linux EC2 instance
Ways to connect Amazon Linux EC2
  

The following instructions vary slightly depending on whether you are using Windows or Mac/Linux.

 Windows Users: Using SSH to Connect
 These instructions are specifically for Windows users. If you are using macOS or Linux, skip to the next section.

Select the Details drop-down menu above these instructions you are currently reading, and then select Show. A Credentials window will be presented.

Select the Download PPK button and save the labsuser.ppk file.
Typically your browser will save it to the Downloads directory.

Make a note of the PublicIP address.

Then exit the Details panel by selecting the X.

Download  PuTTY to SSH into the Amazon EC2 instance. If you do not have PuTTY installed on your computer, download it here.

Open putty.exe

Configure your PuTTY session by following the directions in the following link: Connect to your Linux instance using PuTTY

Windows Users: Select here to skip ahead to the next task.

Task 3: Use ping to test internet connectivity
Run the following command to test internet connectivity:

ping google.com
After a few seconds, exit ping by holding CTRL+C on Windows or CMD+C on Mac to exit. You should get the following result:

Successful ping:
When running the command ping google.com you will see replies noting that you have internet connectivity.
Run ping to test connectivity. The above results are saying you have replies from google.com and have 0% packet loss.

If you are getting replies back, that means that you have connectivity.

 

Lab Complete 


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/7285fd49-b6d9-4103-9447-7bc317c699a1" />
