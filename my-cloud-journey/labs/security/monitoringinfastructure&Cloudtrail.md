Monitoring Infrastructure
Lab Overview
The ability to monitor your applications and infrastructure is critical for delivering reliable, consistent IT services.

Monitoring requirements range from collecting statistics for long-term analysis to quickly reacting to changes and outages. Monitoring can also support compliance reporting by continuously checking that infrastructure is meeting organizational standards.

This lab shows you how to use Amazon CloudWatch Metrics, Amazon CloudWatch Logs, Amazon CloudWatch Events, and AWS Config to monitor your applications and infrastructure.

After completing this lab, you will be able to:

Use the AWS Systems Manager Run Command to install the CloudWatch agent on Amazon Elastic Compute Cloud (Amazon EC2) instances

Monitor application logs using CloudWatch agent and CloudWatch Logs

Monitor system metrics using CloudWatch agent and CloudWatch Metrics

Create real time notifications using CloudWatch Events

Track infrastructure compliance using AWS Config

Duration

This lab requires approximately 60 minutes to complete.

 

Accessing the AWS Management Console
At the top of these instructions, select Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status. 

Wait until you see the message Lab status: ready, and then select the X to close the Start Lab panel.

At the top of these instructions, select AWS

This step opens the AWS Management Console in a new browser tab. The system automatically logs you in.

Tip: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Select the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console tab so that it displays alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to make it easier to follow the lab steps.

 Do not change the Region during this lab.

 

Task 1: Installing the CloudWatch agent
You can use the CloudWatch agent to collect metrics from EC2 instances and on-premises servers, including the following:

System-level metrics from EC2 instances, such as CPU allocation, free disk space, and memory utilization. These metrics are collected from the machine itself and complement the standard CloudWatch metrics that CloudWatch collects.

System-level metrics from on-premises servers that enable the monitoring of hybrid environments and servers not managed by AWS.

System and application logs from both Linux and Windows servers.

Custom metrics from applications and services using the StatsD and collectd protocols.

In this task, you use Systems Manager to install the CloudWatch agent on an EC2 instance. You configure it to collect both application and system metrics.

AWS Systems Manager

In the AWS Management Console, on the Services  menu, select Systems Manager.

In the left navigation pane, choose Run Command.

 If there is no visible navigation pane, choose the  icon in the top-left corner to make it appear.

You will use the Run Command to deploy a pre-written command that installs the CloudWatch agent.

Choose Run a Command

Select the button next to  AWS-ConfigureAWSPackage (typically appears toward the top of the list).  

Scroll to the Command parameters section and configure the following information:

Action: Select Install.

Name: Enter AmazonCloudWatchAgent

Version: Enter latest

In the Targets section, select Choose instances manually, and then under Instances, select the check box next to Web Server.

This configuration installs the CloudWatch agent on the web server.

At the bottom of the page, choose Run

Wait for the Overall status to change to Success. You can occasionally choose  refresh toward the top of the page to update the status.

You can view the output from the job to confirm that it ran successfully.

Under Targets and outputs, choose  next to the instance, and then click View output.

Expand  Step 1 - Output.

 You should see the message Successfully installed arn:aws:ssm:::package/AmazonCloudWatchAgent.

 If you see the message Step execution skipped due to unsatisfied preconditions: '"StringEquals": [platformType, Windows]'. Step name: createDownloadFolder, then expand  Step 2 - Output instead. You can select this option because the instance you are using was created from a Linux AMI. You can safely ignore this message.

 You now configure the CloudWatch agent to collect the desired log information. The instance has a web server installed, so you configure the CloudWatch agent to collect the web server logs and general system metrics.

 You will store the configuration file in AWS Systems Manager Parameter Store, which the CloudWatch agent can then retrieve.

In the left navigation pane, choose Parameter Store.

Choose Create parameter, and then configure the following information:

Name: Enter Monitor-Web-Server

Description: Enter Collect web logs and system metrics

Value: Copy and paste the following configuration:

{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "log_group_name": "HttpAccessLog",
            "file_path": "/var/log/httpd/access_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          },
          {
            "log_group_name": "HttpErrorLog",
            "file_path": "/var/log/httpd/error_log",
            "log_stream_name": "{instance_id}",
            "timestamp_format": "%b %d %H:%M:%S"
          }
        ]
      }
    }
  },
  "metrics": {
    "metrics_collected": {
      "cpu": {
        "measurement": [
          "cpu_usage_idle",
          "cpu_usage_iowait",
          "cpu_usage_user",
          "cpu_usage_system"
        ],
        "metrics_collection_interval": 10,
        "totalcpu": false
      },
      "disk": {
        "measurement": [
          "used_percent",
          "inodes_free"
        ],
        "metrics_collection_interval": 10,
        "resources": [
          "*"
        ]
      },
      "diskio": {
        "measurement": [
          "io_time"
        ],
        "metrics_collection_interval": 10,
        "resources": [
          "*"
        ]
      },
      "mem": {
        "measurement": [
          "mem_used_percent"
        ],
        "metrics_collection_interval": 10
      },
      "swap": {
        "measurement": [
          "swap_used_percent"
        ],
        "metrics_collection_interval": 10
      }
    }
  }
}
Examine the above configuration. It defines the following items to be monitored:

Logs: Two web server log files to be collected and sent to CloudWatch Logs

Metrics: CPU, disk, and memory metrics to sent to CloudWatch Metrics

