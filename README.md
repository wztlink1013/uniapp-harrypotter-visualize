# uniapp-harryPotter-visualize

## 背景以及创新点

《哈利·波特》系列小说和电影在全球拥有众多忠实的爱好者，都憧憬着被霍格沃兹魔法学校录取，想象自己是里面无所不能的魔法师。尽管存在与哈利波特相关的论坛、贴吧，但与之相关的APP却很少，因此我们组以此为契机，选择受众明确的《哈利波特》作为主题，创造一个有代入感的APP。一个专门给霍格沃兹学校学生使用的用来查询魔法资料的以及交流想法的APP。

## 项目架构

- 本项目使用uniapp + clientDB 实现微服务架构。
- 权限管理：DBSchema
- 项目构建：Hbuilder X。
- 数据库：unicloud阿里云数据库、unicloud阿里云云存储。
- 项目部署：Hbuilder X基座、云打包。

## 项目展望

uni-app跨平台的前端应用框架，来展示哈利波特的魔法世界元素，使用clientDB 实现文章模块。通过此次的练习，对前端和后端的使用有了更加深度的认识。

项目未来将会增添更多的魔法世界新元素；对于页面展示使用更加高效率的查询和显示算法；增加token、验证码等安全机制，使用户信息和数据库受到更安全保护；完善积分系统、余额系统；此次数据库使用的是UniCloud云数据库，未来将会使用更大型的后台存储，打造一个全新的魔法爱好者社交平台。

## 本地部署方式

进入unicloud云服务空间[https://unicloud.dcloud.net.cn](https://unicloud.dcloud.net.cn)，创建一个阿里云数据库（腾讯云也可,不过相应的创建表等工作可能有差异）。

**首先创建user、article、catagories表：**

![](https://cdn.jsdelivr.net/gh/wztlink1013/cdn-article/article20201120/20201218171732.png)
![](https://cdn.jsdelivr.net/gh/wztlink1013/cdn-article/article20201120/20201218171818.png)
![](https://cdn.jsdelivr.net/gh/wztlink1013/cdn-article/article20201120/20201218171847.png)
### article
```json
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "properties": {
    "_id": {
      "description": "ID，系统自动生成"
    },
    "u_openid": {
      "bsonType": "string",
      "description": "用户",
      "foreignKey": "user.u_openid"
    },
    "title": {
      "bsonType": "string",
      "description": "标题"
    },
    "content": {
      "bsonType": "string",
      "description": "内容"
    },
    "cate": {
      "bsonType": "int",
      "description": "类别"
    },
    "create_time": {
      "bsonType": "string",
      "decription": "创建时间"
    }
  }
}
```
### user
```json
{
  "bsonType": "object",
  "required": [],
  "permission": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "properties": {
    "_id": {
      "description": "ID，系统自动生成"
    },
    "u_id": {
      "bsonType": "string",
      "describe": "uniapp uid"
    },
    "u_openid": {
      "bsonType": "string",
      "describe": "uniapp openid"
    },
    "u_name": {
      "bsonType": "string",
      "describe": "昵称"
    },
    "u_face": {
      "bsonType": "string",
      "describe": "头像"
    },
    "u_random": {
      "bsonType": "string",
      "describe": "随机码"
    },
    "u_integral": {
      "bsonType": "int",
      "describe": "积分"
    },
    "u_remainder": {
      "bsonType": "int",
      "describe": "余额"
    },
    "u_regtime": {
      "bsonType": "int",
      "describe": "注册时间"
    }
  }
}
```
### catagories
```json
{
  "bsonType": "object",
  "required": [
    "cate_id"
  ],
  "permission": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "properties": {
    "_id": {
      "description": "ID，系统自动生成"
    },
    "cate_id": {
      "bsonType": "int",
      "description": ""
    },
    "cate_pid": {
      "bsonType": "int",
      "description": ""
    },
    "cate_name": {
      "bsonType": "string",
      "description": ""
    },
    "cate_order": {
      "bsonType": "string",
      "description": ""
    }
  }
}
```

**再在catagories表中导入数据：**
![](https://cdn.jsdelivr.net/gh/wztlink1013/cdn-article/article20201120/20201218172152.png)
```
{"_id":{"$oid":"5fbe6ea5b8d859000121eb1e"},"cate_id":1,"cate_pid":0,"cate_name":"魔药","cate_order":1}

{"_id":{"$oid":"5fbe6edf6d24c500015f1b0d"},"cate_id":2,"cate_pid":0,"cate_name":"魔咒","cate_order":2}

{"_id":{"$oid":"5fbe6f21a307b70001cb6c7d"},"cate_id":3,"cate_pid":0,"cate_name":"魔杖","cate_order":3}

{"_id":{"$oid":"5fbe6f33a307b70001cb6c9e"},"cate_id":4,"cate_pid":0,"cate_name":"魔法心得","cate_order":4}
```

在HBuilderX导入该GitHub项目后关联创建的阿里云空间即可成功运行。
