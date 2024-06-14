const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");

const setupUI = (user) => {
  if (user) {

    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

  
    var uid = user.uid;
    console.log(uid);
    let level = 0;

    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';


    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);


    dbRefTemp.on('value', snap => {
      var tempValue = snap.val().toFixed(2);
      tempElement.innerText = tempValue;
      updateBatteryAnimation(tempValue);
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });

    function startCharging() {
      
      const interval = setInterval(function() {
        level += 10;
        document.getElementById('batteryLevel').style.height = `${level}%`;
        if (level >= 100) {
          clearInterval(interval);
          alert('Battery fully charged!');
        }
      }, 1000); 
    
  
  chargeElement.style.height = heightPercentage + '%';
  chargeElement.style.background = backgroundColor;

  boltElement.style.animation = animationName ? `${animationName} 1s infinite` : '';
}


  } else{

    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}
