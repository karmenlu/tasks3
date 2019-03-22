# Tasks3

- Design Choices:
The simulation of multiple pages linked in the navigation bar is available
to existing users that are logged in.

Because there are no managers, tasks may be assigned by any user to any user. 
This is justified because once a task is created, the task does not belong to
any particular user. 

Any user may reassign a task to his/her self.

- Error handling:
Invalid usernames/passwords trigger an alert.

As specified by the assignment requirements, time
spent is restricted to non-negative, 15-minute increments.
Invalid time spent input triggers an alert.

- Additional Features:
Completed tasks, once checked, change to a green color to
denote their completion.
