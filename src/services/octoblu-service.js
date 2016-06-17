import axios from 'axios'
import moment from 'moment'

function getRequest({ apiBaseUrl, uuid, token }) {
  return axios.create({
    baseURL: apiBaseUrl,
    responseType: 'json',
    auth: {
      username: uuid,
      password: token,
    },
  })
}

function getAuth(request, callback) {
  request.get('/api/auth')
    .then(function (response) {
      if (response.status !== 200) {
        callback(new Error('Invalid Response from /api/auth'))
        return
      }
      if (response.data.userDevice.octoblu == null) {
        callback(new Error('Missing octoblu on userDevice'))
        return
      }
      callback(null, response.data.userDevice)
    }, callback)
}

function getUserHash(request, callback) {
  request.get('/api/intercom/user_hash')
    .then(function (response) {
      if (response.status !== 200) {
        callback(new Error('Invalid Response from /api/intercom/user_hash'))
        return
      }
      callback(null, response.data)
    }, callback)
}

export function getUser({ apiBaseUrl, uuid, token }, callback) {
  const request = getRequest({ apiBaseUrl, uuid, token })
  getAuth(request, (error, { octoblu } = {}) => {
    if (error) {
      callback(error)
      return
    }

    getUserHash(request, (error, { user_hash } = {}) => {
      if (error) {
        callback(error)
        return
      }

      const {
        email,
        firstName,
        lastName,
        optInEmail,
        termsAcceptedAt,
      } = octoblu

      const user = {
        user_hash,
        email,
        name: `${firstName} ${lastName}`,
        created_at: moment(termsAcceptedAt).unix(),
        user_id: uuid,
        unsubscribed_from_emails: !optInEmail,
      }
      callback(null, user)
    })
  })
}
