class Api {
    constructor(url, token) {
        this._url = url;
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
        headers: {
            authorization: `Bearer ${token}`
        }
        })
        .then(res => this._handleResponse(res))
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
        })
        .then(res => this._handleResponse(res))
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
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
        headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => this._handleResponse(res))
    }

    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
        })
        .then(res => this._handleResponse(res))
    }

    changeLikeCardStatus(idCard, isLiked) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
            authorization: `Bearer ${token}`
        }
        })
        .then(res => this._handleResponse(res))
    }

    changeAvatar(data) {
        const body = {
        avatar: data.avatar
        }

        return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => this._handleResponse(res));
    }
}

let token = localStorage.getItem('jwt');
const api = new Api(
    'http://localhost:3001'
    );
export default api;