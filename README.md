This is a [NodeJS and ExpressJS](http://expressjs.com/) project followed by some additions of the previous project

# Getting Started

First, install all the dependencies:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/all/Bangladesh/Dhaka](http://localhost:3000/all/Bangladesh/Dhaka) with your browser to see the result.

You can manipulate the url link by changning the country and city name http://localhost:3000/all/COUNTRYNAME/CITYNAME

# Tools Used

- EJS (HTML template)
- TailwindCSS(CSS framework)
- Javascript
- ExpressJS (NodeJS Framework)

# Features

- API to fetch weather data for a location
- Showing a bad request page if invalid names given
- Toggle to interchange Celcius and Farenhiet.
- If a city name was searched before, the next time, it'll retrieve data from our json file file instead of fetching rthe API.

# Tasks, Todos & Problems face while making the project (Optional)

## Tasks into chunks

- [x] 1. Reading the parameter
- [x] 2. Axios Data fetct with city name using axios
- [x] 3. Able to retrieve individual values
- [x] 4. Show city name as a heading in the index file
- [x] 5. Showing temperature and topggle from C to f and vice versa
- [x] 6. Using of deconstructor
- [x] 7. Rate Limiter
- [x] 8. (JSON File) Write in json file if object not present
- [x] 9. (JSON File) Show Data from json file if present
- [x] 10. Showing a page with an error meesage If no city found with that name
- [x] 11. (Historical Data) Able to show 1 average data and show the same value in everywhere
- [x] 12. (Historical Data) Able to show 4 average data
- [x] 13. (Historical Data) find the higest & the lowest temp and show it
- [x] 14. Adding the code under previous project

## Optimization

- [ ] 404 Page betterment
- [ ] Put the whole project here.

## Things that I've learned

- Rate Limiter
- Deconstructor
- ReadFile and Write File
- Api call using axios

## Removing bad practices

- [ ] Remove "if (object == undefined) {"
- [ ] remove the variable name, 'gottem'
- [ ] whether we have our data in the json file or get it from api, before sending i to html, we have to do the weather calculation. So, wee need to put the code calculation on both of their blocks. Is their an alternatove way to it? (Function call)
- [x] Remove truncate class from index

## Problem

- Bad Request page appears in home PC but not in Office PC (Task: we will
  display 403 HTTP Forbidden server responses)
- My duplicate hotkeys don't work

## Problems and their solutiuons:

- "http://localhost:3000/all/bangladesh/fecha-master/dist/fecha.min.js” was blocked due to MIME type (“text/html”) mismatch (X-Content-Type-Options: nosniff)". So, it wasn't able to load the file. That's because it wasn't in the static folder, which was initialized as the puiblic folder

## Late Submission Reason

- Implementing Programming Move
- Code not work in office but works home
