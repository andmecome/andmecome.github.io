##### 本地仓库

~~~js
//Git用C语言开发，所有的版本控制系统只能跟踪文本文件的改动
//不要使用Windows自带的记事本编辑文件，会出错，可以使用Notepad++

//初始化git仓库
git init 

//把文件放入git仓库
git add xxx 或 git add . //把要提交的修改放到暂存区
git commit -m "备注信息" //把暂存区的文件提交到当前分支

//查看状态
git status

//查看差异
git diff

//查看历史纪录
git log 或 git log --pretty=oneline //退出 q

//回退到上一个版本
git reset --hard HEAD^ //上上 HEAD^^ 更多100个版本 HEAD~100

//查看文件内容
cat xxx

//回退到未来某个版本 aaa , aaa 就是 commit id ，版本号没必要写全
//git版本回退很快，因为在git内部有个指向当前版本的HEAD指针
git reset --hard aaa

//恢复新版本，找新版本的commit id 
//git reflog记录你的每一次命令
git reflog

//HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id
//穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本
//要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本

//查看工作区和版本库里面最新版本的区别
git diff HEAD -- xxx

//把xxx文件在工作区的修改全部撤销
git checkout -- xxx
//这里有两种情况：
//一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
//一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
//总之，就是让这个文件回到最近一次git commit或git add时的状态。

//把xxx文件在暂存区的修改撤销掉	
git reset HEAD xxx
//场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file
//场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD xxx，就回到了场景1，第二步按场景1操作
//场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库

//删除文件
git rm xxx
git commit -m "备注"

//删错了恢复，也可以
git checkout -- xxx
~~~

##### 远程仓库

~~~js
//添加远程库
//创建SSH Key
ssh-keygen -t rsa -C "andmecome@outlook.com" 
//完成以后，用户主目录下会有 .ssh 目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人

在 GitHub Account settings SSH Keys 页面 Add SSH Key,填任意Title,在Key文本框里粘贴id_rsa.pub文件的内容

//在github上创建新仓库
//可以从此仓库clone出新仓库，也可以把一个已有的本地仓库与之关联，在本地仓库下运行命令
git remote add origin git@github.com:andmecome/data.git //origin 远程库的名字
//关联后，就可以把本地库的所有内容推送到远程库上
git push -u origin master
//由于远程库是空的，我们第一次推送master分支时，加上了-u参数（Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令）
//以后就可以 git push origin master

//SSH警告
//当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：直接yes，回车

//从远程库克隆
上次我们讲了先有本地库，后有远程库的时候，如何关联远程库
现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆
~~~

##### 分支管理

~~~js
//创建dev分支，然后切换到dev分支
git checkout -b dev
//git checkout 命令加上 -b 参数表示创建并切换，相当于以下两条命令
git branch dev
git checkout dev

//查看当前分支
git branch

//合并分支 (切换回master分支,将dev分支的工作成果合并到master分支上)
git merge dev
//git merge 命令用于合并指定分支到当前分支

//（解决冲突后再一次提交）

//删除dev分支
git branch -d dev //git branch -D dev 强行删除（删除没有合并的分支）

//合并时禁用Fast forward 模式，就不会删除分支后丢掉分支信息
git merge --no-ff -m "备注" dev
//合并要创建一个新的commit，所以加上-m参数，把commit描述写进去

//合并后，查看分支历史
git log --graph --pretty=oneline --abbrev-commit

//解决bug
git stash //备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中
git pull
git stash pop //从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复
//git stash pop 恢复的同时把stash内容也删了 等价于 （git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除）
//可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：git stash apply stash@{0}

//git stash list //显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复

//git stash clear //清空Git栈。此时使用gitg等图形化工具会发现，原来stash的哪些节点都消失了

//多人协作
//当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin

//查看远程库的信息
git remote
git remote -v //详细信息

//推送分支
git push origin master
//并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
//master分支是主分支，因此要时刻与远程同步；
//dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
//bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
//feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发
//在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定

//抓取分支
//当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支
//现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，本地和远程分支的名称最好一致
git checkout -b dev origin/dev
//你和小伙伴改了同样的文件，推送有冲突
git pull
//git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接
git branch --set-upstream-to=origin/dev dev
//再pull
//git pull 成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：

//Rebase
git rebase
//rebase操作可以把本地未push的分叉提交历史整理成直线；
//rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比
~~~

##### 标签管理

~~~js
//创建标签
//git branch
//git checkout master
git tag v1.0

//查看所有标签
git tag

//默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
//方法是找到历史提交的commit id，然后打上就可以了：
git log --pretty=oneline --abbrev-commit
/*
4c805e2 fix bug 101
e1e9c68 merge with no-ff
f52c633 add merge
cf810e4 conflict fixed
5dc6824 & simple
14096d0 AND simple
b17d20e branch test
1094adb append GPL
*/
//比方说要对add merge这次提交打标签，它对应的commit id是f52c633，敲入命令：
git tag v0.9 f52c633

//注意，标签不是按时间顺序列出，而是按字母排序的。可以用git show <tagname>查看标签信息
git show v0.9

//还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：
git tag -a v0.1 -m "version 0.1 released" 1094adb

//操作标签
//删除标签
git tag -d v0.1

//因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。
//如果要推送某个标签到远程，使用命令git push origin <tagname>：
git push origin v1.0

//或者，一次性推送全部尚未推送到远程的本地标签：
git push origin --tags

//如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：
git tag -d v0.9
//然后，从远程删除。删除命令也是push，但是格式如下：
git push origin :refs/tags/v0.9
~~~

