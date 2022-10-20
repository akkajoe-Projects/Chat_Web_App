import socketio
from gevent import pywsgi
from geventwebsocket.handler import WebSocketHandler
sio = socketio.Server(async_mode='gevent', cors_allowed_origins='*')
app = socketio.WSGIApp(sio)
user_dict = {}
client_count = 0
sid_list = []

@sio.event
def connect(sid, environ):
    global client_count
    client_count += 1
    print(sid, 'connected')

@sio.event
def usernames(sid, username):
    sid_list.append(sid)
    user_dict[sid] = username
    print(user_dict)
    print('INSIDE USERNAMES')
    for i in sid_list:
        if i != sid:
            sio.emit('new_user ', username + ' has joined the chat', to=i)

@sio.event
def messages(sid, Msg):
    sid_value = None
    print(Msg)


    sender_username = user_dict[sid]
    if ':' in Msg:
        private_message_info = Msg.split(':')
        user_id = private_message_info[0]
        private_message = private_message_info[1]
        sid_value_list = [k for k in user_dict if user_dict[k] == user_id]
        for i in sid_value_list:
            sid_value = i
        print(sid_value)
        print(user_id)
        print(private_message)
        sio.emit('private_message',sender_username + ": " + private_message, to=sid_value)

    else:
        for i in sid_list:
            if i != sid:
                print(i)
                sio.emit('other_messages', sender_username + ': ' + Msg, to=i)

@sio.event
def disconnect(sid):
    print(sid, 'disconnected')
    # del user_dict[username]
    global client_count
    client_count-=1
    print('No. of clients connected', client_count)

print('Server is running.....')
pywsgi.WSGIServer(('127.0.0.1', 10005), app, handler_class=WebSocketHandler).serve_forever()
