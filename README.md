# 可升级的Solana计数器智能合约

这是一个基于Anchor框架开发的可升级Solana智能合约，实现了简单的计数器功能。

## 功能特性

### 1. 计数器功能
- **初始化**: 设置计数器初始值为0
- **递增**: 任何人都可以调用递增函数，每次调用计数器值加1
- **查询**: 可以查询当前计数器值

### 2. 可升级性
- **权限控制**: 只有合约部署者可以调用升级功能
- **安全机制**: 使用PDA（Program Derived Address）确保账户安全
- **错误处理**: 包含完整的错误处理机制

## 合约结构

### 主要指令

1. **initialize** - 初始化计数器
   - 设置初始值为0
   - 记录部署者地址作为权限控制

2. **increment** - 递增计数器
   - 任何人都可以调用
   - 计数器值加1

3. **upgrade** - 升级合约
   - 只有部署者可以调用
   - 包含权限验证

### 账户结构

```rust
pub struct Counter {
    pub count: u64,        // 计数器值
    pub authority: Pubkey,  // 部署者地址
}
```

## 部署和测试

### 环境要求
- Anchor CLI
- Solana CLI
- Node.js 和 Yarn

### 构建项目
```bash
anchor build
```

### 运行测试
```bash
anchor test
```

### 部署到本地网络
```bash
# 启动本地验证节点
solana-test-validator

# 部署合约
anchor deploy
```

### 部署到开发网络
```bash
# 切换到开发网络
solana config set --url devnet

# 部署合约
anchor deploy
```

## 使用示例

### 初始化计数器
```typescript
const tx = await program.methods.initialize().accounts({
  counter: counterPda,
  authority: provider.publicKey,
  systemProgram: anchor.web3.SystemProgram.programId,
}).rpc();
```

### 递增计数器
```typescript
const tx = await program.methods.increment().accounts({
  counter: counterPda,
}).rpc();
```

### 查询计数器值
```typescript
const counterAccount = await program.account.counter.fetch(counterPda);
console.log("当前计数器值:", counterAccount.count.toNumber());
```

### 升级合约（仅部署者）
```typescript
const tx = await program.methods.upgrade().accounts({
  counter: counterPda,
  authority: provider.publicKey,
}).rpc();
```

## 安全特性

1. **PDA使用**: 使用Program Derived Address确保账户地址的唯一性和安全性
2. **权限控制**: 严格的权限验证，只有部署者可以升级合约
3. **错误处理**: 完整的错误码和错误信息
4. **账户验证**: 使用Anchor的账户验证机制

## 测试覆盖

项目包含完整的测试套件，测试以下功能：

- ✅ 计数器初始化
- ✅ 计数器递增
- ✅ 权限控制（部署者可以升级）
- ✅ 权限控制（非部署者无法升级）

## 项目结构

```
solana_program_counter/
├── programs/
│   └── solana_program_counter/
│       └── src/
│           └── lib.rs          # 主合约代码
├── tests/
│   └── solana_program_counter.ts  # 测试文件
├── migrations/
│   └── deploy.ts              # 部署脚本
├── Anchor.toml                # Anchor配置
└── README.md                  # 项目说明
```

## 许可证

ISC License 