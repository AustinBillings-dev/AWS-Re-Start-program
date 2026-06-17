# Python Labs

Scripts, automation, and projects written in Python. Includes practice problems, API work, and infrastructure scripting.

## Labs
Creating a Hello, World Program
Lab overview
Welcome to Introduction to Programming. For the labs, you will use the Python programming language.

In this lab, you will write your first Python program

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
In the VS Code IDE, choose File > New File.

This action creates a new untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, hello-world.py) and save it under the /home/ec2-user/environment directory.

Note: The .py is the extension for Python files.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Introducing Python
Python is a high-level, general-purpose programming language. Programming languages are used to write instructions for computers. High-level means that Python commands are written with a combination of English words and special symbols. General-purpose means that Python is used by many people for different types of applications, such as desktop applications and websites.

Python has two major releases in use today, which are known as Python version 2.x and Python version 3.x. For Introduction to Programming, you will use Python version 3.x. Backward compatibility means that legacy code continues to work in new versions of the language. Generally, Python remains backward compatible within minor version releases. However, the major versions have syntax incompatibilities between them, such as between Python version 2.x and Python version 3.x.

The python.org website has installers and general documentation for Python.

Most systems will have one or more versions of Python installed.

To confirm the default version of Python that is installed in your lab, in the open terminal tab, enter:

python --version
To check other available versions of Python, enter the following commands:

python2 --version
python3 --version
You might see results similar to the following examples:

~ $ python --version                                                                      Python 3.11                                                                                    
~ $ python2 --version                                                                     python2: command not found                                                                                    
~ $ python3 --version                                                                     Python 3.11 
                                                    

Exercise 2: Writing your first Python program
When someone learns how to program, it is traditional to start with the Hello, World program. This simple program verifies that you have installed the Python tools correctly.

From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.  

In the file, enter the following code:

print("Hello, World")
To save your file, choose File > Save.

In the terminal, run the file with python3 filename.py (replace filename.py with the name of your file).

In the terminal output, confirm that the program prints the words Hello World.

Congratulations! You have written your first Python program.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 2 - Numeric Data Types

Working with Numeric Data Types
Lab overview
Python makes it easier to do math. In fact, Python is a popular language among data scientists, who must analyze large amounts of data. In this lab, you will explore the basic data types that are used to store numeric values.

In this lab, you will:

Use the Python shell

Use the int data type

Use the float data type

Use the complex data type

Use the bool data type

Estimated completion time
60 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, numeric-data.py) and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Using the Python shell
In the terminal tab, a Python shell can be started by entering the following command:

python3
The Python shell should look similar to the following example.

