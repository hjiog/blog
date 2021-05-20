---
title: vite学习
date: 2021-03-12
tags:
 - vite
categories:
 - 前端
---



## 起步

### 创建一个react ts 项目

```bash
yarn create @vitejs/app my-react-app --template react-ts
```

### 安装相关依赖

1. 安装less

```bash
yarn add less -D
```

2. 安装eslint

```bash
yarn add eslint -D
# 生成.eslintrc.js文件
npx eslint --init
```

最终.eslintrc.js文件的样子

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    // 新增内容
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    // 新增内容
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
};


```

修改tsconfig.json

```json
# 更新include属性
"include": [
    "./src",
    "vite.config.ts",
    ".eslintrc.js"
 ]
```

附上.vscode/settings.json的配置

```json
{
  "files.associations": {
    ".code-workspace": "jsonc",
    ".babelrc": "json",
    ".eslintrc": "jsonc",
    ".eslintrc*.json": "jsonc",
    ".stylelintrc": "jsonc",
    "stylelintrc": "jsonc",
    ".htmlhintrc": "jsonc",
    "htmlhintrc": "jsonc",
    "Procfile*": "shellscript",
    "README": "markdown"
  },
  "files.exclude": {
    "**/*/adapters/index.ts": true,
    "**/*/adapters/index.js": true,
  },
  "search.useIgnoreFiles": true,
  "search.exclude": {
    "**/build": true,
    "**/output": true,
    "**/dist": true,
    "**/yarn.lock": true,
    "**/package-lock.json": true,
    "**/*.log": true,
    "**/*.pid": true,
    "**/.git": true,
    "**/node_modules": true,
    "**/bower_components": true
  },
  //
  "editor.rulers": [
    80,
    120
  ],
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "eslint.alwaysShowStatus": true,
  "eslint.nodePath": "./node_modules",
  "eslint.run": "onType",
  "eslint.options": {
    "rules": {
      "no-debugger": "off"
    }
  },
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
  ],
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "javascript.validate.enable": false,
  "typescript.validate.enable": true,
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false,
  //
  "prettier.disableLanguages": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "jsonc",
    "json"
  ],
  "prettier.trailingComma": "all",
  "prettier.printWidth": 80,
  "prettier.semi": true,
  "prettier.arrowParens": "avoid",
  "prettier.bracketSpacing": true,
  "prettier.jsxBracketSameLine": true,
  //
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  //
  "json.format.enable": true,
  "[json]": {
    "editor.tabSize": 2,
    "editor.formatOnType": true,
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
  },
  "[jsonc]": {
    "editor.tabSize": 2,
    "editor.formatOnType": true,
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
  },
  "emmet.triggerExpansionOnTab": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.tabSize": 2,
  "cSpell.words": [
    "gdev"
  ],
  "svg.preview.background": "black",
  // css modules 默认支持 camelCase
  "cssModules.camelCase": true,
  // 显示eslint 输出日志
  "eslint.trace.server": "verbose"
}
```

3. 设置路径别名 & 按需引入antd

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client"
    ],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react",
    "baseUrl": ".", # 一定要加上这行，否则别名设置无效
    "paths": {
      "@/*": [
        "./src/*"
      ],
    }
  },
  "include": [
    "./src",
    "vite.config.ts",
    ".eslintrc.js"
  ]
}
```

vite.config.ts

```ts
/* eslint-disable import/no-extraneous-dependencies */
import * as path from "path";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import vitePluginImp from "vite-plugin-imp";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    vitePluginImp({
      // 按需加载antd
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    open: true,
    port: 8000,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      // 更改样式
      less: {
        modifyVars: { "primary-color": "#13c2c2" },
        javascriptEnabled: true,
      },
    },
  },
});
```

