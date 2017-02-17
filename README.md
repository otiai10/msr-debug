This is a product for debugging a problem with "MediaStreamRecorder".

https://github.com/streamproc/MediaStreamRecorder/issues/117

# Summary:

I successfully can create blob url of mp4 and that URL is able to be played on Chrome, but once I downloaded it, it's not playable for QuickTime Player.

# Reproducibility:

- 100%
- `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"`

```javascript
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
  });
};

window.onload = main;
```

# Screen Shots:

Console

<img src="https://cloud.githubusercontent.com/assets/931554/23016949/a7957f42-f438-11e6-95b9-300509f720e1.png" width="80%">

working and playable on Chrome
<img src="https://cloud.githubusercontent.com/assets/931554/23016851/57a3852e-f438-11e6-9f9b-f3a83e5e95e8.png" width="40%">

not playable on QuickTime
<img src="https://cloud.githubusercontent.com/assets/931554/23016859/5d695a88-f438-11e6-9f3b-c104f1fc0bd4.png" width="40%">

# Comment:

I also found https://github.com/streamproc/MediaStreamRecorder/issues/69 and I assumed that is because codec support of QuickTime. I'm not familiar with binary/blob/encode/decode stuff, therefore any of your advise would be helpful for me. Thank you again.
