const socket = io();
const video = document.getElementById('videoPlayer');

let isSyncing = false;

video.addEventListener('play', () => {
    if (!isSyncing) socket.emit('play', video.currentTime);
});

video.addEventListener('pause', () => {
    if (!isSyncing) socket.emit('pause', video.currentTime);
});

video.addEventListener('seeked', () => {
    if (!isSyncing) socket.emit('seek', video.currentTime);
});

socket.on('play', (time) => {
    isSyncing = true;
    if (Math.abs(video.currentTime - time) > 1) {
        video.currentTime = time;
    }
    video.play().then(() => {
        isSyncing = false;
    }).catch(err => console.log(err));
});

socket.on('pause', (time) => {
    isSyncing = true;
    video.currentTime = time;
    video.pause();
    setTimeout(() => { isSyncing = false }, 100);
});

socket.on('seek', (time) => {
    isSyncing = true;
    video.currentTime = time;
    setTimeout(() => { isSyncing = false }, 100);
});
