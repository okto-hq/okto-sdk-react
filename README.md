# Okto React SDK

The easiest way to onboard your users to web3 in your React application. With just ten minutes of setup time, you can integrate a complete Web3 solution into your React app.

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation Methods](#installation-methods)
4. [Configuration](#configuration)
5. [Core Features Implementation](#core-features-implementation)
6. [Advanced Features](#advanced-features)
7. [Error Handling](#error-handling)
8. [API Reference](#api-reference)
9. [Troubleshooting](#troubleshooting)

## Features

### Chain Support
- **EVM Chains**: Ethereum, Polygon, Binance Smart Chain, and other EVM-compatible networks
- **Non-EVM Chains**: Solana and Aptos
- **Coming Soon**: Cosmos ecosystem support

### Core Capabilities
- **Authentication**: Multiple methods including Google OAuth, Email OTP, Phone OTP
- **Wallet Management**: Create and manage multiple wallets
- **Token Operations**: Transfer and manage various tokens
- **NFT Support**: Mint, transfer, and manage NFTs
- **Smart Contract Integration**: Direct contract interactions
- **Portfolio Management**: Track and manage digital assets
- **Customizable UI**: Progressive onboarding with adaptable design

## Prerequisites

1. **Development Environment**
   - Node.js and npm/yarn installed
   - React project setup
   - Required dependencies (check package.json)

2. **Required Keys**
   - Okto API Key (obtain from Okto Dashboard)
   - Google OAuth credentials (for authentication)

3. **Environment**
   - Default: Sandbox environment
   - Production: Available through Admin Panel

## Installation Methods

### Method 1: Create React App

```bash
# Create new app
npx create-react-app my-okto-app
cd my-okto-app

# Install dependencies
npm install okto-sdk-react @react-oauth/google axios
```

### Method 2: create-okto-app (React)

```bash
# Create new Okto React app
npx create-okto-app@latest
# Choose 'React' template
cd my-okto-app
npm install
```

### Method 3: create-okto-app (Next.js)

```bash
# Create new Okto Next.js app
npx create-okto-app@latest
# Choose 'Next JS' template
cd my-okto-app
npm install
```

## Configuration

### Environment Setup

Create `.env` file in project root:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_OKTO_CLIENT_API_KEY=your_okto_api_key
```

### Basic Implementation

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// App.js
import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <OktoProvider 
      apiKey={process.env.REACT_APP_OKTO_CLIENT_API_KEY} 
      buildType={BuildType.SANDBOX}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </OktoProvider>
  );
}
```

## Core Features Implementation

### 1. Google OAuth Authentication

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOkto } from 'okto-sdk-react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { authenticate } = useOkto();
  const [error, setError] = useState(null);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      authenticate(credentialResponse.credential, (authResponse, error) => {
        if (authResponse) {
          localStorage.setItem('okto_auth_token', authResponse.auth_token);
          navigate('/dashboard');
        } else if (error) {
          setError('Authentication failed: ' + error.message);
        }
      });
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={(error) => setError('Login Failed: ' + error.message)}
        useOneTap
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
```

### 2. Wallet Management

```jsx
import React, { useState, useEffect } from 'react';
import { useOkto } from 'okto-sdk-react';

const WalletManagement = () => {
  const { getWallets, createWallet } = useOkto();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const walletsData = await getWallets();
      setWallets(walletsData);
    } catch (err) {
      setError('Failed to fetch wallets: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const newWallet = await createWallet();
      setWallets([...wallets, newWallet]);
    } catch (err) {
      setError('Failed to create wallet: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCreateWallet} disabled={loading}>
        Create New Wallet
      </button>
      
      {wallets.map((wallet) => (
        <div key={wallet.address}>
          <p>Address: {wallet.address}</p>
          <p>Balance: {wallet.balance}</p>
        </div>
      ))}
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
```

### 3. Token Transfers

```jsx
import React, { useState } from 'react';
import { useOkto } from 'okto-sdk-react';

const TokenTransfer = () => {
  const { transferTokens } = useOkto();
  const [formData, setFormData] = useState({
    network_name: '',
    token_address: '',
    quantity: '',
    recipient_address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await transferTokens({
        ...formData,
        quantity: String(formData.quantity)
      });
    } catch (err) {
      setError('Transfer failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleTransfer}>
      <input
        name="network_name"
        value={formData.network_name}
        onChange={(e) => setFormData({...formData, network_name: e.target.value})}
        placeholder="Network Name"
        required
      />
      {/* Add other form fields */}
      <button type="submit" disabled={loading}>
        Transfer
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};
```

## API Reference

### Authentication Methods

```typescript
interface OktoAuth {
  authenticate(idToken: string, callback: AuthCallback): void;
  sendEmailOTP(email: string): Promise<void>;
  verifyEmailOTP(email: string, otp: string): Promise<void>;
  sendPhoneOTP(phone: string, countryCode: string): Promise<void>;
  verifyPhoneOTP(phone: string, countryCode: string, otp: string): Promise<void>;
  isLoggedIn(): boolean;
  logOut(): void;
}
```

### Wallet Operations

```typescript
interface OktoWallet {
  getWallets(): Promise<Wallet[]>;
  createWallet(): Promise<Wallet>;
  getPortfolio(): Promise<Portfolio>;
}
```

### Token Operations

```typescript
interface OktoToken {
  transferTokens(data: TokenTransferData): Promise<TransferResponse>;
  transferTokensWithJobStatus(data: TokenTransferData): Promise<TransferResponse>;
  getSupportedTokens(): Promise<Token[]>;
}
```

### NFT Operations

```typescript
interface OktoNFT {
  transferNft(data: NFTTransferData): Promise<TransferResponse>;
  getNftOrderDetails(query: OrderQuery): Promise<OrderDetails>;
}
```

## Troubleshooting

### Common Issues

1. Authentication Failures
   - Verify Google OAuth credentials
   - Check API key validity
   - Ensure proper callback URL configuration

2. Transaction Errors
   - Insufficient funds
   - Invalid network configuration
   - Gas price issues
   - Contract permission errors

3. Network Issues
   - Check network support
   - Verify network configuration
   - Ensure proper RPC endpoints

### Best Practices

1. Error Handling
```javascript
try {
  const result = await operation();
  handleSuccess(result);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    handleInsufficientFunds();
  } else if (error.code === 'NETWORK_ERROR') {
    handleNetworkError();
  } else {
    handleGenericError(error);
  }
}
```

2. Token Validation
```javascript
const validateTokenTransfer = (data) => {
  if (!data.network_name) throw new Error('Network name required');
  if (!data.token_address) throw new Error('Token address required');
  if (isNaN(data.quantity) || data.quantity <= 0) throw new Error('Invalid quantity');
  if (!data.recipient_address) throw new Error('Recipient address required');
};
```

## Support

- Documentation: https://sdk-docs.okto.tech/
- Email: support@okto.tech

---

Built with ❤️ by the Okto team