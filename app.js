const searchFrom = document.querySelector('#searchFrom');
var searchList = document.querySelector('#searchList');

searchFrom.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearSearchResults();       
    const userInput = searchFrom.elements.query.value;
    const config = {params:{q:userInput}}
    const searchingTxt = document.getElementById('searching_txt');
    searchingTxt.style.visibility= `visible`;
    const result = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
    searchingTxt.style.visibility= 'hidden';
    console.log(result.data[0]);
    await DisplaySrchImage(result.data);
    searchFrom.elements.query.value = "";
});

function clearSearchResults(){
    try {
        while (searchList.hasChildNodes()){
            searchList.removeChild(searchList.firstChild);
        }        
    } catch (error) {
        console.log(error);
    }
    
}

async function DisplaySrchImage(imageSrcArr){
    for(let i of imageSrcArr){        
        if (i.show.image){
        const li = document.createElement('li');
        const image = document.createElement('img');
        const title = document.createElement('p');
        const link = document.createElement('a');

        link.classList.add('movie_link')
        link.href = i.show.officialSite;
        title.textContent = i.show.name;
        image.setAttribute('loading', 'lazy')
        image.src = i.show.image.medium;
        link.append(image)
        link.append(title)
        li.append(link);
        
        searchList = document.querySelector('#searchList');
        
        searchList.append(li);
        
    }}

}