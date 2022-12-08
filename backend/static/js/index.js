'use strict';
const otherUserID = document.getElementById('other-user-id').textContent.trim();
const currentUserUsername = document
  .getElementById('current-username')
  .textContent.trim()
  .replace(/\"/g, '');

const webSocket = new WebSocket(
  `${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${
    document.body.dataset.host
  }/ws/chat/${otherUserID}/`
);

console.log(
  `${document.body.dataset.scheme === 'http' ? 'ws' : 'wss'}://${
    document.body.dataset.host
  }/ws/chat/${otherUserID}/`
);

webSocket.addEventListener('open', (event) => {
  //   document.getElementById(
  //     'message-wrapper'
  //   ).innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
  //                Conversation has started.
  //               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  //             </div>`;
});

webSocket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  const chatBody = document.getElementById('chat-body');
  let newMessage = '';

  if (data.senderUsername === currentUserUsername) {
    newMessage = `
    <li class="d-flex justify-content-end mb-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between p-3">
          <p class="fw-bold mb-0">${data.senderUsername}</p>
          <p class="text-muted small mb-0">
            <i class="far fa-clock"></i> 12 mins ago
          </p>
        </div>
        <div class="card-body">
          <p class="mb-0">
            ${data.message}
          </p>
        </div>
      </div>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
        alt="{{message.sender}}"
        title="{{message.sender}}"
        class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
        width="60"
      />
    </li>
    `;
  } else {
    newMessage = `
    <li class="d-flex justify-content-start mb-4">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
        alt="You"
        title="You"
        class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
        width="60"
      />
      <div class="card">
        <div class="card-header d-flex justify-content-between p-3">
          <p class="fw-bold mb-0">${data.senderUsername}</p>
          <p class="text-muted small mb-0">
            <i class="far fa-clock"></i> 12 mins ago
          </p>
        </div>
        <div class="card-body">
          <p class="mb-0">
            ${data.message}
          </p>
        </div>
      </div>
    </li>
    `;
  }
  chatBody.innerHTML += newMessage;
  console.log(`SenderUser: ${data.senderUsername}`);
  console.log(`currentUserUsername: ${currentUserUsername}`);
  console.log(data.senderUsername === currentUserUsername);
});

webSocket.addEventListener('error', (event) => {
  document.getElementById(
    'message-wrapper'
  ).innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          An error occurred.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
});

webSocket.addEventListener('close', (event) => {
  document.getElementById(
    'message-wrapper'
  ).innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      Chat ended.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
});

document
  .getElementById('send-message-btn')
  .addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Here');
    const messageInput = document.getElementById('message-body');
    webSocket.send(
      JSON.stringify({
        message: messageInput.value,
        senderUsername: currentUserUsername,
      })
    );
    messageInput.value = '';
  });

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(function () {
    document.querySelectorAll('.alert').forEach((element) => {
      element.querySelectorAll('.btn-close').forEach((el) => {
        el.click();
      });
    });
  }, 2000);
});
