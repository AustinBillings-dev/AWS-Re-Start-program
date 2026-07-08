Configuring a VPC
Lab overview
Amazon Virtual Private Cloud (Amazon VPC) gives you the ability to provision a logically isolated section of the Amazon Web Services (AWS) Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selecting your IP address ranges, creating subnets, and configuring route tables and network gateways.

In this lab, you build a virtual private cloud (VPC) and other network components required to deploy resources, such as an Amazon Elastic Compute Cloud (Amazon EC2) instance.

 

Following diagram showing the final lab architecture having a vpc, a public and a private subnet with ec2 instance in each and a nat gateway in public subnet. Both subnets are hosted in a single availability zone. Diagram also shows routing table associate with each subnet.

Objectives
By the end of this lab, you should be able to do the following:

Create a VPC with a private and public subnet, an internet gateway, and a NAT gateway.

Configure route tables associated with subnets to local and internet-bound traffic by using an internet gateway and a NAT gateway.

Launch a bastion server in a public subnet.

Use a bastion server to log in to an instance in a private subnet.

If you have time, you can complete the optional challenge section in which you create an Amazon EC2 instance in a private subnet and connect to it through the bastion server.

 

Duration
This lab will require approximately 45 minutes to complete.

 

Accessing the AWS Management Console
At the top of these instructions, choose Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status.

Wait until the message "Lab status: ready" appears, and then choose X to close the Start Lab panel.

At the top of these instructions, choose AWS to open the AWS Management Console on a new browser tab. The system automatically signs you in.

Tip: If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console so that it appears alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to follow the lab steps.

 

Task 1: Creating a VPC
In this task, you create a new VPC.

On the AWS Management Console, in the Search bar, enter and choose VPC to go to the VPC Management Console.

In the left navigation pane, for Virtual private cloud, choose Your VPCs.

 In every Region, a default VPC with a Classless Inter-Domain Routing (CIDR) block of 172.31.0.0/16 has already been created for you. Even if you haven't created anything in your account yet, you will see some pre-existing VPC resources already there.

Choose Create VPC and configure the following options:

Resources to create: Choose VPC only.

Name tag: Enter Lab VPC.

IPv4 CIDR block: Choose IPv4 CIDR manual input.

IPv4 CIDR: Enter 10.0.0.0/16.

IPv6 CIDR block: Choose No IPv6 CIDR block.

Tenancy: Choose Default.

Tags: Leave the suggested tags as is.

Choose Create VPC. 

At the top of the page, a message displays similar to the following: "You successfully created vpc-NNNNNNNNNNN / Lab VPC."

Choose Actions, and choose Edit VPC settings.

In the DNS settings section, select Enable DNS hostnames.

Choose Save.

EC2 instances launched into the VPC now automatically receive a public IPv4 Domain Name System (DNS) hostname.

 

Task 2: Creating subnets
In this task, you create a public subnet and a private subnet.

Task 2.1: Creating a public subnet
In the left navigation pane, for Virtual private cloud, choose Subnets.

Choose Create subnet and configure the following options:

VPC ID: Choose Lab VPC.

Subnet name: Enter Public Subnet.

Availability Zone: Choose the first Availability Zone in the list. Do not choose No preference.

IPv4 CIDR block: Enter 10.0.0.0/24.

Choose Create subnet.

You now configure the public subnet to automatically assign a public IP address for all EC2 instances that are launched within it.

Select Public Subnet.

Choose Actions, and then choose Edit subnet settings.

In the Auto-assign IP settings section, select Enable auto-assign public IPv4 address.

Choose Save.

 Even though this subnet has been named Public Subnet, it is not yet public. A public subnet must have an internet gateway, which you attach in a task later in the lab.

Task 2.2: Creating a private subnet
In this task, you create the private subnet, which is used for resources that are to remain isolated from the internet.

To create the private subnet, repeat the steps from the previous task, and choose the following options:

VPC ID: Choose Lab VPC.

Subnet name: Enter Private Subnet.