Python 3.11 (default, Aug 31 2020, 18:56:18)
[GCC 11.4.1 20230605 (Red Hat 11.4.1-2)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>                                                
The three greater-than symbols (>>>) represent the prompt where the user can enter Python commands. In the following activities, you will practice using the Python shell by issuing some numeric commands.

Adding
Enter the following input:

2 + 2
Press ENTER.

Confirm that you get 4 as output.

 

Subtracting
Enter the following input

4 - 2
Press ENTER.

Confirm that you get 2 as output.

 

Multiplying
To multiply, you use the * symbol:

Enter the following input:

2 + 2
Press ENTER.

Confirm that you get 4 as output.

 

Dividing
To divide, use the / symbol:

Enter the following input:

4 / 2
Press ENTER.

Confirm that you get 2.0 as output.

 

Exiting the Python shell
To exit the Python shell, enter the following command:

quit()
Exercise 2: Introducing the int data type
To learn more about data types, you will use some built-in functions. A function is a piece of reusable code with a name. You use a function by:

Calling by its name

Including a list of one or more inputs called arguments, which are enclosed in parentheses

Python has several built-in functions that you can use to help you write more useful programs.

A collection of functions is called a library. Python’s collection of built-in functions is called the Python Standard Library.

Editing a Python file
Instead of entering commands one by one in the Python shell, you will edit a text file that contains a sequence of commands:

From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.  

In the file, enter the following code:

print("Python has three numeric types: int, float, and complex")
To save the file, choose File > Save.

In the terminal, run the file with python3 filename.py.

In the bottom (console) pane of the IDE, confirm that the program prints the message: Python has three numeric types: int, float, and complex

Note: You might need to scroll up to see the console output.

In the terminal tab, you can also run the program by entering the following command, where <lab-python-file-name> is the name of the file that you created for this lab:

python3 <lab-python-file-name>.py
Confirm that the text you wrote is written to standard output.

~ $ python3 <lab-python-file-name>.py                          
Python has three numeric types: int, float, and complex      
Creating a variable
A variable is like a labeled box that stores information. You can change the contents of the box, but the label stays the same. In this activity, you will use the variable name myValue, but will store different data types in that labeled box.

Return to the Python file and on a new line, enter the following code:

myValue=1
Use the print() function to write the value of the variable to the shell. In the context of programming, writing means to add information to the shell.

print(myValue)
To get the data type of the variable, use the type() built-in function:

print(type(myValue))
To combine numbers and text, use the str() built-in function, which converts an argument into a collection of letters called a string. In this instance, you are converting the int (integer) data type into the string data type:

print(str(myValue) + " is of the data type " + str(type(myValue)))
Save the file.

To run the file, enter python3 filename.py in the terminal.

In the terminal output, confirm that you have the following output:

Python has three numeric types: int, float, and complex              
1                                                            
<class 'int'>                                                
1 is of the data type <class 'int'>                              
~ $
Note: You might need to scroll up to see the output.                                                        

Exercise 3: Introducing the float data type
The int data type only stores whole numbers. If you want to store a number with a decimal, like 3.14, you need a new data type called a float.

Return to the Python file and on a new line, enter the following code:

myValue=3.14
To write the value of the variable to the shell, use the print() function:

print(myValue)
Get the data type of the variable by using the type() built-in function:

print(type(myValue))
To combine numbers and text, use the str() built-in function:

print(str(myValue) + " is of the data type " + str(type(myValue)))
Save the file.

To run the file, enter python3 filename.py in the terminal.

In the terminal output, confirm that you see the following output:

Python has three numeric types: int, float, and complex              
1                                                            
<class 'int'>                                                
1 is of the data type <class 'int'>                              
3.14                                                         
<class 'float'>                                              
3.14 is of the data type <class 'float'>                         
~ $ 
Note: Recall that you might need to scroll up to see the output.

Exercise 4: Introducing the complex data type
In advanced math, an imaginary number is a complex number that can be written as a real number that is multiplied by the imaginary unit i. This complex data type is complicated because it must represent a letter and a number, such as 5j.

Return to the Python file and enter the following code:

myValue=5j
Write the value of the variable with the print() function:

print(myValue)
Get the data type of the variable with the type() function:

print(type(myValue))
To combine numbers and text, use the str() built-in function:

print(str(myValue) + " is of the data type " + str(type(myValue)))
Save the file.

To run the file, enter python3 filename.py in the terminal.

In the terminal output, confirm that you have the following output:

Python has three numeric types: int, float, and complex              
1                                                            
<class 'int'>                                                
1 is of the data type <class 'int'>                              
3.14                                                         
<class 'float'>                                              
3.14 is of the data type <class 'float'>                         
5j                                                           
<class 'complex'>                                            
5j is of the data type <class 'complex'>                         
~ $ 
Note: Recall that you might need to scroll up to see the output.                                                           

Exercise 5: Introducing the bool data type
The bool (Boolean) data type comprises the permanent names True and False, which are represented by the numerals 1 and 0, where 1 = True and 0 = False. The bool data type is implemented as a subset of int and is not considered a real data type. However, in some programming languages, it is implemented as a different data type. These exercises call the Python bool a fake data type.

Return to your text file, and enter the following code:

myValue=True
Write the value of the variable to the shell by using the print() function:

print(myValue)
Get the data type of the variable by using the type() built-in function:

print(type(myValue))
To combine numbers and text, use the str() built-in function:

print(str(myValue) + " is of the data type " + str(type(myValue)))
Save the file.

In the terminal, run the file with python3 filename.py.

In the terminal output, confirm that it displays the correct output.

Return to your .py file and enter the following code:

myValue=False
Use the print() function to write the value of the variable to the shell:

print(myValue)
To get the data type of the variable, use the type() built-in function:

print(type(myValue))
To combine numbers and text, use the str() built-in function:

print(str(myValue) + " is of the data type " + str(type(myValue)))
Save the file.

In the terminal, run the file with python3 filename.py.

In the terminal output, confirm that you have the following output:

Python has three numeric types: int, float, and complex              
1                                                            
<class 'int'>                                                
1 is of the data type <class 'int'>                              
3.14                                                         
<class 'float'>                                              
3.14 is of the data type <class 'float'>                         
5j                                                           
<class 'complex'>                                            
5j is of the data type <class 'complex'>                         
True                                                         
<class 'bool'>                                               
True is of the data type <class 'bool'>
False                                                         
<class 'bool'>                                               
False is of the data type <class 'bool'>                           
~ $
Congratulations! You have learned about Python’s three numeric data types: int, float, and complex. Additionally, you were introduced to the Python fake data type that is called bool. Note that bool is actually the numerals 0 and 1, which represent the values of True and False.___

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 3 - String Data Types

Working with the String Data Type
Lab overview
In Python, a collection of letters and symbols is called a string. Strings are used often in Python for input and output.

In this lab, you will:

Write Python code that uses the string data type

Concatenate strings

Use the string to get input

Format strings for output

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File. 

This action creates an untitled file.

Choose File > Save As..., provide a suitable name for the exercise file (for example, string-data-type.py) and save it under the  /home/ec2-user/environment directory.

Note: Recall that .py is the extension for Python files.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Introducing the string data type
A text file containing a logical sequence of commands is a script.

From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section.

In the file, enter the following code:

myString = "This is a string."
print(myString)
Save the file.

In the terminal, run the file with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

This is a string.
Extend the Python script by using the built-in function type() to get the data type of the variable. Enter the following code:

print(type(myString))
To convert the return value of type into a string, use the str() built-in function:

print(myString + " is of the data type " + str(type(myString)))
Save the file.

In the terminal, run the file with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

This is a string.
<class 'str'>
This is a string. is of the data type <class 'str'>
Exercise 2: Working with string concatenation
String concatenation is the process of combining two strings into one string. You have actually been doing string concatenation since lab 1, but you didn’t call this process by that term. The plus sign (+) is used to concatenate strings. When the plus sign (+) is used with strings, it behaves differently than when you use it for numbers. In lab 1, you used the plus sign (+) to add numbers. Now, you will use the plus sign (+) to combine, or concatenate, strings.

Return to the Python script.

Create two strings and then concatenate them by entering the following code:

firstString = "water"
secondString = "fall"
thirdString = firstString + secondString
print(thirdString)
Save the file.

In the terminal, run the file with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

This is a string.                                            
<class 'str'>                                                
This is a string. is of the data type <class 'str'>
waterfall
   ​                                                                                                            

Exercise 3: Working with input strings
In coding, information that a user enters is known as input. You will use a built-in function named input() to get information from the user. The input() function will pause the code until a user enters a string and presses ENTER. Return to the Python script:

Enter the following code:

name = input("What is your name? ")
Use the print() function to write the value of the variable to the shell:

print(name)
Save the file.

In the terminal, run the file with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

This is a string.                                            
<class 'str'>                                                
This is a string. is of the data type <class 'str'>              
waterfall                                                    
What is your name? Maria                                     
Maria   

   ​                                                                                                            

Exercise 4: Formatting output strings
When your script wants to communicate information back to the user, it is called output. You have been using the print() function to write output to the shell. You will create a survey and output the information that it collects back to the user.

Return to the Python script and enter the following code:

color = input("What is your favorite color?  ")
animal = input("What is your favorite animal?  ")
You have been using the print() function with only one variable, but you can also use it with multiple variables to format a string. Enter the following code:

print("{}, you like a {} {}!".format(name,color,animal))
Save the file.

In the terminal, run the file with python3 filename.py.

The Python shell has stopped and is waiting for your input.

Enter a name and press ENTER.

Next, you are asked for your favorite color. Enter a color and press ENTER.

Next, you are asked for your favorite animal. Enter an animal and press ENTER.

Finally, the script prints a formatted string to the user by using the three pieces of information that you provided. Confirm that the output in the shell looks like the following output.

This is a string.                                            
<class 'str'>                                                
This is a string. is of the data type <class 'str'>              
waterfall                                                    
What is your name? Maria                                     
Maria                                                        
What is your favorite color?  blue                           
What is your favorite animal?  dog                           
Maria, you like a blue dog!  
Note: The final print() statement uses the format() function. In the format() function, the opening and closing braces ({}) act as placeholders for the variables that will be passed to (that is, put between) the function's parentheses.                                

Congratulations! You have used Python to concatenate strings, take input from the user, and output a formatted string.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 4 - List, Tuple, Dictionary

Working with Lists, Tuples, and Dictionaries
Lab overview
In Python, string and numeric data types are often used in groups called collections. Three such collections that Python supports are the list, the tuple, and the dictionary.

In this lab, you will:

Use the list data type

Use the tuple data type

Use the dictionary data type___

Estimated completion time
45 minutes

Exercise 1: Introducing the list data type
Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, collections.py and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Defining a list
In this activity, you will edit a Python script to hold a collection of fruit names, or a list of fruit.

From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section. 

In the file, enter the following code:

myFruitList = ["apple", "banana", "cherry"]
print(myFruitList)
print(type(myFruitList))
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Accessing a list by position
You can access the contents of a list by position. In this activity, you will print out each item in our list by their position:

In programming languages, the list position starts at zero (0). The brackets tell Python which position in the list you want. To access the apple string, enter the following code:

print(myFruitList[0])
To access the banana string, enter the following:

print(myFruitList[1])
To access the  cherry string, enter the following code:

print(myFruitList[2])
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Changing the values in a list
The values of a list can be changed. In this activity, you will change cherry to orange.

In Python, list position starts at zero (0), so you must use the numeral 2 to access the third position. Enter the following code:

myFruitList[2] = "orange"
Print the updated list:

print(myFruitList)
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

['apple', 'banana', 'cherry']                                
<class 'list'>                                               
apple                                                        
banana                                                       
cherry                                                       
['apple', 'banana', 'orange'] 
Exercise 2: Introducing the tuple data type
Defining a tuple
The tuple is like a list, but it can't be changed. A data type that can't be changed after it's created is said to be immutable. To define a tuple, you use parentheses instead of brackets ([]).

Create a tuple by entering the following code:

myFinalAnswerTuple = ("apple", "banana", "pineapple")
print(myFinalAnswerTuple)
print(type(myFinalAnswerTuple))
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Accessing a tuple by position
Like a list, the items of a tuple can also be accessed by position:

To access the apple string, enter the following code:

print(myFinalAnswerTuple[0])
To access the banana string, enter the following code:

print(myFinalAnswerTuple[1])
To access the pineapple string, enter the following code:

print(myFinalAnswerTuple[2])
Save and run the file.

In the terminal, run the file with python3 filename.py (replace filename.py with the name of your file).

Confirm that the script runs correctly and that the output displays as you expect it to.

['apple', 'banana', 'cherry']                                
<class 'list'>                                               
apple                                                        
banana                                                       
cherry                                                       
['apple', 'banana', 'orange']                                
('apple', 'banana', 'pineapple')                             
<class 'tuple'>                                              
apple                                                        
banana                                                       
pineapple
Exercise 3: Introducing the dictionary data type
Defining a dictionary
A dictionary is a list with named positions (keys). Imagine that your list shows people’s favorite fruit.

Return to the Python script, and enter the following code:

myFavoriteFruitDictionary = {
  "Akua" : "apple",
  "Saanvi" : "banana",
  "Paulo" : "pineapple"
}
Use the print() function to write the dictionary to the shell:

print(myFavoriteFruitDictionary)
Use the type() function to write the data type to the shell:

print(type(myFavoriteFruitDictionary))
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Accessing a dictionary by name
In this activity, you will use the name of the individuals to get their favorite fruit, instead of numbers.

To access Akua's favorite fruit, enter the following code:

print(myFavoriteFruitDictionary["Akua"])
To access Saanvi's favorite fruit, enter the following code:

print(myFavoriteFruitDictionary["Saanvi"])
To access Paulo's favorite fruit, enter the following code:

print(myFavoriteFruitDictionary["Paulo"])
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

['apple', 'banana', 'cherry']                                
<class 'list'>                                               
apple                                                        
banana                                                       
cherry                                                       
['apple', 'banana', 'orange']                                
('apple', 'banana', 'pineapple')                             
<class 'tuple'>                                              
apple                                                        
banana                                                       
pineapple                                                    
{'Akua': 'apple', 'Saanvi': 'banana', 'Paulo': 'pineapple'}     
<class 'dict'>                                               
apple                                                        
banana                                                       
pineapple                                                   
Congratulations! You have worked with the list, tuple, and dictionary data types in Python.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 5 - Categorize Values

Categorizing Values
Lab overview
With Python, you can mix types in a list. In this lab, you will create a list with different types and print the values.

In this lab, you will:

Use numeric data types

Use string data types

Use the list data type

Use a for loop

Use the print() function

Estimated completion time
30 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

Creating your Python exercise file
Choose File > New File

Choose File > Save As..., and provide a suitable name for the exercise file (for example, categorize-values.py) and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

 

Exercise 1: Creating a mixed-type list
You can mix data types in a Python list. In other languages, this capability is not a feature of lists. In this exercise, you will explore this capability.

From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section.

Define a list with different types, like the following example:

myMixedTypeList = [45, 290578, 1.02, True, "My dog is on the bed.", "45"]
Use a for loop statement to traverse the list and print the data type for each item in the list:

for item in myMixedTypeList:
    print("{} is of the data type {}".format(item,type(item)))
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

45 is of the data type <class 'int'>                             
290578 is of the data type <class 'int'>                         
1.02 is of the data type <class 'float'>                         
True is of the data type <class 'bool'>                          
My dog is on the bed. is of the data type <class 'str'>          
45 is of the data type <class 'str'>                                                        
This exercise reinforced the Python programming concepts that were covered in labs 1–6. Although the code has only a few lines, it is powerful. Take some time to review the code and make sure you understand everything that happens in it.

Congratulations! You have worked with the list data type and learned about Python support for mixing data types in a list declaration.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 6 - Composite Data Types

Working with Composite Data Types
Lab overview
A composite data type is any data type that comprises primitive data types. If you like food, you can visualize a composite data type as a turducken, which is a dish that consists of a chicken that is stuffed into a duck, which is stuffed into a turkey. In this lab, you will create a data type that consists of a string that is in a dictionary, which is in a list.

In this lab, you will:

Use numeric data types

Use string data types

Use the dictionary data type

Use the list data type

Use a for loop

Use the print() function

Use the if statement

Use the else statement

Use the import statement

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., provide a suitable name for the exercise file (for example, composite-data.py), and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, locate the file that you created in the previous section.

Creating a car inventory data
Comma-separated values (CSV) is a file format that's used to store tabular data, such as data from a spreadsheet. You will work with the CSV file from the following block.

From the menu bar, choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and save the file as car_fleet.csv

Copy and paste the following text block into the car_fleet.csv file and save the file.

vin,make,model,year,range,topSpeed,zeroSixty,mileage
TMX20122,AnyCompany Motors, Coupe, 2012, 335, 155, 4.1, 50000
TM320163,AnyCompany Motors, Sedan, 2016, 240, 140, 5.2, 20000
TMX20121,AnyCompany Motors, SUV, 2012, 295, 155, 4.7, 100000
TMX20204,AnyCompany Motors, Truck, 2020, 300, 155, 3.5, 0
Tip: If a pop-up window opens with the message Native Clipboard Unavailable, use the keyboard, not the browser menu, to perform copy and paste actions. For example, on Windows, use CTRL+C and CTRL+V to copy and paste, respectively. On Mac, use Command+C and Command+V.

Creating a car inventory program
Defining the dictionary
You will read in the file by using a module called csv. Additionally, you will make a deep copy of the data to store in memory by using a module called copy.

From the Explorer panel on the left, choose (double-click) the .py file that you created in the previous Creating your Python exercise file section.

First, import the modules that you will use:

import csv
import copy
Next, define a dictionary that will serve as your composite type for reading the tabular data:

myVehicle = {
    "vin" : "<empty>",
    "make" : "<empty>" ,
    "model" : "<empty>" ,
    "year" : 0,
    "range" : 0,
    "topSpeed" : 0,
    "zeroSixty" : 0.0,
    "mileage" : 0
}
You will use a for loop to iterate over the initial keys and values of the dictionary.

for key, value in myVehicle.items():
    print("{} : {}".format(key,value))
Note: The items() function belongs to the dictionary data type. The items() function tells the for loop to traverse the collection owned by the dictionary data type.

Define an empty list to hold the car inventory that you will read:

myInventoryList = []
Save the file.

 

Copying the CSV file into memory
You will read in the data from disk (hard drive) and make an in-memory (random access memory, or RAM) copy. In a computer, a hard drive stores data long term, including when the power is turned off. RAM refers to temporary memory that is faster, but it is erased when the computer's power is turned off.

You will be introduced to the with open syntax statement, which keeps a file open while you read data. It will automatically close the CSV file when the code inside the with block is finished running.

You will also use a new way of formatting a string. Instead of using double quotation marks and .format to pass in the variables, you can use a single quotation mark and write in the variables between the "{}" symbols.

Finally, csv.reader() is a function that you are using from the csv library that you imported with the import csv statement.

Most of the rest of the code should be familiar.

Now, return to the Python file:

Enter the following code:

with open('car_fleet.csv') as csvFile:
    csvReader = csv.reader(csvFile, delimiter=',')  
    lineCount = 0  
    for row in csvReader:
        if lineCount == 0:
            print(f'Column names are: {", ".join(row)}')  
            lineCount += 1  
        else:  
            print(f'vin: {row[0]} make: {row[1]}, model: {row[2]}, year: {row[3]}, range: {row[4]}, topSpeed: {row[5]}, zeroSixty: {row[6]}, mileage: {row[7]}')  
            currentVehicle = copy.deepcopy(myVehicle)  
            currentVehicle["vin"] = row[0]  
            currentVehicle["make"] = row[1]  
            currentVehicle["model"] = row[2]  
            currentVehicle["year"] = row[3]  
            currentVehicle["range"] = row[4]  
            currentVehicle["topSpeed"] = row[5]  
            currentVehicle["zeroSixty"] = row[6]  
            currentVehicle["mileage"] = row[7]  
            myInventoryList.append(currentVehicle)  
            lineCount += 1  
    print(f'Processed {lineCount} lines.')
 

Though this code seems like a large amount of code to process, it mostly comprises statements that you saw in earlier labs. You have a for loop with an if-else statement followed by a print() statement at the end.

However, the following line needs further explanation:

currentVehicle = copy.deepcopy(myVehicle)
By default, Python does a shallow copy of complex data types. A shallow copy refers, or points, to the storage location of the myVehicle dictionary variable. Without this line, you would have only one storage box, and only the last item in the list would be copied into memory. This line makes sure that new storage boxes are created in memory to store the new tabular data that is being read.

 

Printing the car inventory
You will finish the Python script by printing the car inventory from the myInventoryList variable.

Return to the Python script, and enter the following code:

for myCarProperties in myInventoryList:
    for key, value in myCarProperties.items():
        print("{} : {}".format(key,value))
        print("-----")
Save the file.

In the terminal, run the program with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

Review the code for reading in the tabular data from the CSV file one more time. Understanding this section of the code is key to this lab.

Congratulations! You have worked with composite data types in Python.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 7 - Conditionals

Working with Conditionals
Lab overview
A section of code that compares two pieces of information is called a conditional statement. You can use conditionals to create different paths through the program. Using comparative operators, you will write a program that makes decisions.

In this lab, you will:

Use the if statement

Use the else statement

Use the elif statement

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, conditionals.py) and save it under the /home/ec2-user/environment directory.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Working with the if statement
In this exercise, you will edit a Python script to ship packages.

