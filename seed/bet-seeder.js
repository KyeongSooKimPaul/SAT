var Bet = require('../models/bet');
var Betorder = require('../models/betorder');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
mongoose.connect('mongodb://localhost:27017/shopping');

//betpic - 0-Win, 1-lose, 2-draw



var bets = [
    new Bet({
        matchnumber : 30,
        betpic : "Win",
        order : 1,
        title : "England vs Panama (Win)",
        date : 62400
    }),
    new Bet({
        matchnumber : 'Korea vs Sweden',
        betpic : "Lose",
        order : 2,
        title : "England vs Panama (Lose)",
        date : 62400
    }),
    new Bet({
        matchnumber : 'Seoul Stadium',
        betpic: "Draw",
        order : 3,
        title : "England vs Panama (Draw)",
        date : 62400
    }),
    new Bet({
        matchnumber : 31,
        betpic : "Win",
        order : 4,
        title : "Japan vs Senegal (Win)",
        date : 62415
    }),
    new Bet({
        matchnumber : 31,
        betpic : "Lose",
        order : 5,
        title : "Japan vs Senegal (Lose)",
        date : 62415
    }),
    new Bet({
        matchnumber : 31,
        betpic: "Draw",
        order : 6,
        title : "Japan vs Senegal (Draw)",
        date : 62415
    }),
    new Bet({
        matchnumber : 32,
        betpic : "Win",
        order : 7,
        title : "Poland vs Colombia (Win)",
        date : 62418
    }),
    new Bet({
        matchnumber : 32,
        betpic : "Lose",
        order : 8,
        title : "Poland vs Colombia (Lose)",
        date : 62418
    }),
    new Bet({
        matchnumber : 32,
        betpic: "Draw",
        order : 9,
        title : "Poland vs Colombia (Draw)",
        date : 62418
    }),
    new Bet({
        matchnumber : 33,
        betpic : "Win",
        order : 10,
        title : "Uruguay vs Russia (Win)",
        date : 62514
    }),
    new Bet({
        matchnumber : 33,
        betpic : "Lose",
        order : 11,
        title : "Uruguay vs Russia (Lose)",
        date : 62514
    }),
    new Bet({
        matchnumber : 33,
        betpic: "Draw",
        order : 12,
        title : "Uruguay vs Russia (Draw)",
        date : 62514
    }),
    new Bet({
        matchnumber : 34,
        betpic : "Win",
        order : 13,
        title : "Saudi Arabia vs Egypt (Win)",
        date : 62514
    }),
    new Bet({
        matchnumber : 34,
        betpic : "Lose",
        order : 14,
        title : "Saudi Arabia vs Egypt (Lose)",
        date : 62514
    }),
    new Bet({
        matchnumber : 34,
        betpic: "Draw",
        order : 15,
        title : "Saudi Arabia vs Egypt (Draw)",
        date : 62514
    }),
    new Bet({
        matchnumber : 35,
        betpic : "Win",
        order : 16,
        title : "Spain vs Morocco (Win)",
        date : 62518
    }),
    new Bet({
        matchnumber : 35,
        betpic : "Lose",
        order : 17,
        title : "Spain vs Morocco (Lose)",
        date : 62518
    }),
    new Bet({
        matchnumber : 35,
        betpic: "Draw",
        order : 18,
        title : "Spain vs Morocco (Draw)",
        date : 62518
    }),
    new Bet({
        matchnumber : 36,
        betpic : "Win",
        order : 19,
        title : "Iran vs Portugal (Win)",
        date : 62518
    }),
    new Bet({
        matchnumber : 36,
        betpic : "Lose",
        order : 20,
        title : "Iran vs Portugal (Lose)",
        date : 62518
    }),
    new Bet({
        matchnumber : 36,
        betpic: "Draw",
        order : 21,
        title : "Iran vs Portugal (Draw)",
        date : 62518
    }),
    new Bet({
        matchnumber : 37,
        betpic : "Win",
        order : 22,
        title : "Denmark vs France (Win)",
        date : 62614
    }),
    new Bet({
        matchnumber : 37,
        betpic : "Lose",
        order : 23,
        title : "Denmark vs France (Lose)",
        date : 62614
    }),
    new Bet({
        matchnumber : 37,
        betpic: "Draw",
        order : 24,
        title : "Denmark vs France (Draw)",
        date : 62614
    }),
    new Bet({
        matchnumber : 38,
        betpic : "Win",
        order : 25,
        title : "Australia vs Peru (Win)",
        date : 62614
    }),
    new Bet({
        matchnumber : 38,
        betpic : "Lose",
        order : 26,
        title : "Australia vs Peru (Lose)",
        date : 62614
    }),
    new Bet({
        matchnumber : 38,
        betpic: "Draw",
        order : 27,
        title : "Australia vs Peru (Draw)",
        date : 62614
    }),
    new Bet({
        matchnumber : 39,
        betpic : "Win",
        order : 28,
        title : "Nigeria vs Argentina (Win)",
        date : 62618
    }),
    new Bet({
        matchnumber : 39,
        betpic : "Lose",
        order : 29,
        title : "Nigeria vs Argentina (Lose)",
        date : 62618
    }),
    new Bet({
        matchnumber : 39,
        betpic: "Draw",
        order : 30,
        title : "Nigeria vs Argentina (Draw)",
        date : 62618
    }),
    new Bet({
        matchnumber : 40,
        betpic : "Win",
        order : 31,
        title : "Iceland vs Croatia (Win)",
        date : 62618
    }),
    new Bet({
        matchnumber : 40,
        betpic : "Lose",
        order : 32,
        title : "Iceland vs Croatia (Lose)",
        date : 62618
    }),
    new Bet({
        matchnumber : 40,
        betpic: "Draw",
        order : 33,
        title : "Iceland vs Croatia (Draw)",
        date : 62618
    }),
    new Bet({
        matchnumber : 41,
        betpic : "Win",
        order : 34,
        title : "South Korea vs Germany (Win)",
        date : 62714
    }),
    new Bet({
        matchnumber : 41,
        betpic : "Lose",
        order : 35,
        title : "South Korea vs Germany (Lose)",
        date : 62714
    }),
    new Bet({
        matchnumber : 41,
        betpic: "Draw",
        order : 36,
        title : "South Korea vs Germany (Draw)",
        date : 62714
    }),
    new Bet({
        matchnumber : 42,
        betpic : "Win",
        order : 37,
        title : "Mexico vs Sweden (Win)",
        date : 62714
    }),
    new Bet({
        matchnumber : 42,
        betpic : "Lose",
        order : 38,
        title : "Mexico vs Sweden (Lose)",
        date : 62714
    }),
    new Bet({
        matchnumber : 42,
        betpic: "Draw",
        order : 39,
        title : "Mexico vs Sweden (Draw)",
        date : 62714
    }),
    new Bet({
        matchnumber : 43,
        betpic : "Win",
        order : 40,
        title : "Serbia vs Brazil (Win)",
        date : 62718
    }),
    new Bet({
        matchnumber : 43,
        betpic : "Lose",
        order : 41,
        title : "Serbia vs Brazil (Lose)",
        date : 62718
    }),
    new Bet({
        matchnumber : 43,
        betpic: "Draw",
        order : 42,
        title : "Serbia vs Brazil (Draw)",
        date : 62718
    }),
    new Bet({
        matchnumber : 44,
        betpic : "Win",
        order : 43,
        title : "Switzerland vs Costa Rica (Win)",
        date : 62718
    }),
    new Bet({
        matchnumber : 44,
        betpic : "Lose",
        order : 44,
        title : "Switzerland vs Costa Rica (Lose)",
        date : 62718
    }),
    new Bet({
        matchnumber : 44,
        betpic: "Draw",
        order : 45,
        title : "Switzerland vs Costa Rica (Draw)",
        date : 62718
    }),
    new Bet({
        matchnumber : 45,
        betpic : "Win",
        order : 46,
        title : "Japan vs Poland (Win)",
        date : 62814
    }),
    new Bet({
        matchnumber : 45,
        betpic : "Lose",
        order : 47,
        title : "Japan vs Poland (Lose)",
        date : 62814
    }),
    new Bet({
        matchnumber : 45,
        betpic: "Draw",
        order : 48,
        title : "Japan vs Poland (Draw)",
        date : 62814
    }),
    new Bet({
        matchnumber : 46,
        betpic : "Win",
        order : 49,
        title : "Senegal vs Colombia (Win)",
        date : 62814
    }),
    new Bet({
        matchnumber : 46,
        betpic : "Lose",
        order : 50,
        title : "Senegal vs Colombia (Lose)",
        date : 62814
    }),
    new Bet({
        matchnumber : 46,
        betpic: "Draw",
        order : 51,
        title : "Senegal vs Colombia (Draw)",
        date : 62814
    }),
    new Bet({
        matchnumber : 47,
        betpic : "Win",
        order : 52,
        title : "England vs Belgium (Win)",
        date : 62818
    }),
    new Bet({
        matchnumber : 47,
        betpic : "Lose",
        order : 53,
        title : "England vs Belgium (Lose)",
        date : 62818
    }),
    new Bet({
        matchnumber : 47,
        betpic: "Draw",
        order : 54,
        title : "England vs Belgium (Draw)",
        date : 62818
    }),
    new Bet({
        matchnumber : 48,
        betpic : "Win",
        order : 55,
        title : "Panama vs Tunisia (Win)",
        date : 62818
    }),
    new Bet({
        matchnumber : 48,
        betpic : "Lose",
        order : 56,
        title : "Panama vs Tunisia (Lose)",
        date : 62818
    }),
    new Bet({
        matchnumber : 48,
        betpic: "Draw",
        order : 57,
        title : "Panama vs Tunisia (Draw)",
        date : 62818
    }),
    new Bet({
        matchnumber : 49,
        betpic : "Win",
        order : 58,
        title : "1C vs 2D (Win)",
        date : 63014
    }),
    new Bet({
        matchnumber : 49,
        betpic : "Lose",
        order : 59,
        title : "1C vs 2D (Lose)",
        date : 63014
    }),
    new Bet({
        matchnumber : 49,
        betpic: "Draw",
        order : 60,
        title : "1C vs 2D (Draw)",
        date : 63014
    }),
    new Bet({
        matchnumber : 50,
        betpic : "Win",
        order : 61,
        title : "Uruguay vs Portugal (Win)",
        date : 63018
    }),
    new Bet({
        matchnumber : 50,
        betpic : "Lose",
        order : 62,
        title : "Uruguay vs Portugal (Lose)",
        date : 63018
    }),
    new Bet({
        matchnumber : 50,
        betpic: "Draw",
        order : 63,
        title : "Uruguay vs Portugal (Draw)",
        date : 63018
    }),
    new Bet({
        matchnumber : 51,
        betpic : "Win",
        order : 64,
        title : "Spain vs Russia (Win)",
        date : 70114
    }),
    new Bet({
        matchnumber : 51,
        betpic : "Lose",
        order : 65,
        title : "Spain vs Russia (Lose)",
        date : 70114
    }),
    new Bet({
        matchnumber : 51,
        betpic: "Draw",
        order : 66,
        title : "Spain vs Russia (Draw)",
        date : 70114
    }),
    new Bet({
        matchnumber : 52,
        betpic : "Win",
        order : 67,
        title : "1D vs 2C (Win)",
        date : 70118
    }),
    new Bet({
        matchnumber : 52,
        betpic : "Lose",
        order : 68,
        title : "1D vs 2C (Lose)",
        date : 70118
    }),
    new Bet({
        matchnumber : 52,
        betpic: "Draw",
        order : 69,
        title : "1D vs 2C (Draw)",
        date : 70118
    }),
    new Bet({
        matchnumber : 53,
        betpic : "Win",
        order : 70,
        title : "Brazil vs Mexico (Win)",
        date : 70214
    }),
    new Bet({
        matchnumber : 53,
        betpic : "Lose",
        order : 71,
        title : "Brazil vs Mexico (Lose)",
        date : 70214
    }),
    new Bet({
        matchnumber : 53,
        betpic: "Draw",
        order : 72,
        title : "Brazil vs Mexico (Draw)",
        date : 70214
    }),
    new Bet({
        matchnumber : 54,
        betpic : "Win",
        order : 73,
        title : "1G vs 2H (Win)",
        date : 70218
    }),
    new Bet({
        matchnumber : 54,
        betpic : "Lose",
        order : 74,
        title : "1G vs 2H (Lose)",
        date : 70218
    }),
    new Bet({
        matchnumber : 54,
        betpic: "Draw",
        order : 75,
        title : "1G vs 2H (Draw)",
        date : 70218
    }),
    new Bet({
        matchnumber : 55,
        betpic : "Win",
        order : 76,
        title : "Sweden vs Switzerland (Win)",
        date : 70314
    }),
    new Bet({
        matchnumber : 55,
        betpic : "Lose",
        order : 77,
        title : "Sweden vs Switzerland (Lose)",
        date : 70314
    }),
    new Bet({
        matchnumber : 55,
        betpic: "Draw",
        order : 78,
        title : "Sweden vs Switzerland (Draw)",
        date : 70314
    }),
    new Bet({
        matchnumber : 56,
        betpic : "Win",
        order : 79,
        title : "1H vs 2G (Win)",
        date : 70318
    }),
    new Bet({
        matchnumber : 56,
        betpic : "Lose",
        order : 80,
        title : "1H vs 2G (Lose)",
        date : 70318
    }),
    new Bet({
        matchnumber : 56,
        betpic: "Draw",
        order : 81,
        title : "1H vs 2G (Draw)",
        date : 70318
    }),
    new Bet({
        matchnumber : 57,
        betpic : "Win",
        order : 82,
        title : "W49 vs W50 (Win)",
        date : 70614
    }),
    new Bet({
        matchnumber : 57,
        betpic : "Lose",
        order : 83,
        title : "W49 vs W50 (Lose)",
        date : 70614
    }),
    new Bet({
        matchnumber : 57,
        betpic: "Draw",
        order : 84,
        title : "W49 vs W50 (Draw)",
        date : 70614
    }),
    new Bet({
        matchnumber : 58,
        betpic : "Win",
        order : 85,
        title : "W53 vs W54 (Win)",
        date : 70618
    }),
    new Bet({
        matchnumber : 58,
        betpic : "Lose",
        order : 86,
        title : "W53 vs W54 (Lose)",
        date : 70618
    }),
    new Bet({
        matchnumber : 58,
        betpic: "Draw",
        order : 87,
        title : "W53 vs W54 (Draw)",
        date : 70618
    }),
    new Bet({
        matchnumber : 59,
        betpic : "Win",
        order : 88,
        title : "W51 vs W52 (Win)",
        date : 70718
    }),
    new Bet({
        matchnumber : 59,
        betpic : "Lose",
        order : 89,
        title : "W51 vs W52 (Lose)",
        date : 70718
    }),
    new Bet({
        matchnumber : 59,
        betpic: "Draw",
        order : 90,
        title : "W51 vs W52 (Draw)",
        date : 70718
    }),
    new Bet({
        matchnumber : 60,
        betpic : "Win",
        order : 91,
        title : "W55 vs W56 (Win)",
        date : 70714
    }),
    new Bet({
        matchnumber : 60,
        betpic : "Lose",
        order : 92,
        title : "W55 vs W56 (Lose)",
        date : 70714
    }),
    new Bet({
        matchnumber : 60,
        betpic: "Draw",
        order : 93,
        title : "W55 vs W56 (Draw)",
        date : 70714
    }),
    new Bet({
        matchnumber : 61,
        betpic : "Win",
        order : 94,
        title : "W57 vs W58 (Win)",
        date : 71018
    }),
    new Bet({
        matchnumber : 61,
        betpic : "Lose",
        order : 95,
        title : "W57 vs W58 (Lose)",
        date : 71018
    }),
    new Bet({
        matchnumber : 61,
        betpic: "Draw",
        order : 96,
        title : "W57 vs W58 (Draw)",
        date : 71018
    }),
    new Bet({
        matchnumber : 62,
        betpic : "Win",
        order : 97,
        title : "W59 vs W60 (Win)",
        date : 71118
    }),
    new Bet({
        matchnumber : 62,
        betpic : "Lose",
        order : 98,
        title : "W59 vs W60 (Lose)",
        date : 71118
    }),
    new Bet({
        matchnumber : 62,
        betpic: "Draw",
        order : 99,
        title : "W59 vs W60 (Draw)",
        date : 71118
    }),
    new Bet({
        matchnumber : 63,
        betpic : "Win",
        order : 100,
        title : "3rd Place Match (Win)",
        date : 71414
    }),
    new Bet({
        matchnumber : 63,
        betpic : "Lose",
        order : 101,
        title : "3rd Place Match (Lose)",
        date : 71414
    }),
    new Bet({
        matchnumber : 63,
        betpic: "Draw",
        order : 102,
        title : "3rd Place Match (Draw)",
        date : 71414
    }),
    new Bet({
        matchnumber : 64,
        betpic : "Win",
        order : 103,
        title : "FINAL (Win)",
        date : 71515
    }),
    new Bet({
        matchnumber : 64,
        betpic : "Lose",
        order : 104,
        title : "FINAL (Lose)",
        date : 71515
    }),
    new Bet({
        matchnumber : 64,
        betpic: "Draw",
        order : 105,
        title : "FINAL (Draw)",
        date : 71515
    })
];

var done = 0;
for (var i = 0; i < bets.length; i++) {
    bets[i].point = 0;
    bets[i].betamount = 0;
    bets[i].save(function(err, result){
        done++;
        if (done === bets.length) {
            exit();
        }
    });
}




function exit() {
    mongoose.disconnect();
}