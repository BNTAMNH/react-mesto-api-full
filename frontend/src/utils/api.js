class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
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
            authorization: this._token
        }
        })
        .then(res => this._handleResponse(res))
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
            authorization: this._token
        }
        })
        .then(res => this._handleResponse(res))
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
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
            authorization: this._token,
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
            authorization: this._token
        }
        })
        .then(res => this._handleResponse(res))
    }

    changeLikeCardStatus(idCard, isLiked) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
            authorization: this._token
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
            authorization: this._token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => this._handleResponse(res));
    }
}

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-43', 
    '233a8c63-1700-4115-a0b1-8a186f84e03d'
    );
export default api;