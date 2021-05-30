#!bin/sh
git submodule update --remote --merge --recursive; 
git submodule foreach --recursive "(git add .; git commit -m 'SubmoduleSync'; git push; git pull;);" git add .; 
git commit -m 'SubmodulesSynced'; 
git push; 
git pull;
function pause(){
 read -s -n 1 -p "Press any key to continue . . ."
 echo ""
}
pause