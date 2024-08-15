# ioid-register-demo

## file structure
```
📦with-contract-flow（Code with the full contract example）
 ┣ 📂abi
 ┃ ┗ 📜index.ts (abi for storing contracts)
 ┣ 📜device.ts (Analulated devices, can be software or hardware)
 ┣ 📜index.ts 
 ┣ 📜service.ts (Services used for verify signatures)
 ┗ 📜verifyProxy.ts (Calls the verifyProxy registration method）
 ```


To install dependencies:
```bash
bun install
pnpm add @spruceid/didkit (run postinstall. bun has the compatibility issues)
```

To run:

```bash
bun run examples/base-flow/index.ts
bun examples/with-contract-flow/index.ts
```

This project was created using `bun init` in bun v1.0.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
