'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const doRequest = require('request');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    if (request.body.result) {
        processV1Request(request, response);
    } else {
        console.log('Invalid Request');
        return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
    }
});


function processV1Request(prequest, presponse) {
    let action = prequest.body.result.action;
    let parameters = prequest.body.result.parameters;
    let inputContexts = prequest.body.result.contexts;
    const app = new DialogflowApp({request: prequest, response: presponse});

    const actionHandlers = {
        'input.trailer': () => {
            console.log(inputContexts);
            console.log(parameters);
            console.log(inputContexts.length);

            let contextSearchResult = "";
            let id = -1;
            for (var i = 0; i < inputContexts.length; i++) {
                var ctx = inputContexts[i];
                console.log(ctx);
                let name = ctx.name;
                console.log("name:" + name);
                if ("search_result" == name) {
                    console.log(ctx.parameters);
                    let ctxParams = ctx.parameters;
                    console.log(ctxParams.any);
                    contextSearchResult = ctxParams.any;

                }
                if ("search_result_val" == name) {
                    console.log(ctx.parameters);
                    let ctxParams = ctx.parameters;
                    console.log(ctxParams.id);
                    id = ctxParams.id;

                }
            }

            console.log(id);
            let byIdUrl = "https://api.ivi.ru/mobileapi/videoinfo/v5/?id=" + id + "&app_version=10773";
            let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&query="
                + encodeURIComponent(contextSearchResult);
            let u = id === -1 ? reqURL : byIdUrl;
            console.log('url=' + u);
            doRequest(u, (error, response) => {
                if (error) {
                    sendResponse('Что-то не могу ответить...')
                } else {
                    console.log('body 1: ' + JSON.stringify(response.body));
                    console.log('body 2: ' + response.body);
                    let body = JSON.parse(response.body);
                    if (body.result.length === 0) {
                        sendResponse('Что-то ничего не нашлось');
                        return;
                    }
                    let result = body.result[0];
                    let poster = result.poster_originals[0].path;
                    let title = result.title;
                    let id = result.id;
                    let desc = result.duration;
                    let syn = result.synopsis;

                    app.ask(
                        app.buildRichResponse()
                            .addSuggestions(['o_O', 'Продолжи', 'Описание'])
                            .addSuggestionLink('Смотреть трейлер', 'https://www.ivi.ru/watch/' + id + '/trailers#play')
                            .addSimpleResponse({
                                speech: 'а вот и трейлер к ' + title,
                                displayText: 'нашелся трейлер!!'
                            })
                    );
                }
            });
        },
        'input.search': () => {
            console.log(parameters);
            let paramQuery = parameters.any;
            console.log('query=' + paramQuery);
            let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&query="
                + encodeURIComponent(paramQuery);
            console.log('url=' + reqURL);
            doRequest(reqURL, (error, response) => {
                if (error) {
                    sendResponse('Что-то не могу ответить...')
                } else {
                    console.log('body 1: ' + JSON.stringify(response.body));
                    console.log('body 2: ' + response.body);
                    let body = JSON.parse(response.body);
                    if (body.result.length === 0) {
                        sendResponse('Что-то ничего не нашлось');
                        return;
                    }
                    let result = body.result[0];
                    let poster = result.poster_originals[0].path;
                    let title = result.title;
                    let id = result.id;
                    let desc = result.duration;
                    let syn = result.synopsis;

                    app.setContext("search_result_val", 5, {
                        "id": id
                    });
                    app.ask(
                        app.buildRichResponse()
                            .addSuggestionLink('Описание', 'https://www.ivi.ru/watch/' + id + '/description')
                            .addSuggestions(['o_O', 'Продолжи', 'Трейлер', 'Описание'])
                            .addBasicCard(app.buildBasicCard(syn)
                                .setImageDisplay('WHITE')
                                .setSubtitle(desc)
                                .setTitle(title)
                                .addButton('Смотреть', 'https://www.ivi.ru/watch/' + id)
                                .setImage(poster, 'Постер фильма'))
                            .addSimpleResponse({
                                speech: 'Будете смотреть ' + title + '? ' + syn + ' Впрочем, о чем это я? Купите подписку!',
                                displayText: '💁 Купите подписку!'
                            })
                    );
                }
            });
        },
        'input.continuewatch': () => {
            let reqURL = "https://api.ivi.ru/mobileapi/collection/catalog/v5/?id=4655&from=0&to=0";
            doRequest(reqURL, (error, response) => {
                if (error) {
                    sendResponse('Что-то не могу ответить...')
                } else {
                    let body = JSON.parse(response.body);
                    let result = body.result[0];
                    let poster = result.poster_originals[0].path;
                    let title = result.title;
                    let id = result.id;
                    let desc = result.duration;
                    let syn = result.synopsis;

                    app.ask(
                        app.buildRichResponse()
                            .addSuggestionLink('Описание', 'https://www.ivi.ru/watch/' + id + '/description')
                            .addSuggestions(['o_O', 'Продолжи', 'Трейлер', 'Описание'])
                            .addBasicCard(app.buildBasicCard(syn)
                                .setImageDisplay('WHITE')
                                .setSubtitle(desc)
                                .setTitle(title)
                                .addButton('Смотреть', 'https://www.ivi.ru/watch/' + id)
                                .setImage(poster, 'Постер фильма'))
                            .addSimpleResponse({
                                speech: 'Будете смотреть ' + title + '? ' + syn + ' Впрочем, о чем это я? Купите подписку!',
                                displayText: '💁 Купите подписку!'
                            })
                    );
                }
            });
        },

        'default': () => {
            sendResponse('>---o_O----< ' + action + " ?");
        }
    };

    console.log('action=' + action);

    if (!actionHandlers[action]) {
        action = 'default';
    }

    actionHandlers[action]();

    function sendResponse(responseToUser) {
        let responseJson = {};
        responseJson.speech = responseToUser;
        responseJson.displayText = responseToUser;

        presponse.json(responseJson); // Send response to Dialogflow
    }
}

