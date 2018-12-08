var resume;
var greekedResume;
var realData = true;

$(function() {
  $('#skillHeader').click(function() {
    $('#skillSection').toggle();
  });
  $('#workHeader').click(function() {
    $('#workSection').toggle();
  });
  $('#finalHeader').click(function() {
    $('#educationSection').toggle();
  });
  $('#myName').click(function(){
    toggleGreeked();
  })
});

function toggleGreeked() {
  if (realData == true) {
    if (greekedResume == null) {
      greekedResume = $.ajax({type: 'GET', url: 'greekedResume.json', dataType: 'json', async: false}).responseJSON;
    }
    document.getElementById('workSection').innerHTML = null;
    document.getElementById('educationSection').innerHTML = null;
    displayFromJson(greekedResume);
    realData = false;
  }
  else {
    document.getElementById('workSection').innerHTML = null;
    document.getElementById('educationSection').innerHTML = null;
    displayFromJson(resume);
    realData = true;
  }
}

function displayFromJson(resume) {
  $('#myName').text(resume.name);
  $('#title').text(resume.title);
  $('#phone').text(resume.phone);
  $('#email').text(resume.email);
  $('#skillSection').text(resume.skillSummary);


  for (i in resume.workExperience) {

      //inputs heading for each job (name, location, title, dates)
      document.getElementById('workSection').innerHTML += '<p><strong>' + resume.workExperience[i].cName + resume.workExperience[i].cAddress + '</strong><em>' + resume.workExperience[i].jobTitle + '</em><br><span>' + resume.workExperience[i].dateString + '</span></p>';

      //inputs responsibilities for each job.
      document.getElementById('workSection').innerHTML += '<ul>';
      for (j in resume.workExperience[i].responsibilites) {
        document.getElementById('workSection').innerHTML += '<li>'+ resume.workExperience[i].responsibilites[j] + '</li>';
      }
      document.getElementById('workSection').innerHTML += '</ul><br>';

  }

  //inputs educationSection
  document.getElementById('educationSection').innerHTML += '<p><strong>' + resume.uName + resume.uAddress +'</strong><em>' + resume.uStatus + '</em><br><span>' + resume.uDates + '</span></p>' + '<p>' + resume.uSummary + '</p>';
}


//Ajax standard json
 resume = $.ajax({type: 'GET', url: 'resume.json', dataType: 'json', async: false}).responseJSON;
displayFromJson(resume);
