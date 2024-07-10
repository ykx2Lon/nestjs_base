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
6. 7/11:變更使用者資料/密碼、忘記密碼功能
7. 刪除帳號/停用帳號功能()

# 待解決問題
7. 解決其他地方出錯，sql rollback的問題(目前該專案沒有需要rollback部分)--使用kysely transaction
8. email加上isUnique(不能有email相同，userId不同的情況)
9. 改用passport，實現google登入功能
10. 解決sql造成的crash問題:先停用register的id檢查，再註冊重複的id確認結果
11. 確認要是沒有驗證的話可以使用哪些功能(權限設計)

# 當前任務:刪除帳號/停用帳號功能
1. 變更user資料:sessionId被猜到的情況下，隨意讓使用者更改密碼會很危險(雖然發生機率極低)，因此updatePassword功能應該獨立放在auth module
2. 忘記密碼:忘記密碼功能會用到mail，因此變更mail功能也應放在auth module
3. 變更密碼
4. 停用帳號:一般系統按下刪除帳號後不會馬上刪除，而是將帳號停用，待一段時間過後才用排程刪掉。
5. 刪除帳號:執行刪除排程