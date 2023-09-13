// variables
const form = document.getElementById('generate-names');

form.addEventListener('submit', loadNames);


// execute the loadNames functions to query the API
function loadNames(e) {
   e.preventDefault();

   // read the values from the form and create the variables
   const origin = document.getElementById('country').value;
   const gender = document.getElementById('gender').value;
   const amount = document.getElementById('quantity').value;

   // build the URL
   let url ='https://api.parser.name/?api_key=9555e228af187d0b5a8cce777f278392&endpoint=generate';
   // read the origin and append to the url
   if (origin !== '') {
      url += `&country_code=${origin}&`;
   }
   // read the gender and append to the url
   if (gender !== '') {
      url += `&gender=${gender}&`;
   }
   // read the qunatity and append to the url
   if (amount !== '') {
      url += `&results=${amount}&`;
   }
   
   // fetch the url
   getNames(url) 
      .then((names) => {
         const generatedNames = names.data;
   
         // insert into the html
         let html = `<h2 class="generated-names">Generated Names</h2>`;
         html += `<ul class="list">`;
         html += generatedNames.map((name) => {
               return `
                  <li>${name.name.firstname.name}</li>
               `
         }).join('');
         html += `</ul>`;
   
         // insert into the result
         const result = document.getElementById('result');
         result.innerHTML = html;
      })
      .catch((error) => console.log(error));
   

}

async function getNames(url) {
   const response = await fetch(url);
   const names = await response.json();

   return names;
}