Availability Zone: Choose the first Availability Zone on the list. Do not choose No preference.

IPv4 CIDR block: Enter 10.0.2.0/23.

Choose Create subnet.

The CIDR block of 10.0.2.0/23 includes all IP addresses that start with 10.0.2.x and 10.0.3.x. This range is twice as large as the public subnet because most resources should be kept in private subnets unless they specifically need to be accessible from the internet.

Your VPC now has two subnets. However, the VPC is totally isolated and cannot communicate with resources outside the VPC. 

Next, you configure the public subnet to connect to the internet through an internet gateway.

 

Task 3: Creating an internet gateway
In this task, you create an internet gateway for your VPC. You need an internet gateway to establish outside connectivity to EC2 instances in VPCs.

In the left navigation pane, for Virtual private cloud, choose Internet gateways.

Choose Create internet gateway, and then for Name tag, enter Lab IGW.

Choose Create internet gateway.

Choose Actions, then choose Attach to a VPC.

Your public subnet now has a connection to the internet. However, to route traffic to the internet, you must also configure the public subnet's route table so that it uses the internet gateway.

 

Task 4: Configuring route tables
In this task, you do the following:

Create a public route table for internet-bound traffic.

Add a route to the route table to direct internet-bound traffic to the internet gateway.

Associate the public subnet with the new route table.

In the left navigation pane, for Virtual private cloud, choose Route tables.

Several route tables are listed.

Select the route table that includes Lab VPC in the VPC column.

Tip: If you cannot see the VPC column, scroll to the right.

In the Name column, choose the edit icon, enter Private Route Table for Edit Name, and then choose Save.

Choose the Routes tab.

There is currently only one route. It shows that all traffic destined for 10.0.0.0/16 (which is the range of the Lab VPC) will be routed locally. This option allows all subnets within a VPC to communicate with each other.

You now create a new public route table to send public traffic to the internet gateway.

Choose Create route table and configure the following options:

Name - optional: Enter Public Route Table.

VPC: Choose Lab VPC.

Choose Create route table.

After the route table is created, in the Routes tab, choose Edit routes.

Note: You now add a route to direct internet-bound traffic (0.0.0.0/0) to the internet gateway.

Choose Add route and then configure the following options:

Destination: Enter 0.0.0.0/0.

Target: Choose Internet Gateway, and then choose Lab IGW from the list.

Choose Save changes.

The final step is to associate this new route table with the public subnet.

Choose the Subnet associations tab.

Choose Edit subnet associations.

Select Public Subnet.

Choose Save associations.

The public subnet is now public because it has a route table entry that sends traffic to the internet through the internet gateway.

In the previous tasks, you created a VPC and attached an internet gateway. Then you created subnets and a route table and associated a public route table to the public subnet. You now launch resources in the subnets as required.

Task 5: Launching a bastion server in the public subnet
A bastion server (also known as a jump box) is an EC2 instance in a public subnet that is securely configured to provide access to resources in a private subnet. Systems operators can connect to the bastion server and then jump into resources in the private subnet.

In this task, you launch an EC2 instance bastion server in the public subnet that you created earlier.

On the AWS Management Console, in the Search bar, enter and choose EC2 to go to the EC2 Management Console.

In the left navigation pane, choose Instances.

Choose Launch instances and configure the following options:

In the Name and tags section, enter Bastion Server.

In the Application and OS Images (Amazon Machine Image) section, configure the following options:

Quick Start: Choose Amazon Linux.

Amazon Machine Image (AMI): Choose Amazon Linux 2023 AMI.

In the Instance type section, choose t3.micro.

In the Key pair (login) section, choose Proceed without a key pair (Not recommended).

 You use EC2 Instance Connect to access the shell running on the EC2 instance, so a key pair is not needed in the lab.

In the Network settings section, choose Edit and configure the following options:

VPC - required: Choose Lab VPC.

Subnet: Choose Public Subnet.

Auto-assign public IP: Choose Enable.

