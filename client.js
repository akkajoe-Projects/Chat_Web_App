console.log('JS Client connected')
const sio = io.connect('http://localhost:10005')
sio.on('connect', () => {
  console.log('connected');});

function send_username() {

    var username = document.getElementById('username').value;
    sio.emit('usernames', username);
    const input_box = document.getElementById('input_button');
    console.log(username);

    var Header1 = document.getElementById('Heading1');
    Header1.remove();
    var UserNameInputButton = document.getElementById('UsernamePage');
    UserNameInputButton.remove();

    var Heading2 = document.createElement('header');
    Heading2.setAttribute('id','Heading2');
    Confirmation = "You are connected to the chat"
    Heading2.textContent = Confirmation.concat(" @",username);
    WebWindow.appendChild(Heading2);

    var WebWindowRow = document.createElement('div');
    WebWindowRow.setAttribute('id','WebWindowRow');
    WebWindowRow.setAttribute('class','row');
    WebWindow.appendChild(WebWindowRow);

    var ChatWindow = document.createElement('div');
    ChatWindow.setAttribute('id','ChatWindow');
    ChatWindow.setAttribute('class', 'col-11');
    WebWindowRow.appendChild(ChatWindow);
    var ChatWindowRow = document.createElement('div');
    ChatWindowRow.setAttribute('id','ChatWindowRow');
    ChatWindowRow.setAttribute('class', 'row');
    ChatWindow.appendChild(ChatWindowRow);

    var ReceivedMessageSide = document.createElement('div');
    ReceivedMessageSide.setAttribute('id','ReceivedMessageSide');
    ReceivedMessageSide.setAttribute('class','col-6');
    ChatWindowRow.appendChild(ReceivedMessageSide);

    var MyMessageSide = document.createElement('div');
    MyMessageSide.setAttribute('id','MyMessageSide');
    MyMessageSide.setAttribute('class','col-6');
    MyMessageSide.setAttribute('style','color:white;')
    ChatWindowRow.appendChild(MyMessageSide);

    var Sidebardiv = document.createElement('div');
    Sidebardiv.setAttribute('id','Sidebardiv');
    Sidebardiv.setAttribute('class','col-1');
    WebWindowRow.appendChild(Sidebardiv);

    var wrapper = document.createElement('div');
    wrapper.setAttribute('class','wrapper');

    var nav = document.createElement('nav');
    nav.setAttribute('id','sidebar');
    wrapper.appendChild(nav);
    var sidebar_header = document.createElement('div');
    sidebar_header.setAttribute('class','sidebar-header');
    nav.appendChild(sidebar_header);
    var heading = document.createElement('h3');
    heading.innerHTML = 'Active Users';
    sidebar_header.appendChild(heading);

    var nav2 = document.createElement('nav');
    nav2.setAttribute('id','nav2');
    nav2.setAttribute('class','navbar navbar-expand-lg navbar-light bg-light');
    Sidebardiv.appendChild(nav2);

    var container = document.createElement('div');
    container.setAttribute('id','container_fluid');
    container.setAttribute('class','container-fluid');
    nav2.appendChild(container);

    sidebar_button = document.createElement('button');
    sidebar_button.setAttribute('type','button');
    sidebar_button.setAttribute('id','sidebarCollapse');
    sidebar_button.setAttribute('class','btn btn-info');
    container.appendChild(sidebar_button);

    var i = document.createElement('i');
    i.setAttribute('class','fas fa-align-left');
    sidebar_button.appendChild(i);
    var span = document.createElement('span');
    span.innerHTML = '&#9776';
    sidebar_button.appendChild(span);

    var MessageInputButton = document.createElement('div');
    MessageInputButton.setAttribute('id','MessageInputButton');
    MessageInputButton.setAttribute('class','row');
    WebWindow.appendChild(MessageInputButton);

    var MessageForm = document.createElement('form');
    MessageForm.setAttribute('id','MessageForm');
    MessageInputButton.appendChild(MessageForm);

    var MessageInput = document.createElement('input');
    MessageInput.setAttribute('id','MessageInput');
    MessageInput.setAttribute('type','text');
    MessageForm.appendChild(MessageInput);

    var MessageButton = document.createElement('button');
    MessageButton.setAttribute('id','MessageButton');
    MessageButton.setAttribute('onclick','displayMyMessage()');
    MessageButton.setAttribute('type','button');
    MessageButton.innerHTML = "Enter";
    MessageForm.appendChild(MessageButton);

    sio.on('new_user', (user_announcement) => {console.log(user_announcement);
    });

    sio.on('other_messages', (message) => {console.log(message);
    });

    sio.on('other_messages', (message) => {
        var ReceivedMessage = document.createElement('div');
        ReceivedMessage.setAttribute('id','ReceivedMessage');
        ReceivedMessage.innerHTML = message;
        ReceivedMessageSide.appendChild(ReceivedMessage);

        var Seperator1 = document.createElement('div');
        Seperator1.setAttribute('id','Seperator1');
        Seperator1.innerHTML = "  .";
        MyMessageSide.appendChild(Seperator1);
    });
    sio.on('private_message', (private_message) => {
        console.log('inside private message');
        console.log(private_message);
        console.log(private_message);
        var PrivateMessage = document.createElement('div');
        PrivateMessage.setAttribute('id','PrivateMessage');
        PrivateMessage.innerHTML = private_message;
        ReceivedMessageSide.appendChild(PrivateMessage);

        var Seperator3 = document.createElement('div');
        Seperator3.setAttribute('id','Seperator3');
        Seperator3.innerHTML = "  .";
        MyMessageSide.appendChild(Seperator3);
    });
}

function displayMyMessage() {
        console.log('inside display message');
        var Msg = document.getElementById('MessageInput').value;
        sio.emit('messages', Msg);

        var MyMessage = document.createElement('div');
        MyMessage.setAttribute('id','MyMessage');
        MyMessage.innerHTML = Msg;
        console.log(Msg);
        MyMessageSide.appendChild(MyMessage);

        var Seperator2 = document.createElement('div');
        Seperator2.setAttribute('id','Seperator2');
        Seperator2.innerHTML = "         .";
        ReceivedMessageSide.appendChild(Seperator2);

        MessageInput.value = '';
        }

sio.on('disconnect', () => {
  console.log('disconnected');
});

function openNav() {
  var SidePanel = document.getElementById('SidePanel');
  SidePanel.setAttribute('style','width: 250px');
}

function closeNav() {
    var SidePanel = document.getElementById('SidePanel');
    SidePanel.setAttribute('style','width: 0px');
}