From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section.

Use the input() function to get information from the user:

userReply = input("Do you need to ship a package? (Enter yes or no) ")
Use the if statement to print a response.

The statements in an if statement are one tab indented from the if statement. In other programming languages, brackets are often used to indicate the start and end of a logic block, but Python uses spacing:

if userReply == "yes":
    print("We can help you ship that package!")
 Note: The == symbol is a comparative operator. It means is equal to.

Save and run the file.

At the prompt, enter yes and press ENTER.

Confirm that you see a response.

In the terminal, run the file again with python3 filename.py.

At the prompt, enter no and press ENTER. Confirm that the program exits and nothing id displayed.

Exercise 2: Working with the else statement
To improve customer service, it would be nice to provide a reply even if the user doesn't want to ship a package. In this exercise, you will improve the Python script by using the else statement:

To handle the condition where the user doesn't want to ship a package, use the else statement:

else:
    print("Please come back when you need to ship a package. Thank you.")
Save and run the file.

At the prompt, enter no and press ENTER.

Confirm that you see a response.

In the terminal, run the file again with python3 filename.py.

At the prompt, enter yes and press ENTER.

Confirm that you see a response.

Exercise 3: Working with the elif statement
In this exercise, you will improve the Python script by offering the user additional services. When you have multiple conditions, you can use the elif statement, which is short for else-if.

Note: The elif statement always comes after an if statement and before the else statement.

In the Python script, enter the following code:

userReply = input("Would you like to buy stamps, buy an envelope, or make a copy? (Enter stamps, envelope, or copy) ")
if userReply == "stamps":
    print("We have many stamp designs to choose from.")
elif userReply == "envelope":
    print("We have many envelope sizes to choose from.")
elif userReply == "copy":
    copies = input("How many copies would you like? (Enter a number) ")
    print("Here are {} copies.".format(copies))
else:
    print("Thank you, please come again.")
Save and run the file.

At the prompt, enter no and press ENTER.

Confirm that you see a response.

At the prompt, enter stamps and press ENTER.

Confirm that you see a response.

In the terminal, run the file again with python3 filename.py.

At the prompt, enter yes and press ENTER.

Confirm that you see a response.

At the prompt, enter envelope and press ENTER.

Confirm that you see a response.

In the terminal, run the file again with python3 filename.py.

At the prompt, enter no and press ENTER.

Confirm that you see a response.

At the prompt, enter copy and press ENTER.

Confirm that you see a response.

At the prompt, enter 2 and press ENTER.

Confirm that you see a response.

Note: The if, elif, and else statements allow only one path to run at a time. The program doesn’t check the other statements after it finds a condition that is true.

As you can see, each time through the program had slightly different results. These differences demonstrate the power of conditionals.

Congratulations! You have written a Python script that uses if, elif, and else statements.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 8 - Loops

Working with Loops
Lab overview
A loop is a segment of code that repeats. You will be introduced to two types of loops: the while loop and the for loop.

In this lab, you will:

Use a while loop

Use a for loop

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, while-loop.py) and save it under the /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Working with a while loop
A while loop makes a section of code repeat until a certain condition is met. In this exercise, you will create a Python script that asks the user to correctly guess a number.

Printing the game rules
From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section.

Use the print() function to inform the user about your game:

print("Welcome to Guess the Number!")
print("The rules are simple. I will think of a number, and you will try to guess it.")
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Importing random and writing a while loop
You will use the import command to include code that someone else wrote. Up to now, you have been using built-in functions. Recall that a function is a piece of reusable code.

At the top of the file, include the Python module (which is a type of library) called random.

Note: By convention, import statements are placed at the top of the script.

import random
Place the cursor on the next line after the second print() statement. Next, enter a statement that will generate a random number between 1 and 10 by using the randint() function of the random module.

number = random.randint(1,10)
Track whether the user guessed your number by creating a variable called isGuessRight:

isGuessRight = False
To handle the game logic, create a while loop:

while isGuessRight != True:
    guess = input("Guess a number between 1 and 10: ")
    if int(guess) == number:
        print("You guessed {}. That is correct! You win!".format(guess))
        isGuessRight = True
    else:
        print("You guessed {}. Sorry, that isn’t it. Try again.".format(guess))
