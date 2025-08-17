## 记录一些solana cli 的常用命令

## 查看solana版本

```shell
solana --version
# solana-cli 2.2.16 (src:8211e913; feat:333842486, client:Agave)
```

## 查看solana节点信息
```shell
solana config get

# Config File: /Users/xxx/.config/solana/cli/config.yml
# RPC URL: https://api.devnet.solana.com 
# WebSocket URL: wss://api.devnet.solana.com/ (computed)
# Keypair Path: /Users/xxx/.config/solana/id.json 
# Commitment: confirmed 
```

## 查看钱包地址
```shell
solana address

# FWSAzQLPKEXWzoYbSm88AUnLyZWidVKekrFEW8xiCr8R
```

## 查看指定钱包交易历史
```shell
solana transaction-history FWSAzQLPKEXWzoYbSm88AUnLyZWidVKekrFEW8xiCr8R

# 4PxBQ5T2oNWTrNTq1P3u63ALHDioKoGRHr4JLZVAivuTx3WvCk7sqtnFvi8cNazkVB2WMxQa2FVBwKTKH1RYpkb3
# 2f9o7zASQH2U2BXXGnvWWZLCnJyQShj3QAFGCApKwCsyDHsro9Hqaf2GnySfcAzzFMG4F94sd5pZHHrhc4qb4TRV
# EQeSavp2EcGmiKSC2Hyst3C3uBzRpZNxnjVT4N65cKNsEks2fniZRDcf82sKiGQo5xEWTi7AbB1ncUHSH6Aghct
# 26z4gcXSaAofN5aE3yw5RGvaw2LE94DwHjr4s2EteDCmxXt9z1nZpjNvrhFKbog5xMKwoeq77pDenSXB28zUXVuL
# 2h1SMymgzGgbEGUzpxemxnuZu9V84pVFktv8ukueiJLRgyxzHsXzAvNPx3aYCfztuixL1dmNQTDwMTGXKAfzcZsk
# 2AridRUtuKL9XanMGZZCqnqSLFPptxibpK327xBkaSYccfj8dqmwuKBTkWZwCEfcLPbcbyivGvAU3RbBTzJrjq8v
# Zud5PBnCE8tKtdh9m247PWnVD7HbvK5wXQMf6qhiiNFRZzk5GwQKmP2ur2wPykLHvtDabetgYYHdW4j8xgexR5x
# 2E4v1BF8XboSqeHsWsFtcFAAVNFAkMkxuYnjDzZdxMTW2yVKGuNAyFCsYk5tFd568CauwtUxCP5u4LuLJJrYNLbE
```

## 查看指定钱包余额
```shell
solana balance FWSAzQLPKEXWzoYbSm88AUnLyZWidVKekrFEW8xiCr8R

# 21.81722544 SOL
```

## 升级solana cli 客户端
```shell
agave-install update

# Install is up to date. 23e0199 is the latest commit for stable
```

## 通过 solana-keygen 查看当前项目的程序id
```shell
solana-keygen pubkey target/deploy/solana_program_counter-keypair.json

# 5vGZ6LoqMP7j8e8XU5cAvdh1UJHhPnEj1vrqMAfQdcLD
```

## 检查指定的程序信息
```shell
solana program show 5vGZ6LoqMP7j8e8XU5cAvdh1UJHhPnEj1vrqMAfQdcLD --url devnet

# Program Id: 5vGZ6LoqMP7j8e8XU5cAvdh1UJHhPnEj1vrqMAfQdcLD
# Owner: BPFLoaderUpgradeab1e11111111111111111111111
# ProgramData Address: hNCZcvz4AqWdsSEMB5Zj2Xc4Xr2k5f3vAdYGwjvsqnK
# Authority: HJCLAsh23SAFWRTGGPF4b7ScQPX5zzYEHW4otjjMNh1n
# Last Deployed In Slot: 401549608
# Data Length: 211080 (0x33888) bytes
# Balance: 1.47032088 SOL
```