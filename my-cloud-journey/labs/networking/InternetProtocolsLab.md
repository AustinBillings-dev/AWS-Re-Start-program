# Networking Labs
internet Protocols - Public and Private IP addresses
Internet Protocols - Static and Dynamic Addresses

Objectives
In this lab, you will:

Summarize and investigate the customer scenario
Analyze the difference between a private and public IP address
Develop a solution to the customer's issue in this lab
Summarize and describe your findings (group activity)


Objectives
In this lab, you will:

Summarize the customer scenario
Analyze the difference between a statically and dynamically assigned IP addresses using EC2 instances
Assign a persistent (static) IP to an EC2 instance
Develop a solution to the customers issue found within this lab; after developing a solution, summarize and describe your findings


## Labs

Scenario
Your role is a cloud support engineer at Amazon Web Services (AWS). During your shift, a customer from a Fortune 500 company requests assistance regarding a networking issue within their AWS infrastructure. The following is the email and an attachment regarding their architecture:

Ticket from your customer
Hello, Cloud Support!

We currently have one virtual private cloud (VPC) with a CIDR range of 10.0.0.0/16. In this VPC, we have two Amazon Elastic Compute Cloud (Amazon EC2) instances: instance A and instance B. Even though both are in the same subnet and have the same configurations with AWS resources, instance A cannot reach the internet, and instance B can reach the internet. I think it has something to do with the EC2 instances, but I'm not sure. I also had a question about using a public range of IP address such as 12.0.0.0/16 for a VPC that I would like to launch. Would that cause any issues? Attached is our architecture for reference.

Thanks!
Jess
Cloud Admin

You currently have one VPC with the same CIDR of 10.0.0.0/16 with two instances — instance A and instance B — with the same configurations as the customer. When troubleshooting networking and AWS, you can apply a troubleshooting method where you start from the top and work your way down or start from the bottom and work your way up. You start troubleshooting from the bottom and work your way to the top in layers using an example such as the OSI model. At the very bottom of this architecture is the EC2 instance. Although the cloud architecture does not directly translate to the OSI model, the following is an example of how the OSI and cloud relate.

 	OSI Model	AWS infrastructure
Layer 7	Application (how the end user sees it)	Application
Layer 6	Presentation (translator between layers)	Web Servers, application servers
Layer 5	Session (session establishment, security)	EC2 instances
Layer 4	Transport (TCP, flow control)	Security group. NACL
Layer 3	Network (Packets which contain IP addresses)	Route Tables, IGW, Subnets
Layer 2	Data Link (Frames which contain physical MAC addresses)	Route Tables, IGW, Subnets
Layer 1	Physical (cables, physical transmission bits and volts)	Regions, Availability Zones
Table: This is an example of how the AWS infrastructure and its resources have similarities to the OSI model. This information can be beneficial when troubleshooting.

For task 1, you gain an understanding of the customer's environment and replicate their issue.
They cant access instance A through the internet because it does not have an public ip address



Internet Protocols - Static and Dynamic Addresses
 

Scenario
Your role is a cloud support engineer at Amazon Web Services (AWS). During your shift, a customer from a Fortune 500 company requests assistance regarding a networking issue within their AWS infrastructure. The email and an attachment of their architecture is below:

Ticket from your customer
Hello Cloud Support!

We are having issues with one of our EC2 instances. The IP changes every time we start and stop this instance called Public Instance. This causes everything to break since it needs a static IP address. We are not sure why the IP changes on this instance to a random IP every time. Can you please investigate? Attached is our architecture. Please let me know if you have any questions.

Thanks!
Bob, Cloud Admin

For task 2, you will understand the customer's environment and replicate their issue.

In the scenario, Bob, who is the customer requesting assistance, is having issues with his EC2 instance constantly changing IP addresses every time he stops and starts his instance. He cannot leave his instance on because it is very expensive for him to do so, and he requires this IP address to be set at a static IP address or else it breaks his other resources attached to it.

From the top right corner, select Launch instances. This is how you will launch EC2 instances from the console.

Launch EC2 instance

Figure: Launch EC2 instances by selecting the button at the top right corner.

Follow the steps below to complete the creation of an Amazon EC2 instance:

Step 1: Choose an Amazon Machine Image (AMI): 

Select the first entry for Amazon Linux 2 AMI (HVM)
An AMI is a template that contains the OS and configuration of the EC2 instance.
Step 2: Choose an Instance Type:

Select t3.micro and navigate to the bottom of the window and click the button Next: Configure Instance Details
Step 3: Configure Instance Details:

Network: Choose vpc-xxxxxxxx | Lab VPC
Subnet: Choose subnet-xxxxxx | Public Subnet 1
Auto-assign Public IP: Set to enable
Leave everything else as default and select Next: Add Storage Add Storage in the bottom right corner.
Step 4: Add Storage: Leave as default and navigate to the bottom right of the window and select Next: Add Tags.

Step 5: Add Tags:

Select Add Tag and under Key enter Name and under Value enter test instance
Navigate to the bottom right of the window and select Next: Configure Security Group
Step 6: Configure Security Group: 

Under Assign a security group, select the Select an existing security group radio button and select the security group with the name Linux Instance SG. Then navigate to the bottom of the window and hit Review and Launch.
Step 7: Review Instance Launch:

Navigate to the bottom of the window and hit Launch.
A pop-up window asks you to select an existing key pair or create a new key pair.

In the first drop down, keep Choose an existing key pair.
In the second drop down, select the key pair vockey | RSA.
Check the box underneath the second drop down. Once checked, select Launch Instances.
Once complete, you will return to the EC2 dashboard and see the EC2 instance that was just created. Select test instance. Under the Instance state, you will see Initializing. Wait until it says 2/2 before continuing.

This picture shows the current state of the instance. When launched, before using the instance, it must show a "ready" state.

Figure: Instances go through states, just like when a computer is booting up. When it is ready to use, the state will say "running" and you will be able to use it for services like SSH.

Select the checkbox of your test instance. At the bottom, select the Networking tab. In this tab, observe and note the Public IPv4 address and the Private IPv4 address. Once noted, navigate to the top right of the window, select the Instance state drop-down button, and select Stop instance. Once the Instance state changes to Stopped, navigate back down to the tabs and observe the Public and Private IPv4 address.

This picture shows the instance networking tab. Here you can see public and private IPv4 addresses, public and private IPv4 DNS, VPC ID, subnet ID, and Availability Zones.

Figure: This is the networking tab for instances. This shows any networking configurations related to the instance such as public and private IPv4 addresses and public and private IPv4 DNS.

When stopping an instance, navigate to the top of the EC2 dashboard and select the "Instance state" button and select "Stop instance".

Figure: To start, stop, or terminate an instance, navigate to the top of the EC2 dashboard and select the "Instance state" button.

Now restart the test instance by navigating to the top window and selecting the Instance state and Start instance. Wait until the Instance state changes to Running. Take note of the Public and Private IPv4 addresses. What did you notice between the public and private IP addresses when you stopped and started the EC2 instance? Would you consider this the Public IP a static or dynamic IP address? What would you consider the Private IP address for the EC2 instance? Do you think we have replicated the customer's issue?

When the instance was restarted, in the picture, the networking tab was revisited.

Figure: By starting the instance, you can see the details populate in the Networking tab.

We still haven't solved the customer's issue. Bob needs a permanent Public IP address that doesn't change when he stops and restarts his instance. AWS does have a solution that allocates a persistent public IP address to an EC2 instance, called an Elastic IP (EIP).

From the EC2 dashboard, navigate to Network and Security on the left navigation and select Elastic IPs. Notice that there are no EIPs. Create one by selecting the button Allocate Elastic IP address in the top right. Keep everything as default and hit Allocate. Take note of the EIP address.

This picture shows the left hand navigation pane of the EC2 dashboard and how to navigate to "Elastic IPs". While in the EC2 dashboard, under "Network and Security" select "Elastic IPs".

Figure: Within the EC2 dashboard, under "Network and Security" in the left navigation, select "Elastic IPs".

 

This picture shows the EIP home page when "Elasti IP addresses" is selected. This is where you will allocate an EIP by navigating to the top right button and selecting Allocate Elastic IP address.
Figure: Allocate an EIP by selecting the Allocate Elastic IP address button.

Select the EIP you just created by selecting the checkbox. Now attach this permanent, public IP address to the dynamic instance by navigating to the top right and navigating to Actions and Associate Elastic IP address.

This picture shows that the EIP created was selected and will now be associated to an instance by going to the "Actions" drop down menu at the top and selecting "Associate Elastic IP address".

Figure: The EIP created will now be associated to the EC2 instance by going to the actions menu and selecting "Associate Elastic IP address".

Leave the resource type as Instance, and select test instance from the Choose an Instance drop down menu. Under Private IP address, select the empty box. The Private IP associated with that instance is selected. Click the Associate button.

This picture shows the association of the EIP to the resource type which is an instance, by choosing the instance you created in the lab and selecting "Associate".

Figure: Associate the EIP to the test instance.

Navigate back to the Instances page using the left navigation pane. Select the checkbox for the test instance and navigate to the Networking tab. Take note of the Public IPv4 address. Did you notice that the EIP address is now the Public IP address? Now stop and start the instance and observe the differences. 
