Creating a Website on S3
Lab overview
In this lab, you practice using AWS Command Line Interface (AWS CLI) commands from an Amazon Elastic Compute Cloud (Amazon EC2) instance to:

Create an Amazon Simple Storage Service (Amazon S3) bucket.

Create a new AWS Identity and Access Management (IAM) user that has full access to the Amazon S3 service.

Upload files to Amazon S3 to host a simple website for the Café & Bakery.

Create a batch file that can be used to update the static website when you change any of the website files locally.

A client with the website URL is deployed through Amazon S3.

Clients will be able to access the website you have deployed to Amazon S3. The website URL is similar to this example: http://.s3-website-us-west-2.amazonaws.com. You can create and access the bucket through the AWS Management Console or the AWS CLI. 

Objectives
After completing this lab, you should be able to:

Run AWS CLI commands that use IAM and Amazon S3 services.

Deploy a static website to an S3 bucket.

Create a script that uses the AWS CLI to copy files in a local directory to Amazon S3.

Duration
This activity requires approximately 45 minutes to complete.

Accessing the AWS Management Console
At the top of these instructions, choose Start Lab to launch the lab.

Wait until the message "Lab status: ready" appears, and then choose X to close the Start Lab panel.

Next to Start Lab, choose AWS, which opens the AWS Management Console in a new browser tab. The system automatically signs you in.

Tip If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console so that it appears alongside these instructions. 

Important: Do not change the lab Region unless specifically instructed to do so.

Task 1: Connect to an Amazon Linux EC2 instance using SSM
In this task, you connect to your Amazon EC2 Instance using AWS Systems Manager Session Manager.

Choose the Details button at the top, then choose Show. 

Copy the InstanceSessionUrl value from the list and then paste it into a new web browser tab.

A console connection is made to the instance inside your web browser window using ssm-user, a prompt is displayed.

Run the following commands to change the user and home directory:

sudo su -l ec2-user
pwd
Note: This is the SSH terminal where you run commands as instructed throughout the lab.

 

Task 2: Configure the AWS CLI
Unlike some other Linux distributions that are available through Amazon Web Services (AWS), Amazon Linux instances already have the AWS CLI pre-installed on them.

In the SSH session terminal window, run the configure command to update the AWS CLI software with credentials.

aws configure
  

At the prompt, configure the following:

AWS Access Key ID: Copy and paste the value for AccessKey from pane in the left, into the terminal window.

AWS Secret Access Key: Copy and paste the value for SecretKey from pane in the left, into the terminal window.

Default region name: Enter us-west-2

Default output format: Enter json

 

Task 3: Create an S3 bucket using the AWS CLI
The s3api command creates a new S3 bucket with the AWS credentials in this lab. By default, the S3 bucket is created in the us-east-1 Region. 

Tip: In this lab, you might use the s3api command or the s3 command. s3 commands are built on top of the operations that are found in the s3api commands.

When you create a new S3 bucket, the bucket must have a unique name, such as the combination of your first initial, last name, and three random numbers. For example, if a user's name is Terry Whitlock, a bucket name could be twhitlock256

To create a bucket in Amazon S3, you use the aws s3api create-bucket command. When you use this command to create an S3 bucket, you also include the following:

Specify --region us-west-2

Add --create-bucket-configuration LocationConstraint=us-west-2 to the end of the command.

The following is an example of the command to create a new S3 bucket. You can use twhitlock256 as your bucket name, or you can replace <twhitlock256> with a bucket name that you prefer to use for this lab. 

aws s3api create-bucket --bucket <twhitlock256> --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
If the command is successful, you will get a JSON-formatted response with a Location name-value pair, where the value reflects the bucket name. The following is an example:

{
        "Location": "http://twhitlock256.s3.amazonaws.com/"
}
Task 4: Create a new IAM user that has full access to Amazon S3
The AWS CLI command: aws iam create-user creates a new IAM user for your AWS account. The option --user-name is used to create the name of the user and must be unique within the account. 

Using the AWS CLI, create a new IAM user with the command aws iam create-user and username awsS3user: 

aws iam create-user --user-name awsS3user
Create a login profile for the new user by using the following command:

aws iam create-login-profile --user-name awsS3user --password Training123!
Copy the AWS account number:

In the AWS Management Console, choose the account VocLabsUser... drop down menu located at the top right of the screen.

Copy the 12 digit Account ID number.

