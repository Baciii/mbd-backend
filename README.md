# Moving-Bricks-Duck Backend

### 功能设计

-   面试题浏览（增删改查）
-   面试题自测（增删改查）
-   招聘信息共享（增删改查）
-   面经记录（增删改查）
-   后台管理

###### User类型

-   0.超级管理员（User、Question、Post、Interview、Article）
-   1.普通管理员（Question、Post、Interview、Article）
-   2.后台展示（Question、Post、Interview、Article）———— readonly
-   3.普通用户（Question、Post、Interview、Article）———— 自发布权限
