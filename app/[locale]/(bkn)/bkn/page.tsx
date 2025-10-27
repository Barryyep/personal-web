'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

// Contract addresses and configuration
const CONTRACT_ADDRESS = "0x82dd6a7F33418dFcDF9Ea89A1098BFF9a8142Cf6"; // BKN
const FAUCET_ADDRESS = "0xDE39F03320202Bdc721Cd4FCB783Ee62B3DE972c"; // Faucet+Quiz
const NFT_ADDRESS = "0x1FD281D52F2963b8236Ace2C344E4B6e737556Ff"; // BokenOnlyNFT
const REQUIRED_CHAIN_ID = 11155111; // Sepolia
const REQUIRED_CHAIN_HEX = "0xaa36a7";
const REQUIRED_CHAIN_NAME = "Sepolia";
const REQUIRED_RPC = "https://rpc.sepolia.org";
const REQUIRED_SYMBOL = "ETH";
const REQUIRED_EXPLORER = "https://sepolia.etherscan.io";

// Minimal ERC-20 ABI
const ERC20_ABI = [
    { "type": "function", "name": "name", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "string" }] },
    { "type": "function", "name": "symbol", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "string" }] },
    { "type": "function", "name": "decimals", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint8" }] },
    { "type": "function", "name": "totalSupply", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs": [{ "type": "address", "name": "account" }], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "transfer", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "to" }, { "type": "uint256", "name": "value" }], "outputs": [{ "type": "bool" }] },
    { "type": "function", "name": "approve", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "spender" }, { "type": "uint256", "name": "value" }], "outputs": [{ "type": "bool" }] },
    { "type": "function", "name": "transferFrom", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "from" }, { "type": "address", "name": "to" }, { "type": "uint256", "name": "value" }], "outputs": [{ "type": "bool" }] },
    { "type": "function", "name": "allowance", "stateMutability": "view", "inputs": [{ "type": "address", "name": "owner" }, { "type": "address", "name": "spender" }], "outputs": [{ "type": "uint256" }] }
];

// Faucet+Quiz ABI
const FAUCET_ABI = [
    { "type": "function", "name": "faucetAmount", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "faucetCooldown", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "lastClaim", "stateMutability": "view", "inputs": [{ "type": "address" }], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "quizCooldown", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "lastQuizAt", "stateMutability": "view", "inputs": [{ "type": "address" }], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "getAB", "stateMutability": "view", "inputs": [{ "type": "address" }], "outputs": [{ "type": "uint256", "name": "a" }, { "type": "uint256", "name": "b" }] },
    { "type": "function", "name": "claimFaucet", "stateMutability": "nonpayable", "inputs": [], "outputs": [{ "type": "bool" }] },
    { "type": "function", "name": "claimByQuiz", "stateMutability": "nonpayable", "inputs": [{ "type": "uint256", "name": "answer" }, { "type": "uint256", "name": "reward" }], "outputs": [{ "type": "bool" }] },
    { "type": "function", "name": "rollQuestion", "stateMutability": "nonpayable", "inputs": [], "outputs": [{ "type": "bool" }] }
];

// NFT ABI
const NFT_ABI = [
    { "type": "function", "name": "name", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "string" }] },
    { "type": "function", "name": "symbol", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "string" }] },
    { "type": "function", "name": "maxSupply", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "totalMinted", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "mintPriceBKN", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "tokenURI", "stateMutability": "view", "inputs": [{ "type": "uint256", "name": "tokenId" }], "outputs": [{ "type": "string" }] },
    { "type": "function", "name": "balanceOf", "stateMutability": "view", "inputs": [{ "type": "address", "name": "owner" }], "outputs": [{ "type": "uint256" }] },
    { "type": "function", "name": "ownerOf", "stateMutability": "view", "inputs": [{ "type": "uint256", "name": "tokenId" }], "outputs": [{ "type": "address" }] },
    { "type": "function", "name": "mint", "stateMutability": "nonpayable", "inputs": [{ "type": "uint256", "name": "quantity" }], "outputs": [] }
];

declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function BKNPage() {
    const t = useTranslations('BKN');
    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);
    const [token, setToken] = useState<any>(null);
    const [faucet, setFaucet] = useState<any>(null);
    const [nft, setNft] = useState<any>(null);
    const [account, setAccount] = useState<string>('-');
    const [network, setNetwork] = useState<string>('-');
    const [decimals, setDecimals] = useState<number>(18);

    // Token metadata
    const [tokenName, setTokenName] = useState<string>('-');
    const [tokenSymbol, setTokenSymbol] = useState<string>('-');
    const [tokenDecimals, setTokenDecimals] = useState<string>('-');
    const [totalSupply, setTotalSupply] = useState<string>('-');
    const [status, setStatus] = useState<string>('');

    // Balance
    const [balanceAddr, setBalanceAddr] = useState<string>('');
    const [balance, setBalance] = useState<string>('');

    // Transfer
    const [transferTo, setTransferTo] = useState<string>('');
    const [transferAmount, setTransferAmount] = useState<string>('');
    const [transferTx, setTransferTx] = useState<string>('');
    const [transferLoading, setTransferLoading] = useState<boolean>(false);

    // Approve
    const [spender, setSpender] = useState<string>('');
    const [approveAmount, setApproveAmount] = useState<string>('');
    const [approveTx, setApproveTx] = useState<string>('');
    const [approveLoading, setApproveLoading] = useState<boolean>(false);

    // TransferFrom
    const [tfOwner, setTfOwner] = useState<string>('');
    const [tfTo, setTfTo] = useState<string>('');
    const [tfAmount, setTfAmount] = useState<string>('');
    const [tfTx, setTfTx] = useState<string>('');
    const [tfLoading, setTfLoading] = useState<boolean>(false);

    // Allowance
    const [allowanceOwner, setAllowanceOwner] = useState<string>('');
    const [allowanceSpender, setAllowanceSpender] = useState<string>('');
    const [allowanceAmount, setAllowanceAmount] = useState<string>('');

    // Faucet
    const [faucetAmount, setFaucetAmount] = useState<string>('-');
    const [faucetCooldown, setFaucetCooldown] = useState<string>('-');
    const [faucetCountdown, setFaucetCountdown] = useState<string>('-');
    const [faucetBalance, setFaucetBalance] = useState<string>('-');
    const [faucetTx, setFaucetTx] = useState<string>('');
    const [faucetLoading, setFaucetLoading] = useState<boolean>(false);

    // Quiz
    const [quizQuestion, setQuizQuestion] = useState<string>('-');
    const [quizCooldown, setQuizCooldown] = useState<string>('-');
    const [quizCountdown, setQuizCountdown] = useState<string>('-');
    const [quizAnswer, setQuizAnswer] = useState<string>('');
    const [quizReward, setQuizReward] = useState<string>('');
    const [quizTx, setQuizTx] = useState<string>('');
    const [quizLoading, setQuizLoading] = useState<boolean>(false);
    const [rollTx, setRollTx] = useState<string>('');
    const [rollLoading, setRollLoading] = useState<boolean>(false);

    const [faucetMeta, setFaucetMeta] = useState<any>({ amount: 0n, cooldown: 0n, last: 0n });
    const [quizMeta, setQuizMeta] = useState<any>({ cooldown: 0n, last: 0n, a: 0n, b: 0n });

    // NFT states
    const [nftName, setNftName] = useState<string>('-');
    const [nftSymbol, setNftSymbol] = useState<string>('-');
    const [nftMaxSupply, setNftMaxSupply] = useState<string>('-');
    const [nftTotalMinted, setNftTotalMinted] = useState<string>('-');
    const [nftMintPrice, setNftMintPrice] = useState<string>('-');
    const [nftBalance, setNftBalance] = useState<string>('-');
    const [mintQuantity, setMintQuantity] = useState<string>('1');
    const [mintTx, setMintTx] = useState<string>('');
    const [mintLoading, setMintLoading] = useState<boolean>(false);
    const [userNFTs, setUserNFTs] = useState<any[]>([]);
    const [allNFTs, setAllNFTs] = useState<any[]>([]);
    const [nftLoading, setNftLoading] = useState<boolean>(false);

    // Helper function to convert IPFS URI to HTTP gateway
    const ipfsToHttp = (uri: string) => {
        if (!uri) return '';
        if (uri.startsWith('ipfs://')) {
            return uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
        if (uri.startsWith('http')) {
            return uri;
        }
        return `https://ipfs.io/ipfs/${uri}`;
    };

    // Fetch NFT metadata from tokenURI
    const fetchNFTMetadata = async (tokenURI: string) => {
        try {
            const httpUri = ipfsToHttp(tokenURI);
            const response = await fetch(httpUri);
            const metadata = await response.json();
            return metadata;
        } catch (e) {
            console.error('Error fetching NFT metadata:', e);
            return null;
        }
    };

    const fmt = useCallback((x: bigint, d = decimals) => {
        return ethers.formatUnits(x, d);
    }, [decimals]);

    const parse = useCallback((x: string, d = decimals) => {
        return ethers.parseUnits(x, d);
    }, [decimals]);

    const nowSec = () => Math.floor(Date.now() / 1000);
    const max0 = (x: number) => x > 0 ? x : 0;
    const fmtSec = (s: number) => {
        s = Math.max(0, s | 0);
        if (s === 0) return t('ready');
        if (s < 60) return `${s}s`;
        const m = Math.floor(s / 60), r = s % 60;
        return `${m}m ${r}s`;
    };

    const updateCountdowns = useCallback(() => {
        const t = nowSec();
        const fLeft = Number(faucetMeta.last) + Number(faucetMeta.cooldown) - t;
        const qLeft = Number(quizMeta.last) + Number(quizMeta.cooldown) - t;
        setFaucetCountdown(fmtSec(max0(fLeft)));
        setQuizCountdown(fmtSec(max0(qLeft)));
    }, [faucetMeta, quizMeta]);

    useEffect(() => {
        const timer = setInterval(updateCountdowns, 1000);
        return () => clearInterval(timer);
    }, [updateCountdowns]);

    const ensureWallet = async () => {
        if (!window.ethereum) throw new Error("MetaMask not found");

        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const [addr] = await browserProvider.send("eth_requestAccounts", []);
        const web3Signer = await browserProvider.getSigner();

        setProvider(browserProvider);
        setSigner(web3Signer);
        setAccount(addr);

        return { browserProvider, web3Signer, addr };
    };

    const ensureNetwork = async (browserProvider: any) => {
        const net = await browserProvider.getNetwork();
        setNetwork(`${net.name} (#${net.chainId})`);

        if (Number(net.chainId) !== REQUIRED_CHAIN_ID) {
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: REQUIRED_CHAIN_HEX }]
                });
            } catch (e: any) {
                if (e.code === 4902) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: REQUIRED_CHAIN_HEX,
                            chainName: REQUIRED_CHAIN_NAME,
                            nativeCurrency: { name: "Sepolia Ether", symbol: REQUIRED_SYMBOL, decimals: 18 },
                            rpcUrls: [REQUIRED_RPC],
                            blockExplorerUrls: [REQUIRED_EXPLORER]
                        }]
                    });
                } else {
                    throw e;
                }
            }
        }
    };

    const connectContracts = (web3Signer: any) => {
        const tokenContract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, web3Signer);
        const faucetContract = new ethers.Contract(FAUCET_ADDRESS, FAUCET_ABI, web3Signer);
        const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, web3Signer);
        setToken(tokenContract);
        setFaucet(faucetContract);
        setNft(nftContract);
        return { tokenContract, faucetContract, nftContract };
    };

    const loadTokenMeta = async (tokenContract: any) => {
        setStatus('Loading...');
        const [n, s, d, ts] = await Promise.all([
            tokenContract.name(),
            tokenContract.symbol(),
            tokenContract.decimals(),
            tokenContract.totalSupply(),
        ]);
        const dec = Number(d);
        setDecimals(dec);
        setTokenName(n);
        setTokenSymbol(s);
        setTokenDecimals(d.toString());
        setTotalSupply(ethers.formatUnits(ts, dec));
        setStatus('');
    };

    const loadFaucetMeta = async (faucetContract: any, tokenContract: any, addr: string) => {
        const [amt, cd, last, quizCd, lastQ, ab, poolRaw] = await Promise.all([
            faucetContract.faucetAmount(),
            faucetContract.faucetCooldown(),
            faucetContract.lastClaim(addr),
            faucetContract.quizCooldown(),
            faucetContract.lastQuizAt(addr),
            faucetContract.getAB(addr),
            tokenContract.balanceOf(FAUCET_ADDRESS),
        ]);

        setFaucetMeta({ amount: amt, cooldown: cd, last: last });
        setQuizMeta({ cooldown: quizCd, last: lastQ, a: ab[0], b: ab[1] });

        setFaucetAmount(`${fmt(amt)} ${tokenSymbol || "BKN"}`);
        setFaucetCooldown(`${cd} s`);
        setQuizCooldown(`${quizCd} s`);
        setQuizQuestion(`${ab[0]} + ${ab[1]} = ?`);
        setFaucetBalance(fmt(poolRaw));

        updateCountdowns();
    };

    const loadNFTMeta = async (nftContract: any, addr: string) => {
        try {
            const [name, symbol, maxSupply, totalMinted, mintPrice, balance] = await Promise.all([
                nftContract.name(),
                nftContract.symbol(),
                nftContract.maxSupply(),
                nftContract.totalMinted(),
                nftContract.mintPriceBKN(),
                nftContract.balanceOf(addr),
            ]);

            setNftName(name);
            setNftSymbol(symbol);
            setNftMaxSupply(maxSupply.toString());
            setNftTotalMinted(totalMinted.toString());
            setNftMintPrice(fmt(mintPrice));
            setNftBalance(balance.toString());
        } catch (e: any) {
            console.error('Error loading NFT metadata:', e);
        }
    };

    const loadUserNFTs = async (nftContract: any, addr: string) => {
        try {
            setNftLoading(true);
            const balance = await nftContract.balanceOf(addr);
            const totalMinted = await nftContract.totalMinted();

            // Find all NFTs owned by the user
            const ownedTokens: any[] = [];
            for (let i = 1; i <= Number(totalMinted); i++) {
                try {
                    const owner = await nftContract.ownerOf(i);
                    if (owner.toLowerCase() === addr.toLowerCase()) {
                        const tokenURI = await nftContract.tokenURI(i);
                        const metadata = await fetchNFTMetadata(tokenURI);
                        ownedTokens.push({
                            tokenId: i,
                            owner,
                            tokenURI,
                            metadata,
                            image: metadata ? ipfsToHttp(metadata.image) : null,
                            name: metadata?.name || `Token #${i}`,
                            description: metadata?.description || ''
                        });
                    }
                } catch (e) {
                    // Token doesn't exist or error
                    continue;
                }
            }
            setUserNFTs(ownedTokens);
        } catch (e: any) {
            console.error('Error loading user NFTs:', e);
        } finally {
            setNftLoading(false);
        }
    };

    const loadAllNFTs = async (nftContract: any) => {
        try {
            setNftLoading(true);
            const totalMinted = await nftContract.totalMinted();
            const nfts: any[] = [];

            for (let i = 1; i <= Number(totalMinted); i++) {
                try {
                    const owner = await nftContract.ownerOf(i);
                    const tokenURI = await nftContract.tokenURI(i);
                    const metadata = await fetchNFTMetadata(tokenURI);
                    nfts.push({
                        tokenId: i,
                        owner,
                        tokenURI,
                        metadata,
                        image: metadata ? ipfsToHttp(metadata.image) : null,
                        name: metadata?.name || `Token #${i}`,
                        description: metadata?.description || ''
                    });
                } catch (e) {
                    // Token doesn't exist or error
                    continue;
                }
            }
            setAllNFTs(nfts);
        } catch (e: any) {
            console.error('Error loading all NFTs:', e);
        } finally {
            setNftLoading(false);
        }
    };

    const handleConnect = async () => {
        try {
            const { browserProvider, web3Signer, addr } = await ensureWallet();
            await ensureNetwork(browserProvider);
            const { tokenContract, faucetContract, nftContract } = connectContracts(web3Signer) || {};
            if (tokenContract && faucetContract && nftContract) {
                await loadTokenMeta(tokenContract);
                await loadFaucetMeta(faucetContract, tokenContract, addr);
                await loadNFTMeta(nftContract, addr);
                await loadUserNFTs(nftContract, addr);
            }
        } catch (e: any) {
            setStatus(`${t('error')}: ${e.message}`);
            console.error(e);
        }
    };

    const handleSwitchNetwork = async () => {
        try {
            await ensureWallet();
            await ensureNetwork(provider);
            setStatus("Switched to Sepolia");
            await handleConnect();
        } catch (e: any) {
            setStatus(`${t('error')}: ${e.message}`);
        }
    };

    const handleCheckBalance = async () => {
        try {
            const a = balanceAddr.trim() || account;
            const raw = await token.balanceOf(a);
            setBalance(`${ethers.formatUnits(raw, decimals)} ${tokenSymbol || "BKN"}`);
        } catch (e: any) {
            setBalance(`${t('error')}: ${e.message}`);
        }
    };

    const handleTransfer = async () => {
        setTransferLoading(true);
        try {
            const to = transferTo.trim();
            const amt = transferAmount.trim();
            if (!to || !amt) throw new Error("Missing 'to' or 'amount'");
            const tx = await token.transfer(to, parse(amt));
            setTransferTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setTransferTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
            await handleCheckBalance();
            if (token && faucet) {
                await loadTokenMeta(token);
                await loadFaucetMeta(faucet, token, account);
            }
        } catch (e: any) {
            setTransferTx(`${t('error')}: ${e.message}`);
        } finally {
            setTransferLoading(false);
        }
    };

    const handleApprove = async () => {
        setApproveLoading(true);
        try {
            const sp = spender.trim();
            const apv = approveAmount.trim();
            if (!sp || !apv) throw new Error("Missing spender or amount");
            const tx = await token.approve(sp, parse(apv));
            setApproveTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setApproveTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
        } catch (e: any) {
            setApproveTx(`${t('error')}: ${e.message}`);
        } finally {
            setApproveLoading(false);
        }
    };

    const handleTransferFrom = async () => {
        setTfLoading(true);
        try {
            const owner = tfOwner.trim() || account;
            const to = tfTo.trim();
            const amt = tfAmount.trim();
            if (!owner || !to || !amt) throw new Error("Missing owner/to/amount");
            const tx = await token.transferFrom(owner, to, parse(amt));
            setTfTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setTfTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
        } catch (e: any) {
            setTfTx(`${t('error')}: ${e.message}`);
        } finally {
            setTfLoading(false);
        }
    };

    const handleCheckAllowance = async () => {
        try {
            const owner = allowanceOwner.trim() || account;
            const sp = allowanceSpender.trim() || spender.trim();
            if (!owner || !sp) throw new Error("Missing owner/spender");
            const raw = await token.allowance(owner, sp);
            setAllowanceAmount(`${ethers.formatUnits(raw, decimals)} ${tokenSymbol || "BKN"}`);
        } catch (e: any) {
            setAllowanceAmount(`${t('error')}: ${e.message}`);
        }
    };

    const handleClaimFaucet = async () => {
        setFaucetLoading(true);
        try {
            const tx = await faucet.claimFaucet();
            setFaucetTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setFaucetTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
            if (faucet && token) {
                await loadFaucetMeta(faucet, token, account);
            }
            await handleCheckBalance();
        } catch (e: any) {
            setFaucetTx(`${t('error')}: ${e.message}`);
        } finally {
            setFaucetLoading(false);
        }
    };

    const handleClaimQuiz = async () => {
        setQuizLoading(true);
        try {
            const answer = quizAnswer.trim();
            if (!answer) throw new Error("Fill answer");
            const tx = await faucet.claimByQuiz(BigInt(answer), parse("2"));
            setQuizTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setQuizTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
            if (faucet && token) {
                await loadFaucetMeta(faucet, token, account);
            }
            await handleCheckBalance();
        } catch (e: any) {
            setQuizTx(`${t('error')}: ${e.message}`);
        } finally {
            setQuizLoading(false);
        }
    };

    const handleRollQuestion = async () => {
        setRollLoading(true);
        try {
            const tx = await faucet.rollQuestion();
            setRollTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setRollTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);
            if (faucet && token) {
                await loadFaucetMeta(faucet, token, account);
            }
        } catch (e: any) {
            setRollTx(`${t('error')}: ${e.message}`);
        } finally {
            setRollLoading(false);
        }
    };

    const handleMintNFT = async () => {
        setMintLoading(true);
        try {
            const qty = parseInt(mintQuantity);
            if (!qty || qty <= 0) throw new Error("Invalid quantity");

            // Calculate total cost
            const mintPriceRaw = await nft.mintPriceBKN();
            const totalCost = mintPriceRaw * BigInt(qty);

            // First, approve the NFT contract to spend BKN
            const allowance = await token.allowance(account, NFT_ADDRESS);
            if (allowance < totalCost) {
                setMintTx(`${t('pending')}: Approving BKN...`);
                const approveTx = await token.approve(NFT_ADDRESS, totalCost);
                await approveTx.wait();
                setMintTx(`BKN Approved. ${t('pending')}: Minting...`);
            }

            // Then mint
            const tx = await nft.mint(qty);
            setMintTx(`${t('pending')}: ${tx.hash}`);
            const r = await tx.wait();
            setMintTx(`${t('confirmed')} ${r.blockNumber} · ${tx.hash}`);

            // Refresh data
            if (nft && token) {
                await loadNFTMeta(nft, account);
                await loadUserNFTs(nft, account);
                await handleCheckBalance();
            }
        } catch (e: any) {
            setMintTx(`${t('error')}: ${e.message}`);
        } finally {
            setMintLoading(false);
        }
    };

    const handleLoadAllNFTs = async () => {
        if (nft) {
            await loadAllNFTs(nft);
        }
    };

    // Auto-connect on mount
    useEffect(() => {
        if (window.ethereum) {
            handleConnect().catch(() => { });
        }
    }, []);

    // Listen to network/account changes
    useEffect(() => {
        if (window.ethereum) {
            const handleChainChanged = () => window.location.reload();
            const handleAccountsChanged = () => window.location.reload();

            window.ethereum.on?.('chainChanged', handleChainChanged);
            window.ethereum.on?.('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener?.('chainChanged', handleChainChanged);
                window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
            };
        }
    }, []);

    return (
        <main className="container mx-auto px-4 py-12">
            {/* Header */}
            <section className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
                <p className="text-xl text-[var(--fg-muted)]">{t('subtitle')}</p>
            </section>

            {/* Wallet Connection */}
            <section className="card p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <div>
                        <div className="text-sm text-[var(--fg-muted)] mb-1">{t('connectedAccount')}</div>
                        <div className="font-mono text-sm break-all">{account}</div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <button onClick={handleConnect} className="btn-primary px-4 py-2 rounded-lg">
                            {t('connectWallet')}
                        </button>
                        <button onClick={handleSwitchNetwork} className="btn px-4 py-2 rounded-lg">
                            {t('switchNetwork')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Token Info */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('tokenInfo')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('address')}</div>
                        <div className="font-mono text-sm break-all">{CONTRACT_ADDRESS}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('network')}</div>
                        <div className="font-mono text-sm">{network}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('name')}</div>
                        <div>{tokenName}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('symbol')}</div>
                        <div>{tokenSymbol}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('decimals')}</div>
                        <div>{tokenDecimals}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('totalSupply')}</div>
                        <div>{totalSupply}</div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => token && loadTokenMeta(token)} className="btn px-4 py-2 rounded-lg">
                        {t('refresh')}
                    </button>
                    {status && <span className="text-sm text-[var(--fg-muted)]">{status}</span>}
                </div>
            </section>

            {/* Balances */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('balances')}</h2>
                <div className="flex flex-col md:flex-row gap-2 flex-wrap">
                    <input
                        type="text"
                        value={balanceAddr}
                        onChange={(e) => setBalanceAddr(e.target.value)}
                        placeholder={t('addressPlaceholder')}
                        className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button onClick={handleCheckBalance} className="btn px-4 py-2 rounded-lg">
                        {t('balanceOf')}
                    </button>
                </div>
                {balance && <div className="mt-2 font-mono text-sm">{balance}</div>}
            </section>

            {/* Transfer */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('transfer')}</h2>
                <div className="flex flex-col md:flex-row gap-2 flex-wrap mb-2">
                    <input
                        type="text"
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                        placeholder={t('transferTo')}
                        className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <input
                        type="text"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder={t('amount')}
                        className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button onClick={handleTransfer} disabled={transferLoading} className="btn-primary px-4 py-2 rounded-lg disabled:opacity-50">
                        {t('send')}
                    </button>
                </div>
                {transferTx && <div className="mt-2 font-mono text-sm break-all">{transferTx}</div>}
            </section>


            {/* Faucet */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('faucet')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('faucetAddress')}</div>
                        <div className="font-mono text-sm break-all">{FAUCET_ADDRESS}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('faucetAmount')}</div>
                        <div>{faucetAmount}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('cooldown')}</div>
                        <div>{faucetCooldown}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('nextClaimIn')}</div>
                        <div>{faucetCountdown}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('faucetBalance')}</div>
                        <div>{faucetBalance}</div>
                    </div>
                </div>
                <button onClick={handleClaimFaucet} disabled={faucetLoading} className="btn-primary px-4 py-2 rounded-lg disabled:opacity-50">
                    {t('claimFaucet')}
                </button>
                {faucetTx && <div className="mt-2 font-mono text-sm break-all">{faucetTx}</div>}
            </section>

            {/* Quiz */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{t('quiz')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('question')}</div>
                        <div className="font-mono">{quizQuestion}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('cooldown')}</div>
                        <div>{quizCooldown}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">{t('nextClaimIn')}</div>
                        <div>{quizCountdown}</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 flex-wrap mb-4">
                    <input
                        type="text"
                        value={quizAnswer}
                        onChange={(e) => setQuizAnswer(e.target.value)}
                        placeholder={t('answer')}
                        className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button onClick={handleClaimQuiz} disabled={quizLoading} className="btn-primary px-4 py-2 rounded-lg disabled:opacity-50">
                        {t('claimByQuiz')} (2 BKN)
                    </button>
                </div>
                {quizTx && <div className="mb-4 font-mono text-sm break-all">{quizTx}</div>}
                <button onClick={handleRollQuestion} disabled={rollLoading} className="btn px-4 py-2 rounded-lg disabled:opacity-50">
                    {t('refreshQuestion')}
                </button>
                {rollTx && <div className="mt-2 font-mono text-sm break-all">{rollTx}</div>}
            </section>

            {/* NFT Section */}
            <section className="card p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">BokenOnly NFT</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">NFT Contract Address</div>
                        <div className="font-mono text-sm break-all">{NFT_ADDRESS}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">Name</div>
                        <div>{nftName}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">Symbol</div>
                        <div>{nftSymbol}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">Mint Price</div>
                        <div>{nftMintPrice} BKN</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">Minted / Max Supply</div>
                        <div>{nftTotalMinted} / {nftMaxSupply}</div>
                    </div>
                    <div>
                        <div className="text-sm text-[var(--fg-muted)]">Your NFT Balance</div>
                        <div>{nftBalance}</div>
                    </div>
                </div>

                {/* Mint NFT */}
                <div className="border-t border-[var(--border)] pt-4 mt-4">
                    <h3 className="text-xl font-semibold mb-3">Mint NFT</h3>
                    <div className="flex flex-col md:flex-row gap-2 flex-wrap mb-2">
                        <input
                            type="number"
                            value={mintQuantity}
                            onChange={(e) => setMintQuantity(e.target.value)}
                            placeholder="Quantity"
                            min="1"
                            className="flex-1 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
                        />
                        <button onClick={handleMintNFT} disabled={mintLoading} className="btn-primary px-4 py-2 rounded-lg disabled:opacity-50">
                            Mint NFT
                        </button>
                    </div>
                    {mintTx && <div className="mt-2 font-mono text-sm break-all">{mintTx}</div>}
                </div>

                {/* User's NFTs */}
                {userNFTs.length > 0 && (
                    <div className="border-t border-[var(--border)] pt-4 mt-4">
                        <h3 className="text-xl font-semibold mb-3">Your NFTs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userNFTs.map((nft) => (
                                <div key={nft.tokenId} className="border border-[var(--border)] rounded-lg overflow-hidden">
                                    {nft.image && (
                                        <div className="w-full aspect-square bg-[var(--bg-muted)] relative">
                                            <img
                                                src={nft.image}
                                                alt={nft.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="text-lg font-semibold mb-1">{nft.name}</div>
                                        <div className="text-sm text-[var(--fg-muted)] mb-2">Token #{nft.tokenId}</div>
                                        {nft.description && (
                                            <p className="text-sm text-[var(--fg-muted)] line-clamp-2 mb-2">{nft.description}</p>
                                        )}
                                        {nft.metadata?.attributes && (
                                            <div className="mt-2 space-y-1">
                                                {nft.metadata.attributes.slice(0, 3).map((attr: any, idx: number) => (
                                                    <div key={idx} className="text-xs">
                                                        <span className="text-[var(--fg-muted)]">{attr.trait_type}: </span>
                                                        <span className="font-medium">{attr.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All NFTs */}
                <div className="border-t border-[var(--border)] pt-4 mt-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold">All Minted NFTs</h3>
                        <button onClick={handleLoadAllNFTs} disabled={nftLoading} className="btn px-3 py-1 rounded-lg disabled:opacity-50 text-sm">
                            {nftLoading ? 'Loading...' : 'Load All NFTs'}
                        </button>
                    </div>
                    {allNFTs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allNFTs.map((nft) => (
                                <div key={nft.tokenId} className="border border-[var(--border)] rounded-lg overflow-hidden">
                                    {nft.image && (
                                        <div className="w-full aspect-square bg-[var(--bg-muted)] relative">
                                            <img
                                                src={nft.image}
                                                alt={nft.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="text-lg font-semibold mb-1">{nft.name}</div>
                                        <div className="text-sm text-[var(--fg-muted)] mb-2">Token #{nft.tokenId}</div>
                                        <div className="text-xs mb-2">
                                            <span className="text-[var(--fg-muted)]">Owner: </span>
                                            <span className="font-mono break-all">{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</span>
                                        </div>
                                        {nft.description && (
                                            <p className="text-sm text-[var(--fg-muted)] line-clamp-2 mb-2">{nft.description}</p>
                                        )}
                                        {nft.metadata?.attributes && (
                                            <div className="mt-2 space-y-1">
                                                <div className="text-xs font-semibold text-[var(--fg-muted)] mb-1">Attributes:</div>
                                                {nft.metadata.attributes.slice(0, 3).map((attr: any, idx: number) => (
                                                    <div key={idx} className="text-xs">
                                                        <span className="text-[var(--fg-muted)]">{attr.trait_type}: </span>
                                                        <span className="font-medium">{attr.value}</span>
                                                    </div>
                                                ))}
                                                {nft.metadata.attributes.length > 3 && (
                                                    <div className="text-xs text-[var(--fg-muted)]">
                                                        +{nft.metadata.attributes.length - 3} more
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="mt-2 pt-2 border-t border-[var(--border)]">
                                            <a
                                                href={ipfsToHttp(nft.tokenURI)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--accent)] hover:underline text-xs"
                                            >
                                                View Metadata →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

