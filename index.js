import axios from 'axios';

//--LINK TO TECEIPT DETAILS--//
const url = "https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1";

//--GET RECEIPT DETAILS FROM SERVER--//
axios.get(url)
.then(res=>{
    var products = res.data

    const compare = ( a, b )=> {
        
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }
      
      //--ALL PRODUCTS SORTED BY NAME--//
      var sortedByFirstLetter = products.sort( compare );
      
      //--DOMESTIC - FUNCTIONS--//
      const domestic = sortedByFirstLetter.filter(obj => obj.domestic);

      const domesticCost = ()=> {
        var sumDomestic = 0;
        domestic.forEach(item=>sumDomestic += item.price)
        return sumDomestic
      };
      let domesticCount = domestic.length;
      
      //--IMPORTED - FUNCTIONS--//
      const imported = sortedByFirstLetter.filter(obj => !(obj.domestic));

      const importedCost = ()=> {
        var sumImported = 0;
        imported.forEach(item=>sumImported += item.price)
        return sumImported
      };
      let importedCount = imported.length;

      //--TRUNCATE DESCRIPTION--//
      const truncate = (str, n)=>{
        return((str.description.length) >= n ? `${str.description.substr( 0, 10)}...` : str.description);
      }


    //----***RECEIPT***------------------------------------------------------------------------------//

      //PRINT LIST OFF DOMESTIC//
      console.log("     .Domestic");
      sortedByFirstLetter.forEach(item => {
        item.domestic &&
        console.log(
        `     ...${item.name}
        price:${item.price}
        ${truncate(item, 10)}
        weight:${item.hasOwnProperty('weight')? item.weight: 'N/A'}`
        );  
    });

      //PRINT LIST OFF IMPORTED//
      console.log("     .Imported");
      sortedByFirstLetter.forEach(item => {
        !item.domestic &&
        console.log(
        `     ...${item.name}
        price:${item.price}
        ${truncate(item, 10)}
        weight:${item.hasOwnProperty('weight')? item.weight: 'N/A'}`
        );  
    });

      //PRINT DOMESTIC COST//
        console.log(`     Domestic cost: $${Math.round(domesticCost() * 100/100).toFixed(1)}`);

      //PRINT IMPORTED COST//
        console.log(`     Imported cost: $${Math.round(importedCost() * 100/100).toFixed(1)}`);

      //PRINT DOMESTIC COUNT//
        console.log(`     Domestic count: ${domesticCount}`);

      //PRINT IMPORTED COUNT//
        console.log(`     Imported count: ${importedCount}`);

    //---***END OFF RECEIPT***------------------------------------------------------------------------//
})
.catch(err => {
  console.log(err.message);
})