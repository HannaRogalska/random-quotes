import './style.css'

const quoteText = document.getElementById("quoteText") as HTMLParagraphElement | null;
const loadQuoteBtn = document.getElementById("loadQuoteBtn") as HTMLButtonElement | null;
if (!quoteText || !loadQuoteBtn) throw new Error("Elements not found");


interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}
const getFetchQuote = async ():Promise<void> => { 
  try {
    const targetUrl =
      "https://quoteslate.vercel.app/api/quotes/random"
    const res = await fetch(targetUrl);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: QuoteResponse = await res.json();
    if (data === null) {
      throw new Error("No data received");
    }
    quoteText.textContent = `${data.quote} - ${data.author}`; 
  } catch (error) {
    console.log("Error fetching quote:", error);    
  }
}
loadQuoteBtn.addEventListener("click", (e: MouseEvent) => { 
  e.preventDefault();
  getFetchQuote();
  
})
