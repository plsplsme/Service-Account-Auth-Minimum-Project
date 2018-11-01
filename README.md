# Why I create this repository?

The node client for google cloud is not neatly organized.
I had hard time to figure out how to use service account to access my google account.
So here I am creating minimum repository to let you access your google account from your node project. 

# What is service account?

You can use [service account](https://cloud.google.com/iam/docs/understanding-service-accounts) to call Google APIs.
The account you are accesing is YOUR account. So that there is no user permission to use it.

# How to set up service account

1. Set up google cloud.
2. Go to GCP console API & Services -> credential.
3. Click create credential -> service account key
4. Select "New Service account" and set up service account name as you wish
5. Set role to "Project Owner"
6. Set key type to JSON and Create

You MUST secuiry keep the credential file.
[Here](https://cloud.google.com/docs/authentication/production) is the document to explain how to use service account in your project.

# How to use this repository

You have to set up service account and download the credential json file beforehand.
Followings are how to access to your google drive.

```bash
# clone repo
git clone https://github.com/plsplsme/Service-Account-Auth-Minimum-Project.git
cd GoogleDriveApiNodeMinProject
npm install

# set up credential
mkdir .private
cp /path/to/credential.json .private/
echo 'GOOGLE_APPLICATION_CREDENTIALS=.private/credential.json'

# set up program and change fileId and localPath
vim drive.js

# run program
node drive.js
```
# About Gmail

Unfortunately you need Gsuite account to call Gmail API by service account.

# About Storage

