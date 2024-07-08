# 專案說明
以nestjs為基底，加上express session、redis、kysely實現user註冊及登入功能

# 實行步驟
1. 確認目錄建立方式
```tree
src
├── user
|   ├── user.interface.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.service.ts
│   └── user.repository.ts
├── auth
│   ├── dto
│   │   └── login.dto.ts
|   |   └── register.dto.ts
│   ├── guards
│   │   └── session-auth.guard.ts
│   ├── strategies
│   │   └── session.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.constants.ts
├── app.module.ts
```
2. 7/1:完成user的基本model、repository、service(O)
3. 7/3:實作使用者註冊(O)+信箱驗證-使用jwt(O)
4. 7/3:上傳至github(O)
5. 7/6:實作login、session部分
6. 7/7:刪除帳號/停用帳號功能

# 待解決問題
7. 解決其他地方出錯，sql rollback的問題
8. 解決sql造成的crash問題:先停用register的id檢查，再註冊重複的id確認結果
9. 若已註冊過但token過期，應該請對方重新註冊還是重發驗證信


# 當前任務:實作login、session部分
1. 測試redis(O)
2. 測試express-session(ing)
3. 整合express-session 和 redis