In the current drop down menu, choose Sign Out.

Log in to the AWS Management Console as the new awsS3user user:

In the browser tab where you just signed out of the AWS Management Console, choose Log back in or Sign in to the Console. 

In the sign-in screen, choose the radio button IAM user.

In the text field, paste or enter the account ID with no dashes.

Choose Next.

A new login screen with Sign in as IAM user field will show. The account ID will be filled in from the previous screen.

For IAM user name, enter awsS3user

For Password, enter Training123!

Choose Sign In

On the AWS Management Console, in the Search box, enter S3 and choose S3. This option takes you to the Amazon S3 console page.

Note: The bucket that you created might not be visible. Refresh the Amazon S3 console page to see if it appears. The awsS3user user does not have Amazon S3 access to the bucket that you created, so you might see an error for Access to this bucket.  

In the terminal window, to find the AWS managed policy that grants full access to Amazon S3, run the following command:

aws iam list-policies --query "Policies[?contains(PolicyName,'S3')]"
The result displays policies that have a PolicyName attribute containing the term S3. Locate the policy that grants full access to Amazon S3. You use this policy in the next step.

To grant the awsS3user user full access to the S3 bucket, replace <policyYouFound> in following command with the appropriate PolicyName from the results, and run the adjusted command:

aws iam attach-user-policy --policy-arn arn:aws:iam::aws:policy/<policyYouFound> --user-name awsS3user
Return to the AWS Management Console, and refresh the browser tab.


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/00b95f4e-b19d-45ce-b28d-122756b740e5" />

 

Task 5: Adjust S3 bucket permissions
On the AWS Management Console, on the Amazon S3 console, choose your bucket name.

Go to permissions, under Block public access (bucket settings), choose Edit

DeSelect/UnSelect Block all public access

Choose Save changes (confirm on the prompt)

On to permissions tab, under Object Ownership, choose Edit

Choose ACLs enabled

Choose I acknowledge that ACLs will be restored.

Choose Save changes

 

Task 6: Extract the files that you need for this lab
A file containing the static-website contents for the Amazon S3 bucket will need to be extracted in the following step.

Back in the SSH terminal, extract the files that you need for this lab by running the following commands:

cd ~/sysops-activity-files
tar xvzf static-website-v2.tar.gz
cd static-website
To confirm that the files were extracted correctly, run the ls command. 

You should see a file named index.html and directories named css and images.


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e9180683-d106-40c3-8d10-5bc96fa1f81b" />

 

Task 7: Upload files to Amazon S3 by using the AWS CLI
Once the files are extracted, you upload the contents of the file to Amazon S3. These files include what you explored when you ran the ls command.

So that the bucket can function as a website, replace <my-bucket> in the following command with your bucket name, and run the adjusted command. 

aws s3 website s3://<my-bucket>/ --index-document index.html
This process helps ensure that the index.html file will be known as the index document.

To upload the files to the bucket, replace <my-bucket> in the following command with your bucket name, and run the adjusted command:

aws s3 cp /home/ec2-user/sysops-activity-files/static-website/ s3://<my-bucket>/ --recursive --acl public-read
Notice that the upload command includes an access control list (ACL) parameter. This parameter specifies that the uploaded files have public read access. It also includes the recursive parameter, which indicates that all files in the current directory on your machine should be uploaded.

To verify that the files were uploaded, replace <my-bucket> in the following command with your bucket name, and run the adjusted command:

aws s3 ls <my-bucket>
On the AWS Management Console, on the Amazon S3 console, choose your bucket name.

Choose the Properties tab. At the bottom of the this tab, note that Static website hosting is Enabled. Running the aws s3 website AWS CLI command turns on the static website hosting for an Amazon S3 bucket. This option is usually turned off by default.

To open the URL on a new page, choose the Bucket website endpoint URL that displays.

Congratulations, you have created a static website that is available to the public for viewing!



Task 8: Create a batch file to make updating the website repeatable
To create a repeatable deployment, you create a batch file by using the VI editor. 

In the terminal window, to pull up the history of recent commands, run the following command:

history
Locate the line where you ran the aws s3 cp command. You will put this line in your new batch file.

To change directories and create an empty file, run the following command in the SSH terminal session:

cd ~
touch update-website.sh
To open the empty file in the VI editor, run the following command.

vi update-website.sh
To enter edit mode in the VI editor, press i

