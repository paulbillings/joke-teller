const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/ enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS api
function tellMe(joke) {
  VoiceRSS.speech({
    key: '3c79e5b2a90241a9b3da19e895ee352a',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes from joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text-to-speach
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (err) {
    // catch errors here
    console.log('whoops', err);
  }
}

//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);