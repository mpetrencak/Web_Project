var units='&units=metric';
var api='https://api.openweathermap.org/data/2.5/forecast?q=';
var apiKey='&APPID=886d233c6ef15e2c13d1275a6dccd220';


var button1 = document.querySelector('.jumbotron a.btn.btn-warning'); 
var inputTime = document.getElementById("mySelect");

var input = document.querySelector('.jumbotron input');
var refTown = document.getElementById("FormControlSelectTown");



//Button function
button1.onclick=function()
{
   var time=inputTime.options[inputTime.selectedIndex].text;
   var city=refTown.options[refTown.selectedIndex].text;
   
   console.log("input is:" + input.value.length);

   //check if input isnt empty
   if(input.value.length>city.length)
   {
    city=input.value;
   }
   else if(city == "-" && input.value.length == 0 )
   {
    alert("Zadejte město!");
    return;
   }
   else
   {
    city=city;
   }

   //writte city    
  document.getElementById('choosenCity').innerHTML = "Předpověď pro " + city;

  //saving to local storage
  if(city != "-")
  {
    if(localStorage.length < 4)
    {
      localStorage.setItem(localStorage.length+1, city);
    } 
    else
    {
      localStorage.clear();
      localStorage.setItem(localStorage.length+1, city);      
    }
  }

  document.querySelector('.last1').innerHTML = ''
  for (var i = 0; i < localStorage.length; i++) 
  {
    console.log(localStorage.key(i));
    //localStorage.key(i) returns value of key   
    document.querySelector('.last1').append( localStorage.getItem(localStorage.key(i)) +", " );
  }

  //calling function for weather
  var url=api + city + apiKey + units;
  getWeather(url, time);        
}


//Function for weather
function getWeather(url, inputTime)
 {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
     {
      if (this.readyState == 4 && this.status == 200)
       {
          var response = this.responseText;
          response=JSON.parse(response);
          console.log("response from server is:" + response); //write response to log
          fill(response, inputTime);                             
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  //function for separete and writte data form response
function fill(response, inputTime)
{
  var date = response.list[0].dt_txt;
  var i;
  var space=1;
  for (i = 0; i < response.list.length; i++)
   {
      date=response.list[i].dt_txt
      if(date.substr(11, 8) == inputTime)
      {
        var  wetIcon = response.list[i].weather[0].icon;
        document.getElementById('icons' + space).innerHTML = "<img src='img/" + wetIcon + ".png'>";
        document.getElementById('other' + space).innerText = 
                                                            "DATUM: " + response.list[i].dt_txt.substr(0, 9) + 
                                                            "\nteplota: " + response.list[i].main.temp +" °C" +
                                                            "\n vlhkost: " + response.list[i].main.humidity+ " %" +
                                                            "\nvitr: " + response.list[i].wind.speed+ " m/s"
                                                            "\ncas: " + inputTime;        
        space++; 
      }        
  }
  space=0;  
}


window.addEventListener('load', ()=>{


  document.querySelector('.last1').innerHTML = ''
  for (var i = 0; i < localStorage.length; i++)
   {
    console.log(localStorage.key(i));
    //localStorage.key(i) vrati jmeno klice
    
    document.querySelector('.last1').append( localStorage.getItem(localStorage.key(i)) +", " ); 
  }

});