Next, you add the standard first line of a bash file and then add the s3 cp line from your history. To do so, replace <my-bucket> in the following command with your bucket name, and copy and paste the adjusted command into your file:

#!/bin/bash aws s3 cp /home/ec2-user/sysops-activity-files/static-website/ s3://<my-bucket>/ --recursive --acl public-read
To write the changes and quit the file, press Esc, enter :wq and then press Enter.

To make the file an executable batch file, run the following command:

chmod +x update-website.sh
To open the local copy of the index.html file in a text editor, run the following command:

vi sysops-activity-files/static-website/index.html
To enter edit mode in the VI editor, press i and modify the file as follows:

Locate the first line that has the HTML code bgcolor="aquamarine" and change this code to bgcolor="gainsboro"

Locate the line that has the HTML code bgcolor="orange" and change this code to bgcolor="cornsilk"

Locate the second line that has the HTML code bgcolor="aquamarine" and change this code to bgcolor="gainsboro"

To write the changes and quit the file, press Esc, enter :wq and then press Enter.

To update the website, run your batch file.

./update-website.sh
Note: The command line output should show that the files were copied to Amazon S3.

To see the changes to the website, return to the browser and refresh the Café and Bakery page.

Congratulations, you just made your first revision to the website!

You now have a tool (the script that you created) that you can use to push changes from your website source files to Amazon S3.

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/81dfb25e-639b-4813-b3c6-b8ba9f00cb38" />


Optional challenge
Did you notice that your batch file uploads every file to Amazon S3 every time you run it even when most of the files have no changes to them?

Take a look at the following document: AWS CLI reference documentation for sync.

Make a small noticeable change to the index.html file. For example, modify one of the colors, and save the change.

Run the updated batch file.

To help make your script more efficient, you replace the aws s3 cp command that you've been using with the aws s3 sync command from this document. The following is an example of the aws s3 sync command that you run in the SSH terminal window. In this command, replace <my-bucket> with your bucket name.

aws s3 sync /home/ec2-user/sysops-activity-files/static-website/<s3://<my-bucket>/ --acl public-read 
Refresh the Café and Bakery site to see your changes.

How was the aws s3 sync command more efficient than the aws s3 cp command? Did the aws s3 sync command update just the index.html file or upload all the files like the aws s3 sync command?

Congratulations! You now have successfully done the following:

Ran AWS CLI commands that use IAM and Amazon S3 services

Deployed a static website to an S3 bucket

Created a script that uses the AWS CLI to copy files in a local directory to Amazon S3

Lab complete


B) Working with S3

Lab overview
In this lab, you create and configure an Amazon Simple Storage Service (Amazon S3) bucket to share images with an external user at a media company (mediacouser) who has been hired to provide pictures of the products that the café sells. You also configure the S3 bucket to automatically send an email notification to the administrator when the bucket contents are modified.

The following diagram shows the component architecture of the Amazon S3 file-sharing solution and illustrates its usage flow.

architectural diagram

An AWS Identity and Access Management (IAM) user named mediacouser, which represents an external user at a media company, has been pre-created with the appropriate Amazon S3 permissions to allow the user to add, change, or delete images from the bucket. The necessary Amazon S3 permissions are reviewed for each user to make sure that access to the bucket is secure and appropriate for each role.  

The following steps describe the usage flow in the diagram:

When new product pictures are available or when existing pictures must be updated, a representative from the media company signs in to the AWS Management Console as mediacouser to upload, change, or delete the bucket contents.

As an alternative, mediacouser can use the AWS Command Line Interface (AWS CLI) to change the contents of the S3 bucket.

When Amazon S3 detects a change in the contents of the bucket, it publishes an email notification to the s3NotificationTopic Amazon Simple Notification Service (Amazon SNS) topic.

The administrator who is subscribed to the s3NotificationTopic SNS topic receives an email message that contains the details of the changes to the contents of the bucket. 

Note: In real-world implementations, external users might not receive direct access to CLI Host as depicted in the diagram.

 

Objectives
By the end of this lab, you will be able to do the following:

Use the s3api and s3 AWS CLI commands to create and configure an S3 bucket.

Verify write permissions to a user on an S3 bucket.

Configure event notification on an S3 bucket.

 

Duration
This lab requires approximately 90 minutes to complete.

 

Accessing the AWS Management Console
At the top of these instructions, choose Start Lab to launch your lab.

