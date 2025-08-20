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

## ⚡What’s New During the WCHL 2025
<table>
  <tr>
    <th colspan="4" align="center">🕰️ Old Features</th>
  </tr>
  <tr>
    <td align="center">
      <h3>🧮 Motoko</h3>
      <p>Native language of ICP, used for rapid prototyping of canisters.</p>
    </td>
    <td align="center">
      <h3>🔐 Internet Identity</h3>
      <p>Default identity system on ICP, easy to implement but limited wallet compatibility.</p>
    </td>
    <td align="center">
      <h3>🚫 Top-up</h3>
      <p>Users couldn't add tokens or credits directly into the app.</p>
    </td>
    <td align="center">
      <h3>💾 Stable Memory</h3>
      <p>Used ICP's stable memory for internal data storage.</p>
    </td>
  </tr>

  <tr>
    <th colspan="4" align="center">🚀 New Features</th>
  </tr>
  <tr>
    <td align="center">
      <h3>🦀 Rust</h3>
      <p>Faster, safer, and more powerful for advanced system and AI integration.</p>
    </td>
    <td align="center">
      <h3>👛 Plug Wallet</h3>
      <p>More flexible user authentication with wallet support for transactions and identity.</p>
    </td>
    <td align="center">
      <h3>💳 Top-up</h3>
      <p>Users can top-up credits using ICP tokens to unlock features.</p>
    </td>
    <td align="center">
      <h3>📦 IPFS</h3>
      <p>More scalable and decentralized file storage using IPFS integration.</p>
    </td>
  </tr>
</table>

<img src="https://pbs.twimg.com/media/GwjBQ-5bwAALWI7?format=jpg&name=4096x4096" />

## 📊 Architecture Workflow
<img src="https://pbs.twimg.com/media/GwmcmufbAAAG997?format=jpg&name=large" />

## 🔗 Get Started
### 📋 Prerequisites
```bash
# Open PowerShell on "Run as administrator" mode
# Enter the wsl --install command, then restart your machine.
wsl --install

# Open WSL, and install dfx.
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### ⚡ Installation Step
```bash
# Clone the repository using PowerShell
git clone https://github.com/WAW1311/dyahai-2.0.git
cd dyahai-2.0

# Open the project in VS Code
code .

# Rename `.env.example` to `.env`

# Fill in the values for the variables `STORACHA_API_KEY` and `STORACHA_PROOF` in `.env`
# You can find the values here:
https://pastelink.net/2i6qrerr

# Install all dependencies
npm install

# Open WSL Ubuntu and start dfx
dfx start --clean --background --host 127.0.0.1:5000

# Deploy locally
dfx deploy

# To deploy to production
dfx deploy --network ic

# You can find information about your canister project in the `.env.local` file

# Install Extension Plug Wallet
https://chromewebstore.google.com/detail/cfbfdhimifdmdehjmkdobpcjfefblkjm?utm_source=item-share-cb
```

## 🎥 Video Demonstration :  </br>
[Video demonstration](https://www.youtube.com/watch?v=-WW5aZ5AHNM)

## 👥 Contributors
<a href="https://github.com/iAnoeloeby"><img src="https://avatars.githubusercontent.com/u/55847059?v=4" title="hasbi" width="80" height="80"></a>
<a href="https://github.com/thoriqtau"><img src="https://avatars.githubusercontent.com/u/90580726?v=4" title="thoriq" width="80" height="80"></a>
<a href="https://github.com/lutfimizaki"><img src="https://avatars.githubusercontent.com/u/140836746?v=4" title="fadhil" width="80" height="80"></a>
<a href="https://github.com/WAW1311"><img src="https://avatars.githubusercontent.com/u/115858209?v=4" title="wahyu" width="80" height="80"></a>
<a href="https://github.com/yubayu0"><img src="https://avatars.githubusercontent.com/u/111375965?v=4" title="bayu" width="80" height="80"></a>

## 📄License
The code of DyahAI is released under the MIT License - see the [LICENSE](LICENSE) file for details.
