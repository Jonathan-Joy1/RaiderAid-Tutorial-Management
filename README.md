# RaiderAid-Tutorial-Management
This repository contains the files and programs for the Email Reminder, a tutorial management tool that lets teachers set up notifications for student groups through email.

## Email Setup (EmailJS and Firebase)
The processes of email verification for signing up and sending emails to students involve EmailJS and Firebase.

## Firebase API Key Setup (for local/dev)
1. Copy `firebase-config.example.js` to `firebase-config.js`.
2. Fill in real Firebase web app values in `firebase-config.js`.
3. Do not commit `firebase-config.js` to GitHub.

`firebase-config.js` is ignored by git via `.gitignore` so your active key stays local.
