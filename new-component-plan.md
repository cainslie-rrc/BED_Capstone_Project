# Implementing Audio

I think the obvious choice for the new feature is to add the ability to add audio. It wouldn’t be a very useful collaboration API if you couldn’t even upload your audio files.

After doing some research it looks like I'll have to use Multer to be able to add files in general, and it might be that I have to make a separate route to add the audio.  

## Useful Links

### Upload Audio in general

Found this link and thought I might be useful later when I actually implement it

https://gist.github.com/Leodau/d6d83e18f3fdef77de041fbf650cf523

This showed a good way to implement uploading audio

https://www.w3tutorials.net/blog/how-to-make-a-audio-file-uploader-nodejs/

This helped explain why using Multer is useful

https://expressjs.com/en/resources/middleware/multer.html

### Using Postman

https://www.edureka.co/community/280833/how-do-i-send-a-file-from-postman-to-node-js-with-multer

https://learning.postman.com/docs/sending-requests/create-requests/test-data/