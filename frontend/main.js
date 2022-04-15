let _URL = "http://localhost:1337/api/books?populate=*"
const bookWrapper = document.querySelector(".books")
const audioBookWrapper = document.querySelector(".audioBooks")
const booksCategory = document.querySelector(".booksCategory")
const loginBtn = document.querySelector(".loginBtn")

const bookCardComponent = (Title,author,pages,rating,imgUrl, name,typeOfGenre, username,email)=> `
<div class="bookCard">
        <img src="http://localhost:1337${imgUrl}" alt="${name}">
        <div class="bookInfo">
            <h1>${Title}</h1>
            <h2>Författare: ${author}</h2>
            <p>Genre: ${typeOfGenre}</p>
            <h3>Betyg: ${rating}/10</h3>
            <h4>${pages} Sidor</h4>
            <p>Utlånas av ${username}.<br> Email: ${email}</p>
            <p></p>
        </div>
    </div>
`
const audioBookCardComponent = (title,length,releaseDate,typeOfGenre,url,rating,username,email)=> `
<div class="audioBookCard">
        <img src="http://localhost:1337${url}" alt="${title}">
        <div class="audioBookInfo">
            <h1>${title}</h1>
            <h2>Författare: ${length}</h2>
            <p>Genre: ${typeOfGenre}</p>
            <h3>Betyg: ${rating}/10</h3>
            <h4>${releaseDate} Sidor</h4>
            <p>Utlånas av ${username}.<br> Email: ${email}</p>

            <p></p>
        </div>
    </div>
`
const logInComponent = ()=> `
<div class="loginWrapper">
            <label for="username">Användarnamn/Email</label>
            <input type="text" id="_USERNAME">
            </label for="password">Lösenord</label>
            <input type="password" id="_PASSWORD">
            <button onclick="login()">Logga in</button>
            <p>Har du inget konto? <a onclick="registerWrapper()">Registrera ett här!</a></p>
</div>
`
const registerComponent = ()=>`
<div class="registerWrapper">
        <label for="registerUsername">Välj ett användarnamn.</label>
        <input type="text" id="registerUsername">
        <label for="registerEmail">Skriv in din email.</label>
        <input type="email" id="registerEmail">
        <label for="registerPassword">Välj ett lösenord.</label>
        <input type="password" id="registerPassword">
        <button onclick="register()">Registrera</button>
</div>
`
const myProfileComponent = (username, email, id, createdAt)=> `
<div class="ProfileCardWrapper">
        <div class="profileInfoWrapper">
        <div class="_INFOSTYLE">
            <h1 class="ProfileUsername">${username}</h1>
            <h2 class="ProfileEmail">Email: ${email}</h2>
            <h3 class="ProfileId">Id: ${id}</h3>
            <h4 class="ProfileReg">Kontot skapades: ${createdAt}</h4>
            </div>
        </div>
        <div class="myBooksWrapper">
        <h1>Mina böcker:</h1>
        <div class="myBooks"></div>
        <button class="addBookBtn" onclick="addBook()">Lägg till en bok</button>
        <button class="addBookBtn" onclick="addAudioBook()">Lägg till en Ljudbok</button>
        </div>
    </div>
`
const personalBookComponent = (Title,author,pages,rating,imgUrl, name,typeOfGenre, id)=>`
<div class="personalBookCard">
        <img src="http://localhost:1337${imgUrl}" alt="${name}">
        <div class="PersonalBookInfo">
            <h1>${Title}</h1>
            <h2>Författare: ${author}</h2>
            <p>Genre: ${typeOfGenre}</p>
            <h3>Betyg: ${rating}/10</h3>
            <h4>${pages} Sidor</h4>
            <Button onclick="DelBookBtn('http://localhost:1337/api/books/${id}')">Radera bok</button>
        </div>
    </div>
`
const personalAudioBookComponent =(url, title,length,typeOfGenre,rating,releaseDate, id)=>`
<div class="personalAudioBookCard">
        <img src="http://localhost:1337${url}" alt="${title}">
        <div class="personalAudioBookInfo">
            <h1>${title}</h1>
            <h2>längd: ${length} timmar</h2>
            <p>Genre: ${typeOfGenre}</p>
            <h3>Betyg: ${rating}/10</h3>
            <h4>publicerades: ${releaseDate}</h4>
            <Button onclick="DelBookBtn('http://localhost:1337/api/audio-books/${id}')">Radera ljudbok</button>
        </div>
    </div>
`
const addBookComponent =()=> `
<div class="addBookWrapper">
<label for="_title">Bokens title:</label>
<input type="text" name="_title"id="_TITLE">
<label for="_author">Bokens författare:</label>
<input type="text" name="_author" id="_AUTHOR">
<select name="_genre" id="_GENRE">
        <option value="null" disabled selected>Välj en genre!</option>
        <option value="4">Barnvänlig</option>
        <option value="3">Skräck</option>
        <option value="7">Deckare</option>
        <option value="5">Fantasy</option>
        <option value="2">Humor</option>
        <option value="6">Sci-fi</option>
        <option value="1">Romantik</option>
    </select>
<label for="_pages">Antal sidor:</label>
<input type="number" name="_pages" id="_PAGES">
<label for="_rating">Bokens betyg:</label>
<input type="number" name="_rating" min="0" max="10" id="_RATING">
<label for="_image">Bokens omslag:</label>
<input type="file" name="_image" id="_IMAGE">
<div>
<button onclick="SubmitAddBook()">Lägg till bok</button>
`
const addAudioBookComponent =()=>`
<div class="addBookWrapper">
<label for="_title">Bokens title:</label>
<input type="text" name="_title"id="_TITLE">
<label for="_author">vilket datum kom boken ut?</label>
<input type="text" name="_author" id="_AUTHOR">
<select name="_genre" id="_GENRE">
        <option value="null" disabled selected>Välj en genre!</option>
        <option value="4">Barnvänlig</option>
        <option value="3">Skräck</option>
        <option value="7">Deckare</option>
        <option value="5">Fantasy</option>
        <option value="2">Humor</option>
        <option value="6">Sci-fi</option>
        <option value="1">Romantik</option>
    </select>
<label for="_pages">Antal sidor:</label>
<input type="number" name="_pages" id="_PAGES">
<label for="_rating">Bokens betyg:</label>
<input type="number" name="_rating" min="0" max="10" id="_RATING">
<label for="_image">Bokens omslag:</label>
<input type="file" name="_image" id="_IMAGE">
<div>
<button onclick="SubmitAddAudioBook()">Lägg till bok</button>
`
const fetching = async (url)=>{
    let response = await axios.get(url)
    let books = response.data.data
    return books
}
let logOut = ()=>{
    sessionStorage.clear()
    render()
}
let login= async ()=>{
    
    let username = document.querySelector("#_USERNAME").value
    let password = document.querySelector("#_PASSWORD").value

    let loginUser = await axios.post("http://localhost:1337/api/auth/local",
    {
    identifier: username,
    password: password
    });
    let token = loginUser.data.jwt
    sessionStorage.setItem("Token", token)
    render()
}
let register= async()=>{
    let username = document.querySelector("#registerUsername").value
    let password = document.querySelector("#registerPassword").value
    let email = document.querySelector("#registerEmail").value

    let response = await axios.post("http://localhost:1337/api/auth/local/register", 
    {
        username,
        email,
        password,
        confirmed : true
    });
    let token = response.data.jwt
    sessionStorage.setItem("Token", token)
    render()
}
let loginRegister =()=>{
    bookWrapper.innerHTML = logInComponent()
}
let registerWrapper =()=>{
bookWrapper.innerHTML= registerComponent()
}
let myProfile = async()=>{
    await axios.get("http://localhost:1337/api/users/me",
   { 
        headers:{
        Authorization:`Bearer ${sessionStorage.getItem("Token")}`
    }
})
.then(data =>{
    booksCategory.classList="hidden"
    let {username, email, id, createdAt } = data.data
    const profileDate = new Date(createdAt).toISOString().slice(0, 10)

    bookWrapper.innerHTML = myProfileComponent(username, email, id, profileDate)
    const myBooks = document.querySelector(".myBooks")
   fetching(_URL)
    .then(data=>{
        data.forEach(book =>{
            let { attributes:bookAttributes, id:BookDelId } = book
            let { Title, author, genres, image, pages, rating, user, userId:bookUserId } = bookAttributes

            let {data:userData} = user
            let { attributes:userAttributes, id:userId} = userData
            let {username, email}=userAttributes
            
    
            let { data:genreData }=genres
            let genreType = genreData[0]
            let {id:genreId, attributes:genreAttributes} = genreType
            let {typeOfGenre}= genreAttributes

            
    
            let {data:imgData} = image
            let {attributes:imgAttributes}= imgData
            let {url:imgUrl, name} = imgAttributes
           
            if(id == bookUserId){
                myBooks.innerHTML += personalBookComponent(Title,author,pages,rating,imgUrl, name, typeOfGenre, BookDelId)
                // myBooksWrapper.innerHTML+= bookCardComponent(Title, author, genres, image, pages, rating, user)
            }
        })
    })
    fetching("http://localhost:1337/api/audio-books?populate=*")
    .then(audioBooks=>{
        audioBooks.forEach(audio=>{
            let {attributes, id:audioId} = audio
            let {title, releaseDate, length,rating, userId:audioBookUserId, user, image, genres}=attributes

            let {id:userId}= user.data
          let {typeOfGenre}=genres.data[0].attributes
            let{url}=image.data.attributes

            if(id===audioBookUserId){
                myBooks.innerHTML += personalAudioBookComponent(url,title,length,typeOfGenre,rating,releaseDate, audioId)
                
            }
        })
        
    })
})
}
let addBook =()=>{
    bookWrapper.innerHTML =addBookComponent()
}
let addAudioBook =()=>{
    bookWrapper.innerHTML =addAudioBookComponent()

}
let DelBookBtn= async(url)=>{
    await axios.delete(url,
{
    headers:{
    Authorization:`Bearer ${sessionStorage.getItem("Token")}`
    
}
})
myProfile()
}
let SubmitAddBook = async ()=>{
    let Title = document.querySelector("#_TITLE").value
    let author = document.querySelector("#_AUTHOR").value
    let pages = document.querySelector("#_PAGES").value
    let rating = document.querySelector("#_RATING").value
    let genres = document.querySelector("#_GENRE").value
    let image = document.querySelector("#_IMAGE").files
    let imgData = new FormData()
    imgData.append("files", image[0])

      let dataId = await axios.get("http://localhost:1337/api/users/me",
            { 
                headers:{
                Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }
        }).then(data =>{
           return userId =data.data.id
        })

        await axios.post("http://localhost:1337/api/upload", imgData,{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }})
            .then(response =>{
                let imgId = response.data[0].id
                axios.post("http://localhost:1337/api/books", {
                data: {
                    Title,
                    author,
                    pages,
                    rating,
                    image:imgId,
                    userId: dataId,
                    user:[dataId],
                    genres
                    
                }},
                {
                    headers:{
                        Authorization:`Bearer ${sessionStorage.getItem("Token")}`
                    }
                }); 
            })
    bookWrapper.innerHTML =addBookComponent()
}
let SubmitAddAudioBook= async()=>{
    let title = document.querySelector("#_TITLE").value
    let releaseDate = document.querySelector("#_AUTHOR").value
    let length = document.querySelector("#_PAGES").value
    let rating = document.querySelector("#_RATING").value
    let genres = document.querySelector("#_GENRE").value
    let image = document.querySelector("#_IMAGE").files
    let imgData = new FormData()
    imgData.append("files", image[0])

      let dataId = await axios.get("http://localhost:1337/api/users/me",
            { 
                headers:{
                Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }
        }).then(data =>{
           return userId = data.data.id
        })

        await axios.post("http://localhost:1337/api/upload", imgData,{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }})
            .then(response =>{
                let imgId = response.data[0].id
                axios.post("http://localhost:1337/api/audio-books", {
                data: {
                    title,
                    releaseDate,
                    length,
                    rating,
                    image:imgId,
                    userId: dataId,
                    user:[dataId],
                    genres
                    
                }},
                {
                    headers:{
                        Authorization:`Bearer ${sessionStorage.getItem("Token")}`
                    }
                }); 
            })
    bookWrapper.innerHTML =addBookComponent()
}
let bookFetchRender =()=>{
    bookWrapper.innerHTML=""
    fetching(_URL)
    .then(data =>{
        data.forEach(book=>{
            
            let { attributes:bookAttributes, id } = book
            let { Title, author, genres, image, pages, rating, user, userId:bookUserId } = bookAttributes

            let {data:userData} = user
            let { attributes:userAttributes, id:userId} = userData
            let {username, email}=userAttributes
                
            let { data:genreData }=genres
            let genreType = genreData[0]
            let {id:genreId, attributes:genreAttributes} = genreType
            let {typeOfGenre}= genreAttributes

            
    
            let {data:imgData} = image
            let {attributes:imgAttributes}= imgData
            let {url:imgUrl, name} = imgAttributes
           

            bookWrapper.innerHTML += bookCardComponent(Title,author,pages,rating,imgUrl, name, typeOfGenre, username,email)
        })
        let loggedIn = sessionStorage.getItem("Token")
        let myProfileBtn = document.querySelector(".myProfileBtn")

        if(loggedIn){
            loginBtn.innerHTML='<i class="icon-signout"></i><br>Logga Ut'
            myProfileBtn.classList.remove("hidden")
            loginBtn.setAttribute("onclick","logOut()" )
        }else{
            loginBtn.innerHTML='<i class="icon-user"></i> <br>Logga in/registrera'
            loginBtn.setAttribute("onclick","loginRegister()")
            myProfileBtn.classList.add("hidden")

        }
    })
}
let audioBookRenderFetch =()=>{
    bookWrapper.innerHTML=""
    fetching("http://localhost:1337/api/audio-books?populate=*")
    .then(data=>{
        data.forEach(audioBook=>{
            let {title, length, releaseDate, user, genres, image, rating}= audioBook.attributes
            let {username,email}  = user.data.attributes
            let {typeOfGenre} = genres.data[0].attributes
            let {url} = image.data.attributes
            bookWrapper.innerHTML += audioBookCardComponent(title,length,releaseDate,typeOfGenre,url, rating,username,email)
        })
    })
}
let render = ()=>{
    bookFetchRender()
    audioBookRenderFetch()
    booksCategory.classList.replace("hidden", "booksCategory")

}
render()