Choose Create parameter

This parameter will be referenced when starting the CloudWatch agent.

You now use another Run Command to start the CloudWatch agent on the web server.

In the left navigation pane, choose Run Command.

Choose Run command

Choose the  box, and then select the following:

Select Document name prefix.

Select Equals.

Enter AmazonCloudWatch-ManageAgent

Verify that the filter is Document name prefix : Equals : AmazonCloudWatch-ManageAgent

Press Enter.

 Before running the command, you can view the definition of the command.

Choose AmazonCloudWatch-ManageAgent (choose the name itself).

A new web browser tab opens that shows the definition of the command.

Browse through the content of each tab to see how a command document is defined.

Choose the Content tab, and scroll to the bottom to see the actual script that will run on the target instance.

The script references the AWS Systems Manager Parameter Store because it retrieves the CloudWatch agent configuration that you defined earlier.

Close the current web browser tab, which should return you to the Run a command tab that you were using earlier.

Verify that you have selected the button  next to AmazonCloudWatch-ManageAgent.

In the Command parameters section, configure the following information:

Action: Select configure.

Mode: Select ec2.

Optional Configuration Source: Select ssm.

Optional Configuration Location: Enter Monitor-Web-Server

Optional Restart: Select yes.

This configures the agent to use the configuration you previously stored in the Parameter Store.

In the Targets section, select Choose instances manually.

In the Instances section, select the check box next to Web Server.

Choose Run

Wait for the Overall status to change to Success. You can occasionally choose  refresh toward the top of the page to update the status.

The CloudWatch agent is now running on the instance and sending log and metric data to CloudWatch.

 

Task 2: Monitoring application logs using CloudWatch Logs
You can use CloudWatch Logs to monitor applications and systems using log data. For example, CloudWatch Logs can track the number of errors that occur in your application logs and send you a notification whenever the rate of errors exceeds a threshold that you specify.

CloudWatch Logs uses your existing log data for monitoring, so no code changes are required. For example, you can monitor application logs for specific literal terms (such as "NullReferenceException") or count the number of occurrences of a literal term at a particular position in log data (such as 404 status codes in a web server access log). When the term you are searching for is found, CloudWatch Logs reports the data to a CloudWatch metric that you specify. Log data is encrypted while in transit and while it is at rest.

In this task, you generate log data on the Web Server and then monitor the logs using CloudWatch Logs.

CloudWatch Logs

The Web Server generates two types of log data:

Access logs

Error logs

You begin by accessing the web server.

Choose the Details dropdown menu above these instructions, and then choose Show

Copy the WebServerIP value.

Open a new web browser tab, paste the WebServerIP you copied, and then press Enter.

You should see a web server Test Page.

You now generate log data by attempting to access a page that does not exist.

Append /start to the browser URL, and press Enter.

You receive an error message because the page is not found. This is okay! It generates data in the access logs that are being sent to CloudWatch Logs.

Keep this tab open in your web browser, but return to the browser tab showing the AWS Management Console.

From the Services  menu, choose CloudWatch.

In the left navigation pane, choose Log groups.

You should see two logs listed: HttpAccessLog and HttpErrorLog.

 If these logs are not listed, try waiting a minute, and then choose  Refresh.

Choose HttpAccessLog (choose the name itself).

In the Logs streams section, choose the Log stream in the table (choose the name itself). It has the same ID as the EC2 instance that the log is attached to.

Log data should be displayed, consisting of GET requests that were sent to the web server. You can view additional information by choosing  to expand the lines. The log data includes information about the computer and the browser that made the request.

You should see a line with your /start request with a code of 404, which means that the page was not found.

This demonstrates how log files can be automatically shipped from an EC2 instance or an on-premises server to CloudWatch Logs. The log data is accessible without having to log in to each individual server. Log data can also be collected from multiple servers, such as an Auto Scaling fleet of web servers.

 

Create a metric filter in CloudWatch Logs
You now configure a filter to identify 404 Errors in the log file. This error would normally indicate that the web server is generating invalid links that users are choosing.

In the left navigation pane, choose Log groups.

Select the check box next to HttpAccessLog. 

From the Actions dropdown menu, select Create metric filter.

A filter pattern defines the fields in the log file and filters the data for specific values.

Paste the following line into the Filter pattern box:

[ip, id, user, timestamp, request, status_code=404, size]
This line tells CloudWatch Logs how to interpret the fields in the log data and defines a filter to find lines only with status_code=404, which indicates that a page was not found.

In the Test pattern section, use the dropdown menu to select the EC2 instance id. It is be similar to i-0f07ab62aae4xxxx9.

Choose Test pattern

In the Results section, choose Show test results.

You should see at least one result with a $status_code of 404. This status code indicates that a page was requested that was not found.

Choose Next

In the Create filter name section, in the Filter name box, enter 404Errors

In the Metric details section, configure the following information:

Metric namespace: Enter LogMetrics

Metric name: Enter 404Errors

Metric value: Enter 1

Choose Next. If Next is not enabled, click an empty text field, this will shift focus and enable it.

On the Review and create page, choose Create metric filter

This metric filter can now be used in an alarm.

 

Create an alarm using the filter
You now configure an alarm to send a notification when too many 404 Not Found errors are received.

In the 404Errors panel, choose the check box in the top-right corner.

In the Metric filters section, choose Create alarm

Configure the following settings:

In the Metrics section, for Period, select 1 minute.

