var raw_data = $.ajax({ url: 'https://www.vibrantcitieslab.com/wordpress/wp-content/themes/fresh-vcl-theme/js/cleaned_info.json', async: false, dataType: 'json', 
			success: function (response) { return response} });

function getAllLocations () {
	var locations = []
	raw_data['responseJSON'].forEach(function (arrayItem) {locations.push(arrayItem.STATE); });
	locations = [ ...new Set(locations)]
	return locations;
        }

function getAllForState (userSelection) {
	var objects = []
	raw_data['responseJSON'].forEach(function(arrayItem) { if (arrayItem.STATE==userSelection) { objects.push(arrayItem); } });
	return objects
        }

function basics() {
	allLocations = getAllLocations();
	document.getElementById("stateOptions").innerHTML = ""
	for (var i = 0; i < allLocations.length; i++) { 
		document.getElementById("stateOptions").innerHTML +=
		"<option value='" + allLocations[i] + "'>" + allLocations[i] + "</option>"
	}
}

function queryState() { 
            var userSelection = document.getElementById("stateOptions").value;
	    var resp = getAllForState(userSelection); 
	    document.getElementById("specificStateInfo").innerHTML = "<h5>State: " + userSelection + "</h5>";
	    document.getElementById("specificStateInfo").innerHTML += "<hr>";
	    if (resp.length == 0) {
            	document.getElementById("specificStateInfo").innerHTML =  
	            "<h3>You chose " +  userSelection + "!</h3> <br /> <p>However, we have no information for that state :(</p>"; 
		    console.log("ERROR: User accessed state they shouldn't have");
		    console.log(userSelection);
	    }
	    else {
		for (var i = 0; i < resp.length; i++) {
			if (resp[i].GRANTEES) { document.getElementById("specificStateInfo").innerHTML += "<p>Grantee: " + resp[i].GRANTEES + "</p>"}
			if (resp[i].POTENTIAL_FUNDERS) { document.getElementById("specificStateInfo").innerHTML +="<p>Potential Funder: " + resp[i].POTENTIAL_FUNDERS + "</p>" }
			if (resp[i].PROJECT_DESCRIPTION) { document.getElementById("specificStateInfo").innerHTML +="<p>Project Description: " + resp[i].PROJECT_DESCRIPTION + "</p>" }
			if (resp[i].OTHERCONTACT) { document.getElementById("specificStateInfo").innerHTML +="<p>Phone Number: " + resp[i].OTHERCONTACT + "</p>" }
			if (resp[i].EMAIL) { document.getElementById("specificStateInfo").innerHTML +="<p>Email: " + resp[i].EMAIL + "</p>" }
			//if (resp[i].GRANTEE_DESCRIPTION) { document.getElementById("specificStateInfo").innerHTML +="<p>Grantee Description: " + resp[i].GRANTEE_DESCRIPTION + "</p>" }
			//if (resp[i].SAMPLE_PROJECTS) { document.getElementById("specificStateInfo").innerHTML +="<p>Sample Projects: " + resp[i].SAMPLE_PROJECTS + "</p>" }
			if (resp[i].URL) { document.getElementById("specificStateInfo").innerHTML +="<p><a href='"+              
            ( (resp[i].URL.includes("http")) ? "" : "https://" )+resp[i].URL +"' target='_blank'>url: " + resp[i].URL + "</a></p>" }
			document.getElementById("specificStateInfo").innerHTML += "<hr>";
            console.log(resp[i].URL);

		}
	    }
        }