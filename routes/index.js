'use strict';

//https://api.ivi.ru/mobileapi/categories/v5/?app_version=10942&fields=genres.title-id-category_id
let genresJson = JSON.parse("{\"result\": [{\"genres\": [{\"category_id\": 14, \"id\": 161, \"title\": \"Артхаус\"}, {\"category_id\": 14, \"id\": 94, \"title\": \"Боевики\"}, {\"category_id\": 14, \"id\": 103, \"title\": \"Военные\"}, {\"category_id\": 14, \"id\": 97, \"title\": \"Детективы\"}, {\"category_id\": 14, \"id\": 198, \"title\": \"Для всей семьи\"}, {\"category_id\": 14, \"id\": 160, \"title\": \"Для детей\"}, {\"category_id\": 14, \"id\": 109, \"title\": \"Документальные\"}, {\"category_id\": 14, \"id\": 105, \"title\": \"Драмы\"}, {\"category_id\": 14, \"id\": 192, \"title\": \"Исторические\"}, {\"category_id\": 14, \"id\": 95, \"title\": \"Комедии\"}, {\"category_id\": 14, \"id\": 107, \"title\": \"Мелодрамы\"}, {\"category_id\": 14, \"id\": 101, \"title\": \"Приключения\"}, {\"category_id\": 14, \"id\": 168, \"title\": \"Советское кино\"}, {\"category_id\": 14, \"id\": 127, \"title\": \"Триллеры\"}, {\"category_id\": 14, \"id\": 99, \"title\": \"Ужасы\"}, {\"category_id\": 14, \"id\": 166, \"title\": \"Фантастика\"}, {\"category_id\": 14, \"id\": 204, \"title\": \"Фэнтези\"}, {\"category_id\": 14, \"id\": 211, \"title\": \"Зарубежные\"}, {\"category_id\": 14, \"id\": 169, \"title\": \"Эротика\"}, {\"category_id\": 14, \"id\": 205, \"title\": \"Русские\"}, {\"category_id\": 14, \"id\": 201, \"title\": \"Мистические\"}, {\"category_id\": 14, \"id\": 228, \"title\": \"Спорт\"}, {\"category_id\": 14, \"id\": 225, \"title\": \"Вестерн\"}, {\"category_id\": 14, \"id\": 226, \"title\": \"Биография\"}, {\"category_id\": 14, \"id\": 189, \"title\": \"Музыкальные\"}, {\"category_id\": 14, \"id\": 218, \"title\": \"Криминал\"}, {\"category_id\": 14, \"id\": 203, \"title\": \"Экранизации\"}, {\"category_id\": 14, \"id\": 229, \"title\": \"Фильм-нуар\"}, {\"category_id\": 14, \"id\": 227, \"title\": \"Мюзикл\"}, {\"category_id\": 14, \"id\": 164, \"title\": \"Интервью\"}, {\"category_id\": 14, \"id\": 163, \"title\": \"Мировая классика\"}, {\"category_id\": 14, \"id\": 191, \"title\": \"Немое кино\"}, {\"category_id\": 14, \"id\": 167, \"title\": \"Короткометражки\"}, {\"category_id\": 14, \"id\": 187, \"title\": \"Фильмы-спектакли\"}]}, {\"genres\": [{\"category_id\": 15, \"id\": 93, \"title\": \"Боевики\"}, {\"category_id\": 15, \"id\": 102, \"title\": \"Военные\"}, {\"category_id\": 15, \"id\": 96, \"title\": \"Детективы\"}, {\"category_id\": 15, \"id\": 188, \"title\": \"Драмы\"}, {\"category_id\": 15, \"id\": 193, \"title\": \"Исторические\"}, {\"category_id\": 15, \"id\": 110, \"title\": \"Комедийные\"}, {\"category_id\": 15, \"id\": 217, \"title\": \"Криминал\"}, {\"category_id\": 15, \"id\": 196, \"title\": \"Мелодрамы\"}, {\"category_id\": 15, \"id\": 100, \"title\": \"Приключения\"}, {\"category_id\": 15, \"id\": 106, \"title\": \"Романтические\"}, {\"category_id\": 15, \"id\": 262, \"title\": \"Телешоу\"}, {\"category_id\": 15, \"id\": 128, \"title\": \"Триллеры\"}, {\"category_id\": 15, \"id\": 190, \"title\": \"Фантастические\"}, {\"category_id\": 15, \"id\": 230, \"title\": \"Биография\"}, {\"category_id\": 15, \"id\": 236, \"title\": \"Фэнтези\"}, {\"category_id\": 15, \"id\": 213, \"title\": \"Русские\"}, {\"category_id\": 15, \"id\": 212, \"title\": \"Зарубежные\"}, {\"category_id\": 15, \"id\": 195, \"title\": \"Мистические\"}, {\"category_id\": 15, \"id\": 108, \"title\": \"Документальные\"}, {\"category_id\": 15, \"id\": 199, \"title\": \"Для всей семьи\"}, {\"category_id\": 15, \"id\": 235, \"title\": \"Ужасы\"}, {\"category_id\": 15, \"id\": 234, \"title\": \"Спорт\"}, {\"category_id\": 15, \"id\": 233, \"title\": \"Мюзикл\"}, {\"category_id\": 15, \"id\": 232, \"title\": \"Музыка\"}, {\"category_id\": 15, \"id\": 220, \"title\": \"Для детей\"}]}, {\"genres\": [{\"category_id\": 17, \"id\": 125, \"title\": \"Аниме\"}, {\"category_id\": 17, \"id\": 124, \"title\": \"Для взрослых\"}, {\"category_id\": 17, \"id\": 123, \"title\": \"Для детей\"}, {\"category_id\": 17, \"id\": 214, \"title\": \"Зарубежные\"}, {\"category_id\": 17, \"id\": 170, \"title\": \"Полнометражные\"}, {\"category_id\": 17, \"id\": 255, \"title\": \"Приключения\"}, {\"category_id\": 17, \"id\": 210, \"title\": \"Развивающие\"}, {\"category_id\": 17, \"id\": 171, \"title\": \"Сериалы\"}, {\"category_id\": 17, \"id\": 172, \"title\": \"Советские\"}, {\"category_id\": 17, \"id\": 260, \"title\": \"Фэнтези\"}, {\"category_id\": 17, \"id\": 215, \"title\": \"Русские\"}, {\"category_id\": 17, \"id\": 259, \"title\": \"Фантастика\"}, {\"category_id\": 17, \"id\": 258, \"title\": \"Ужасы\"}, {\"category_id\": 17, \"id\": 257, \"title\": \"Триллер\"}, {\"category_id\": 17, \"id\": 256, \"title\": \"Спорт\"}, {\"category_id\": 17, \"id\": 254, \"title\": \"Мюзикл\"}, {\"category_id\": 17, \"id\": 253, \"title\": \"Мелодрама\"}, {\"category_id\": 17, \"id\": 252, \"title\": \"Криминал\"}, {\"category_id\": 17, \"id\": 251, \"title\": \"Комедия\"}, {\"category_id\": 17, \"id\": 250, \"title\": \"История\"}, {\"category_id\": 17, \"id\": 249, \"title\": \"Драма\"}, {\"category_id\": 17, \"id\": 247, \"title\": \"Детектив\"}, {\"category_id\": 17, \"id\": 246, \"title\": \"Военный\"}, {\"category_id\": 17, \"id\": 245, \"title\": \"Вестерн\"}, {\"category_id\": 17, \"id\": 244, \"title\": \"Боевик\"}, {\"category_id\": 17, \"id\": 243, \"title\": \"Биография\"}, {\"category_id\": 17, \"id\": 219, \"title\": \"Для всей семьи\"}]}, {\"genres\": [{\"category_id\": 16, \"id\": 119, \"title\": \"Познавательные\"}, {\"category_id\": 16, \"id\": 238, \"title\": \"Видеоигры\"}, {\"category_id\": 16, \"id\": 216, \"title\": \"Развлекательные\"}, {\"category_id\": 16, \"id\": 111, \"title\": \"Юмористические\"}, {\"category_id\": 16, \"id\": 174, \"title\": \"Увлечения\"}, {\"category_id\": 16, \"id\": 173, \"title\": \"Живая природа\"}, {\"category_id\": 16, \"id\": 130, \"title\": \"Кулинария\"}, {\"category_id\": 16, \"id\": 126, \"title\": \"Воспитание детей\"}, {\"category_id\": 16, \"id\": 242, \"title\": \"Ток-шоу\"}, {\"category_id\": 16, \"id\": 241, \"title\": \"Реальное ТВ\"}, {\"category_id\": 16, \"id\": 122, \"title\": \"Спорт\"}, {\"category_id\": 16, \"id\": 118, \"title\": \"Охота и рыбалка\"}, {\"category_id\": 16, \"id\": 117, \"title\": \"Вокруг света\"}, {\"category_id\": 16, \"id\": 116, \"title\": \"Дом и сад\"}, {\"category_id\": 16, \"id\": 239, \"title\": \"Музыка\"}, {\"category_id\": 16, \"id\": 114, \"title\": \"Психология и гороскопы\"}, {\"category_id\": 16, \"id\": 112, \"title\": \"О знаменитостях\"}, {\"category_id\": 16, \"id\": 237, \"title\": \"Биография\"}, {\"category_id\": 16, \"id\": 197, \"title\": \"Мистические\"}, {\"category_id\": 16, \"id\": 223, \"title\": \"Русские\"}, {\"category_id\": 16, \"id\": 224, \"title\": \"Зарубежные\"}, {\"category_id\": 16, \"id\": 222, \"title\": \"Документальные\"}, {\"category_id\": 16, \"id\": 221, \"title\": \"Для детей\"}, {\"category_id\": 16, \"id\": 200, \"title\": \"Для всей семьи\"}]}, {\"genres\": [{\"category_id\": 20, \"id\": 194, \"title\": \"Хочу всё знать\"}, {\"category_id\": 20, \"id\": 186, \"title\": \"Про животных\"}, {\"category_id\": 20, \"id\": 184, \"title\": \"Аниме\"}, {\"category_id\": 20, \"id\": 183, \"title\": \"Детские песни\"}, {\"category_id\": 20, \"id\": 182, \"title\": \"Фильмы\"}, {\"category_id\": 20, \"id\": 181, \"title\": \"Западные мультфильмы\"}, {\"category_id\": 20, \"id\": 180, \"title\": \"Сказки\"}, {\"category_id\": 20, \"id\": 179, \"title\": \"Русские мультфильмы\"}]}, {\"genres\": [{\"category_id\": 18, \"id\": 202, \"title\": \"Никакой\"}]}]}");

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

        'input.new': () => {
            newsIntent(app);
        },

        'input.movies': () => {
            moviesIntent(app);
        },

        'input.kids': () => {
            kidsIntent(app);
        },

        'input.serials': () => {
            serialsIntent(app);
        },

        'input.genres': () => {
            genresIntent(app);
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
                    let desk = item.synopsis.toString() == "" ? item.description.toString() : item.synopsis.toString();
                    carousel.addItems(app.buildOptionItem("SELECTION_KEY_ONE" + item.id,
                        ['synonym of KEY_ONE 1' + item.id, 'synonym of KEY_ONE 2' + item.id])
                        .setTitle(item.title.toString())
                        .setDescription(desk)
                        .setImage(poster, 'Постер фильма'));

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
                let result = isById ? body.result : body.result[0];
                let poster = result.poster_originals.length > 0 ? result.poster_originals[0].path : "";
                let title = result.title;
                let id = result.id;
                let desc = descStr(result);
                let syn = result.synopsis.toString() == "" ? result.description.toString() : result.synopsis.toString();
                app.setContext("search_result_val", 5, {
                    "id": id
                });
                app.setContext("search_result", 5, {
                    "any": title
                });
                app.setContext("search_result_kind", 5, {
                    "kind": result.kind
                });
                showBasicWatchCard(app, syn, desc, title, id, id, poster, false);
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
                            .setImageDisplay('DEFAULT')
                            .setTitle(title)
                            .setImage(poster, 'Кадр из трейлера'))
                        .addSuggestions(['Показать похожее', 'Описание'])
                        .addSuggestionLink('трейлер', 'https://www.ivi.ru/watch/' + id + '/trailers#play')
                        .addSimpleResponse({
                            speech: 'Трейлер к ' + title,
                            displayText: 'Трейлер к ' + title
                        })
                );
            }
        });
    }

    function welcomeIntent(app) {
        console.log("in continue intent");
        app.ask(
            app.buildRichResponse()
                .addSimpleResponse({
                    speech: 'Привет! Не можешь выбрать, что посмотреть? Я подскажу.',
                    displayText: 'Привет! Не можешь выбрать, что посмотреть? Я подскажу.'
                })
                .addSuggestions(['Новинки', 'Фильмы', 'Сериалы', 'Для детей'])
                .addSuggestionLink('ivi.ru', 'https://www.ivi.ru/')
        );
    }

    function newsIntent(app) {
        console.log("in news intent");
        let catalogId = "1982";
        let inputPrompt = 'Вот популярные новинки';
        carouselCatalog(catalogId, app, inputPrompt, true);
    }

    function moviesIntent(app) {
        console.log("in movies intent");
        let catalogId = "14";
        let inputPrompt = 'Вот популярные фильмы';
        carouselCatalog(catalogId, app, inputPrompt, false);
    }

    function serialsIntent(app) {
        console.log("in movies intent");
        let catalogId = "15";
        let inputPrompt = 'Вот популярные сериалы';
        carouselCatalog(catalogId, app, inputPrompt, false);
    }

    function kidsIntent(app) {
        console.log("in kids intent");
        let catalogId = "17";
        let inputPrompt = 'Вот популярные мульфильмы';
        carouselCatalog(catalogId, app, inputPrompt, false);
    }

    function genresIntent(app) {
        console.log("in genres intent");
        console.log("of params: " + JSON.stringify(parameters));
        let genre = parameters.genres;
        if (!genre) {
            searchIntent(app, parameters);
        } else {

            let inputPrompt = 'Вот популярные фильмы жанра ' + genre;
            let genreId = getGenreIdByTitle(genre);
            let url = "https://api.ivi.ru/mobileapi/catalogue/v5/?from=0&to=19&sort=pop&app_version=10942&genre=" + genreId;
            console.log("url=: " + url);
            if (genreId > 0) {
                carouselByRequest(url, app, inputPrompt);
            } else {
                newsIntent(app);
            }
        }
    }

    function carouselByRequest(reqURL, app, inputPrompt) {
        doRequest(reqURL, (error, response) => {
            if (error) {
                app.ask(
                    app.buildRichResponse()
                        .addSuggestions(['Найти', 'Трейлер ', 'Описание'])
                        .addSuggestionLink('ivi.ru', 'https://www.ivi.ru/')
                        .addSimpleResponse({
                            speech: 'Привет!',
                            displayText: 'Привет! 💁 Чего желаете?'
                        })
                );
            } else {
                console.log('resolved body 1: ' + JSON.stringify(response.body));
                console.log('resolved body 2: ' + response.body);
                let body = JSON.parse(response.body);
                let result = body.result;

                app.setContext("search_result_count", 5, {
                    "count": result.length
                });
                const carousel = app.buildCarousel();
                var i;
                for (i = 0; i < result.length; i++) {
                    let item = body.result[i];
                    let poster = item.poster_originals.length > 0 ? item.poster_originals[0].path : "";
                    let syn = item.synopsis.toString() == "" ? item.description.toString() : item.synopsis.toString();
                    carousel.addItems(app.buildOptionItem("SELECTION_KEY_ONE" + item.id,
                        ['synonym of KEY_ONE 1' + item.id, 'synonym of KEY_ONE 2' + item.id])
                        .setTitle(item.title.toString())
                        .setDescription(syn)
                        .setImage(poster, 'Постер фильма')
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

                app.askWithCarousel(inputPrompt, carousel);
            }
        });
    }

    function carouselCatalog(id, app, inputPrompt, byId) {
        let reqURL = byId ? "https://api.ivi.ru/mobileapi/collection/catalog/v5/?app_version=10942&id=" + id :
            "https://api.ivi.ru/mobileapi/catalogue/v5/?from=0&to=19&sort=pop&app_version=10942&category=" + id
        ;
        carouselByRequest(reqURL, app, inputPrompt);
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
                sendResponse('Что-то не могу ответить...');
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
                            let syn = item.synopsis.toString() == "" ? item.description.toString() : item.synopsis.toString();
                            carousel.addItems(app.buildOptionItem("SELECTION_KEY_ONE" + item.id,
                                ['synonym of KEY_ONE 1' + item.id, 'synonym of KEY_ONE 2' + item.id])
                                .setTitle(item.title.toString())
                                .setDescription(syn)
                                .setImage(poster, 'Постер фильма')
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

                        app.askWithCarousel('Вот фильмы похожие на ' + resolvedTitle, carousel);
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
                let result = isById ? body.result : body.result[0];
                let poster = result.poster_originals.length > 0 ? result.poster_originals[0].path : "";
                let title = result.title;
                let id = result.id;
                let desc = descStr(result);
                let syn = result.synopsis.toString() == "" ? result.description.toString() : result.synopsis.toString();
                console.log(" syn = " + syn);
                app.setContext("search_result_val", 5, {
                    "id": id
                });
                app.setContext("search_result", 5, {
                    "any": title
                });
                app.setContext("search_result_kind", 5, {
                    "kind": result.kind
                });

                if (kind == 1) {
                    showBasicWatchCard(app, syn, desc, title, id, id, poster, false);
                } else {
                    console.log("selected: compilation view " + title);
                    let reqURL = "https://api.ivi.ru/mobileapi/videofromcompilation/v5/?id=" + id + "&from=0&to=1&fields=id&app_version=870";
                    console.log('url=' + reqURL);
                    doRequest(reqURL, (error, response) => {
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
                            let result = body.result[0];
                            let item_id = result.id;
                            showBasicWatchCard(app, syn, desc, title, item_id, id, poster, true);
                        }
                    });
                }
            }
        });
    }

    function showBasicWatchCard(app, syn, desc, title, id, description_id, poster, isCompilation) {
        if (isCompilation) {
            app.ask(
                getBasicWatchCardRichResponse(app, syn, desc, title, id, poster)
            );
        } else {
            app.ask(
                getBasicWatchCardRichResponse(app, syn, desc, title, id, poster)
                    .addSuggestionLink('трейлер', 'https://www.ivi.ru/watch/' + id + '/trailers#play')
                //.addSuggestionLink('Описание', 'https://www.ivi.ru/watch/' + description_id + '/description')
            );
        }
    }

    function getBasicWatchCardRichResponse(app, syn, desc, title, id, poster) {
        let bodyText = strof(syn);
        let subtitle = strof(desc);
        let title1 = strof(title);
        let url = 'https://www.ivi.ru/watch/' + id;
        console.log("body=" + bodyText);
        console.log("subtitle=" + subtitle);
        console.log("title=" + title1);
        console.log("url=" + url);
        console.log("poster=" + poster);

        return app.buildRichResponse()

            .addBasicCard(
                app.buildBasicCard(bodyText)
                    .setImageDisplay('DEFAULT')
                    .setSubtitle(subtitle)
                    .setTitle(title1)
                    .addButton('Смотреть', url)
                    .setImage(poster, 'Постер фильма')
            )
            .addSuggestions(['Показать похожее'])
            .addSimpleResponse({
                speech: 'а вот и описание к ' + title.toString() + ": ",
                displayText: 'Вот, что-то нашлось:'
            });
    }

    function strof(obj) {
        if (obj) {
            return obj.toString();
        }
        return "";
    }


    function getGenreTitleById(id) {
        console.log("find genre id..." + id);

        let result = genresJson.result;
        for (let i = 0; i < result.length; i++) {
            let genres = result[i].genres;
            for (let j = 0; j < genres.length; j++) {
                let genre = genres[j];
                if (strof(genre.id) === strof(id)) {
                    console.log("found genre for id " + id + " :" + genre.title);
                    return genre.title;
                }
            }
        }
        return "";
    }

    function getGenreIdByTitle(title) {
        let result = genresJson.result;
        for (let i = 0; i < result.length; i++) {
            let genres = result[i].genres;
            for (let j = 0; j < genres.length; j++) {
                let genre = genres[j];
                if (genre.title === title) {
                    console.log("found genre id for title " + title + " :" + genre.id);
                    return genre.id;
                }
            }
        }
        return 0;
    }

    function getGenresStr(genres) {
        if (!genres) {
            return "";
        }
        if (genres.length == 0) {
            return "";
        }
        const s1 = getGenreTitleById(genres[0]);
        var s2 = "";
        if (genres.length > 1) {
            s2 = getGenreTitleById(genres[1])
        }
        if (s2 == "") {
            return s1;
        }
        return s1 + ", " + s2;
    }

    function append(country, s) {
        if (country !== "") {
            if (s === "") {
                s = country;
            } else {
                s = s + ", " + country;
            }
        }
        return s;
    }

    function descStr(result) {
        var s = "";
        var y = strof(result.year);
        var country = strof(countryTitleById(result.country));
        var genres = strof(getGenresStr(result.genres));
        var r = strof(result.restrict);
        var d = strof(result.duration);
        if (r !== "") {
            r = r + "+";
        }
        s = append(y, s);
        s = append(country, s);
        s = append(genres, s);
        s = append(r, s);
        s = append(d, s);
        //result.year + ", " + country + ", " + genres + ", " + r + "+" + ", " + d;
        return s;
    }

    //https://api.ivi.ru/mobileapi/countries/v5/?app_version=10942
    function countryTitleById(id) {
        console.log("find country id=" + id);
        return JSON.parse("{\"result\": {\"2\": \"Россия\", \"2\": \"Беларусь\", \"4\": \"США\", \"5\": \"Новая Зеландия\", \"6\": \"Великобритания\", \"8\": \"Франция\", \"10\": \"Швейцария\", \"12\": \"Китай\", \"13\": \"Таиланд\", \"15\": \"Канада\", \"16\": \"Австралия\", \"17\": \"Польша\", \"18\": \"Дания\", \"19\": \"ЮАР\", \"20\": \"Япония\", \"21\": \"Нидерланды\", \"22\": \"Казахстан\", \"23\": \"Гонконг\", \"24\": \"Германия\", \"25\": \"Южная Корея\", \"27\": \"Австрия\", \"28\": \"Ирландия\", \"29\": \"Италия\", \"30\": \"Румыния\", \"31\": \"Мексика\", \"32\": \"Турция\", \"33\": \"Украина\", \"35\": \"Армения\", \"36\": \"Словакия\", \"37\": \"Грузия\", \"44\": \"Латвия\", \"45\": \"Эстония\", \"46\": \"Литва\", \"48\": \"Испания\", \"49\": \"Швеция\", \"50\": \"Колумбия\", \"51\": \"Исландия\", \"52\": \"Аргентина\", \"54\": \"Финляндия\", \"55\": \"Норвегия\", \"56\": \"Индия\", \"57\": \"Греция\", \"58\": \"Чехия\", \"59\": \"Бразилия\", \"60\": \"Бельгия\", \"61\": \"Португалия\", \"62\": \"Венгрия\", \"63\": \"Индонезия\", \"67\": \"Иран\", \"71\": \"Израиль\", \"72\": \"Вьетнам\", \"74\": \"Малайзия\", \"75\": \"Кипр\", \"76\": \"Сингапур\", \"77\": \"Венесуэла\", \"79\": \"Перу\", \"80\": \"Египет\", \"81\": \"Филиппины\", \"82\": \"Тайвань\", \"83\": \"Югославия\", \"84\": \"Сербия\", \"86\": \"Хорватия\", \"87\": \"СССР\", \"91\": \"Болгария\", \"95\": \"Тунис\", \"97\": \"Чили\", \"98\": \"ОАЭ\", \"104\": \"Мальта\"}}")
            .result[id];
    }

}
