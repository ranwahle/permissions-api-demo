document.addEventListener('DOMContentLoaded', async () => {

    const status =  await navigator.permissions.query({name: 'camera'});
    status.onchange = () => {
        console.log(status.state)
    }

    const statusDiv = document.querySelector('#statusDiv');
    const video = document.querySelector('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        try {
            statusDiv.textContent = 'getting stream ';

            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();

            statusDiv.textContent = 'Video is playing';
        }
        catch (err) {
            statusDiv.textContent = err;
        }

    }
})