Firewall (security groups): Choose Create security group.

Security group name - required: Enter Bastion Security Group.

Description - required: Enter Allow SSH.

Inbound security groups rules:

Type: Choose ssh.

Source type: Choose Anywhere.

Choose Launch instance.

To display the launched instance, choose View all instances.

 The EC2 instance named Bastion Server is initially in a Pending state. The Instance state then changes to  Running to indicate that the instance has finished booting.

The bastion server will be launched in the public subnet. 

Continue to the next task. You do not need to wait for the instance to be running.

 

Task 6: Creating a NAT gateway
In this task, you launch a NAT gateway in the public subnet and configure the private route table to facilitate communication between resources in the private subnet and the internet. 

On the AWS Management Console, in the Search bar, enter NAT gateways, choose the Features list, and choose NAT gateways.

Choose Create NAT gateway and configure the following options:

Name: Enter Lab NAT gateway. 

Subnet: From the dropdown list, choose Public Subnet.

Choose Allocate Elastic IP.

Choose Create a NAT gateway.

You now configure the private subnet to send internet-bound traffic to the NAT gateway.

In the left navigation pane, choose Route tables, and then select Private Route Table.

Choose the Routes tab.

The route table is currently showing only a single entry, which routes traffic locally within the VPC. You add an additional route to send internet-bound traffic through the NAT gateway.

Choose Edit routes.

Choose Add route and configure the following options:

Destination: Enter 0.0.0.0/0.

Target: Choose NAT Gateway, and then choose nat- from the list.

Choose Save changes.

Resources in the private subnet that wish to communicate with the internet now have their network traffic directed to the NAT gateway, which forwards the request to the internet. Responses flow through the NAT gateway back to the private subnet.

 

Optional challenge: Testing the private subnet
 This challenge is optional and is provided in case you have lab time remaining.

In this optional challenge, you launch an EC2 instance in the private subnet and confirm that it can communicate with the internet.

Launching an instance in the private subnet
In this optional task, you launch an EC2 instance in the private subnet.

Follow the instructions that you used to launch the bastion server, and configure the following options:

In the Name and tags section, enter Private Instance.

In the Application and OS Images (Amazon Machine Image) section, configure the following options:

Quick Start: Choose Amazon Linux.

Amazon Machine Image (AMI): Choose Amazon Linux 2023 AMI.

In the Instance type section, choose t3.micro.

In the Key pair (login) section, choose Proceed without a key pair (Not recommended).

In the Network settings section, choose Edit and configure the following options:

VPC - required: Choose Lab VPC.

Subnet: Choose Private Subnet (not the public subnet).

Firewall (security groups): Choose Create security group.

Security group name - required: Enter Private Instance SG.

Description - required: Enter Allow SSH from Bastion.

Inbound security groups rules:

Type: Choose ssh.

Source type: Choose Custom.

Source: Choose 10.0.0.0/16.

Expand the Advanced Details section, and for User data - optional, paste the following script:

#!/bin/bash
# Turn on password authentication for lab challenge
echo 'lab-password' | passwd ec2-user --stdin
sed -i 's|[#]*PasswordAuthentication no|PasswordAuthentication yes|g' /etc/ssh/sshd_config
systemctl restart sshd.service
 This script permit login by using a password. It is included to help make the lab steps shorter but is not recommended for normal instance deployments.

Choose Launch instance.

To display the launched instance, choose View all instances.

Logging in to the bastion server
The instance that you just launched is in the private subnet, so it is not possible to directly log in to the instance. Instead, you first log in to the bastion server in the public subnet and then log in to the private instance from the bastion server.

On the AWS Management Console, in the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the navigation pane, choose Instances.

From the list of instances, select the Bastion Server instance.

Choose Connect.

On the EC2 Instance Connect tab, choose Connect.

Note: If you prefer to use an SSH client to connect to the EC2 instance, see the guidance to Connect to Your Linux Instance.

