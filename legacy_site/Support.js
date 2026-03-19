const niftyData = [
  { date: '2023-07-01', price: 16000.00 },
  { date: '2023-07-02', price: 16050.25 },
  { date: '2023-07-03', price: 15980.50 },
  { date: '2023-07-04', price: 16100.75 },
  { date: '2023-07-05', price: 16025.00 },
  { date: '2023-07-06', price: 16075.50 },
  { date: '2023-07-07', price: 16125.00 },
  { date: '2023-07-08', price: 16150.75 },
  { date: '2023-07-09', price: 16200.00 },
  { date: '2023-07-10', price: 16225.50 }
];

const sensexData = [
  { date: '2023-07-01', price: 54000.00 },
  { date: '2023-07-02', price: 54100.75 },
  { date: '2023-07-03', price: 53950.50 },
  { date: '2023-07-04', price: 54200.25 },
  { date: '2023-07-05', price: 54050.00 },
  { date: '2023-07-06', price: 54150.75 },
  { date: '2023-07-07', price: 54250.00 },
  { date: '2023-07-08', price: 54300.50 },
  { date: '2023-07-09', price: 54400.00 },
  { date: '2023-07-10', price: 54450.25 }
];

const bankNiftyData = [
  { date: '2023-07-01', price: 32000.00 },
  { date: '2023-07-02', price: 32050.50 },
  { date: '2023-07-03', price: 31980.75 },
  { date: '2023-07-04', price: 32100.25 },
  { date: '2023-07-05', price: 32025.00 },
  { date: '2023-07-06', price: 32075.75 },
  { date: '2023-07-07', price: 32125.00 },
  { date: '2023-07-08', price: 32150.50 },
  { date: '2023-07-09', price: 32200.00 },
  { date: '2023-07-10', price: 32225.25 }
];

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  console.log("Financial News Landing Page Loaded");

  // Update Nifty, Sensex, and Bank Nifty prices every 3 seconds
  updateIndexPrices();
  setInterval(updateIndexPrices, 3000);
});

function updateIndexPrices() {
  const niftyPrice = niftyData[currentIndex].price;
  const sensexPrice = sensexData[currentIndex].price;
  const bankNiftyPrice = bankNiftyData[currentIndex].price;

  document.getElementById('nifty-price').textContent = niftyPrice.toFixed(2);
  document.getElementById('sensex-price').textContent = sensexPrice.toFixed(2);
  document.getElementById('banknifty-price').textContent = bankNiftyPrice.toFixed(2);

  document.getElementById('nifty-change').textContent = calculateChange(niftyData[currentIndex - 1]?.price, niftyPrice, 'Nifty');
  document.getElementById('sensex-change').textContent = calculateChange(sensexData[currentIndex - 1]?.price, sensexPrice, 'Sensex');
  document.getElementById('banknifty-change').textContent = calculateChange(bankNiftyData[currentIndex - 1]?.price, bankNiftyPrice, 'Bank Nifty');

  currentIndex = (currentIndex + 1) % niftyData.length;
}

