//
// Example of google drive api access.
//
// If you want to see more example of the node client, go to 
// https://github.com/googleapis/google-api-nodejs-client/tree/master/samples/drive
//
'use strict';
require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');

// Google drive file id.
// As of 2018 November, you can find out the file id as follow.
// 1. Go to google drive
// 2. Right click the file you want to download
// 3. Click sharable link
// 4. The link should be https://drive.google.com/open?id=FILE-ID-OF-GOOGLE-DRIVE
// 5. Turn of share settings if you wish
const fileId = 'FILE-ID-OF-GOOGLE-DRIVE';

// Local path to download the file.
// For windows user (as I am), you don't have to write C:\PATH\TO\LOCAL\FOLDER
// It looks node recognize the drive (C:\) where you run the program.
// For example, my node project is D:\node\project\drive.js and localPath is '/node/project/files'.
const localPath = '/PATH/TO/LOCAL/FOLDER/';

// Main function.
const main = async (fileId, localPath) => {
  try {
    await checkEnv();

    const drive = await getDrive();
    // Make sure you are accessing correct project.
    const auth_email = drive._options.auth.email;
    console.log("iam: " + auth_email);

    const meta = await getMeta(drive, fileId);
    const status = await download(drive, fileId, localPath + meta.name);
    return status;
  } catch(err) {
    throw err;
  }
}


const getDrive = async () => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });

  const drive = await google.drive({ version: 'v3', auth: auth });
  return drive;
}

const checkEnv = () => {
  return new Promise((resolve, reject) => {
    fs.access("./.env", fs.constants.F_OK, (err) => {
      if (err) {
        reject('.env file does not exists!');
      }
      resolve('.env file exists');
    });
  })
}

const getMeta = (drive, fileId) => {
  return new Promise((resolve, reject) => {
    drive.files.get({ fileId: fileId }, function (err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res.data);
    });
  });
}

const download = (drive, fileId, destPath) => {
  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
      function (err, res) {
        if (err) {
          reject(err);
          return;
        }
        res.data
          .on('end', () => {
            console.log(`FIle donloaded to ${destPath}`);
            resolve(res.status);
          })
          .on('error', err => {
            reject(err);
          })
          .pipe(dest);
      }
    );
  })
}

main(fileId, localPath).then(status=>{
  console.log(`status: ${status}`);
}).catch(err=>{
  console.error(err);
})
