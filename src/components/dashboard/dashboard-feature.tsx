'use client';

import { useEffect, useRef, useState } from 'react';
import { createQR, encodeURL, findReference, FindReferenceError, TransactionRequestURLFields } from '@solana/pay';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ConfirmedSignatureInfo, Keypair, PublicKey, Connection, SolanaJSONRPCError, TransactionSignature, clusterApiUrl } from '@solana/web3.js';

const MERCHANT_WALLET = new PublicKey("7UhsoPTm5oYq3eubg4RpYgr2xAVY7L9RxLbSNhufg9yh");


export default function DashboardFeature() {

  const { connection } = useConnection();
  const qrRef = useRef<HTMLDivElement>(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showQR, setShowQR] = useState(false);


  const startPaymentTransfer = async () => {
    setShowQR(true);
    console.log('\n2. 🛍 Simulate a customer checkout \n');
    const reference = new Keypair().publicKey;


    const params = new URLSearchParams()
    params.append("reference", reference.toString());
    const apiUrl = `${location.protocol}//${location.host
      }/api/hello?${params.toString()}`
    const urlFields: TransactionRequestURLFields = {
      link: new URL(apiUrl),
    }
    const url = encodeURL(urlFields)
    // orking through api's
    // const SOLANA_PAY_URL = `solana:https://mini-project-e3-s2.vercel.app//api/hello`
    console.log(url);
    const qr = createQR(url, 360, 'white', 'black');
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
    setPaymentStatus("Pending....")

    console.log('\n5. Find the transaction');

    const signatureInfo = await new Promise<ConfirmedSignatureInfo>((resolve, reject) => {
      const interval = setInterval(async () => {
        console.count('Checking for transaction...');
        try {
          const result = await findReference(connection, reference, { finality: 'confirmed' });
          console.log(result);
          console.log('\n 🖌  Signature found: ', result.signature);
          clearInterval(interval);
          resolve(result);
        } catch (error: any) {
          if (!(error instanceof FindReferenceError)) {
            // console.error(error);
            clearInterval(interval);
            reject(error);
          }
        }
      }, 2000);
      //  Add a timeout of 5 minutes
      const timeout = setTimeout(() => {
        clearInterval(interval);
        console.log('❌ Payment timeout reached.');
        setPaymentStatus("Timeout Reached");
        reject(new Error('Payment timeout reached'));
      }, 2 * 60 * 1000); // 5 minutes in milliseconds
    });
    let { signature } = signatureInfo;
    setPaymentStatus("Confirmed");
    const transaction = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0,
    });
    console.log(transaction);
    if (!transaction || !transaction.meta) {
      console.error('Transaction not found or incomplete');
      return false;
    }
    if (transaction.meta.err) {
      console.error('Transaction failed with error:', transaction.meta.err);
      return false;
    }

  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        <button onClick={startPaymentTransfer}>StartPayment</button>
        {
          showQR &&
          <>
            <h1 className="text-3xl">Scan QR Code to Pay</h1>
            <div ref={qrRef} />
            <p>Status: <strong>{paymentStatus}</strong></p>
          </>
        }
      </div>
        
    </div>
  );
}
