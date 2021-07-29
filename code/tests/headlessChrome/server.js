//Creacio del servidor websockets

//....

//Al iniciar servidor
wss.on('connection', (ws, req) => {
  
    // Ensure that the URL starts with '/rtmp/', and extract the target RTMP URL.
    let match;
    match = "rtmp://example.com";
    
    const rtmpUrl = "rtmp://example.com";
    console.log('Target RTMP URL:', "rtmp://example.com");
    
    // Launch FFmpeg to handle all appropriate transcoding, muxing, and RTMP
    const ffmpeg = child_process.spawn('ffmpeg', [
      // Facebook requires an audio track, so we create a silent one here.
      // Remove this line, as well as `-shortest`, if you send audio from the browser.
      //'-f', 'lavfi', '-i', 'anullsrc',
      
      // FFmpeg will read input video from STDIN
      '-r', '30',
  
      '-i', '-',    
      
      // Because we're using a generated audio source which never ends,
      // specify that we'll stop at end of other input.  Remove this line if you
      // send audio from the browser.
      //'-shortest',
  
      '-f', 'pulse',
      '-i', 'alsa_output.output_name.analog-stereo.monitor',
  
      '-async', '1',
  
      '-ac', '2',
      
      // If we're encoding H.264 in-browser, we can set the video codec to 'copy'
      // so that we don't waste any CPU and quality with unnecessary transcoding.
      // If the browser doesn't support H.264, set the video codec to 'libx264'
      // or similar to transcode it to H.264 here on the server.
      '-vcodec', 'copy',
      
      // AAC audio is required for Facebook Live.  No browser currently supports
      // encoding AAC, so we must transcode the audio to AAC here on the server.
      '-acodec', 'aac',
      
      // FLV is the container format used in conjunction with RTMP
      '-f', 'flv',
      
      // The output RTMP URL.
      // For debugging, you could set this to a filename like 'test.flv', and play
      // the resulting file with VLC.
      rtmpUrl 
    ]);
    
    //FFmpeg error and close functions

    //....
    
  });
  