// Run image named 'fname' (absolute path to image file) against the classifier identified by 'api_key',
// using IBM Watson Visual Recognition service.
function classify(classifier_ids, api_key, fname) {
  var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
  var fs = require('fs');

  var visual_recognition = new VisualRecognitionV3({
    api_key: api_key,
    version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
  });

  var params = {
    images_file: fs.createReadStream(fname),
    classifier_ids: classifier_ids
  };

  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });
}

// Run a bash binary. 'cmd' is a string with the invocation command.
function prompt(cmd) {
  const { exec } = require('child_process');
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

// Function calls

prompt("raspistill -w 300 -h 200 -t 1 -o img.jpg");

classify(["CLASSIFIER_ID", "default"], "API_KEY", "./img.jpg");
