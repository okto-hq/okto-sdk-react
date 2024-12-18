# Okto React SDK

### Overview
The **Okto React SDK** is a powerful tool designed to onboard users to the Web3 ecosystem seamlessly within React applications. With minimal setup, developers can integrate multi-chain Web3 capabilities into their apps, including wallet management, token operations, and advanced smart contract interactions. This guide provides a comprehensive walkthrough for developers and contributors to get started, implement core features, and contribute to the SDK’s development.

---

### Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Core Features](#core-features)
6. [Advanced Features](#advanced-features)
7. [Error Handling](#error-handling)
8. [Contributing to the SDK](#contributing-to-the-sdk)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)
11. [Support](#support)

---

### Features

#### Supported Chains
- **EVM-Compatible Chains**: Ethereum, Polygon, Binance Smart Chain, and others.
- **Non-EVM Chains**: Solana, Aptos.
- **Upcoming Support**: Cosmos ecosystem.

#### Core Capabilities
- **Authentication**: Options include Google OAuth, Email OTP, and Phone OTP.
- **Wallet Management**: Create, manage, and interact with multiple wallets.
- **Token Operations**: Transfer and manage various tokens seamlessly.
- **NFT Integration**: Mint, transfer, and manage NFTs.
- **Smart Contract Interactions**: Directly interact with smart contracts.
- **Portfolio Management**: Track digital assets efficiently.
- **Customizable UI**: Easily adapt designs to match your application.

---

### Prerequisites

#### Development Environment
1. **Node.js** and **npm** (or **yarn**) installed.
2. React application setup with a compatible version.
3. Required dependencies installed (see [Installation](#installation)).

#### Credentials
- **Okto API Key**: Obtainable from the Okto Developer Dashboard.
- **Google OAuth Credentials**: Required for authentication.

#### Environment
- **Sandbox Environment**: Default for testing and development.
- **Production Environment**: Enabled through the Admin Panel.

---

### Installation

#### Method 1: Integrate into an Existing React App
```bash
npm install okto-sdk-react @react-oauth/google axios
```

#### Method 2: Use `create-okto-app`
For a preconfigured React app:
```bash
npx create-okto-app@latest
cd my-okto-app
npm install
```

#### Method 3: Next.js Integration
```bash
npx create-okto-app@latest
# Select Next.js template
cd my-okto-app
npm install
```

---

### Configuration

#### Step 1: Environment Variables
Create a `.env` file in the project root:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_OKTO_CLIENT_API_KEY=your_okto_api_key
```

#### Step 2: SDK Provider Setup
Wrap your app with the `OktoProvider` in `index.js`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <OktoProvider apiKey={process.env.REACT_APP_OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <App />
      </OktoProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
```

---

### Core Features

#### 1. Google OAuth Authentication
Authenticate users with Google OAuth for seamless onboarding:
```jsx
import { GoogleLogin } from '@react-oauth/google';
import { useOkto } from 'okto-sdk-react';

const Login = () => {
  const { authenticate } = useOkto();

  const handleGoogleLogin = async (response) => {
    try {
      await authenticate(response.credential);
      console.log('User authenticated successfully!');
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  return <GoogleLogin onSuccess={handleGoogleLogin} />;
};
```

#### 2. Wallet Management
Create and manage wallets:
```jsx
const Wallets = () => {
  const { getWallets, createWallet } = useOkto();
  const [wallets, setWallets] = React.useState([]);

  React.useEffect(() => {
    const fetchWallets = async () => {
      const userWallets = await getWallets();
      setWallets(userWallets);
    };
    fetchWallets();
  }, []);

  const addWallet = async () => {
    const newWallet = await createWallet();
    setWallets((prev) => [...prev, newWallet]);
  };

  return (
    <div>
      <button onClick={addWallet}>Create Wallet</button>
      {wallets.map((wallet) => (
        <p key={wallet.address}>Address: {wallet.address}</p>
      ))}
    </div>
  );
};
```

#### 3. Token Transfers
Transfer tokens across supported networks:
```jsx
const Transfer = () => {
  const { transferTokens } = useOkto();

  const handleTransfer = async () => {
    try {
      await transferTokens({
        network_name: 'Ethereum',
        token_address: '0xTokenAddress',
        recipient_address: '0xRecipientAddress',
        quantity: '1',
      });
      console.log('Transfer successful!');
    } catch (err) {
      console.error('Transfer failed:', err);
    }
  };

  return <button onClick={handleTransfer}>Transfer Tokens</button>;
};
```

---

### Contributing to the SDK

#### Development Workflow
1. Clone the repository:
   ```bash
   git clone https://github.com/okto-hq/okto-sdk-react.git
   cd okto-sdk-react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests locally:
   ```bash
   npm test
   ```

#### Guidelines
- Write clear, concise, and reusable code.
- Adhere to the existing coding standards.
- Document new features and provide example implementations.

#### Issues and Feature Requests
Submit issues or feature requests via GitHub. Ensure you provide clear steps to reproduce bugs or detailed descriptions for feature suggestions.

---

### API Reference

#### Authentication
```typescript
authenticate(idToken: string): Promise<AuthResponse>;
logout(): void;
isLoggedIn(): boolean;
```

#### Wallet Operations
```typescript
getWallets(): Promise<Wallet[]>;
createWallet(): Promise<Wallet>;
getPortfolio(): Promise<Portfolio>;
```

#### Token Operations
```typescript
transferTokens(data: TransferData): Promise<TransactionReceipt>;
getSupportedTokens(): Promise<Token[]>;
```

---

### Troubleshooting

#### Common Issues
- **Authentication Errors**: Verify API keys and OAuth credentials.
- **Transaction Failures**: Check network configurations and wallet balances.
- **Network Connectivity**: Ensure proper RPC endpoints are configured.

#### Debugging Tips
1. Use browser dev tools to monitor network requests.
2. Log SDK responses for debugging purposes.

---

### Support
- **Documentation**: [Okto SDK Docs](https://sdk-docs.okto.tech/)
- **Email**: support@okto.tech

---

Built with ❤️ by the Okto team.

