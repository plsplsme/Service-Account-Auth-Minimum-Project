'use strict';
require('dotenv').config();

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

// It seems you dont have to set up project id.
// Maybe because service account contains project id. (service account belong to GCP project)
// const storage = new Storage({
//   projectId: 'YOUR-PROJECT-ID'
// });

const listBuckets = async() => {
  // Lists all buckets in the current project
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');
  buckets.forEach(bucket => {
    console.log(bucket.name);
  });
  // [END storage_list_buckets]
}

const createBucket = async (bucketName) => {
  const ref = await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
  return ref;
}

// Do not use common name like 'testbucket' it cause following error.
// Sorry, that name is not available.Please try a different one.
// Even though my GCP does not have 'testbucket' it did not allowed.
const bucketName = 'YOUR-BUCKET-NAME';
createBucket(bucketName).then(ref=>{
  // console.log(ref);
  listBuckets().then(ref => {
    // console.log(ref);   
  }).catch(err => {
    console.log(err);
  })
}).catch(err => {
  console.log(err);
})



