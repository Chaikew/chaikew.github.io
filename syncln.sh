#!bin/sh
git submodule update --remote --merge --recursive; 
git submodule foreach --recursive "(git add .; git commit -m 'SubmoduleSync'; git push; git pull;);" git add .; 
git commit -m 'SubmodulesSynced'; 
git push; 
git pull;
