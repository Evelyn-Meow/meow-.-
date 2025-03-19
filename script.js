document.addEventListener('DOMContentLoaded', function () {
    const titleText = 'Evelyn ♡ "Dangerous" ♡ Meow ♡ ';
    let index = 0;

    setInterval(() => {
        document.title = titleText.substring(index, titleText.length) + titleText.substring(0, index);
        index = (index + 1) % titleText.length;
    }, 250);

    const typedUsername = '@Evelyn ';
    let charIndexUsername = 0;
    const usernameContainer = document.getElementById('username');
    usernameContainer.classList.add('typing-container');

    function typeUsername() {
        if (charIndexUsername < typedUsername.length) {
            usernameContainer.textContent += typedUsername.charAt(charIndexUsername);
            charIndexUsername++;
            setTimeout(typeUsername, 100);
        } else {
            usernameContainer.classList.remove('typing-container');
        }
    }

    const typedSillyBilly = 'Evelyn "Dangerous" Meow';
    let charIndexSillyBilly = 0;
    const sillyBillyContainer = document.getElementById('silly-billy');
    sillyBillyContainer.classList.add('typing-container');

    function typeSillyBilly() {
        if (charIndexSillyBilly < typedSillyBilly.length) {
            sillyBillyContainer.textContent += typedSillyBilly.charAt(charIndexSillyBilly);
            charIndexSillyBilly++;
            setTimeout(typeSillyBilly, 100);
        } else {
            sillyBillyContainer.classList.remove('typing-container');
        }
    }

    // Music player functionality
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const volumeButton = document.getElementById('volume-button');
    const trackTitleSpan = document.getElementById('track-title');

    const playlist = [
        {
            title: 'HIGHJACK - A$AP Rocky & Jessica Pratt',
            url: 'highjack.mp3'
        },
        {
            title: 'Les - Childish Gambino',
            url: 'les.mp3'
        },
        {
            title: 'Sunday - Earl Sweatshirt & Frank Ocean',
            url: 'sunday.mp3'
        },
        {
            title: 'Walk on By - Nxworries, Anderson .Paak, Earl Sweatshirt & Rae Khalil',
            url: 'walk_on_by.mp3'
        },
        {
            title: 'We Need All Da Vibes - Playboi Carti, Young Thug & Ty Dolla $ign',
            url: 'WE NEED ALL DA VIBES.mp3'
        },

    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrackIndex = index;
            audioPlayer.src = playlist[currentTrackIndex].url;
            trackTitleSpan.textContent = playlist[currentTrackIndex].title;
            audioPlayer.load();
            if (!audioPlayer.paused) {
                audioPlayer.play();
            }
        }
    }

    function playPauseTrack() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = '❚❚';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = '▶';
        }
    }

    function playNextTrack() {
        let nextIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(nextIndex);
        playPauseTrack();
    }

    function playPrevTrack() {
        let prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(prevIndex);
        playPauseTrack();
    }

    // Initialize first track
    loadTrack(0);

    // Event Listeners
    playPauseButton.addEventListener('click', playPauseTrack);
    nextButton.addEventListener('click', playNextTrack);
    prevButton.addEventListener('click', playPrevTrack);

    audioPlayer.addEventListener('ended', playNextTrack);

    audioPlayer.addEventListener('timeupdate', function () {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressBar.value = (currentTime / duration) * 100;
        currentTimeSpan.textContent = formatTime(currentTime);
        durationSpan.textContent = formatTime(duration);
    });

    progressBar.addEventListener('input', function () {
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (progressBar.value / 100) * duration;
    });

    volumeButton.addEventListener('click', function () {
        audioPlayer.muted = !audioPlayer.muted;
        volumeButton.textContent = audioPlayer.muted ? '🔇' : '🔊';
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // Modify the click event to initialize with the first track
    document.addEventListener('click', function () {
        const gif = document.getElementById('background-gif');
        gif.classList.remove('hidden');
        document.getElementById('profile-card').classList.remove('hidden');
        document.getElementById('gradient-background').classList.add('hidden');

        audioPlayer.volume = 0.2;
        loadTrack(0);
        playPauseTrack();

        // Trigger typing effect after click
        typeUsername();
        typeSillyBilly();
    }, { once: true });

    // Mouse trail effect
    document.addEventListener('mousemove', e => {
        const cursorTrail = document.createElement('div');
        cursorTrail.className = 'cursor-trail';
        cursorTrail.style.left = `${e.pageX}px`;
        cursorTrail.style.top = `${e.pageY}px`;
        document.getElementById('cursor-trail-container').appendChild(cursorTrail);
        setTimeout(() => {
            cursorTrail.remove();
        }, 200);
    });
});
