# squasher
Do you squash merge? Do your friends? Do you have 300 local branches that cant be automatically deleted with commit compares? What if there was a solution to ALL your squash merge problems!

Hopefully you read that like an infomercial. 

## how it works
Opens an electron app and allows you to choose a directory that contains the git repo you want to delete branches from that have been "squash and merged" via github UI. Simply select the folder and it will execute a shell to CD into that directory and GIT BRANCH to list all the branches on that repo. You can then selectively delete them via checkboxes. The one caveat is it wont let you delete a branch with `master` in the name or `*` because thats you're current working branch.

## how to use it
- clone the repo
- yarn install - or npm install
- npm start

![alt text](https://github.com/gfogle/squasher/blob/master/readme/Screen%20Shot%202017-07-01%20at%2011.21.38%20AM.png "Screenshot")
