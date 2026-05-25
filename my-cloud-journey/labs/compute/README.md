<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/536db07e-945d-4ae2-9882-6022519e9608" /># Linux lab challenge 

Task 1: Use SSH to connect to an Amazon Linux EC2 instance
In this task, you will connect to a Amazon Linux EC2 instance. You will use an SSH utility to perform all of these operations. The following instructions vary slightly depending on whether you are using Windows or Mac/Linux.

 Windows Users: Using SSH to Connect
 These instructions are specifically for Windows users. If you are using macOS or Linux, skip to the next section.

Select the Details drop-down menu above these instructions you are currently reading, and then select Show. A Credentials window will be presented.

Select the Download PPK button and save the labsuser.ppk file.
Typically your browser will save it to the Downloads directory.

Make a note of the PublicIP address.

Then exit the Details panel by selecting the X.

Download  PuTTY to SSH into the Amazon EC2 instance. If you do not have PuTTY installed on your computer, download it here.

Open putty.exe
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3f890e3b-b16b-41ae-a0a4-dbff70af6492" />

Challenge
Write a Bash script based on the following requirements:

Creates 25 empty (0 KB) files. (Hint: Use the touch command.)
The file names should be <yourName><number>, <yourName><number+1>, <yourName><number+2>, and so on.
Design the script so that each time you run it, it creates the next batch of 25 files with increasing numbers starting with the last or maximum number that already exists.
Do not hard code these numbers. You need to generate them by using automation.
Test the script. Display a long list of the directory and its contents to validate that the script created the expected files.
step 1
i started by creating a file name austin001 to create script
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/17237efe-e833-42d3-bd43-225ed03bd3d6" />
step 2 i opened file in vi text editor and inserted script 
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ca1c3519-a258-446f-9712-48634923fdc0" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/cf377b41-9eef-4753-b558-6e1d6ada36fb" />
step 3
make the script executable and run
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/897e2a75-08c4-49f9-8076-b4ccb9f71726" />





## Labs
_Add lab entries here as you complete them._
