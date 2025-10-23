![BASH image](https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gnu-bash-logo.svg/1200px-Gnu-bash-logo.svg.png)

# BASH

Commands in BASH terminal


## pwd

path to working directory

```sh
$pwd
/home/seizquie/neoland/workspace
```

## ls

List files and folders (directories)

```sh
$ ls
42  neoland
```

## ls - l

List files and folders with details

```sh
total 8
drwxr-xr-x 4 seizquie seizquie 4096 Oct 22 20:04 42
drwxr-xr-x 5 seizquie seizquie 4096 Oct 22 21:33 neoland
```
## ls - a

Shows visible and hidden files and folders in given path

 ```sh
$ .  ..  .git  staff
 ```

## mkdir folder-name

Creates a folder with the provide name

```sh
$ mkdir workspace
```

## touch

Creates an empty file wirth de given name

```sh
$ touch readme.txt
```

## chmod rwx file-name/folder-name

Updates permissions in given folder or file

```sh
$ chmod 700 readme.txt
```

## nano file-name

```sh
$ nano readme.txt
```

## rm file-name
```sh
$ rm readme.txt
```
## rmdir folder-name

Removes a given folders when is empty

```sh
$ rmdir temp
```
## cd folder-name

Changes from the current folder to the given folder path

```sh
$ cd workspace
```

