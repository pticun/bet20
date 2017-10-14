export let staticsData = {

}

export let marketsData = {

}

export let detailsData : any = {

}

export let totaldata : any
export let demostring : number = 1


export const addData = (newItem: any) => {
  totaldata.push({
    name: newItem
  });
}

export const setData = (newArray : any) => {
  totaldata = newArray
}
export const setDataStr = (str : any) => {
  demostring = str
}