In the Conditions section, select the following:

Whenever 404Errors is: Select  Greater/Equal

than: Enter 5

Choose Next

In the Notification section, configure the following:

Select an SNS Topic: Select  Create new topic.

Email endpoints that will receive the notification: Enter an email address that you can access from the classroom.

Choose Create topic

Choose Next

For Name and description, configure the following settings:

Alarm name: Enter 404 Errors

Alarm description: Enter Alert when too many 404s detected on an instance

Choose Next

Choose Create alarm

Go to your email, look for a confirmation message, and select the Confirm subscription link.

Return to the AWS Management Console.

In the left navigation pane, choose CloudWatch (at the very top). 

Your alarm might appear in orange, indicating that there is Insufficient data to trigger the alarm. This alarm appears because no data has been received in the past minute.

You now access the web server to generate log data.

Return to the web browser tab with the web server.

 If the web server browser tab is no longer open, choose the Details dropdown menu above these instructions, and then choose Show

Copy the WebServerIP value, and paste it into a new browser tab.

Attempt to go to pages that do not exist by adding a page name after the IP address. Repeat this step at least five times.

For example, enter http://192.0.2.0/start2

Each separate request generates a separate log entry.

Wait 1-2 minutes for the alarm to trigger. In the AWS Management Console, you can occasionally choose  Refresh to update the status.

The graph shown on the CloudWatch page should turn red to indicate that it is in the Alarm state.

Check your email. You should have received an email with the subject ALARM: "404 Errors".

This task demonstrates how you can create an alarm from application log data and receive alerts when unusual behavior is detected in the log file. The log file is accessible within CloudWatch Logs to perform further analysis to diagnose the activities that triggered the alarm.

 

Task 3: Monitoring instance metrics using CloudWatch
Metrics are data about the performance of your systems. CloudWatch stores metrics for the AWS services you use. You can also publish your own application metrics either via the CloudWatch agent or directly from your application. CloudWatch can present the metrics for search, graphs, dashboards, and alarms.

In the task, you use metrics that CloudWatch provides.

CloudWatch Metrics

On the Services  menu, choose EC2.

In the left navigation pane, choose Instances.

Select the check box next to Web Server.

Choose the Monitoring tab in the lower half of the page.

Examine the metrics presented. You can also select a chart to display more information.

CloudWatch captures metrics about CPU, disk, and network usage on the instance. These metrics view the instance from the outside as a virtual machine but do not give insight into what is running inside the instance, such as measuring free memory or free disk space. Fortunately, you can obtain information about what is happening inside the instance by using information that the CloudWatch agent captures because the CloudWatch agent runs inside the instance to collect metrics.

From the Services menu, select CloudWatch.

In the left navigation pane, choose Metrics. Then expand  Metrics and select All metrics.

The lower half of the page displays the various metrics that CloudWatch has collected. AWS automatically generates some of these metrics, and the CloudWatch agent collects some others.

Choose CWAgent, and then choose device, fstype, host, path.

You see the disk space metrics that the CloudWatch agent is capturing.

Above the table, choose CWAgent (in the line that says All > CWAgent > device, fstype, host, path).

Choose host.

You see metrics relating to system memory.

Above the table, choose All (in the line that says All > CWAgent > device, fstype, host, path).

Explore the other metrics that CloudWatch is capturing. These are automatically generated metrics coming from the AWS services that have been used in this AWS account.

You can  select metrics that you want to appear on the graph.

 

Task 4: Creating real time notifications
CloudWatch Events deliver a near-real-time stream of system events that describe changes in AWS resources. Simple rules can match events and route them to one or more target functions or streams. CloudWatch Events become aware of operational changes as they occur.

CloudWatch Events respond to these operational changes and take corrective action as necessary by sending messages to respond to the environment, activating functions, making changes, and capturing state information. You can also use CloudWatch Events to schedule automated actions that self trigger at certain times using cron or rate expressions.

In this task, you create a real time notification that informs you when an instance is stopped or terminated.

CloudWatch Events

On the CloudWatch console, in the left navigation pane expand  Events, choose Rules.

Choose Create rule.

In the Rule definition, configure the following settings:

For Name, enter Instance_Stopped_Terminated

Choose Next

In the Build event pattern section

Confirm that Event source is AWS Services.

For AWS service, choose EC2.

For Event Type: Select EC2 Instance State-change Notification.

For Event Type Specification 1 choose 

Select the check box for  Specific state(s).

For Specific state(s) , from the dropdown menu, select stopped and terminated.

Choose Next

In the Select target(s) section

For Target1:

For Target types, choose AWS Service

For Select a target, choose SNS topic

For Topic, select the Default_CloudWatch_Alarms_Topic 

Under Permissions, Clear the checkbox Use execution role (recommended).

Choose Next

Choose Next

At the bottom of the Review and create page

Choose Create rule

Configure a real time notification
You can configure Amazon Simple Notification Service (Amazon SNS) to send the real time notifications to your phone via SMS, or to your email address. Because configuring SMS messaging requires opening a ticket with AWS Support as well as time to configure the changes to your account, you will use the same email address you used earlier to complete this exercise.

You can read more about configuring SMS messaging with SNS in the Amazon Simple Notification Service Developer Guide.

On the Services  menu, choose Simple Notification Service.

In the left navigation pane, choose Topics.

Choose the link in the Name column.

You should see a single subscription associated with your email address. This is the Topic you configured in Task 2.

