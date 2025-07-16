<h1>YOUTUBE-TO-MP3</h1>

<h3>youtube-to-mp3 is an open-source converter for YouTube videos into mp3 files
It is built using html so you will have to run it in your browser but it requires very little setup!</h3>
I will be adding an mp4 addition to this soon enough. I just needed to download youtube video mp3 for music samples and I hated how all other websites took too long or displayed stupid ads, so I made my own. This is my first time doing a public repository on GitHub and my first time doing instructions so sorry if they suck. 

<h2>How to run:</h2>

<h3>🧱 Prerequisites:</h3>

Make sure you have installed:

<h2>- Node.js (v16+ recommended)</h2>

<h2>- yt-dlp</h2>

  <h4>For brew:</h4>
  (I have no clue if it works with brew but I expect it to)

  <pre>
    <code>
      brew install yt-dlp
    </code>
  </pre>

<h4>Standalone download:</h4>
  1. Go to the <a href="https://github.com/yt-dlp/yt-dlp/releases/tag/2025.06.30">yt-dlp GitHub Releases page</a>.

  2. Download: yt-dlp.exe
 
  3. Move it to a permanent folder like:
  <pre>
  <code>
      C:\yt-dlp\
  </code>
  </pre>

  4. Add that folder to your System PATH:

  Press Win + R, type sysdm.cpl, go to Advanced > Environment Variables.

  Under System variables, find Path, click Edit, then New, and add:
  <pre>
  <code>
      C:\yt-dlp\ (or whatever you named your file)
  </code>
  </pre>

  <h4>Once finished installing yt-dlp run:</h4>

  <pre>
    <code>
      yt-dlp --version
    </code>
  </pre>
  If it shows a version number, you can move on.


<h2>- ffmpeg (required for audio conversion)</h2>

  <h4>For brew:</h4>

  <pre>
    <code>
       brew install ffmpeg
    </code>
  </pre>

  <h4>For windows:</h4>

  1. Go to the <a href="https://www.gyan.dev/ffmpeg/builds/">ffmpeg windows builds</a>.
 
  2. Under “Release builds”, download:
     <pre>
       <code>
         ffmpeg-release-full.7z (or ZIP)
       </code>
     </pre>

  3. Create and then extract your zip to a permanent folder like:
  <pre>
  <code>
        C:\ffmpeg\
  </code>
  </pre>

  4. Press Win + R, type: sysdm.cpl, press Enter.

  5. Go to Advanced > Environment Variables

  6. Under System variables, find Path → click Edit → click New.

  7. Add:

     <pre>
       <code>
          C:\ffmpeg\bin
       </code>
     </pre>

   8. Click OK → OK → OK

<h2>How to Run:</h2>

  1. Download a zip of youtube-to-mp3

  2. Create an empty folder named "downloads" in \youtube-to-mp3-main (This is where your videos will be saved to).

  3. Open your command prompt or terminal and cd into \youtube-to-mp3-main:

  4. Then enter:
  
  <pre>
    <code>
        npm install
    </code>
  </pre>

   4. Finally run:
  
  <pre>
    <code>
        node server.js
    </code>
  </pre>

  Then open <a href="http://localhost:3000">http://localhost:3000</a> in your browser.

<h2>And thats it..</h2>
