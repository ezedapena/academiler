
// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
}
window.addEventListener("resize", updateSize)
updateSize();

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const firebaseConfig = {
  apiKey: "AIzaSyBRPTYrGurdv3LGoLbIe3Z7bCSzf1GTiv0",
  authDomain: "challenge-mil3r.firebaseapp.com",
  databaseURL: "https://challenge-mil3r.firebaseio.com",
  projectId: "challenge-mil3r",
  storageBucket: "challenge-mil3r.appspot.com",
  messagingSenderId: "501597643651",
  appId: "1:501597643651:web:e765718303a21aa7b70cb6",
  measurementId: "G-JY3E9447J4"
};
firebase.initializeApp(firebaseConfig);

const app = new Vue({
  el:"#app",
  data:{
    search:'',
    pages:[],
    database: [],
    current: "principal",
    dialog: "",
    pagImgRute: {},
    key: "",
    key2: ""
  },
  methods:{
   async start(){
      app.current = "secondary"
      await firebase.database().ref('pagesImgsRutes/').once('value')
      .then(function(snapshot){
        app.pagImgRute = snapshot.val()
      })
    },
    async html(){
      await firebase.database().ref('HTMLInfo/').once('value')
      .then(function(snapshot){
        app.database = snapshot.val()
      })
      app.key="HTML"
      app.key2="HTMLInfo"
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/html.css"
      document.getElementById("team").className ="d-none"
      document.getElementById("nav").className ="d-flex justify-content-around align-items-center bg-dark p-1"
      document.getElementById("html").src ="img/htmlimagechecked.png"
      document.getElementById("css").src ="img/cssimage.png"
      document.getElementById("js").src ="img/jsimage.png"
     // document.getElementById("intro").src ="img/htmlimagechecked.png"
    },
    async css(){
      await firebase.database().ref('CSSInfo/').once('value')
      .then(function(snapshot){
        app.database = snapshot.val()
      })
      app.key="CSS"
      app.key2="CSSInfo"
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/css.css"
      document.getElementById("team").className ="d-none"
      document.getElementById("nav").className ="d-flex justify-content-around align-items-center bg-dark p-1"
      document.getElementById("html").src ="img/htmlimage.png"
      document.getElementById("css").src ="img/cssimagechecked.png"
      document.getElementById("js").src ="img/jsimage.png"
   //  document.getElementById("intro").src ="img/cssimagechecked.png"
      
    },
    async js(){
      await firebase.database().ref('JSInfo/').once('value')
      .then(function(snapshot){
        app.database = snapshot.val()
      })
      app.key="JS"
      app.key2="JSInfo"
      app.current = "page"
      document.getElementById("cssArchivo").href="styles/js.css"
      document.getElementById("team").className ="d-none"
      document.getElementById("nav").className ="d-flex justify-content-around align-items-center bg-dark p-1"
      document.getElementById("html").src ="img/htmlimage.png"
      document.getElementById("css").src ="img/cssimage.png"
      document.getElementById("js").src ="img/jsimagechecked.png"
//      document.getElementById("intro").src="img/jsimagechecked.png"
    },
    
    help(){
      
      switch(app.dialog){
        case "":
        app.dialog= "one"
        break;
        case "one":
        app.dialog = "two"
        break;
        case "two":
        app.dialog = "three"
        break;
        case "three":
        app.dialog = "question"
        break;
      }
      
    },
    cancel(){
      app.dialog = ""
    }
  },
  created(){
    
    async function fetchAll(){
      let resPages = await fetch("https://raw.githubusercontent.com/ezedapena/academiler/master/json/pages.json");
      let json = await resPages.json();
      
      return json
    }
    fetchAll()
    .then(data => {
      app.pages=data.pages;
      
    })
    
  }
  ,
  computed:{
    filterTitle(){ 
      return this.database.filter(data => {
        return data.title.toLowerCase().match(this.search.toLowerCase())
      })
    }
  },
  
  components:{
    principal:{
      template:`
      <div class="d-flex justify-content-center flex-wrap">
      <img src="img/start.png" alt="start button" onclick="app.start()" class="linkimgs">
      <a href="game/game.html"><img src="img/play.png" alt="play button"  class="linkimgs"></a>
      <a href="https://ezedapena.github.io/mil3r/" target="_new"><img src="img/developers.png" alt="developers button"class="linkimgs"></a>
      
      </div>      
      `
    },
    secondary:{
      props:['array'],
      template:`
      
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <template v-if="array.length != 0">
      <div class="carousel-inner">
      <div class="carousel-item active slide" id="linkHTML" :style="array[0].bg">
      <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.html()">
      <img src="img/htmlogo.png" class="imgResponsive" alt="go html!">
      <img src="img/htmlimage.png" height="50%" alt="go html!">
      </div>
      </div>
      <div class="carousel-item slide" id="linkCSS" :style="array[1].bg">
      <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.css()">
      <img src="img/csslogo.png" class="imgResponsive" alt="go css!">
      <img src="img/cssimage.png" height="50%" alt="go css!">
      
      </div>
      </div>
      <div class="carousel-item slide" id="linkJS" :style="array[2].bg">
      <div class="d-flex justify-content-center flex-column align-items-center slide-container" onclick="app.js()">
      <img src="img/jslogo.png" class="imgResponsive" alt="go js!">
      <img src="img/jsimage.png" height="50%" alt="go js!">
      
      </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
      </div>
      </template>
      </div>
      `
    },
    page:{
      props:['var','labels','imgRute','clave','clave2'],
      components:{
        
        one:{
          template: `<div class="dialog-div width25"><p>Hey you! <br> I´m Captain Miler</p></div>`
        },
        two:{
          template: `<div class="dialog-div width25"><p>I need your help!<br> Did you study enough?</p></div>`
        },
        three:{
          template:`<div class="dialog-div width25"><p> Mr. Code is back! <br>Are you ready to face him?</p></div>`
        },
        question:{
          template: `<div id="fight" class="width25"><button type="button" class="btn btn-success" onclick="window.location.href = 'game/game.html';">Let's go get him!</button>
          <button type="button" class="btn btn-danger" onclick="app.cancel()">No, Let me study more</button></div>`
        }
      },
      
      template:`
      <div class="col-12">
      <div>
      <div class="d-flex justify-content-center"><img id="intro" :src="imgRute[clave]"></div>
      <div class="divHTML border p-2">
        <p>{{imgRute[clave2]}}</p>
      </div>
      <div v-for="label in labels" class="divHTML border">
      <div class="transparent-shadow"><h3 class="px-5 py-2">{{label.title}}</h3></div>    
      <h4 class="px-5 py-2">{{label.name}}</h4>
      <p class="px-5 py-2">{{label.detail}}</p>
      </div>
      </div>
      
      <div id="SOS"><component :is="this.var"></component><img src="img/head.png"  onclick="app.help()" id="head"></div>
      </diV>
      `
    }
    
  }

  
})