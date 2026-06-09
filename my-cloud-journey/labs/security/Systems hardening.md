Systems Hardening with Patch Manager via AWS Systems Manager
 

Lab overview
In organizations with hundreds and often thousands of workstations, it can be logistically challenging to keep all the operating system (OS) and application software up to date. In most cases, OS updates on workstations can be automatically applied via the network. However, administrators must have a clear security policy and baseline plan to ensure that all workstations are running a certain minimum version of software.

In this lab, you use Patch Manager, a capability of AWS Systems Manager, to create a patch baseline. You then use the patch baseline that you created to scan the Amazon Elastic Compute Cloud (Amazon EC2) instances for Windows that were pre-created for this lab. You also use default patch baseline to patch EC2 Linux instances.

 

Objectives
After completing this lab, you should be able to:

Patch Linux instances using default baseline

Create custom patch baseline 

Lab environment
The current environment has six EC2 instances: three instances with the Linux OS and three with the Windows OS.

All backend components, such as EC2 instances, AWS Identity and Access Management (IAM) roles, and some AWS services, have been built into your lab already.

Task 1: Patch Linux instances using default baselines
In this task, you patch Linux EC2 instances using default baselines available for the OS.

Patch Manager provides predefined patch baselines for each of the operating systems that it supports. You can use these baselines as they are currently configured (you can't customize them), or you can create your own custom patch baselines. You can use custom patch baselines for greater control over which patches are approved or rejected for your environment.

In the AWS Management Console, in the search  box, enter Systems Manager and select it. This option takes you to the Systems Manager console page.

In the left navigation pane, under Node Management, choose Fleet Manager.
Here are the pre-configured EC2 instances. There are three Linux instances and three Windows instances. These EC2 instances have a specific IAM role associated with them that allows you you managed them using Systems Manager, which is why you can view them in the Fleet Manager section. This is also part of the lab setup.

Select the check box next to Linux-1. Then choose the Node actions  dropdown list, and choose View details.
Here you can view details about the specific instance, such as Platform type, Node type, OS name, and the IAM role that allows you to use Systems Manager to manage this instance.

At the top of the page, choose AWS Systems Manager to go back to the Systems Manager homepage.

In the left navigation pane, under Node Management, choose Patch Manager.

Choose Start with an overview (Proceed to next step if this option does not appear).

Choose Patch now to patch the Linux instances with AWS-AmazonLinux2DefaultPatchBaseline.

Under Basic configuration, configure as follows:

Patching operation:  Scan and install

Reboot option: Reboot if needed

Instances to patch: Patch only the target instances I specify

Target selection: Specify instance tags

Tag key:  Patch Group

Tag value: LinuxProd

Choose Add

Choose Patch now

Observe the status of the patching.

 A new page displays. In the AWS-PatchNowAssociation panel, there is a Status field that will show that three instances will be affected and the progress made.

 A Scan/Install operation summary panel also displays the status of the affected EC2 instances visually. Monitor this page until the patch operation on all three instances completes.
 
 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/59967673-540a-42e2-bec2-fca98f6b034d" />
 

Task 2: Create a custom patch baseline for Windows instances
In this task, you create a custom patch baseline for the Windows instances. Although Windows has default patch baselines that you can use, for this use case, you set up a baseline for Windows security updates.

Return to the Systems Manager console. In the search bar at the top, enter Systems Manager and then select it.

In the left navigation pane, under Node Management, choose Patch Manager. 

Choose Start with an overview (Proceed to next step if this option does not appear).

Choose the Patch baselines tab.

Choose the Create patch baseline button. 

For Patch baseline details, configure the following options:

For Name, enter WindowsServerSecurityUpdates

For Description - optional, enter Windows security baseline patch

For Operating system, choose Windows.

Leave the check box for Default patch baseline unselected.

In the Approval rules for operating systems section, configure the following options:

Products: From the dropdown list, choose WindowsServer2019. Also, deselect All so that it no longer appears under Products.

Severity: This option indicates the severity value of the patches that the rule applies to. To ensure that all service packs are included by the rule, choose Critical from the dropdown list.

Classification: From the dropdown list, choose SecurityUpdates.

Auto-approval: Enter 3 days.

Compliance reporting - optional: From the dropdown list, choose Critical.

Choose Add rule to add a second rule to this patch baseline, and configure the following options:

Products: From the dropdown list, choose WindowsServer2019. Also, deselect All so that it no longer appears under Products.

Severity: From the dropdown list, choose Important.

Classification: From the dropdown list, choose SecurityUpdates.

Auto-approval: Enter 3 days.

Compliance reporting - optional: From the dropdown list, choose High.

Choose Create patch baseline.

Next, modify a patch group for the Windows patch baseline that you just created, to associate it with a patch group.

In the Patch baselines section, select the button for the WindowsServerSecurityUpdates patch baseline that you just created.
Note: The patch baseline that you created may be on the second page of the baselines list. You could also use the search bar to locate it and then select it.

Choose the Actions dropdown list, and then choose Modify patch groups.

In the Modify patch groups section under Patch groups, enter WindowsProd 

Choose the Add button, and then choose Close. 

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/37b9318d-81a7-4872-8c4c-d30350855788" />


Task 3: Patching the Windows instances
In this task, you patch the Windows instances using the Patch now feature based on the tag associated with them.

After configuration, Patch Manager uses the Run Command to call the RunPatchBaseline document to evaluate which patches should be installed on target instances according to each instance's operating system type directly or during the defined schedule (maintenance window).

Task 3.1: Tagging Windows instances
In this task, you tag your Windows instances. Later in the lab, you create a patch group and associate it with these tags. 

 The Linux instances were pre-configured during lab setup with LinuxProd tags and do not need any added tags.

In the AWS Management Console, in the search  bar, enter EC2 and select it.

Choose Instances, select the check box next to the Windows-1 instance, and then choose the Tags tab.

Choose the Manage tags button, choose Add new tag, and configure the following options:

Key: Enter Patch Group

Value: Enter WindowsProd

Choose Save.

Repeat the previous steps to tag the Windows-2 and Windows-3 instances with the same tag.

Task 3.2: Patching Windows instances
Return to the Systems Manager console. In the search bar at the top, enter Systems Manager and then select it.

To Patch the Windows instances:

Choose Patch Manager 

Choose Start with an overview (Proceed to next step if this option does not appear).

Choose Patch now.

Patching operation:  Scan and install

Reboot option: Reboot if needed

Instances to patch: Patch only the target instances I specify

Target selection: Specify instance tags

Tag key:  Patch Group

Tag value: WindowsProd

Choose Add

Choose Patch now

A new page displays. When it becomes available, choose the link to the Execution ID.

A page in the State Manager part of Systems Manager opens.

Choose the Output link for one of the managed instances that shows a status of InProgress.

A page in the Run Command part of Systems Manager opens.

Expand the Output panel to observe the details.

 Behind the scenes, Patch Manager uses the Run Command to run the PatchBaselineOperations.  If you scroll through the output, you should see the PatchGroup: WindowsProd details.

A Systems Manager document (SSM document) defines the actions that Systems Manager performs on your managed instances.

 

Task 4: Verifying compliance
In the left navigation pane, under Node Management, choose Patch Manager.

Choose the Dashboard tab. Under Compliance summary, you should now see Compliant: 6, which verifies that all Windows and Linux instances are compliant.

Choose the Compliance reporting tab. 
 This tab provides an overview of all running instances with SSM. You should be able to verify that the Compliance status of all Linux and Windows instances is Compliant.

All six instance (three Linux and three Windows) should show as compliant.

Scroll to the right in the Node patching details panel to find for each instance:

Critical noncompliant count

Security noncompliant count

Other noncompliant count

Last operation date 

Baseline ID 

Choose the Node ID for one of the Windows nodes.

In the Node ID page that opens, choose the Patch tab.

Scroll down and observe what patches were applied to this instance, as well as the Installed Time.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/06ce526a-e21d-4111-8a14-4e67d3d7ae86" />


Conclusion
Congratulations! You now have successfully:

Patched Linux instances using default baseline.

Created custom patch baseline.

Used patch groups to to patch Windows instances using custom patch baseline.

Verified patch compliance.

Lab complete
Use patch groups to to patch Windows instances using custom patch baseline 

Verify patch compliance
