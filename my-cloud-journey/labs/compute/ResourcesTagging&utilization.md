Lab - Managing Resources with Tagging
This lab is divided into two parts:

In the Task portion of this lab, you will use the AWS Command Line Interface (CLI) to inspect the tags assigned to a number of Amazon EC2 instances. You will then use pre-provided scripts to shut down and start up a number of Amazon EC2 instances simultaneously, based on their tags.
In the Challenge portion of this lab, you will be challenged to think of a way to terminate instances that fail to implement specific tags.
Objectives
After completing this lab, you will be able to:

Apply tags to existing AWS resources.
Find resources based on tags.
Use the AWS CLI or AWS SDK for PHP to stop and terminate Amazon EC2 instances based on certain attributes of the resource.
Duration

This lab will require approximately 45 minutes to complete.

Scenario

The environment for this lab (pictured below) consists of:

Amazon VPC named Lab VPC
Public subnet
Private subnet
Amazon EC2 Linux instance named CommandHost [AWS Command Line Interface (CLI) tools have been pre-installed and configured for you on this instance]
8 Amazon EC2 Linux instances
Private instances have three custom tags applied to them:
Tag Name	content
Project	The project that the instance belongs to. The instances in this lab belong to one of two projects: ERPSystem and Experiment1.
Version	The version of the project that this instance belongs to. All Version tags are currently set to 1.0.
Environment	One of three values: development, staging, or production.

In the Task portion of this lab, you will log in to the Command Host and run some commands to find and change the Version tag on all development instances. You will run several examples that show how you can use the JMESPath syntax supported by the AWS CLI --query option to return richly formatted output. You will then use a set of pre-provided scripts to stop and re-start all instances that are tagged as belonging to the development environment.

ResourcesArchitecture

 

Accessing the AWS Management Console
At the top of these instructions, click Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status.

Wait until you see the message "Lab status: ready", then click the X to close the Start Lab panel.

At the top of these instructions, click AWS

This will open the AWS Management Console in a new browser tab. The system will automatically log you in.

Tip: If a new browser tab does not open, there will typically be a banner or icon at the top of your browser indicating that your browser is preventing the site from opening pop-up windows. Click on the banner or icon and choose "Allow pop ups."

Arrange the AWS Management Console tab so that it displays along side these instructions. Ideally, you will be able to see both browser tabs at the same time, to make it easier to follow the lab steps.

 Please do not change the Region during this lab.

 

Task 1: Using Tags to Manage Resources
In this task, you will log in to the Command Host, and use the AWS CLI to find a set of resources according to their tags. You will then use the AWS CLI to change the value of one of the tags.

 

Connect to the Command Host
The following instructions now vary slightly depending on whether you are using Windows or Mac/Linux.

 

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


 

Mac  and Linux  Users
These instructions are for Mac/Linux users only. If you are a Windows user, skip ahead to the next task.

In the AWS Management Console, on the Services  menu, click EC2.

In the left navigation pane, click Instances.

Select the Command Host.

Copy the IPv4 Public IP from the Description in the lower pane.

Read through the three bullet points in this step before you start to complete the actions, because you will not be able see these instructions when the Details panel is open.

Click on the Details drop down menu above these instructions you are currently reading, and then click Show. A Credentials window will open.
Click on the Download PEM button and save the labsuser.pem file.
Then exit the Details panel by clicking on the X.
Open a terminal window, and change directory cd to the directory where the labsuser.pem file was downloaded.

For example, run this command, if it was saved to your Downloads directory:

cd ~/Downloads
Change the permissions on the key to be read only, by running this command:

chmod 400 labsuser.pem
Return to the terminal window and run this command (replace <public-ip> with the Public IPv4 value you copied to your clipboard earlier in the lab):

ssh -i labsuser.pem ec2-user@<public-ip>
Type yes when prompted to allow a first connection to this remote SSH server.

Because you are using a key pair for authentication, you will not be prompted for a password.


 

Finding Development Instances For The Project
Now that you are logged in, you can use the AWS CLI to find the resources in your private subnet that belong to the ERPSystem project and are in the Environment named development. You will also see how to use the AWS CLI --query option to produce richly formatted results.

