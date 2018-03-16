window.onload = function () {
    // Media Element player
    $('audio,video').mediaelementplayer({
        success: function (player, node) {
            $('#' + node.id + '-mode-').html('mode: ' + player.pluginType);
        },
        startLanguage: 'en',
        translationSelector: true
    });

    // Variables - Global
    let textTranscript = document.querySelector('.transcript');
    let video = document.querySelector('video');
    let textTracks = video.textTracks;
    let textTrack = textTracks[0];
    let cues = textTrack.cues;
    let cue = cues[0];
    let currentTime = document.querySelector('span.mejs__currenttime');

    // Create the transcript content on the page 
    function createTranscript() {

        // Append paragraphs to textTranscript
        for (let j = 0; j < 3; j++) {
            let elementParagraph
        }
        let elementParagraph0 = document.createElement('p');
        let elementParagraph1 = document.createElement('p');
        let elementParagraph2 = document.createElement('p');
        textTranscript.appendChild(elementParagraph0);
        textTranscript.appendChild(elementParagraph1);
        textTranscript.appendChild(elementParagraph2);

        for (let i = 0; i < cues.length; i++) {
            // Append spans to paragraphs
            if (i >= 0 && i < 4) {
                let elementSpan = document.createElement('span');
                elementSpan.cue = cues[i];
                elementSpan.innerText = cues[i].text + "  ";
                elementParagraph0.appendChild(elementSpan);
            }

            // Append spans to paragraphs
            if (i >= 4 && i < 11) {
                let elementSpan = document.createElement('span');
                elementSpan.cue = cues[i];
                elementSpan.innerText = cues[i].text + "  ";
                elementParagraph1.appendChild(elementSpan);
            }

            // Append spans to paragraphs
            if (i >= 11 && i < cues.length) {
                let elementSpan = document.createElement('span');
                elementSpan.cue = cues[i];
                elementSpan.innerText = cues[i].text + "  ";
                elementParagraph2.appendChild(elementSpan);
            }
        }
    }

    // Call function to create transcript on page 
    createTranscript();

    // Variables - textTranscript
    let spans = textTranscript.querySelectorAll('span');

    // Event listener for text transcript highlight changes
    video.ontimeupdate = function () {
        // Log video current time to console
        console.log(video.currentTime);

        // Go through each element of cues
        for (let i = 0; i < cues.length; i++) {
            let element = cues[i];

            // Change class of sentence currently being spoken.  Class is used to highlight sentence.
            if (video.currentTime >= element.startTime && video.currentTime <= element.endTime) {
                spans[i].className = 'highlight';
            } else if (video.currentTime < element.startTime || video.currentTime > element.endTime) {
                spans[i].className = '';
            }
        }
    };

    //Reset Video Start Time to start time from matching text & play video
    function textJump(event) {
        video.currentTime = event.target.cue.startTime;
        video.play();
    }

    //Event listener for text click on transcript
    for (let i = 0; i < spans.length; i++) {
        spans[i].onclick = textJump;
    }
}
