const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const removeLoadinSpinner = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
};

// Get Quote From API
const getQuote = async () => {
    showLoadingSpinner();
    const index = Math.round(Math.random() * 1643);
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        authorText.innerText = data[index].author;

        // Reduce font size for long quotes
        if (data[index].text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data[index].text;

        removeLoadinSpinner();
    } catch (error) {
        console.log('whoops,no quote', error);
    }
};

// Twitter Function
const tweetQuote = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
};

// Event Listener

document.addEventListener('click', (e) => {
    if (e.target.matches('.new-quote')) {
        getQuote();
    }
    if (e.target.matches('#twitter') || e.target.matches('.fa-twitter')) {
        tweetQuote();
    }
});

// On Load
getQuote();
// Loading();
