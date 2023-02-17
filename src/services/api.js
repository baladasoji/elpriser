
import configData from './config.json'

const baseurl= configData.BASE_URL
const eventid= configData.EVENT_ID


export const getFuturePrices = () => {
  var todayDate = new Date().toISOString().slice(0, 10);
  return fetch ("https://api.energidataservice.dk/dataset/Elspotprices?filter={%22PriceArea%22:[%22DK2%22]}&columns=HourDK,SpotPriceDKK&start="+todayDate)
        .then (data=>data.json())
        .then (data=>updateCharges(data))
}

export const getTomorrowsPrices = () => {
  const today = new Date();
  const tomorrow  = new Date();
  const dayaftertomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  dayaftertomorrow.setDate(today.getDate()+2);
  var todayDate = today.toISOString().slice(0, 10);
  var tomorrowDate = tomorrow.toISOString().slice(0, 10);
  var dayAfterTomorrowDate = dayaftertomorrow.toISOString().slice(0, 10);
  return fetch ("https://api.energidataservice.dk/dataset/Elspotprices?filter={%22PriceArea%22:[%22DK2%22]}&columns=HourDK,SpotPriceDKK&start="+tomorrowDate+"&end="+dayAfterTomorrowDate)
        .then (data=>data.json())
        .then (data=>updateCharges(data))
}
export const getTodaysPrices = () => {
  const today = new Date();
  const tomorrow  = new Date();
  const dayaftertomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  dayaftertomorrow.setDate(today.getDate()+2);
  var todayDate = today.toISOString().slice(0, 10);
  var tomorrowDate = tomorrow.toISOString().slice(0, 10);
  return fetch ("https://api.energidataservice.dk/dataset/Elspotprices?filter={%22PriceArea%22:[%22DK2%22]}&columns=HourDK,SpotPriceDKK&start="+todayDate+"&end="+tomorrowDate)
        .then (data=>data.json())
        .then (data=>updateCharges(data))
}

const radiustarrif =  [ 16.3, 16.3, 16.3, 16.3, 16.3, 16.3, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 48.9, 146.7, 146.7, 146.7, 146.7,48.9, 48.9, 48.9]
const weekdays = ['Sun','Mon','Tue', 'Wed','Thu', 'Fri', 'Sat']
const elafgift = 1.0
const updateCharges =(data) => {
  data.records = data.records.reverse();
  data.records.forEach ( e=> { 
    e.elafgift=elafgift; 
    e.SpotPriceOre=e.SpotPriceDKK/10;
    const dt = new Date(e.HourDK)
    e.RadiusTarrif = radiustarrif[dt.getHours()]
    e.dow =weekdays[dt.getDay()]
    e.hod = dt.getHours()
    e.label = e.dow+ ' '+e.hod+':00'
    e.TotalPrice = e.elafgift + e.SpotPriceOre + e.RadiusTarrif
  })
  return data;
}
