## 为co-dialog贡献

请花几分钟回顾一下文档，让每一个参与的过程变得容易而有效。

## pull requests

下面的方式是你在这个项目中最好的方式。



1. 首先，你需要[Fork](https://help.github.com/articles/fork-a-repo/)这个项目，克隆到你的Fork，然后配置远程remote控制。

```
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/co-dialog.git
# Navigate to the newly cloned directory
cd co-dialog
# Assign the original repo to a remote called "upstream"
git remote add upstream git@github.com:koringz/co-dialog.git
```

2. 如果你已经克隆，那么从upstream获得最新改变的。
```
git checkout master
git pull upstream master
```

3. 然后你在本地创建一个新的分支并检出分支
```
git checkout -b <topic-branch-name>
```

4. 然后你把新分支推入到你的远程master分支上
```
git push origin <topic-branch-name>
```

5. 常见推入到远程分支
```
git add .
git commit -m ""
git push origin <topic-branch-name>
```

6. 最后你在github上使用一个清楚的标题和描述推入请求[open a pull request](https://help.github.com/articles/about-pull-requests/)

 