On the Services  menu, choose EC2.

In the left navigation pane, choose Instances.

Select the check box next to Web Server.

Choose Instance state , then Stop instance, and then Stop

The Web Server instance enters the Stopping state. After a minute, it enters the Stopped state.

You should then receive an email with details about the instance that was stopped.

The message is formatted in JSON. To receive a message that is easier to read, you could create an AWS Lambda function that CloudWatch Events triggers. The Lambda function could then format a more readable message and send it via Amazon SNS.

This task demonstrates how to receive real time notifications when infrastructure changes.

 

Task 5: Monitoring for infrastructure compliance
With AWS Config, you can assess, audit, and evaluate the configurations of your AWS resources. AWS Config continuously monitors and records your AWS resource configurations and allows you to automate the evaluation of recorded configurations against desired configurations.

With AWS Config, you can review changes in configurations and relationships between AWS resources, dive into detailed resource configuration histories, and determine your overall compliance against the configurations specified in your internal guidelines. With AWS Config, you can simplify compliance auditing, security analysis, change management, and operational troubleshooting.

In this task, you activate AWS Config rules to ensure compliance of tagging and Amazon Elastic Block Store (Amazon EBS) volumes.

On the Services  menu, choose Config.

If a Get started button appears, do the following:

Choose Get started

Choose Next 

Choose Next

Choose Confirm

This configures AWS Config for initial use. A Welcome to AWS Config window pops up. You can close it.

In the left navigation pane, choose Rules (the one toward the top).

Choose  Add rule

In the AWS Managed Rules section in the search field, enter required-tags

Select the button next to required-tags.

Choose Next

You configure the rule to require a project code for each resource.

In the Configure rule page, scroll to Parameters, and configure the following settings:

To the right of tag1Key, enter project (replace any existing value).

Choose Next (at the bottom of the page).

Choose Add rule 

This rule now looks for resources that do not have a project tag. This takes a few minutes to complete, so continue with the next steps. You do not need to wait.

You now add a rule that looks for EBS volumes that are not attached to EC2 instances.

Choose Add rule 

In the AWS Managed Rules section in the search field, enter ec2-volume-inuse-check

Select the button next to ec2-volume-inuse-check.

Choose Next

Choose Next again.

Choose Add rule 

Wait until at least one of the rules has completed evaluation. Refresh your browser page if necessary.

 If you receive a message that there are No resources in scope, wait a few minutes longer. This message is an indication that AWS Config is still scanning available resources. The message eventually disappears.

Choose each of the rules to view the result of the audits. 

Under Resources in scope select Compliant from the list.

The following should be among the results:

required-tags: A compliant EC2 instance (because the Web Server has a project tag) and many non-compliant resources that do not have a project tag

ec2-volume-inuse-check: One compliant volume (attached to an instance) and one non-compliant volume (not attached to an instance)

AWS Config has a large library of pre-defined compliance checks, and you can create additional checks by writing your own AWS Config rule using Lambda.


Lab complete








B) Working with AWS CloudTrail
 

Activity overview
In this activity, you create an AWS CloudTrail trail that audits actions taken in your account. You then investigate to determine who modified the Café website.

The activity starts with an Amazon Elastic Compute Cloud (Amazon EC2) instance named Café Web Server, which runs a web application that hosts the Café website.

In Task 1, you observe that the website looks normal.

In Task 2, soon after you create a trail with CloudTrail, you notice that the website has been hacked and that part of the hack involved an action during which someone modified the security group settings.

In Task 3, you use a variety of methods to analyze the CloudTrail logs, including the Linux grep utility and the AWS Command Line Interface (AWS CLI).

In Task 4, you use Amazon Athena to search the CloudTrail logs.

In the Challenge section that concludes Task 4, you work to identify the hacker.
In Task 5, now that you have discovered the culprit, you remove that user's access. You also take steps to reduce the chances that the AWS account and the Café website will be hacked again.

  The architectural diagram illustrates the setup that this activity uses.

architectural diagram

Duration

This lab requires approximately 75 minutes to complete.

 

Activity objectives
After completing this activity, you will be able to:

Configure a CloudTrail trail
Analyze CloudTrail logs by using various methods to discover relevant information
Import CloudTrail log data into Athena
Run queries in Athena to filter CloudTrail log entries
Resolve security concerns within the AWS account and on an EC2 Linux instance
 

Business case relevance
A new request from the Café leadership team

cafe scene

 

Martha and Frank are concerned because the website was hacked. They are relying on you to discover who did it and to make sure that it does not happen again.

Faythe, Frank, Martha, and others make frequent changes to the website, and sometimes those changes cause issues. Also, this morning, it looks like the website was hacked. Martha and Frank are asking Sofîa if there is a way to track what was changed and who made the changes.

Play the role of Sofîa, become a detective, and discover the culprit.

 

Activity steps
 

Launching the activity environment
At the top of these instructions, select Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status. 

Wait until you see the message Lab status: ready, and then select the X to close the Start Lab panel.

At the top of these instructions, select AWS

This step opens the AWS Management Console in a new browser tab. The system automatically logs you in.

Tip: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Select the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console tab so that it displays alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to make it easier to follow the lab steps.

 

Task 1: Modifying a security group and observing the website
From the Services menu, choose Compute then the EC2 service.

Choose Instances, and then locate and select the Café Web Server (WebSecurityGroup) instance.

In the Security tab, choose the sg-xxxxxxxxxx security group.

