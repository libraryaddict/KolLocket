# KolLocket
Locket Script for Kingdom of Loathing

This script reads locket_monsters.txt to tell you what locket monsters in that list, you still have not achieved.

locket_monsters.txt is a list of monster names, that can be seperated with a tab to include the monster group.

If the monster group is included, and there's more than 2 monsters in the group you have not yet achieved, the group is collapsed.

Install this script with

```text
svn checkout https://github.com/libraryaddict/KolLocket/branches/release/
```

Usage is as simple as calling the script name, but you can also provide a number to limit how many lines it'll print.
By default it will print 5 lines, the parameter is optional.

```text
locket 10
```

