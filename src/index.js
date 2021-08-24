const Web3 = require('web3');

window.onload = () => {
  // Variables
  let web3;
  let from;
  let balance;

  // Elements
  const connectButton = document.getElementById('connect');
  const content = document.getElementById('content');
  const account = document.getElementById('account');
  const balancee = document.getElementById('balancee');

  // Form
  const form = document.getElementById('send');
  const amountInput = document.getElementById('amount');
  const recipientInput = document.getElementById('recipient');

  // Functions
  const connect = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);

      try {   
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        content.style.display = 'initial';
        connectButton.style.display = 'none';

        const accounts = await web3.eth.getAccounts();
        //console.log(accounts)

        from = accounts[0];

        //Balance
        web3.eth.getBalance(from, 'latest', function(err,res){
          balance = res/1000000000000000000 + " ETH"
          balancee.innerText = balance;
        });

        account.innerText = from;
        balancee.innerText = balance;
      } catch (err) {
        alert('Please accept the request');
      }
    } else {

      var chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
      var firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

      alert('Web3 is required');

      if (chrome) {
        window.location.href = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
      } else if (firefox) {
        window.location.href = "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
    }
  }
  };

  const transact = async (event) => {
    event.preventDefault();
    const amount = amountInput.value;
    const recipient = recipientInput.value;

    if (!web3.utils.isAddress(recipient)) {
      alert('Dirección inválida');
      return;
    }

    if (Number(amount) <= 0) {
      alert('Cantidad inválida');
      return;
    }

    if (Number(amount) >=1000) {
      alert('Cantidad inválida');
      return;
    }

    web3.eth.sendTransaction({
      from,
      to: recipient,
      value: amount*(1000000000000000000),
    });
  };
 
  
  //other wallet 0x433F2Cd330cBd883Ee8B3585b35E825590079c21   0x69acd290D113694F6530C7E4D66aFDF04e4596Aa

  // Listeners
  connectButton.onclick = connect;
  form.onsubmit = transact;
};
