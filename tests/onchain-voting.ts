import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { OnchainVoting } from "../target/types/onchain_voting";

describe("onchain-voting", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.OnchainVoting as Program<OnchainVoting>;
  let voteBank = anchor.web3.Keypair.generate();

  it("Create vote bank", async () => {
    // Add your test here.
    const tx = await program.methods.initVoteBank()
      .accounts({
        voteAccount: voteBank.publicKey,
      })
      .signers([voteBank])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Vote for YES", async () => {
    const tx = await program.methods.gibVote({yes: {}})
      .accounts({
        voteAccount: voteBank.publicKey,
      })
      .rpc();
      console.log("Transaction hash:" ,tx);

      let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
      console.log(`Total Yes: ${voteBankData.yes}`);
      console.log(`Total No: ${voteBankData.no}`);
  })

  it("Vote for NO", async () => {
    const tx = await program.methods.gibVote({no: {}})
      .accounts({
        voteAccount: voteBank.publicKey,
      })
      .rpc();
      console.log("transaction hash:", tx);

      let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
      console.log(`Total Yes: ${voteBankData.yes}`);
      console.log(`Total No: ${voteBankData.no}`);
  })
});
