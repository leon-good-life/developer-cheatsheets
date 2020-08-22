window.openPDF = () => {
    window.location = `${window.location.href}.pdf`;
}

AOS.init();

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'UA-121688555-2');