To find all instances in your account that are tagged with a tag of Project and a value of ERPSystem, copy the following command and run it in the Linux terminal window:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem"
The command should output the full set of parameters available for all seven instances that are tagged Project=ERPSystem. This is a lot of output, and most of it does not apply to this lab. In the next step, you will use the --query parameter to narrow down the results.

Use the --query parameter to limit the output of the previous command to only the instance ID of the discovered instance:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" --query 'Reservations[*].Instances[*].InstanceId'
Your output entries will now consist of a list of instance IDs:


[ 
[
"i-135b491e" 
], 
[ 
"i-3e584a33" 
], 
… 
]

The --query command used in this example uses the JMESPath wildcard syntax to specify that the command should iterate through all reservations and all instances and return the InstanceId for each instance in the return results.
This is an improvement over returning every property of our instances. But what if you want to include multiple fields in the output?

Copy the following command and run it in the Linux terminal window to include both the instance ID and the Availability Zone of each instance in your return result:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" --query 'Reservations[*].Instances[*].{ID:InstanceId,AZ:Placement.AvailabilityZone}'
Two name/value pairs are returned for each result.
This command builds on the previous command’s use of the JMESPath syntax by using curly braces to specify a query for multiple properties on each instance returned:

object.{Alias1:PropertyName1,Alias2:PropertyName2,[…]}

As seen here, you can specify an alias for each property in order to return a more abbreviated output format.

With this output, you can clearly see that your filter worked, and you are only seeing instances that are associated with the project ERPSystem. However, you still will probably not be able to identify which instances are being returned, based on this information. In the next steps, you will see how to include the value of your custom tags in the return output.

To include the value of the Project tag in your output, copy and run the following command in the Linux terminal:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" --query 'Reservations[*].Instances[*].{ID:InstanceId,AZ:Placement.AvailabilityZone,Project:Tags[?Key==`Project`] | [0].Value}'
Your output now includes the value of the Project tag:


[[{ 
"Project": "ERPSystem", 
"AZ": "us-west-2a", 
"ID": "i-3250b838" 
}],
…
]

The value of a specific named tag can be retrieved via a JMESPath query, using the following syntax:

