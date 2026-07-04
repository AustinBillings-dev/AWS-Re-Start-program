Create an AI Smart Assistant
Description
The HR department is struggling to respond to over 500 daily employee requests for information. The majority of the requests are about policies, benefits, and procedures. Also, the requests can currently be handled only during business hours and are limited in the number of simultaneous replies. This needs immediate intervention.
Technical Annotations
Create Amazon Bedrock knowledge bases from HR handbooks.
Create an Amazon Bedrock agent to answer HR questions.
Create an Amazon Bedrock action group to submit vacation requests.

Solution Request
Use Amazon Bedrock to create a knowledge base and an agent. Attach the knowledge base to the agent and then add an action group. Test the agent to answer questions, pulled from the knowledge base, and perform actions through the 

S3 employee info
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/518d1688-2acd-4238-81c8-89aafee2d921" />

opensearch collection
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a001863e-2bb2-4ed1-9a80-8a4a5fae210e" />

create knowledged base using bedrock
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4017d9ef-75b9-4429-9e6c-34dec9288e5d" />

create agent with bedrock
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a2638d94-06e2-4855-9278-0cccbdfda5a6" />

add action group with lambda function and parameters for user input
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ba6c6d96-d75f-438a-9ba8-3c5bf24eb6ae" />

submit leave lamda code
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/fdcaba94-f761-42fd-a2c8-836500a6860d" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/60e56584-bd8d-415d-8d5c-4ded87ff47d1" />

review returned items in DynamoDB

DIY Goals
Create a new Amazon Bedrock agent to answer questions about benefits.
Attach the existing knowledge base to a new agent.
Create a new action group and attach the submit_benefits Lambda function.
Test the new agent to submit a claim expense.
Solution Validation Method
Our validation service will verify that the new Amazon Bedrock knowledge base exists and is attached to the new agent.

**Hints**
- You can reuse the same IAM roles and the same instructions for the agent used in the Practice section.
- Add the parameters member_id, policy_number, claim_type and claim_amount to the new action group.
- Verify the DynamoDB BenefitsTable to confirm that the claim has been submitted.

  
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/67bb252e-2b3c-45a9-b64a-437157dc3a53" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/996b65d2-8ba0-4bbd-9141-6620742e1422" />




