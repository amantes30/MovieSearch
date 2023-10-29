const searchFrom = document.querySelector('#searchFrom');
var searchList = document.querySelector('#searchList');

searchFrom.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearSearchResults();
       
    const userInput = searchFrom.elements.query.value;
    const config = {params:{q:userInput}}
    const result = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
    console.log(result.data[0].show.image.medium);

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
        image.src = i.show.image.medium;
        li.append(image);
        searchList = document.querySelector('#searchList');
        searchList.append(li);
        
    }}

}