Note: The while loop will repeat the code inside the loop until the number is guessed correctly, which is represented by the condition isGuessRight != True in the code. Additionally, Python uses indentation to determine logic blocks, or what statements are considered to be part of the while loop. You can indent a line by placing the cursor next to a statement and pressing TAB.

Save the file.

 

Writing pseudocode
Before you run the Python script, write out the logic of the while loop in written (non-code) sentences. This technique is called pseudocoding.

For example:

If the user has not guessed the correct answer, enter the loop.

Ask the user for a guess.

Is the guess the correct number?

If the correct guess, tell the user it was the correct guess and exit the loop.

If the wrong guess, tell the user it was the wrong guess and continue the loop.

Running the script
Now run the Python script and see if it works.

In the terminal, run the file with python3 filename.py.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Adding comments
It is helpful to write comments in the code. A comment line is ignored by Python, and it starts with a pound sign (#). On most keyboards, you can create this symbol by pressing SHIFT+3. Add your own comments to the code to help you remember what the code does.

Informing the user about the script
In this activity, you will start a new Python script by creating the initial output that informs the user about what the script will do.

Choose File > New File.

The new file is blank and ready for your code.

Choose File > Save As... and save it as for-loop.py.

To inform the user about your script, use the print() function:

print("Count to 10!")
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

 

Writing the for loop
In Python, you can include a large amount of functionality in a few words. This feature makes Python relatively easy to write compared to other programming languages, but it can also make Python code more difficult to read. In this activity, you will use the for statement, but you will also spend some time analyzing it after you see it run.

Return to the Python script. To count to 10, enter the following code.

Note: Python uses indentation to determine that the print statement is inside the for loop statement.):

for x in range (0, 11):
    print(x)
Save and run the file.

Confirm that the script runs correctly and that the output displays as you expect it to.

Here is an explanation of what happened in those two lines. The for statement uses the for … in keywords to tell the computer to go through the list. A list is generated by the range() function. The range() function takes a starting number and an ending number, but the ending number is not inclusive. Therefore, you pass in 11 to have the function stop counting at 10. The letter x acts as a variable. Each time through the loop, the variable x is assigned to the next variable in the loop and is printed out to the screen.

Congratulations! You have worked with while and for loops in Python.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 9 - Git

Creating a Git Repository
Lab overview
GitHub runs an instance of git, which is version-control software that runs in the cloud. GitHub is popular among open source projects and businesses.

In this lab, you will:

Download solutions for the earlier labs

Create a GitHub account

Read the GitHub Hello World guide

Create a private repository for your labs

Download your repository

Estimated completion time
45 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

Exercise 1: Downloading your Python files from the previous labs
To download the project files, right-click the folder in the Explorer panel and choose Download.

This action creates an untitled file.

This action downloads a compressed file onto your local machine. Extract the contents of this file.

Exercise 2: Creating a GitHub account
At the time of this writing, GitHub offered a free account for individuals.

Visit GitHub at https://www.github.com and create an account.

github

Exercise 3: Reading the GitHub Hello World Guide
After you log in to GitHub, you can access to the Hello World guide for creating a repository.

hello world

At the time of this writing, the GitHub Guides page hosted the Hello World guide at https://guides.github.com/activities/hello-world/.

Read the GitHub Hello World guide.

Exercise 4: Creating a private repository
After you read the GitHub Hello World guide, make sure that you are logged in to GitHub and choose the New button.

The Create a new repository form (see the screen capture) should open.

Give your repository a name, such as aws_restart.

create new repo form

Note: You can make your repository public or private. Choose to create a private repository. Also, select the Initialize this repository with a README option.

If your repository is created successfully, you should see a default repository with a README file that is similar to this example.

example repo

Choose the Upload files button to get to the Upload files page.

upload

Upload all the files that you previously extracted in Exercise 1.

Exercise 5: Downloading a repository
To download your repository, complete the following steps.

Choose the Clone or download button.

Select the Download Zip option.

download zip

On your local machine, create an aws_restart folder and save your .zip file to it.

To verify that the files were downloaded, extract the .zip file.

Congratulations! You have used some basic features of GitHub.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 10 - Analyze with Python

Preparing to Analyze Insulin with Python
Lab overview
In information technology, Python works well as the programming language of choice for manipulating strings, sequences, and numbers. Python is especially preferred in scientific computing applications such as physics, chemistry, and biology.

In some of the labs for the Python modules, you will perform simple sequence manipulations and calculations on human insulin, which is a well-known hormone in the human body that is responsible for regulating sugars.

In this lab, you will:

Retrieve the protein sequence of human insulin from human preproinsulin

Estimated completion time
30 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, analyze-insulin.py and save it under the  /home/ec2-user/environment directory.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

 

Exercise 1: Retrieving the protein sequence of human preproinsulin
The National Center for Biotechnology Information (NCBI) has information on many biological sequences.

Access NCBI at https://ncbi.nlm.nih.gov.

Next to the search bar, choose the dropdown menu and select Protein. Next, in the search bar, enter human insulin and choose Search.

search

Choose the following search result: insulin [Homo sapiens].

search result

At the bottom of the search record, copy the insulin sequence, which starts with the word ORIGIN and ends with //.

search result

In the VS Code IDE, choose File > New File and save the file as preproinsulin-seq.txt. 

Paste the insulin sequence into preproinsulin-seq.txt:

ORIGIN      
        1 malwmrllpl lallalwgpd paaafvnqhl cgshlvealy lvcgergffy tpktrreaed
       61 lqvgqvelgg gpgagslqpl alegslqkrg iveqcctsic slyqlenycn
//
 

Bonus: Cleaning preproinsulin-seq.txt programmatically
Cleaning source data files is a common task in computer programming. You could programmatically clean preproinsulin-seq.txt in several ways—for example, by using Bash, Python, or another programming language of choice. Try using regex to programmatically strip the file of ORIGIN, its numbers, the two slashes (//), spaces, and line breaks or return carriages. You could also confirm programmatically that the file has 110 characters.

Exercise 2: Obtaining the protein sequence of human insulin
Insulin is obtained from preproinsulin through a series of cut-and-paste procedures. Preproinsulin contains a 24aa signal sequence and an 86aa proinsulin molecule. Amino acids 25–54 and amino acids 90–110 are the processed insulin molecule. Use Python, Bash, or manual manipulation to retrieve only those amino acids in the sequence that compose insulin.

Manually or programmatically delete ORIGIN, 1, 61, //, and the spaces and return carriages.

In the VS Code IDE, choose File > New File and save the file as preproinsulin-seq-clean.txt.

In the file preproinsulin-seq-clean.txt, copy your results.

Confirm that your file has 110 characters of lowercase letters, which represent the amino acids in the sequence of human preproinsulin.

In the VS Code IDE, choose File > New File and save the file as lsinsulin-seq-clean.txt.

In lsinsulin-seq-clean.txt, save amino acids 1–24. Verify that your file has 24 characters.

In the VS Code IDE, choose File > New File and save the file as binsulin-seq-clean.txt.

In binsulin-seq-clean.txt, save amino acids 25–54. Verify that your file has 30 characters.

In the VS Code IDE, choose File > New File and save the file as cinsulin-seq-clean.txt.

In cinsulin-seq-clean.txt, save amino acids 55–89. Verify that your file has 35 characters.

In the VS Code IDE, choose File > New File and save the file as ainsulin-seq-clean.txt.

In ainsulin-seq-clean.txt, save amino acids 90–110. Verify that your file has 21 characters.

 

Deciding when to automate and when to work manually: A discussion about scope versus time
Automating your work versus working manually is a dilemma for computer programmers. Too much automation wastes time on coding, whereas too little restricts the scope of your program. Try to balance your automation with working manually in an effort to create a program with the most scope for the least time spent coding. In this case, it is probably not worth the extra coding time to programmatically clean insulin-seq.txt to insulin-seq-clean.txt. However, if you needed to download thousands or millions of files and do the same task, automation would be good to explore.

Congratulations! You have prepared data for further processing. Manually preparing these files should help you appreciate the automation that Python can provide.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 11 - String Sequence and Numeric Weight

Working with the String Sequence and Numeric Weight of Insulin in Python
Lab overview
In the Python Basics module, you learned about variables, comments, math, concatenations, and exceptions. Now, you will apply what you have learned to the real-world application of human insulin.

You will store the protein sequence of human preproinsulin in a string variable and the weight of preproinsulin in int and float variables. Next, you will print these variables to the console, with comments that explain the code. You will do basic math and string concatenations.

In this lab, you will:

Add comments that explain the intention and flow of your code

Use print() to print elements of your Python code to the console

Use string manipulations to get the sequence of insulin from preproinsulin

Do basic math on the molecular weight and sequence of insulin

Assign string, int, and float variables to numbers that represent the weight of insulin

Explore Python exceptions

Estimated completion time
30 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, string-insulin.py) and save it under the  /home/ec2-user/environment directory.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment. In this directory, you should also be able to locate the file you created in the previous section.

 

Exercise 1: Assigning variables to the sequence elements of human insulin
In this exercise, you will create variables and assign a string value to them.

From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.

How to start your .py file

