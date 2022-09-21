// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	filmingLocations.sort((a,b)=>  new Date(b.fields.date_debut)- new Date(a.fields.date_debut))
	return filmingLocations
}
sortFilmingLocationsByStartDate ()
console.log(`the most recent :`)
console.log(filmingLocations[0])
console.log('The oldest :')
console.log(filmingLocations[filmingLocations.length-1])

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let nbLocations=0
	for (let i=0; i<filmingLocations.length; i++){
		if(new Date(filmingLocations[i].fields.date_debut).getFullYear()==2020){
			nbLocations++
		}
	}
	return nbLocations
}
console.log(`There is ${getFilmingLocationsNumber2020()} locations in 2020`)

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	let nbLocations=0
	let minYear = new Date(filmingLocations[filmingLocations.length-1].fields.date_debut).getFullYear()
	let maxYear = new Date(filmingLocations[0].fields.date_debut).getFullYear()
	let pos=0
	let nbLocationsYear={}
	for (let i=maxYear; i>=minYear; i--){
		while(pos != filmingLocations.length && new Date(filmingLocations[pos].fields.date_debut).getFullYear() == i){
			nbLocations++
			pos++
		}
		nbLocationsYear[i.toString()]=nbLocations
		nbLocations=0
	}

	return nbLocationsYear
}
console.table(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let listelieu={}
	for (const tournage of filmingLocations) {
		if (tournage.fields.ardt_lieu in listelieu){
			listelieu[tournage.fields.ardt_lieu]++
		}
		else{
			listelieu[tournage.fields.ardt_lieu]=1
		}
	}
	return listelieu
}
console.log(getFilmingLocationsNumberPerDistrict ())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	let locationPerFilm={}
	for (const tournage of filmingLocations) {
		if (tournage.fields.nom_tournage in locationPerFilm){
			locationPerFilm[tournage.fields.nom_tournage]++
		}
		else{
			locationPerFilm[tournage.fields.nom_tournage]=1
		}
	}
	let listeLocationPerFilm=[]
	for (const nomFilm of Object.keys(locationPerFilm)){
		listeLocationPerFilm.push({film : nomFilm, locations : locationPerFilm[nomFilm]})
	}
	listeLocationPerFilm.sort((a,b)=> b.locations-a.locations)
	return listeLocationPerFilm
}
console.log(getFilmLocationsByFilm ())

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	let listeNomFilm=[]
	for (const tournage of filmingLocations) {
		if (listeNomFilm.indexOf(tournage.fields.nom_tournage)===-1){
			listeNomFilm.push(tournage.fields.nom_tournage)
		}
	}
	console.log(listeNomFilm)
	return listeNomFilm.length
}

console.log(getNumberOfFilms())

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let filmingLocationsLDRM= filmingLocations.filter(loc => loc.fields.nom_tournage===`LRDM - Patriot season 2`)
	return filmingLocationsLDRM
}

console.log(getArseneFilmingLocations ())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	let favoriteFilmsLocations = {}
	for (const film of favoriteFilmsNames){
		favoriteFilmsLocations[film]=[]
		for (const filmLoc of filmingLocations){
			if(filmLoc.fields.nom_tournage === film && favoriteFilmsLocations[film].indexOf(filmLoc.fields.ardt_lieu)===-1){
				favoriteFilmsLocations[film].push(filmLoc.fields.ardt_lieu)
			}
		}
	}
	return favoriteFilmsLocations
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

console.log(getFavoriteFilmsLocations (favoriteFilms))

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	let allFilmingLocations={}
	for (const filmLoc of filmingLocations){
		if (Object.keys(allFilmingLocations).indexOf(filmLoc.fields.nom_tournage) === -1){
			allFilmingLocations[filmLoc.fields.nom_tournage]=[filmLoc]
		}
		else{
			allFilmingLocations[filmLoc.fields.nom_tournage].push(filmLoc)
		}
	}
	return allFilmingLocations
}

console.log(getFilmingLocationsPerFilm())

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	let typeFilm={}
	for (const tournage of filmingLocations) {
		if (tournage.fields.type_tournage in typeFilm){
			typeFilm[tournage.fields.type_tournage]++
		}
		else{
			typeFilm[tournage.fields.type_tournage]=1
		}
	}
	return typeFilm
}

console.log(countFilmingTypes())

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	let countTypeFilm = countFilmingTypes()
	let listeTypeFilm=[]
	for (const typeFilm of Object.keys(countTypeFilm)){
		listeTypeFilm.push({type : typeFilm, count : countTypeFilm[typeFilm]})
	}
	listeTypeFilm.sort((a,b)=> b.count-a.count)
	return listeTypeFilm
}

console.log(sortedCountFilmingTypes())

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

function GetLongestLocationFilm(){
	let longestFilmingLocation=filmingLocations[0]
	for (const film of filmingLocations){
		if((new Date(film.fields.date_fin)-new Date(film.fields.date_debut)) -
			(new Date(longestFilmingLocation.fields.date_fin)-new Date(longestFilmingLocation.fields.date_debut)) >0){
			longestFilmingLocation=film
		}
	}
	return longestFilmingLocation
}

let longestFilm = GetLongestLocationFilm()
console.log(longestFilm)
console.log(duration(new Date(longestFilm.fields.date_fin) - new Date(longestFilm.fields.date_debut)))

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

function GetAverageLocationFilm(){
	let averageFilmingDuration=0
	for (const film of filmingLocations){
		averageFilmingDuration += new Date(film.fields.date_fin)-new Date(film.fields.date_debut)
	}
	averageFilmingDuration/=filmingLocations.length
	return averageFilmingDuration
}

console.log(duration(GetAverageLocationFilm()))