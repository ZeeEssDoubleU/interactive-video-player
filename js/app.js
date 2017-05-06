window.onload = function () {
    // Media Element player
    $('audio,video').mediaelementplayer({
        success: function (player, node) {
            $('#' + node.id + '-mode-').html('mode: ' + player.pluginType);
        },
        startLanguage: 'en',
        translationSelector: true
    });

    // Global variables
    let textTranscript = document.querySelector('.transcript');
    let video = document.querySelector('video');
    let currentTime = document.querySelector('span.mejs__currenttime');

    // JSON for cue start/end times & text.  An array of objects.
    let transcriptData = [
        [
            {
                "start": "0.01",
                "end": "7.535",
                "text": "Now that we've looked at the architecture of the internet, let's see how you might connect your personal devices to the internet inside your house."
            },
            {
                "start": "7.536",
                "end": "13.960",
                "text": "Well there are many ways to connect to the internet, and most often people connect wirelessly."
            }
        ],
        [
            {
                "start": "13.961",
                "end": "17.940",
                "text": "Let's look at an example of how you can connect to the internet."
            },
            {
                "start": "17.941",
                "end": "30.920",
                "text": "If you live in a city or a town, you probably have a coaxial cable for cable Internet, or a phone line if you have DSL, running to the outside of your house, that connects you to the Internet Service Provider, or ISP."
            },
            {
                "start": "32.100",
                "end": "41.190",
                "text": "If you live far out in the country, you'll more likely have a dish outside your house, connecting you wirelessly to your closest ISP, or you might also use the telephone system."
            }
        ],
        [
            {
                "start": "42.350",
                "end": "53.760",
                "text": "Whether a wire comes straight from the ISP hookup outside your house, or it travels over radio waves from your roof, the first stop a wire will make once inside your house, is at your modem."
            },
            {
                "start": "53.761",
                "end": "57.780",
                "text": "A modem is what connects the internet to your network at home."
            },
            {
                "start": "57.781",
                "end": "59.000",
                "text": "A few common residential modems are DSL or..."
            }
        ]
    ];

    // Create the transcript content on the page 
    function createTranscript() {

        // Append paragraphs to textTranscript
        for (let i = 0; i < transcriptData.length; i++) {
            let elementParagraph = document.createElement('p');
            textTranscript.appendChild(elementParagraph);

            // Append spans to paragraphs
            for (let j = 0; j < transcriptData[i].length; j++) {
                let elementSpan = document.createElement('span');
                elementSpan.cue = transcriptData[i][j];
                elementSpan.innerText = transcriptData[i][j].text + "  ";
                elementParagraph.appendChild(elementSpan);
            }
        }
    }

    // Call function to create transcript on page 
    createTranscript();

    // Event listener for text transcript highlight changes
    video.ontimeupdate = function () {

        // Log video current time to console
        console.log(video.currentTime);

        // Go through each element of transcriptData
        for (let i = 0; i < transcriptData.length; i++) {
            for (let j = 0; j < transcriptData[i].length; j++) {
                let element = transcriptData[i][j];

                // Change class of sentence currently being spoken.  Class is used to highlight sentence.
                if (video.currentTime >= element.start && video.currentTime <= element.end) {
                    textTranscript.children[i].children[j].classList.add('highlight');
                } else if (video.currentTime < element.start || video.currentTime > element.end) {
                    textTranscript.children[i].children[j].classList.remove('highlight');
                }
            }
        }
    };

    //Reset Video Start Time to start time from matching text & play video
    function textJump(event) {
        video.currentTime = event.target.cue.start;
        video.play();
    }

    //Event listener for text click on transcript
    let spans = textTranscript.querySelectorAll('span');
    for (let i = 0; i < spans.length; i++) {
        spans[i].onclick = textJump;
    }
}
