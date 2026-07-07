Scaling and Load Balancing Your Architecture
Lab overview
In this lab, you use the Elastic Load Balancing (ELB) and Amazon EC2 Auto Scaling to load balance and automatically scale your infrastructure.

ELB automatically distributes incoming application traffic across multiple Amazon Elastic Compute Cloud (Amazon EC2) instances. ELB provides the amount of load balancing capacity needed to route application traffic to help you achieve fault tolerance in your applications.

Auto Scaling helps you maintain application availability and gives you the ability to scale your Amazon EC2 capacity out or in automatically according to conditions that you define. You can use auto scaling to help ensure that you are running your desired number of EC2 instances. Auto scaling can also automatically increase the number of EC2 instances during spikes in demand to maintain performance and can decrease capacity during lulls to reduce costs. Auto scaling is well suited to applications that have stable demand patterns or that experience hourly, daily, or weekly variability in usage.  

The following is the starting architecture:

Starting architecture showing AWS infrastructure with web server 1 in public subnet.

The following is the final architecture:

Final architecture showing ELB and EC2 instances in Auto scaling group in private subnets spread across 2 Availability Zones

 

Objectives
After completing this lab, you should be able to do the following:

Create an AMI from an EC2 instance.

Create a load balancer.

Create a launch template and an Auto Scaling group.

Configure an Auto Scaling group to scale new instances within private subnets.

Use Amazon CloudWatch alarms to monitor the performance of your infrastructure.

Duration
This lab requires approximately 45 minutes to complete.

 

Accessing the AWS Management Console
At the top of these instructions, choose  Start Lab to launch your lab.

Tip: If you need more time to complete the lab, then choose  Start Lab again to restart the timer for the environment.

Lab resources will be displayed on the upper-left corner:

AWS  indicates that AWS lab resources are currently being created.

AWS  indicates that AWS lab resources are ready.

Wait for the lab to be ready before proceeding.

At the top of these instructions, choose AWS .

This option opens the AWS Management Console in a new browser tab. The system automatically signs you in.

Tip: If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console so that it appears alongside these instructions. Ideally, you will be able to see both browser tabs at the same time so that you can follow the lab steps.

 Do not change the lab Region unless specifically instructed to do so.

 

Task 1: Creating an AMI for auto scaling
In this task, you create an AMI from the existing Web Server 1. This action saves the contents of the boot disk so that new instances can be launched with identical content.

On the AWS Management Console, in the Search bar, enter and choose EC2 to open the Amazon EC2 Management Console.

In the left navigation pane, locate the Instances section, and choose Instances.

The Web Server 1 instance is listed. You now create an AMI based on this instance.

Choose the  Web Server 1 instance, which should appear in a  Running state.

From the Actions  dropdown list, choose Image and templates > Create image, and then configure the following options:

For Image name, enter Web Server AMI

For Image description - optional, enter Lab AMI for Web Server    

Choose Create image.

The confirmation screen displays the AMI ID for your new AMI. You use this AMI when launching the Auto Scaling group later in the lab.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c1d9f1df-3b47-4d7e-a67d-fa609947b901" />


Task 2: Creating a load balancer
In this task, you create a load balancer that can balance traffic across multiple EC2 instances and Availability Zones.

In the left navigation pane, locate the Load Balancing section, and choose Load Balancers.

Choose Create load balancer.

In the Load balancer types section, for Application Load Balancer, choose Create.

On the Create Application Load Balancer page, in the Basic configuration section, configure the following option:

For the Load balancer name, enter LabELB

In the Network mapping section, configure the following options:

For VPC, choose Lab VPC.

For Mappings, choose both Availability Zones listed.

For the first Availability Zone, choose Public Subnet 1.

For the second Availability Zone, choose Public Subnet 2.

These options configure the load balancer to operate across multiple Availability Zones.

In the Security groups section, choose the X for the default security group to remove it.

From the Security groups dropdown list, choose Web Security Group.

The Web Security Group has already been created for you, which permits HTTP access.

In the Listeners and routing section, choose the Create target group link.

Note: This link opens a new browser tab with the Create target group configuration options.

On the new Target groups browser tab, in the Basic configuration section, configure the following:

For Choose a target type, choose Instances.

For Target group name, enter lab-target-group

At the bottom of the page, choose Next.

On the Register targets page, choose Create target group.

Once the target group has been created successfully, close the Target groups browser tab.

Return to the Load balancers browser tab. In the Listeners and routing section, choose  Refresh to the right of the Forward to dropdown list for Default action.

From the Forward to dropdown list, choose lab-target-group.

At the bottom of the page, choose Create load balancer.

   You should receive a message similar to the following:

    Successfully created load balancer: LabELB

