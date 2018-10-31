// This one does not work with regular gmail account.
// The client need domain-wide access to Google Driva Api.
// Only Gsuite admin can grant such authorization to user account.
// https://developers.google.com/identity/protocols/OAuth2ServiceAccount
'use strict';
require('dotenv').config();
const { google } = require('googleapis');

const getGmail = async () => {
  const auth = await google.auth.getClient({
    scopes: [
      'https://www.googleapis.com/auth/gmail.readonly',
    ]
  });

  const gmail = await google.gmail({
    version: 'v1',
    auth: auth,
  });

  return gmail;
}

const getList = async () => {
  const gmail = await getGmail();
  const auth_email = gmail._options.auth.email;
  console.log("iam: " + auth_email);

  const res = await gmail.users.messages.list({ userId: 'me' });
  return res.data;
}

getList().then(data=>{
  console.log(data);
}).catch(err=>{
  console.log(err);
})

