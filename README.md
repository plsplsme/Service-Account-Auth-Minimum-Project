# GoogleDriveApiNodeMinProject
Minimum node project for google drive api

# How to use it

You have to set up service account and download the credential json file beforehand.

```bash
# clone repo
git clone https://github.com/plsplsme/GoogleDriveApiNodeMinProject.git
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

# How to set up service account

1. Set up google cloud and activate google drive api.
2. Go to GCP console API & Services -> credential.
3. Click create credential -> service account key
4. Select "New Service account" and set up service account name as you wish
5. Set role to Project Owner
6. Set key type to JSON and Create