To view the LabELB load balancer that you created, choose View load balancer.

To copy the DNS name of the load balancer, use the copy option , and paste the DNS name into a text editor. 

You need this information later in the lab.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a79fbf8e-0966-4767-bf07-faefaeeab0e0" />


Task 3: Creating a launch template 
In this task, you create a launch template for your Auto Scaling group. A launch template is a template that an Auto Scaling group uses to launch EC2 instances. When you create a launch template, you specify information for the instances, such as the AMI, instance type, key pair, security group, and disks.

At the top of the AWS Management Console, in the search bar, enter and choose EC2

In the left navigation pane, locate the Instances section, and choose Launch Templates.

Choose Create launch template.

On the Create launch template page, in the Launch template name and description section, configure the following options:

For Launch template name - required, enter lab-app-launch-template

For Template version description, enter A web server for the load test app

For Auto Scaling guidance, choose  Provide guidance to help me set up a template that I can use with EC2 Auto Scaling.

In the Application and OS Images (Amazon Machine Image) - required section, choose the My AMIs tab. Notice that Web Server AMI is already chosen.

In the Instance type section, choose the Instance type dropdown list, and choose t3.micro.

In the Key pair (login) section, confirm that the Key pair name dropdown list is set to Don't include in launch template.

   Amazon EC2 uses public key cryptography to encrypt and decrypt login information. To log in to your instance, you must create a key pair, specify the name of the key pair when you launch the instance, and provide the private key when you connect to the instance.

  Note: In this lab, you do not need to connect to the instance.

In the Network settings section, choose the Security groups dropdown list, and choose Web Security Group.

  When you launch an instance, you can pass user data to the instance. The data can be used to run configuration tasks and scripts.

Choose Create launch template.

		You should receive a message similar to the following:

		 Successfully created lab-app-launch-template.

Choose View launch templates.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/43c7a096-624a-4701-a2df-2df57c68866a" />
 

Task 4: Creating an Auto Scaling group
In this task, you use your launch template to create an Auto Scaling group.

Choose  lab-app-launch-template, and then from the Actions  dropdown list, choose Create Auto Scaling group

On the Choose launch template or configuration page, in the Name section, for Auto Scaling group name, enter Lab Auto Scaling Group

Choose Next.

On the Choose instance launch options page, in the Network section, configure the following options:

From the VPC dropdown list, choose Lab VPC.

From the Availability Zones and subnets dropdown list, choose Private Subnet 1 (10.0.1.0/24) and Private Subnet 2 (10.0.3.0/24). 

Choose Next.

On the Configure advanced options – optional page, configure the following options: 

In the Load balancing – optional section, choose Attach to an existing load balancer.

In the Attach to an existing load balancer section, configure the following options:

Choose Choose from your load balancer target groups.

From the Existing load balancer target groups dropdown list, choose lab-target-group | HTTP.

In the Health checks – optional section, for Health check type, choose  ELB.

Choose Next.

On the Configure group size and scaling policies – optional page, configure the following options: 

In the Group size – optional section, enter the following values: 

Desired capacity:2

Minimum capacity: 2

Maximum capacity: 4

In the Scaling policies – optional section, configure the following options:

Choose  Target tracking scaling policy.

For Metric type, choose Average CPU utilization.

Change the Target value to 50

This change tells Auto Scaling to maintain an average CPU utilization across all instances of 50 percent. Auto Scaling automatically adds or removes capacity as required to keep the metric at or close to the specified target value. It adjusts to fluctuations in the metric due to a fluctuating load pattern.

Choose Next.

On the Add notifications – optional page, choose Next.

On the Add tags – optional page, choose Add tag and configure the following options:

Key: Enter Name

Value - optional: Enter Lab Instance

Choose Next.

Choose Create Auto Scaling group.

These options launch EC2 instances in private subnets across both Availability Zones.

Your Auto Scaling group initially shows an Instances count of zero, but new instances will be launched to reach the desired count of two instances.

Note: If you experience an error related to the t3.micro instance type not being available, then rerun this task by choosing the t2.micro instance type instead.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d8b08a67-ecc0-48db-b847-8f2c2a4ef666" />


Task 5: Verifying that load balancing is working
In this task, you verify that load balancing is working correctly.

In the left navigation pane, locate the Instances section, and choose Instances.

You should see two new instances named Lab Instance. These instances were launched by auto scaling.  If the instances or names are not displayed, wait 30 seconds, and then choose refresh .

First, you confirm that the new instances have passed their health check.

In the left navigation pane, in the Load Balancing section, choose Target Groups.

Choose lab-target-group.

In the Registered targets section, two Lab Instance targets should be listed for this target group.