function calculateChange(previousPrice, currentPrice, indexName) {
  if (previousPrice === undefined) {
    return ""; // No change to display for the first update
  }

  const change = (currentPrice - previousPrice).toFixed(2);
  const percentChange = ((change / previousPrice) * 100).toFixed(2);

  return `${change} (${percentChange}%)`;
}
function toggleContent() {
    const content = document.getElementById('newsContent');
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}
const newsData = [
  { title: "Sensex and Nifty Set Record Highs Amid Strong Energy and Media Stock Performance", content: "On July 30, 2024, the BSE Sensex closed at 81,455.40, up by 99.56 points, while the NSE Nifty finished at 24,857.30, gaining 21.20 points. Both indices reached record highs, driven by strong performances in energy and media stocks. Notable gainers included NTPC and Tata Motors, while financial stocks faced pressure towards the end of the trading session." },
  { title: "Dr. Reddy's Q1 Profit Declines 1% Despite 14% Revenue Growth", content: "Dr. Reddy's Laboratories reported a net profit of ₹1,392 crore for Q1 FY25, reflecting a 0.9% year-on-year decline. Despite this, the company's revenue rose by 14% to ₹7,672 crore, surpassing analysts' estimates. Growth was primarily driven by a 20% increase in North American sales, attributed to higher volumes and new product launches. The company continues to invest strategically in its core generics business and other sectors." },
  { title: "ICICI Bank Q1 Profit Soars 15% to ₹11,059 Crore, NII Up 7%", content: "ICICI Bank reported a 14.6% year-on-year profit increase for Q1 FY25, reaching ₹11,059 crore, surpassing analyst expectations. The net interest income rose by 7.3% to ₹19,552.9 crore, while the net interest margin slightly decreased to 4.36%. The bank's total advances grew by 15.7%, with a notable 35.6% increase in the business banking portfolio, reflecting robust growth in lending and deposits." },
  { title: "NTPC Declares ₹3 Dividend with Record Date Set for August 7 Following 11% Profit Rise.", content: "NTPC has announced a record date of August 7 for a ₹3 dividend following an 11% year-on-year profit increase in Q1 FY25. The company reported a robust performance, reflecting its strong operational efficiency and commitment to shareholder returns. This marks NTPC's ongoing trend of consistent dividend payments, enhancing its attractiveness to investors in the power sector." },
  { title: "REC Announces ₹3.50 Interim Dividend with Record Date on August 16", content: "REC has declared an interim dividend of ₹3.50 per share for the financial year 2024-25, with a record date set for August 16. This announcement reflects the company's commitment to rewarding shareholders. The dividend will be credited to eligible shareholders' accounts by August 23, continuing REC's tradition of consistent dividend payouts to enhance investor confidence in the company." },
  { title: "Spandana Sphoorty Q1 Net Profit Plunges 53% Amid Tough Market Conditions", content: "Spandana Sphoorty Financial reported a 53% year-on-year decline in net profit for Q1 FY25, totaling ₹55.7 crore, attributed to challenging market conditions and rising credit costs. The company’s assets under management grew by 32% to ₹11,723 crore. Analysts noted a significant impact from high attrition rates and operational challenges, leading to a 41% drop in share value year-to-date." },
  { title: "Post-Budget Market Trends: Analysts Advocate Cautious Approach for Long-Term Growth", content: "Analysts recommend a cautious approach to the markets post-budget, citing potential headwinds like a weak monsoon and regulatory changes. However, India's strong macroeconomic fundamentals, including robust GDP growth, fiscal stability, and healthy corporate earnings, suggest long-term growth opportunities. Investors are advised to focus on fundamentally sound stocks and sectors poised to benefit from the budget's initiatives" },
];

const container = document.getElementById('news-container');

newsData.forEach(news => {
  const newsItem = document.createElement('div');
  newsItem.classList.add('tree-node');
  newsItem.innerHTML = `
        <h3>
            <span class="indicator">▶</span>
            ${news.title}
        </h3>
        <div class="content">${news.content}</div>
    `;

  newsItem.onclick = () => {
    const content = newsItem.querySelector('.content');
    const indicator = newsItem.querySelector('.indicator');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    newsItem.classList.toggle('expanded');
  };

  container.appendChild(newsItem);
});
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.star');
    const currentRatingDisplay = document.getElementById('currentRating');
    const fiveStarCountDisplay = document.getElementById('fiveStarCount');
    let fiveStarCount = 0;

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = this.getAttribute('data-value');
            currentRatingDisplay.textContent = rating;

            // Update the five-star count if rating is 5
            if (rating == 5) {
                fiveStarCount++;
                fiveStarCountDisplay.textContent = fiveStarCount;
            }
        });
    });

    // Handle comment submission
    const commentForm = document.getElementById('commentForm');
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const comment = commentForm.querySelector('textarea').value;
        alert('Thank you for your comment: ' + comment);
        commentForm.reset();
    });
});
