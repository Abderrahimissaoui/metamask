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
}