Tags[?Key==\`Project\`] | [0].Value
This syntax instructs JMESPath to find all elements within the Tags array that have a Key value of Project. The output of that command—which will be a single Tags element—is then piped to another command that selects the first instance of this filtered set and selects the named parameter Value, which is the value of the Project tag. This result is then assigned the alias Project.

Copy and run the following command to also include the Environment and Version tags in your output:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" --query 'Reservations[*].Instances[*].{ID:InstanceId,AZ:Placement.AvailabilityZone,Project:Tags[?Key==`Project`] | [0].Value,Environment:Tags[?Key==`Environment`] | [0].Value,Version:Tags[?Key==`Version`] | [0].Value}'
The results will give you a fuller picture of the instances currently associated with the project named ERPSystem:


[[{ 
"Environment": "production", 
"Project": "ERPSystem", 
"Version": "1.0", 
"AZ": "us-west-2a", 
"ID": "i-3250b838" 
}], 
… 
]

Finally, add a second tag filter to see only the instances associated with the project named ERPSystem that belong to the Environment named development:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" "Name=tag:Environment,Values=development" --query 'Reservations[*].Instances[*].{ID:InstanceId,AZ:Placement.AvailabilityZone,Project:Tags[?Key==`Project`] | [0].Value,Environment:Tags[?Key==`Environment`] | [0].Value,Version:Tags[?Key==`Version`] | [0].Value}'
You should see only two instances returned by this command, both with a Project tag value of ERPSystem and an Environment tag value of development:


[[{ 
"Environment": "development", 
"Project": "ERPSystem", 
"Version": "1.0", 
"AZ": "us-west-2a", 
"ID": "i-9552ba9f" 
}], 
… 
]

 

Changing Version Tag for Development Process
In this procedure, you will change all of the Version tags on the instances marked as development for the project ERPSystem.

You could individually set these properties on each affected instance, but an automated approach is more practical. You can use a simple Linux Bash shell script to build on the queries you built earlier and modify tag entries as a batch operation.

On the CommandHost, open the file /home/ec2-user/change-resource-tags.sh:

nano change-resource-tags.sh
Examine the contents of the script:

#!/bin/bash

ids=$(aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" "Name=tag:Environment,Values=development" --query 'Reservations[*].Instances[*].InstanceId' --output text)

aws ec2 create-tags --resources $ids --tags 'Key=Version,Value=1.1'
This script first uses the command aws ec2 describe-instances to return only a list of instance IDs for the development machines that belong to the ERPSystem project. It then passes those values to the aws ec2 create-tags command, which either creates a new tag or (in this case) overwrites an existing tag.  

Notice how the first command uses the --output text option to manipulate the return results as text instead of as JSON. Using this command instead of JSON on a simple return result—in this case, a list of IDs—can make it easier to manipulate the return result and pass it to other commands.

Close the nano editor and run this command from the Linux command prompt:

./change-resource-tags.sh
To verify that the version number on these instances has been incremented and that other non-development boxes in the ERPSystem project have been unaffected, copy and run the following command:

aws ec2 describe-instances --filter "Name=tag:Project,Values=ERPSystem" --query 'Reservations[*].Instances[*].{ID:InstanceId, AZ:Placement.AvailabilityZone, Project:Tags[?Key==`Project`] |[0].Value,Environment:Tags[?Key==`Environment`] | [0].Value,Version:Tags[?Key==`Version`] | [0].Value}'
 

Task 2: Stop and Start Resources by Tag
In this task, you will use a pre-provided script to stop and start a set of instances tagged as development instances.  

 

Examining the Stopinator Script
On the Command Host Instance, cd into the directory aws-tools in the home directory:

cd aws-tools
Open the file stopinator.php and examine its contents:

nano stopinator.php
The stopinator.php script is a simple script that uses the AWS SDK for PHP to stop and restart instances based on a set of tags. This enables scenarios such as shutting off your development environment servers at the end of the day and restarting them the next morning. The script will look in every AWS region for instances that match the specified tags.
The script takes the following arguments:

-t: A set of tags in the following format: name=value;name=value
    The script converts these tags into the format expected by the AWS PHP call Ec2::DescribeInstance(). If this optional parameter is absent, the script will identify and shut down all running Amazon EC2 instances in the account.
-s: A Boolean parameter; no arguments are required. When this parameter is present, instances identified by -t are started instead of stopped.
Exit your nano editor.

 

Stopping and Restarting ERPProject Development Process
In this task, you will use the stopinator.php script to bring down and bring back up your development environment for the ERPSystem project.

From the Linux shell, run the stopinator.php script:

./stopinator.php -t"Project=ERPSystem;Environment=development"
The output should look like this, indicating that two instances will be stopped in your current AWS region. (Your results will differ depending on the region in which your lab is running.)

Region is us-east-1 
  No instances to stop in region 
Region is us-west-1 
  No instances to stop in region 
Region is us-west-2 
  Identified instance i-9552ba9f 
  Identified instance i-d35fb7d9 
Stopping all identified instances... 
[…] 
  No instances to stop in region 
Region is sa-east-1 
  No instances to stop in region 

On the Services menu, click EC2.

In the navigation pane, click Instances.

Verify that two instances are stopping or have already been stopped.

Return to the SSH session for Command Host, and from the Linux prompt, restart your instances with the following command:

./stopinator.php -t"Project=ERPSystem;Environment=development" -s
Return to the EC2 Management Console window and verify that the two instances that were previously shut down are now restarting.

 

Task 3: Challenge: Terminate Non-Compliant Instances
In this Challenge, you will be asked to find a way to terminate instances that do not conform to certain security guidelines.

Note If you are already familiar with AWS, we recommend that you try this challenge yourself before reading the detailed solution provided in the next section. When you have completed the challenge, check your work by reviewing the detailed solution.

Challenge Description
Scenario: Your company wants you to create automated processes that will automatically terminate instances that might allow a possible security breach. You have identified a list of security risks and are now deciding how to implement them efficiently by using either AWS CLI commands or the PHP SDK for AWS.
Challenge: Your first security task is simple: find all instances in your private subnet that do not implement the Environment tag, and terminate them (i.e., a “tag-or-terminate” policy).

Hints:

If you are not comfortable with PHP or a similar programming language (such as Python or Ruby) for which an AWS SDK is available, try to use a series of AWS CLI commands to perform this task.
The AWS PHP call Ec2::terminateInstances() can terminate instances. The equivalent AWS CLI command is aws ec2 terminate-instances.
You can use the stopinator script from section 2 as a reference for any code you write.
Challenge Solution Overview

There are multiple ways to approach this problem using a variety of programmatic or command-line solutions. The general solution to the problem consists of the following steps:

Identify all of the instances that currently have the Environment tag defined.
Compare this against the list of all available instances, and record the instance IDs of any instances that are not part of the list obtained from Task 1.
Supply the instance IDs of the non-tagged instances to AWS by using the aws ec2 stop-instance command (AWS CLI) or the Ec2::terminateInstances() API call (PHP).
The following solution demonstrates how this problem could be solved using a PHP script.

 

Task 3.1: Review the Tag-Or-Terminate Script
Open the file terminate-instances.php with the nano editor.

nano terminate-instances.php
Examine the params block for this script. Note that it takes two arguments: the current region that you are running in (region), and the ID of a subnet (subnetid). The code uses the subnetid argument to determine where to look for non-compliant instances.

Examine the first block of code, beginning with the comment # Obtain a list of all instances with the Environment tag set.
This block of code uses the describeInstances() method, a filter to find all instances that have the Environment tag defined, regardless of the tag’s value. It stores all of the instance IDs that it finds in a hash table.

Examine the second block of code.

This code examines all instances within your subnet and compares them to the list of instances that are tagged with the Environment tag. If an instance is not in the tagged list, then its instance ID is added to a list of instances to terminate.

Examine the last section of the script.

These lines use the list of non-compliant instance IDs as an argument to the terminateInstances method.

 

Configuring Environment to Test Script
Before running the script, you will need to alter a couple of instances in your lab so that they no longer have the Environment tag defined.

Return to your EC2 Management Console and observe the instances running in your lab environment.
Select one of the instances in your private subnet.
On the Tags tab for the instance, click Add/Edit Tags.
Find the Environment tag, and click the remove icon.
Click Save. Repeat this process for one other instance in your private subnet.
 

Run the Script
In the EC2 Management Console, select one of the instances in your private subnet.

On the Description tab for your instance, find the Availability zone field, and copy all but the last letter to a text file. This value will be referred to as region in a subsequent procedure.

Find the Subnet ID field, and copy its value to a text file. This value will be referred to as subnet-id in a subsequent procedure.

Return to your SSH session, and run the terminate-instances.php script (replacing the <region> with your region and <subnet-id> with your subnet-id):

./terminate-instances.php -region <region> -subnetid <subnet-id>
You should see something similar to the following results:


Checking i-dd3a90d1 
Checking i-a4248ea8 
Checking i-793a9075 
Checking i-a9248ea5 
Checking i-aa248ea6 
Checking i-da3a90d6 
Checking i-a13b91ad 
Checking i-a23b91ae 
Checking i-ab248ea7 
Terminating instances... 
Instances terminated.

 

Lab Complete


B)Activity - Optimize Utilization
Activity overview
In this activity, you will optimize the AWS resources that are used to run the Café web application. Specifically, you will:

Uninstall the decommissioned local database from the Café instance to decrease the instance’s storage requirements.

Change the instance type to T3 micro to reduce costs.

This diagram illustrates the topology of the Café web application runtime environment before and after the optimization.


Before and after resource optimization topology diagrams:

before and after optimization topology graphic

 

Activity objectives
After completing this activity, you will be able to:

Optimize an Amazon Elastic Compute Cloud (Amazon EC2) instance to reduce costs.
Use the AWS Pricing Calculator to estimate AWS service costs.
 

Business case relevance
A new business requirement for Café—Optimize resources to reduce AWS service costs

cafe scene

After the migration to Amazon Relational Database Service (Amazon RDS) was completed (an action taken in a prior activity), Sofîa identified a number of optimization opportunities that she could implement to reduce AWS service costs. First, she realized that the decommissioned local database could be uninstalled to reduce the storage requirements of the Café instance. She also realized that the Café instance could be downsized to a smaller instance type because the database process was no longer running on it.

In this activity, you will take on the role of Sofîa, and work on optimizing the Café instance to save costs.

 

Activity steps
Duration: This activity requires approximately 50 minutes to complete.


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c546d68b-f3be-45e3-9d42-e42beef9af5f" />
 

Accessing the AWS Management Console
At the top of these instructions, click Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status.

Wait until you see the message "Lab status: ready", then click the X to close the Start Lab panel.

At the top of these instructions, click AWS

This will open the AWS Management Console in a new browser tab. The system will automatically log you in.

Tip: If a new browser tab does not open, there will typically be a banner or icon at the top of your browser indicating that your browser is preventing the site from opening pop-up windows. Click on the banner or icon and choose "Allow pop ups."

Arrange the AWS Management Console tab so that it displays along side these instructions. Ideally, you will be able to see both browser tabs at the same time, to make it easier to follow the lab steps.

 

Task 1: Optimize the website to reduce costs
Because the local database was migrated to Amazon RDS, you can reduce AWS service costs by performing the following actions on the Café EC2 instance:

Remove the local database from the instance. This action will reduce costs in both CPU and storage utilization.
Change the instance type from t3.small to t3.micro. Because the database process no longer runs on the instance, the smaller instance type will be both effective and also cheaper to run.
In this task, you use the AWS Command Line Interface (AWS CLI) to perform these actions. You begin by opening a Secure Shell (SSH) session to the Café instance and the CLI Host.

 

Task 1.1: Connect to the Café instance by using SSH
If you are a Windows user, follow the steps described in Task 1.1.1. Otherwise, if you are a macOS or Linux user, follow the steps in Task 1.1.2.

macOS/Linux users—Click here for login instructions

 

Task 1.1.1: Windows SSH
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


 

Task 1.1.2: macOS/Linux SSH
These instructions are for Mac/Linux users only. If you are a Windows user, skip ahead to the next task.

Read through the three bullet points in this step before you start to complete the actions, because you will not be able see these instructions when the Details panel is open.

Click on the Details drop down menu above these instructions you are currently reading, and then click Show. A Credentials window will open.
Click on the Download PEM button and save the labsuser.pem file.
Then exit the Details panel by clicking on the X.
Open a terminal window, and change directory cd to the directory where the labsuser.pem file was downloaded.

For example, run this command, if it was saved to your Downloads directory:

cd ~/Downloads
Change the permissions on the key to be read only, by running this command:

chmod 400 labsuser.pem
Return to the AWS Management Console, and in the EC2 service, click on Instances. Check the box next to the CafeInstance and click on the Details tab.

NOTE: The setup for this lab takes a few minutes, because an RDS database instance must first be created before the CafeInstance EC2 instance is created, and RDS instances take a few minutes to create. If you do not yet set the CafeInstance EC2 instance, you will need to wait until the lab setup completes before you can complete this step.
Copy the IPv4 Public IP value.

Return to the terminal window and run this command (replace <public-ip> with the actual public IP address you copied):

ssh -i labsuser.pem ec2-user@<public-ip>
Type yes when prompted to allow a first connection to this remote SSH server.

Because you are using a key pair for authentication, you will not be prompted for a password.


 

Task 1.1.3: Configure the AWS CLI
Before you can run AWS CLI commands on the instance, you must first configure the AWS CLI environment to define the AWS account credentials, Region name, and output format to use.

Discover the region in which the CLI Host instance is running:

curl http://169.254.169.254/latest/dynamic/instance-identity/document | grep region
You will use this region information in a moment.

Update the AWS CLI software with the credentials.

aws configure
At the prompts, enter the following information:

AWS Access Key ID: Click on the Details drop down menu above these instructions, and then click Show. Copy the AccessKey value and paste it into the terminal window.
AWS Access and Secret Keys

AWS Secret Access Key: Copy and paste the SecretKey value from the same Credentials screen.
Default region name: Type in the name of the region where your EC2 instances are running, which you just discovered a moment ago. For example, us-east-1 or eu-west-2.
Default output format: json
Leave this terminal window SSH session open. You will return to use it later in the activity.

 

Task 1.2: Connect to the CLI Host instance by using SSH
Follow the same instructions that you used in Task 1.1 to open an SSH session to a different EC2 instance—the CLI Host instance.

Do not close the connection to the CafeInstance, instead, create a connection to the CLI Host in a new window (using putty on Windows or using an additional terminal window on macOS/Linux).

You can find the CLI Host public IP address in the EC2 console, or by clicking on the Details drop down menu above these instructions, and then click Show.

After connecting, be sure to also configure the AWS CLI client software on the CLI Host EC2 instance, by running the aws configure command.

 

Task 1.3: Uninstall MariaDB and resize the instance
Stop the local database and uninstall it from the Café instance. In the SSH window for the CafeInstance, enter:

sudo systemctl stop mariadb
sudo yum -y remove mariadb-server
If the last command runs successfully, you will see a Complete! message in the output.

Close the SSH window for the CafeInstance because you no longer need it.

Determine the Instance ID of the CafeInstance. Switch to the SSH window for the CLI Host instance and enter:

aws ec2 describe-instances \
--filters "Name=tag:Name,Values= CafeInstance" \
--query "Reservations[*].Instances[*].InstanceId"
Record the value returned as:

CafeInstance Instance ID: i-nnnnnnnnnn
Stop the Café instance and change its instance type to t3.micro. In the SSH window for the CLI Host instance, enter:

aws ec2 stop-instances --instance-ids <CafeInstance Instance ID>
In the command, substitute <CafeInstance Instance ID> with the value that you recorder earlier.

Change the instance type to t3.micro. In the SSH window for the CLI Host instance, enter:

aws ec2 modify-instance-attribute \
--instance-id <CafeInstance Instance ID> \
--instance-type "{\"Value\": \"t3.micro\"}"
In the command, substitute <CafeInstance Instance ID> with the value that you recorder earlier.

If the command completes successfully, no output is returned.

Start the Café instance. In the SSH window for the CLI Host instance, enter:

aws ec2 start-instances --instance-ids <CafeInstance Instance ID>
In the command, substitute <CafeInstance Instance ID> with the value that you recorder earlier.

Check the current state of the instance, and wait until the status shows running. In the SSH window for the CLI Host instance, enter:

aws ec2 describe-instances \
--instance-ids <CafeInstance Instance ID> \
--query "Reservations[*].Instances[*].[InstanceType,PublicDnsName,PublicIpAddress,State.Name]"
In the command, substitute <CafeInstance Instance ID> with the value that you recorder earlier.

The instance might take a few moments to reach the running state. Periodically repeat the command until you can confirm that it is running. Also, record the PublicDnsName and PublicIPAddress values that are returned by the command by using the following format:

Downsized CafeInstance Public DNS Name: ec2-zzz-zzz-zzz-zzz.eu-west-2.compute.amazonaws.com
Downsized CafeInstance Public IP Address: nnn.nnn.nnn.nnn
Information: Because you restarted the instance, Amazon EC2 will assign a different Public DNS name and Public IP address to the instance than what it had before.

Test the Café website to make sure that it is functional. In a browser window, enter the following URL:

http://<Downsized CafeInstance Public DNS Name>/cafe
Substitute <Downsized CafeInstance Public DNS Name> with the value that you recorded.

Exercise the website's functions to verify that it works properly.

Great job! You have successfully uninstalled the decommissioned local database and downsized the Café instance.

 

Task 2: Use the AWS Pricing Calculator to estimate AWS service costs
AWS provides a tool that allows you to estimate the monthly costs of the AWS services that you use or are planning to use. In this task, you will use the AWS Pricing Calculator to estimate the cost of running the Café website on AWS before and after EC2 instance optimization. You will then calculate the projected cost savings.

NOTE: The values that you will enter into the AWS Pricing Calculator have been simplified to serve the purposes of this exercise. The intent is to show you the basic use of the calculator and highlight the functions that it provides.

The pricing examples shown in this activity were current as of time of publishing, April 2020, and is for informational purposes. Refer to the AWS website for current pricing by service.

 

Task 2.1: Calculate the costs before optimization
First, calculate the costs of running the website in its before optimization topology, that is, on a T3 small instance with a decommissioned local database still occupying storage space.

Specifically, you will use the following service list and configuration to describe the topology components:

Region: (the region where the CafeInstance EC2 instance is running)

Amazon EC2 instance:

Instance type: t3.small
Instance class: On-Demand
Utilization: 100% per month
Operating system: Linux
Amazon EBS volume: General Purpose SSD (gp2), 40 GB (including 20 GB occupied by the local database)
Amazon RDS instance:

Instance class: db.t3.micro
Engine: MariaDB
Allocated storage: 20 GB
 

Open the AWS Pricing Calculator. In a web browser, go to:

https://calculator.aws
Click on Create estimate.

Browse down and choose Configure in the Amazon EC2 service box.

In the Region menu at the top of the page, select the region where the CafeInstance EC2 instance is running.

For example, choose US East (N. Virginia) if your instances is running in us-east-1.

If you are prompted to confirm the region change, choose Change Region.

Choose the Advanced estimate option.

In the EC2 instance specifications area, for the Operating system, choose Linux

In the Workload area:

Choose Constant usage.
For Number of instances choose 1.
In the EC2 instances area, in the search box, search for and then select the t3.small instance type.

In the Pricing strategy area, set the pricing model to On-Demand

In the Amazon Elastic Block Storage (EBS) area:

Storage for each EC2 instance: General Purpose SSD (gp2)
Storage amount: 40 GB
Snapshot Frequency: No snapshot storage
Scroll to the bottom and select Add to my estimate.

Congratulations, you have now estimated the cost of the EC2 instance.

Next, you will add the RDS instance to your price estimate.

In the My Estimate page, click Add service.

In the Select service page, locate and click Configure in the Amazon RDS for MariaDB service panel.

Configure as follows:

Region: (choose the same Region you chose for the EC2 instance)
MariaDB instance specifications: Standard (single-AZ)
Instance type: search for and select db.t3.micro
Quantity: 1
Pricing model: On-Demand Instances
Storage volume: General Purpose SSD (gp2)
Storage amount: 20 GB per month
Choose Add to my estimate.

The My Estimate page shows a breakdown of the estimated monthly cost of the AWS services that you configured, and it provides a monthly total.

Choose Save and share.

If prompted, choose Agree and continue.

Choose Copy the public link and paste the link into another browser tab.

This is the estimated cost of your before optimization topology.

calculator services before optimization image

Export the estimate to a comma-separated values (CSV) file by choosing Action > Export estimate.

In the export dialog window, click OK and save the file to your local computer. You can optionally open it to see its contents.

Record the total estimated monthly cost (for example, $35.50) as:

AWS Services Before Optimization Estimated Monthly Cost: $35.50
 

Task 2.2: Calculate the costs after optimization
Next, you will calculate the costs of running the website after the Café instance was optimized. Specifically, you will modify the following entries in the calculator to reflect the effects of the optimization:

Amazon EC2 instance:

Instance type: t3.micro (Reduced size)
Amazon Elastic Block Store (Amazon EBS) General Purpose SSD (gp2), 20 GB (Reduced from 40 GB because the local database was removed)
In the https://calculator.aws/#/estimate browser tab, click Edit next to the Amazon EC2 entry.

In the EC2 Instances area, search for and select t3.micro as the instance type.

In the Amazon Elastic Block Storage (EBS) area, change the Storage amount  to 20 GB.

Scroll down and click Save to see the monthly cost estimate.

The My Estimate page should show the estimate of
your monthly costs for the after optimization topology.

calculator estimate after optimization image

Export the estimate to a comma-separated values (CSV) file by choosing Action > Export estimate.

In the export dialog window, click OK and save the file to your local computer. You can optionally open it to see its contents.

Record the total estimated monthly cost (for example, $25.18) as:

AWS Services After Optimization Estimated Monthly Cost: $25.18
 

Task 2.3: Estimate the projected cost savings for Café
Because you calculated the costs of the AWS services that are needed to run the Café website both before and after you optimize the instance, you can estimate the overall projected cost savings as follows:

Before optimization monthly costs:
    - Amazon RDS service         $14.71
    - Amazon EC2 service         $20.89
                                --------
    Total                        $35.60

After optimization monthly costs:
    - Amazon EC2 service         $10.47  
    - Amazon RDS service         $14.71
                                --------
    Total                        $25.18


Overall monthly cost savings     $10.42
Pricing is current as of time of publishing, April, 2020, and is for demonstration purposes only. Refer to the AWS website for current pricing by service.
Congratulations! By removing the decommissioned local database and downsizing the Café instance type, you will save more than $10 per month in AWS service costs.

 

Update from Café

Cafe Logo

Martha and Frank are very happy that Sofîa's initiative resulted in cost savings for the business. The amount of savings might be small, but it still helps the business!

 

Activity Complete
