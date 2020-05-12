# Web Managed Product

The cue template that is used by ITP Web for new sites. 

The same are used by on both internet and intranet instances of matrix

Therefore, they are also in two different source control systems, github/internet  
and bitbucket/intranet

They must be kept in sync. But it's not too bad with the "git remote" command,  
as long as you remember to actually do it.

--this command will tell you which remote repository is your origin  
git remote -v

--this command will change the origin to internet  
git remote set-url origin https://github.com/DAF-WebTech/WMP.git

--this command will change the origin to intranet  
git remote set-url origin http://appsuppt103/stash/scm/wsf/wmp.git

So you can swap your remote url, and then push:  
git push origin master --force

We use --force because they repositories are different, so tell git we know  
they're not the same repository, but do it anyway.  