In the Inbound rules tab, notice that only one inbound rule has been defined, which is for HTTP access over TCP port 80.

Choose Edit inbound rules, and then choose Add rule and configure the rule as follows:

Type: Select SSH
Port Range: Enter 22
Source: Enter My IP
Important: Confirm that the TCP port 22 access will be open to only your IP address. The entry should show a Classless Inter-Domain Routing (CIDR) block that has a particular IP address followed by /32, not to all IP addresses (which would be shown by 0.0.0.0/0).

At the bottom of the page, choose Save rules.

Observe the Café website:

Choose Instances, select the Café Web Server instance. Click the Details tab  and copy the Public IPv4 address value 
Open a new browser tab, and navigate to http://<WebServerIP>/cafe/ (substitute the <WebServerIP> value).
Notice that the website looks normal. For example, the photos are all appropriate for a bakery café.
 

Task 2: Creating a CloudTrail log and observing the hacked website
In this task, you create a CloudTrail trail in your AWS account. You also notice that soon after creating the trail, the Café website is hacked.

 

Task 2.1: Create a CloudTrail log
In the AWS Management Console, from the Services menu, select Management & Governance then CloudTrail. Ignore the AWSOrganizations access denied message at the top of the console.

On the navigation pane on the left, choose Trails. 

If the navigation pane is not displayed, choose the three icon of the horizontal lines  on the top left of the screen. 
If you encounter the following warning The option to create an organization trail is not available for this AWS account, you can ignore it.

Choose Create trail

Configure the trail as follows:

For Trail name, enter monitor 
Important: Verify that you set the Trail name to monitor, or this activity will not work as intended.
Select Create a new S3 bucket.
For Trail log bucket and folder, enter  monitoring#### (the #### characters are four random digits).
For AWS KMS alias, enter your initials followed by -KMS (for example, kc-KMS).
Choose Next

On the Choose log events page, choose Next

On the Review and create page, choose Create trail

Verify that you see your trail on the Trails page.

 

Task 2.2: Observe the hacked website
Return to the browser tab where you have the Café website open, and refresh the page.

Important: You might need to wait a full minute before the hack will occur. Also, your browser may be caching the images on this website. Press and hold Shift while you also choose the browser refresh button in order to see the latest changes to the website.

Notice that the website has been hacked. Who put that image there? The image certainly does not look correct.

It is up to you to figure out who hacked the website.

It is good that you enabled CloudTrail before this happened. CloudTrail can give you valuable information about what users have been doing in your account.

In the AWS Management Console, browse to the EC2 service, and observe the Café Web Server instance details.

Does anything look suspicious?

In the Security tab, choose the sg-xxxxxxxxxx security group again, and then choose the Inbound rules tab.

Where did that extra entry come from?

You still see the entry you created earlier: the rule that opens port 22 to only your IP address. However, you also now see that someone else created an additional inbound rule that allows Secure Shell (SSH) access from anywhere (0.0.0.0/0).

Who added this security hole? You can search the CloudTrail logs to find out.

 

Task 3: Analyzing the CloudTrail logs by using grep
In this task, you analyze the CloudTrail logs by using the grep Linux utility to see if you can figure out who hacked the website.

 

Task 3.1: Connect to the Café Web Server host EC2 instance by using SSH
In this task, you connect to the Café Web Server EC2 instance. You use SSH to connect to the instance.

Windows users should follow Task 3.2 for Windows. Both macOS and Linux users should follow Task 3.2 for macOS/Linux.

macOS/Linux users: visit this link for login instructions

 

Task 3.2 for Windows: SSH
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


 

Task 3.2 for macOS/Linux: SSH
These instructions are for Mac/Linux users only. If you are a Windows user, skip ahead to the next task.

Read through the three bullet points in this step before you start to complete the actions because you will not be able see these instructions when the Details panel is open.

Choose the Details dropdown menu above these instructions, and then choose Show

A Credentials window will open.

Chose the Download PEM button, and save the labsuser.pem file.

To exit the Details panel, choose the X.

Open a terminal window, and change the cd directory to the directory where the labsuser.pem file was downloaded.

For example, run the following command if the file was saved to your Downloads directory:

cd ~/Downloads
To change the permissions on the key to be read only, run the following command:

chmod 400 labsuser.pem
Return to the AWS Management Console, and in the EC2 service, choose Instances. Select the check box next to the Café Web Server instance, and choose the Description tab.

Copy the IPv4 Public IP value.

Return to the terminal window, and run the following command (replace <public-ip> with the actual public IP address you copied):

ssh -i labsuser.pem ec2-user@<public-ip>
When prompted, type yes to allow a first connection to this remote SSH server.

Because you are using a key pair for authentication, you will not be prompted for a password.


 

Task 3.3: Download and extract the CloudTrail logs
Verify that your terminal is connected via SSH to the Café Web Server EC2 instance.

Run the following command to create a local directory on the web server to download the CloudTrail log files to:

mkdir ctraillogs
Run the following command to change the directory to the new directory:

cd ctraillogs
Run the following command to list the buckets to recall the bucket name:

aws s3 ls
In the command below, replace <monitoring####> with the actual bucket name that starts with monitoring (the bucket name is part of the output from the ls command that you ran). Run the adjusted command to download the CloudTrail logs:

aws s3 cp s3://<monitoring####>/ . --recursive
If the command is successful, you should see that a few log files are downloaded.

