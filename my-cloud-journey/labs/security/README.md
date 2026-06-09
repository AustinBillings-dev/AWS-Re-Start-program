# Security Labs

Using Amazon Inspector for vulnerability assesment and remediation
 

Lab overview
In this lab, you utilize Amazon Inspector to scan for vulnerabilities in your AWS resources, specifically AWS Lambda functions. You learn how to activate Amazon Inspector, interpret the vulnerability reports, and remediate the findings.

The developers at AnyCompany are in the initial phases of building an application primarily using AWS Lambda. Throughout the development process, they need an automated security tool that not only scans for vulnerable software packages, but also scans within the code itself. You decide to utilize Amazon Inspector to fill this need.

Amazon Inspector meets the requirements of being able to scan AWS Lambda functions by quickly responding to new deployments. It also automatically scans additional resources such as EC2 instances, Amazon ECRs within AnyCompany’s AWS account.

Objectives
After completing this lab, you should be able to:

Activate Amazon Inspector.

Analyze and interpret vulnerability findings.

Remediate the vulnerabilities found by Amazon Inspector.

Duration
This lab requires approximately 30 minutes to complete.

Lab environment
The environment has Lambda functions with vulnerabilities which will be subsequently scanned by Amazon inspector and reported as per severity.

## Labs

Task 1: Activate the Amazon Inspector
In this task, you activate and run the Amazon inspector service to continuously scan the Lambda functions.

In the AWS Management Console, in the search bar at the top, type and choose Inspector.

Open the panel on the left and choose Activate Inspector to activate it for your account.

Under Activate Inspector choose Activate Inspector button.

Note: This is only needed for the first time.
After activation, you see a message at the top Welcome to Inspector. Your first scan is underway.

If you are prompted to respond to a survey titled Feedback for Amazon Inspector, choose cancel.

Close all the banner messages on top of the page.

Refresh the page periodically until you see the Dashboard > Summary > Environment coverage> Lambda functions at 100%

The dashboard shows your account number and activation status for AWS Lambda. By default, scanning is activated for Amazon EC2, Amazon ECR, and AWS Lambda standard scanning. 

 

Task 2: Reviewing the inspected resources
In this task, while you wait for the scan to finish, you review the current lab environment (the EC2 instance and the Lambda functions) to understand what specific resources are being scanned by Amazon Inspector.

Task 2.1: Reviewing your Lambda functions
From the Findings on the left, choose All findings.

Three rows are displayed, one for each vulnerability within Lambda function. You should see the following key details:

Severity:Medium

Impacted resource shows you the affected Lambda function.

Title shows the reason for the finding. 

Choose the Radio button for Choose the finding CVE-2023-32681 - requests. This opens a pane containing the vulnerability information. 

Within the information pane, under the Vulnerability details section choose the external link next to the Vulnerability ID.

The link opens a new browser tab to the vulnerability detail webpage from the National Vulnerability Database (NVD), which is a repository of standardized vulnerability management data maintained by the National Institute of Standards and Technology (NIST). This page offers more detailed information about the vulnerability.

Within the information pane, find the the Remediation section.

The issue is that the requests package is vulnerable and outdated, and the recommendation is to upgrade the package. Next, you apply the remediation to your Lambda function.

Task 3: Remediating the vulnerabilities findings
In this task, you analyze the findings reported by Amazon Inspector and interpret the vulnerability details. You update your Lambda functions to remediate the vulnerabilities. After updating the functions, you review the Amazon Inspector findings to confirm the vulnerability has been fixed.

Task 3.1: Remediating your Lambda function’s Package Vulnerabilities
On the AWS Management Console, in the search box, search for and choose Lambda

From the list of Lambda functions, choose the get-request function.

Within the Lambda function code editor’s file browser, choose requirements.txt.

Remove the version number and equal signs from requests==2.20.0 so that the line becomes only requests.

The requirements.txt file tells AWS Lambda which Python packages are required to run your function. When no version number is specified, the latest version of the package will be installed by default. This ensures that your Lambda funtion uses the latest version of the package.

Choose the Deploy button to deploy the function.

A banner is displayed with the message Successfully updated the function get-request.

This latest deployment of your Lambda function will trigger Amazon Inspector to initiate a new scan of the function.

On the AWS Management Console, in the search box, search for and choose Amazon Inspector.

In the navigation pane at the left of the page, under Findings, choose All findings.

 Note: If the navigation pane is collapsed, choose the menu icon.

In the findings dashboard, under finding status, change the selection from Active to Closed.

In the list of closed findings, you see CVE-2023-32681 - requests. This confirms the successful remediation of the vulnerability.

Note: It may take a few minutes for the scan to initiate and finish. You can choose the refresh button to view the latest status of your scanned resources.

In the navigation pane at the left of the page, under Resources coverage, choose Lambda functions.

If needed, expand the width of the Last scanned column to display the full timestamp.

You see that the most recently scanned Lambda function has an updated timestamp.

Conclusion
 Congratulations! You now have successfully:

Activated and configured Amazon Inspector

Analyzed and interpreted vulnerability findings

Remediated the vulnerabilities found by Amazon Inspector

Lab complete

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/c3e8c0ab-4609-451c-9b4f-7bbf97d6f7d2" />


<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/f1ff481a-165f-4f83-bb18-596450429797" />


