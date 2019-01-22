
var btnSubmit = document.getElementById("buton1");
if (btnSubmit)
btnSubmit.addEventListener("click", function () {
    var data = {};
    data.nume = document.getElementById("nume").value;
    data.prenume = document.getElementById("prenume").value;
    data.email = document.getElementById("email").value;
    data.mesaj = document.getElementById("mesaj").value;
    var msg = JSON.stringify(data);
    if (data.nume != "" && data.prenume != "" && data.email != "" && data.mesaj != "") {
      var ourRequest1 = new XMLHttpRequest();
      ourRequest1.open("POST", 'http://localhost:3000/mesaje', true);
      ourRequest1.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      ourRequest1.send(msg);
      document.getElementById("nume").value = "";
      document.getElementById("prenume").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mesaj").value = "";
      alert("Success!");
      location.reload();
    } else {
      alert("Toate campurile sunt obligatorii!!!");
      return;
    }
  });





  var showMessages = document.getElementById("lista");
  var btnShow = document.getElementById("buton4");
var msgId = [];
var msgNume = [];
var msgPrenume = [];
var msgEmail = [];
var msgMesaj = [];
if (btnShow)
btnShow.addEventListener("click", function () {
    var ourRequest4 = new XMLHttpRequest();
    ourRequest4.open('GET', 'http://localhost:3000/mesaje/');
    ourRequest4.onload = function () {
      var ourData = JSON.parse(ourRequest4.responseText);
      render(ourData);
    };
    ourRequest4.send();
  });





  var maxId;
  function render(data) {
    var htmlString="";
    nrElem = 0;
    for (i = 0; i < data.length; i++) {
      htmlString += "<ul><li>Id: " + data[i].id + "</li><li>Nume: " + data[i].nume + "</li><li>Prenume: " + data[i].prenume + "</li><li>Email: " + data[i].email + "</li><li><span>Mesaj: " + data[i].mesaj + "</span></li></ul>";
      msgId[i] = data[i].id;
      msgNume[i] = data[i].nume;
      msgPrenume[i] = data[i].prenume;
      msgEmail[i] = data[i].email;
      msgMesaj[i] = data[i].mesaj;
      maxId = msgId[i];
    }
    while (showMessages.childElementCount)
      showMessages.removeChild(showMessages.childNodes[0]);
    showMessages.insertAdjacentHTML('beforeend', htmlString);
  }
  




  var btnEdit = document.getElementById("buton2");
  if(btnEdit)
    btnEdit.addEventListener("click",function(){
      var value = document.getElementById("id").value;
      var i=0;
      var elNumber = 0;
      for(i = 0; i < msgId.length; i++)
        if ( msgId[i] == value){
          elNumber = i;
          break;
        }
        if(i == msgId.length + 1){
          alert("Introduceti un Id valabil!!!");
          return;
        }
      if(isNaN(value) || value < 1 || value > maxId)
        alert ("Introduceti un Id valabil!!!");
      else {
        var newMsg =  document.getElementById("mesaj").value;
        if(newMsg == "") {
          alert("Mesajul nu poate fi gol!!!");
          return;
        }
        var answer = confirm("Trimiteti modificarile?");
        if(answer == true){
          var data={};
          var ourRequest2 = new XMLHttpRequest();
          ourRequest2.open("PUT", 'http://localhost:3000/mesaje/'+ value.toString(), true);
          ourRequest2.setRequestHeader('Content-type','application/json; charset=utf-8');
          data.nume = msgNume[value - 1];
          data.prenume = msgPrenume[value - 1];
          data.email = msgEmail[value - 1];
          data.mesaj = newMsg;
          var update = JSON.stringify(data);
          ourRequest2.send(update);
          var descriptions = showMessages.getElementsByTagName('span');
          descriptions[elNumber].innerHTML = newMsg;
        }
      }
    });





var btnDelete = document.getElementById("buton3");
if (btnDelete)
btnDelete.addEventListener("click", function () {
    var value = document.getElementById("id").value;
    var i = 0;
    var elNumber = 0;
    var emptyString = "";
    for (i = 0; i < msgId.length; i++)
      if (msgId[i] == value) {
        elNumber = i;
        break;
      }
    if (i == msgId.length + 1) {
      alert("Introduceti un Id valabil!!!");
      return;
    }
    if (isNaN(value) || value < 1 || value > maxId)
      alert("Introduceti un Id valabil!!!");
    else {
      var answer = confirm("Stergeti mesajul");
      if (answer == true) {
        var ourRequest3 = new XMLHttpRequest();
        ourRequest3.open("DELETE", 'http://localhost:3000/mesaje/' + value, true);
        ourRequest3.send(null);
        var descriptions = showMessages.getElementsByTagName('ul');
        descriptions[elNumber].innerHTML = emptyString;
      }
    }
  });




  
  function creare(){
    var x=document.createElement("h3");
    var textnode=document.createTextNode("România poate fi considerată cea mai frumoasă țară din Europa, susține celebra publicație americană The Huffington Post.");
    x.appendChild(textnode);
    document.getElementById("citat").appendChild(x);
  }

  function sterge(){
    var x=document.getElementById("citat")
   x.parentNode.removeChild(x);
 
   string = document.createElement("h3");
   string.setAttribute("id", "citat");
   var node = document.createTextNode(""); //creez textul nodului
  string.appendChild(node); //atribui textul paragrafului
  var element = document.getElementById("citat1");
  element.appendChild(string);
  }

  function modificare(){
    document.getElementById("citat").innerHTML = "România este patria noastră și a tuturor românilor. E România celor de demult și-a celor de mai apoi. E patria celor dispăruți și a celor ce va să vie.";
  }
