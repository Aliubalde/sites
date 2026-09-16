const shareLinkInput = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');

const generateRoomId = () => Math.random().toString(36).substring(2, 8);
const params = new URLSearchParams(window.location.search);
const roomId = params.get('sala') || generateRoomId();

const shareUrl = new URL(window.location.href);
shareUrl.searchParams.set('sala', roomId);
window.history.replaceState({}, '', shareUrl);

const roomLink = shareUrl.toString();
if (shareLinkInput) shareLinkInput.value = roomLink;

const socket = io({ query: { roomId } });

const copyText = async (text, button) => {
    try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copiado!';
    } catch (error) {
        const temp = document.createElement('input');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
        button.textContent = 'Copiado!';
    }

    setTimeout(() => {
        button.textContent = 'Copiar link';
    }, 1200);
};

copyLinkBtn.addEventListener('click', () => copyText(roomLink, copyLinkBtn));

socket.on('connect', () => {
    console.log('Sala conectada:', roomId);
});
