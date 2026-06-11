# Simulearn 3

## Topics Covered

Solution Request

Implement IAM groups with least-privilege permissions to control support engineers' access to AWS resources.


## Key Takeaways

This solution demonstrates AWS Identity and Access Management (IAM) user group creation to manage permissions for multiple users within an organization.

An IAM user group named SupportEngineers serves as a container for IAM users, enabling centralized permission management through group inheritance.

A read-only access policy for Amazon EC2 is attached to the SupportEngineers group, limiting group members to read-only operations such as viewing instance information.

A new IAM user, support-engineer-1, is created and added to the SupportEngineers group, automatically receiving the group's read-only EC2 permissions.

The user successfully retrieves EC2 instance information through read operations.

Instance termination attempts result in permission errors, as the policy restricts actions to read-only operations.

Following AWS's default deny principle, the SupportEngineers group lacks Amazon RDS read access without explicit permissions.

Adding an RDS read-only policy to the group allows SupportEngineers to view Amazon RDS information.

## Resources

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a9cf9417-1bfe-42f8-80bb-f81ba89e58fa" />

DIY Goals
Grant the "SupportEngineers" group read-only access to Amazon RDS.

 <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2fc121cc-824f-41cf-a448-032e88298ce2" />

