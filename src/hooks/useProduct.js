
export default function useProduct() {
  
  function addCommaToPrice (price) {
    if(parseInt(price/1000)) return parseInt(price/1000).toString() + ',' + (price%1000).toString()
    return price.toString()
  }

  return {
    addCommaToPrice
  };
}