You should always start your Python file with comments. Recall that Python comments start with a pound sign (#).

Your first comments should provide:

The Python version (python3.11) with a path to the executable, if possible

The encoding of the file (typically, coding: utf-8)

Write the following note on the next line:

# Store the human preproinsulin sequence in a variable called preproinsulin:
Create the first variable in the Python file by entering preproInsulin = as the name of the variable, and with the equals sign (=) as the assignment operator.

After the equal sign (=), enter the following input:

"malwmrllpllallalwgpdpaaafvnqhlcgshlvealylvcgergffytpktr" \
"reaedlqvgqvelgggpgagslqplalegslqkrgiveqcctsicslyqlenycn"
To finalize the first variable on that line, press ENTER.

Maximum length of lines in Python files and other PEP standards

The trailing backslash (\) in variable value from the previous step is used to maintain compliance with the Python Enhancement Proposals (PEP) 8 style guide. The PEP 8 style guide recommends a maximum of 79 characters per line. PEPs are standards for Python best practices. Though the file still runs with longer line lengths, sticking to the suggested limit increases simplicity and readability. By using a backslash (\), you can split variables and code into smaller blocks, thereby maintaining the 79-character limit.

Write a note in the file:

# Store the remaining sequence elements of human insulin in variables:
Repeat the steps to define a variable and assign a value to it by using the information from the following chart. Use an equal sign (=) between the variable name and string.


Variable Name



String to Save to Variable



lsInsulin



"malwmrllpllallalwgpdpaaa"



bInsulin



"fvnqhlcgshlvealylvcgergffytpkt"



aInsulin



"giveqcctsicslyqlenycn"



cInsulin



"rreaedlqvgqvelgggpgagslqplalegslqkr"


Note: Variable names in Python usually begin with a lowercase first word, and then uppercase for each following word, without underscores or spaces. Be consistent when you name your variables.

Finally, you will merge the results of the smaller insulin groupings into a single variable called insulin. To do this, on a new line, enter: insulin = bInsulin + aInsulin

Exercise 3: Using print() to display sequences of human insulin to the console
In this exercise, you will use the print() built-in method to display sequence elements of human insulin in the console.

Write a note on the next line:

# Printing "the sequence of human insulin" to console using successive print() commands:
On a new line of the Python file, enter: print("The sequence of human preproinsulin:")

Press ENTER.

This print() statement prints the direct representation of the provided string, with no formatting.

To print a string that is contained in a variable from your script, enter: print(preproInsulin)

Press ENTER.

Enter the following comment:

# Printing to console using concatenated strings inside the print function (one-liner):
To concatenate strings, use the plus sign (+) in the print() statement:

print("The sequence of human insulin, chain a: " + aInsulin)
Press ENTER.

Note: The built-in print() function accepts multiple arguments that can accomplish the same task in step 5. For example:

print("The sequence of human insulin, chain a:", aInsulin)

Save and run the file.

Exercise 4: Calculating the rough molecular weight of human insulin using the given code
In this lab, you will calculate the molecular weight of insulin, which you will work with in later labs.

Ensure that your .py file is open

Copy the following code, and at the end of the .py file, paste it.

# Calculating the molecular weight of insulin  
# Creating a list of the amino acid (AA) weights  
aaWeights = {'A': 89.09, 'C': 121.16, 'D': 133.10, 'E': 147.13, 'F': 165.19,
'G': 75.07, 'H': 155.16, 'I': 131.17, 'K': 146.19, 'L': 131.17, 'M': 149.21,
'N': 132.12, 'P': 115.13, 'Q': 146.15, 'R': 174.20, 'S': 105.09, 'T': 119.12,
'V': 117.15, 'W': 204.23, 'Y': 181.19}  
# Count the number of each amino acids  
aaCountInsulin = ({x: float(insulin.upper().count(x)) for x in ['A', 'C',
'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
'V', 'W', 'Y']})  
# Multiply the count by the weights  
molecularWeightInsulin = sum({x: (aaCountInsulin[x]*aaWeights[x]) for x in
['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R',
'S', 'T', 'V', 'W', 'Y']}.values())  
print("The rough molecular weight of insulin: " +
str(molecularWeightInsulin))
Save and run the file.

Notice the resulting output. You will use elements of this code to work with loops and functions in other labs, so observe how the code is written and try to follow the expected output.

Note: The actual molecular weight of human insulin is 5807.63, but the program delivers 6696.42 because it ignores certain bonds and post-translational processing. To calculate the error percentage:error percentage = (| measured – accepted | / accepted)*100%

Enter or copy the example into your script.

molecularWeightInsulinActual = 5807.63
print("Error percentage: " + str(((molecularWeightInsulin - molecularWeightInsulinActual)/molecularWeightInsulinActual)*100))
To see the error percentage, run and save the file.

Note: When you use string concatenation with floating point calculations, the print() function returns an error. This error is handled by a method called casting, which tells Python to use a certain data type. The previous use of the str() function is an example of casting.

Congratulations! You have worked with variables and different data types in a Python function.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 12 - Lists and Loops

Calculating the Net Charge of Insulin by Using Python Lists and Loops
Lab overview
In the Flow Control module, you learned about if-else statements, while loops, lists, and for loops. Now you will apply what you have learned to the real-world application of human insulin.

Here, you will use lists, for and while loops, and basic math to calculate the net charge of insulin from pH 0 to pH 14.

In this lab, you will:

Create a dictionary of pKa values (which indicate the strength of an acid) that will be used in the net charge calculations

Use the count() method to get a count of amino acids

Use a while loop to calculate the net charge of insulin from pH 0 to pH 14

Estimated completion time
25 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, net-charge.py) and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Assigning variables, lists, and dictionaries
From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.  

Copy the following code, paste it into the file, and save the file:

# Python3.11  
# Coding: utf-8  
# Store the human preproinsulin sequence in a variable called preproinsulin:  
preproInsulin = "malwmrllpllallalwgpdpaaafvnqhlcgshlvealylvcgergffytpktrreaedlqvgqvelgggpgagslqplalegslqkrgiveqcctsicslyqlenycn"  
# Store the remaining sequence elements of human insulin in variables:  
lsInsulin = "malwmrllpllallalwgpdpaaa"  
bInsulin = "fvnqhlcgshlvealylvcgergffytpkt"  
aInsulin = "giveqcctsicslyqlenycn"  
cInsulin = "rreaedlqvgqvelgggpgagslqplalegslqkr"  
insulin = bInsulin + aInsulin
On the next line, create a new dictionary by entering: pKR = {}

To fill the dictionary with key-value pairs, insert the first key of y with a value of 10.07. Place the cursor inside the braces, and enter: 'y': 10.07,

Note: You included a comma after the value so that you can add the remaining key-value pairs.

To match the code segment, add the following key-value pairs into the dictionary.

'c': 8.18

'k': 10.53

'h': 6.00

'r': 12.48

'd': 3.65

'e': 4.25

The dictionary should look like the following code:

pKR = {'y':10.07,'c': 8.18,'k':10.53,'h':6.00,'r':12.48,'d':3.65,'e':4.25}
Note: Y, C, K, H, R, D, and E are the only amino acids that contribute to the net-charge calculation.

Exercise 2: Using count() to count the numbers of each amino acid
In this exercise, you will use the count() method and list comprehension to count the number of Y, C, K, H, R, D, and E amino acids. These amino acids contribute to the net charge.

To identify a count of an item within a list, you can use the count() method. To see how many amino acids in insulin are Y, use the count() method by entering: insulin.count("Y")

Next, update the insulin.count() line by casting the variable returned by the count() method as a float: float(insulin.count("Y"))

Now that you have the basis for identifying a single entity, you can use this method to find all entities from a list. This process can be done by using list comprehension. For the entire line, enter:
seqCount = ({x: float(insulin.count(x)) for x in ['y','c','k','h','r','d','e']})

Note: The first two steps in this exercise are predecessors to the third step.

Exercise 3: Writing the net charge formula
In this exercise, you will construct the net charge formula. You will use the provided netCharge variable in a Python-based net charge formula. The function for the formula includes a while loop that will print the net charge while the pH variable is equal to or below 14.

Create a variable called pH and initialize it to zero by entering pH = 0 and pressing ENTER.

Create the while loop by entering while (pH <= 14): and pressing ENTER.

Copy the following netCharge variable and paste it at the beginning of the while loop.

netCharge = (
    +(sum({x: ((seqCount[x]*(10**pKR[x]))/((10**pH)+(10**pKR[x]))) \
    for x in ['k','h','r']}.values()))
    -(sum({x: ((seqCount[x]*(10**pH))/((10**pH)+(10**pKR[x]))) \
    for x in ['y','c','d','e']}.values())))
To print the netCharge variable with the pH, use a format string for better readability. Enter print('{0:.2f}'.format(pH), netCharge) and press ENTER.

Finally, increment the pH variable by entering pH +=1 and pressing ENTER.

Save and run the file.

Be careful about indentation and spacing in Python

Subsets of Python code are organized by indentation and spaces. In Python, even one misplaced indentation or space can throw an exception or other error. For example, be sure that every item within your while loop is properly indented so the code will work.

Congratulations! You have worked with lists and loops in a Python function.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 13 - Caesar Cipher

Using Functions to Implement a Caesar Cipher
Lab overview
In programming, a function is a named section of a program that performs a specific task. Python has built-in functions like print() that are provided by the language. Additionally, you can use functions provided by other developers through the import statement. For example, you can use import math if you want to use the math.floor() function. In Python, you can make your own functions, which are called user-defined functions.

To drive the discussion of user-defined functions, you will write a program that implements a Caesar cipher, which is a simple method of encryption. A Caesar cipher takes the letters of a message and shifts each letter along the alphabet by a certain number of places.

In this lab, you will:

Create user-defined functions

Use several functions to implement a Caesar cipher encryption program