A Start Lab panel opens displaying the lab status.

Wait until the message "Lab status: ready" appears, and then choose X to close the Start Lab panel.

At the top of these instructions, choose AWS to open the AWS Management Console on a new browser tab. The system automatically signs you in.

Tip If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Arrange the AWS Management Console so that it appears alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to follow the lab steps.

At the top of these instructions, choose Details, and then choose Show. 

From the Credentials panel, copy the values for the AccessKey and SecretKey, and paste them into a text editor. You use these values throughout the lab. After you have copied and pasted the values, choose X to close the Credentials panel.

 

Task 1: Connecting to the CLI Host EC2 instance and configuring the AWS CLI
In this task, you connect to the CLI Host EC2 instance by using EC2 Instance Connect and configure the AWS CLI so that you can run commands.

Task 1.1: Connecting to the CLI Host EC2 instance
In this task, you use EC2 Instance Connect to connect to the CLI Host EC2 instance. 

On the AWS Management Console, in the Search bar, enter and choose EC2 to open the EC2 Management Console.

In the navigation pane, choose Instances.

From the list of instances, select the CLI Host instance.

Choose Connect.

On the EC2 Instance Connect tab, choose Connect.

This option opens a new browser tab with the EC2 Instance Connect terminal window.

You use this terminal window to complete the tasks throughout the lab. If the terminal becomes unresponsive, refresh the browser or use the steps in this task to connect again.

 

Task 1.2: Configuring the AWS CLI on the CLI Host instance
To set up the AWS CLI profile with credentials, run the following command in the EC2 Instance Connect terminal:

aws configure
At the prompts, copy the following values that you pasted into your text editor, and paste them into the terminal window as directed.

AWS Access Key ID: Enter the value for AccessKey.

AWS Secret Access Key: Enter the value for SecretKey.

Default region name: Enter us-west-2.

Default output format: Enter json.

You are ready to run AWS CLI commands to interact with AWS services.

 

Task 2: Creating and initializing the S3 share bucket
In this task, you use the AWS CLI to create the S3 share bucket and upload a few images. 

To do so, you run the following commands in the EC2 Instance Connect terminal window.

To create an S3 bucket, run the following command. In the command, replace <cafe-xxxnnn> with your bucket name. Your bucket name must begin with cafe- and should include a combination of letters and numbers to make your bucket name unique:

aws s3 mb s3://<cafe-xxxnnn> --region 'us-west-2'
You should receive a message similar to the following: make_bucket: cafe-xxxx9999999

Note: Bucket names cannot contain uppercase letters. If you receive an error when you try to create your S3 bucket, make sure your bucket name doesn't include uppercase letters.

Next, you load some images into the S3 bucket under the /images prefix. Sample image files are provided in the initial-images folder on the CLI Host. 

To load images into the bucket, run the following command. In the command, replace <cafe-xxxnnn> with your bucket name:

aws s3 sync ~/initial-images/ s3://<cafe-xxxnnn>/images
The command output lists the image files that are being uploaded.

To verify that the files were synced to the S3 bucket, run the following command. In the command, replace <cafe-xxxnnn> with your bucket name:

aws s3 ls s3://<cafe-xxxnnn>/images/ --human-readable --summarize
You see the details of the image files that were uploaded, including the number of files uploaded and the total size of the files.

 

Task 3: Reviewing the IAM group and user permissions
Next, you review the permissions assigned to the mediaco IAM user group. This group was created to provide a way for the users of the media company to use the AWS Management Console or the AWS CLI to upload and modify images in the S3 share bucket. Creating the group makes it convenient to manage individual user permissions. You also review the permissions inherited by the mediacouser user that is part of the group.	

Task 3.1: Reviewing the mediaco IAM group
In this section, you review the permissions assigned to the mediaco group.

On the AWS Management Console, in the Search bar, enter and choose IAM to open the IAM Management Console.

In the navigation pane on the left, choose User groups.

From the User groups list, select mediaco.

The Summary page for the mediaco group is displayed.

Choose the Permissions tab.

Next to IAMUserChangePassword, choose + to expand the policy.

If needed, review the AWS managed policy that permits users to change their own password.

To collapse the policy, choose -.

Next to mediaCoPolicy, choose + to expand the policy.

Note: You might have to scroll down to see the policy. 

Notice the following statements in this policy:

