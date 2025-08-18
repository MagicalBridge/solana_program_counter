import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaProgramCounter } from "../target/types/solana_program_counter";
import { PublicKey, Keypair } from "@solana/web3.js";
import { expect } from "chai";

describe("solana_program_counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.solanaProgramCounter as Program<SolanaProgramCounter>;
  const provider = anchor.getProvider();

  // 生成计数器账户的PDA
  const [counterPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("初始化计数器", async () => {
    const tx = await program.methods.initialize().accounts({
      counter: counterPda,
      authority: provider.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();
    
    console.log("初始化交易签名:", tx);
    
    // 验证计数器已正确初始化
    const counterAccount = await program.account.counter.fetch(counterPda);
    expect(counterAccount.count.toNumber()).to.equal(0);
    expect(counterAccount.authority.toString()).to.equal(provider.publicKey.toString());
  });

  it("递增计数器", async () => {
    // 第一次递增
    const tx1 = await program.methods.increment().accounts({
      counter: counterPda,
    }).rpc();
    
    console.log("第一次递增交易签名:", tx1);
    
    let counterAccount = await program.account.counter.fetch(counterPda);
    expect(counterAccount.count.toNumber()).to.equal(1);
    
    // 第二次递增
    const tx2 = await program.methods.increment().accounts({
      counter: counterPda,
    }).rpc();
    
    console.log("第二次递增交易签名:", tx2);
    
    counterAccount = await program.account.counter.fetch(counterPda);
    expect(counterAccount.count.toNumber()).to.equal(2);
  });

  it("测试新的递减功能", async () => {
    // 先获取当前计数值
    let counterAccount = await program.account.counter.fetch(counterPda);
    const currentCount = counterAccount.count.toNumber();
    console.log("递减前的计数值:", currentCount);
    
    // 执行递减操作
    const tx = await program.methods.decrement().accounts({
      counter: counterPda,
    }).rpc();
    
    console.log("递减交易签名:", tx);
    
    // 验证计数值已正确递减
    counterAccount = await program.account.counter.fetch(counterPda);
    const newCount = counterAccount.count.toNumber();
    console.log("递减后的计数值:", newCount);
    
    // 使用 saturating_sub，所以如果当前值为0，递减后仍为0
    const expectedCount = currentCount > 0 ? currentCount - 1 : 0;
    expect(newCount).to.equal(expectedCount);
  });

  it("只有部署者可以调用升级功能", async () => {
    // 部署者调用升级功能应该成功
    const tx = await program.methods.upgrade().accounts({
      counter: counterPda,
      authority: provider.publicKey,
    }).rpc();
    
    console.log("升级交易签名:", tx);
  });

  it("非部署者无法调用升级功能", async () => {
    // 创建一个新的钱包作为非部署者
    const nonAuthority = Keypair.generate();
    
    // 给新钱包一些SOL用于交易费用
    const airdropTx = await provider.connection.requestAirdrop(nonAuthority.publicKey, 1000000000);
    await provider.connection.confirmTransaction(airdropTx);
    
    try {
      await program.methods.upgrade().accounts({
        counter: counterPda,
        authority: nonAuthority.publicKey,
      }).signers([nonAuthority]).rpc();
      
      // 如果执行到这里，说明测试失败
      expect.fail("应该抛出未授权错误");
    } catch (error) {
      console.log("预期的未授权错误:", error);
      expect(error.toString()).to.include("Unauthorized");
    }
  });
});
