// document.querySelector('button').addEventListener('click',forwardBackward);


// function forwardBackward(){
// const word = document.querySelector('input').value;
//    fetch(`/api?word=${encodeURIComponent(word)}`)
//     .then(response => response.text()) // server returns "true" or "false"
//     .then((data) => {
//       // data will be "true" or "false" as a string
//       const message = data === 'true' 
//         ? `${word} is a palindrome` 
//         : `${word} is not a palindrome`;

//       document.querySelector('h2').innerText = message;
    
// }

//     ) wasnt working ran through AI: response.text() — Use this because your server is sending plain text, not JSON.
// data will literally be "true" or "false".
// You can combine it with the word for display:



document.querySelector('button').addEventListener('click', forwardBackward);

function forwardBackward() {
  const word = document.querySelector('input').value.trim();

  if (!word) {
    alert("Type a word first!");
    return;
  }

  fetch(`/api?word=${encodeURIComponent(word)}`)
    .then(response => response.text()) // server returns "true" or "false"
    .then((data) => {
      // data will be "true" or "false" as a string
      const message = data === 'true' 
        ? `${word} is a palindrome` 
        : `${word} is not a palindrome`;

      document.querySelector('h2').innerText = message;
    })
    .catch(error => console.error('Error:', error));
}

