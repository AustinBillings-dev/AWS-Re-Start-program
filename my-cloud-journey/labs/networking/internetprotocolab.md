Internet Protocol Troubleshooting Commands
 

Objectives
After completing this lab, you should be able to:

Practice troubleshooting commands
Identify how you can use these commands in customer scenarios


Scenario
You are a new network administrator who is troubleshooting customer issues.

Task 2: Practice troubleshooting commands
Recall
Some layers have commands related to them to help with troubleshooting. The following is an example of how the troubleshooting commands flow with the Open Systems Interconnection (OSI) model:

The OSI model and an example of how it relates to the OSI layers
Figure: This is an example of how troubleshooting commands have similarities to the OSI model.

Layer 3 (network): The ping and traceroute commands
The following is an example of a customer scenario where you can use the ping command:

The customer has launched an EC2 instance. To test connectivity to and from it, run the ping command. You can use this command to test connectivity and ensure that it allows Internet Control Message Protocol (ICMP) requests on the security level, such as security groups and network ACLs.

In the Linux terminal, run the following command, and press Enter:

ping 8.8.8.8 -c 5
This is the ping command. When you run this command, you can input an IP or URL followed by options. In this example, the -c stands for count, and 5 stands for how many requests you are requesting.

After you run this command, you should see a result similar to the following:

The results of the ping command, which are replies back from the 8.8.8.8 server. You are testing IP connectivity to a web server.
Figure: The ping command shows IP connectivity to a web server.

You can use the ping command for a few reasons, but the most common reason is to test connectivity to something such as a server. The ping command sends ICMP echo requests from your machine to the server that you are trying to reach (for example, amazon.com). The server sends an echo reply with a round-trip time. You use the ping command mostly to troubleshoot connectivity issues and reachability to a specific target. You can also use it to bring a specific network up if traffic needs to continuously flow through a network. You can also send a continuous ping.

The following is an example of a customer scenario where you can use the traceroute command:

The customer is having latency issues. They say that their connection is taking a long time, and they are having packet loss. They aren't sure if it is related to AWS or their internet service provider (ISP). To investigate, you can run the traceroute command from their AWS resource to the server that they are trying to reach. If the loss happens toward the server, the issue is most likely the ISP. If the loss is toward AWS, you might need to investigate other factors that might limiting networking connectivity.

In the Linux terminal, run the following command, and press Enter:

traceroute 8.8.8.8
This is the traceroute command. You can input an IP or URL followed by options.

After you run this command, you should see a result similar to the following:

The results of the traceroute command, which confirms the path to the web server and the latency to it
Figure: The traceroute command shows the path taken to the web server and the latency taken to it.

Packet loss, seen as percentages, can occur at each hop, and this loss usually occurs because of an issue with the user's local area network (LAN) or ISP

You can pinpoint an issue or error when the hostnames and IP addresses on either side of a jump have failed. Three asterisks (***) indicate a failed hop.

The traceroute command reports on the path and latency that the packet takes to get from your machine to the destination (8.8.8.8). Each server is called a hop. There can be packet loss, seen as percentages, at each loss, which is usually due to the user's local area network (LAN) or ISP; however, if the packet loss occurs toward the end of the route, then the issue is more than likely the server connection. You can pinpoint an issue or error when hostnames and IP addresses on either side of a failed jump, which looks like three asterisks (***).

Layer 4 (transport): The netstat and telnet commands
The following is an example of a customer scenario where you can use the netstat command:

Your company is running a routine security scan and found that one of the ports on a certain subnet is compromised. To confirm, you run the netstat command on a local host on that subnet to confirm if the port is listening when it shouldn't be.    

In the Linux terminal, run the following command, and press Enter:

netstat -tp
This is the netstat command. You can use the following options:

netstat -tp: Confirms established connections
netstat -tlp: Outputs listening services

netstat -ntlp: Outputs listening services but does not resolve port numbers
After you run this command, you should see a result similar to the following:

 

The result of netstat with the option -tp, which confirms established connections
Figure: The result of netstat -tp confirms established connections.

The netstat command shows the current established TCP connections from which the host is listening. When troubleshooting networking issues starting with the host machine and working outward, you can run this command to understand which ports are listening and which are not. Because this command gives you a snapshot of your layer 4 connectivity, using this command will help you save time when trying to narrow down a large networking issue.

 

The following is an example of a customer scenario where you can use the telnet command:

The customer has a secure web server and has custom security group rules and network ACL rules configured. However, they are concerned that port 80 is open even though it shows their security settings indicate that their security group is blocking this port, you can run telnet 192.168.10.5 80 to ensure that the connection is refused.

In the Linux terminal, run the following command, and press Enter to install telnet:

sudo yum install telnet -y
In the Linux terminal, run the following command, and press Enter:

telnet www.google.com 80
This is the telnet command. You can input an IP or URL followed by the port number to connect to that port.

After you run this command, you should see a result similar to the following:

The result of telnet, which confirms the TCP connection to a web server. An HTTP request is made using telnet.
Figure: The telnet command confirms the TCP connection to a web server. It makes the HTTP request using telnet.

The telnet command confirms the TCP connection to a web server making an HTTP request if using port 80 to telnet. You can also use this command at layer 7. If you can successfully connect to the web server, then there is nothing blocking you or the server from connecting. If the connection fails with a message like "connection refused," then something is likely blocking the connection, such as a firewall or security group. If the connection fails with a message like "connection timed out," then then issue may be no network route or connectivity.  

Layer 7 (application): The curl command
The following is an example of a customer scenario where you can use the curl command:

The customer has an Apache server running, and they want to test if they are getting a successful request (200 OK), which indicates that their website is running successfully. You run a curl request to see if the customer's Apache server returns a 200 OK.   

In the Linux terminal, run the following command, and press Enter:

curl -vLo /dev/null https://aws.com
This is the curl command. You can use the following command options:

-I: This option provides header information and specifies that the request method is Head.
-i: This option specifies that the request method is GET.
-k: This option tells the command to ignore SSL errors.
-v: This option is verbose. It shows what the computer is doing or what the software is loading during startup.
-o /dev/null: This option will send HTML and CSS in response to null.

After you run this command, you should see a result similar to the following:

The results of curl: in this example, the output tests the connection to a web service, such as AWS, and submits the HTTP request.
Figure: The results of the curl command: the output tests the connection to a web service, such as AWS, and submits the HTTP request.

You can use the curl command to transfer data between you and the server. The curl command can use many different protocols, but the most common are HTTP and HTTPS. You can use the curl command to troubleshoot communication from your local device to a server.  

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/04281ae4-0c59-481c-a7bf-6a9b3f7d5d0a" />


Lab Complete 
 Congratulations! You have completed the lab.

Second Lab
Troubleshooting a Network Issue
Objectives
After completing this lab, you should be able to:

Analyze the customer scenario

Troubleshoot the issue

Scenario
Your role is a cloud support engineer at Amazon Web Services (AWS). During your shift, a consulting company has a networking issue within their AWS infrastructure. The following is the email and an attachment of their architecture:

Email from the customer
Hello, Cloud Support!

When I create an Apache server through the command line, I cannot ping it. I also get an error when I enter the IP address in the browser. Can you please help figure out what is blocking my connection?

Thanks!

Ana
Contractor

 

Customer diagram
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4d0e7606-ff47-4a00-b94c-b6d74a292d8f" />

Lab 
Task 2: Install httpd
For this task, you install httpd prior to checking the customer's resources.

In the scenario, Ana, the customer requesting assistance, cannot reach her Apache server or get it to successfully load on a webpage from her virtual private cloud (VPC).     

You have an exact replica of the customer's VPC and its resources to troubleshoot the issue.

Helpful hint

You may have to use sudo to complete this exercise if you are not root.

To check the status of the httpd service, enter the following systemctl command in the terminal window, and press Enter:

sudo systemctl status httpd.service
After you run this command, you should see a result similar to the following, which indicates that the service is inactive:

The output of sudo systemctl status httpd.service command shows that the service is inactive because it hasn't been started yet.

Figure: The status shows that the httpd service is inactive because it has not been started yet. This output indicates that the httpd service is loaded (already installed) but is currently inactive.

To start the httpd service, enter the following command, and press Enter:

sudo systemctl start httpd.service
To check the status of the httpd service again, enter the following systemctl command, and press Enter:

sudo systemctl status httpd.service
After you run this command, you should see a result similar to the following, which indicates that the service is active:

The output status indicating that the httpd service is active 
Figure: The Apache HTTP Server should be in the Active status.

The httpd service is now running. Now check if it's working. In the following URL, replace  with the public IP of your instance located in the details button in the Vocareum environment. Open a new browser tab, and enter the public IP of your instance with the following format:

http://<PUBLIC IP OF INSTANCE>
The following image shows the expected output; however, the page will not load at this point in the lab:

The test page of the Apache HTTP server when you successfully install Apache
Figure: The test page of the Apache HTTP server when Apache is successfully installed

 

Task 3: Investigate the customer's VPC configuration
For this task, you will investigate the customer's VPC and their resources.

In the scenario, Ana, the customer requesting assistance, cannot reach her Apache server even though it is active. You have an exact replica of the customer's VPC and its resources. Keep the error that you received when trying to load Apache in the web browser in mind while troubleshooting this issue.

At the upper right of these instructions, choose AWS. The AWS Management Console opens in a new browser tab.

Once you are in the AWS console, in the Recently visited services section, you might see VPC. If you do, choose VPC. If you do not, navigate to the upper left, and choose the Services dropdown menu. Under the Networking & Content Delivery services, choose VPC.

The AWS Management Console and the recently visited services: Under the Recently visited services, you should be able to choose the Amazon VPC service. If not, you can use the Services dropdown list. 

Figure: Recently visited services in the AWS console.

The services dropdown list and how to find the Amazon VPC service by using the search bar or scrolling to the bottom in the Networking & Content Delivery section and choosing the Amazon VPC service 

Figure: Services navigation dropdown list.

Use the left navigation pane and check each service within the VPC to confirm that each resource is configured correctly.

The left hand navigation pane of the VPC and its services which include but are not limited to: Your VPCs, Subnets, Route Tables, Internet Gateways, Egress Only Internet Gateways, Carrier Gateways, Elastic IPs, Endpoints, NAT Gateways, and Peering Connections. 

Figure: The left navigation pane of the VPC and its services.

Subnets - Are the route tables associated to the correct subnets?
Route Tables - Do the route tables have the correct routes?
Internet Gateway - Is there an Internet Gateway and is it attached?
Security Groups and network ACLs - Are the correct rules configured?
Hints

Can you ping websites such as www.amazon.com? If so, you can get to the internet (the internet gateway and route table should work).
Apache is a server that commonly uses HTTP/S as ports.
Once you have gone through each option in the previous step, such as routing, security, and resources. Confirm that the Apache HTTP server is working by testing the following URL into a browser by replacing  with the public IP your your instance that can be found in the details drop down in Vocareum.

http://<PUBLIC IP OF INSTANCE>
If Apache is successfully installed, the following is the expected output:

The test page of the Apache HTTP server when you successfully install Apache 

Figure: The test page of the Apache HTTP server when Apache is successfully installed.


 

Recap
In this lab
In this lab, you troubleshot the customer's networking issue. You found that the customer had an issue with their security ports in the security group. After fixing the issue, you were able to successfully load the Apache server.

Lab Complete 
  


