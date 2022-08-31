const loadPhone = async (searchText, dataLimit) => {                                                    
    // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    // .then(res => res.json())
    // .then(data => console.log(data))
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}                                                                                                      
const displayPhone = (phones, dataLimit) => {                                                             
    const phonesContainer = document.getElementById('phones-container');
    // phonesContainer.innerText = '';
    phonesContainer.textContent = '';

                // display only 7 phone when search
    const showAllPhone = document.getElementById('show-all')
    if(dataLimit && phones.length > 7) {                                                                    
    phones = phones.slice(0, 7);
    showAllPhone.classList.remove('d-none');
    }else{
        showAllPhone.classList.add('d-none');
    }
    // array = array.slice(0, 7);

                // no found data/phones array 
    const noFoundPhone = document.getElementById('no-found-message')                                            
    if(phones.length === 0){                            
        noFoundPhone.classList.remove('d-none');        
                                                         
                                                      
    }else{
        noFoundPhone.classList.add('d-none');
    }
    // array.forEach(element => {
        // foreach method
    // });
    // for(const element of array){
        // forLoop 
    // }
                // display all data/phones array
    phones.forEach(phone => {                                                                                              
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4 shadow-lg  hover-zoom text-center">
            <img src="${phone.image}" class="card-img-top" alt="...">                                               
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text text-wrap">${phone.phone_name}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn btn-outline-primary justfy" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
                // stop loader
    toggleSpinner(false); //function(isLoading/false) then load.classList.add('d-none');

}
const processSearch = (dataLimit) => {                                                                                         
    toggleSpinner(true);
    const searchPhone = document.getElementById('search-field');
    const searchText = searchPhone.value;
    loadPhone(searchText, dataLimit);
}


                // search data/phones array
    document.getElementById('btn-search').addEventListener('click', function(){                                                
                // start loader
        // toggleSpinner(true);                                          
                                                                            
        // const searchPhone = document.getElementById('search-field')         
        // const searchText = searchPhone.value;                               
        // loadPhone(searchText);      
         processSearch(7);                                                     
    })                                                                         
                                                                            
    const toggleSpinner = function(isLoading){                  
    // const toggleSpinner = isLoading =>{} arrow 
        const load = document.getElementById('loader')
        if(isLoading){
            load.classList.remove('d-none');
        }
        else{
            load.classList.add('d-none')
        }
    }

                // not the best way to load show All
    document.getElementById('btn-show-all').addEventListener('click', function(){
        // toggleSpinner(true);                     //  <------ function(isLoading/true) hoy 
        // const searchPhone = document.getElementById('search-field') 
        // const searchText = searchPhone.value; 
        // loadPhone(searchText, dataLimit);
        processSearch();
    })

    // search input field enter key handler
    document.getElementById('search-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            processSearch(7);
        }
    });

    const loadPhoneDetails = async id =>{
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        const res = await fetch(url);
        const data = await res.json()
        displayPhoneDetails(data.data)

    }
    const displayPhoneDetails = phone => {
        console.log(phone)
        const phoneDetails = document.getElementById('phoneDetailModalLabel')
        phoneDetails.innerText = phone.name;
        const phonDetailsOther = document.getElementById('phone-details')
        phonDetailsOther.innerHTML = `
       <table class="table">
        <thead>
            <tr >
            <th class="mainfeture-modal" scope="col"> Mainfeture:</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">chipSet:</th>
            <td>${phone.mainFeatures.chipSet}</td>
            </tr>
            <tr>
            <th scope="row">displaySize:</th>
            <td>${phone.mainFeatures.displaySize}</td>
            </tr>
            <tr>
            <th scope="row">memory:</th>
            <td>${phone.mainFeatures.memory}</td>
            </tr>
            <tr>
            <th scope="row">sensors:</th>
            <td>${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}</td>
            </tr>
            <tr>
            <th scope="row">releaseDate:</th>
            <td>${phone.mainFeatures.releaseDate? 'phone.mainFeatures.releaseDate' : 'releaseDate not published yet'}</td>
            </tr>
        </tbody>
        </table>

        `
    }
loadPhone('apple');

