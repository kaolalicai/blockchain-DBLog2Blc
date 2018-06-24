## 监听 db oplog/binlog to blockchain


### 项目依赖

- Node.js >= 8.8.0
- MongoDB >= 3.0.0
- Typescript >= 3.6.2

### 运行项目

```js
npm run dev # 开发环境

npm start # 正式环境
```

### 代码风格

- [tslint](https://palantir.github.io/tslint);
- [standard](https://github.com/blakeembrey/tslint-config-standard/blob/master/README.md)

### 测试 & 覆盖率

无

### 构建镜像

#### 基础镜像
```shell
make base
```

#### 生产镜像
```shell
make build
```

### 需要的环境变量
见 config/production.js

# blockchain-DBLog2Blc
