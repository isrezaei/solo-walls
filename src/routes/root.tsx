export async function loader() {




    const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=nature` , {
        headers : {
            'Authorization': `Client-ID GeuDO0N3Nbf0t1I9a0wiFPtVimKQqltFP19TEI0xBj4`
        }
    })
    return {info : await res.json()}


}
