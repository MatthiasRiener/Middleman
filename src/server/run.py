from config import app, socketio

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, use_reloader=True)