import httpStatus from "http-status-codes";
import formUrlEncoded from "form-urlencoded";

const CONTENT_TYPE_JSON = "application/json";

const statusWithContent = [
    httpStatus.OK,
    httpStatus.CREATED,
    httpStatus.ACCEPTED
];

function ensureIsSucceed(response) {

    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);

    error.response = response;

    throw error;
}

async function safeFetch(url, options) {

    const response = await fetch(url, options);

    ensureIsSucceed(response);

    return response;
}

async function safeFetchJson(url, options) {

    const response = await safeFetch(url, options);
    const content  = statusWithContent.includes(response.status) ?
        await response.json() :
        undefined;

    return {
        content,

        status: {
            code: response.status,
            text: response.statusText
        }
    };
}

function getJson(url, data = undefined, headers = {}) {

    if (data) {
        url += "?" + formUrlEncoded(data);
    }

    headers = Object.assign({}, headers, {
        "Accept": CONTENT_TYPE_JSON
    });

    return safeFetchJson(url, {
        headers
    });
}

function sendJson(url, method, data, headers = {}) {

    headers = Object.assign({}, headers, {
        "Accept"      : CONTENT_TYPE_JSON,
        "Content-Type": CONTENT_TYPE_JSON
    });

    return safeFetchJson(url, {
        headers,
        method,

        body: JSON.stringify(data)
    });
}

export {
    safeFetch,
    getJson,
    sendJson
};