Estimated completion time
60 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., provide a suitable name for the exercise file (for example, caesar-cipher.py), and save it under the /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, locate the file that you created in the previous section.

Exercise 1: Creating a user-defined function
To start the process of implementing a Caesar cipher in Python, you will create a simple user-defined function.

From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.

Define a function called getDoubleAlphabet that takes a string argument and concatenates, or combines, the given string with itself as follows:

def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet
Note: The required parts of the function statement are the keyword def, a name, and the colon (:). Additionally, in Python, variables don't need to be declared, and their data types are inferred from the assignment statement.

Save the file.

To understand what the function does, take a sample input of alphabet="ABC". The return string for this input would be "ABC" + "ABC" = "ABCABC". The plus sign (+) concatenates the strings into one string.

Across the following exercises, you will define more functions that perform a simple task. You will then combine these functions to make a Caesar cipher program.

Exercise 2: Encrypting a message
The next function you define will request a message to encrypt from the user. You will use the built-in function called input().

In the text editor, enter the following code, and save the file:

def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt
Note: Functions should perform a specific task. Usually, because functions perform a specific task, your functions will also probably be short. Though this function returns a string, it doesn’t take an argument like the getDoubleAlphabet() function.

Exercise 3: Getting a cipher key
The cipher key is how far you will shift the letters. By using two alphabets, you can have a cipher key that is any integer from 1 to 25. Don’t count the key at index 26 because that key would shift you back to the original message.

Define a function to request a cipher key from the user by entering the following code:

def getCipherKey():
    shiftAmount = input( "Please enter a key (whole number from 1-25): ")
    return shiftAmount
Save the file.

Exercise 4: Encrypting a message
So far, the functions have been short and simple. That is usually the case when you keep to a specific task inside a function. The encryptMessage function will be a little longer.

Before writing the code, you should plan out the algorithm for encryption as follows:

Take three arguments: the message, the cipherKey, and the alphabet.

Initialize variables.

Use a for loop to traverse each letter in the message.

For a specific letter, find the position.

For a specific letter, determine the new position given the cipher key.

If current letter is in the alphabet, append the new letter to the encrypted message.

If current letter is not in the alphabet, append the current letter.

Return the encrypted message after exhausting all the letters in the message.

 

In the exercise file, enter the following code, and follow the logic by reviewing the steps of the previous algorithm:

def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = ""
    uppercaseMessage = message.upper()
    for currentCharacter in uppercaseMessage:
        position = alphabet.find(currentCharacter)
        newPosition = position + int(cipherKey)
        if currentCharacter in alphabet:
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    return encryptedMessage
Save the file.

Exercise 5: Decrypting a message
Functions are useful because you can reuse them. You will write a decryptMessage() function by reusing the encryptMessage() function. For this simple encryption, you can undo the encryption by shifting each letter back. Thus, instead of adding the cipher key, you will subtract the cipher key. To avoid rewriting most of the logic, you will pass in a negative cipher key.

Next, enter the following code, and save the file:

def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, decryptKey, alphabet)
Exercise 6: Creating a main function
You have built a collection of user-defined functions that will help you write a Caesar cipher program. The main logic of the program will, of course, also be contained in a function.

Before you look at the code, plan out your logic:

Define a string variable to contain the English alphabet.

To be able to shift letters, double your alphabet string.

Get a message to encrypt from the user.

Get a cipher key from the user.

Encrypt the message.

Decrypt the message.

In the exercise file, enter the following code, and follow the logic by reviewing the steps of the previous algorithm:

def runCaesarCipherProgram():
    myAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    myMessage = getMessage()
    print(myMessage)
    myCipherKey = getCipherKey()
    print(myCipherKey)
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decypted Message: {myDecryptedMessage}')
To help with debugging and understanding the program, print() statements were added, but they are not strictly necessary for the program to operate correctly.

Save and run the file, and then view the results.

 Nothing happens. Why? Recall that a function is a named section of a program that performs a specific task. You have not called your function.

To call the function, add the following line to your .py file and save the file:

runCaesarCipherProgram()
Run the program again. The output should be similar to the following:

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: new message
new message
Please enter a key (whole number from 1-25): 4
4
Encrypted Message: RIA QIWWEKI
Decypted Message: NEW MESSAGE
Re-run the program with different inputs.

Congratulations! You have worked with user-defined functions and implemented an encryption program!

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 14 - File Handlers

Creating File Handlers and Modules for Retrieving Information about Insulin
Lab overview
In this lab, you will:

Create a module

Open a file and load the JSON data it contains using the built-in JSON module of Python

Parse the JSON structure to access insulin data

Calculate the rough molecular weight of human insulin using given code (similar to the lab Working with the String Sequence and Numeric Weight of Insulin in Python)

Estimated completion time
25 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise File
Choose File > New File.

This action creates an untitled file.

Choose File -> Save As..., provide a suitable name for the exercise file (for example, calc_weight_json.py), and save it under the /home/ec2-user/environment directory.

Create a second file and name it jsonFileHandler.py.

Note: The .py is the extension for Python files.

Create a directory called files.

 

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, locate the file that you created in the previous section.

 

Exercise 1: Creating the JSON molecules data file
This JSON document stores all the information of previous lab, such as the insulin molecules, the numeric weights of the amino acids and the actual weight of the insulin molecule  

From the menu bar, choose File -> New File.

Copy and paste the following code into this newly created file:

{
   "molecules":{
      "lsInsulin":"malwmrllpllallalwgpdpaaa",
      "bInsulin":"fvnqhlcgshlvealylvcgergffytpkt",
      "aInsulin":"giveqcctsicslyqlenycn",
      "cInsulin":"rreaedlqvgqvelgggpgagslqplalegslqkr"
   },
   "weights":{
      "A":89.09,
      "C":121.16,
      "D":133.10,
      "E":147.13,
      "F":165.19,
      "G":75.07,
      "H":155.16,
      "I":131.17,
      "K":146.19,
      "L":131.17,
      "M":149.21,
      "N":132.12,
      "P":115.13,
      "Q":146.15,
      "R":174.20,
      "S":105.09,
      "T":119.12,
      "V":117.15,
      "W":204.23,
      "Y":181.19
   },
   "molecularWeightInsulinActual":5807.63
}
To save the file as insulin.json in the files folder, select File  -> Save As....

In the Save As pop-up window for Filename:, enter insulin.json

For Folder: enter files or choose the files folder.

Exercise 2: Creating the JSON file handler module
In this task, you create a module that reads the JSON file and returns the JSON document.

Choose the jsonFileHandler.py file.  

Import JSON to begin your work:

import json
Define the function that will read the file:

def readJsonFile(fileName):
Below the file definition, add a data variable as an empty string:

data=""         
For the body of the function, open the json file using the open function, and parse the file using json.load.

def readJsonFile(fileName):
    data = ""
    with open('files/insulin.json') as json_file:
        data = json.load(json_file)
    return data
open returns a file handler to the files/insulin.json file.

json.load reads the JSON file and returns the content as a Python dictionary.

Add a try/except block to make this function more reliable:

import json

def readJsonFile(fileName):
    data = ""
    try:
        with open(fileName) as json_file:
            data = json.load(json_file)
    except IOError:
        print("Could not read file")
    return data
In case the file cannot be opened, the program will display the error Could not read file.

The returned data string is empty in case the open file method fails.

You created a jsonFileHandle module that you can import in other Python files to access the readJsonFile function.

Exercise 3: Creating the main program
You create the main program that parses the JSON data and calculates the molecular weight as you did in a previous lab.

First, import the jsonFileHandle module. Open the calc_weight_json.py file and add the following:

import jsonFileHandler
Retrieve the the JSON data and store it in a data variable.

data = jsonFileHandler.readJsonFile('files/insulin.json')
Test if the returned data is not empty and obtain the insulin data.

if data != "" :
    bInsulin = data['molecules']['bInsulin']
    aInsulin = data['molecules']['aInsulin']
    insulin = bInsulin + aInsulin
    molecularWeightInsulinActual = data['molecularWeightInsulinActual']
    print('bInsulin: ' + bInsulin)
    print('aInsulin: ' + aInsulin)
    print('molecularWeightInsulinActual: ' + str(molecularWeightInsulinActual))
else:
    print("Error. Exiting program")
You can run the program to see if the data is well retrieved. The results should be as follows:

bInsulin: fvnqhlcgshlvealylvcgergffytpkt
aInsulin: giveqcctsicslyqlenycn
molecularWeightInsulinActual: 5807.63
You can also test what happens if the file is not found. For example, change the name of the file to 'files/insuline.json', and run the program. You will get the following message:

Could not read file
Error. Exiting program
Undo the last change so that the file is named files/insulin.json again.

In the if section of the code below the last print, add the following code:

# Calculating the molecular weight of insulin  
# Getting a list of the amino acid (AA) weights  
aaWeights = data['weights']
# Count the number of each amino acids  
aaCountInsulin = ({x: float(insulin.upper().count(x)) for x in ['A','C','D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R','S', 'T','V', 'W', 'Y']})  
# Multiply the count by the weights  
molecularWeightInsulin = sum({x: (aaCountInsulin[x]*aaWeights[x]) for x in
['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R','S', 'T', 'V', 'W', 'Y']}.values())  
print("The rough molecular weight of insulin: " +
str(molecularWeightInsulin))
print("Percent error: " + str(((molecularWeightInsulin - molecularWeightInsulinActual)/molecularWeightInsulinActual)*100))


Run the program. You will get the following:

bInsulin: fvnqhlcgshlvealylvcgergffytpkt
aInsulin: giveqcctsicslyqlenycn
molecularWeightInsulinActual: 5807.63
The rough molecular weight of insulin: 6696.420000000001
Percent error: 15.30383306099047
End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

@@ 0 15 - System Administration

Introducing System Administration with Python
Lab overview
You can use Linux to do many administrative tasks from the terminal, or the Bash command line. Python provides several modules that you can also use to run commands on the command line. In this lab, you will use os.system() and subprocess.run() to run Bash commands from Python.

In this lab, you will:

Use os.system() to run a Bash command

Use subprocess.run() to run Bash commands

Estimated completion time
30 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

    

Creating your Python exercise file
Choose File > New File.

This action creates an untitled file.

Choose File > Save As..., and provide a suitable name for the exercise file (for example, sys-admin.py) and save it under the /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, you should also be able to locate the file you created in the previous section.

Exercise 1: Using os.system
Python has several modules to allow you to run Bash commands from Python. In this exercise, you will use os.system() to run the Bash command ls, which shows the directory contents.

From the Explorer panel on the left, choose the file that you created in the previous Creating your Python exercise file section.

Import the os module:

import os
Recall that a module contains functions that other developers have written. The function os.system() takes a string argument. To run a Bash command, enter the following command:

os.system("ls")
Save the file. In the terminal, run it with python3 filename.py.

The output should show the contents of your current directory. Verify that your output is similar to the following example. Note that the contents of your directory might be different.

sys-admin.py README.md
Exercise 2: Using subprocess.run
Though os.system() is simple to use because it takes a string argument, it is recommended that you use the more powerful subprocess.run() function. You can use the subprocess module to spawn new processes, connect to input/output/error pipes, and obtain error codes. The subprocess.run() function can take many new arguments, but those additional arguments are optional.

The full list of arguments for subprocess.run() looks like the following list:

subprocess.run(args, *, stdin=None, input=None, stdout=None, stderr=None, capture_output=False, shell=False, cwd=None, timeout=None, check=False, encoding=None, errors=None, text=None, env=None, universal_newlines=None)
For this lab, you will keep the code simple.

In the file that you created for this lab, import the subprocess module:

import subprocess
To run the ls Bash command, enter the following command:

subprocess.run(["ls"])
Save the file. In the terminal, run it with python3 filename.py.

Confirm that your output lists the file in the directory, similar to the following example. (The contents of your directory might be different.)

sys-admin.py  sys-admin_2.py  README.md
Note that the output looks the same as the output of os.system() in Exercise 1, but you are using the subprocess module instead of the os module.

Exercise 3: Using subprocess.run with two arguments
In Python, the square brackets are list data types, which means that run() can take a list of arguments. Continue to add to the Python script.

In the lab file for this exercise, modify the final line of the script to include an additional argument:

subprocess.run(["ls","-l"])
The "-l" is an argument that tells the ls command to use a long-listing format.

Save the file. In the terminal, run it again with python3 filename.py.

Confirm that your output is similar to the following example.

total 12
-rw-r--r-- 1 ec2-user ec2-user  55 Apr 16 20:20 sys-admin.py
-rw-r--r-- 1 ec2-user ec2-user 343 Apr 16 19:07 sys-admin_2.py
-rw-r--r-- 1 ec2-user ec2-user 569 Apr  6 02:17 README.md
Exercise 4: Using subprocess.run with three arguments
You will now call subprocess.run() with three arguments. The third argument will be a directory name.

Return to your Python file and modify the final line of the script:

subprocess.run(["ls","-l","README.md"])
Save the file. In the terminal, run it with python3 filename.py.

Confirm that the expected output is similar to the following example.

-rw-r--r-- 1 ec2-user ec2-user 569 Apr  6 02:17 README.md
Exercise 5: Retrieving system information
The subprocess.run() function is powerful because you can use it to run any Bash command. In this exercise, you will call the uname command to get system information.

Return to your Python file and enter the following code:

command="uname"
commandArgument="-a"
print(f'Gathering system information with command: {command} {commandArgument}')
subprocess.run([command,commandArgument])
Save the file. In the terminal, run it with python3 filename.py.

Confirm that the expected output is similar to the following example.

Gathering system information with command: uname -a                          
Linux ip-172-31-29-181 4.4.0-139-generic #165-Ubuntu SMP Wed Oct 24 10:58:50
UTC 2018 x86_64 x86_64 x86_64 GNU/Linux 
Exercise 6: Retrieving information about disk space
To emphasize that subprocess.run() allows you to run any command, you will run the df command to get disk information.

Return to your Python file and enter the following code:

command="ps"
commandArgument="-x"
print(f'Gathering active process information with command: {command} {commandArgument}')
subprocess.run([command,commandArgument])
Save the file. In the terminal, run it with python3 filename.py.

Confirm that the expected output is similar to the following example.

Gathering active process information with command: ps -x                       
  PID TTY      STAT   TIME COMMAND                                           
18976 pts/459  S+     0:00 python3.11 lab_15_2.py                               
18977 pts/459  R+     0:00 ps -x                                             
21139 pts/459  S      0:00 /bin/bash -c export OLD_HOME=/home/ccc_4dfa91ec5a_
21164 pts/459  S      0:00 bash --rcfile /home/ccc_4dfa91ec5a_45122/.termrc -
 Congratulations! You have called Bash commands from Python.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 16 - Debugger

Using the Debugger
Lab overview
A software bug refers to an error, flaw, or failure in a computer program that causes an incorrect or unexpected result. A debugger is a computer program that is used to test and find bugs (debug) other programs. You can use a debugger to step through the code. The Python Debugger (pdb) is an interactive source code debugger for Python programs. In this lab, you will use the pdb to step through the scripts you wrote in previous labs.

In this lab, you will:

Explore the basic features of the Python Debugger

Use the Python Debugger to step through Python scripts

Estimated completion time
30 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

 

Creating your Python exercise File
Choose File > New File.

This actions creates an untitled file.

Choose File -> Save As..., provide a suitable name for the exercise file (for example, debugger.py), and save it under the /home/ec2-user/environment directory.

Note: The .py is the extension for Python files.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, locate the file that you created in the previous section.

Exercise 1: Exploring the basic features of the VS Code IDE Python Debugger
The VS Code IDE offers an interactive source code debugger for several languages, including Python. In this exercise, you cover some of the basic commands for debugging a Python file.

Complete the following steps to explore the basic features of the Python Debugger.

From the Explorer pane on the left side of the IDE, choose the .py file that you created in the previous Creating your Python exercise file section. Copy the following code and paste it in the file:

name = "John"
print("Hello " + name + ".")
age = 40
print(name + " is " + str(age) + " years old.")
To open the debugger, choose the Run and Debug icon in the left sidebar (it looks like a play button with a bug).

Click in the gutter to the left of line 1 to add a breakpoint (a red dot appears), and click in the gutter to the left of line 4 to add another breakpoint.

In the Run and Debug panel, under the WATCH section, choose the + icon to add two watch expressions: name and age.

At the top of the Run and Debug panel, choose Run and Debug. If prompted to select a debugger, choose Python Debugger, then choose Python File.

The program starts and stops at the first breakpoint (line 1).

In the debug toolbar at the top of the editor, choose the Step Over icon (arrow curving over a dot).

Line 1 is run, and the value of the name variable is displayed in the VARIABLES section of the Run and Debug panel.

Choose the Continue icon (blue play arrow) in the debug toolbar. The program resumes and stops at line 4 where the other breakpoint is set. The value of the age variable is now displayed.

Choose the Continue icon again to resume and end the program.

Exercise 2: Using the Python Debugger
Using the debugging basics you learned in Exercise 1, try stepping through some of the other labs to practice using the Python Debugger.

Congratulations! You have used some of the basic features of the Python Debugger.

End Lab
 Congratulations! You have completed the lab.

Choose  End Lab at the top of this page, and then select Yes to confirm that you want to end the lab.

A panel indicates that DELETE has been initiated... You may close this message box now.

A message Ended AWS Lab Successfully is briefly displayed, indicating that the lab has ended.
​

Additional Resources
For more information about AWS Training and Certification, see https://aws.amazon.com/training/.

Your feedback is welcome and appreciated.
If you would like to share any suggestions or corrections, please provide the details in our AWS Training and Certification Contact Form.

© 2022 Amazon Web Services, Inc. and its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited.

[(x)] Yes
[( )] No

 

 

@@ 0 17 - Debugging the Caesar Cipher Program

Debugging the Caesar Cipher Program
Lab overview
Recall that a debugger is a computer program that is used to test and find bugs (debug) other programs. In this lab, you will use the Python Debugger (pdb) to find and fix bugs in a Python program.

In this lab, you will:

Use the Python Debugger

Debug the different versions of the Caesar cipher program that you created in a previous lab

Estimated completion time
60 minutes

Accessing the VS Code IDE
Start your lab environment by going to the top of these instructions and choosing Start Lab.

A Start Lab panel opens, displaying the lab status.

Wait until you see the message Lab status: ready, and then close the Start Lab panel by choosing the X.

At the top of these instructions, choose AWS.

The AWS Management Console opens in a new browser tab. The system automatically logs you in.

Note: If a new browser tab does not open, a banner or icon at the top of your browser typically indicates that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose Allow pop ups.

To open the VS Code IDE, copy the LabIDEURL value from the panel to the left of these instructions and paste it into a new browser tab. When prompted, enter the LabIDEPassword value as the password.

The VS Code IDE opens.

Creating your Python exercise file
Choose File > New File