Important: If there was no output in the command line when you ran the last command, it likely means that not enough time has passed since you created the CloudWatch trail. CloudWatch posts logs to Amazon Simple Storage Service (Amazon S3) every 5 minutes. You might need to wait and try running the command again. Do not proceed to the next step until you have downloaded at least one log file.

Use the cd and ls commands repeatedly (or enter cd and then press Tab multiple times) as necessary to change the directory to the subdirectory where the logs were downloaded. When you run ls, all of the downloaded log files should display. They will be located in an AWSLogs/<account-num>/CloudTrail/<Region>/<yyyy>/<mm>/<dd> subdirectory.

Notice that the log files end in json.gz, which indicates that they are compressed as GNU zip files.

Run the following command to extract the logs:

gunzip *.gz
Run ls again. Notice that all files are now extracted.

 

Task 3.4: Analyze the logs by using grep
In this section of the activity, you use the Linux grep utility to analyze the CloudTrail logs.

To analyze the structure of the logs, do the following:

Copy one of the file names returned by the ls command that you ran.
Enter cat in the terminal window, followed by a space, and then paste the copied file name. Run the command.
Note that the files are in JavaScript Object Notation (JSON) format. However, it is difficult to read them in this output format.
Run the cat command again, but this time format the output (replace <filename.json> with the actual file name):
cat <filename.json> | python -m json.tool
This format is more readable. You can now also see the structure of the log entries. Notice that each entry contains the same standard fields, including awsRegion, eventName, eventSource, eventTime, requestParameters, sourceIPAddress, userIdentity, and more.

The graphic below shows an example log entry.

example log entry

You can now read the log entries. However, the number of entries—even in just this one log file—can be large. You might have downloaded more than one log because new log files are created over time. You need to find a way to search log entries across multiple files and also filter the results.

Consider how you want to target the search. You are not interested in everything that is happening in this account. Instead, your interest is in an action that was taken on a particular EC2 instance (that is, the web server that was hacked).

Start by filtering the log results where the sourceIpAddress matches the IP address of the Café Web Server instance.

Run the following command to set the WebServerIP address as a variable that you can use in future commands (replace <WebServerIP> with the actual IP address that displays to the left of these instructions):

ip=<WebServerIP>
Run the following command:

for i in $(ls); do echo $i && cat $i | python -m json.tool | grep sourceIPAddress ; done
The command you ran does the following:

It creates a for loop that includes the names of the files in the current directory.
During each iteration of the for loop, it echoes the file name and then prints the contents of the file in JSON format.
Only the lines of JSON that contain the sourceIPAddress tag are printed.
Note that there are several log entries in the trail where the sourceIPAddress was the Café Web Server instance.

Run a similarly structured command but where the command returns the eventName of every captured event:

for i in $(ls); do echo $i && cat $i | python -m json.tool | grep eventName ; done
The command you ran follows the same logic as the command you ran before, but this time, it filters log entries for the eventName.

The results of the previous command contain different details. Many describe and list actions were recorded, and they look relatively harmless. However, if you scroll through the list, you notice that occasional update actions were also recorded. You could use a text editor like vi to open a log that contains a recorded event that you want to know more about. You can then search for that eventName and look at the details.

However, you might benefit from using a different tool other than grep to locate these log entries more easily.

 

Task 3.5: Analyze the logs by using AWS CLI CloudTrail commands
Another approach you can use to analyze CloudTrail logs is to use AWS CLI CloudTrail commands.

Open the AWS CLI Reference page for CloudTrail.

Choose the lookup-events command to see details about the command.

Notice that you can look up events based on one of eight different attributes, including AWS access key, event name, user name, and others.
In the AWS CLI Command Reference page, scroll to the Example, which shows how to filter the trail for console logins. Run that command in your terminal window:
aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=ConsoleLogin
The results indicate there have been no console login events or that the only user who has logged into the console is the same user that you are logged into the console as

However, there are other ways to modify resources on AWS instead of using the console. The hacker might have used a different approach.

Run the following command to find any actions that were taken on security groups in the AWS account:

aws cloudtrail lookup-events --lookup-attributes AttributeKey=ResourceType,AttributeValue=AWS::EC2::SecurityGroup --output text
Something in this result set might contain some information that would help you discover what happened, but there might be too many results for you to easily identify the issue.

Perhaps you can narrow the search results further so that you get only the results related to the security group that is used by the web server instance.

Run the following commands to find the security group ID that is used by the Café Web Server instance, and then echo the result to the terminal:

