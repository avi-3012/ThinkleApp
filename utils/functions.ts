import { PopulationData } from "@/types";

export function formatNumberWithCommas(number:number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  export const getPopulationGrowth = (startYear:string, endYear:string, populationList:PopulationData[]) => {
    const startYearPopulation = populationList.filter((item:PopulationData)=>item.Year === startYear)[0].Population;
    const endYearPopulation = populationList.filter((item:PopulationData)=>item.Year === endYear)[0].Population;
    return formatNumberWithCommas(endYearPopulation - startYearPopulation);
  }

  export const getPopulationGrowthPercentage = (startYear:string, endYear:string, populationList:PopulationData[]) => {
    const startYearPopulation = populationList.filter((item:PopulationData)=>item.Year === startYear)[0].Population;
    const endYearPopulation = populationList.filter((item:PopulationData)=>item.Year === endYear)[0].Population;
    return (((endYearPopulation - startYearPopulation)/startYearPopulation)*100).toFixed(2);
  }

  export const getYearlyGrowthPercentage = (populationList:PopulationData[]) => {
    const getYearlyGrowthPercentageList = populationList.map((item,index)=>{
        if(index>0){
            const startYearPopulation = populationList[index-1].Population;
            const endYearPopulation = item.Population;
            return (((endYearPopulation - startYearPopulation)/startYearPopulation)*100).toFixed(2);
        }
        return 0;
    }).filter((item)=>item!==0);
    return getYearlyGrowthPercentageList;
  }