
import Author from './author.model'
import Book from './book.model'
import Magazine from './magazine.model'

const csv = document.getElementById('csv') as HTMLFormElement;
const csvFile = document.getElementById('csvfile') as HTMLInputElement;
const Searchbar = document.getElementById('searchbar') as HTMLInputElement;
const SearchResults = document.getElementById('searchResults') as HTMLDivElement;
const AuthorsEL = document.getElementById('authors') as HTMLDivElement;
const BooksEL = document.getElementById('books') as HTMLDivElement;
const MagazinesEL = document.getElementById('magazines') as HTMLDivElement;

let authors: Author[] = [];
let books: Book[] = [];
let magazines: Magazine[] = [];

csv.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    let Reader = new FileReader();
    const input = csvFile.files[0];


    Reader.onload = function (evt) {

        const txt = evt.target.result;
        const entities = csvToArray(txt, ';');
        const objectType = getObjectType(entities[0])

        if (typeof txt === 'string' || txt instanceof String) {
            console.log(objectType)
            if (objectType === 'Author') {
                authors = entities;
                AuthorsEL.innerHTML = '';
                AuthorsEL.appendChild(generateTable(entities));
            } else if (objectType === 'Book') {
                books = entities;
                BooksEL.innerHTML = '';
                BooksEL.appendChild(generateTable(entities));
            } else if (objectType === 'Magazine') {
                magazines = entities;
                MagazinesEL.innerHTML = '';
                MagazinesEL.appendChild(generateTable(entities));
            }
        }
    }

    Reader.readAsText(input);

});


function csvToArray(str, delimiter = ",") {

    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });
    // return the array
    arr.pop();
    return arr;
}


function search() {

    if (Searchbar.innerText = '') SearchResults.innerHTML = '';
    else {
        const searchword = Searchbar.value;
        let objects = filterIt([...books, ...magazines], searchword)


        SearchResults.innerHTML = '';
        if (objects.length > 0) {
            SearchResults.appendChild(generateTable(objects));
        }
    }

}

function filterIt(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(
        key => obj[key].includes(searchKey)
    ));
}

function getObjectType(entity): string {
    if (entity['description']) return 'Book';
    if (entity['publishedAt']) return 'Magazine';
    if (entity['email']) return 'Author';
}

function generateTable(Authors) {
    const tableHeaders = Object.keys(Authors[0]);
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    tableHeaders.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    Authors.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach((text) => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    return table;
}