Choose File > Save As..., and provide a suitable name for the exercise file (for example, debug-caesar-1.py) and save it under the  /home/ec2-user/environment directory.

Accessing the terminal session
In the VS Code IDE, open a terminal by choosing Terminal > New Terminal from the menu bar.

A terminal session opens.

To display the present working directory, enter pwd. This command points to /home/ec2-user/environment.

In this directory, locate the file you created in the previous section.

Exercise 1: Working with the buggy Caesar cipher program - Part 1
In the Functions lab, you created a Caesar cipher program to encrypt and decrypt a message. In this lab, you will use the Python Debugger (pdb) to find and fix errors in buggy versions of the program.

From the Explorer panel on the left, choose the .py file that you created in the previous Creating your Python exercise file section. Copy the following code and paste it in the file:

# Module Lab: Caesar Cipher Program Bug #1
#
# In a previous lab, you created a Caesar cipher program. This version of
# the program is buggy. Use a debugger to find the bug and fix it.

# Double the given alphabet
def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet

# Get a message to encrypt
def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt

# Get a cipher key
def getCipherKey():
    shiftAmount = input("Please enter a key (whole number from 1-25): ")
    return shiftAmount

# Encrypt message
def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = ""
    uppercaseMessage = message.upper()
    for currentCharacter in uppercaseMessage:
        position = alphabet.find(currentCharacter)
        newPosition = position + cipherKey
        if currentCharacter in alphabet:
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    return encryptedMessage

# Decrypt message
def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, decryptKey, alphabet)

# Main program logic
def runCaesarCipherProgram():
    myAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    myMessage = getMessage()
    print(myMessage)
    myCipherKey = getCipherKey()
    print(myCipherKey)
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decrypted Message: {myDecryptedMessage}')

# Main logic
runCaesarCipherProgram()
Save the file.

Try running the first buggy Caesar cipher program. You should receive an error similar to the one in the following example.

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: AWS Restart rocks
AWS Restart rocks
Please enter a key (whole number from 1-25): 2
2
Traceback (most recent call last):
  File "/home/ec2-user/environment/caesar_cipher_program_bug_1.py", line 56, in <module>
    runCaesarCipherProgram()
  File "/home/ec2-user/environment/caesar_cipher_program_bug_1.py", line 50, in runCaesarCipherProgram
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
  File "/home/ec2-user/environment/caesar_cipher_program_bug_1.py", line 28, in encryptMessage
    newPosition = position + cipherKey
TypeError: unsupported operand type(s) for +: 'int' and 'str'


Process exited with code: 0
The program ends in a traceback. A traceback is a stack trace that starts from the point of an exception handler. It then goes down the call chain to the point where the exception was raised. In other words, an error occurred.

Use the debugger to find and fix the bug in the first lab file for the buggy Caesar cipher.

Exercise 2: Working with the buggy Caesar cipher program - Part 2
Errors that result in a traceback are usually easier to fix because the traceback provides helpful clues, like line numbers.

Choose File > New File

Choose File > Save As..., and provide a suitable name for the exercise file (for example, debug-caesar-2.py) and save it under the /home/ec2-user/environment directory.

Copy the following code and paste it into the newly created Python file:

# Module Lab: Caesar Cipher Program Bug #2
#
# In a previous lab, you created a Caesar cipher program. This version of
# the program is buggy. Use a debugger to find the bug and fix it.

# Double the given alphabet
def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet

# Get a message to encrypt
def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt

# Get a cipher key
def getCipherKey():
    shiftAmount = input("Please enter a key (whole number from 1-25): ")
    return shiftAmount

# Encrypt message
def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = ""
    uppercaseMessage = message
    for currentCharacter in uppercaseMessage:
        position = alphabet.find(currentCharacter)
        newPosition = position + int(cipherKey)
        if currentCharacter in alphabet:
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    return encryptedMessage

# Decrypt message
def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, decryptKey, alphabet)

# Main program logic
def runCaesarCipherProgram():
    myAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    myMessage = getMessage()
    print(myMessage)
    myCipherKey = getCipherKey()
    print(myCipherKey)
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decrypted Message: {myDecryptedMessage}')

# Main logic
runCaesarCipherProgram()
Save the file.

Run the second buggy Caesar cipher program. The program seems to end correctly, but double-check the output. The message is only partially encrypted, as shown in the example.

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: AWS Restart rocks!
AWS Restart rocks!
Please enter a key (whole number from 1-25): 2
2
Encrypted Message: CYU Testart rocks!
Decrypted Messgae: AWS Restart rocks!


Process exited with code: 0
Step through the program by using the debugger, and try to find the bug.

To see if you can get clues about the bug, run the program several times with different inputs. What do you notice?

When you find the bug, fix it, and validate your fix by running the program and entering different inputs.

Exercise 3: Working with the buggy Caesar cipher program - Part 3
In this exercise, you will debug a third buggy version of the Caesar cipher program.

Choose File > New File

Choose File > Save As..., and provide a suitable name for the exercise file (such as caesar_debug-3.py) and save it under the  /home/ec2-user/environment directory.

Copy the following code and paste it into the newly created Python file:

# Module Lab: Caesar Cipher Program Bug #3
#
# In a previous lab, you created a Caesar cipher program. This version of
# the program is buggy. Use a debugger to find the bug and fix it.

# Double the given alphabet
def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet

# Get a message to encrypt
def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt

# Get a cipher key
def getCipherKey():
    shiftAmount = input("Please enter a key (whole number from 1-25): ")
    return shiftAmount

# Encrypt message
def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = ""
    uppercaseMessage = message.upper()
    for currentCharacter in uppercaseMessage:
        position = alphabet.find(currentCharacter)
        newPosition = position + int(cipherKey)
        if currentCharacter in alphabet:
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    return encryptedMessage

# Decrypt message
def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, cipherKey, alphabet)

# Main program logic
def runCaesarCipherProgram():
    myAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    myMessage = getMessage()
    print(myMessage)
    myCipherKey = getCipherKey()
    print(myCipherKey)
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decrypted Message: {myDecryptedMessage}')

# Main logic
runCaesarCipherProgram()
Save the file.

Run the third buggy Caesar cipher program. The output looks almost correct. However, the decryption of the message AWS Restart message is incorrect, as shown in the following example:

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: AWS Restart rocks!
AWS Restart rocks!
Please enter a key (whole number from 1-25): 2
2
Encrypted Message: CYU TGUVCTV TQEMU!
Decrypted Message: EAW VIWXEVX VSGOW!


Process exited with code: 0
It’s time to start the debugger again! Find and fix the bug.

Exercise 4: Working with the buggy Caesar cipher program - Part 4
In this exercise, you will debug the fourth (and final) buggy version of the Caesar cipher program.

Choose File > New File

Choose File > Save As..., provide a suitable name for the exercise file (such as debug-caesar-4.py), and save it under the  /home/ec2-user/environment directory.

Copy the following into this file:

# Module Lab: Caesar Cipher Program Bug #4
#
# In a previous lab, you created a Caesar cipher program. This version of
# the program is buggy. Use a debugger to find the bug and fix it.

# Double the given alphabet
def getDoubleAlphabet(alphabet):
    doubleAlphabet = alphabet + alphabet
    return doubleAlphabet

# Get a message to encrypt
def getMessage():
    stringToEncrypt = input("Please enter a message to encrypt: ")
    return stringToEncrypt

# Get a cipher key
def getCipherKey():
    shiftAmount = input("Please enter a key (whole number from 1-25): ")
    return shiftAmount

# Encrypt message
def encryptMessage(message, cipherKey, alphabet):
    encryptedMessage = ""
    uppercaseMessage = ""
    uppercaseMessage = message.upper()
    for currentCharacter in uppercaseMessage:
        position = alphabet.find(currentCharacter)
        newPosition = position + int(cipherKey)
        if currentCharacter in alphabet:
            encryptedMessage = encryptedMessage + alphabet[newPosition]
        else:
            encryptedMessage = encryptedMessage + currentCharacter
    return encryptedMessage

# Decrypt message
def decryptMessage(message, cipherKey, alphabet):
    decryptKey = -1 * int(cipherKey)
    return encryptMessage(message, decryptKey, alphabet)

# Main program logic
def runCaesarCipherProgram():
    myAlphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    print(f'Alphabet: {myAlphabet}')
    myAlphabet2 = getDoubleAlphabet(myAlphabet)
    print(f'Alphabet2: {myAlphabet2}')
    myMessage = getMessage()
    print(myMessage)
    myCipherKey = getCipherKey()
    print(myCipherKey)
    myEncryptedMessage = encryptMessage(myMessage, myCipherKey, myAlphabet2)
    print(f'Encrypted Message: {myEncryptedMessage}')
    myDecryptedMessage = decryptMessage(myEncryptedMessage, myCipherKey, myAlphabet2)
    print(f'Decrypted Message: {myEncryptedMessage}')

# Main logic
runCaesarCipherProgram()
Save the file.

Run the fourth buggy Caesar cipher program. The output should be similar to the following example:

Alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Alphabet2: ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ
Please enter a message to encrypt: AWS Restart rocks!
AWS Restart rocks!
Please enter a key (whole number from 1-25): 2
2
Encrypted Message: CYU TGUVCTV TQEMU!
Decrypted Message: CYU TGUVCTV TQEMU!


Process exited with code: 0
The output seems buggy. Find and fix the final bug.

Congratulations! You have debugged four programs, and you have completed all the labs for this course.

End Lab
 Congratulations! You have completed the lab.
