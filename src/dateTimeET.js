const dateFormattedET = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	let monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	let folkMonthNamesET = ['näärikuu', 'küünlakuu', 'paastukuu', 'jürikuu', 'lehekuu', 'jaanikuu', 'heinakuu', 'lõikuskuu', 'mihklikuu', 'viinakuu', 'talvekuu', 'jõulukuu'];
	let rahvakalender = Math.round(Math.random() * 2);
	if(rahvakalender === 1){
		return dateNow + '. ' + folkMonthNamesET[monthNow] + ' ' + yearNow;
	} else{
		return dateNow + '. ' + monthNamesET[monthNow] + ' ' + yearNow;
	}
}

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	if(hourNow < 10){
		hourNow = '0' + hourNow;
	}
	if(minuteNow < 10){
		minuteNow = '0' + minuteNow;
	}
	if(secondNow < 10){
		secondNow = '0' + secondNow;
	}
	return hourNow + ':' + minuteNow + ':' + secondNow;
}
const weekdayFormattedET = function(){
	let timeNow = new Date();
	let weekdaysET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
	return weekdaysET[timeNow.getDay()];
}

//ekspordin kõik vajalikud funktsioonid koos mugavamate nimedega
module.exports = {time: timeFormattedET, date: dateFormattedET, weekday: weekdayFormattedET};