Logging in to the private instance
You should now be logged in to the bastion server, which is located in the public subnet. Keep this terminal window open for use later.

You now connect to the private instance, which is placed in the private subnet.

In the Amazon EC2 console, choose Instances, and select Private Instance (and clear any other instances).

Copy the Private IPv4 addresses (shown in the lower half of the page) to your clipboard.

This IP address is a private IP address starting with 10.0.2.x or 10.0.3.x. This address is not reachable directly from the internet, which is why you first logged in to the bastion server. You now log in to the private instance.

Return to the terminal window, and run the following command. In the command, replace PRIVATE-IP with the IP address that you just copied to your clipboard:

ssh PRIVATE-IP
The command that you run should look similar to the following: ssh 10.0.2.123

If you are prompted with the message "Are you sure you want to continue connecting", enter yes

When prompted for a password, enter lab-password.

You should now be connected to the private instance. You accomplished this task by first connecting to the bastion server (in the public subnet) and then connecting to the private instance (in the private subnet).

Testing the NAT gateway
The final part of this challenge is to confirm that the private instance can access the internet.

You do this by running the ping command.

Run the following command:

ping -c 3 amazon.com
You should see results similar to the following:

PING amazon.com (176.32.98.166) 56(84) bytes of data.
64 bytes from 176.32.98.166 (176.32.98.166): icmp_seq=1 ttl=222 time=79.2 ms
64 bytes from 176.32.98.166 (176.32.98.166): icmp_seq=2 ttl=222 time=79.2 ms
64 bytes from 176.32.98.166 (176.32.98.166): icmp_seq=3 ttl=222 time=79.0 ms
This output indicates that the private instance successfully communicated with amazon.com on the internet.
The private instance is in the private subnet, and the only way that this is possible in the curent scenario is by going through the NAT gateway.
This output confirms that your network configuration was successful.

 

Conclusion
Congratulations! You now have successfully done the following:

Created a VPC with a private and public subnet, an internet gateway, and a NAT gateway

Configured route tables associated with subnets to local and internet-bound traffic by using an internet gateway and a NAT gateway

Launched a bastion server in a public subnet

Used a bastion server to log in to an instance in a private subnet

Lab complete



Troubleshooting a VPC
 

Lab overview
In this lab, you troubleshoot virtual private cloud (VPC) configurations and analyze VPC Flow Logs.

You begin with an environment that includes two VPCs, Amazon Elastic Compute Cloud (Amazon EC2) instances, and other networking components shown in the following diagram.

