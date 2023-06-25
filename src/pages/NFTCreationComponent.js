import React, { useState } from 'react';
import { AccountId, PrivateKey, Client, TokenCreateTransaction, TokenType, TokenSupplyType, TokenMintTransaction } from "@hashgraph/sdk";

const aliceId = AccountId.fromString(process.env.ALICE_ACCOUNT_ID);
const aliceKey = PrivateKey.fromString(process.env.ALICE_PRIVATE_KEY);

const client = Client.forTestnet().setOperator(aliceId, aliceKey);

const NFTCreationComponent = () => {
  const [cid, setCID] = useState('');

  const createAndMintNFT = async () => {
    try {
      // Create token
      const tokenCreateTransaction = await new TokenCreateTransaction()
        .setTokenName("My NFT")
        .setTokenSymbol("NFT")
        .setTokenType(TokenType.NonFungibleUnique)
        .setDecimals(0)
        .setInitialSupply(0)
        .setTreasuryAccountId(aliceId)
        .setSupplyType(TokenSupplyType.Finite)
        .setMaxSupply(10)
        .setSupplyKey(aliceKey)
        .freezeWith(client);

      const tokenCreateTransactionSign = await tokenCreateTransaction.sign(aliceKey);
      const tokenCreateTransactionSubmit = await tokenCreateTransactionSign.execute(client);
      const tokenCreateReceipt = await tokenCreateTransactionSubmit.getReceipt(client);
      const tokenId = tokenCreateReceipt.tokenId;

      // Mint token
      const tokenMintTransaction = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .setMetadata([Buffer.from(cid)])
        .freezeWith(client);

      const tokenMintTransactionSign = await tokenMintTransaction.sign(aliceKey);
      const tokenMintTransactionSubmit = await tokenMintTransactionSign.execute(client);
      const tokenMintReceipt = await tokenMintTransactionSubmit.getReceipt(client);
      const serial = tokenMintReceipt.serials[0].low;

      console.log(`- Created NFT ${tokenId} with serial: ${serial}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCIDChange = (event) => {
    setCID(event.target.value);
  };

  return (
    <div>
      <label htmlFor="cid-input">CID:</label>
      <input id="cid-input" type="text" value={cid} onChange={handleCIDChange} />
      <button onClick={createAndMintNFT}>Create and Mint NFT</button>
    </div>
  );
};

export default NFTCreationComponent;
