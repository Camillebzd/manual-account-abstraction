# Manual account abstraction

This repo contains the tutorial from Alchemy on [Account Abstraction from scratch](https://docs.alchemy.com/docs/smart-accounts-from-scratch).

Here are the commands to:
```
npm install
npx hardhat node
npx hh run scripts/deploy.ts --network localhost
npx hh run scripts/execute.ts --network localhost
npx hh run scripts/test.ts --network localhost
```

If you want to simulate multiple User Operations, modify the `execute.ts` file and remove the initCode from the userOP.