Wait until the Health status of both instances changes to healthy. To check for updates, choose refresh .

A healthy status indicates that an instance has passed the load balancer's health check. This check means that the load balancer will send traffic to the instance.

You can now access the instances launched in the Auto Scaling group using the load balancer.

Open a new web browser tab, paste the DNS name that you copied before, and press Enter.

The Load Test application should appear in your browser, which means that the load balancer received the request, sent it to one of the EC2 instances, and then passed back the result.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/96f8198d-f8bc-49e6-89b9-fbc736af52cb" />


Task 6: Testing auto scaling
You created an Auto Scaling group with a minimum of two instances and a maximum of four instances. Currently, two instances are running because the minimum size is two and the group is currently not under any load. You now increase the load to cause auto scaling to add additional instances.

Return to the AWS Management Console, but keep the Load Test application tab open. You return to this tab soon.

In the AWS Management Console, in the search bar, enter and choose CloudWatch

In the left navigation pane, in the Alarms section, choose All alarms.

Two alarms are displayed. The Auto Scaling group automatically created these two alarms. These alarms automatically keep the average CPU load close to 50 percent while also staying within the limitation of having 2–4 instances.

Choose the alarm that has AlarmHigh in its name. This alarm should have a State of OK.

 If the alarm is not showing OK for the State, wait a minute and then choose refresh  until the State changes.

The OK state indicates that the alarm has not been initiated. It is the alarm for CPU Utilization > 50, which adds instances when the average CPU utilization is high. The chart should show very low levels of CPU at the moment. 

You now tell the application to perform calculations that should raise the CPU level.

Return to the browser tab with the Load Test application.

Next to the AWS logo, choose Load Test.

This step causes the application to generate high loads. The browser page automatically refreshes so that all instances in the Auto Scaling group will generate loads. Do not close this tab.

Return to browser tab with the CloudWatch Management Console.

In less than 5 minutes, the AlarmLow alarm status should change to OK, and the AlarmHigh alarm status should change to In alarm.

 To update the display, choose refresh  every 60 seconds.

You should see the AlarmHigh chart indicating an increasing CPU percentage. Once it crosses the 50 percent line for more than 3 minutes, it initiates auto scaling to add additional instances.

Wait until the AlarmHigh alarm enters the In alarm state.

You can now view the additional instance or instances that were launched.

In the AWS Management Console, in the search bar, enter and choose EC2 

In the left navigation pane, locate the Instances section, and choose Instances.

More than two instances named Lab Instance should now be running. Auto scaling created the new instances in response to the alarm.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/50524f4a-7644-4076-976c-018da67c0387" />


 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d796addd-d556-42e6-aecc-87445462d582" />
 

Task 7: Terminating the Web Server 1 instance
In this task, you terminate the Web Server 1 instance. This instance was used to create the AMI that your Auto Scaling group used, but this instance is no longer needed.

Choose  Web Server 1, and ensure that it is the only instance selected.

From the Instance state  dropdown menu, choose Terminate instance.

Choose Terminate.

 

Optional challenge: Creating an AMI using AWS CLI 
 This challenge is optional and is provided in case you have lab time remaining.

In this challenge, you need to create an AMI using AWS Command Line Interface (AWS CLI) commands.

The following are your tasks:

Use Amazon EC2 Instance Connect to connect to one of the EC2 instances that you created earlier.

At the top of this page, choose AWS Details. For AWS CLI, choose Show. Configure AWS credentials based on the information provided.

For more information about how to configure AWS credentials, see Configuration and Credential File Settings.

After you have configured the credentials, create an AMI using AWS CLI. 

For more information about how to create an AMI using AWS CLI, see AWS CLI Command Reference Examples.

Tip: You need to provide the AMI name and instance ID of the EC2 instance that you need the image for.

 The following create-image example creates an AMI from the specified instance.

aws ec2 create-image \
    --instance-id i-1234567890abcdef0 \
    --name "My server" \
    --description "An AMI for my server"

Conclusion
Congratulations! You now have successfully done the following:

Created an AMI from an EC2 instance.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/dbecdc6d-afb7-43af-91d7-b789cd9167f4" />


Created a load balancer.

Created a launch template and an Auto Scaling group.

Configured an Auto Scaling group to scale new instances within private subnets.

Used CloudWatch alarms to monitor the performance of your infrastructure.

 

Lab complete 



B. Using Auto Scaling in AWS (Linux)
 

Lab overview
 

In this lab, you use the AWS Command Line Interface (AWS CLI) to create an Amazon Elastic Compute Cloud (EC2) instance to host a web server and create an Amazon Machine Image (AMI) from that instance. You then use that AMI as the basis for launching a system that scales automatically under a variable load by using Amazon EC2 Auto Scaling. You also create an Elastic Load Balancer to distribute the load across EC2 instances created in multiple Availability Zones by the auto scaling configuration. 


