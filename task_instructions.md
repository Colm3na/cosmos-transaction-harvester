Backend Task (Transaction Collector)
Most of our backend tasks are around scanning chains and storing data of the chains to our own data store. This task should test your ability to develop such algorithms.

Task

Figure out which transactions on cosmos main-net (cosmoshub-2) were done using Lunie.

We used special memos from within Lunie: (Sent via Lunie).

Acceptance Criteria

All transactions that were sent from Lunie are stored in some database.
The database syncs and then stays up to date with the chain.
The collector is dockerized.
The docker container accepts an environment variable STARGATE which holds the url to a cosmos REST server that should be used to crawl the chain.
For testing purposes use https://stargate.cosmos.network. You can find API documentation here: https://cosmos.network/rpc/
The docker container should provides some documented way to get the stored transactions.
We propose a simple REST server, but you can also provide a shell script.
Evaluation

Important parts of your code should be unit tested
The code should be documented
The repo should have some information about the task
You were able to follow the instructions
Please submit your completed task within 1 week of receiving it. When you submit your completed task we will schedule some time for you to present to our team. Our team will ask some questions about your task.

You can submit the task by sharing the link to a private repo on Github. If you have any questions or concerns please do not hesitate to reach out to us.

Thank you kindly!
