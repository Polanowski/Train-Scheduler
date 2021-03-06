 $(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmpMu2XYtMnhn97CkizE8vrNhkScCPM9g",
    authDomain: "trains-ba88e.firebaseapp.com",
    databaseURL: "https://trains-ba88e.firebaseio.com",
    projectId: "trains-ba88e",
    storageBucket: "trains-ba88e.appspot.com",
    messagingSenderId: "904670208275"
  };
  firebase.initializeApp(config);

var db = firebase.database();

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//The Current time
$("#currentTime").text(currentTime);


$("#submitBTN").on("click", function(){
	event.preventDefault();
	var trainName = $("#add-train").val().trim();
	var destination= $("#destination").val();
	var firstTrain = $("#firstTrain").val();
	var frequency = $("#frequency").val();

	db.ref("/schedule").push({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});
});


db.ref("schedule").on("child_added", function(snapshot){
	var data = snapshot.val();
	//showing current snapshots in console
	console.log(snapshot.val());
	var frequency = data.frequency;
	console.log(data.frequency);
	var firstTime = data.firstTrain;
	console.log(data.firstTrain);
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    var remainder = diffTime % frequency;
    console.log(remainder);
    var MinutesTillTrain = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);
    var nextTrain = moment().add(MinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //Created the table to add the data
	$("#table-body").append(`<tr><td>${data.trainName}</td><td>${data.destination}</td><td>${data.frequency}</td><td>${nextTrain}</td><td>${MinutesTillTrain}</td></tr>`)
});

});
