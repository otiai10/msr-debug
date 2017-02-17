const main = () => {
  console.log('MediaStreamRecorder:', typeof MediaStreamRecorder);
  navigator.getUserMedia({audio:false, video:true}, (stream) => {

    var recorder = new MediaStreamRecorder(stream);
    // recorder.mimeType = 'video/mp4';
    recorder.mimeType = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    recorder.width    = 800;
    recorder.height   = 480;

    recorder.ondataavailable = (blob) => {
      const url = URL.createObjectURL(blob);
      // It works, looks good.
      window.open(url);

      // When I downloaded it as a file,
      var a = document.createElement('a');
      a.href = url;
      a.download = 'msr-example.mp4';
      a.click();
      // successful, but not playable on QuickTime Player
    };

    // Record it for 3s
    recorder.start();
    setTimeout(() => recorder.stop(), 3000);

  }, (err) => {
    console.error('getUserMedia failed', err);
  })

};

window.onload = main;
