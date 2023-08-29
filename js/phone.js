// fetch here 
const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}
// display function here 
function displayPhones(phones, isShowAll) {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    if(!isShowAll){
        phones = phones.slice(0,12)
    }

 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `card bg-base-100 shadow-xl p-3`;
        phoneDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    `;
    phoneContainer.appendChild(phoneDiv);
    });
    toggleLoadingSpinner(false)
}

// handleSearch function here 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}
// toggleSpinner here 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}
// showAllHandler 
const showAllHandler = () => {
    handleSearch(true);
}

const showDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

// show details function here 
const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    const showPhoneDetailContainer = document.getElementById('phone-detail-container');
    showPhoneDetailContainer.innerHTML  = `
        <img  src="${phone.image}"/>
        <p> <span class="font-medium">Storage: </span>${phone?.mainFeatures?.storage || 'No storage'}</p>
        <p> <span class="font-medium">DisplaySize: </span>${phone?.mainFeatures?.displaySize || 'No displaySize'}</p>
        <p> <span class="font-medium">chipSet: </span>${phone?.mainFeatures?.chipSet || 'No chipSet'}</p>
        <p> <span class="font-medium">Memory: </span>${phone?.mainFeatures?.memory || 'No memory'}</p>
        <p> <span class="font-medium">Slug: </span>${phone?.slug || 'No slug'}</p>
        <p> <span class="font-medium">ReleaseDate: </span>${phone?.releaseDate || 'No releaseDate'}</p>
        <p> <span class="font-medium">Brand: </span>${phone?.brand || 'No brand'}</p>
        <p> <span class="font-medium">GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
    `
    console.log(phone);
    // show modal 
    show_Details_modal.showModal()
}

