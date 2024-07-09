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
5. 7/6:實作login、session部分(O)
6. 7/7:刪除帳號/停用帳號功能()

# 待解決問題
7. 解決其他地方出錯，sql rollback的問題(目前該專案沒有需要rollback部分)
8. 改用passport，實現google登入功能
9. 解決sql造成的crash問題:先停用register的id檢查，再註冊重複的id確認結果
10. 若已註冊過但jwt過期，應在使用者登入時提示重寄驗證信(前端)
11. 確認要是沒有驗證的話可以使用哪些功能
12. 試著使用工廠函式建立service/repository

# 當前任務:實作login
1. 基礎login(O)
2. session保存期限(O)
3. 未登入/session過期自動跳轉。(O)
   - 使用middleware實現，拋出401。(O)
   - 跳轉部分由前端處理。(不在此專案範圍內)
