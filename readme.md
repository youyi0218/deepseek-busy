# Deepseek Busy

[English Version](https://github.com/youyi0218/deepseek-busy/readme-en.md)

## 项目简介

一个仿照 Deepseek 官网开发的项目，能达到官网 80% 的效果，支持 Cloudflare 部署。

## 项目结构

- `worker.js`: API 部署在 Cloudflare Worker 中
- 除 `local` 文件夹外的其他文件部署在 Cloudflare Pages 中
- `local` 文件夹：本地可用的大模型一键包（目前仅支持中文）
  - Linux 版本：815b
  - Windows 版本：874b