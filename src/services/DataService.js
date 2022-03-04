import { BASE_API_URL } from "./Common";
import { authHeader } from "./AuthService";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    GetAuctionDetails: async function () {
        return await axios.get(BASE_API_URL + "/auction");
    },
    SaveAuctionDetails: async function (auction) {
        return await axios.put(BASE_API_URL + "/auction", auction, { headers: authHeader() });
    },
    GetUsers: async function (return_count, page_number, page_size) {
        let url = "/admin/users";
        if (return_count) {
            url += "?return_count=true";
        } else {
            url += "?return_count=false";
        }
        if (page_number) {
            url += "&page_number=" + page_number;
        }
        if (page_size) {
            url += "&page_size=" + page_size;
        }
        return await axios.get(BASE_API_URL + url, { headers: authHeader() });
    },
    GetUser: async function (id) {
        return await axios.get(BASE_API_URL + "/admin/users/" + id, { headers: authHeader() });
    },
    // GetUserDocumentLink: function (id, upload_type) {
    //     return BASE_API_URL + "/admin/users/" + id + "/" + upload_type;
    // },
    GetUserDocumentLink: function (upload_type, token) {
        return BASE_API_URL + "/admin/view_document/" + upload_type + "/" + token;
    },
    VerifyUserIdentity: async function (id) {
        return await axios.post(BASE_API_URL + "/auth/verify_user/" + id, {}, { headers: authHeader() });
    },
    DenyUserIdentity: async function (id) {
        return await axios.post(BASE_API_URL + "/auth/deny_user/" + id, {}, { headers: authHeader() });
    },
    GetBids: async function (return_count, page_number, page_size) {
        let url = "/bids";
        if (return_count) {
            url += "?return_count=true";
        } else {
            url += "?return_count=false";
        }
        if (page_number) {
            url += "&page_number=" + page_number;
        }
        if (page_size) {
            url += "&page_size=" + page_size;
        }
        return await axios.get(BASE_API_URL + url, { headers: authHeader() });
    },
    GetMyBids: async function (return_count, page_number, page_size) {
        let url = "/my_bids";
        if (return_count) {
            url += "?return_count=true";
        } else {
            url += "?return_count=false";
        }
        if (page_number) {
            url += "&page_number=" + page_number;
        }
        if (page_size) {
            url += "&page_size=" + page_size;
        }
        return await axios.get(BASE_API_URL + url, { headers: authHeader() });
    },
    PlaceBid: async function (bid) {
        return await axios.put(BASE_API_URL + "/place_bid", bid, { headers: authHeader() });
    },
}

export default DataService;