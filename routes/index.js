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


function isUndefined(originalRequest) {

    if (typeof(originalRequest) == 'undefined')
        return true;

    if (originalRequest === undefined)
        return true;

    if (originalRequest == 'undefined')
        return true;

    return !originalRequest;
}

function validStr(queryname) {
    if (isUndefined(queryname)) return false;

    return queryname && queryname.length > 0;
}

function processV1Request(prequest, presponse) {
    console.log("in vi request");
    let action = prequest.body.result.action;
    console.log("got action: " + JSON.stringify(action));
    let parameters = prequest.body.result.parameters;

    let rawQuery = isUndefined(prequest.body.originalRequest) ? "" :
        isUndefined(prequest.body.originalRequest.data.inputs) ? "" :
            prequest.body.originalRequest.data.inputs.length <= 0 ? "" : prequest.body.originalRequest.data.inputs[0].rawInputs[0].query;

    console.log("got params: " + JSON.stringify(parameters));
    let inputContexts = prequest.body.result.contexts;
    console.log("got context: " + JSON.stringify(inputContexts));
    const app = new DialogflowApp({request: prequest, response: presponse});

    const actionHandlers = {
        'input.similar_no_context': () => {
            similarIntent(inputContexts, parameters, app);
        },

        'input.similar': () => {
            similarIntent(inputContexts, parameters, app);
        },

        'input.trailer_no_context': () => {
            trailerIntent(inputContexts, parameters, app);
        },

        'input.trailer': () => {
            trailerIntent(inputContexts, parameters, app);
        },

        'input.description': () => {
            descriptionIntent(inputContexts, parameters, app);
        },

        'input.description_no_context': () => {
            descriptionIntent(inputContexts, parameters, app);
        },

        'input.search': () => {
            searchIntent(app, parameters);
        },

        'input.unknown': () => {
            searchSelectIntent(inputContexts, app, parameters, rawQuery);
        },

        'input.search_select': () => {
            searchSelectIntent(inputContexts, app, parameters, rawQuery);
        },

        'input.welcome': () => {
            welcomeIntent(app);
        },

        'default': () => {
            sendResponse('>---o_O----< ' + action + " ?");
            welcomeIntent(app);
        }
    };

    console.log('action=' + action);

    if (!actionHandlers[action]) {
        action = 'default';
    }

    actionHandlers[action]();
    console.log("after action handler");

    function sendResponse(responseToUser) {
        let responseJson = {};
        responseJson.speech = responseToUser;
        responseJson.displayText = responseToUser;

        presponse.json(responseJson); // Send response to Dialogflow
    }

    function searchIntent(app, parameters) {
        console.log("in search intent");
        console.log(parameters);
        var paramQuery = parameters.any;
        console.log('query=' + paramQuery);
        console.log('isUndefined=' + isUndefined(paramQuery));
        if (isUndefined(paramQuery)) {
            paramQuery = rawQuery;
            console.log("raw: " + rawQuery);
        }
        if (validStr(parameters.queryname)) {
            paramQuery = parameters.queryname;
        }
        let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=4&app_version=870&query="
            + encodeURIComponent(paramQuery);
        console.log('url=' + reqURL);


        doRequest(reqURL, (error, response) => {
            if (error) {
                sendResponse('Что-то не могу ответить...');
            } else {
                console.log('body 1: ' + JSON.stringify(response.body));
                console.log('body 2: ' + response.body);
                let body = JSON.parse(response.body);
                if (isUndefined(body.result)) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                if (body.result.length === 0) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                let result = body.result;

                app.setContext("search_result_count", 5, {
                    "count": result.length
                });
                const carousel = app.buildCarousel();
                var i;
                for (i = 0; i < result.length; i++) {
                    let item = body.result[i];
                    let poster = item.poster_originals.length > 0 ? item.poster_originals[0].path : "";
                    carousel.addItems(app.buildOptionItem("SELECTION_KEY_ONE" + item.id,
                        ['synonym of KEY_ONE 1' + item.id, 'synonym of KEY_ONE 2' + item.id])
                        .setTitle(item.title.toString())
                        .setDescription(item.description.toString())
                        .setImage(poster, 'image'));

                    if (i === 0) {
                        app.setContext("search_result_val", 5, {
                            "id": item.id
                        });
                        app.setContext("search_result", 5, {
                            "any": item.title
                        });
                        app.setContext("search_result_kind", 5, {
                            "kind": item.kind
                        });
                    }
                    app.setContext("search_result_val" + i, 5, {
                        "id": item.id
                    });
                    app.setContext("search_result_kind" + i, 5, {
                        "kind": item.kind
                    });
                    app.setContext("search_result" + i, 5, {
                        "any": item.title
                    });
                }

                app.askWithCarousel('Вот что нашлось:',
                    carousel
                )
                ;
            }
        });
    }

    function descriptionIntent(inputContexts, parameters, app) {
        console.log("in desc intent");
        console.log(inputContexts);
        console.log(parameters);
        console.log(inputContexts.length);

        let contextSearchResult = "";
        let id = -1;
        let kind = 1;
        for (var i = 0; i < inputContexts.length; i++) {
            var ctx = inputContexts[i];
            let name = ctx.name;
            if ("search_result" == name) {
                let ctxParams = ctx.parameters;
                contextSearchResult = ctxParams.any;

            }
            if ("search_result_val" == name) {
                let ctxParams = ctx.parameters;
                id = ctxParams.id;

            }
            if ("search_result_kind" == name) {
                let ctxParams = ctx.parameters;
                kind = ctxParams.kind;

            }
        }
        if (id == -1 && contextSearchResult == "") {
            contextSearchResult = parameters.queryname;
        }
        if (validStr(parameters.queryname)) {
            contextSearchResult = parameters.queryname;
            id = -1;
        }
        console.log(id);
        let byIdUrl = "https://api.ivi.ru/mobileapi/" + (kind == 1 ? "videoinfo" : "compilationinfo") + "/v5/?id=" + id + "&app_version=10773";
        let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&query="
            + encodeURIComponent(contextSearchResult);
        let u = id === -1 ? reqURL : byIdUrl;
        console.log('url=' + u);
        let isById = id !== -1;
        doRequest(u, (error, response) => {
            if (error) {
                sendResponse('Что-то не могу ответить...')
            } else {
                console.log('body 1: ' + JSON.stringify(response.body));
                console.log('body 2: ' + response.body);
                let body = JSON.parse(response.body);
                if (isUndefined(body.result)) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                if (body.result.length === 0) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                let result = isById ? body.result : body.result[0];
                let poster = result.poster_originals.length > 0 ? result.poster_originals[0].path : "";
                let title = result.title;
                let id = result.id;
                let desc = result.duration;
                let syn = result.synopsis;
                app.setContext("search_result_val", 5, {
                    "id": id
                });
                app.setContext("search_result", 5, {
                    "any": title
                });
                app.setContext("search_result_kind", 5, {
                    "kind": result.kind
                });

                app.ask(
                    app.buildRichResponse()
                        .addBasicCard(app.buildBasicCard(syn)
                            .setImageDisplay('WHITE')
                            .setSubtitle(desc)
                            .setTitle(title)
                            .addButton('Смотреть', 'https://www.ivi.ru/watch/' + id)
                            .setImage(poster, 'Постер фильма'))
                        .addSuggestions(['Похожие', 'Трейлер'])
                        .addSuggestionLink('Описание', 'https://www.ivi.ru/watch/' + id + '/description')
                        .addSimpleResponse({
                            speech: 'а вот и описание к ' + title + ": ",
                            displayText: 'Есть описание!'
                        })
                );
            }
        });
    }

    function trailerIntent(inputContexts, parameters, app) {
        console.log("in trailer intent");
        console.log(inputContexts);
        console.log(parameters);
        console.log(inputContexts.length);

        let contextSearchResult = "";
        let id = -1;
        let kind = 1;
        for (var i = 0; i < inputContexts.length; i++) {
            var ctx = inputContexts[i];
            let name = ctx.name;
            if ("search_result" == name) {
                let ctxParams = ctx.parameters;
                contextSearchResult = ctxParams.any;

            }
            if ("search_result_val" == name) {
                let ctxParams = ctx.parameters;
                id = ctxParams.id;

            }
            if ("search_result_kind" == name) {
                let ctxParams = ctx.parameters;
                kind = ctxParams.kind;

            }
        }

        console.log(id);
        if (id == -1 && contextSearchResult == "") {
            contextSearchResult = parameters.queryname;
        }
        if (validStr(parameters.queryname)) {
            contextSearchResult = parameters.queryname;
            id = -1;
        }
        let byIdUrl = "https://api.ivi.ru/mobileapi/" + (kind == 1 ? "videoinfo" : "compilationinfo") + "/v5/?id=" + id + "&app_version=10773";
        let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&query="
            + encodeURIComponent(contextSearchResult);
        let u = id === -1 ? reqURL : byIdUrl;
        console.log('url=' + u);
        let isById = id !== -1;
        doRequest(u, (error, response) => {
            if (error) {
                sendResponse('Что-то не могу ответить...')
            } else {
                console.log('body 1: ' + JSON.stringify(response.body));
                console.log('body 2: ' + response.body);
                let body = JSON.parse(response.body);
                if (isUndefined(body.result)) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                if (body.result.length === 0) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                let result = isById ? body.result : body.result[0];
                var poster = result.poster_originals[0].path;
                if ("additional_data" in result) {
                    if (result.additional_data.length > 0) {
                        poster = result.additional_data[0].preview;
                    }
                }
                let title = result.title;
                let id = result.id;
                app.setContext("search_result_val", 5, {
                    "id": id
                });
                app.setContext("search_result", 5, {
                    "any": title
                });
                app.setContext("search_result_kind", 5, {
                    "kind": result.kind
                });

                app.ask(
                    app.buildRichResponse()
                        .addBasicCard(app.buildBasicCard("")
                            .setImageDisplay('WHITE')
                            .setTitle(title)
                            .setImage(poster, 'Кадр из трейлера'))
                        .addSuggestions(['Похожие', 'Описание'])
                        .addSuggestionLink('Смотреть трейлер', 'https://www.ivi.ru/watch/' + id + '/trailers#play')
                        .addSimpleResponse({
                            speech: 'а вот и трейлер к ' + title,
                            displayText: 'нашелся трейлер!!'
                        })
                );
            }
        });
    }

    function welcomeIntent(app) {
        console.log("in continue intent");
        let reqURL = "https://api.ivi.ru/mobileapi/collection/catalog/v5/?id=4655&from=0&to=0";
        doRequest(reqURL, (error, response) => {
            if (error) {
                app.ask(
                    app.buildRichResponse()
                        .addSuggestions(['Найти ', 'Трейлер ', 'Описание '])
                        .addSuggestionLink('ivi.ru', 'https://www.ivi.ru/')
                        .addSimpleResponse({
                            speech: 'Привет!',
                            displayText: 'Привет! 💁 Чего желаете?'
                        })
                );
            } else {
                let body = JSON.parse(response.body);
                let result = body.result[0];
                let title = result.title;
                app.ask(
                    app.buildRichResponse()
                        .addSuggestions(['Найти ' + title, 'Трейлер к ' + title, 'Описание ' + title, 'Похожее на ' + title])
                        .addSuggestionLink('ivi.ru', 'https://www.ivi.ru/')
                        .addSimpleResponse({
                            speech: 'Привет!',
                            displayText: 'Привет! 💁 Чего желаете?'
                        })
                );
            }
        });
    }

    function similarIntent(inputContexts, parameters, app) {
        console.log("in similar intent");
        console.log(inputContexts);
        console.log(parameters);
        console.log(inputContexts.length);

        let contextSearchResult = "";
        let id = -1;
        let kind = 1;
        for (var i = 0; i < inputContexts.length; i++) {
            var ctx = inputContexts[i];
            let name = ctx.name;
            if ("search_result" == name) {
                let ctxParams = ctx.parameters;
                contextSearchResult = ctxParams.any;

            }
            if ("search_result_val" == name) {
                let ctxParams = ctx.parameters;
                id = ctxParams.id;

            }
            if ("search_result_kind" == name) {
                let ctxParams = ctx.parameters;
                kind = ctxParams.kind;

            }
        }

        console.log(id);
        if (id == -1 && contextSearchResult == "") {
            contextSearchResult = parameters.queryname;
        }
        if (validStr(parameters.queryname)) {
            contextSearchResult = parameters.queryname;
            id = -1;
        }
        let byIdUrl = "https://api.ivi.ru/mobileapi/" + (kind == 1 ? "videoinfo" : "compilationinfo") + "/v5/?id=" + id + "&fields=id,title&app_version=10773";
        let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&fields=id,title&query="
            + encodeURIComponent(contextSearchResult);
        let u = id === -1 ? reqURL : byIdUrl;
        console.log('url=' + u);
        let isById = id !== -1;
        doRequest(u, (error, response) => {
            if (error) {
                sendResponse('Что-то не могу ответить...')
            } else {
                console.log('resolved body 1: ' + JSON.stringify(response.body));
                console.log('resolved body 2: ' + response.body);
                let body = JSON.parse(response.body);
                if (isUndefined(body.result)) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                if (body.result.length === 0) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                let result = isById ? body.result : body.result[0];
                let resolvedId = result.id;
                let resolvedTitle = result.title;

                let recommendationsUrl = "https://api.ivi.ru/mobileapi/hydra/get/recommendation/v5/?scenario_id=ITEM_PAGE&top=5&id="
                    + resolvedId + "&app_version=10773" + (kind == 1 ? "" : "&kind=2");

                console.log(recommendationsUrl);

                doRequest(recommendationsUrl, (error, response) => {
                    if (error) {
                        sendResponse('Что-то не могу припомнить ни одного похожего на ' + resolvedTitle + " фильма")
                    } else {


                        console.log('recommends body 1: ' + JSON.stringify(response.body));
                        console.log('recommends body 2: ' + response.body);
                        let body = JSON.parse(response.body);
                        if (isUndefined(body.result)) {
                            sendResponse('Что-то ничего не нашлось');
                            return;
                        }
                        if (body.result.length === 0) {
                            sendResponse('Что-то не нашлось нашлось у нас похожих на ' + resolvedTitle);
                            return;
                        }
                        let result = body.result;

                        app.setContext("search_result_count", 5, {
                            "count": result.length
                        });
                        const carousel = app.buildCarousel();
                        var i;
                        for (i = 0; i < result.length; i++) {
                            let item = body.result[i];
                            let poster = item.poster_originals.length > 0 ? item.poster_originals[0].path : "";
                            carousel.addItems(app.buildOptionItem("SELECTION_KEY_ONE" + item.id,
                                ['synonym of KEY_ONE 1' + item.id, 'synonym of KEY_ONE 2' + item.id])
                                .setTitle(item.title.toString())
                                .setDescription(item.description.toString())
                                .setImage(poster, 'image')
                            );

                            if (i === 0) {
                                app.setContext("search_result_val", 5, {
                                    "id": item.id
                                });
                                app.setContext("search_result_kind", 5, {
                                    "kind": item.kind
                                });
                                app.setContext("search_result", 5, {
                                    "any": item.title
                                });
                            }
                            app.setContext("search_result_val" + i, 5, {
                                "id": item.id
                            });
                            app.setContext("search_result_kind" + i, 5, {
                                "kind": item.kind
                            });
                            app.setContext("search_result" + i, 5, {
                                "any": item.title
                            });
                        }

                        app.askWithCarousel('Вот фильмы похожие на ' + resolvedTitle,
                            carousel
                        )
                        ;
                    }
                });
            }
        });
    }

    function searchSelectIntent(inputContexts, app, parameters, rawQuery) {
        console.log("in search select intent");
        console.log(inputContexts);
        console.log(parameters);
        console.log(inputContexts.length);

        let count = 0;
        for (var i = 0; i < inputContexts.length; i++) {
            var ctx = inputContexts[i];
            let name = ctx.name;
            if ("search_result_count" == name) {
                let ctxParams = ctx.parameters;
                count = ctxParams.count;
            }
        }
        if (count <= 0) {
            searchIntent(app, parameters);
            return;
        }
        let ids = [];
        let kinds = [];
        let titles = [];
        for (var j = 0; j < count; j++) {
            let idName = "search_result_val" + j;
            let kindName = "search_result_kind" + j;
            let titleName = "search_result" + j;
            for (var i = 0; i < inputContexts.length; i++) {
                var ctx = inputContexts[i];
                let name = ctx.name;
                if (idName == name) {
                    let ctxParams = ctx.parameters;
                    ids.push(ctxParams.id);
                }
                if (kindName == name) {
                    let ctxParams = ctx.parameters;
                    kinds.push(ctxParams.kind);
                }
                if (titleName == name) {
                    let ctxParams = ctx.parameters;
                    titles.push(ctxParams.any);
                }
            }
        }
        console.log("ids=" + ids.toString());
        console.log("kinds=" + kinds.toString());
        console.log("titles=" + titles.toString());

        if (ids.length == 0 || kinds.length == 0 || titles.length == 0) {

            searchIntent(app, parameters);
            return;
        }
        console.log("raw input=:" + rawQuery);
        let text = rawQuery;
        let selected = -1;
        for (var j = 0; j < count; j++) {
            if (text.toUpperCase() == titles[j].toUpperCase()) {
                selected = j;
                break;
            }
        }
        if (selected == -1) {

            searchIntent(app, parameters);
            return;
        }

        let id = ids[selected];
        let kind = kinds[selected];
        let title = titles[selected];

        console.log("selected: " + title);
        let byIdUrl = "https://api.ivi.ru/mobileapi/" + (kind == 1 ? "videoinfo" : "compilationinfo") + "/v5/?id=" + id + "&app_version=10773";
        let reqURL = "https://api.ivi.ru/mobileapi/search/v5/?from=0&to=0&app_version=870&query="
            + encodeURIComponent(title);
        let u = id === -1 ? reqURL : byIdUrl;
        console.log('url=' + u);
        let isById = id !== -1;
        doRequest(u, (error, response) => {
            if (error) {
                sendResponse('Что-то не могу ответить...')
            } else {
                console.log('body 1: ' + JSON.stringify(response.body));
                console.log('body 2: ' + response.body);
                let body = JSON.parse(response.body);
                if (isUndefined(body.result)) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                if (body.result.length === 0) {
                    sendResponse('Что-то ничего не нашлось');
                    return;
                }
                let result = isById ? body.result : body.result[0];
                let poster = result.poster_originals.length > 0 ? result.poster_originals[0].path : "";
                let title = result.title;
                let id = result.id;
                let desc = result.duration;
                let syn = result.synopsis;
                app.setContext("search_result_val", 5, {
                    "id": id
                });
                app.setContext("search_result", 5, {
                    "any": title
                });
                app.setContext("search_result_kind", 5, {
                    "kind": result.kind
                });

                app.ask(
                    app.buildRichResponse()
                        .addBasicCard(app.buildBasicCard(syn)
                            .setImageDisplay('WHITE')
                            .setSubtitle(desc)
                            .setTitle(title)
                            .addButton('Смотреть', 'https://www.ivi.ru/watch/' + id)
                            .setImage(poster, 'Постер фильма'))
                        .addSuggestions(['Похожие', 'Трейлер'])
                        .addSuggestionLink('Описание', 'https://www.ivi.ru/watch/' + id + '/description')
                        .addSimpleResponse({
                            speech: 'а вот и описание к ' + title + ": ",
                            displayText: 'Вот, что-то нашлось:'
                        })
                );
            }
        });
    }
}

