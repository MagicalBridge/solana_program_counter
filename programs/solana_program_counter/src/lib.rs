use anchor_lang::prelude::*;

declare_id!("HcBNNFLBRxBVocodDNFGdWA1DXH3R6wTJ2X1nTiVq3Hr");

#[program]
pub mod solana_program_counter {
    use super::*;

    // 初始化计数器，设置初始值为0
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        counter.authority = ctx.accounts.authority.key();
        msg!("计数器已初始化，当前值: {}", counter.count);
        Ok(())
    }

    // 递增计数器，任何人都可以调用
    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("计数器已递增，当前值: {}", counter.count);
        Ok(())
    }

    // 递减计数器，任何人都可以调用
    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = counter.count.saturating_sub(1);
        msg!("计数器已递减，当前值: {}", counter.count);
        Ok(())
    }

    // 升级合约，只有部署者可以调用
    pub fn upgrade(_ctx: Context<Upgrade>) -> Result<()> {
        msg!("合约升级功能已调用");
        // 这里可以添加升级逻辑
        Ok(())
    }
}

/// 计数器账户结构
#[account]
pub struct Counter {
    pub count: u64,
    pub authority: Pubkey,
}

impl Counter {
    pub const LEN: usize = 8 + 8 + 32; // discriminator + count + authority
}

/// 初始化指令的账户结构
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = Counter::LEN,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

/// 递增指令的账户结构
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
}

/// 递减指令的账户结构
#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
}

/// 升级指令的账户结构
#[derive(Accounts)]
pub struct Upgrade<'info> {
    #[account(
        mut,
        seeds = [b"counter"],
        bump
    )]
    pub counter: Account<'info, Counter>,
    
    #[account(
        constraint = authority.key() == counter.authority @ ErrorCode::Unauthorized
    )]
    pub authority: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("只有合约部署者可以执行此操作")]
    Unauthorized,
}