This diagram also shows four numbered circles (#1–4) that indicate the order in which you work through this lab.

VPC components that support the café web server instance runtime environment. The diagram also shows a CLI Host instance located in a separate VPC to run AWS CLI commands for troubleshooting. Numbered labels in the diagram identify these tasks.

Your tasks include the following:

Creating an Amazon Simple Storage Service (Amazon S3) bucket to hold VPC Flow Log data

Creating a flow log to capture all IP traffic passing through network interfaces in the VPC

Troubleshooting the VPC configuration issues to allow access to the resources

Downloading and analyzing the flow log data

 

Objectives
By the end of this lab, you will be able to do the following:

Create VPC Flow Logs.

Troubleshoot VPC configuration issues.

Analyze flow logs.

 

Duration
This lab requires approximately 75 minutes to complete.

 

Accessing the AWS Management Console
At the top of these instructions, choose Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status.

Wait until the message "Lab status: ready" appears, and then choose X to close the Start Lab panel.

Note: It takes approximately 10 minutes for the lab to be ready for use.

After the Lab is ready, at the top of these instructions, choose Details, and then choose Show. 

From the Credentials panel, copy the values from the table, and paste them into a text editor. You use these values throughout the lab. 

At the top of these instructions, choose AWS to open the AWS Management Console on a new browser tab. The system automatically signs you in.

Tip If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console so that it appears alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to follow the lab steps.

Leave this browser tab open. You return to it later in this lab.

 

Task 1: Connecting to the CLI Host instance
In this task, you use EC2 Instance Connect to connect to the CLI Host instance. You use this instance to run AWS Command Line Interface (AWS CLI) commands.

On the AWS Management Console, in the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the navigation pane, choose Instances.

From the list of instances, select the CLI Host instance.

Choose Connect.

On the EC2 Instance Connect tab, choose Connect.

This option opens a new browser tab that shows the EC2 Instance Connect terminal window.

Note: If you prefer to use an SSH client to connect to the EC2 instance, see the guidance to Connect to Your Linux Instance.

You use this terminal window to complete the tasks throughout the lab. If the terminal becomes unresponsive, refresh the browser or use the steps in this task to connect again.

Now that you are connected to the CLI Host instance, you can configure and use the AWS CLI to call AWS services.

Task 1.1: Configuring the AWS CLI on the CLI Host instance
To configure the AWS CLI profile with credentials, in the EC2 Instance Connect terminal, run the following command: 

aws configure
At the prompts, copy the following values that you pasted into your text editor, and paste them into the terminal window as directed.

AWS Access Key ID: Enter the value for AccessKey.

AWS Secret Access Key: Enter the value for SecretKey.

Default region name: Enter us-west-2.

Default output format: Enter json.

You run CLI commands on this CLI Host terminal window as instructed throughout the lab.

Task 2: Creating VPC Flow Logs
In this task, you create an S3 bucket to publish data from VPC Flow Logs. Then you create VPC Flow Logs on VPC1 to capture information about IP traffic between network interfaces in VPC1. The flow logs are then published to the S3 bucket.

To create the S3 bucket where the flow logs will be published, run the following command. In the command, replace ###### with six random numbers:

aws s3api create-bucket --bucket flowlog###### --region 'us-west-2' --create-bucket-configuration LocationConstraint='us-west-2'
The JSON-formatted output similar to the following shows a bucket location: http://flowlog######.s3.amazonaws.com

In this command, flowlog###### is your bucket name. You use this bucket name in a later step.

Note: If you receive an error message indicating that Bucket name already exists, use different set of random numbers to replace ###### and run the command again.

To get the VPC ID for VPC1 to create VPC Flow Logs, run the following command:

aws ec2 describe-vpcs --query 'Vpcs[*].[VpcId,Tags[?Key==`Name`].Value,CidrBlock]' --filters "Name=tag:Name,Values='VPC1'"
The JSON-formatted output similar to the following shows the VPC ID: vpc-01edacbe1c31959d2

To create VPC Flow Logs on VPC1, run the following command. In the command, replace <flowlog######> with the bucket name from the previous steps, and replace <vpc-id> with the VPC ID for VPC1 from the previous step. 

The VPC ID was returned by the describe-vpcs command that you ran. You can also find it in the list of values (VPC1ID) that you copied to a text editor at the beginning of the lab.

aws ec2 create-flow-logs --resource-type VPC --resource-ids <vpc-id> --traffic-type ALL --log-destination-type s3 --log-destination arn:aws:s3:::<flowlog######>
The command output returns FlowLogIds and a ClientToken.

Note: If you see an "Unsuccessful" message, ignore it.

To confirm that the flow log was created, run the following command:

aws ec2 describe-flow-logs
The command output should show that a single flow log was created with a FlowLogStatus of ACTIVE and a log destination that points to your S3 bucket.

Now that the flow log has been created, you can continue to the next task, which involves some troubleshooting. 

 

Task 3: Troubleshooting VPC configuration issues to allow access to resources
In this task, you analyze access to the web server instance and troubleshoot some networking issues. Recall that the cafe web server instance runs in the public subnet in VPC1. Refer to the diagram at the start of this lab to see details about how the network should be configured.

From your text editor, copy the WebServerIP IP address, and paste it into a new browser tab. 

After a few moments, the page fails to load, and you receive a message indicating that the site can't be reached or the connection has timed out. This message is expected.

Leave this browser tab open so that you can return to it later.

In the CLI Host terminal, to find details about the web server instance, run the following command. In the command, replace <WebServerIP> with the WebServerIP address that you used in the previous steps:

aws ec2 describe-instances --filter "Name=ip-address,Values='<WebServerIP>'"
A large JSON document is returned that provides more details than you need for your troubleshooting.

To return only relevant details, you filter the results on the client side by using the query parameter. The command in the next step returns only the state of the instance, the private IP address, the instance ID, the security groups that are applied to it, the subnet in which it runs, and the key pair name that is associated with it. 

To filter the results, run the following command. In the command, replace <WebServerIP> with the same WebServerIP address that you've used in the previous steps: 

aws ec2 describe-instances --filter "Name=ip-address,Values='<WebServerIP>'" --query 'Reservations[*].Instances[*].[State,PrivateIpAddress,InstanceId,SecurityGroups,SubnetId,KeyName]'
The command results indicate that the instance is running and return additional information that you can use later.

Next, you try to establish an SSH connection to the web server instance by using EC2 Instance Connect.

In the browser tab with the AWS Management Console, in the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the navigation pane, choose Instances.

From the list of instances, select the Cafe Web Server instance.

Choose Connect.

On the EC2 Instance Connect tab, choose Connect.

After a few seconds, the attempt to connect fails. You get an error on the browser window that says, "Failed to connect to your instance." 

This behavior is expected.

 

Troubleshooting challenge #1
You have established that the web server instance is running but the webpage is not loading. What could the issue be?

Challenge yourself to conduct your investigation by using only AWS CLI programmatic access. Avoid using the AWS Management Console.

Hints:

Use the nmap utility to check which ports are open on the web server EC2 instance. 

To do this, you must first install the utility on the CLI Host instance by running the sudo yum install -y nmap command. 

Then run the nmap <WebServerIP> command. In this command, replace <WebServerIP> with the actual public IP address. 

If nmap cannot find any open ports, could there be something else blocking access to the instance?

Check the security group details by using the aws ec2 describe-security-groups command.

You might find it helpful to analyze the results of the command if you use the group-ids parameter. This value is also available in the text editor (WebServerSgId) with the other values that you've used in this lab. 

You can use the following command to look up the connectivity to port 22:

  
 command 

  
  
 In the following command, replace WebServerSgId with the value from your text editor, and run the adjusted command: 


  aws ec2 describe-security-groups --group-ids 'WebServerSgId'  
  
You can also use the describe-instances command to return the security group ID.

After you run the describe-security-groups command, analyze the resulting output. 

Do the security group settings that are applied to the web server EC2 instance look like they are allowing connectivity to port 22? 

Check the route table settings for the route table that is associated with the subnet where the web server is running.

Use the aws ec2 describe-route-tables command.

When you run this command, you might find it helpful to apply a filter like the following example: --filter "Name=association.subnet-id,Values='<VPC1PubSubnetID>'"

In this command, replace <VPC1PubSubnetID> with the actual subnet ID value from the text editor.

The subnet ID value was also returned when you ran the describe-instances command.

You can use the following command:

  
 command 

  
  
 In the following command, replace VPC1PubSubnetID and VPC1PubRouteTableId with the values from your text editor, and run the adjusted command: 


  aws ec2 describe-route-tables  --route-table-ids 'VPC1PubRouteTableId' --filter "Name=association.subnet-id,Values='VPC1PubSubnetID'"  
  
When you analyze the output of the describe-route-tables command, recall that the subnet is labeled as public.

Do you notice any issues with the routes? 

If you must define a new route, use the aws ec2 create-route command. 

You must know the route-table-id and gateway-id to successfully create a route. Both of these values are available in the text editor. You should also have the route-table-id from when you ran the describe-route-tables command earlier.

You can use the following command to create routes as needed:

  
 command 

  
  
 In the following command, replace VPC1PubRouteTableId and VPC1GatewayId with the values from your text editor, and run the adjusted command. 


  aws ec2 create-route --route-table-id 'VPC1PubRouteTableId' --gateway-id  'VPC1GatewayId' --destination-cidr-block '0.0.0.0/0'  
  
You can also use the aws ec2 describe-internet-gateways command to get the gateway-id. You might also need to specify other parameters to run the command successfully.

After you think you have solved the issue, return to the browser tab where you tried to load the web server page, and refresh the webpage. The browser page should display a message that says, "Hello From Your Web Server!"

Congratulations! You have resolved the issue that prevented you from accessing the website. However, another issue remains, and you investigate this issue in the next section.

 

Troubleshooting challenge #2
Now that you resolved the web access issue, try connecting to the web server instance using EC2 instance Connect. 

This attempt also fails. An error similar to the message that you received earlier displays on the browser. Again, this behavior is expected.

What could be the remaining issue?

You already verified that the web server is running. You successfully created a route table entry to connect the subnet where the web server instance is running to the internet. You also verified that the security group allows connections on port 22, which is the default SSH port.

Hints:

On the CLI Host instance terminal, check the network access control list (network ACL) settings for the network ACL that is associated with the subnet where the instance is running. 

To do this, run the following command. In the command, replace <VPC1PublicSubnetID> with the subnet ID from the text editor:

aws ec2 describe-network-acls --filter "Name=association.subnet-id,Values='VPC1PublicSubnetID'" --query 'NetworkAcls[*].[NetworkAclId,Entries]'
Analyze the output that results from running the command. Do any of the entries look like they might be causing the issue?

To delete any network ACL entries that might be causing an issue, use the delete-network-acl-entry command. Note the network acl-id retrieved by the previous command.

You can use following command to delete the rule:

   
 command 

    	
    	
 In the following command, replace acl-id with the value from the output in the previous command, and run the adjusted command: 


    	aws ec2 delete-network-acl-entry --network-acl-id 'acl-id' --ingress --rule-number 40  
   
 

After you think you have solved the issue, try connecting to the web server instance using EC2 Instance Connect again and confirm that you can connect. If you can connect, you have successfully resolved the issue. To confirm that you are connected to the correct EC2 instance, run the hostname command after you are connected. It should indicate web-server as the hostname.

Congratulations! You have resolved the SSH access issue that prevented you from connecting to the web server.

 

Task 4: Analyzing flow logs
You have resolved the network issues. While doing so, you created some useful entries in the flow logs that you created when you created VPC Flow Logs at the beginning of this lab. 

In this final task, you query the flow logs to observe the activities that they capture.

Task 4.1: Downloading and extracting flow logs
In the CLI Host terminal window, to create a local directory where you can download the flow log files, run the following command:

mkdir flowlogs

To change the directory to the new directory, run the following command:

cd flowlogs

To list the S3 buckets to recall the bucket name, run the following command:

aws s3 ls

To download the flow logs, run the following command. In the command, replace <flowlog######> with the bucket name that you used earlier in the lab:

aws s3 cp s3://<flowlog######>/ . --recursive

If the command is successful, you should see that many files are downloaded to a subdirectory similar to the following: AWSLogs/AccountID/vpcflowlogs/us-west-2/yyyy/mm/dd/

Next, you move down the folder structure to the subdirectory where you downloaded the files. 

To reach the required subdirectory, run following cd command. In the command, replace <AWSLogs/AccountID/vpcflowlogs/us-west-2/yyyy/mm/dd/> with the subdirectory from the output of the previous command:

cd <AWSLogs/AccountID/vpcflowlogs/us-west-2/yyyy/mm/dd/>

Tip: You can also use the cd command and repeatedly press the Tab key to reach the required subdirectory. 

To see all the downloaded log files, run the ls command. The logs are located in an AWSLogs/<AccountID>/vpcflowlogs/<region>/yyyy/mm/dd subdirectory.

The file names all end in log.gz, which indicates that they are compressed as GNU .zip files.

To extract the logs, run the following command:

gunzip *.gz

Run the ls command again. 

All the files are now extracted.

Task 4.2: Analyzing the logs
In this section, you analyze the flow logs to check if your failed SSH connection attempts were captured in the logs.

First, you analyze the structure of the logs.

Copy one of the file names that were returned by the ls command that you ran in the previous steps.

In the terminal window, run the following command. In the command, replace <file name> with the file name that you copied in the previous step.

head <file name>

The header row indicates the kind of data that each log entry contains. Each entry contains information, such as the IP address of the source of the event (in the fourth column), the destination port (seventh column), start and end timestamps (in Unix timestamp format), and the action that resulted (ACCEPT or REJECT).

To search each log file in the current directory and return lines that contain the word REJECT, run the following command:

grep -rn REJECT .
This command should return a large dataset because it includes every event where the VPC settings rejected the request.

To find out how many records were returned, run the following command: 

grep -rn REJECT . | wc -l
The results show the number of lines in your result set.

To refine your search by looking for only lines that contain 22 (which is the port number where you attempted to connect to the web server when access was blocked), run the following command:

grep -rn 22 . | grep REJECT
This command should return a smaller number of results.

To isolate the result set so that it displays only the log entries that correspond to the failed SSH connection attempts that you made, you must filter the results further.

Recall that your failed attempts to use SSH to connect the web server were initiated from your local machine. In the next step, you determine the IP address by which your local machine is addressable from the internet.

On the AWS Management Console, go to the Amazon EC2 service in the same Region where your EC2 instances are running.

Choose Security Groups.

Choose the link for WebSecurityGroup, and then choose the Inbound rules tab.

Choose Edit inbound rules, and then choose Add Rule.

In the third row that you just created, for Source, choose My IP. 

Copy the IP address from the Classless Inter-Domain Routing (CIDR) block that is automatically populated (it will end in /32), and paste it into a text editor. Copy only the IP address, not the /32 suffix.

Choose Cancel. 

You do not need to modify any security groups in this account. The purpose of this step is to capture this IP address.

In the CLI Host terminal session, run the following refined query on the flow logs. In the following command, replace <ip-address> with the IP address from the CIDR block that you copied in the previous steps:

grep -rn 22 . | grep REJECT | grep <ip-address>
The number of lines in the result set should now match the number of times you tried and failed to use SSH to connect the web server instance.

Notice that the elastic network interface ID is in each of the log entries that were returned by your query.

To confirm that the network interface ID that is recorded in the flow log matches the network interface that is assigned to the web server instance (as part of the network interface), run the following command. In the command, replace <WebServerIP> with the IP address from text editor:

aws ec2 describe-network-interfaces --filters "Name=association.public-ip,Values='<WebServerIP>'" --query 'NetworkInterfaces[*].[NetworkInterfaceId,Association.PublicIp]'
Next, you translate the timestamps into a human-readable format.

Notice the two long numbers that appear toward the end of each log entry before the REJECT term.

These numbers are Unix-formatted timestamps. The first timestamp indicates the start time of each event that was captured. The second timestamp indicates the end time. You can convert them into a human-readable format by using the Linux date command line utility. For example, if the timestamp is 1554496931, then you would run the following command:

date -d @1554496931
To translate one of the timestamps into a human-readable format, run the date -d @ command for one of the captured timestamps from one of the filtered REJECT results. It should indicate a time from today that corresponds to when you were working through this lab. 

To compare the result to the current time, run the following command:

date
Using grep is a powerful but basic way to pull meaningful data out of VPC Flow Log files. The market offers many tools for running reports or generating analytic dashboards from logs. One solution is to use the Amazon Athena service. You can use Athena to ingest logs so that they become data in a database table. You can then run SQL queries to extract meaningful information from the logs. For more information about Athena, see Querying Amazon VPC Flow Logs.

 

Conclusion
Congratulations! You now have successfully done the following:

Created VPC Flow Logs

Troubleshot VPC configuration issues

Analyzed flow logs

Lab complete
