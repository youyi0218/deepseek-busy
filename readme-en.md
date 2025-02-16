# Deepseek Busy

[中文版本](https://github.com/youyi0218/deepseek-busy/readme.md)

## Project Overview

A project that replicates the Deepseek official website, achieving approximately 80% of its functionality, with support for Cloudflare deployment.

## Project Structure

- `worker.js`: API deployed in Cloudflare Worker
- All files except the `local` folder are deployed in Cloudflare Pages
- `local` folder: One-click package for local large language models (Currently Chinese only)
  - Linux version: 815MB
  - Windows version: 874MB