region=$(curl http://169.254.169.254/latest/dynamic/instance-identity/document|grep region | cut -d '"' -f4)
sgId=$(aws ec2 describe-instances --filters "Name=tag:Name,Values='Cafe Web Server'" --query 'Reservations[*].Instances[*].SecurityGroups[*].[GroupId]' --region $region --output text)
echo $sgId
Notice that a single security group ID was found.

Now use the security group ID that the previous command returned to further filter your AWS CLI CloudTrail command results:

aws cloudtrail lookup-events --lookup-attributes AttributeKey=ResourceType,AttributeValue=AWS::EC2::SecurityGroup --region $region --output text | grep $sgId
You could keep experimenting with different commands to filter the log results. However, you might wonder whether there is a better tool or solution for reading these logs. AWS has the AWS Partner Network (APN), where companies specialize in helping AWS customers with this challenge. See https://aws.amazon.com/cloudtrail/partners/ for a listing of APN Partner solutions.

The APN Partner solutions suit the needs of many AWS customers. However, for the purposes of this activity, there is one additional approach to examining CloudTrail log files that you might use, and it uses another AWS service. In the next task, you explore CloudTrail logs by using Athena.

 

Task 4: Analyzing the CloudTrail logs by using Athena
As you experienced in the previous task, it can be difficult to find specific information within a very large dataset. CloudTrail logs are verbose for a reason: you might want to know every relevant detail about a particular action that was taken in your AWS account. However, using command line tools to filter the logs can be tedious.

It would be convenient if all the log data were in a database and you could use structured query language (SQL) queries to search for the log entries that you are most interested in. Athena provides such a solution. Athena is an interactive query service that makes it easy to analyze data in Amazon S3 by using standard SQL.

In this task, you use Athena to analyze your CloudTrail logs.

 

Task 4.1: Create the Athena table
From the AWS Management Console Services menu, choose CloudTrail to open the CloudTrail console.

In the navigation pane, choose Event history.

Notice that CloudTrail provides this event history interface where you can apply filters and conduct a basic search based on parameters, such as Event name or Resource type. The Event history page can be a useful tool, and you are free to explore it. However, in this activity, you use Athena.

From the Event history page, click Create Athena table

Storage location: Choose the monitoring#### S3 bucket where you configured CloudTrail to store log files.
Take a moment to analyze how the Athena CREATE TABLE statement is formed.

It creates a database column for each of the standard name-value pairs in each JSON-formatted CloudTrail log entry. Refer to the image of the JSON format of a typical log entry in Task 3.4 to confirm this information.
At the bottom of the CREATE TABLE SQL statement, notice the LOCATION statement. This indicates the Amazon S3 location where the table data will be stored. In this case, the data is already there. You are defining the table schema that will be used to parse existing JSON-structured data.
For details on CloudTrail record structure, see https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference.html.
For details on how this Athena table was created, see the CREATE EXTERNAL TABLE document at https://docs.aws.amazon.com/athena/latest/ug/cloudtrail-logs.html.
After you are done analyzing the CREATE TABLE details, choose Create table.

The table is created with a default name that includes the name of the S3 bucket.

From the Services menu, choose Analytics then the Athena service.

 

Task 4.2: Analyze logs using Athena
The advantage of using Athena is that you can now run SQL queries over your log data.

If you do not already see the Athena Query Editor, choose Explore query editor and it should then display.

If a Tutorial screen appears, choose the X in the top corner to exit out of it.

In the left panel of the Athena Query Editor, you should see the cloudtrail_logs_monitoring#### table.

Select + beside the table to reveal the column names.

Analysis: Notice how each standard child element that exists in a CloudTrail log record in JSON format has a corresponding column name in this database. The useridentity database column is a struct type, because it contains more than a single name-value pair. Similarly, the resources database column is an array.

Start by setting up a query results location and then running a simple query to get an idea of the data that is available in the logs.

On the menu bar at the upper right of the page, choose Settings followed by Manage.

Set Location of query result to s3://monitoring####/results/ and replace monitoring#### with the name of the bucket you created earlier.

Choose Save.

Select the Editor table and paste the following SQL query into the Query 1 panel. Replace #### with the numbers in your actual table, and choose Run.

SELECT *
FROM cloudtrail_logs_monitoring####
LIMIT 5
This query returns five rows of data. Look at the result set (scroll to the right in the Results panel to see additional column data).

Focus on the columns useridentity, eventtime, eventsource, eventname, and requestparameters, which contain the most valuable information to help you find the origin of the hack.
  
The useridentity column has many details that make it more difficult to read though. You now return only the user name for that column.

Run a new query that selects only those columns that were previously mentioned. This time, limit the results to 30 rows:

SELECT useridentity.userName, eventtime, eventsource, eventname, requestparameters
FROM cloudtrail_logs_monitoring####
LIMIT 30
You should now be able to find out who modified the security group that is associated with the Café Web Server instance.

 

Challenge: Identify the hacker
In this section of the activity, you try to discover the log entry that includes the essential information about who hacked the website. Specific steps are not provided. Instead, you must experiment with running different queries until you find the information that you are looking for.

Tips:

Tip 1: Look at the data that was returned by the last command that you ran. Even if none of the log entry details that display are the log entry you are looking for, they still give you an indication of what kinds of data the different columns contain. Don't be afraid to experiment with running modified SQL queries. ChooseA the + icon next to New query 1 to create a second query tab. This way, you can preserve older queries without deleting them.

Tip 2: Try filtering by events that are related to the Amazon EC2 service. Remember that you can add WHERE clauses, such as WHERE eventsource = 'ec2.amazonaws.com'

Tip 3: To ensure you are querying the entire log set, remove the LIMIT clause from your query.

Tip 4: Take a look at the kind of data that is captured in the eventname column. Can you further refine your SQL query so that it looks for only events that contain the word Security? Remember that SQL allows you to use compound WHERE clauses that look for pattern matches (for example, WHERE columnName = 'some value' AND otherColumnName LIKE '%part of some value%'). 

Tip 5: After you have successfully filtered all security-related actions in the log, analyze the eventnames further. Do any of them look suspicious? Can you adjust the WHERE clause to search for a particular *eventname?

Tip 6: If you are still looking for the entry that shows who opened port 22 to the world, here is a general query that is often useful to run. This query might help identify the action:

SELECT DISTINCT useridentity.userName, eventName, eventSource FROM cloudtrail_logs_monitoring#### WHERE from_iso8601_timestamp(eventtime) > date_add('day', -1, now()) ORDER BY eventSource;
This query returns a list of all users who were active in the account in the past day and the distinct actions they have taken.

You have successfully completed the challenge if you can identify the following information:

The name of the AWS user who created the security hole in the Café Web Server security group
The exact time that they hacked the security group
The IP address from which they hacked it (copy this value to a text file for later reference)
The method they used to perform the hack (console or programmatic access)
Congratulations! You have successfully uncovered the identity of the hacker!

 

Task 5: Analyzing the hack further and improving security
In this last task, you work to secure both your AWS account and the web server instance.

 

Task 5.1: Check the OS users
In the terminal where you have an active SSH session to the web server instance, run the following command to find out who has recently logged into this operating system (OS):

sudo aureport --auth
There is evidence that a user other than ec2-user has logged in. Who is that chaos-user?

Run the who command to figure out who is currently logged in:

who
The user is still logged in! Get them off this instance right away!

Run the following command to try to remove the chaos-user OS user:

sudo userdel -r chaos-user
That didn't work because they are still logged in. However, it did return the process number they are connected as.

In the command below, replace ProcNum with the process number returned by the last command. Run the adjusted command to stop the process that has the active chaos-user login session:

sudo kill -9 ProcNum
Run the who command again to verify that the chaos-user OS user is no longer connected:

who
Now you (the ec2-user) should be the only user connected.

Run the following command to try to delete the chaos-user again:

sudo userdel -r chaos-user
It should succeed this time.

Run the following command to verify no other suspicious OS users who can login:

sudo cat /etc/passwd | grep -v nologin
Note that the grep part of the command you just ran filtered out the OS users who do not have a login.

The root, sync, shutdown, and halt users are all standard OS users in Amazon Linux, so there are no other concerning user logins on this instance.

 

Task 5.2: Update SSH security
Analyze SSH settings on the instance.

You have removed the OS user who hacked into the instance, but how did they manage to connect to the EC2 instance by using SSH in the first place?

You have been careful about who has access to the key pair file. However, maybe you should check the SSH settings on this instance.

sudo ls -l /etc/ssh/sshd_config
Notice the last modified timestamp for the file. This file was modified today! That is concerning.

Run the following command to edit the SSH configuration file in the VI editor:

sudo vi /etc/ssh/sshd_config
Analyze the details of this file. Enter :set number to see the line numbers in this file.
Notice on line 61 that password authentication is enabled. That is definitely not a security best practice! That means that anyone who knows (or can correctly guess) the username and password combination of an OS user can remotely access this instance without using an SSH key pair. This setting needs to be corrected.
Move your cursor (using the arrow up or down keys) to the PasswordAuthentication yes line and comment it out.
Tip: Enter a on your keyboard to enter edit mode in VI, and add a # character at the start of the line.

Next, move your cursor to the #PasswordAuthentication no line (line 63) by using the arrow keys and uncomment this line (remove the # character).
Choose the Esc key on your keyboard to exit edit mode.
Save the changes, and exit the VI editor using the :wq command.
Run the following command to restart the SSH service so that the changes go into effect:

sudo service sshd restart
Note: If running the command above interrupts your SSH connection, reestablish the SSH connection before continuing on to the next step.

Finally, in the EC2 console, return to the Web Server security group settings.

With the Web Server security group selected, go to the Inbound tab, and choose Edit.

Delete the inbound rule that allows port 22 access from 0.0.0.0/0 (the one the hacker created).

Save the change.

Nice work! You have kicked the hacker out of this instance and remove the login account that they used. You also updated the SSH settings so that only users who have the correct key pair and the same source IP address as you can connect to it.

 

Task 5.3: Fix the website
Now that the hacker no longer has access to this instance, you can fix the issue with the website.

Run the following command to navigate to the directory where the website image files are held and review the contents:

cd /var/www/html/cafe/images/
ls -l
It looks like the hacker created a backup of the original file.

Run the following command to restore the original graphic on the website.

sudo mv Coffee-and-Pastries.backup Coffee-and-Pastries.jpg
To test the fix, reload the http://WebServerIP/cafe website in the browser.

Tip: You may need to press and hold the Shift key and choose the browser refresh button to see the change.

That looks better!

 

Task 5.4: Delete the AWS hacker user
Recall that the hacker not only accessed the EC2 instance hosting the website but also managed to run an AWS CLI command that opened port 22 in the security group to the entire internet. In this step, you remove the chaos AWS Identity and Access Management (IAM) user from the account.

In the AWS Management Console, choose the Services menu, and choose IAM.

Choose the Users link, and select the check box next to the chaos user.

Choose Delete, enter the users name and select Delete.

Nice work! That chaos user shouldn't be causing any trouble in the AWS account anymore.

Update from Café

cafe scene

Everyone at the Café is relieved that Sofîa was able to uncover the identity of the person who committed the hack and remove their access to the web server and to the AWS account.

In the end, the team members were lucky that it looks like the hacker was just trying to have fun. However, they all know that the hacker could have caused serious damage. Everyone on the team at the Café who participates in updating and maintaining the website now knows how important it is to keep the site secure. They are also definitely going to continue to use CloudTrail as a key tool for auditing activity on their AWS account.

 

Activity complete