The first statement, identified by the Sid key name AllowGroupToSeeBucketListInTheConsole, defines permissions that allow the user to use the Amazon S3 console to view the list of S3 buckets in the account.

The second statement, identified by the Sid key name AllowRootLevelListingOfTheBucket, defines permissions that allow the user to use the Amazon S3 console to view the list of first-level objects in the cafe bucket and other objects in the bucket.

The third statement, identified by the Sid key name AllowUserSpecificActionsOnlyInTheSpecificPrefix, defines permissions that specify the actions that the user can perform on the objects in the cafe-*/images/* folder. The main operations are GetObject, PutObject, and DeleteObject, which correspond to the read, write, and delete permissions that you want to grant to the mediacouser user. Two additional operations are included for eventual version-related actions.

To collapse the policy, choose -.

 

Task 3.2: Reviewing the mediacouser IAM user
In this section, you review the properties of the mediacouser user.

In the IAM console navigation pane, choose Users.

From the Users list, select mediacouser.

On the Permissions tab, you should see two policies: IAMUserChangePassword and mediaCoPolicy. These policies are assigned to the mediaco IAM group that you reviewed in the previous task.

To verify that you see the mediaco IAM group, choose the Groups tab. 

The mediacouser user is a member of this group and therefore inherits the permissions assigned to the mediaco group.

Choose the Security credentials tab.

In the Access keys section, choose Create access key, and choose the following options:

Choose Command Line Interface (CLI).

Select the check box for I understand the above recommendation and want to proceed to create an access key.

Choose Next.

Choose Create access key.

The following message displays: Access key created

Choose Download .csv file.

Choose Done.

On the mediacouser page, from the Security credentials tab, copy the Console sign-in link. 

You use this link in the next task.

Task 3.3: Testing the mediacouser permissions
In this task, you test the permissions that you have reviewed by signing in to AWS Management Console as mediacouser and performing the view, upload, and delete operations on the contents of the images folder in the S3 share bucket. These actions are the use cases that the external media company user is expected to perform on the bucket. In addition, you test the unauthorized use case, where the external user attempts to change the bucket permissions.

To sign in to the AWS Management Console as the mediacouser user, use one of the following options:

Important: Do not sign out of the session where you are signed in as the voclabs/user. Instead, choose one of two options:

Option 1: Use a different browser.

Option 2: Use the same browser type, but open a new incognito or private browser session. 

For either option that you choose, enter the Console sign-in link that you copied from the previous step into your new browser tab. The AWS Management Console sign-in page opens and already has the Account ID populated.

On the sign-in page, enter the following credentials: 

Enter the following credentials:

IAM user name: mediacouser.

Password: Training1!.

Choose Sign in.

On the new AWS Management Console page, in the Search bar, enter and choose S3 to open the S3 Management Console. 

From the list of buckets, select the bucket that you created earlier.

To display the list of images that were uploaded earlier, select images/.

To test the view use case, select Donuts.jpg, and choose Open.

A new browser tab should open that shows a picture of various donuts.

Tip: If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop-ups.

Close the browser tab that shows the Donuts.jpg image.

In the Console tab, in the breadcrumb trail at the top, choose images/ to see the contents of the images folder again.

To test the upload use case, choose Upload. 

On the Upload page, choose Add files, and choose any image or picture from your local computer.

Choose Upload.

To close the Upload: status page, choose Close.

Select the file that you uploaded, and choose Open.

A new browser tab should open that shows the file that you uploaded.

Close the browser tab that shows the file that you uploaded.

To test the delete use case, in the Console tab, in the image list, select the check box for Cup-of-Hot-Chocolate.jpg.

Choose Delete.

On the Delete objects page, in the Delete objects? box, enter delete.

Choose Delete objects. 

The object is deleted and no longer appears in the image list.

To close the Delete objects: status page, choose Close.

Next, you test the unauthorized use case where mediacouser attempts to change the bucket's permissions. 

In the breadcrumb trail at the top, choose your bucket to return to the bucket content list.

Choose the Permissions tab. 

This is where you can change a bucket's permissions. 

Notice that for Permissions overview, the following error message is displayed: "Insufficient permissions." mediacouser is prevented from changing the bucket permissions. You could also try to upload a file directly to the root of the bucket. This action should also fail.

Sign out of the Amazon S3 console as mediacouser.

You have successfully created an Amazon S3 bucket, and you have confirmed that it is securely configured for file sharing with another user.

 

Task 4: Configuring event notifications on the S3 share bucket
In this task, you configure the S3 share bucket to generate an event notification to an SNS topic whenever the contents of the bucket change. The SNS topic then sends an email message to its subscribed users with the notification message. Specifically, you perform the following steps:

Create the s3NotificationTopic SNS topic.

Grant Amazon S3 permission to publish to the topic.

Subscribe to the topic.

Add an event notification configuration to the S3 bucket.

Task 4.1: Creating and configuring the s3NotificationTopic SNS topic
Return to the AWS Management Console window where you are signed in as voclabs/user.

On the AWS Management Console, in the Search bar, enter SNS and choose Simple Notification Service to open the Simple Notification Service console.

If necessary, to open the navigation pane, choose the menu icon () on the left.

In the navigation pane, choose Topics.

Choose Create topic.

Choose Standard.

For Name, enter s3NotificationTopic.

Choose Create topic.

A message is displayed indicating that the s3NotificationTopic SNS topic has been successfully created.

From the s3NotificationTopic page in the Details section, copy and paste the ARN value to a text editor. You need this value later in this lab.

To configure the topic's access policy, choose Edit.

Expand the Access policy - optional section.

Replace the contents of the JSON editor with the following policy. In the JSON object, replace <ARN of s3NotificationTopic> with the ARM value that you copied earlier, and replace <cafe-xxxnnn> with your S3 bucket name. Remember to remove the enclosing angle brackets (< >). 

{
  "Version": "2008-10-17",
  "Id": "S3PublishPolicy",
  "Statement": [
    {
      "Sid": "AllowPublishFromS3",
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "SNS:Publish",
      "Resource": "<ARN of s3NotificationTopic>",
      "Condition": {
        "ArnLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:<cafe-xxxnnn>"
        }
      }
    }
  ]
}
Take a moment to review the intent of this policy. It grants the cafe S3 share bucket permission to publish messages to the s3NotificationTopic SNS topic.

Choose Save changes.

Next, you subscribe to the topic to receive the event notifications from the S3 share bucket. 

In the s3NotificationTopic pane, choose the Subscriptions tab.

Choose Create subscription.

Choose the Topic ARN box, and choose the s3NotificationTopic SNS topic that appears as an option.

From the Protocol dropdown list, choose Email.

In the Endpoint box, enter an email address that you can access.

Choose Create subscription. 

A message displays that confirms that the subscription was created successfully.

Check the inbox for the email address that you provided. You should see an email message with the subject AWS Notification - Subscription Confirmation.

Open the email message, and choose Confirm subscription. A new browser tab opens and displays a page with the message Subscription confirmed!

 

Task 4.2: Adding an event notification configuration to the S3 bucket
In this task, you create an event notification configuration file that identifies the events that Amazon S3 will publish and the topic destination where Amazon S3 will send the event notifications. You then use the s3api CLI commands to associate this configuration file with the S3 share bucket.

In the terminal window for the CLI Host instance, enter the following command to edit a new file named s3EventNotification.json:

vi s3EventNotification.json
In the editor, to change to insert mode, press i.

In the following JSON object, replace <ARN of s3NotificationTopic> with the ARN value that you recorded earlier. Remember to remove the enclosing angle brackets (< >). Copy and paste your customized JSON configuration into the editor window. 

  {
    "TopicConfigurations": [
      {
        "TopicArn": "<ARN of s3NotificationTopic>",
        "Events": ["s3:ObjectCreated:*","s3:ObjectRemoved:*"],
        "Filter": {
          "Key": {
            "FilterRules": [
              {
                "Name": "prefix",
                "Value": "images/"
              }
            ]
          }
        }
      }
    ]
  }
Take a moment to review the intent of this configuration. It requests that Amazon S3 publish an event notification to the s3NotificationTopic SNS topic whenever an ObjectCreated or ObjectRemoved event is performed on objects inside an Amazon S3 resource with a prefix of images/.

Press ESC to exit insert mode.

To save the file and exit the editor, enter :wq and press Enter.

To associate the event configuration file with the S3 share bucket, run the following command. In the command, replace <cafe-xxxnnn> with your S3 bucket name:

aws s3api put-bucket-notification-configuration --bucket <cafe-xxxnnn> --notification-configuration file://s3EventNotification.json
Wait a few moments, and then check the inbox for the email address that you used to subscribe to the topic. You should see an email message with the subject Amazon S3 Notification.

Open the email message, and examine the notification message. It should be similar to the following:

{"Service":"Amazon S3","Event":"s3:TestEvent","Time":"2019-04-26T06:04:27.405Z","Bucket":"","RequestId":"7A87C25E0323B2F4","HostId":"fB3Z...SD////PWubF3E7RYtVupg="}

Notice that the value of the "Event" key is "s3:TestEvent". Amazon S3 sent this notification as a test of the event notifications configuration that you set up.

 

Task 5: Testing the S3 share bucket event notifications
In this task, you test the configuration of the S3 share bucket event notification by performing the use cases that mediacouser expects to perform on the bucket. These actions include putting objects into and deleting objects from the bucket, which send email notifications. You also test an unauthorized operation to verify that it is rejected. You use the AWS s3api CLI command to perform these operations on the S3 share bucket.

To configure the CLI Host's AWS CLI client software to use the mediacouser credentials, in the SSH window for the CLI Host instance, enter the following command:

aws configure
At the prompts, enter the following:

AWS Access Key ID: Copy and paste the value of the Access key ID of mediacouser, which is in the mediacouser_accessKeys.csv file that you downloaded in Task 3.

AWS Secret Access Key: Copy and paste the value of the Secret Access Key of mediacouser from the same file that you downloaded in Task 3.

Default region name: Press Enter at the prompt to keep the same Region that you selected earlier in this lab.

Default output format: Enter json.

Next, you test the put use case by uploading the Caramel-Delight.jpg image file from the new-images folder on the CLI Host. 

To upload this file, run the following command. In the command, replace <cafe-xxxnnn> with your S3 bucket name:

aws s3api put-object --bucket <cafe-xxxnnn> --key images/Caramel-Delight.jpg --body ~/new-images/Caramel-Delight.jpg
After the command completes, it returns the ETag (Entity tag) of the uploaded object.

Check the inbox for the email address that you used to subscribe to the s3NotificationTopic SNS topic. You should see a new email message with the subject Amazon S3 Notification.

Open the email message, and examine the notification message. Notice the following information:

The value of the eventName key is ObjectCreated:Put.

The value of the key object is images/Caramel-Delight.jpg, which is the image file key that you specified in the command.

This notification indicates that a new object with a key of images/Caramel-Delight.jpg was added (put) into the S3 share bucket.

Next, you test the get use case by getting the object with a key of images/Donuts.jpg from the bucket. 

To get this object, run the following command. In the command, replace <cafe-xxxnnn> with your S3 bucket name:

aws s3api get-object --bucket <cafe-xxxnnn> --key images/Donuts.jpg Donuts.jpg
Notice that an email notification was not generated for this operation. This operation does not generate an email notification because the share bucket is configured to send notifications only when objects are created or deleted.

Next, you test the delete use case by deleting the object with a key of images/Strawberry-Tarts.jpg from the bucket. 

To delete this object, run the following command. In the command, replace <cafe-xxxnnn> with your S3 bucket name:

aws s3api delete-object --bucket <cafe-xxxnnn> --key images/Strawberry-Tarts.jpg
Check the inbox for the email address that you used to subscribe to the s3NotificationTopic SNS topic. You should see a new email message with the subject Amazon S3 Notification.

Open the email message, and examine the notification message. Notice the following information:

The value of the eventName key is ObjectRemoved:Delete.

The value of the object key is images/Strawberry-Tarts.jpg, which is the image file key that you specified in the command.

This notification indicates that the object with a key of images/Strawberry-Tarts.jpg was deleted from the S3 share bucket.

Finally, you test an unauthorized use case. 

To try to change the permission of the Donuts.jpg object so that it can be read publicly, run the following command. In the command, replace <cafe-xxxnnn> with your S3 bucket name:

aws s3api put-object-acl --bucket <cafe-xxxnnn> --key images/Donuts.jpg --acl public-read
The command fails and displays the following error message as expected: "An error occurred (AccessDenied) when calling the PutObjectAcl operation: Access Denied"

Conclusion
Congratulations! You now have successfully done the following:

Used the s3api and s3 AWS CLI commands to create and configure an S3 bucket

Verified write permissions to a user on an S3 bucket

Configured event notification on an S3 bucket

Lab complete

