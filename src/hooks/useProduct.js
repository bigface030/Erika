
export default function useProduct() {
  
  function addCommaToPrice (price) {
    if(parseInt(price/1000)) return parseInt(price/1000).toString() + ',' + parseInt(price%1000/100).toString() + parseInt(price%100/10).toString() + parseInt(price%10).toString()
    return price.toString()
  }

  return {
    addCommaToPrice
  };
}