const navLinks = document.querySelectorAll('.nav-links li a');
const myCanvas = document.querySelector('.my-canvas');
const modalClose = document.querySelectorAll('.modal-close');

const walletContent = document.querySelector('.wallet-content');
const walletSidebarLinks = document.querySelectorAll('.wallet-sidebar > ul > li');

const walletBtns = document.querySelectorAll('.wallet-btns button');

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

navLinks.forEach(
  function(navlink) {
      navlink.addEventListener('click', function () {
          myCanvas.classList.add(navlink.dataset.linkClass)
      })
  },
  'myThisArg'
);

function resetWalletModal(){
  document.querySelectorAll('.wallet--modals>div').forEach(function (modal) {
    console.log('removing class from modal', modal);modal.classList.remove('wallet-active');
  });
}

walletBtns.forEach(
  function(btn) {
      btn.addEventListener('click', function () {
          myCanvas.classList.add(btn.dataset.linkClass);
          resetWalletModal();
          document.querySelector(`.${btn.dataset.modal}`).classList.add('wallet-active')
      })
  },
  'myThisArg'
);


modalClose.forEach(
  function(modalLink) {
    modalLink.addEventListener('click', function () {
      myCanvas.className ="my-canvas"
    })
  },
  'myThisArg'
);

function resetWalletContentClass() {
  walletContent.className = "wallet-content";
}

function resetWalletLinksClass() {
  walletSidebarLinks.forEach(function (link) {
      link.classList.remove('w-active')
  });
}

walletSidebarLinks.forEach(function (link) {
    var linkChild = link.querySelector('a');

    linkChild.addEventListener('click', function () {
        resetWalletContentClass();
        walletContent.classList.add(linkChild.dataset.linkClass);
        resetWalletLinksClass();
        link.classList.add('w-active');
    })
});
