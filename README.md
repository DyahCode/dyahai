#  🤖DyahAI: Decentralized Platform for Generative Images

<div align="center">
<img src="https://pbs.twimg.com/media/GwjBQ-lb0AAbVkL?format=jpg&name=medium" width="50%">
<p></p>

![ICP](https://img.shields.io/badge/Internet_Computer-Protocol-blue.svg?style=for-the-badge&logo=internetcomputer)
![React](https://img.shields.io/badge/react-grey.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)
![Ledger](https://img.shields.io/badge/Ledger-orange?style=for-the-badge&logo=ledger&logoColor=white)
![IPFS](https://img.shields.io/badge/Storage-IPFS-blue?style=for-the-badge&logo=ipfs&logoColor=white)

[🚀 Live Demo Mainnet](https://hvfji-caaaa-aaaau-abx7q-cai.icp0.io/)

</div>

---
# WCHL 2025 Hackathon Project

## 🌟 Introduction
<p align="justify">
DyahAI is an AI platform that lets users transform ordinary images into unique works of art with customizable styles. Powered by Web3 technology and smart contracts. DyahAI offers a secure, decentralized, and high-quality experience, producing high-resolution images suitable for various needs.
</p>

## 📋 Problem Summary
- **High Cost of Digital Art Creation**: Creating digital art usually requires expensive software, which many users cannot afford.
- **Time-Consuming Process**: Manual illustration takes a significant amount of time, which is not practical for users who want quick results.
- **Lack of Customization**: Offering basic text-to-image generation without the ability to guide pose or style.
- **High Hardware Requirements**: Running the model locally requires a high-VRAM GPU.

## ✨ Our Solution
- **Free Credits for New Users**: Provide free usage quotas for users, with the option to top up without obligation.
- **AI-Powered Art Generation**: Allows users to generate digital art from photos in just a few seconds using advanced AI models.
- **Various Artistic Styles**: Can choose from a variety of pre-defined visual styles, without needing prompts.
- **Serverless GPU**: Providing backend inference through cloud-based GPUs so that users do not need to own dedicated hardware.

## 🏆 Pre-existing Project
DyahAI is the winning project of Hackathon 7.0 organized by ICP Hub Indonesia. At WCHL 2025, DyahAI continued its innovation journey by expanding its capabilities and introducing a range of new features aimed at enhancing user experience, and technological integration.

## ⚡What’s New During the WCHL Regional Round 2025
<table cellspacing="0" cellpadding="8">
  <tr>
    <th colspan="4" align="center">🕰️ Old Features</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <h3>Credit</h3>
      <p>Credits were implemented as an internal balance system stored directly in the canister.</p>
    </td>
    <td align="center" valign="top">
      <h3>Payment</h3>
      <p>Payments in the dapp were processed by deducting balances from this internal credit system.</p>
    </td>
    <td align="center" valign="top">
      <h3>Top-up</h3>
      <p>Users topped up their credits by converting ICP payments into changes on the simulated credit balance.</p>
    </td>
    <td align="center" valign="top">
      <h3>Limited Transparency</h3>
      <p>Transactions and credit usage were only recorded internally, making them inaccessible for public verification.</p>
    </td>
  </tr>

  <tr>
    <th colspan="4" align="center">🚀 New Features</th>
  </tr>
  <tr>
    <td align="center" valign="top">
      <h3>Dyah AI Token</h3>
      <p>DYA tokens are issued following the ICRC ledger standard, ensuring interoperability and security.</p>
    </td>
    <td align="center" valign="top">
      <h3>Token Burning</h3>
      <p>Dapp payments are executed by burning DYA tokens from the user’s balance.</p>
    </td>
    <td align="center" valign="top">
      <h3>Token Minting</h3>
      <p>Users can request new DYA tokens to be minted by depositing a defined amount of ICP.</p>
    </td>
    <td align="center" valign="top">
      <h3>Blockchain Explorer</h3>
      <p>All token transfers and activities are publicly available through the DyahAI token ledger explorer.</p>
    </td>
  </tr>
</table>

<img src="https://bafybeihef6cylhmlpjcl57i5czryevwn3fwz5gdhxwjh5b352atrc7osrq.ipfs.w3s.link/homepage.png" />

## 📊 Architecture Workflow
<img src="https://pbs.twimg.com/media/GwmcmufbAAAG997?format=jpg&name=large" />

## 🔗 Get Started
### 📋 Prerequisites
Install WSL on PowerShell 
```bash
wsl --install
```

Open WSL, and install dfx.
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### ⚡ Installation Step
1. Clone the repository using PowerShell
```bash
git clone https://github.com/WAW1311/dyahai-2.0.git
```

2. Rename `.env.example` to `.env`
   
3. Copy `STORACHA_API_KEY` and `STORACHA_PROOF` links below and paste them into the `.env` file <br>
https://pastelink.net/2i6qrerr

4. Copy your dfx identity principal `MINTER_PRINCIPAL_ID` from the command below and paste it into the `.env` file
```bash
dfx identity get-principal
```

5. Install all dependencies
```bash
npm install
```

6. Run deployment using bash script
```bash
bash deploy.sh
```

#### ⚠️ If you want to deploy to mainnet (Internet Computer):
7. Open the `deploy.sh` file and add the `--network ic` flag to every command starting with `dfx` (except `dfx start`) <br>
e.g., change `dfx deploy backend` to `dfx deploy backend --network ic`

8. Install Extension Plug Wallet
```bash
https://chromewebstore.google.com/detail/cfbfdhimifdmdehjmkdobpcjfefblkjm?utm_source=item-share-cb
```

## 🛠️ Extra Step for Local Deployment </br>

- **If you deploy locally, make sure to switch Plug Wallet into Dev/Test Mode**:

1. Open the Plug Wallet extension in your browser.
2. Click the three dots icon in the top right corner.
3. Select Settings.
4. Go to the Developer Zone.
5. Enable Test Mode.
6. Done ✅ (now your wallet can connect to http://127.0.0.1:5000).

## 🎥 Video Demonstration  </br>
[Video demonstration](https://youtu.be/zvcZufyHNoc?si=mux5XDI6TI78YeeU)

## 🎥 Pitch Deck  </br>
[Pitch Deck](https://drive.google.com/file/d/1DV04JlF6NE5jtphdk5nDT44hM4onbm1l/view?usp=sharing)

## 🎥 Pitch Video </br>
[Pitch Video](https://youtu.be/zvmsngTkHn4)

## 👥 Contributors
<a href="https://github.com/iAnoeloeby"><img src="https://avatars.githubusercontent.com/u/55847059?v=4" title="hasbi" width="80" height="80"></a>
<a href="https://github.com/thoriqtau"><img src="https://avatars.githubusercontent.com/u/90580726?v=4" title="thoriq" width="80" height="80"></a>
<a href="https://github.com/lutfimizaki"><img src="https://avatars.githubusercontent.com/u/140836746?v=4" title="fadhil" width="80" height="80"></a>
<a href="https://github.com/WAW1311"><img src="https://avatars.githubusercontent.com/u/115858209?v=4" title="wahyu" width="80" height="80"></a>
<a href="https://github.com/yubayu0"><img src="https://avatars.githubusercontent.com/u/111375965?v=4" title="bayu" width="80" height="80"></a>

## 📄License
The code of DyahAI is released under the MIT License - see the [LICENSE](LICENSE) file for details.
