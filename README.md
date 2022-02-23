# ERiKA

### ERiKA 電商服飾平台

> #### 網站連結：https://tpdidilong.github.io/Erika/
> #### 影片 DEMO：https://youtu.be/yDq7_ZoLYwo

## 專案簡介
透過 [Create React App](https://create-react-app.dev/) 建立開發環境，使用 [React](https://zh-hant.reactjs.org/) 開發 SPA (Single Page Application)，完成後將專案部署至 [GitHub Pages](https://pages.github.com/)。
#### 目前可使用功能：
- 瀏覽商品
- 加入購物車
- 管理後台之商品 [CRUD](https://zh.wikipedia.org/zh-tw/%E5%A2%9E%E5%88%AA%E6%9F%A5%E6%94%B9)
#### 未來開放功能：
> 請見 **專案展望**

## 使用技術
#### 前端框架：
- [react (hooks)](https://zh-hant.reactjs.org/)
- [react-dom](https://www.npmjs.com/package/react-dom)
#### 第三方套件：
- [styled-components](https://styled-components.com/)：使用 JSX 語法撰寫 css。可直接傳入變數做運算，不需透過 class 動態變更 style。
- [react-router-dom](https://v5.reactrouter.com/)：使用 `<HashRouter>` 實現 SPA 路由。
- [react-redux](https://react-redux.js.org/)：在 react 裡實現狀態管理。
- [redux-toolkit](https://redux-toolkit.js.org/)：更簡單地撰寫 redux。將 states, actions, reducers 集中管理於 slices，用 mutable 的方式撰寫 actions，支援 redux-thunk middleware。
- [font-awesome](https://fontawesome.com/)：透過套件提供的 `<FontAwesomeIcon>` 元件，快速套用圖庫裡的 icon class，作為專案內的 UI icons。
- [react-scroll-restoration](https://www.npmjs.com/package/react-scroll-restoration)：實現前端換頁移至頁首的同時，當使用者透過瀏覽器操作上一頁或下一頁可恢復至原瀏覽位置。
- [gh-pages](https://pages.github.com/)：方便且快速地部署 CRA 專案。

#### 第三方API
- [Unsplash API](https://unsplash.com/developers)：從 [Unsplash](https://unsplash.com/) 圖庫內取得隨機圖片。用於首頁、目錄頁及商品頁之底部推播。
- [Imgur API](https://apidocs.imgur.com)：將本機圖片檔案上傳至 [Imgur](https://imgur.com/) 圖床，並取得圖片網址。用於商品後台，管理員上傳商品圖片。


## 專案執行

1. `npm install`：安裝專案所需套件
2. `npm run start`：在 http://localhost:3000 啟動專案 development 版本
3. `npm run build`：在 build 資料夾建立專案 production 版本 ( = `npm run predeploy`)
4. `npm run deploy`：將網站部署至 [GitHub Pages](https://pages.github.com/)

## 頁面架構
> 各頁面實際功能請參考 [影片 DEMO](https://youtu.be/yDq7_ZoLYwo)

![](https://i.imgur.com/pmq5sQv.png)

## 專案展望
#### 新增會員系統
- 利用 JWT 實作登入及註冊功能、OAuth 串連第三方登入
- 會員功能：
    - 加入商品至願望清單
    - 查看以會員身份進行結帳之歷史訂單
    - 更改會員資料
    - 【管理員限定】進入管理後台之權限
- 管理員功能：
    - 商品管理：新增存貨進出紀錄和價格變動紀錄（搭配新增後端 database）
    - 訂單管理：分為已成立、已付款、已完成、已取消四種狀態
    - 會員管理：可將特定會員之權限由使用者調整為管理員
#### 新增訂單系統
- 實作購物車結帳功能
    - 串接金流
    - 超商門市選擇
- 訂單管理
    - 已成立
    - 已付款
    - 已完成
    - 已取消
#### 其他
- 利用 cookie 實作「看過的商品」

## 專案後端
採用 [Node.js](https://nodejs.org/en/) 的 web 框架 [Express](https://expressjs.com/) 建置 server，搭配 ORM 框架 [Sequelize](https://sequelize.org/) 操作 [MySQL](https://www.mysql.com/) 資料庫以建立 controllers 及 models，同時生成 API 與前端串連。
> #### 專案連結：https://github.com/TPdidilong/Erika-backend

## 專案授權

[MIT License](https://choosealicense.com/licenses/mit/)
