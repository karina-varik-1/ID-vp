const express = require('express');
const dateET = require('./src/dateTimeET');
const fs = require('fs').promises;
//moodul POST päringute lahtiharutamiseks, pärsimiseks
const bodyparser = require('body-parser');

const textRef = "public/txt/vanasonad.txt";
const regtextRef = "public/txt/visits.txt";

//käivitan funktsiooni express() ja annan nimeks app

const app = express();
//määrame renderdusmootori: EJS
app.set('view engine', 'ejs');
//määrame avalikuna kasutatava kataloogi
app.use(express.static('public'));
//määrame vormide sisu parimise
app.use(bodyparser.urlencoded({extended: false}));

//marsruudid
app.get('/', (req, res)=>{
	const dayNow = dateET.weekday();
	const dateNow = dateET.date(0);
	const timeNow = dateET.time();
	//res.send('Express.js veeb läkski käima!');
	res.render('index', {dayNow: dayNow, dateNow: dateNow, timeNow: timeNow});
});

app.get('/vanasona', async (req, res)=>{
	try {
		const data = await fs.readFile(textRef, "utf8");
		let folkWisdom = data.split(";");
		res.render('vanasona', {wisdom:folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))]});
	}
	catch (err) {
		console.log(err);
		res.render('vanasona', {wisdom: "Kahjuks ei leidnud ühtegi vanasõna!"});
	}
});
app.get('/regvisit', (req, res)=>{
	res.render('regvisit');
});
app.get('/miks', (req, res)=>{
	res.render('miks');
});
app.get('/last_visit', async (req, res)=>{
	try {
		const data = await fs.readFile(regtextRef, "utf8");
		const visits = data.split(";");
		const lastVisit = visits[visits.length - 2];
		const visitData = lastVisit.split(",");
		
		const name = visitData[0];
		const date = visitData[1];
		const time = visitData[2];
		
		res.render('last_visit', {
			name: name,
			date: date,
			time: time
		})
	}
	catch (err) {
		console.log(err);
	}
});

app.post('/regvisit', async (req, res)=>{
	try {
		const dateNow = dateET.date(0);
		const timeNow = dateET.time();
		
		await fs.open(regtextRef, 'a');
		await fs.appendFile(regtextRef, req.body.inputName + "," + dateNow + "," + timeNow + ";");
		
		res.render('regvisit');
	}
	catch (err) {
		console.log(err);
		res.render('regvisit');
	}
});
app.listen(5298);
