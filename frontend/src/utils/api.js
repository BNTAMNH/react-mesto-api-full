class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getToken() {
        const token = localStorage.getItem('jwt');
        return { Authorization: `Bearer ${token}`, ...this._headers };
    }

    _handleResponse(res) {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._getToken()
        })
        .then(res => this._handleResponse(res))
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._getToken()
        })
        .then(res => this._handleResponse(res))
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._getToken(),
        body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }

    setNewCard(data) {
        const body = {
        name: data.name,
        link: data.link
        }

        return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._getToken(),
        body: JSON.stringify(body)
        })
        .then(res => this._handleResponse(res))
    }

    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
        method: 'DELETE',
        headers: this._getToken()
        })
        .then(res => this._handleResponse(res))
    }

    changeLikeCardStatus(idCard, isLiked) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._getToken()
        })
        .then(res => this._handleResponse(res))
    }

    changeAvatar(data) {
        const body = {
        avatar: data.avatar
        }

        return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._getToken(),
        body: JSON.stringify(body)
        })
        .then(res => this._handleResponse(res));
    }
}

const api = new Api({
    url: 'http://localhost:3001',
    headers: {
        "Content-type": "application/json"
    }
});

export default api;