Objectives
After completing this lab, you will be able to do the following:

Create an EC2 instance by using an AWS CLI command.

Create a new AMI by using the AWS CLI.

Create an Amazon EC2 launch template.

Create an Amazon EC2 Auto Scaling launch configuration.

Configure scaling policies and create an Auto Scaling group to scale in and scale out the number of servers based on a variable load.

 Task 1: Creating a new AMI for Amazon EC2 Auto Scaling
In this task, you launch a new EC2 instance and then create a new AMI based on that running instance. You use the AWS CLI on the Command Host EC2 instance to perform all of these operations.

Task 1.1: Connecting to the Command Host instance
In this task, you use EC2 Instance Connect to connect to the Command Host EC2 instance that was created when the lab was provisioned. You use this instance to run AWS CLI commands.

On the AWS Management Console, in the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the navigation pane, choose Instances.

From the list of instances, select the  Command Host instance.

Choose Connect.

On the EC2 Instance Connect tab, choose Connect.

Note: If you prefer to use an SSH client to connect to the EC2 instance, see the guidance to Connect to Your Linux Instance.

Now that you are connected to the Command Host instance, you can configure and use the AWS CLI to call AWS services.

Task 1.2: Configuring the AWS CLI
The AWS CLI is preconfigured on the Command Host instance.

To confirm that the Region in which the Command Host instance is running is the same as the lab (the us-west-2 Region), run the following command:

curl http://169.254.169.254/latest/dynamic/instance-identity/document | grep region
You use this Region information in the next steps.

To update the AWS CLI software with the correct credentials, run the following command:

aws configure
At the prompts, enter the following information:

AWS Access Key ID: Press Enter.

AWS Secret Access Key: Press Enter.

Default region name: Enter the name of the Region from the previous steps in this task (for example, us-west-2). If the Region is already displayed, press Enter.

Default output format: Enter json

Now you are ready to access and run the scripts detailed in the following steps.

To access these scripts, enter the following command to navigate to their directory:

cd /home/ec2-user/
Task 1.3: Creating a new EC2 Instance
In this task, you use the AWS CLI to create a new instance that hosts a web server. 

To inspect the UserData.txt script that was installed for you as part of the Command Host creation, run the following command:

more UserData.txt
This script performs a number of initialization tasks, including updating all installed software on the box and installing a small PHP web application that you can use to simulate a high CPU load on the instance. The following lines appear near the end of the script:

find -wholename /root/.*history -wholename /home/*/.*history -exec rm -f {} \;
find / -name 'authorized_keys' -exec rm -f {} \;
rm -rf /var/lib/cloud/data/scripts/*
These lines erase any history or security information that might have accidentally been left on the instance when the image was taken.

At the top of this page, choose Details, and choose Show.

Copy the KEYNAME, AMIID, HTTPACCESS, and SUBNETID values into a text editor document, and then choose X to close the Credentials panel.

In the following script, replace the corresponding text with the values from the previous step.

aws ec2 run-instances --key-name KEYNAME --instance-type t3.micro --image-id AMIID --user-data file:///home/ec2-user/UserData.txt --security-group-ids HTTPACCESS --subnet-id SUBNETID --associate-public-ip-address --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]' --output text --query 'Instances[*].InstanceId'
Enter your modified script into the terminal window, and run the script.

The output of this command provides you with an InstanceId. Subsequent steps in this lab refer to this value as NEW-INSTANCE-ID. Replace this value as needed throughout this lab. 

Copy and paste the InstanceId value into a text editor to use later. 

To use the aws ec2 wait instance-running command to monitor this instance's status, replace NEW-INSTANCE-ID in the following command with the InstanceID value that you copied in the previous step. Run your modified command. 

aws ec2 wait instance-running --instance-ids NEW-INSTANCE-ID
Wait for the command to return to a prompt before proceeding.

Your instance starts a new web server. To test that the web server was installed properly, you must obtain the public DNS name.

To obtain the public DNS name, in the following command, replace NEW-INSTANCE-ID with the value that you copied previously, and run your modified command:

aws ec2 describe-instances --instance-id NEW-INSTANCE-ID --query 'Reservations[0].Instances[0].NetworkInterfaces[0].Association.PublicDnsName'
Copy the output of this command without the quotation marks. 

The value of this output is referred to as PUBLIC-DNS-ADDRESS in the next steps. 

In a new browser tab, enter the output that you copied from the previous step.

It could take a few minutes for the web server to be installed. Wait 5 minutes before continuing to the next steps.

Do not choose Start Stress at this stage. 

In the following command, replace PUBLIC-DNS-ADDRESS with the value that you copied in the previous steps, and then run your modified command.

http://PUBLIC-DNS-ADDRESS/index.php
If your web server does not appear to be running, check with your instructor.

Task 1.4: Creating a Custom AMI
In this task, you create a new AMI based on that instance that you just created.

To create a new AMI based on this instance, in the following aws ec2 create-image command, replace NEW-INSTANCE-ID with the value that you copied previously, and run your adjusted command:

aws ec2 create-image --name WebServerAMI --instance-id NEW-INSTANCE-ID
 By default, the aws ec2 create-image command restarts the current instance before creating the AMI to ensure the integrity of the image on the file system. While your AMI is being created, proceed to the next task.

 

Task 2: Creating an auto scaling environment
In this section, you create a load balancer that pools a group of EC2 instances under a single Domain Name System (DNS) address. You use auto scaling to create a dynamically scalable pool of EC2 instances based on the image that you created in the previous task. Finally, you create a set of alarms that scale out or scale in the number of instances in your load balancer group whenever the CPU performance of any machine within the group exceeds or falls below a set of specified thresholds.

You can perform the following task by using either the AWS CLI or the AWS Management Console. For this lab, you use the AWS Management Console.

Task 2.1: Creating an Application Load Balancer
In this task, you create a load balancer that can balance traffic across multiple EC2 instances and Availability Zones.

On the EC2 Management Console, in the left navigation pane, locate the Load Balancing section, and choose Load Balancers.

Choose Create load balancer.

In the Load balancer types section, for Application Load Balancer, choose Create.

On the Create Application Load Balancer page, in the Basic configuration section, configure the following option:

For Load balancer name, enter WebServerELB

In the Network mapping section, configure the following options:

For VPC, choose Lab VPC.

For Mappings, choose both Availability Zones listed.

For the first Availability Zone, choose Public Subnet 1.

For the second Availability Zone, choose Public Subnet 2.

These options configure the load balancer to operate across multiple Availability Zones.

In the Security groups section, choose the X for the default security group to remove it.

From the Security groups dropdown list, choose HTTPAccess.

The HTTPAccess security group has already been created for you, which permits HTTP access.

In the Listeners and routing section, choose the Create target group link.

Note: This link opens a new browser tab with the Create target group configuration options.

On the Specify group details page, in the Basic configuration section, configure the following options:

For Choose a target type, choose Instances.

For Target group name, enter webserver-app

In the Health checks section, for Health check path, enter /index.php

At the bottom of the page, choose Next.

On the Register targets page, choose Create target group.

Once the target group has been created successfully, close the Target groups browser tab.

Return to the Load balancers browser tab, and locate the Listeners and routing section. For Default action, choose  Refresh to the right of the Forward to dropdown list.

From the Forward to dropdown list, choose webserver-app.

At the bottom of the page, choose Create load balancer.

   You should receive a message similar to the following:

    Successfully created load balancer: WebServerELB

To view the WebServerELB load balancer that you created, choose View load balancer.

To copy the DNS name of the load balancer, use the copy option , and paste the DNS name into a text editor. 

   You need this information later in the lab.

Task 2.2: Creating a launch template
In this task, you create a launch template for your Auto Scaling group. A launch template is a template that an Auto Scaling group uses to launch EC2 instances. When you create a launch template, you specify information for the instances, such as the AMI, instance type, key pair, security group, and disks.

On the EC2 Management Console, in the left navigation pane, locate the Instances section, and choose Launch Templates.

Choose Create launch template.

On the Create launch template page, in the Launch template name and description section, configure the following options:

For Launch template name - required, enter web-app-launch-template

For Template version description, enter A web server for the load test app

For Auto Scaling guidance, select  Provide guidance to help me set up a template that I can use with EC2 Auto Scaling.

In the Application and OS Images (Amazon Machine Image) - required section, choose the My AMIs tab. 

Notice that WebServerAMI is already chosen.

In the Instance type section, choose the Instance type dropdown list, and choose t3.micro.

In the Key pair (login) section, confirm that the Key pair name dropdown list is set to Don't include in launch template.

 Amazon EC2 uses public key cryptography to encrypt and decrypt login information. To log in to your instance, you must create a key pair, specify the name of the key pair when you launch the instance, and provide the private key when you connect to the instance.

	  Note: In this lab, you do not need to connect to the instance.

In the Network settings section, choose the Security groups dropdown list, and choose HTTPAccess.

When you launch an instance, you can pass user data to the instance. The data can be used to run configuration tasks and scripts.

Choose Create launch template.

You should receive a message similar to the following:

	 Successfully created web-app-launch-template.

Choose View launch templates.

Task 2.3: Creating an Auto Scaling group
In this task, you use your launch template to create an Auto Scaling group.

Choose  web-app-launch-template, and then from the Actions  dropdown list, choose Create Auto Scaling group.

On the Choose launch template or configuration page, in the Name section, for Auto Scaling group name, enter Web App Auto Scaling Group

Choose Next.

On the Choose instance launch options page, in the Network section, configure the following options:

From the VPC dropdown list, choose Lab VPC.

From the Availability Zones and subnets dropdown list, choose Private Subnet 1 (10.0.2.0/24) and Private Subnet 2 (10.0.4.0/24). 

Choose Next.

On the Configure advanced options – optional page, configure the following options: 

In the Load balancing – optional section, choose Attach to an existing load balancer.

In the Attach to an existing load balancer section, configure the following options:

Choose Choose from your load balancer target groups.

From the Existing load balancer target groups dropdown list, choose webserver-app | HTTP.

In the Health checks section, under Additional health check types, select  Turn on Elastic Load Balancing health checks.

Choose Next.

On the Configure group size and scaling policies – optional page, configure the following options: 

In the Group size – optional section, enter the following values: 

Desired capacity:2

Minimum capacity: 2

Maximum capacity: 4

In the Scaling policies – optional section, configure the following options:

Choose  Target tracking scaling policy.

For Metric type, choose Average CPU utilization.

For Target value, enter 50

This change tells auto scaling to maintain an average CPU utilization across all instances of 50 percent. Auto scaling automatically adds or removes capacity as required to keep the metric at or close to the specified target value. It adjusts to fluctuations in the metric due to a fluctuating load pattern.

Choose Next.

On the Add notifications – optional page, choose Next.

On the Add tags – optional page, choose Add tag and configure the following options:

For Key, enter Name

For Value - optional, enter WebApp

Choose Next.

On the Review page, choose Create Auto Scaling group.

These options launch EC2 instances in private subnets across both Availability Zones.

Your Auto Scaling group initially shows an Instances count of zero, but new instances will be launched to reach the desired count of two instances.

Note: If you experience an error related to the t3.micro instance type not being available, then rerun this task by choosing the t2.micro instance type instead.

 

Task 3: Verifying the auto scaling configuration
In this task, you verify that both the auto scaling configuration and the load balancer are working by accessing a pre-installed script on one of your servers that will consume CPU cycles, which invokes the scale out alarm.

In the left navigation pane, choose Instances.

Two new instances named WebApp are being created as part of your Auto Scaling group. While these instances are being created, the Status check for these two instances is Initializing.

Observe the Status check field for the instances until the status is 2/2 checks passed. Wait for the two new instances to complete initialization before you proceed to the next step. 

You might need to choose  Refresh to see the updated status.

Once the instances have completed initialization, in the left navigation pane in the Load Balancing section, choose Target Groups, and then select  your target group, webserver-app.

On the Targets tab, verify that two instances are being created. Refresh this list until the Health status of these instances changes to healthy.

   You can now test the web application by accessing it through the load balancer.

 

Task 4: Testing auto scaling configuration
Open a new web browser tab, and paste the DNS name of the load balancer that you copied earlier into the address bar, and press Enter.

On the web page, choose Start Stress.

This step calls the application stress in the background, which causes the CPU utilization on the instance that serviced this request to spike to 100 percent.

On the EC2 Management console, in the left navigation pane in the Auto Scaling section, choose Auto Scaling Groups.

Select  Web App Auto Scaling Group.

Choose the Activity tab. 

After a few minutes, you should see your Auto Scaling group add a new instance. This occurs because Amazon CloudWatch detected that the average CPU utilization of your Auto Scaling group exceeded 50 percent, and your scale-up policy has been invoked in response.

You can also check the new instances being launched on the EC2 Dashboard.

 

Conclusion
Congratulations! You now have successfully done the following:

Created an EC2 instance by using an AWS CLI command

Created a new AMI by using the AWS CLI

Created an Amazon EC2 launch template

Created an Amazon EC2 Auto Scaling launch configuration

Configured scaling policies and created an Auto Scaling group to scale in and scale out the number of servers based on variable load

 

Lab complete

Amazon Route 53 Failover Routing
Lab overview
In this activity, you configure failover routing for a simple web application.

The activity environment starts with two Amazon Elastic Compute Cloud (Amazon EC2) instances that have already been created. Each of the instances has the full LAMP stack installed and the café website deployed and running. The EC2 instances are deployed in different Availability Zones. For example, if the web servers are running in the us-west-2 Region, then one of the web servers runs in the us-west-2a Availability Zone and the other one runs in the us-west-2b Availability Zone.

You will configure your domain such that, if the website in the primary Availability Zone becomes unavailable, Amazon Route 53 will automatically fail over application traffic to the instance in the secondary Availability Zone.

When you are finished, your environment will look like the following architecture:

 

Architecture diagram showing final state of the infrastructure.


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5f19fff0-4d55-4aee-8b27-60a5bb4377f0" />


The architecture diagram shows the final state of the infrastructure that you build. Route 53 records store the IP address of the EC2 instance in each Availability Zone. User requests are normally sent to the IP address corresponding to Café Instance1 in Availability Zone 1. If Café Instance1 is unavailable, requests are routed to Café Instance2 in Availability Zone 2 based on the configuration in the Route 53 records. When Café Instance1 becomes unavailable, a Route 53 health check alarm is invoked, and an email alert is sent to the email address provided.

 

Objectives
After completing this activity, you should be able to do the following:

Configure a Route 53 health check that sends emails when the health of an HTTP endpoint becomes unhealthy.

Configure failover routing in Route 53.

Task 1: Confirming the café websites
In this task, you analyze the resources that AWS CloudFormation has automatically created for you.

At the top of this page, choose Details. For AWS, choose Show. A Credentials panel opens.

Copy the values for the following parameters, and paste them into a text editor to use later.

CafeInstance1IPAddress

PrimaryWebSiteURL

SecondaryWebsiteURL

CafeInstance2IPAddress

Choose X to close the Credentials panel.

Navigate to the browser tab with the AWS Management Console. In the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the left navigation pane, in the Instances section, choose Instances.

Two EC2 instances have already been created for you. CafeInstance1 is running in Cafe Public Subnet 1 (us-west-2a), and CafeInstance2 is running in Cafe Public Subnet 2 (us-west-2b).

The URLs that you copied earlier correspond to the café application running on each instance.

Although both EC2 instances have the same configuration and application installed, one instance is a primary instance.

Open a new browser tab, and paste the value for PrimaryWebSiteURL.

The café application webpage should open.

Along with other information about the café, notice the Server Information that is displayed. It shows information about the EC2 instance and the Availability Zone where it is running.

Open another browser tab, and paste the value for SecondaryWebsiteURL. Confirm that the second EC2 instance has similar configurations as the first instance.

These configurations confirm that the café application is running on both instances.

On one of the websites, choose Menu.

Choose any item on the menu, and choose Submit Order.

The Order Confirmation page reflects the time that the order was placed in the time zone where the web server is running.

You have now confirmed that two instances are running the café application. Each application is running in a different Availability Zone to provide high availability.


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/14684790-4b94-4d36-8796-5982c81984e6" />


 

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/da5a1a2b-9c07-4176-a6bf-16034b0ab096" />



Task 2: Configuring a Route 53 health check
The first step to configure failover is to create a health check for your primary website.

In the AWS Management Console, from the Services menu, enter and choose Route 53 to open the Route 53 Management Console.

 You can safely ignore any error messages displayed because of AWS Identity and Access Management (IAM) restrictions placed on lab accounts.

In the left navigation pane, choose Health checks.

Choose Create health check, and configure the following options. Leave the default values for all other fields.

Name: Enter Primary-Website-Health 

What to monitor: Choose Endpoint.

Specify endpoint by: Choose IP address.

IP address: Paste in the Public IPv4 address of CafeInstance1. You can find this value in the EC2 console, or you can copy the IP address from the CafeInstance1IPAddress value that you copied earlier.

Path: Enter cafe

Expand  Advanced configuration, and configure the following options. Leave the default values for all other fields.

Request interval: Choose Fast (10 seconds).

Failure threshold: Enter 2

These options make your health check respond faster.

Choose Next.

For Get notified when health check fails, configure the following options:

Create alarm: Choose Yes.

Send notification to: Choose New SNS topic.

Topic name: Enter Primary-Website-Health

Recipient email address: Enter an email address that you can access.

Choose Create health check.

Route 53 now checks the health of your site by periodically requesting the domain name that you provided and verifying that it returns a successful response.

The health check might take up to a minute to show a Healthy Status. Choose the refresh icon to update your view of the current status.

Select Primary-Website-Health, and then choose the Monitoring tab.

This tab provides a view of the status of the health check over time. It might take a few seconds before the chart becomes available. Choose the refresh icon to update your view.

Check your email. You should have received an email from AWS Notifications.

In the email, choose the Confirm subscription link to finish setting up the email alerting that you configured when you created the health check.

 

Task 3: Configuring Route 53 records
In the following tasks, you create Route 53 records for the hosted zone.

Task 3.1: Creating an A record for the primary website
You now configure failover routing based on the health check that you just created.

In the Route 53 console, in the left navigation pane, choose Hosted zones.

The domain name XXXXXX_XXXXXXXXXX.vocareum.training (where the Xs are digits unique to your AWS account) has already been created for you.

All lab participants have been given a unique domain name.

Choose XXXXXX_XXXXXXXXXX.vocareum.training to display the two records that already exist in this hosted zone. 

These two records were created when the domain was registered with Route 53. The NS, or name server record, lists the four name servers that are the authoritative name servers for your hosted zone in the Value/Route traffic to column. You should not add, change, or delete name servers from this record.

The SOA, or start of authority record, identifies the base Domain Name System (DNS) information about the domain in the Value/Route traffic to column. It was also created when the domain was registered with Route 53.

Choose Create record, and configure the following options: 

Record name: Enter www

Record type: Choose A - Routes traffic to an IPv4 address and some AWS resources.

Value: In the text box, enter the IP address for CafeInstance1IPAddress.

TTL (seconds): Enter 15

Routing policy: Choose Failover.

Failover record type: Choose Primary.

Health check ID: Choose Primary-Website-Health.

Record ID: Enter FailoverPrimary

Choose Create records.

The A-type record that you created should now appear as the third record on the Hosted zones page.

Task 3.2: Creating an A record for the secondary website
Now you create another record for the stand-by/secondary web server.

Choose Create record, and configure the following options: 

Record name: Enter www

Record type: Choose A - Routes traffic to an IPv4 address and some AWS resources.

Value: In the text box, enter the IP address for CafeInstance2IPAddress. To find this value, at the top of these instructions, choose Details, and then choose Show, or copy it from the values that you pasted into a text editor earlier in the lab.

TTL (seconds): Enter 15

Routing policy: Choose Failover.

Failover record type: Choose Secondary.

Health check ID: Leave this field empty.

Record ID: Enter FailoverSecondary

Choose Create records.

Another A-type record should now be listed on the Hosted zones page.

You have now configured your web application to fail over to another Availability Zone.


 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b240e87c-d8d1-46d2-946e-d9cbc7d33179" />
 


Task 4: Verifying the DNS resolution
In this task, you visit the DNS records in a browser to verify that Route 53 is pointing correctly to your primary website.

Select the check box for either one of the A records. A Record details panel appears that includes the Record name. Copy the Record name value of the A record.

Open a new browser tab. Paste the A record name, enter /cafe at the end of the URL, and then load the page.

The café primary website should load, as indicated by the Server Information section of the page, which should display the Region/Availability Zone.

Tip: The URL should be http://www.XXXXXX_XXXXXXXXXX.vocareum.training/cafe/, and in this URL, the Xs are unique digits.

 

Task 5: Verifying the failover functionality
In this task, you try to verify that Route 53 correctly fails over to your secondary server if your primary server fails. For the purposes of this activity, you simulate a failure by manually stopping CafeInstance1.

Return to the AWS Management Console. On the Services menu, enter and choose EC2 and then choose Instances.

Select CafeInstance1.

From the Instance state menu, choose Stop instance.

In the Stop instance? window, choose Stop.

The primary website now stops functioning. The Route 53 health check that you configured notices that the application is not responding, and the record entries that you configured cause DNS traffic to fail over to the secondary EC2 instance.

On the Services menu, enter and choose Route 53

In the left navigation pane, choose Health checks.

Select  Primary-Website-Health, and in the lower pane, choose the Monitoring tab.

You should see failed health checks within minutes of stopping the EC2 instance.

Wait until the Status of Primary-Website-Health is Unhealthy. If necessary, periodically choose  refresh. It might take a few minutes for the status to update.

Return to the browser tab where you have the vocareum_XXXXXX_XXXXXXXXXX.training/cafe website open, and refresh the page.

Notice that the Region/Availability Zone value now displays a different Availability Zone (for example, us-west-2b instead of us-west-2a). You are now seeing the website served from your CafeInstance2 instance.

If you do not get the correct results, reconfirm that the Status of Primary-Website-Health is Unhealthy, and then try again. It might take a few minutes for the DNS changes to propagate.

Check your email. You should have received an email from AWS Notifications titled "ALARM: Primary-Website-Health-awsroute53-..." with details about what initiated the alarm.

Note: It might take a few minutes before the email arrives.

You have now successfully confirmed that your application environment can fail over from its primary Availability Zone to its secondary Availability Zone if the server in the primary Availability Zone fails.

 

Conclusion
Congratulations! You now have successfully done the following:

Configured a Route 53 health check that sends emails when the health of an HTTP endpoint becomes unhealthy

Configured failover routing in Route 53

Lab complete 

 
