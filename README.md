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
## test account
```
{
  "accounts": [
    {
      "address": "io1kuqfm45933ea7l8p48kuglaa26ytstezs2lrts",
      "ethAddress": "0xb7009dd6858c73df7ce1a9edc47fbd5688b82f22",
      "privateKey": "449e725560cd54b853e0825662b8d5c8fcb4e0516fe5a0a1509df4c4b9484d87",
      "publicKey": "048bd8fc85cdfc3fd1e3377f4c60eca5bd1ab49a1ac69ea6551fbfb74c9295999b5d155909e3f6f9f04fb52e03a84732e5a472ae88512a436958a334f74f416702"
    }
  ]
}
```

To install dependencies:
```bash
bun install
```

To run:

```bash
bun run examples/base-flow/index.ts
bun examples/with-contract-flow/index.ts
```

This project was created using `bun init` in bun v1.0.6. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
