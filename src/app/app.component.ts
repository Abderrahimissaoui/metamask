import { Component } from '@angular/core';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'metamask';

  enableEthereum() {
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    // TODO this is a promise
    ethereum.request({ method: 'eth_requestAccounts' });
  }

  async getAccount() {
    console.log('getAccount');
    const showAccount = document.querySelector('.showAccount');
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as any;
    const account = accounts[0];
    console.log(accounts);
    showAccount!.innerHTML = account;
  }

  async waitForAccount(): Promise<void> {
    console.log('waitForAccount');
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    const showAccount = document.querySelector('.showAccount');
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as any;
            console.log(accounts);
            if (accounts!.length > 0) {
              showAccount!.innerHTML = accounts[0];
            }
        } catch (e) {
          console.log(e) 
        }
  }

  async selectedAddress(): Promise<void> {
    console.log('selectedAddress');
    const ethereum = window.ethereum as MetaMaskInpageProvider;
    const selectedAddress = document.querySelector('.selectedAddress');
        try {
          const accounts = ethereum.selectedAddress as any;
            console.log(accounts);
            selectedAddress!.innerHTML = accounts;
        } catch (e) {
          console.log(e) 
        }
  }

  async sendTransaction(toAddress: string, value: string){



    const ethereum = window.ethereum as MetaMaskInpageProvider;
    console.log(toAddress);
    
    if(toAddress.toLowerCase() == ethereum.selectedAddress?.toLowerCase()) {
      alert('you are sending to the same account youuu idiot');
    } else {
      const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        gas: '0x5208', // customizable by user during MetaMask confirmation.
        to: toAddress, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        value: value, // Only required to send ether to the recipient from the initiating external account.
        data:
          '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
        chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
    }

  }
}
