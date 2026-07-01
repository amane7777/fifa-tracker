import React, { useState, useMemo } from "react";

const SEED_MATCHES = [{"num": 1, "group": "A", "home": "Mexico", "away": "South Africa"}, {"num": 2, "group": "A", "home": "Korea Republic", "away": "Czechia"}, {"num": 3, "group": "A", "home": "Mexico", "away": "Korea Republic"}, {"num": 4, "group": "A", "home": "South Africa", "away": "Czechia"}, {"num": 5, "group": "A", "home": "Mexico", "away": "Czechia"}, {"num": 6, "group": "A", "home": "South Africa", "away": "Korea Republic"}, {"num": 7, "group": "B", "home": "Canada", "away": "Bosnia And Herzegovina"}, {"num": 8, "group": "B", "home": "Qatar", "away": "Switzerland"}, {"num": 9, "group": "B", "home": "Canada", "away": "Qatar"}, {"num": 10, "group": "B", "home": "Bosnia And Herzegovina", "away": "Switzerland"}, {"num": 11, "group": "B", "home": "Canada", "away": "Switzerland"}, {"num": 12, "group": "B", "home": "Bosnia And Herzegovina", "away": "Qatar"}, {"num": 13, "group": "C", "home": "Brazil", "away": "Morocco"}, {"num": 14, "group": "C", "home": "Haiti", "away": "Scotland"}, {"num": 15, "group": "C", "home": "Brazil", "away": "Haiti"}, {"num": 16, "group": "C", "home": "Morocco", "away": "Scotland"}, {"num": 17, "group": "C", "home": "Brazil", "away": "Scotland"}, {"num": 18, "group": "C", "home": "Morocco", "away": "Haiti"}, {"num": 19, "group": "D", "home": "USA", "away": "Paraguay"}, {"num": 20, "group": "D", "home": "Australia", "away": "T\u00fcrkiye"}, {"num": 21, "group": "D", "home": "USA", "away": "Australia"}, {"num": 22, "group": "D", "home": "Paraguay", "away": "T\u00fcrkiye"}, {"num": 23, "group": "D", "home": "USA", "away": "T\u00fcrkiye"}, {"num": 24, "group": "D", "home": "Paraguay", "away": "Australia"}, {"num": 25, "group": "E", "home": "Germany", "away": "Cura\u00e7ao"}, {"num": 26, "group": "E", "home": "C\u00f4te D'Ivoire", "away": "Ecuador"}, {"num": 27, "group": "E", "home": "Germany", "away": "C\u00f4te D'Ivoire"}, {"num": 28, "group": "E", "home": "Cura\u00e7ao", "away": "Ecuador"}, {"num": 29, "group": "E", "home": "Germany", "away": "Ecuador"}, {"num": 30, "group": "E", "home": "Cura\u00e7ao", "away": "C\u00f4te D'Ivoire"}, {"num": 31, "group": "F", "home": "Netherlands", "away": "Japan"}, {"num": 32, "group": "F", "home": "Sweden", "away": "Tunisia"}, {"num": 33, "group": "F", "home": "Netherlands", "away": "Sweden"}, {"num": 34, "group": "F", "home": "Japan", "away": "Tunisia"}, {"num": 35, "group": "F", "home": "Netherlands", "away": "Tunisia"}, {"num": 36, "group": "F", "home": "Japan", "away": "Sweden"}, {"num": 37, "group": "G", "home": "Belgium", "away": "Egypt"}, {"num": 38, "group": "G", "home": "IR Iran", "away": "New Zealand"}, {"num": 39, "group": "G", "home": "Belgium", "away": "IR Iran"}, {"num": 40, "group": "G", "home": "Egypt", "away": "New Zealand"}, {"num": 41, "group": "G", "home": "Belgium", "away": "New Zealand"}, {"num": 42, "group": "G", "home": "Egypt", "away": "IR Iran"}, {"num": 43, "group": "H", "home": "Spain", "away": "Cabo Verde"}, {"num": 44, "group": "H", "home": "Saudi Arabia", "away": "Uruguay"}, {"num": 45, "group": "H", "home": "Spain", "away": "Saudi Arabia"}, {"num": 46, "group": "H", "home": "Cabo Verde", "away": "Uruguay"}, {"num": 47, "group": "H", "home": "Spain", "away": "Uruguay"}, {"num": 48, "group": "H", "home": "Cabo Verde", "away": "Saudi Arabia"}, {"num": 49, "group": "I", "home": "France", "away": "Senegal"}, {"num": 50, "group": "I", "home": "Iraq", "away": "Norway"}, {"num": 51, "group": "I", "home": "France", "away": "Iraq"}, {"num": 52, "group": "I", "home": "Senegal", "away": "Norway"}, {"num": 53, "group": "I", "home": "France", "away": "Norway"}, {"num": 54, "group": "I", "home": "Senegal", "away": "Iraq"}, {"num": 55, "group": "J", "home": "Argentina", "away": "Algeria"}, {"num": 56, "group": "J", "home": "Austria", "away": "Jordan"}, {"num": 57, "group": "J", "home": "Argentina", "away": "Austria"}, {"num": 58, "group": "J", "home": "Algeria", "away": "Jordan"}, {"num": 59, "group": "J", "home": "Argentina", "away": "Jordan"}, {"num": 60, "group": "J", "home": "Algeria", "away": "Austria"}, {"num": 61, "group": "K", "home": "Portugal", "away": "Congo DR"}, {"num": 62, "group": "K", "home": "Uzbekistan", "away": "Colombia"}, {"num": 63, "group": "K", "home": "Portugal", "away": "Uzbekistan"}, {"num": 64, "group": "K", "home": "Congo DR", "away": "Colombia"}, {"num": 65, "group": "K", "home": "Portugal", "away": "Colombia"}, {"num": 66, "group": "K", "home": "Congo DR", "away": "Uzbekistan"}, {"num": 67, "group": "L", "home": "England", "away": "Croatia"}, {"num": 68, "group": "L", "home": "Ghana", "away": "Panama"}, {"num": 69, "group": "L", "home": "England", "away": "Ghana"}, {"num": 70, "group": "L", "home": "Croatia", "away": "Panama"}, {"num": 71, "group": "L", "home": "England", "away": "Panama"}, {"num": 72, "group": "L", "home": "Croatia", "away": "Ghana"}];
const SEED_BETS = [{"match": "#1 Mexico vs South Africa", "matchNum": 1, "home": "Mexico", "away": "South Africa", "market": "Over 2.5 Goals", "myOdds": 1.85, "bookieOdds": 2.13, "stake": 176.9911504424779, "homeGoals": 2, "awayGoals": 0, "result": "L", "pnl": -176.9911504424779}, {"match": "#1 Mexico vs South Africa", "matchNum": 1, "home": "Mexico", "away": "South Africa", "market": "Over 1.5 Goals", "myOdds": 1.28, "bookieOdds": 1.36, "stake": 277.7777777777777, "homeGoals": 2, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#1 Mexico vs South Africa", "matchNum": 1, "home": "Mexico", "away": "South Africa", "market": "Over 3.5 Goals", "myOdds": 3.15, "bookieOdds": 4, "stake": 33.333333333333336, "homeGoals": 2, "awayGoals": 0, "result": "L", "pnl": -33.333333333333336}, {"match": "#1 Mexico vs South Africa", "matchNum": 1, "home": "Mexico", "away": "South Africa", "market": "Team A Win", "myOdds": 1.33, "bookieOdds": 1.43, "stake": 232.55813953488376, "homeGoals": 2, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#2 Korea Republic vs Czechia", "matchNum": 2, "home": "korea republic", "away": "czechia", "market": "BTTS Yes", "myOdds": 1.71, "bookieOdds": 1.87, "stake": 114.94252873563217, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#2 Korea Republic vs Czechia", "matchNum": 2, "home": "korea republic", "away": "czechia", "market": "Team A Win", "myOdds": 2.37, "bookieOdds": 2.71, "stake": 58.47953216374269, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#2 Korea Republic vs Czechia", "matchNum": 2, "home": "korea republic", "away": "czechia", "market": "Over 2.5 Goals", "myOdds": 1.84, "bookieOdds": 2.25, "stake": 160, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#2 Korea Republic vs Czechia", "matchNum": 2, "home": "korea republic", "away": "czechia", "market": "Over 1.5 Goals", "myOdds": 1.27, "bookieOdds": 1.46, "stake": 434.7826086956522, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#2 Korea Republic vs Czechia", "matchNum": 2, "home": "korea republic", "away": "czechia", "market": "Over 3.5 Goals", "myOdds": 3.11, "bookieOdds": 4, "stake": 66.66666666666667, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -66.66666666666667}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Team A Win", "myOdds": 1.53, "bookieOdds": 1.85, "stake": 235.2941176470588, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -235.2941176470588}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Draw", "myOdds": 2.49, "bookieOdds": 3.57, "stake": 155.64202334630352, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Over 2.5 Goals", "myOdds": 1.89, "bookieOdds": 2.3, "stake": 153.84615384615387, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -153.84615384615387}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Over 1.5 Goals", "myOdds": 1.29, "bookieOdds": 1.44, "stake": 454.5454545454546, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Over 3.5 Goals", "myOdds": 3.26, "bookieOdds": 4.2, "stake": 31.25, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -31.25}, {"match": "#7 Canada vs Bosnia And Herzegovina", "matchNum": 3, "home": "canada", "away": "bosnia and herzegovina", "market": "Draw No Bet A", "myOdds": 1.2, "bookieOdds": 1.3, "stake": 333.33333333333326, "homeGoals": 1, "awayGoals": 1, "result": "P", "pnl": 0}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "Team A Win", "myOdds": 1.81, "bookieOdds": 2.14, "stake": 175.43859649122805, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "Over 2.5 Goals", "myOdds": 1.82, "bookieOdds": 2.48, "stake": 270.27027027027026, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "Over 1.5 Goals", "myOdds": 1.26, "bookieOdds": 1.45, "stake": 444.4444444444445, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "Over 3.5 Goals", "myOdds": 3.07, "bookieOdds": 4.6, "stake": 55.555555555555564, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "BTTS Yes", "myOdds": 1.81, "bookieOdds": 2.05, "stake": 95.23809523809526, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#19 USA vs Paraguay", "matchNum": 4, "home": "usa", "away": "paraguay", "market": "Draw No Bet A", "myOdds": 1.37, "bookieOdds": 1.45, "stake": 222.22222222222226, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#8 Qatar vs Switzerland", "matchNum": 5, "home": "qatar", "away": "switzerland", "market": "BTTS No", "myOdds": 1.34, "bookieOdds": 1.55, "stake": 363.6363636363636, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -363.6363636363636}, {"match": "#13 Brazil vs Morocco", "matchNum": 6, "home": "brazil", "away": "morocco", "market": "Double Chance X2", "myOdds": 1.94, "bookieOdds": 2.2, "stake": 83.33333333333331, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 99.99999999999999}, {"match": "#13 Brazil vs Morocco", "matchNum": 6, "home": "brazil", "away": "morocco", "market": "Draw No Bet B", "myOdds": 3, "bookieOdds": 3.75, "stake": 36.36363636363637, "homeGoals": 1, "awayGoals": 1, "result": "P", "pnl": 0}, {"match": "#13 Brazil vs Morocco", "matchNum": 6, "home": "brazil", "away": "morocco", "market": "Team B Win", "myOdds": 4.13, "bookieOdds": 5.5, "stake": 22.22222222222222, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -22.22222222222222}, {"match": "#14 Haiti vs Scotland", "matchNum": 7, "home": "haiti", "away": "scotland", "market": "Team A Win", "myOdds": 3.51, "bookieOdds": 5.5, "stake": 44.44444444444444, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -44.44444444444444}, {"match": "#14 Haiti vs Scotland", "matchNum": 7, "home": "haiti", "away": "scotland", "market": "Draw", "myOdds": 3.47, "bookieOdds": 4.2, "stake": 31.25, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -31.25}, {"match": "#14 Haiti vs Scotland", "matchNum": 7, "home": "haiti", "away": "scotland", "market": "Under 2.5 Goals", "myOdds": 1.81, "bookieOdds": 2.25, "stake": 160, "homeGoals": 0, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#14 Haiti vs Scotland", "matchNum": 7, "home": "haiti", "away": "scotland", "market": "Double Chance 1X", "myOdds": 1.74, "bookieOdds": 2.5, "stake": 266.6666666666667, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -266.6666666666667}, {"match": "#14 Haiti vs Scotland", "matchNum": 7, "home": "haiti", "away": "scotland", "market": "Draw No Bet A", "myOdds": 2.49, "bookieOdds": 4.4, "stake": 117.6470588235294, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -117.6470588235294}, {"match": "#20 Australia vs T\u00fcrkiye", "matchNum": 8, "home": "australia", "away": "turkiye", "market": "Team B Win", "myOdds": 1.57, "bookieOdds": 1.72, "stake": 138.88888888888889, "homeGoals": 2, "awayGoals": 0, "result": "L", "pnl": -138.88888888888889}, {"match": "#26 C\u00f4te D'Ivoire vs Ecuador", "matchNum": 10, "home": "C\u00f4te D'Ivoire", "away": "ecuador", "market": "Team A Win", "myOdds": 2.69, "bookieOdds": 3.25, "stake": 44.44444444444444, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#26 C\u00f4te D'Ivoire vs Ecuador", "matchNum": 10, "home": "C\u00f4te D'Ivoire", "away": "ecuador", "market": "Draw No Bet A", "myOdds": 1.85, "bookieOdds": 2.2, "stake": 166.66666666666663, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 199.99999999999997}, {"match": "#31 Netherlands vs Japan", "matchNum": 11, "home": "netherlands", "away": "japan", "market": "Under 2.5 Goals", "myOdds": 1.65, "bookieOdds": 1.8, "stake": 125, "homeGoals": 2, "awayGoals": 2, "result": "L", "pnl": -125}, {"match": "#31 Netherlands vs Japan", "matchNum": 11, "home": "netherlands", "away": "japan", "market": "BTTS No", "myOdds": 1.76, "bookieOdds": 1.91, "stake": 109.8901098901099, "homeGoals": 2, "awayGoals": 2, "result": "L", "pnl": -109.8901098901099}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "Team B Win", "myOdds": 3.66, "bookieOdds": 4.75, "stake": 26.666666666666668, "homeGoals": 5, "awayGoals": 1, "result": "L", "pnl": -26.666666666666668}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "Over 2.5 Goals", "myOdds": 1.58, "bookieOdds": 2.22, "stake": 327.86885245901635, "homeGoals": 5, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "Over 1.5 Goals", "myOdds": 1.18, "bookieOdds": 1.38, "stake": 1052.6315789473688, "homeGoals": 5, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "Over 3.5 Goals", "myOdds": 2.42, "bookieOdds": 4.25, "stake": 123.07692307692308, "homeGoals": 5, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "BTTS Yes", "myOdds": 1.55, "bookieOdds": 2, "stake": 400, "homeGoals": 5, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#32 Sweden vs Tunisia", "matchNum": 12, "home": "sweden", "away": "tunisia", "market": "Draw No Bet B", "myOdds": 2.8, "bookieOdds": 3.35, "stake": 42.5531914893617, "homeGoals": 5, "awayGoals": 1, "result": "L", "pnl": -42.5531914893617}, {"match": "#43 Spain vs Cabo Verde", "matchNum": 13, "home": "spain", "away": "cabo verde", "market": "Under 2.5 Goals", "myOdds": 2.58, "bookieOdds": 3.85, "stake": 140.35087719298244, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 399.99999999999994}, {"match": "#43 Spain vs Cabo Verde", "matchNum": 13, "home": "spain", "away": "cabo verde", "market": "BTTS No", "myOdds": 1.15, "bookieOdds": 1.48, "stake": 833.3333333333334, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 400}, {"match": "#37 Belgium vs Egypt", "matchNum": 14, "home": "belgium", "away": "egypt", "market": "Team A Win", "myOdds": 1.45, "bookieOdds": 1.55, "stake": 181.8181818181818, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -181.8181818181818}, {"match": "#37 Belgium vs Egypt", "matchNum": 14, "home": "belgium", "away": "egypt", "market": "Over 2.5 Goals", "myOdds": 1.35, "bookieOdds": 1.95, "stake": 421.0526315789474, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -421.0526315789474}, {"match": "#37 Belgium vs Egypt", "matchNum": 14, "home": "belgium", "away": "egypt", "market": "Over 1.5 Goals", "myOdds": 1.11, "bookieOdds": 1.3, "stake": 1333.333333333333, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 399.99999999999994}, {"match": "#37 Belgium vs Egypt", "matchNum": 14, "home": "belgium", "away": "egypt", "market": "Over 3.5 Goals", "myOdds": 1.86, "bookieOdds": 3.32, "stake": 172.41379310344828, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -172.41379310344828}, {"match": "#37 Belgium vs Egypt", "matchNum": 14, "home": "belgium", "away": "egypt", "market": "BTTS Yes", "myOdds": 1.52, "bookieOdds": 2, "stake": 400, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#44 Saudi Arabia vs Uruguay", "matchNum": 15, "home": "saudi arabia", "away": "uruguay", "market": "BTTS Yes", "myOdds": 2.36, "bookieOdds": 2.8, "stake": 55.555555555555564, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Team B Win", "myOdds": 2.74, "bookieOdds": 4.8, "stake": 26.315789473684212, "homeGoals": 2, "awayGoals": 2, "result": "L", "pnl": -26.315789473684212}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Over 2.5 Goals", "myOdds": 2.06, "bookieOdds": 2.45, "stake": 137.9310344827586, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Over 1.5 Goals", "myOdds": 1.34, "bookieOdds": 1.46, "stake": 217.3913043478261, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 100}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Over 3.5 Goals", "myOdds": 3.74, "bookieOdds": 4.65, "stake": 27.3972602739726, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 100}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "BTTS Yes", "myOdds": 1.84, "bookieOdds": 2.15, "stake": 173.91304347826087, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Double Chance X2", "myOdds": 1.54, "bookieOdds": 2.02, "stake": 392.156862745098, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 400}, {"match": "#38 IR Iran vs New Zealand", "matchNum": 16, "home": "Iran", "away": "New Zealand", "market": "Draw No Bet B", "myOdds": 1.97, "bookieOdds": 3.5, "stake": 160, "homeGoals": 2, "awayGoals": 2, "result": "P", "pnl": 0}, {"match": "#49 France vs Senegal", "matchNum": 17, "home": "france", "away": "senegal", "market": "Team A Win", "myOdds": 1.39, "bookieOdds": 1.48, "stake": 208.33333333333334, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#50 Iraq vs Norway", "matchNum": 18, "home": "iraq", "away": "norway", "market": "BTTS Yes", "myOdds": 1.64, "bookieOdds": 2.4, "stake": 285.7142857142857, "homeGoals": 1, "awayGoals": 4, "result": "W", "pnl": 400}, {"match": "#50 Iraq vs Norway", "matchNum": 18, "home": "iraq", "away": "norway", "market": "Over 2.5 Goals", "myOdds": 1.3, "bookieOdds": 1.62, "stake": 645.1612903225805, "homeGoals": 1, "awayGoals": 4, "result": "W", "pnl": 400}, {"match": "#50 Iraq vs Norway", "matchNum": 18, "home": "iraq", "away": "norway", "market": "Over 3.5 Goals", "myOdds": 1.74, "bookieOdds": 2.6, "stake": 250, "homeGoals": 1, "awayGoals": 4, "result": "W", "pnl": 400}, {"match": "#55 Argentina vs Algeria", "matchNum": 19, "home": "argentina", "away": "algeria", "market": "Over 2.5 Goals", "myOdds": 1.65, "bookieOdds": 1.95, "stake": 210.5263157894737, "homeGoals": 3, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#55 Argentina vs Algeria", "matchNum": 19, "home": "argentina", "away": "algeria", "market": "Over 3.5 Goals", "myOdds": 2.6, "bookieOdds": 3.45, "stake": 81.63265306122449, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -81.63265306122449}, {"match": "#55 Argentina vs Algeria", "matchNum": 19, "home": "argentina", "away": "algeria", "market": "BTTS Yes", "myOdds": 1.86, "bookieOdds": 2.1, "stake": 90.9090909090909, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -90.9090909090909}, {"match": "#56 Austria vs Jordan", "matchNum": 20, "home": "austria", "away": "jordan", "market": "Under 2.5 Goals", "myOdds": 1.81, "bookieOdds": 2, "stake": 100, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -100}, {"match": "#61 Portugal vs Congo DR", "matchNum": 21, "home": "portugal", "away": "Congo DR", "market": "BTTS Yes", "myOdds": 2.02, "bookieOdds": 2.25, "stake": 80, "homeGoals": 1, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#67 England vs Croatia", "matchNum": 22, "home": "england", "away": "croatia", "market": "Team B Win", "myOdds": 4.23, "bookieOdds": 5.25, "stake": 23.529411764705884, "homeGoals": 4, "awayGoals": 2, "result": "L", "pnl": -23.529411764705884}, {"match": "#67 England vs Croatia", "matchNum": 22, "home": "england", "away": "croatia", "market": "Over 2.5 Goals", "myOdds": 1.73, "bookieOdds": 2, "stake": 200, "homeGoals": 4, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#67 England vs Croatia", "matchNum": 22, "home": "england", "away": "croatia", "market": "Over 3.5 Goals", "myOdds": 2.82, "bookieOdds": 3.25, "stake": 44.44444444444444, "homeGoals": 4, "awayGoals": 2, "result": "W", "pnl": 100}, {"match": "#67 England vs Croatia", "matchNum": 22, "home": "england", "away": "croatia", "market": "BTTS Yes", "myOdds": 1.69, "bookieOdds": 1.95, "stake": 210.5263157894737, "homeGoals": 4, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#67 England vs Croatia", "matchNum": 22, "home": "england", "away": "croatia", "market": "Draw No Bet B", "myOdds": 3.19, "bookieOdds": 3.77, "stake": 36.101083032490976, "homeGoals": 4, "awayGoals": 2, "result": "L", "pnl": -36.101083032490976}, {"match": "#68 Ghana vs Panama", "matchNum": 23, "home": "ghana", "away": "panama", "market": "Team A Win", "myOdds": 1.93, "bookieOdds": 2.35, "stake": 148.14814814814815, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 200.00000000000003}, {"match": "#68 Ghana vs Panama", "matchNum": 23, "home": "ghana", "away": "panama", "market": "Over 2.5 Goals", "myOdds": 2.04, "bookieOdds": 2.3, "stake": 76.92307692307693, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -76.92307692307693}, {"match": "#68 Ghana vs Panama", "matchNum": 23, "home": "ghana", "away": "panama", "market": "Draw No Bet A", "myOdds": 1.42, "bookieOdds": 1.61, "stake": 327.86885245901635, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#4 South Africa vs Czechia", "matchNum": 25, "home": "south africa", "away": "czechia", "market": "Team B Win", "myOdds": 1.64, "bookieOdds": 1.86, "stake": 232.5581395348837, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -232.5581395348837}, {"match": "#4 South Africa vs Czechia", "matchNum": 25, "home": "south africa", "away": "czechia", "market": "Over 2.5 Goals", "myOdds": 1.82, "bookieOdds": 2.15, "stake": 173.91304347826087, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -173.91304347826087}, {"match": "#4 South Africa vs Czechia", "matchNum": 25, "home": "south africa", "away": "czechia", "market": "Over 3.5 Goals", "myOdds": 3.07, "bookieOdds": 3.8, "stake": 35.714285714285715, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -35.714285714285715}, {"match": "#9 Canada vs Qatar", "matchNum": 27, "home": "canada", "away": "qatar", "market": "BTTS Yes", "myOdds": 2.01, "bookieOdds": 2.38, "stake": 144.92753623188406, "homeGoals": 6, "awayGoals": 0, "result": "L", "pnl": -144.92753623188406}, {"match": "#9 Canada vs Qatar", "matchNum": 27, "home": "canada", "away": "qatar", "market": "Double Chance X2", "myOdds": 3.23, "bookieOdds": 3.78, "stake": 35.97122302158274, "homeGoals": 6, "awayGoals": 0, "result": "L", "pnl": -35.97122302158274}, {"match": "#9 Canada vs Qatar", "matchNum": 27, "home": "canada", "away": "qatar", "market": "Draw No Bet B", "myOdds": 3, "bookieOdds": 3.75, "stake": 36.36363636363637, "homeGoals": 6, "awayGoals": 0, "result": "L", "pnl": -36.36363636363637}, {"match": "#3 Mexico vs Korea Republic", "matchNum": 28, "home": "Mexico", "away": "Korea Republic", "market": "Over 2.5 Goals", "myOdds": 1.82, "bookieOdds": 2.15, "stake": 173.91304347826087, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -173.91304347826087}, {"match": "#3 Mexico vs Korea Republic", "matchNum": 28, "home": "Mexico", "away": "Korea Republic", "market": "Over 3.5 Goals", "myOdds": 3.07, "bookieOdds": 3.8, "stake": 71.42857142857143, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -71.42857142857143}, {"match": "#21 USA vs Australia", "matchNum": 29, "home": "usa", "away": "australia", "market": "BTTS No", "myOdds": 1.71, "bookieOdds": 2, "stake": 200, "homeGoals": 2, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#21 USA vs Australia", "matchNum": 29, "home": "Usa", "away": "Australia", "market": "Team A Win", "myOdds": 1.51, "bookieOdds": 1.66, "stake": 151.51515151515153, "homeGoals": 2, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#16 Morocco vs Scotland", "matchNum": 30, "home": "morocco", "away": "scotland", "market": "Team B Win", "myOdds": 4.24, "bookieOdds": 6, "stake": 20, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -20}, {"match": "#16 Morocco vs Scotland", "matchNum": 30, "home": "morocco", "away": "scotland", "market": "Draw No Bet B", "myOdds": 3.02, "bookieOdds": 4.55, "stake": 112.67605633802818, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -112.67605633802818}, {"match": "#16 Morocco vs Scotland", "matchNum": 30, "home": "morocco", "away": "scotland", "market": "Double Chance X2", "myOdds": 1.91, "bookieOdds": 2.32, "stake": 151.51515151515153, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -151.51515151515153}, {"match": "#13 Brazil vs Morocco", "matchNum": 31, "home": "brazil", "away": "haiti", "market": "Draw", "myOdds": 7.25, "bookieOdds": 11, "stake": 10, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -10}, {"match": "#22 Paraguay vs T\u00fcrkiye", "matchNum": 32, "home": "paraguay", "away": "turkiye", "market": "Team B Win", "myOdds": 1.78, "bookieOdds": 2, "stake": 100, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -100}, {"match": "#22 Paraguay vs T\u00fcrkiye", "matchNum": 32, "home": "paraguay", "away": "turkiye", "market": "Over 2.5 Goals", "myOdds": 1.83, "bookieOdds": 2.12, "stake": 178.57142857142856, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -178.57142857142856}, {"match": "#22 Paraguay vs T\u00fcrkiye", "matchNum": 32, "home": "paraguay", "away": "turkiye", "market": "Over 1.5 Goals", "myOdds": 3.09, "bookieOdds": 4, "stake": 66.66666666666667, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -66.66666666666667}, {"match": "#22 Paraguay vs T\u00fcrkiye", "matchNum": 32, "home": "paraguay", "away": "turkiye", "market": "Draw No Bet B", "myOdds": 1.35, "bookieOdds": 1.45, "stake": 222.22222222222226, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -222.22222222222226}, {"match": "#13 Brazil vs Morocco", "matchNum": 33, "home": "brazil", "away": "haiti", "market": "BTTS Yes", "myOdds": 2.24, "bookieOdds": 2.63, "stake": 61.34969325153374, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -61.34969325153374}, {"match": "#13 Brazil vs Morocco", "matchNum": 33, "home": "brazil", "away": "haiti", "market": "Double Chance X2", "myOdds": 5.08, "bookieOdds": 7, "stake": 16.666666666666668, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -16.666666666666668}, {"match": "#27 Germany vs C\u00f4te D'Ivoire", "matchNum": 34, "home": "germany", "away": "C\u00f4te D'Ivoire", "market": "Draw", "myOdds": 3.65, "bookieOdds": 4.75, "stake": 26.666666666666668, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -26.666666666666668}, {"match": "#27 Germany vs C\u00f4te D'Ivoire", "matchNum": 34, "home": "germany", "away": "C\u00f4te D'Ivoire", "market": "Under 2.5 Goals", "myOdds": 1.64, "bookieOdds": 2.3, "stake": 307.69230769230774, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -307.69230769230774}, {"match": "#27 Germany vs C\u00f4te D'Ivoire", "matchNum": 34, "home": "germany", "away": "C\u00f4te D'Ivoire", "market": "Double Chance X2", "myOdds": 2.3, "bookieOdds": 2.63, "stake": 61.34969325153374, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -61.34969325153374}, {"match": "#28 Cura\u00e7ao vs Ecuador", "matchNum": 35, "home": "curacao", "away": "ecuador", "market": "Draw", "myOdds": 4.2, "bookieOdds": 9, "stake": 50, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 400}, {"match": "#28 Cura\u00e7ao vs Ecuador", "matchNum": 35, "home": "curacao", "away": "ecuador", "market": "Under 2.5 Goals", "myOdds": 1.55, "bookieOdds": 2.55, "stake": 258.0645161290323, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 400.00000000000006}, {"match": "#28 Cura\u00e7ao vs Ecuador", "matchNum": 35, "home": "curacao", "away": "ecuador", "market": "Double Chance 1X", "myOdds": 3.14, "bookieOdds": 5.5, "stake": 88.88888888888889, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 400}, {"match": "#34 Japan vs Tunisia", "matchNum": 36, "home": "japan", "away": "tunisia", "market": "Draw", "myOdds": 3.86, "bookieOdds": 4.6, "stake": 27.777777777777782, "homeGoals": 4, "awayGoals": 0, "result": "L", "pnl": -27.777777777777782}, {"match": "#34 Japan vs Tunisia", "matchNum": 36, "home": "japan", "away": "tunisia", "market": "Under 2.5 Goals", "myOdds": 1.53, "bookieOdds": 1.8, "stake": 250, "homeGoals": 4, "awayGoals": 0, "result": "L", "pnl": -250}, {"match": "#34 Japan vs Tunisia", "matchNum": 36, "home": "japan", "away": "tunisia", "market": "BTTS No", "myOdds": 1.47, "bookieOdds": 1.65, "stake": 307.69230769230774, "homeGoals": 4, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#45 Spain vs Saudi Arabia", "matchNum": 37, "home": "spain", "away": "saudi arabia", "market": "Under 2.5 Goals", "myOdds": 2.56, "bookieOdds": 3.4, "stake": 83.33333333333334, "homeGoals": 4, "awayGoals": 0, "result": "L", "pnl": -83.33333333333334}, {"match": "#39 Belgium vs IR Iran", "matchNum": 38, "home": "belgium", "away": "iran", "market": "Over 2.5 Goals", "myOdds": 1.52, "bookieOdds": 1.91, "stake": 439.5604395604396, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -439.5604395604396}, {"match": "#39 Belgium vs IR Iran", "matchNum": 38, "home": "belgium", "away": "iran", "market": "Over 3.5 Goals", "myOdds": 2.29, "bookieOdds": 3.1, "stake": 190.47619047619048, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -190.47619047619048}, {"match": "#39 Belgium vs IR Iran", "matchNum": 38, "home": "belgium", "away": "iran", "market": "BTTS Yes", "myOdds": 1.83, "bookieOdds": 2.05, "stake": 95.23809523809526, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -95.23809523809526}, {"match": "#46 Cabo Verde vs Uruguay", "matchNum": 39, "home": "cabo verde", "away": "uruguay", "market": "Double Chance 1X", "myOdds": 2.81, "bookieOdds": 3.2, "stake": 45.45454545454545, "homeGoals": 2, "awayGoals": 2, "result": "W", "pnl": 100}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Team B Win", "myOdds": 3.59, "bookieOdds": 6, "stake": 80, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -80}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Over 2.5 Goals", "myOdds": 1.47, "bookieOdds": 2, "stake": 400, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Over 1.5 Goals", "myOdds": 1.15, "bookieOdds": 1.32, "stake": 1249.9999999999998, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Over 3.5 Goals", "myOdds": 2.15, "bookieOdds": 3.5, "stake": 160, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "BTTS Yes", "myOdds": 1.48, "bookieOdds": 2, "stake": 400, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Double Chance X2", "myOdds": 1.98, "bookieOdds": 2.48, "stake": 135.13513513513513, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -135.13513513513513}, {"match": "#40 Egypt vs New Zealand", "matchNum": 40, "home": "new zealand", "away": "egypt", "market": "Draw No Bet B", "myOdds": 2.8, "bookieOdds": 4.65, "stake": 109.5890410958904, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -109.5890410958904}, {"match": "#51 France vs Iraq", "matchNum": 41, "home": "france", "away": "iraq", "market": "Over 2.5 Goals", "myOdds": 1.58, "bookieOdds": 1.77, "stake": 129.87012987012986, "homeGoals": 3, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#51 France vs Iraq", "matchNum": 41, "home": "france", "away": "iraq", "market": "BTTS Yes", "myOdds": 2.23, "bookieOdds": 2.63, "stake": 61.34969325153374, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -61.34969325153374}, {"match": "#52 Senegal vs Norway", "matchNum": 42, "home": "senegal", "away": "norway", "market": "Team B Win", "myOdds": 2.01, "bookieOdds": 2.45, "stake": 137.9310344827586, "homeGoals": 2, "awayGoals": 3, "result": "W", "pnl": 200}, {"match": "#52 Senegal vs Norway", "matchNum": 42, "home": "senegal", "away": "norway", "market": "Over 2.5 Goals", "myOdds": 1.56, "bookieOdds": 1.8, "stake": 250, "homeGoals": 2, "awayGoals": 3, "result": "W", "pnl": 200}, {"match": "#52 Senegal vs Norway", "matchNum": 42, "home": "senegal", "away": "norway", "market": "Over 3.5 Goals", "myOdds": 2.38, "bookieOdds": 3.2, "stake": 90.9090909090909, "homeGoals": 2, "awayGoals": 3, "result": "W", "pnl": 200}, {"match": "#52 Senegal vs Norway", "matchNum": 42, "home": "senegal", "away": "norway", "market": "BTTS Yes", "myOdds": 1.56, "bookieOdds": 1.67, "stake": 149.2537313432836, "homeGoals": 2, "awayGoals": 3, "result": "W", "pnl": 100}, {"match": "#52 Senegal vs Norway", "matchNum": 42, "home": "senegal", "away": "norway", "market": "Draw No Bet B", "myOdds": 1.54, "bookieOdds": 1.73, "stake": 273.972602739726, "homeGoals": 2, "awayGoals": 3, "result": "W", "pnl": 200}, {"match": "#58 Algeria vs Jordan", "matchNum": 43, "home": "algeria", "away": "jordan", "market": "Double Chance X2", "myOdds": 2.45, "bookieOdds": 2.9, "stake": 52.631578947368425, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -52.631578947368425}, {"match": "#58 Algeria vs Jordan", "matchNum": 43, "home": "algeria", "away": "jordan", "market": "BTTS Yes", "myOdds": 1.88, "bookieOdds": 2.05, "stake": 95.23809523809526, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#69 England vs Ghana", "matchNum": 44, "home": "england", "away": "ghana", "market": "Draw", "myOdds": 5.77, "bookieOdds": 7.5, "stake": 15.384615384615385, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#69 England vs Ghana", "matchNum": 44, "home": "england", "away": "ghana", "market": "BTTS Yes", "myOdds": 1.98, "bookieOdds": 2.38, "stake": 144.92753623188406, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -144.92753623188406}, {"match": "#69 England vs Ghana", "matchNum": 44, "home": "england", "away": "ghana", "market": "Double Chance X2", "myOdds": 3.73, "bookieOdds": 4.5, "stake": 28.571428571428573, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#70 Croatia vs Panama", "matchNum": 45, "home": "croatia", "away": "panama", "market": "Team B Win", "myOdds": 1.3, "bookieOdds": 1.42, "stake": 476.19047619047626, "homeGoals": 0, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#70 Croatia vs Panama", "matchNum": 45, "home": "croatia", "away": "panama", "market": "BTTS No", "myOdds": 1.59, "bookieOdds": 1.8, "stake": 250, "homeGoals": 0, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#64 Congo DR vs Colombia", "matchNum": 46, "home": "congo DR", "away": "Colombia", "market": "Team A Win", "myOdds": 4.47, "bookieOdds": 7, "stake": 33.333333333333336, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -33.333333333333336}, {"match": "#64 Congo DR vs Colombia", "matchNum": 46, "home": "congo DR", "away": "Colombia", "market": "Over 2.5 Goals", "myOdds": 1.77, "bookieOdds": 2.1, "stake": 181.8181818181818, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -181.8181818181818}, {"match": "#64 Congo DR vs Colombia", "matchNum": 46, "home": "congo DR", "away": "Colombia", "market": "Over 3.5 Goals", "myOdds": 2.92, "bookieOdds": 3.8, "stake": 71.42857142857143, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -71.42857142857143}, {"match": "#64 Congo DR vs Colombia", "matchNum": 46, "home": "congo DR", "away": "Colombia", "market": "BTTS Yes", "myOdds": 1.75, "bookieOdds": 2.2, "stake": 333.33333333333326, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -333.33333333333326}, {"match": "#64 Congo DR vs Colombia", "matchNum": 46, "home": "congo DR", "away": "Colombia", "market": "Draw No Bet A", "myOdds": 3.56, "bookieOdds": 5, "stake": 50, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -50}, {"match": "#12 Bosnia And Herzegovina vs Qatar", "matchNum": 47, "home": "Bosnia And Herzegovina", "away": "qatar", "market": "Draw", "myOdds": 4.11, "bookieOdds": 5, "stake": 25, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -25}, {"match": "#12 Bosnia And Herzegovina vs Qatar", "matchNum": 47, "home": "Bosnia And Herzegovina", "away": "qatar", "market": "Team B Win", "myOdds": 3.55, "bookieOdds": 7, "stake": 66.66666666666667, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -66.66666666666667}, {"match": "#12 Bosnia And Herzegovina vs Qatar", "matchNum": 47, "home": "Bosnia And Herzegovina", "away": "qatar", "market": "BTTS Yes", "myOdds": 1.67, "bookieOdds": 1.91, "stake": 219.7802197802198, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#12 Bosnia And Herzegovina vs Qatar", "matchNum": 47, "home": "Bosnia And Herzegovina", "away": "qatar", "market": "Double Chance X2", "myOdds": 1.91, "bookieOdds": 2.75, "stake": 228.57142857142858, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -228.57142857142858}, {"match": "#12 Bosnia And Herzegovina vs Qatar", "matchNum": 47, "home": "Bosnia And Herzegovina", "away": "qatar", "market": "Draw No Bet B", "myOdds": 2.69, "bookieOdds": 5, "stake": 100, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -100}, {"match": "#11 Canada vs Switzerland", "matchNum": 48, "home": "canada", "away": "switzerland", "market": "Team A Win", "myOdds": 2.67, "bookieOdds": 3, "stake": 50, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -50}, {"match": "#11 Canada vs Switzerland", "matchNum": 48, "home": "canada", "away": "switzerland", "market": "Over 2.5 Goals", "myOdds": 1.65, "bookieOdds": 2.2, "stake": 333.33333333333326, "homeGoals": 1, "awayGoals": 2, "result": "W", "pnl": 399.99999999999994}, {"match": "#11 Canada vs Switzerland", "matchNum": 48, "home": "canada", "away": "switzerland", "market": "Over 1.5 Goals", "myOdds": 1.21, "bookieOdds": 1.38, "stake": 526.3157894736844, "homeGoals": 1, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#11 Canada vs Switzerland", "matchNum": 48, "home": "canada", "away": "switzerland", "market": "Over 3.5 Goals", "myOdds": 2.61, "bookieOdds": 3.9, "stake": 137.93103448275863, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -137.93103448275863}, {"match": "#11 Canada vs Switzerland", "matchNum": 48, "home": "canada", "away": "switzerland", "market": "BTTS Yes", "myOdds": 1.58, "bookieOdds": 1.91, "stake": 219.7802197802198, "homeGoals": 1, "awayGoals": 2, "result": "W", "pnl": 200}, {"match": "#6 South Africa vs Korea Republic", "matchNum": 49, "home": "south africa", "away": "Korea Republic", "market": "Team B Win", "myOdds": 1.48, "bookieOdds": 1.66, "stake": 303.03030303030306, "homeGoals": 1, "awayGoals": 0, "result": "L", "pnl": -303.03030303030306}, {"match": "#5 Mexico vs Czechia", "matchNum": 50, "home": "mexico", "away": "czechia", "market": "Over 2.5 Goals", "myOdds": 1.78, "bookieOdds": 2.05, "stake": 190.4761904761905, "homeGoals": 3, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#5 Mexico vs Czechia", "matchNum": 50, "home": "mexico", "away": "czechia", "market": "Over 3.5 Goals", "myOdds": 2.81, "bookieOdds": 3.5, "stake": 80, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -80}, {"match": "#5 Mexico vs Czechia", "matchNum": 50, "home": "mexico", "away": "czechia", "market": "BTTS Yes", "myOdds": 1.72, "bookieOdds": 1.95, "stake": 105.26315789473685, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -105.26315789473685}, {"match": "#17 Brazil vs Scotland", "matchNum": 51, "home": "brazil", "away": "scotland", "market": "Draw", "myOdds": 4.45, "bookieOdds": 5.5, "stake": 22.22222222222222, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -22.22222222222222}, {"match": "#17 Brazil vs Scotland", "matchNum": 51, "home": "brazil", "away": "scotland", "market": "Team B Win", "myOdds": 6.62, "bookieOdds": 10, "stake": 11.11111111111111, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -11.11111111111111}, {"match": "#17 Brazil vs Scotland", "matchNum": 51, "home": "brazil", "away": "scotland", "market": "BTTS Yes", "myOdds": 1.94, "bookieOdds": 2.25, "stake": 160, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -160}, {"match": "#17 Brazil vs Scotland", "matchNum": 51, "home": "brazil", "away": "scotland", "market": "Double Chance X2", "myOdds": 2.6, "bookieOdds": 3.5, "stake": 80, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -80}, {"match": "#17 Brazil vs Scotland", "matchNum": 51, "home": "brazil", "away": "scotland", "market": "Draw No Bet B", "myOdds": 5.14, "bookieOdds": 8, "stake": 28.571428571428573, "homeGoals": 3, "awayGoals": 0, "result": "L", "pnl": -28.571428571428573}, {"match": "#18 Morocco vs Haiti", "matchNum": 52, "home": "morocco", "away": "haiti", "market": "BTTS No", "myOdds": 1.59, "bookieOdds": 1.75, "stake": 133.33333333333334, "homeGoals": 4, "awayGoals": 2, "result": "L", "pnl": -133.33333333333334}, {"match": "#18 Morocco vs Haiti", "matchNum": 52, "home": "morocco", "away": "haiti", "market": "Over 2.5 Goals", "myOdds": 2, "bookieOdds": 2.3, "stake": 76.92307692307693, "homeGoals": 4, "awayGoals": 2, "result": "L", "pnl": -76.92307692307693}, {"match": "#30 Cura\u00e7ao vs C\u00f4te D'Ivoire", "matchNum": 53, "home": "curacao", "away": "C\u00f4te D'Ivoire", "market": "Draw", "myOdds": 4.86, "bookieOdds": 8, "stake": 28.571428571428573, "homeGoals": 0, "awayGoals": 2, "result": "L", "pnl": -28.571428571428573}, {"match": "#30 Cura\u00e7ao vs C\u00f4te D'Ivoire", "matchNum": 53, "home": "curacao", "away": "C\u00f4te D'Ivoire", "market": "Under 2.5 Goals", "myOdds": 1.96, "bookieOdds": 3.3, "stake": 173.91304347826087, "homeGoals": 0, "awayGoals": 2, "result": "W", "pnl": 400}, {"match": "#30 Cura\u00e7ao vs C\u00f4te D'Ivoire", "matchNum": 53, "home": "curacao", "away": "C\u00f4te D'Ivoire", "market": "Double Chance 1X", "myOdds": 3.34, "bookieOdds": 5, "stake": 50, "homeGoals": 0, "awayGoals": 2, "result": "L", "pnl": -50}, {"match": "#29 Germany vs Ecuador", "matchNum": 54, "home": "germany", "away": "ecuador", "market": "Under 2.5 Goals", "myOdds": 1.47, "bookieOdds": 2.15, "stake": 347.82608695652175, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -347.82608695652175}, {"match": "#29 Germany vs Ecuador", "matchNum": 54, "home": "germany", "away": "ecuador", "market": "BTTS No", "myOdds": 1.43, "bookieOdds": 2.1, "stake": 363.6363636363636, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -363.6363636363636}, {"match": "#29 Germany vs Ecuador", "matchNum": 54, "home": "germany", "away": "ecuador", "market": "Draw No Bet A", "myOdds": 1.17, "bookieOdds": 1.36, "stake": 1111.1111111111109, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -1111.1111111111109}, {"match": "#35 Netherlands vs Tunisia", "matchNum": 55, "home": "netherlands", "away": "tunisia", "market": "Draw", "myOdds": 5.5, "bookieOdds": 11, "stake": 20, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -20}, {"match": "#35 Netherlands vs Tunisia", "matchNum": 55, "home": "netherlands", "away": "tunisia", "market": "Under 2.5 Goals", "myOdds": 2.01, "bookieOdds": 3.02, "stake": 198.01980198019803, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -198.01980198019803}, {"match": "#35 Netherlands vs Tunisia", "matchNum": 55, "home": "netherlands", "away": "tunisia", "market": "Double Chance X2", "myOdds": 5.08, "bookieOdds": 7.5, "stake": 15.384615384615385, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -15.384615384615385}, {"match": "#36 Japan vs Sweden", "matchNum": 56, "home": "japan", "away": "sweden", "market": "Team B Win", "myOdds": 3.36, "bookieOdds": 4, "stake": 33.333333333333336, "homeGoals": 1, "awayGoals": 1, "result": "L", "pnl": -33.333333333333336}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Team A Win", "myOdds": 2.45, "bookieOdds": 2.75, "stake": 57.142857142857146, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -57.142857142857146}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Team B Win", "myOdds": 3.25, "bookieOdds": 4.4, "stake": 58.8235294117647, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -58.8235294117647}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Over 2.5 Goals", "myOdds": 2.13, "bookieOdds": 3.3, "stake": 173.91304347826087, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -173.91304347826087}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Over 1.5 Goals", "myOdds": 1.36, "bookieOdds": 1.62, "stake": 645.1612903225805, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -645.1612903225805}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Over 3.5 Goals", "myOdds": 3.93, "bookieOdds": 6, "stake": 40, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -40}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "BTTS Yes", "myOdds": 1.9, "bookieOdds": 2.25, "stake": 160, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -160}, {"match": "#24 Paraguay vs Australia", "matchNum": 57, "home": "paraguay", "away": "Australia", "market": "Double Chance 12", "myOdds": 1.4, "bookieOdds": 1.7, "stake": 571.4285714285714, "homeGoals": 0, "awayGoals": 0, "result": "L", "pnl": -571.4285714285714}, {"match": "#23 USA vs T\u00fcrkiye", "matchNum": 58, "home": "usa", "away": "turkiye", "market": "Under 2.5 Goals", "myOdds": 2.05, "bookieOdds": 2.38, "stake": 72.46376811594203, "homeGoals": 2, "awayGoals": 3, "result": "L", "pnl": -72.46376811594203}, {"match": "#53 France vs Norway", "matchNum": 59, "home": "france", "away": "norway", "market": "BTTS Yes", "myOdds": 1.56, "bookieOdds": 1.75, "stake": 266.6666666666667, "homeGoals": 4, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#54 Senegal vs Iraq", "matchNum": 60, "home": "senegal", "away": "iraq", "market": "BTTS Yes", "myOdds": 1.76, "bookieOdds": 2.1, "stake": 181.8181818181818, "homeGoals": 5, "awayGoals": 0, "result": "L", "pnl": -181.8181818181818}, {"match": "#54 Senegal vs Iraq", "matchNum": 60, "home": "senegal", "away": "iraq", "market": "Double Chance X2", "myOdds": 3.32, "bookieOdds": 4.33, "stake": 60.06006006006006, "homeGoals": 5, "awayGoals": 0, "result": "L", "pnl": -60.06006006006006}, {"match": "#54 Senegal vs Iraq", "matchNum": 60, "home": "senegal", "away": "iraq", "market": "Draw No Bet B", "myOdds": 6.82, "bookieOdds": 10, "stake": 11.11111111111111, "homeGoals": 5, "awayGoals": 0, "result": "L", "pnl": -11.11111111111111}, {"match": "#48 Cabo Verde vs Saudi Arabia", "matchNum": 61, "home": "cabo verde", "away": "saudi arabia", "market": "Draw No Bet B", "myOdds": 1.71, "bookieOdds": 1.85, "stake": 117.6470588235294, "homeGoals": 0, "awayGoals": 0, "result": "P", "pnl": 0}, {"match": "#47 Spain vs Uruguay", "matchNum": 62, "home": "spain", "away": "uruguay", "market": "Team A Win", "myOdds": 1.31, "bookieOdds": 1.68, "stake": 588.2352941176471, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 400}, {"match": "#47 Spain vs Uruguay", "matchNum": 62, "home": "spain", "away": "uruguay", "market": "BTTS No", "myOdds": 1.47, "bookieOdds": 1.8, "stake": 500, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 400}, {"match": "#47 Spain vs Uruguay", "matchNum": 62, "home": "spain", "away": "uruguay", "market": "Draw No Bet A", "myOdds": 1.08, "bookieOdds": 1.22, "stake": 909.0909090909092, "homeGoals": 1, "awayGoals": 0, "result": "W", "pnl": 200}, {"match": "#41 Belgium vs New Zealand", "matchNum": 63, "home": "belgium", "away": "New Zealand", "market": "Draw", "myOdds": 5.7, "bookieOdds": 8.5, "stake": 13.333333333333334, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -13.333333333333334}, {"match": "#41 Belgium vs New Zealand", "matchNum": 63, "home": "belgium", "away": "New Zealand", "market": "Under 2.5 Goals", "myOdds": 2.31, "bookieOdds": 3.6, "stake": 153.84615384615384, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -153.84615384615384}, {"match": "#41 Belgium vs New Zealand", "matchNum": 63, "home": "belgium", "away": "New Zealand", "market": "BTTS No", "myOdds": 1.76, "bookieOdds": 2, "stake": 100, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -100}, {"match": "#41 Belgium vs New Zealand", "matchNum": 63, "home": "belgium", "away": "New Zealand", "market": "Double Chance X2", "myOdds": 3.92, "bookieOdds": 5, "stake": 25, "homeGoals": 3, "awayGoals": 1, "result": "L", "pnl": -25}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Team A Win", "myOdds": 2, "bookieOdds": 2.7, "stake": 235.2941176470588, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -235.2941176470588}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Over 2.5 Goals", "myOdds": 1.31, "bookieOdds": 3.08, "stake": 192.3076923076923, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -192.3076923076923}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Over 1.5 Goals", "myOdds": 1.09, "bookieOdds": 1.66, "stake": 606.0606060606061, "homeGoals": 1, "awayGoals": 2, "result": "W", "pnl": 400}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Over 3.5 Goals", "myOdds": 1.77, "bookieOdds": 6, "stake": 80, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -80}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "BTTS Yes", "myOdds": 1.35, "bookieOdds": 2.26, "stake": 317.4603174603175, "homeGoals": 1, "awayGoals": 2, "result": "W", "pnl": 400}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Draw No Bet A", "myOdds": 1.57, "bookieOdds": 1.69, "stake": 144.92753623188406, "homeGoals": 1, "awayGoals": 2, "result": "P", "pnl": 0}, {"match": "#42 Egypt vs IR Iran", "matchNum": 64, "home": "egypt", "away": "iran", "market": "Double Chance 12", "myOdds": 1.27, "bookieOdds": 1.45, "stake": 444.4444444444445, "homeGoals": 1, "awayGoals": 2, "result": "L", "pnl": -444.4444444444445}, {"match": "#72 Croatia vs Ghana", "matchNum": 65, "home": "croatia", "away": "ghana", "market": "Over 2.5 Goals", "myOdds": 1.83, "bookieOdds": 2.38, "stake": 289.8550724637681, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#72 Croatia vs Ghana", "matchNum": 65, "home": "croatia", "away": "ghana", "market": "Over 1.5 Goals", "myOdds": 1.27, "bookieOdds": 1.44, "stake": 454.5454545454546, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#72 Croatia vs Ghana", "matchNum": 65, "home": "croatia", "away": "ghana", "market": "Over 3.5 Goals", "myOdds": 3.09, "bookieOdds": 4.4, "stake": 58.8235294117647, "homeGoals": 2, "awayGoals": 1, "result": "L", "pnl": -58.8235294117647}, {"match": "#72 Croatia vs Ghana", "matchNum": 65, "home": "croatia", "away": "ghana", "market": "BTTS Yes", "myOdds": 1.88, "bookieOdds": 2.1, "stake": 90.9090909090909, "homeGoals": 2, "awayGoals": 1, "result": "W", "pnl": 100}, {"match": "#65 Portugal vs Colombia", "matchNum": 66, "home": "portugal", "away": "Colombia", "market": "Under 2.5 Goals", "myOdds": 1.93, "bookieOdds": 2.1, "stake": 90.9090909090909, "homeGoals": 0, "awayGoals": 0, "result": "W", "pnl": 100}, {"match": "#66 Congo DR vs Uzbekistan", "matchNum": 67, "home": "congo DR", "away": "uzbekistan", "market": "Over 2.5 Goals", "myOdds": 1.65, "bookieOdds": 2.15, "stake": 347.82608695652175, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#66 Congo DR vs Uzbekistan", "matchNum": 67, "home": "congo DR", "away": "uzbekistan", "market": "Over 1.5 Goals", "myOdds": 1.21, "bookieOdds": 1.38, "stake": 526.3157894736844, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 200}, {"match": "#66 Congo DR vs Uzbekistan", "matchNum": 67, "home": "congo DR", "away": "uzbekistan", "market": "Over 3.5 Goals", "myOdds": 2.61, "bookieOdds": 3.9, "stake": 137.93103448275863, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#66 Congo DR vs Uzbekistan", "matchNum": 67, "home": "congo DR", "away": "uzbekistan", "market": "BTTS Yes", "myOdds": 1.69, "bookieOdds": 2.1, "stake": 363.6363636363636, "homeGoals": 3, "awayGoals": 1, "result": "W", "pnl": 400}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Team B Win", "myOdds": 2.25, "bookieOdds": 3.6, "stake": 153.84615384615384, "homeGoals": 3, "awayGoals": 3, "result": "L", "pnl": -153.84615384615384}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Over 2.5 Goals", "myOdds": 2.08, "bookieOdds": 3.45, "stake": 163.26530612244898, "homeGoals": 3, "awayGoals": 3, "result": "W", "pnl": 400}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Over 1.5 Goals", "myOdds": 1.34, "bookieOdds": 1.68, "stake": 588.2352941176471, "homeGoals": 3, "awayGoals": 3, "result": "W", "pnl": 400}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Over 3.5 Goals", "myOdds": 3.74, "bookieOdds": 6, "stake": 40, "homeGoals": 3, "awayGoals": 3, "result": "W", "pnl": 200}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "BTTS Yes", "myOdds": 1.87, "bookieOdds": 2.1, "stake": 90.9090909090909, "homeGoals": 3, "awayGoals": 3, "result": "W", "pnl": 100}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Double Chance 12", "myOdds": 1.38, "bookieOdds": 1.7, "stake": 571.4285714285714, "homeGoals": 3, "awayGoals": 3, "result": "L", "pnl": -571.4285714285714}, {"match": "#60 Algeria vs Austria", "matchNum": 68, "home": "algeria", "away": "austria", "market": "Draw No Bet B", "myOdds": 1.63, "bookieOdds": 1.9, "stake": 222.22222222222226, "homeGoals": 3, "awayGoals": 3, "result": "P", "pnl": 0}, {"match": "south africa vs Canada", "matchNum": 69, "home": "south africa", "away": "canada", "market": "Over 2.5 Goals", "myOdds": 2.02, "bookieOdds": 2.3, "stake": 76.92307692307693, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -76.92307692307693}, {"match": "south africa vs Canada", "matchNum": 69, "home": "south africa", "away": "canada", "market": "Over 3.5 Goals", "myOdds": 3.62, "bookieOdds": 4.3, "stake": 30.303030303030305, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -30.303030303030305}, {"match": "south africa vs Canada", "matchNum": 69, "home": "south africa", "away": "canada", "market": "BTTS Yes", "myOdds": 1.99, "bookieOdds": 2.2, "stake": 83.33333333333331, "homeGoals": 0, "awayGoals": 1, "result": "L", "pnl": -83.33333333333331}, {"match": "germany vs Paraguay", "matchNum": 70, "home": "germany", "away": "paraguay", "market": "BTTS No", "myOdds": 1.57, "bookieOdds": 1.7, "stake": 142.85714285714286, "homeGoals": null, "awayGoals": null, "result": "Pending", "pnl": null}, {"match": "germany vs Paraguay", "matchNum": 70, "home": "germany", "away": "paraguay", "market": "Under 2.5 Goals", "myOdds": 1.88, "bookieOdds": 2.05, "stake": 95.23809523809526, "homeGoals": null, "awayGoals": null, "result": "Pending", "pnl": null}];
const MARKETS = ["Team A Win", "Draw", "Team B Win", "Over 1.5 Goals", "Over 2.5 Goals", "Over 3.5 Goals", "Under 2.5 Goals", "BTTS Yes", "BTTS No", "Double Chance 1X", "Double Chance 12", "Double Chance X2", "Draw No Bet A", "Draw No Bet B"];
const TEAMS = ["Algeria", "Argentina", "Australia", "Austria", "Belgium", "Bosnia And Herzegovina", "Brazil", "Cabo Verde", "Canada", "Colombia", "Congo DR", "Croatia", "Curaçao", "Czechia", "Côte D'Ivoire", "Ecuador", "Egypt", "England", "France", "Germany", "Ghana", "Haiti", "IR Iran", "Iraq", "Japan", "Jordan", "Korea Republic", "Mexico", "Morocco", "Netherlands", "New Zealand", "Norway", "Panama", "Paraguay", "Portugal", "Qatar", "Saudi Arabia", "Scotland", "Senegal", "South Africa", "Spain", "Sweden", "Switzerland", "Tunisia", "Türkiye", "USA", "Uruguay", "Uzbekistan"];

const SEED_FORMATIONS = {"Algeria (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Argentina (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Australia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Austria (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 35, "y": 60}, {"slot": "CDM", "pos": "CDM", "x": 65, "y": 60}, {"slot": "CAM", "pos": "CAM", "x": 22, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "CAM", "pos": "CAM", "x": 78, "y": 35}], "Belgium (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Bosnia And Herzegovina (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Brazil (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Cabo Verde (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}], "Canada (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Colombia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Congo DR (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Côte D'Ivoire (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Croatia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 22, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 78, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Curaçao (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Czechia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Ecuador (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Egypt (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "England (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "France (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Germany (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Ghana (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Haiti (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "IR Iran (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Iraq (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Japan (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}], "Jordan (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Korea Republic (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Mexico (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Morocco (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Netherlands (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "New Zealand (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 35, "y": 60}, {"slot": "CDM", "pos": "CDM", "x": 65, "y": 60}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Norway (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}], "Panama (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RWB", "pos": "RWB", "x": 88, "y": 70}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LWB", "pos": "LWB", "x": 12, "y": 70}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Paraguay (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Portugal (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}], "Qatar (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Saudi Arabia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Scotland (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Senegal (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "South Africa (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Spain (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CDM", "pos": "CDM", "x": 50, "y": 60}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Sweden (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}], "Switzerland (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 35, "y": 35}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "CAM", "pos": "CAM", "x": 65, "y": 35}], "Tunisia (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "LWB", "pos": "LWB", "x": 12, "y": 70}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "RWB", "pos": "RWB", "x": 88, "y": 70}, {"slot": "CM", "pos": "CM", "x": 22, "y": 52}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "CM", "pos": "CM", "x": 78, "y": 52}, {"slot": "ST", "pos": "ST", "x": 35, "y": 13}, {"slot": "ST", "pos": "ST", "x": 65, "y": 13}], "Türkiye (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CDM", "pos": "CDM", "x": 35, "y": 60}, {"slot": "CDM", "pos": "CDM", "x": 65, "y": 60}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}], "Uruguay (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "USA (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "CB", "pos": "CB", "x": 35, "y": 78}, {"slot": "CB", "pos": "CB", "x": 65, "y": 78}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 35, "y": 52}, {"slot": "CM", "pos": "CM", "x": 65, "y": 52}, {"slot": "CAM", "pos": "CAM", "x": 50, "y": 35}, {"slot": "RW", "pos": "RW", "x": 85, "y": 20}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}, {"slot": "LW", "pos": "LW", "x": 15, "y": 20}], "Uzbekistan (current)": [{"slot": "GK", "pos": "GK", "x": 50, "y": 92}, {"slot": "CB", "pos": "CB", "x": 22, "y": 78}, {"slot": "CB", "pos": "CB", "x": 50, "y": 78}, {"slot": "CB", "pos": "CB", "x": 78, "y": 78}, {"slot": "RB", "pos": "RB", "x": 85, "y": 75}, {"slot": "LB", "pos": "LB", "x": 15, "y": 75}, {"slot": "CM", "pos": "CM", "x": 50, "y": 52}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "LM", "pos": "LM", "x": 18, "y": 45}, {"slot": "RM", "pos": "RM", "x": 82, "y": 45}, {"slot": "ST", "pos": "ST", "x": 50, "y": 13}]};
const SEED_LINEUPS = {"Algeria": {"formation": "Algeria (current)", "assignments": {"0": "Luca Zidane", "1": "Rak Belghali", "2": "Ramy Bensebaini", "3": "Jaouen Hadjam", "4": "Rayan Ait-Nouri", "5": "Nabil Bentaleb", "6": "Hicham Boudaoui", "7": "Ibrahim Maza", "8": "Riyad Mahrez", "9": "Amine Gouiri", "10": "Mohamed Amoura"}}, "Argentina": {"formation": "Argentina (current)", "assignments": {"0": "Emiliano Martinez", "1": "Nahuel Molina", "2": "Nicolas Otamendi", "3": "Cristian Romero", "4": "Facundo Medina", "5": "Alexis Mac Allister", "6": "Enzo Fernandez", "7": "Rodrigo De Paul", "8": "Lionel Messi", "9": "Lautaro Martinez", "10": "Thiago Almada"}}, "Australia": {"formation": "Australia (current)", "assignments": {"0": "Patrick Beach", "1": "Aziz Behich", "2": "Harry Souttar", "3": "Alessandro Circati", "4": "Jordan Bos", "5": "Lucas Herrington", "6": "Aiden Oneill", "7": "Jackson Irvine", "8": "Connor Metcalfe", "9": "Cristian Volpato", "10": "Nestory Irankunda"}}, "Austria": {"formation": "Austria (current)", "assignments": {"0": "Alexander Schlager", "1": "Stefan Posch", "2": "David Alaba", "3": "Philipp Lienhart", "4": "Phillip Mwene", "5": "Xaver Schlager", "6": "Nicolas Seiwald", "7": "Konrad Laimer", "8": "Romano Schmid", "9": "Marko Arnautovic", "10": "Marcel Sabitzer"}}, "Belgium": {"formation": "Belgium (current)", "assignments": {"0": "Thibaut Courtois", "1": "Timothy Castagne", "2": "Arthur Theate", "3": "Brandon Mechele", "4": "Maxim De Cuyper", "5": "Youri Tielemans", "6": "Hans Vanaken", "7": "Kevin De Bruyne", "8": "Leandro Trossard", "9": "Charles De Ketelaere", "10": "Jeremy Doku"}}, "Bosnia And Herzegovina": {"formation": "Bosnia And Herzegovina (current)", "assignments": {"0": "Nikola Vasilj", "1": "Amar Dedic", "2": "Nikola Katic", "3": "Stjepan Radeljic", "4": "Sead Kolasinac", "5": "Ivan Basic", "6": "Ivan Sunjic", "7": "Esmir Bajraktarevic", "8": "Kerim Alajbegovic", "9": "Edin Dzeko", "10": "Ermedin Demirovic"}}, "Brazil": {"formation": "Brazil (current)", "assignments": {"0": "Alisson", "1": "Danilo", "2": "Marcos Marquinhos", "3": "Gabriel Magalhaes", "4": "Alex Sandro", "5": "Carlos Casemiro", "6": "Bruno Guimaraes", "7": "Lucas Paqueta", "8": "Neymar Jr", "9": "Matheus Cunha", "10": "Vinicius Junior"}}, "Cabo Verde": {"formation": "Cabo Verde (current)", "assignments": {"0": "Josimar Vozinha", "1": "Wagner Pina", "2": "Roberto Pico Lopes", "3": "Edilson Diney Borges", "4": "Joao Paulo", "5": "Kevin Pina", "6": "Jamiro Monteiro", "7": "Deroy Duarte", "8": "Ryan Mendes", "9": "Dailon Livramento", "10": "Garry Rodrigues"}}, "Canada": {"formation": "Canada (current)", "assignments": {"0": "Maxime Crepeau", "1": "Alistair Johnston", "2": "Derek Cornelius", "3": "Luc De Fougerolles", "4": "Richie Laryea", "5": "Nathan Saliba", "6": "Mathieu Choiniere", "7": "Tajon Buchanan", "8": "Ali Ahmed", "9": "Jonathan David", "10": "Cyle Larin"}}, "Colombia": {"formation": "Colombia (current)", "assignments": {"0": "Camilo Vargas", "1": "Santiago Arias", "2": "Davinson Sanchez", "3": "Jhon Lucumi", "4": "Deiver Machado", "5": "Jefferson Lerma", "6": "Gustavo Puerta", "7": "Jhon Arias", "8": "James Rodriguez", "9": "Jhon Cordoba", "10": "Luis Diaz"}}, "Congo DR": {"formation": "Congo DR (current)", "assignments": {"0": "Lionel Mpasi", "1": "Aaron Wan-Bissaka", "2": "Chancel Mbemba", "3": "Axel Tuanzebe", "4": "Arthur Masuaku", "5": "Noah Sadiki", "6": "Theo Bongonda", "7": "Ngalayel Mukau", "8": "Brian Cipenga", "9": "Yoane Wissa", "10": "Cedric Bakambu"}}, "Côte D'Ivoire": {"formation": "Côte D'Ivoire (current)", "assignments": {"0": "Yahia Fofana", "1": "Guela Doue", "2": "Ousmane Diomande", "3": "Odilon Kossounou", "4": "Christopher Operi", "5": "Franck Kessie", "6": "Ibrahim Sangare", "7": "Yan Diomande", "8": "Amad Diallo", "9": "Ange-Yoan Bonny", "10": "Nicolas Pepe"}}, "Croatia": {"formation": "Croatia (current)", "assignments": {"0": "Dominik Livakovic", "1": "Josip Stanisic", "2": "Marin Pongracic", "3": "Josip Sutalo", "4": "Ivan Perisic", "5": "Luka Modric", "6": "Mateo Kovacic", "7": "Petar Sucic", "8": "Martin Baturina", "9": "Nikola Vlasic", "10": "Ante Budimir"}}, "Curaçao": {"formation": "Curaçao (current)", "assignments": {"0": "Eloy Room", "1": "Sherel Floranus", "2": "Riechedly Bazoer", "3": "Armando Obispo", "4": "Deveron Fonville", "5": "Livano Comenencia", "6": "Leandro Bacuna", "7": "Juninho Bacuna", "8": "Tahith Chong", "9": "Sontje Hansen", "10": "Juergen Locadia"}}, "Czechia": {"formation": "Czechia (current)", "assignments": {"0": "Matej Kovar", "1": "Tomas Holes", "2": "Ladislav Krejci", "3": "Robin Hranac", "4": "Michal Sadilek", "5": "Lukas Cerv", "6": "David Doudera", "7": "Vladimir Coufal", "8": "Denis Visinsky", "9": "Pavel Sulc", "10": "Adam Hlozek"}}, "Ecuador": {"formation": "Ecuador (current)", "assignments": {"0": "Hernan Galindez", "1": "Piero Hincapie", "2": "Willian Pacho", "3": "Joel Ordonez", "4": "Nilson Angulo", "5": "Moises Caicedo", "6": "Pedro Vite", "7": "Alan Franco", "8": "John Yeboah", "9": "Anthony Valencia", "10": "Gonzalo Plata"}}, "Egypt": {"formation": "Egypt (current)", "assignments": {"0": "Mostafa Shoubir", "1": "Mohamed Hany", "2": "Ramy Rabia", "3": "Mohamed Abdelmoneim", "4": "Ahmed Fatouh", "5": "Mahmoud Saber", "6": "Mohanad Lashin", "7": "Emam Ashour", "8": "Mostafa Zico", "9": "Mohamed Salah", "10": "Mahmoud Trezeguet"}}, "England": {"formation": "England (current)", "assignments": {"0": "Jordan Pickford", "1": "Jarell Quansah", "2": "Ezri Konsa", "3": "Marc Guehi", "4": "Nico Oreilly", "5": "Elliot Anderson", "6": "Jude Bellingham", "7": "Morgan Rogers", "8": "Bukayo Saka", "9": "Marcus Rashford", "10": "Harry Kane"}}, "France": {"formation": "France (current)", "assignments": {"0": "Mike Maignan", "1": "Jules Kounde", "2": "William Saliba", "3": "Dayot Upamecano", "4": "Theo Hernandez", "5": "Aurelien Tchouameni", "6": "Manu Kone", "7": "Ousmane Dembele", "8": "Michael Olise", "9": "Kylian Mbappe", "10": "Desire Doue"}}, "Germany": {"formation": "Germany (current)", "assignments": {"0": "Manuel Neuer", "1": "Joshua Kimmich", "2": "Jonathan Tah", "3": "Antonio Ruediger", "4": "David Raum", "5": "Aleksandar Pavlovic", "6": "Felix Nmecha", "7": "Jamal Musiala", "8": "Leroy Sane", "9": "Kai Havertz", "10": "Florian Wirtz"}}, "Ghana": {"formation": "Ghana (current)", "assignments": {"0": "Benjamin Asare", "1": "Marvin Senaya", "2": "Derrick Luckassen", "3": "Jonas Adjetey", "4": "Gideon Mensah", "5": "Thomas Partey", "6": "Elisha Owusu", "7": "Kwasi Sibo", "8": "Antoine Semenyo", "9": "Kamaldeen Sulemana", "10": "Jordan Ayew"}}, "Haiti": {"formation": "Haiti (current)", "assignments": {"0": "Johny Placide", "1": "Carlens Arcus", "2": "Ricardo Ade", "3": "Hannes Delcroix", "4": "Martin Experience", "5": "Danley Jean Jacques", "6": "Jean-Ricner Bellegarde", "7": "Ruben Providence", "8": "Josue Casimir", "9": "Frantzdy Pierrot", "10": "Wilson Isidor"}}, "IR Iran": {"formation": "IR Iran (current)", "assignments": {"0": "Alireza Beiranvand", "1": "Ramin Rezaeian", "2": "Hossein Kanani", "3": "Shoja Khalilzadeh", "4": "Ali Nemati", "5": "Ehsan Hajisafi", "6": "Saeid Ezatolahi", "7": "Mohammad Ghorbani", "8": "Mohammad Mohebbi", "9": "Mehdi Taremi", "10": "Mehdi Taremi"}}, "Iraq": {"formation": "Iraq (current)", "assignments": {"0": "Ahmed Basil", "1": "Frans Putros", "2": "Rebin Ghareeb", "3": "Akam Hashim", "4": "Merchas Doski", "5": "Amir Alammari", "6": "Zidane Iqbal", "7": "Ibrahim Bayesh", "8": "Ahmed Qasim", "9": "Ali Alhamadi", "10": "Ali Jasim"}}, "Japan": {"formation": "Japan (current)", "assignments": {"0": "Zion Suzuki", "1": "Kou Itakura", "2": "Hiroki Ito", "3": "Ayumu Seko", "4": "Keito Nakamura", "5": "Daichi Kamada", "6": "Ao Tanaka", "7": "Yukinari Sugawara", "8": "Ritsu Doan", "9": "Ayase Ueda", "10": "Daizen Maeda"}}, "Jordan": {"formation": "Jordan (current)", "assignments": {"0": "Yazeed Abulaila", "1": "Ehsan Haddad", "2": "Abdallah Nasib", "3": "Yazan Alarab", "4": "Mohammad Abualnadi", "5": "Mohannad Abutaha", "6": "Odeh Fakhoury", "7": "Noor Alrawabdeh", "8": "Nizar Alrashdan", "9": "Mousa Altamari", "10": "Ali Olwan"}}, "Korea Republic": {"formation": "Korea Republic (current)", "assignments": {"0": "Seunggyu Kim", "1": "Hanbeom Lee", "2": "Gihyuk Lee", "3": "Minjae Kim", "4": "Youngwoo Seol", "5": "Seungho Paik", "6": "Inbeom Hwang", "7": "Jaesung Lee", "8": "Kangin Lee", "9": "Jaesung Lee", "10": "Heungmin Son"}}, "Mexico": {"formation": "Mexico (current)", "assignments": {"0": "Raul Rangel", "1": "Jorge Sanchez", "2": "Israel Reyes", "3": "Cesar Montes", "4": "Mateo Chavez", "5": "Edson Alvarez", "6": "Gilberto Mora", "7": "Luis Romo", "8": "Roberto Alvarado", "9": "Julian Quinones", "10": "Guillermo Martinez"}}, "Morocco": {"formation": "Morocco (current)", "assignments": {"0": "Yassine Bounou", "1": "Achraf Hakimi", "2": "Chadi Riad", "3": "Redouane Halhal", "4": "Anass Salah Eddine", "5": "Neil El Aynaoui", "6": "Sofyan Amrabat", "7": "Ismael Saibari", "8": "Brahim Diaz", "9": "Ayoub El Kaabi", "10": "Bilal El Khannouss"}}, "Netherlands": {"formation": "Netherlands (current)", "assignments": {"0": "Bart Verbruggen", "1": "Denzel Dumfries", "2": "Virgil Van Dijk", "3": "Jan-Paul Van Hecke", "4": "Nathan Ake", "5": "Frenkie De Jong", "6": "Tijjani Reijnders", "7": "Ryan Gravenberch", "8": "Donyell Malen", "9": "Brian Brobbey", "10": "Cody Gakpo"}}, "New Zealand": {"formation": "New Zealand (current)", "assignments": {"0": "Max Crocombe", "1": "Tim Payne", "2": "Michael Boxall", "3": "Finn Surman", "4": "Liberato Cacace", "5": "Marko Stamenic", "6": "Joe Bell", "7": "Sarpreet Singh", "8": "McCOWATT ", "9": "Elijah Just", "10": "Chris Wood"}}, "Norway": {"formation": "Norway (current)", "assignments": {"0": "Orjan Nyland", "1": "Julian Ryerson", "2": "Torbjorn Heggem", "3": "Kristoffer Ajer", "4": "David Moller Wolfe", "5": "Martin Odegaard", "6": "Fredrik Aursnes", "7": "Patrick Berg", "8": "Antonio Nusa", "9": "Erling Haaland", "10": "Alexander Sorloth"}}, "Panama": {"formation": "Panama (current)", "assignments": {"0": "Orlando Mosquera", "1": "Amir Murillo", "2": "Andres Andrade", "3": "Jiovany Ramos", "4": "Jose Cordoba", "5": "Cesar Blackman", "6": "Cristian Martinez", "7": "Carlos Harvey", "8": "Edgar Barcenas", "9": "Jose Rodriguez", "10": "Jose Fajardo"}}, "Paraguay": {"formation": "Paraguay (current)", "assignments": {"0": "Orlando Gill", "1": "Juan Caceres", "2": "Gustavo Gomez", "3": "Gustavo Velazquez", "4": "Omar Alderete", "5": "Diego Gomez", "6": "Andres Cubas", "7": "Alexandro Maidana", "8": "Matias Galarza", "9": "Gabriel Avalos", "10": "Julio Enciso"}}, "Portugal": {"formation": "Portugal (current)", "assignments": {"0": "Diogo Costa", "1": "Joao Cancelo", "2": "Ruben Dias", "3": "Renato Veiga", "4": "Nuno Mendes", "5": "Vitor Vitinha", "6": "Joao Neves", "7": "Bruno Fernandes", "8": "Joao Felix", "9": "Cristiano Ronaldo", "10": "Pedro Neto"}}, "Qatar": {"formation": "Qatar (current)", "assignments": {"0": "Meshaal Barsham", "1": "Pedro Miguel", "2": "Boualem Khoukhi", "3": "Lucas Mendes", "4": "Ahmed Alaaeldin", "5": "Edmilson Junior", "6": "Abdelaziz Abdulaziz Hatem", "7": "Karim Boudiaf", "8": "Akram Afif", "9": "Almoez Ali", "10": "Hasan Hassan Alhaydos"}}, "Saudi Arabia": {"formation": "Saudi Arabia (current)", "assignments": {"0": "Mohammed Alowais", "1": "Saud Abdulhamid", "2": "Abdulelah Alamri", "3": "Hassan Altambakti", "4": "Moteb Alharbi", "5": "Mohamed Kanno", "6": "Nasser Aldawsari", "7": "Abdullah Alkhaibari", "8": "Salem Aldawsari", "9": "Sultan Mandash", "10": "Feras Albrikan"}}, "Scotland": {"formation": "Scotland (current)", "assignments": {"0": "Angus Gunn", "1": "Nathan Patterson", "2": "McKENNA ", "3": "Jack Hendry", "4": "Andy Robertson", "5": "Lewis Ferguson", "6": "McLEAN ", "7": "McTOMINAY ", "8": "Ben Gannon-Doak", "9": "Lawrence Shankland", "10": "McGINN "}}, "Senegal": {"formation": "Senegal (current)", "assignments": {"0": "Edouard Mendy", "1": "Krepin Diatta", "2": "Kalidou Koulibaly", "3": "Moussa Niakhate", "4": "Ismail Jakobs", "5": "Habib Diarra", "6": "Idrissa Gueye", "7": "Lamine Camara", "8": "Ibrahim Mbaye", "9": "Mamadou Sarr", "10": "Sadio Mane"}}, "South Africa": {"formation": "South Africa (current)", "assignments": {"0": "Ronwen Williams", "1": "Nkosinathi Sibisi", "2": "Sphephelo Sithole", "3": "Ime Okon", "4": "Khuliso Mudau", "5": "Teboho Mokoena", "6": "Thalente Mbatha", "7": "Aubrey Modiba", "8": "Themba Zwane", "9": "Evidence Makgopa", "10": "Lyle Foster"}}, "Spain": {"formation": "Spain (current)", "assignments": {"0": "Unai Simon", "1": "Marcos Llorente", "2": "Aymeric Laporte", "3": "Pau Cubarsi", "4": "Marc Cucurella", "5": "Pedro Pedri", "6": "Mikel Merino", "7": "Rodrigo Rodri", "8": "Lamine Yamal", "9": "Mikel Oyarzabal", "10": "Alex Baena"}}, "Sweden": {"formation": "Sweden (current)", "assignments": {"0": "Jacob Widell Zetterstrom", "1": "Isak Hien", "2": "Gustaf Lagerbielke", "3": "Gabriel Gudmundsson", "4": "Elliot Stroud", "5": "Victor Lindelof", "6": "Yasin Ayari", "7": "Alexander Bernhardsson", "8": "Alexander Isak", "9": "Anthony Elanga", "10": "Viktor Gyokeres"}}, "Switzerland": {"formation": "Switzerland (current)", "assignments": {"0": "Gregor Kobel", "1": "Luca Jaquez", "2": "Nico Elvedi", "3": "Manuel Akanji", "4": "Ricardo Rodriguez", "5": "Granit Xhaka", "6": "Remo Freuler", "7": "Djibril Sow", "8": "Ruben Vargas", "9": "Breel Embolo", "10": "Johan Manzambi"}}, "Tunisia": {"formation": "Tunisia (current)", "assignments": {"0": "Mouhib Chamakh", "1": "Ali Abdi", "2": "Mohamed Ben Hmida", "3": "Montassar Talbi", "4": "Omar Rekik", "5": "Yan Valery", "6": "Rani Khedira", "7": "Ellyes Skhiri", "8": "Hannibal Mejbri", "9": "Elias Saad", "10": "Anis Slimane"}}, "Türkiye": {"formation": "Türkiye (current)", "assignments": {"0": "Ugurcan Cakir", "1": "Zeki Celik", "2": "Ozan Kabak", "3": "Abdulkerim Bardakci", "4": "Eren Elmali", "5": "Orkun Kokcu", "6": "Salih Ozcan", "7": "Kenan Yildiz", "8": "Oguz Aydin", "9": "Baris Yilmaz", "10": "Arda Guler"}}, "Uruguay": {"formation": "Uruguay (current)", "assignments": {"0": "Fernando Muslera", "1": "Guillermo Varela", "2": "Mathias Olivera", "3": "Sebastian Caceres", "4": "Juan Sanabria", "5": "Manuel Ugarte", "6": "Rodrigo Bentancur", "7": "Federico Valverde", "8": "Rodrigo Aguirre", "9": "Darwin Nunez", "10": "Maxi Araujo"}}, "USA": {"formation": "USA (current)", "assignments": {"0": "Matt Freese", "1": "Alex Freeman", "2": "Chris Richards", "3": "Tim Ream", "4": "Antonee Robinson", "5": "Tyler Adams", "6": "Malik Tillman", "7": "McKENNIE ", "8": "Sergino Dest", "9": "Folarin Balogun", "10": "Christian Pulisic"}}, "Uzbekistan": {"formation": "Uzbekistan (current)", "assignments": {"0": "Abduvohid Nematov", "1": "Abdukodir Khusanov", "2": "Jakhongir Urozov", "3": "Rustam Ashurmatov", "4": "Khojiakbar Alijonov", "5": "Sherzod Nasrullaev", "6": "Otabek Shukurov", "7": "Akmal Mozgovoy", "8": "Abbosbek Fayzullaev", "9": "Dostonbek Khamdamov", "10": "Eldor Shomurodov"}}};

const TEAM_FLAGS = {
  "Algeria": "🇩🇿", "Argentina": "🇦🇷", "Australia": "🇦🇺", "Austria": "🇦🇹",
  "Belgium": "🇧🇪", "Bosnia And Herzegovina": "🇧🇦", "Brazil": "🇧🇷", "Cabo Verde": "🇨🇻",
  "Canada": "🇨🇦", "Colombia": "🇨🇴", "Congo DR": "🇨🇩", "Croatia": "🇭🇷",
  "Curaçao": "🇨🇼", "Czechia": "🇨🇿", "Côte D'Ivoire": "🇨🇮", "Ecuador": "🇪🇨",
  "Egypt": "🇪🇬", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "France": "🇫🇷", "Germany": "🇩🇪",
  "Ghana": "🇬🇭", "Haiti": "🇭🇹", "IR Iran": "🇮🇷", "Iraq": "🇮🇶",
  "Japan": "🇯🇵", "Jordan": "🇯🇴", "Korea Republic": "🇰🇷", "Mexico": "🇲🇽",
  "Morocco": "🇲🇦", "Netherlands": "🇳🇱", "New Zealand": "🇳🇿", "Norway": "🇳🇴",
  "Panama": "🇵🇦", "Paraguay": "🇵🇾", "Portugal": "🇵🇹", "Qatar": "🇶🇦",
  "Saudi Arabia": "🇸🇦", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Senegal": "🇸🇳", "South Africa": "🇿🇦",
  "Spain": "🇪🇸", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Tunisia": "🇹🇳",
  "Türkiye": "🇹🇷", "USA": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿",
};

// Maps any casing/spelling variant (lowercase, ALL CAPS, "usa", "iran",
// "curacao" without the cedilla, etc.) to the correct official display name.
const TEAM_DISPLAY_NAMES = {};
TEAMS.forEach(t => { TEAM_DISPLAY_NAMES[t.toLowerCase()] = t; });
// Spelling variants seen in older logged data that aren't simple casing fixes.
Object.assign(TEAM_DISPLAY_NAMES, {
  "usa": "USA", "us": "USA", "united states": "USA",
  "iran": "IR Iran", "ir iran": "IR Iran",
  "curacao": "Curaçao", "curaçao": "Curaçao",
  "cote d'ivoire": "Côte D'Ivoire", "côte d'ivoire": "Côte D'Ivoire", "ivory coast": "Côte D'Ivoire",
  "korea republic": "Korea Republic", "south korea": "Korea Republic",
  "congo dr": "Congo DR", "dr congo": "Congo DR",
  "turkiye": "Türkiye", "türkiye": "Türkiye", "turkey": "Türkiye",
  "czechia": "Czechia", "czech republic": "Czechia",
});

function displayTeam(name) {
  if (!name) return name;
  return TEAM_DISPLAY_NAMES[name.trim().toLowerCase()] || name;
}
// ── Tier rules: edge band -> target win profit ──────────────────────────
function getTier(edgePct) {
  if (edgePct >= 11) return { label: "11%+", target: 400, color: "#00E676" };
  if (edgePct >= 7) return { label: "7–10.9%", target: 200, color: "#ffb800" };
  if (edgePct >= 4) return { label: "4–6.9%", target: 100, color: "#035CA5" };
  return null;
}

// Edge colour/background for display purposes, including sub-4% and negative edges
// (getTier returns null below 4%, but we still want a colour to show on bets).
function edgeStyle(edgePct) {
  if (edgePct === null || edgePct === undefined) {
    return { color: "var(--text-muted)", bg: "rgba(92,122,147,0.12)", border: "rgba(92,122,147,0.25)" };
  }
  const tier = getTier(edgePct);
  if (tier) {
    // tier.color is always a hex value for 4%+ bands
    return { color: tier.color, bg: `${tier.color}1F`, border: `${tier.color}55` };
  }
  if (edgePct > 0) {
    return { color: "var(--text-muted)", bg: "rgba(92,122,147,0.12)", border: "rgba(92,122,147,0.25)" };
  }
  return { color: "var(--loss)", bg: "rgba(224,57,46,0.12)", border: "rgba(224,57,46,0.3)" };
}

// ── Theme palettes ────────────────────────────────────────────────────────
// Both themes expose the same CSS-variable names, so components need no changes;
// only the values at the root swap. Dark mode matches the dark fintech look.
const THEMES = {
  light: {
    "--bg": "#F4F7FA", "--bg-panel": "#FFFFFF", "--bg-panel-2": "#EAF1F7",
    "--border": "#D7E3EC", "--border-strong": "#B8CCDC",
    "--text": "#0A375C", "--text-dim": "#3A6385", "--text-muted": "#5C7A93",
    "--profit": "#1AA260", "--loss": "#E0392E", "--accent-blue": "#035CA5", "--accent-yellow": "#F9D801",
    "--header-bg": "#035CA5", "--header-text": "#FFFFFF", "--nav-bg": "#FFFFFF",
    "--mono": "'JetBrains Mono', 'SF Mono', monospace", "--ui": "'Inter', -apple-system, sans-serif",
  },
  dark: {
    "--bg": "#0B1016", "--bg-panel": "#151C26", "--bg-panel-2": "#1E2732",
    "--border": "#26313D", "--border-strong": "#37444F",
    "--text": "#E6EDF3", "--text-dim": "#A9B9C6", "--text-muted": "#7C8B99",
    "--profit": "#00E676", "--loss": "#FF5A52", "--accent-blue": "#3D9CE0", "--accent-yellow": "#F9D801",
    "--header-bg": "#0E1620", "--header-text": "#E6EDF3", "--nav-bg": "#0E1620",
    "--mono": "'JetBrains Mono', 'SF Mono', monospace", "--ui": "'Inter', -apple-system, sans-serif",
  },
};

function calcStake(myOdds, bookieOdds) {
  if (!myOdds || !bookieOdds || myOdds <= 0 || bookieOdds <= 0) return null;
  const myProb = 1 / myOdds;
  const bookieProb = 1 / bookieOdds;
  const edge = myProb - bookieProb;
  const edgePct = edge * 100;
  const tier = getTier(edgePct);
  if (!tier || bookieOdds <= 1) return { edgePct, myProb, bookieProb, tier: null, stake: null };
  const stake = tier.target / (bookieOdds - 1);
  return { edgePct, myProb, bookieProb, tier, stake };
}

function fmtMoney(n, opts = {}) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  return `${sign}$${abs.toLocaleString("en-AU", { maximumFractionDigits: opts.dp ?? 0, minimumFractionDigits: opts.dp ?? 0 })}`;
}

function fmtPct(n, dp = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return `${n.toFixed(dp)}%`;
}

// ── CSV export ────────────────────────────────────────────────────────────
function csvEscape(val) {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function exportBetsToCSV(bets) {
  const headers = [
    "Home", "Away", "Market", "Match #", "My Odds", "Bookie Odds",
    "My Edge %", "Stake (A$)", "Home Goals", "Away Goals",
    "Result", "P&L (A$)", "Expected P&L (A$)", "Notes"
  ];
  const rows = bets.map(b => [
    displayTeam(b.home), displayTeam(b.away), b.market, b.matchNum,
    b.myOdds, b.bookieOdds,
    b.edgePct !== null && b.edgePct !== undefined ? b.edgePct.toFixed(2) : "",
    b.stake !== null && b.stake !== undefined ? b.stake.toFixed(2) : "",
    b.homeGoals, b.awayGoals, b.result,
    b.pnl !== null && b.pnl !== undefined ? b.pnl.toFixed(2) : "",
    expectedPnl(b).toFixed(2),
    b.notes || ""
  ]);
  const csv = [headers, ...rows].map(row => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `fifa26-bets-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Sparkline / cumulative chart ─────────────────────────────────────────
function expectedPnl(bet) {
  if (bet.myOdds === null || bet.myOdds === undefined || !bet.bookieOdds) return 0;
  const myProb = 1 / bet.myOdds;
  const winAmt = bet.stake * (bet.bookieOdds - 1);
  return myProb * winAmt - (1 - myProb) * bet.stake;
}

function niceStep(range) {
  if (range <= 0) return 100;
  const rough = range / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / mag;
  let step;
  if (norm < 1.5) step = 1;
  else if (norm < 3) step = 2;
  else if (norm < 7) step = 5;
  else step = 10;
  return step * mag;
}

function fmtAxis(n) {
  const abs = Math.abs(n);
  if (abs >= 1000) return `${n < 0 ? "-" : ""}$${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k`;
  return `${n < 0 ? "-" : ""}$${abs.toFixed(0)}`;
}

// Per-bet P&L variance for a Bernoulli outcome using our own probability.
// Win pays stake*(odds-1); loss loses stake. With p = 1/myOdds the variance
// of that single bet's P&L is p*(1-p)*(win - loss)^2 = p*(1-p)*(stake*odds)^2.
function betVariance(bet) {
  if (bet.myOdds === null || bet.myOdds === undefined || !bet.bookieOdds || !bet.stake) return 0;
  const p = 1 / bet.myOdds;
  const swing = bet.stake * bet.bookieOdds; // win outcome minus loss outcome
  return p * (1 - p) * swing * swing;
}

function CumulativeChart({ bets, animateKey, stakingCurve, flatFinal, tieredFinal }) {
  const [showFlat, setShowFlat] = useState(false);
  const { actualPts, expectedPts, sdPts } = useMemo(() => {
    // Ordered by when they were logged (insertion order), same as Bet Log.
    let runningActual = 0;
    let runningExpected = 0;
    let runningVar = 0;
    const aPts = [{ x: 0, y: 0 }];
    const ePts = [{ x: 0, y: 0 }];
    const sPts = [{ x: 0, sd: 0 }];
    bets.forEach((b, i) => {
      const isSettled = b.result && b.result !== "Pending";
      if (isSettled) runningActual += b.pnl || 0;
      runningExpected += expectedPnl(b);
      runningVar += betVariance(b);
      aPts.push({ x: i + 1, y: runningActual });
      ePts.push({ x: i + 1, y: runningExpected });
      sPts.push({ x: i + 1, sd: Math.sqrt(runningVar) });
    });
    return { actualPts: aPts, expectedPts: ePts, sdPts: sPts };
  }, [bets]);

  // Animation: draw the actual line + sweep the pulsing dot across on mount /
  // whenever animateKey changes (i.e. each time the dashboard is opened).
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    setProgress(0);
    let raf;
    const DURATION = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeInOutCubic for a smooth accelerate/decelerate feel
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animateKey]);

  if (actualPts.length < 2) {
    return (
      <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 13 }}>
        Log a bet to see your curve
      </div>
    );
  }

  const w = 700, h = 190;
  const padTop = 10, padBottom = 22, padLeft = 54;

  // Upper/lower ±1 SD band points around the expected curve.
  const upperPts = expectedPts.map((p, i) => ({ x: p.x, y: p.y + sdPts[i].sd }));
  const lowerPts = expectedPts.map((p, i) => ({ x: p.x, y: p.y - sdPts[i].sd }));

  const allYs = [
    ...actualPts.map(p => p.y), ...expectedPts.map(p => p.y),
    ...upperPts.map(p => p.y), ...lowerPts.map(p => p.y), 0
  ];
  const rawMin = Math.min(...allYs);
  const rawMax = Math.max(...allYs);
  const step = niceStep(rawMax - rawMin);
  const minY = Math.floor(rawMin / step) * step;
  const maxY = Math.ceil(rawMax / step) * step;
  const range = (maxY - minY) || 1;

  const plotW = w - padLeft - 10;
  const plotH = h - padTop - padBottom;
  const xScale = (x) => padLeft + (x / (actualPts.length - 1)) * plotW;
  const yScale = (y) => padTop + plotH - ((y - minY) / range) * plotH;
  const zeroY = yScale(0);

  const gridLines = [];
  for (let v = minY; v <= maxY + 1e-6; v += step) gridLines.push(v);

  const buildPath = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`).join(" ");
  const actualPath = buildPath(actualPts);
  const expectedPath = buildPath(expectedPts);

  // Filled variance band between upper and lower (upper forward, lower back).
  const bandPath =
    buildPath(upperPts) + " " +
    lowerPts.slice().reverse().map(p => `L ${xScale(p.x).toFixed(1)} ${yScale(p.y).toFixed(1)}`).join(" ") + " Z";

  const lastActual = actualPts[actualPts.length - 1];
  const lastExpected = expectedPts[expectedPts.length - 1];
  const isProfit = lastActual.y >= 0;
  const lineColor = isProfit ? "var(--profit)" : "var(--loss)";
  const areaPath = `${actualPath} L ${xScale(lastActual.x).toFixed(1)} ${zeroY.toFixed(1)} L ${xScale(0).toFixed(1)} ${zeroY.toFixed(1)} Z`;

  // Total length of the actual polyline (in px) so we can animate a stroke draw.
  let totalLen = 0;
  for (let i = 1; i < actualPts.length; i++) {
    const dx = xScale(actualPts[i].x) - xScale(actualPts[i - 1].x);
    const dy = yScale(actualPts[i].y) - yScale(actualPts[i - 1].y);
    totalLen += Math.hypot(dx, dy);
  }

  // Interpolated position of the moving pulse dot along the actual line.
  const dotAt = (frac) => {
    const target = frac * totalLen;
    let acc = 0;
    for (let i = 1; i < actualPts.length; i++) {
      const x0 = xScale(actualPts[i - 1].x), y0 = yScale(actualPts[i - 1].y);
      const x1 = xScale(actualPts[i].x), y1 = yScale(actualPts[i].y);
      const segLen = Math.hypot(x1 - x0, y1 - y0);
      if (acc + segLen >= target) {
        const r = segLen === 0 ? 0 : (target - acc) / segLen;
        return { x: x0 + (x1 - x0) * r, y: y0 + (y1 - y0) * r };
      }
      acc += segLen;
    }
    return { x: xScale(lastActual.x), y: yScale(lastActual.y) };
  };
  const dot = dotAt(progress);
  const dashOffset = totalLen * (1 - progress);

  // Flat-stake counterfactual overlay. stakingCurve is indexed over settled
  // bets; map its x across the full plot width and reuse the P&L yScale, clamped
  // to the visible band so an out-of-range flat curve still reads sensibly.
  let flatPath = null;
  if (showFlat && stakingCurve && stakingCurve.length > 1) {
    const n = stakingCurve.length - 1;
    const fx = (i) => padLeft + (i / n) * plotW;
    const clampY = (y) => Math.max(padTop, Math.min(padTop + plotH, yScale(y)));
    flatPath = stakingCurve.map((p, i) => `${i === 0 ? "M" : "L"} ${fx(i).toFixed(1)} ${clampY(p.flat).toFixed(1)}`).join(" ");
  }

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 180, display: "block" }} preserveAspectRatio="none">
        <defs>
          <radialGradient id="pulseGrad">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.55" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        {gridLines.map((v, i) => (
          <g key={i}>
            <line x1={padLeft} y1={yScale(v)} x2={w - 10} y2={yScale(v)}
              stroke={v === 0 ? "var(--border-strong)" : "var(--border)"}
              strokeWidth="1" strokeDasharray={v === 0 ? "none" : "3 3"} />
            <text x={padLeft - 8} y={yScale(v)} textAnchor="end" dominantBaseline="middle"
              fontSize="10.5" fontFamily="var(--mono)" fill="var(--text-muted)">
              {fmtAxis(v)}
            </text>
          </g>
        ))}
        {/* ±1 SD variance band around expected P&L */}
        <path d={bandPath} fill="var(--accent-blue)" opacity="0.08" />
        <path d={areaPath} fill={lineColor} opacity="0.1" />
        <path d={expectedPath} fill="none" stroke="var(--accent-blue)" strokeWidth="1.75"
          strokeDasharray="5 4" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
        {/* Actual line, revealed left-to-right via stroke-dashoffset */}
        <path d={actualPath} fill="none" stroke={lineColor}
          strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round"
          strokeDasharray={totalLen} strokeDashoffset={dashOffset} />
        <circle cx={xScale(lastExpected.x)} cy={yScale(lastExpected.y)} r="3" fill="var(--accent-blue)" opacity={progress > 0.98 ? 1 : 0} />
        {/* Flat-stake counterfactual overlay */}
        {flatPath && (
          <path d={flatPath} fill="none" stroke="var(--accent-yellow)" strokeWidth="1.75"
            strokeDasharray="2 3" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
        )}
        {/* Pulsing leading dot that travels along the line */}
        <circle cx={dot.x} cy={dot.y} r="11" fill="url(#pulseGrad)">
          <animate attributeName="r" values="8;14;8" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={dot.x} cy={dot.y} r="4" fill={lineColor} stroke="#fff" strokeWidth="1.25" />
      </svg>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 6, fontSize: 11, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)" }}>
          <span style={{ width: 14, height: 2, background: lineColor, display: "inline-block" }} />
          Actual P&L
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)" }}>
          <span style={{ width: 14, height: 0, borderTop: "1.75px dashed var(--accent-blue)", display: "inline-block" }} />
          Expected P&L
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)" }}>
          <span style={{ width: 14, height: 9, background: "var(--accent-blue)", opacity: 0.18, display: "inline-block", borderRadius: 2 }} />
          ±1 SD
        </span>
        {showFlat && (
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-muted)" }}>
            <span style={{ width: 14, height: 0, borderTop: "1.75px dotted var(--accent-yellow)", display: "inline-block" }} />
            Flat stake
          </span>
        )}
      </div>
      {stakingCurve && stakingCurve.length > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 8 }}>
          <button onClick={() => setShowFlat(v => !v)} style={{
            ...btnStyle({ small: true }),
            background: showFlat ? "var(--accent-yellow)" : "var(--bg-panel-2)",
            color: showFlat ? "#3A2E00" : "var(--text-muted)",
            border: showFlat ? "none" : "1px solid var(--border)",
          }}>
            {showFlat ? "Hide" : "Compare"} flat staking
          </button>
          {showFlat && (
            <span style={{ fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--text-muted)" }}>
              tiered <b style={{ color: tieredFinal >= flatFinal ? "var(--profit)" : "var(--loss)" }}>{fmtMoney(tieredFinal, { dp: 0 })}</b>
              {" vs flat "}<b>{fmtMoney(flatFinal, { dp: 0 })}</b>
              {"  ("}{tieredFinal >= flatFinal ? "+" : ""}{fmtMoney(tieredFinal - flatFinal, { dp: 0 })}{")"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Edge meter (signature element) ───────────────────────────────────────
function EdgeMeter({ edgePct }) {
  const tiers = [
    { min: 4, max: 6.9, target: 100, color: "#035CA5" },
    { min: 7, max: 10.9, target: 200, color: "#ffb800" },
    { min: 11, max: 20, target: 400, color: "#00E676" },
  ];
  const clamped = edgePct === null ? 0 : Math.max(0, Math.min(edgePct, 20));
  const pct = (clamped / 20) * 100;
  const active = edgePct !== null ? getTier(edgePct) : null;

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ position: "relative", height: 10, borderRadius: 6, background: "var(--bg-panel-2)", overflow: "hidden" }}>
        {tiers.map((t, i) => (
          <div key={i} style={{
            position: "absolute", left: `${(t.min / 20) * 100}%`, width: `${((t.max - t.min) / 20) * 100}%`,
            top: 0, bottom: 0, background: t.color, opacity: 0.18
          }} />
        ))}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`,
          background: active ? active.color : "var(--text-muted)",
          transition: "width 0.25s ease, background 0.25s ease",
          borderRadius: 6
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
        <span>0%</span><span>4%</span><span>7%</span><span>11%</span><span>20%+</span>
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Edge</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 20, fontWeight: 600, color: active ? active.color : "var(--text-dim)" }}>
          {edgePct === null ? "—" : fmtPct(edgePct, 2)}
        </span>
        {active && (
          <span style={{ marginLeft: "auto", fontSize: 12.5, color: active.color, fontFamily: "var(--mono)", fontWeight: 600 }}>
            target +{fmtMoney(active.target)}
          </span>
        )}
        {!active && edgePct !== null && (
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-muted)" }}>below 4% — no stake tier</span>
        )}
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────
function SkeletonBox({ h = 16, w = "100%", r = 6, mb = 0 }) {
  return <div style={{ height: h, width: w, borderRadius: r, marginBottom: mb, background: "var(--bg-panel-2)", animation: "skPulse 1.4s ease-in-out infinite" }} />;
}

function SkeletonDashboard() {
  return (
    <div>
      <SkeletonBox h={12} w="40%" mb={10} />
      <SkeletonBox h={38} w="55%" mb={16} />
      <SkeletonBox h={180} r={10} mb={16} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        <SkeletonBox h={64} r={10} /><SkeletonBox h={64} r={10} />
        <SkeletonBox h={64} r={10} /><SkeletonBox h={64} r={10} />
      </div>
      <SkeletonBox h={12} w="35%" mb={10} />
      <SkeletonBox h={120} r={10} />
    </div>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      background: "var(--bg-panel-2)", border: "1px solid var(--border)", borderRadius: 8,
      color: "var(--text)", padding: "6px 26px 6px 10px", fontSize: 12, fontFamily: "var(--ui)",
      fontWeight: 600, cursor: "pointer", outline: "none", maxWidth: 150,
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M2 3l3 3 3-3' stroke='%237C8B99' stroke-width='1.4' fill='none'/></svg>\")",
      backgroundRepeat: "no-repeat", backgroundPosition: "right 9px center"
    }}>
      {options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
    </select>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10,
      padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4, minWidth: 0
    }}>
      <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ fontFamily: "var(--mono)", fontSize: 19, fontWeight: 600, color: accent || "var(--text)" }}>{value}</span>
      {sub && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{sub}</span>}
    </div>
  );
}

function ResultBadge({ result }) {
  const map = {
    W: { bg: "rgba(26,162,96,0.12)", color: "var(--profit)", label: "W" },
    L: { bg: "rgba(224,57,46,0.12)", color: "var(--loss)", label: "L" },
    P: { bg: "rgba(92,122,147,0.14)", color: "var(--text-muted)", label: "P" },
    Pending: { bg: "rgba(249,216,1,0.22)", color: "#8A6D00", label: "PEND" },
  };
  const s = map[result] || map.Pending;
  return (
    <span style={{
      background: s.bg, color: s.color, fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700,
      padding: "2px 7px", borderRadius: 5, letterSpacing: "0.03em"
    }}>
      {s.label}
    </span>
  );
}

// ── Bet row (log list) ───────────────────────────────────────────────────
function betTitle(bet) {
  if (bet.market === "Team A Win") return { text: `${displayTeam(bet.home)} To Win`, flag: TEAM_FLAGS[displayTeam(bet.home)] };
  if (bet.market === "Team B Win") return { text: `${displayTeam(bet.away)} To Win`, flag: TEAM_FLAGS[displayTeam(bet.away)] };
  return { text: bet.market, flag: null };
}

function BetRow({ bet, onUpdateResult, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [hg, setHg] = useState(bet.homeGoals ?? "");
  const [ag, setAg] = useState(bet.awayGoals ?? "");
  const [dragX, setDragX] = useState(0);
  const touch = React.useRef({ x: 0, active: false });

  const save = () => {
    onUpdateResult(bet.id, hg === "" ? null : Number(hg), ag === "" ? null : Number(ag));
    setEditing(false);
  };

  const handleDelete = () => onDelete(bet.id);

  // Swipe: left reveals delete, right (on pending) opens result entry.
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, active: true }; };
  const onTouchMove = (e) => {
    if (!touch.current.active) return;
    const dx = e.touches[0].clientX - touch.current.x;
    setDragX(Math.max(-90, Math.min(90, dx)));
  };
  const onTouchEnd = () => {
    touch.current.active = false;
    if (dragX <= -70) { handleDelete(); }
    else if (dragX >= 70 && bet.result === "Pending") { setEditing(true); }
    setDragX(0);
  };

  const title = betTitle(bet);
  const isSettled = bet.result && bet.result !== "Pending";
  const potentialWin = bet.stake && bet.bookieOdds ? bet.stake * (bet.bookieOdds - 1) : null;

  return (
    <div style={{ position: "relative", marginBottom: 8 }}>
      {/* Swipe action hints behind the card */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", overflow: "hidden" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-blue)", opacity: dragX > 20 && bet.result === "Pending" ? 1 : 0, transition: "opacity 0.1s" }}>
          Enter result →
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--loss)", opacity: dragX < -20 ? 1 : 0, transition: "opacity 0.1s", marginLeft: "auto" }}>
          Delete
        </span>
      </div>
      <div
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        style={{
          background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10,
          padding: "12px 14px", position: "relative",
          transform: `translateX(${dragX}px)`, transition: touch.current.active ? "none" : "transform 0.2s ease"
        }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {title.flag && <span style={{ fontSize: 14 }}>{title.flag}</span>}
            <span>{title.text}</span>
            <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>@ {bet.bookieOdds?.toFixed(2)}</span>
          </div>
          {bet.edgePct !== null && bet.edgePct !== undefined && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4,
              padding: "1px 7px", borderRadius: 20, fontFamily: "var(--mono)",
              fontSize: 11, fontWeight: 700, color: edgeStyle(bet.edgePct).color,
              background: edgeStyle(bet.edgePct).bg, border: `1px solid ${edgeStyle(bet.edgePct).border}`
            }}>
              Edge {bet.edgePct > 0 ? "+" : ""}{bet.edgePct.toFixed(1)}%
            </div>
          )}
          <div style={{ fontSize: 12, color: "var(--accent-blue)", marginTop: 2 }}>
            {displayTeam(bet.home)} <span>vs</span> {displayTeam(bet.away)}
          </div>
        </div>
        <ResultBadge result={bet.result} />
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 10, fontFamily: "var(--mono)", fontSize: 12.5, alignItems: "center" }}>
        <div><span style={{ color: "var(--text-muted)" }}>Stake </span>{fmtMoney(bet.stake, { dp: 0 })}</div>
        {!isSettled ? (
          <div><span style={{ color: "var(--text-muted)" }}>Potential win </span><span style={{ color: "var(--profit)", fontWeight: 700 }}>{fmtMoney(potentialWin, { dp: 0 })}</span></div>
        ) : (
          <div style={{ marginLeft: "auto", fontWeight: 700, color: bet.pnl > 0 ? "var(--profit)" : bet.pnl < 0 ? "var(--loss)" : "var(--text-muted)" }}>
            {bet.pnl === null || bet.pnl === undefined ? "—" : fmtMoney(bet.pnl, { dp: 0 })}
          </div>
        )}
      </div>

      {bet.notes && (
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 8, fontStyle: "italic" }}>{bet.notes}</div>
      )}

      {editing ? (
        <div style={{ display: "flex", gap: 6, marginTop: 10, alignItems: "center" }}>
          <input value={hg} onChange={e => setHg(e.target.value)} placeholder="HG" type="number"
            style={inputStyle({ width: 50, padding: "5px 6px", fontSize: 12.5 })} />
          <span style={{ color: "var(--text-muted)" }}>–</span>
          <input value={ag} onChange={e => setAg(e.target.value)} placeholder="AG" type="number"
            style={inputStyle({ width: 50, padding: "5px 6px", fontSize: 12.5 })} />
          <button onClick={save} style={btnStyle({ small: true, primary: true })}>Save</button>
          <button onClick={() => setEditing(false)} style={btnStyle({ small: true })}>Cancel</button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <button onClick={() => setEditing(true)} style={{
            background: "none", border: "none", color: "var(--accent-blue)",
            fontSize: 11.5, cursor: "pointer", padding: 0, fontFamily: "var(--ui)"
          }}>
            {bet.result === "Pending" ? "Enter result →" : "Edit result"}
          </button>
          <button onClick={handleDelete} style={{
            background: "none", border: "none", color: "var(--loss)",
            fontSize: 11.5, cursor: "pointer", padding: 0, fontFamily: "var(--ui)", opacity: 0.75
          }}>
            Delete
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

function inputStyle(extra = {}) {
  return {
    background: "var(--bg-panel-2)", border: "1px solid var(--border)", borderRadius: 7,
    color: "var(--text)", padding: "9px 10px", fontSize: 14, fontFamily: "var(--mono)",
    outline: "none", width: "100%", boxSizing: "border-box", ...extra
  };
}

function btnStyle({ primary, small, full, danger } = {}) {
  return {
    background: primary ? "var(--accent-blue)" : danger ? "rgba(255,77,106,0.12)" : "var(--bg-panel-2)",
    color: primary ? "#FFFFFF" : danger ? "var(--loss)" : "var(--text)",
    border: primary ? "none" : "1px solid var(--border)",
    borderRadius: 8, cursor: "pointer", fontFamily: "var(--ui)", fontWeight: 600,
    padding: small ? "6px 10px" : "11px 14px", fontSize: small ? 12 : 14,
    width: full ? "100%" : undefined,
  };
}

// ── Dashboard ─────────────────────────────────────────────────────────────
// ── Model calibration: predicted win % vs actual, per probability bucket ──
function CalibrationChart({ calibration }) {
  if (!calibration || calibration.length === 0) {
    return (
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 12px", fontSize: 12.5, color: "var(--text-muted)", textAlign: "center" }}>
        Settle some bets to see how well-calibrated your model is.
      </div>
    );
  }
  const w = 700, h = 220;
  const pad = { top: 14, right: 14, bottom: 30, left: 34 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const sx = (v) => pad.left + (v / 100) * plotW;      // 0–100% predicted
  const sy = (v) => pad.top + plotH - (v / 100) * plotH; // 0–100% actual

  const ticks = [0, 25, 50, 75, 100];

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 210, display: "block" }} preserveAspectRatio="none">
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={sx(t)} y1={pad.top} x2={sx(t)} y2={pad.top + plotH} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={pad.left} y1={sy(t)} x2={pad.left + plotW} y2={sy(t)} stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
            <text x={sx(t)} y={h - 10} textAnchor="middle" fontSize="10.5" fontFamily="var(--mono)" fill="var(--text-muted)">{t}</text>
            <text x={pad.left - 6} y={sy(t)} textAnchor="end" dominantBaseline="middle" fontSize="10.5" fontFamily="var(--mono)" fill="var(--text-muted)">{t}</text>
          </g>
        ))}
        {/* Perfect-calibration diagonal */}
        <line x1={sx(0)} y1={sy(0)} x2={sx(100)} y2={sy(100)} stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="5 4" />
        {/* Data points: sized by sample count */}
        {calibration.map((c, i) => {
          const r = Math.max(4, Math.min(11, 3 + Math.sqrt(c.n)));
          const over = c.actual >= c.predicted;
          return (
            <g key={i}>
              <line x1={sx(c.predicted)} y1={sy(c.predicted)} x2={sx(c.predicted)} y2={sy(c.actual)}
                stroke={over ? "var(--profit)" : "var(--loss)"} strokeWidth="1.25" opacity="0.5" />
              <circle cx={sx(c.predicted)} cy={sy(c.actual)} r={r}
                fill={over ? "#00E676" : "var(--loss)"} fillOpacity="0.85" stroke="#fff" strokeWidth="1.25" />
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 10.5, color: "var(--text-muted)", textAlign: "center", marginTop: 2, fontFamily: "var(--mono)" }}>
        predicted win % (x) vs actual (y) · dashed = perfect · dot size = sample count
      </div>
      <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
        {calibration.map((c, i) => {
          const diff = c.actual - c.predicted;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontFamily: "var(--mono)" }}>
              <span style={{ width: 60, color: "var(--text-muted)" }}>{c.label}</span>
              <span style={{ width: 34, color: "var(--text-muted)" }}>n={c.n}</span>
              <span style={{ flex: 1, color: "var(--text)" }}>
                pred {c.predicted.toFixed(0)}% → act {c.actual.toFixed(0)}%
              </span>
              <span style={{ fontWeight: 700, color: diff >= 0 ? "var(--profit)" : "var(--loss)" }}>
                {diff >= 0 ? "+" : ""}{diff.toFixed(0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ bets, onSelectMarket, onRefresh }) {
  const [dateRange, setDateRange] = useState("all"); // all | 7d | 30d
  const [marketF, setMarketF] = useState("all");
  const [edgeTier, setEdgeTier] = useState("all"); // all | 11 | 7 | 4 | sub4

  // Extract a rough timestamp from the bet id (ids look like `bet-<ms>` or
  // `seed-<n>`); seeds have no real date so they're only excluded by 7d/30d.
  const betTime = (b) => {
    const m = /^bet-(\d+)$/.exec(String(b.id || ""));
    return m ? Number(m[1]) : null;
  };

  const filteredBets = useMemo(() => {
    const now = Date.now();
    const cutoff = dateRange === "7d" ? now - 7 * 864e5 : dateRange === "30d" ? now - 30 * 864e5 : null;
    return bets.filter(b => {
      if (marketF !== "all" && b.market !== marketF) return false;
      if (edgeTier !== "all") {
        const e = b.edgePct ?? -Infinity;
        if (edgeTier === "11" && e < 11) return false;
        if (edgeTier === "7" && (e < 7 || e >= 11)) return false;
        if (edgeTier === "4" && (e < 4 || e >= 7)) return false;
        if (edgeTier === "sub4" && e >= 4) return false;
      }
      if (cutoff !== null) {
        const t = betTime(b);
        if (t === null || t < cutoff) return false;
      }
      return true;
    });
  }, [bets, dateRange, marketF, edgeTier]);

  const filtersActive = dateRange !== "all" || marketF !== "all" || edgeTier !== "all";
  const allMarkets = useMemo(() => Array.from(new Set(bets.map(b => b.market))).sort(), [bets]);

  // Pull-to-refresh (simple, top-of-page vertical drag).
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const pull = React.useRef({ y: 0, active: false });
  const onTouchStart = (e) => {
    if (window.scrollY <= 0 && !refreshing) pull.current = { y: e.touches[0].clientY, active: true };
  };
  const onTouchMove = (e) => {
    if (!pull.current.active) return;
    const dy = e.touches[0].clientY - pull.current.y;
    if (dy > 0) setPullY(Math.min(80, dy * 0.5));
  };
  const onTouchEnd = async () => {
    if (!pull.current.active) return;
    pull.current.active = false;
    if (pullY > 50 && onRefresh) {
      setRefreshing(true);
      setPullY(40);
      try { await onRefresh(); } finally { setRefreshing(false); setPullY(0); }
    } else {
      setPullY(0);
    }
  };

  const openPositions = useMemo(() => {
    const pend = bets.filter(b => b.result === "Pending");
    const exposure = pend.reduce((s, b) => s + (b.stake || 0), 0);
    const bestCase = pend.reduce((s, b) => s + (b.stake && b.bookieOdds ? b.stake * (b.bookieOdds - 1) : 0), 0);
    const worstCase = -exposure;
    return { list: pend, exposure, bestCase, worstCase };
  }, [bets]);

  const stats = useMemo(() => {
    const source = filteredBets;
    const settled = source.filter(b => b.result && b.result !== "Pending");
    const wins = settled.filter(b => b.result === "W").length;
    const losses = settled.filter(b => b.result === "L").length;
    const pushes = settled.filter(b => b.result === "P").length;
    const pending = source.filter(b => b.result === "Pending");
    const totalPnl = settled.reduce((s, b) => s + (b.pnl || 0), 0);
    const totalStaked = settled.reduce((s, b) => s + (b.stake || 0), 0);
    const pendingStaked = pending.reduce((s, b) => s + (b.stake || 0), 0);
    const roi = totalStaked > 0 ? (totalPnl / totalStaked) * 100 : 0;
    const winRate = (wins + losses) > 0 ? (wins / (wins + losses)) * 100 : 0;
    const avgEdge = source.length ? source.reduce((s, b) => s + (b.edgePct || 0), 0) / source.length : 0;
    const winningOdds = settled.filter(b => b.result === "W").map(b => b.bookieOdds);
    const losingOdds = settled.filter(b => b.result === "L").map(b => b.bookieOdds);
    const avgWinOdds = winningOdds.length ? winningOdds.reduce((a, b) => a + b, 0) / winningOdds.length : 0;
    const avgLossOdds = losingOdds.length ? losingOdds.reduce((a, b) => a + b, 0) / losingOdds.length : 0;

    const byMarket = {};
    source.forEach(b => {
      if (!byMarket[b.market]) byMarket[b.market] = { bets: 0, wins: 0, pnl: 0, settled: 0 };
      byMarket[b.market].bets += 1;
      if (b.result === "W") byMarket[b.market].wins += 1;
      if (b.result && b.result !== "Pending") {
        byMarket[b.market].pnl += b.pnl || 0;
        byMarket[b.market].settled += 1;
      }
    });
    const marketRows = Object.entries(byMarket)
      .map(([market, v]) => ({ market, ...v, winRate: v.settled ? (v.wins / v.settled) * 100 : 0 }))
      .sort((a, b) => b.pnl - a.pnl);

    const byStakeDesc = [...source].sort((a, b) => (b.stake || 0) - (a.stake || 0));
    const topStaked = byStakeDesc.slice(0, 5);

    const topWinningByProfit = settled
      .filter(b => b.result === "W" && b.pnl > 0)
      .sort((a, b) => b.pnl - a.pnl)
      .slice(0, 5);

    const topLosingByStake = settled
      .filter(b => b.result === "L")
      .sort((a, b) => (b.stake || 0) - (a.stake || 0))
      .slice(0, 5);

    const highestOddsWins = settled
      .filter(b => b.result === "W")
      .sort((a, b) => (b.bookieOdds || 0) - (a.bookieOdds || 0))
      .slice(0, 5);

    // ── Calibration: bucket settled bets by our predicted win probability
    // (1/myOdds) and compare predicted vs actual hit rate. Pushes are treated
    // as half a win, matching how a fair settlement would score them.
    const calBuckets = [
      { lo: 0, hi: 0.4, label: "<40%" },
      { lo: 0.4, hi: 0.5, label: "40–50%" },
      { lo: 0.5, hi: 0.6, label: "50–60%" },
      { lo: 0.6, hi: 0.7, label: "60–70%" },
      { lo: 0.7, hi: 0.8, label: "70–80%" },
      { lo: 0.8, hi: 1.01, label: "80%+" },
    ].map(b => ({ ...b, n: 0, predSum: 0, winEq: 0 }));
    settled.forEach(b => {
      if (!b.myOdds) return;
      const p = 1 / b.myOdds;
      const bucket = calBuckets.find(k => p >= k.lo && p < k.hi);
      if (!bucket) return;
      bucket.n += 1;
      bucket.predSum += p;
      bucket.winEq += b.result === "W" ? 1 : b.result === "P" ? 0.5 : 0;
    });
    const calibration = calBuckets
      .filter(b => b.n > 0)
      .map(b => ({ label: b.label, n: b.n, predicted: (b.predSum / b.n) * 100, actual: (b.winEq / b.n) * 100 }));

    // Per-market calibration: for each market, mean predicted win % vs actual.
    const marketCalMap = {};
    settled.forEach(b => {
      if (!b.myOdds) return;
      if (!marketCalMap[b.market]) marketCalMap[b.market] = { n: 0, predSum: 0, winEq: 0 };
      marketCalMap[b.market].n += 1;
      marketCalMap[b.market].predSum += 1 / b.myOdds;
      marketCalMap[b.market].winEq += b.result === "W" ? 1 : b.result === "P" ? 0.5 : 0;
    });
    const marketCalibration = Object.entries(marketCalMap)
      .map(([market, v]) => ({ market, n: v.n, predicted: (v.predSum / v.n) * 100, actual: (v.winEq / v.n) * 100 }))
      .sort((a, b) => b.n - a.n);

    // Staking counterfactual: what a flat stake (avg of actual stakes) would have
    // returned on the same settled bets, cumulatively, vs the real tiered staking.
    const flatStake = totalStaked / (settled.length || 1);
    let cumTiered = 0, cumFlat = 0;
    const stakingCurve = [{ x: 0, tiered: 0, flat: 0 }];
    settled.forEach((b, i) => {
      cumTiered += b.pnl || 0;
      if (b.bookieOdds) {
        if (b.result === "W") cumFlat += flatStake * (b.bookieOdds - 1);
        else if (b.result === "L") cumFlat += -flatStake;
      }
      stakingCurve.push({ x: i + 1, tiered: cumTiered, flat: cumFlat });
    });
    const flatFinal = cumFlat;

    return {
      wins, losses, pushes, pendingCount: pending.length, totalPnl, totalStaked, pendingStaked,
      roi, winRate, avgEdge, avgWinOdds, avgLossOdds, marketRows, totalBets: source.length,
      topStaked, topWinningByProfit, topLosingByStake, highestOddsWins, calibration,
      marketCalibration, stakingCurve, flatStake, flatFinal,
    };
  }, [filteredBets]);

  const isProfit = stats.totalPnl >= 0;

  return (
    <div style={{ paddingBottom: 90 }}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(pullY > 0 || refreshing) && (
        <div style={{ height: pullY, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 12, overflow: "hidden", transition: pull.current.active ? "none" : "height 0.2s ease" }}>
          {refreshing ? "Refreshing…" : pullY > 50 ? "Release to refresh" : "Pull to refresh"}
        </div>
      )}
      <div style={{ padding: "18px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Net P&L · {stats.totalBets} bet{stats.totalBets === 1 ? "" : "s"}{filtersActive ? " (filtered)" : " logged"}
          </div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 38, fontWeight: 700, marginTop: 4,
            color: isProfit ? "var(--profit)" : "var(--loss)"
          }}>
            {fmtMoney(stats.totalPnl, { dp: 0 })}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 4, fontSize: 12.5, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
            <span>ROI <b style={{ color: isProfit ? "var(--profit)" : "var(--loss)" }}>{fmtPct(stats.roi, 1)}</b></span>
            <span>Win rate <b style={{ color: "var(--text)" }}>{fmtPct(stats.winRate, 1)}</b></span>
          </div>
        </div>
        <button onClick={() => exportBetsToCSV(filteredBets)} style={{
          ...btnStyle({ small: true }), display: "flex", alignItems: "center", gap: 5,
          flexShrink: 0, marginTop: 2
        }}>
          ⬇ Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ padding: "8px 16px 0", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <FilterSelect value={dateRange} onChange={setDateRange} options={[["all", "All time"], ["7d", "Last 7d"], ["30d", "Last 30d"]]} />
        <FilterSelect value={marketF} onChange={setMarketF} options={[["all", "All markets"], ...allMarkets.map(m => [m, m])]} />
        <FilterSelect value={edgeTier} onChange={setEdgeTier} options={[["all", "All edges"], ["11", "11%+"], ["7", "7–10.9%"], ["4", "4–6.9%"], ["sub4", "<4%"]]} />
        {filtersActive && (
          <button onClick={() => { setDateRange("all"); setMarketF("all"); setEdgeTier("all"); }} style={{
            background: "none", border: "none", color: "var(--accent-blue)", fontSize: 12, cursor: "pointer", padding: "4px 2px", fontWeight: 600
          }}>Clear</button>
        )}
      </div>

      <div style={{ padding: "10px 16px 0" }}>
        <CumulativeChart bets={filteredBets} animateKey={`${filteredBets.length}-${dateRange}-${marketF}-${edgeTier}`}
          stakingCurve={stats.stakingCurve} flatFinal={stats.flatFinal} tieredFinal={stats.totalPnl} />
      </div>

      {openPositions.list.length > 0 && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
            Open positions · {openPositions.list.length}
          </div>
          <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 13 }}>
              <div><span style={{ color: "var(--text-muted)" }}>Exposure </span><b>{fmtMoney(openPositions.exposure, { dp: 0 })}</b></div>
              <div><span style={{ color: "var(--text-muted)" }}>Best </span><b style={{ color: "var(--profit)" }}>+{fmtMoney(openPositions.bestCase, { dp: 0 })}</b></div>
              <div><span style={{ color: "var(--text-muted)" }}>Worst </span><b style={{ color: "var(--loss)" }}>{fmtMoney(openPositions.worstCase, { dp: 0 })}</b></div>
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {openPositions.list.slice(0, 6).map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text)" }}>
                    {displayTeam(b.home)} v {displayTeam(b.away)} · {b.market}
                  </span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--text-muted)" }}>{fmtMoney(b.stake, { dp: 0 })} @ {b.bookieOdds?.toFixed(2)}</span>
                </div>
              ))}
              {openPositions.list.length > 6 && (
                <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>+{openPositions.list.length - 6} more</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "12px 16px" }}>
        <StatCard label="Record" value={`${stats.wins}-${stats.losses}-${stats.pushes}`} sub={`${stats.pendingCount} pending`} />
        <StatCard label="Total staked" value={fmtMoney(stats.totalStaked, { dp: 0 })} sub={stats.pendingStaked > 0 ? `${fmtMoney(stats.pendingStaked, { dp: 0 })} pending` : null} />
        <StatCard label="Avg edge" value={fmtPct(stats.avgEdge, 2)} />
        <StatCard label="Avg odds (W / L)" value={`${stats.avgWinOdds.toFixed(2)} / ${stats.avgLossOdds.toFixed(2)}`} />
      </div>

      <div style={{ padding: "4px 16px" }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
          Market breakdown
        </div>
        <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          {stats.marketRows.map((m, i) => (
            <button key={m.market} onClick={() => onSelectMarket(m.market)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", width: "100%",
              background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--ui)",
              borderBottom: i < stats.marketRows.length - 1 ? "1px solid var(--border)" : "none"
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{m.market}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
                  {m.bets} bets · {fmtPct(m.winRate, 0)} WR
                </div>
              </div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 13.5, fontWeight: 700,
                color: m.pnl >= 0 ? "var(--profit)" : "var(--loss)"
              }}>
                {fmtMoney(m.pnl, { dp: 0 })}
              </div>
              <span style={{ color: "var(--text-muted)", fontSize: 14, marginLeft: 2 }}>›</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "4px 16px 0" }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
          Model calibration
        </div>
        <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 12px 14px" }}>
          <CalibrationChart calibration={stats.calibration} />
        </div>
      </div>

      {stats.marketCalibration.length > 0 && (
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
            Calibration by market
          </div>
          <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            {stats.marketCalibration.map((m, i) => {
              const diff = m.actual - m.predicted;
              return (
                <div key={m.market} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", fontSize: 12,
                  borderBottom: i < stats.marketCalibration.length - 1 ? "1px solid var(--border)" : "none"
                }}>
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text)", fontWeight: 600 }}>{m.market}</span>
                  <span style={{ width: 34, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>n={m.n}</span>
                  <span style={{ color: "var(--text-muted)", fontFamily: "var(--mono)" }}>{m.predicted.toFixed(0)}→{m.actual.toFixed(0)}%</span>
                  <span style={{ width: 34, textAlign: "right", fontWeight: 700, fontFamily: "var(--mono)", color: diff >= 0 ? "var(--profit)" : "var(--loss)" }}>
                    {diff >= 0 ? "+" : ""}{diff.toFixed(0)}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 6, fontFamily: "var(--mono)" }}>
            predicted → actual win % · green = model beat, red = underperformed
          </div>
        </div>
      )}

      <HighlightSection title="Top 5 biggest stakes" bets={stats.topStaked} valueKey="stake" />
      <HighlightSection title="Top 5 winning bets by profit" bets={stats.topWinningByProfit} valueKey="pnl" />
      <HighlightSection title="Top 5 losing bets by stake" bets={stats.topLosingByStake} valueKey="stake" />
      <HighlightSection title="Highest odds wins" bets={stats.highestOddsWins} valueKey="odds" />
    </div>
  );
}

function HighlightSection({ title, bets, valueKey }) {
  if (!bets.length) return null;
  return (
    <div style={{ padding: "4px 16px 0" }}>
      <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        {bets.map((b, i) => (
          <div key={b.id} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderBottom: i < bets.length - 1 ? "1px solid var(--border)" : "none"
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayTeam(b.home)} <span style={{ color: "var(--text-muted)" }}>vs</span> {displayTeam(b.away)}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{b.market}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {valueKey === "stake" && (
                <div style={{ fontFamily: "var(--mono)", fontSize: 13.5, fontWeight: 700, color: "var(--text)" }}>
                  {fmtMoney(b.stake, { dp: 0 })}
                </div>
              )}
              {valueKey === "pnl" && (
                <div style={{ fontFamily: "var(--mono)", fontSize: 13.5, fontWeight: 700, color: "var(--profit)" }}>
                  +{fmtMoney(b.pnl, { dp: 0 })}
                </div>
              )}
              {valueKey === "odds" && (
                <div style={{ fontFamily: "var(--mono)", fontSize: 13.5, fontWeight: 700, color: "var(--profit)" }}>
                  {b.bookieOdds?.toFixed(2)}
                </div>
              )}
              <div style={{ fontSize: 10.5, color: "var(--text-muted)", fontFamily: "var(--mono)" }}>
                {valueKey === "odds" ? fmtMoney(b.pnl, { dp: 0 }) + " profit" : (b.bookieOdds ? `@ ${b.bookieOdds.toFixed(2)}` : "")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bet log list ──────────────────────────────────────────────────────────
function BetLog({ bets, onUpdateResult, onDelete, filter, setFilter, marketFilter, setMarketFilter, onCheckScores, scoreCheckState, onApplyScore, onRefresh }) {
  const filtered = useMemo(() => {
    let result = bets;
    if (marketFilter) {
      result = result.filter(b => b.market === marketFilter);
    } else {
      if (filter === "pending") result = result.filter(b => b.result === "Pending");
      else if (filter === "settled") result = result.filter(b => b.result && b.result !== "Pending");
    }
    return result;
  }, [bets, filter, marketFilter]);

  const ordered = [...filtered].reverse();
  const pendingCount = bets.filter(b => b.result === "Pending").length;

  // Pull-to-refresh
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const pull = React.useRef({ y: 0, active: false });
  const onTouchStart = (e) => { if (window.scrollY <= 0 && !refreshing) pull.current = { y: e.touches[0].clientY, active: true }; };
  const onTouchMove = (e) => {
    if (!pull.current.active) return;
    const dy = e.touches[0].clientY - pull.current.y;
    if (dy > 0) setPullY(Math.min(80, dy * 0.5));
  };
  const onTouchEnd = async () => {
    if (!pull.current.active) return;
    pull.current.active = false;
    if (pullY > 50 && onRefresh) {
      setRefreshing(true); setPullY(40);
      try { await onRefresh(); } finally { setRefreshing(false); setPullY(0); }
    } else { setPullY(0); }
  };

  // Fire a local notification when a score check surfaces matches ready to
  // settle. Requests permission the first time; only works while the app is
  // open (true background push needs a server + VAPID keys).
  const notifiedRef = React.useRef(0);
  React.useEffect(() => {
    if (scoreCheckState.status !== "done") return;
    const n = scoreCheckState.suggestions.length;
    if (n > 0 && n !== notifiedRef.current) {
      notifiedRef.current = n;
      try {
        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification("FIFA Tracker", { body: `${n} bet${n === 1 ? "" : "s"} ready to settle` });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission();
          }
        }
      } catch (e) { /* notifications unsupported */ }
    }
  }, [scoreCheckState]);

  return (
    <div style={{ padding: "16px 16px 90px" }}
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(pullY > 0 || refreshing) && (
        <div style={{ height: pullY, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 12, overflow: "hidden", transition: pull.current.active ? "none" : "height 0.2s ease" }}>
          {refreshing ? "Refreshing…" : pullY > 50 ? "Release to refresh" : "Pull to refresh"}
        </div>
      )}
      {pendingCount > 0 && (
        <div style={{ marginBottom: 14 }}>
          <button onClick={onCheckScores} disabled={scoreCheckState.status === "loading"} style={{
            ...btnStyle({ full: true }),
            background: "var(--accent-blue)", color: "#FFFFFF", border: "none",
            opacity: scoreCheckState.status === "loading" ? 0.6 : 1
          }}>
            {scoreCheckState.status === "loading" ? "Checking…" : `Check live scores (${pendingCount} pending)`}
          </button>
          {scoreCheckState.status === "error" && (
            <div style={{ fontSize: 11.5, color: "var(--loss)", marginTop: 6 }}>
              Couldn't check scores: {scoreCheckState.error}
            </div>
          )}
          {scoreCheckState.status === "done" && scoreCheckState.suggestions.length === 0 && (
            <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 6 }}>
              No finished matches found for your pending bets yet.
            </div>
          )}
          {scoreCheckState.status === "done" && scoreCheckState.suggestions.length > 0 && (
            <div style={{ marginTop: 10, background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
              {scoreCheckState.suggestions.map((s, i) => (
                <div key={s.betId} style={{
                  padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
                  borderBottom: i < scoreCheckState.suggestions.length - 1 ? "1px solid var(--border)" : "none"
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                      {displayTeam(s.bet.home)} {s.homeGoals}-{s.awayGoals} {displayTeam(s.bet.away)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.bet.market}</div>
                  </div>
                  <button onClick={() => onApplyScore(s.betId, s.homeGoals, s.awayGoals)} style={btnStyle({ small: true, primary: true })}>
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {marketFilter ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 6, background: "var(--accent-blue)", color: "#FFFFFF",
            fontSize: 12.5, fontWeight: 600, padding: "6px 10px", borderRadius: 16
          }}>
            {marketFilter}
            <button onClick={() => setMarketFilter(null)} style={{
              background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", padding: 0,
              fontSize: 14, lineHeight: 1, opacity: 0.85
            }} aria-label="Clear market filter">×</button>
          </span>
          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{ordered.length} bet{ordered.length === 1 ? "" : "s"}</span>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["all", "pending", "settled"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              ...btnStyle({ small: true }),
              background: filter === f ? "var(--accent-blue)" : "var(--bg-panel-2)",
              color: filter === f ? "#FFFFFF" : "var(--text-muted)",
              border: filter === f ? "none" : "1px solid var(--border)",
              textTransform: "capitalize"
            }}>
              {f}
            </button>
          ))}
        </div>
      )}
      {ordered.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13, marginTop: 40 }}>
          No bets here yet.
        </div>
      ) : (
        ordered.map(bet => <BetRow key={bet.id} bet={bet} onUpdateResult={onUpdateResult} onDelete={onDelete} />)
      )}
    </div>
  );
}

// ── Add bet form ──────────────────────────────────────────────────────────
// ── Lineups tab ───────────────────────────────────────────────────────────
function AddBet({ markets, teams, onAdd, onNavigate }) {
  const [customHome, setCustomHome] = useState("");
  const [customAway, setCustomAway] = useState("");
  const [market, setMarket] = useState(markets[0]);
  const [myOdds, setMyOdds] = useState("");
  const [bookieOdds, setBookieOdds] = useState("");
  const [notes, setNotes] = useState("");
  const [manualStake, setManualStake] = useState("");
  const [useManualStake, setUseManualStake] = useState(false);

  const home = customHome;
  const away = customAway;

  const calc = useMemo(() => calcStake(parseFloat(myOdds), parseFloat(bookieOdds)), [myOdds, bookieOdds]);
  const finalStake = useManualStake ? parseFloat(manualStake) || null : calc?.stake ?? null;

  const canSave = home && away && market && myOdds && bookieOdds && finalStake;

  const save = () => {
    onAdd({
      home, away, market,
      matchNum: null,
      myOdds: parseFloat(myOdds), bookieOdds: parseFloat(bookieOdds),
      edgePct: calc?.edgePct ?? null,
      stake: finalStake,
      notes: notes.trim() || null,
      homeGoals: null, awayGoals: null, result: "Pending", pnl: null,
    });
    setCustomHome(""); setCustomAway("");
    setMyOdds(""); setBookieOdds(""); setNotes(""); setManualStake(""); setUseManualStake(false);
    onNavigate("log");
  };

  return (
    <div style={{ padding: "16px 16px 100px" }}>
      {/* Quick market templates — one tap to preset the market */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
          Quick market
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Over 2.5 Goals", "Under 2.5 Goals", "BTTS Yes", "Team A Win", "Draw", "Team B Win", "Double Chance 1X"].map(m => (
            <button key={m} onClick={() => setMarket(m)} style={{
              ...btnStyle({ small: true }),
              background: market === m ? "var(--accent-blue)" : "var(--bg-panel-2)",
              color: market === m ? "#FFFFFF" : "var(--text-muted)",
              border: market === m ? "none" : "1px solid var(--border)",
            }}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Field label="Home team" style={{ flex: 1 }}>
          <select value={customHome} onChange={e => setCustomHome(e.target.value)} style={inputStyle({ fontFamily: "var(--ui)" })}>
            <option value="">Select…</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Away team" style={{ flex: 1 }}>
          <select value={customAway} onChange={e => setCustomAway(e.target.value)} style={inputStyle({ fontFamily: "var(--ui)" })}>
            <option value="">Select…</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Market">
        <select value={market} onChange={e => setMarket(e.target.value)} style={inputStyle({ fontFamily: "var(--ui)" })}>
          {markets.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </Field>

      <div style={{ display: "flex", gap: 8 }}>
        <Field label="My odds" style={{ flex: 1 }}>
          <input value={myOdds} onChange={e => setMyOdds(e.target.value)} type="number" step="0.01" placeholder="1.85" style={inputStyle()} />
        </Field>
        <Field label="Bookie odds" style={{ flex: 1 }}>
          <input value={bookieOdds} onChange={e => setBookieOdds(e.target.value)} type="number" step="0.01" placeholder="2.13" style={inputStyle()} />
        </Field>
      </div>

      <div style={{
        background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10,
        padding: "14px 14px 12px", marginTop: 4, marginBottom: 14
      }}>
        <EdgeMeter edgePct={calc?.edgePct ?? null} />
      </div>

      <div style={{
        background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: 10,
        padding: "14px", marginBottom: 14
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Stake</span>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--text-muted)" }}>
            <input type="checkbox" checked={useManualStake} onChange={e => setUseManualStake(e.target.checked)} />
            Override manually
          </label>
        </div>
        {useManualStake ? (
          <input value={manualStake} onChange={e => setManualStake(e.target.value)} type="number" placeholder="Enter stake"
            style={inputStyle({ marginTop: 8 })} />
        ) : (
          <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, marginTop: 6, color: "var(--text)" }}>
            {finalStake ? fmtMoney(finalStake, { dp: 2 }) : "—"}
          </div>
        )}
      </div>

      <Field label="Notes (optional)">
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Anything worth remembering about this bet" style={inputStyle()} />
      </Field>

      <button onClick={save} disabled={!canSave} style={{
        ...btnStyle({ primary: true, full: true }),
        opacity: canSave ? 1 : 0.4, marginTop: 6, padding: "13px 14px", fontSize: 15
      }}>
        Log bet
      </button>
    </div>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={{ marginBottom: 14, ...style }}>
      <label style={{ display: "block", fontSize: 11.5, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Root app ──────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://qtmocwlqbkdnslxecwpj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bW9jd2xxYmtkbnNseGVjd3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MDkwMDIsImV4cCI6MjA5ODI4NTAwMn0.mrWQ9-Igprm38G43IVER8QFtIt9Ld1pg-un4ErdgFHs";
const SB_HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

function toRow(b) {
  return {
    id: b.id, home: b.home, away: b.away, market: b.market,
    match_num: b.matchNum, my_odds: b.myOdds, bookie_odds: b.bookieOdds,
    edge_pct: b.edgePct, stake: b.stake, home_goals: b.homeGoals,
    away_goals: b.awayGoals, result: b.result, pnl: b.pnl, notes: b.notes,
  };
}

function fromRow(r) {
  return {
    id: r.id, home: r.home, away: r.away, market: r.market,
    matchNum: r.match_num, myOdds: r.my_odds, bookieOdds: r.bookie_odds,
    edgePct: r.edge_pct, stake: r.stake, homeGoals: r.home_goals,
    awayGoals: r.away_goals, result: r.result, pnl: r.pnl, notes: r.notes,
  };
}

async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { ...SB_HEADERS, ...(options.headers || {}) },
  });
  if (!res.ok) throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

function seedBets() {
  return SEED_BETS.map((b, i) => {
    const calc = calcStake(b.myOdds, b.bookieOdds);
    return {
      id: `seed-${i}`,
      home: b.home, away: b.away, market: b.market,
      matchNum: b.matchNum,
      myOdds: b.myOdds, bookieOdds: b.bookieOdds,
      edgePct: calc?.edgePct ?? null,
      stake: b.stake,
      homeGoals: b.homeGoals, awayGoals: b.awayGoals,
      result: b.result, pnl: b.pnl,
      notes: null,
    };
  });
}

export default function App() {
  const [tab, setTab] = useState("dashboard");

  // Re-pull bets from Supabase whenever the dashboard is opened, so it always
  // reflects the latest saved results even if a prior update's local state
  // somehow lagged behind the database.
  React.useEffect(() => {
    if (tab !== "dashboard" || !loaded) return;
    (async () => {
      try {
        const rows = await sbFetch("bets?select=*&order=created_at.asc");
        if (rows) setBets(rows.map(fromRow));
      } catch (e) {
        // Silent: dashboard just keeps showing whatever was already in memory.
      }
    })();
  }, [tab]);
  const [logFilter, setLogFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState(null);
  const [bets, setBets] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [toast, setToast] = useState(null);
  // Queue of failed writes to retry, so a network blip doesn't silently lose data.
  const pendingWrites = React.useRef([]);
  const toastTimer = React.useRef(null);

  // Persist theme choice across sessions (guarded — storage can throw in PWAs).
  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem("ft_theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch (e) { /* ignore */ }
  }, []);
  React.useEffect(() => {
    try { window.localStorage.setItem("ft_theme", theme); } catch (e) { /* ignore */ }
  }, [theme]);

  const showToast = (message, opts = {}) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, ...opts });
    toastTimer.current = setTimeout(() => setToast(null), opts.duration || 5000);
  };

  // Runs a Supabase write; on failure, queues it for retry and flags the error.
  const runWrite = async (label, fn) => {
    setSaving(true);
    try {
      await fn();
      setSaveError(false);
      return true;
    } catch (e) {
      pendingWrites.current.push({ label, fn });
      setSaveError(true);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const retrySync = async () => {
    const queue = pendingWrites.current;
    pendingWrites.current = [];
    setSaving(true);
    let allOk = true;
    for (const item of queue) {
      try { await item.fn(); }
      catch (e) { pendingWrites.current.push(item); allOk = false; }
    }
    setSaving(false);
    setSaveError(!allOk);
    if (allOk) showToast("Synced");
  };

  const refreshFromDb = async () => {
    try {
      const rows = await sbFetch("bets?select=*&order=created_at.asc");
      if (rows) setBets(rows.map(fromRow));
      setSaveError(false);
    } catch (e) {
      setSaveError(true);
    }
  };

  // Load bets from Supabase on mount. If the table is empty, seed it once
  // with the original 212 bets from the Excel workbook.
  React.useEffect(() => {
    (async () => {
      try {
        const rows = await sbFetch("bets?select=*&order=created_at.asc");
        if (rows && rows.length > 0) {
          setBets(rows.map(fromRow));
        } else {
          const seed = seedBets();
          await sbFetch("bets", {
            method: "POST",
            headers: { Prefer: "return=minimal" },
            body: JSON.stringify(seed.map(toRow)),
          });
          setBets(seed);
        }
        setSaveError(false);
      } catch (e) {
        setSaveError(true);
        setBets(seedBets());
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const addBet = async (bet) => {
    const newBet = { ...bet, id: `bet-${Date.now()}` };
    setBets(prev => [...prev, newBet]);
    await runWrite("add bet", () => sbFetch("bets", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(toRow(newBet)),
    }));
  };

  const updateResult = async (id, homeGoals, awayGoals) => {
    let updatedBet = null;
    setBets(prev => prev.map(b => {
      if (b.id !== id) return b;
      if (homeGoals === null || awayGoals === null) {
        updatedBet = { ...b, homeGoals, awayGoals, result: "Pending", pnl: null };
        return updatedBet;
      }
      const result = evaluateMarket(b.market, homeGoals, awayGoals);
      let pnl = null;
      if (result === "W") pnl = b.stake * (b.bookieOdds - 1);
      else if (result === "L") pnl = -b.stake;
      else if (result === "P") pnl = 0;
      updatedBet = { ...b, homeGoals, awayGoals, result, pnl };
      return updatedBet;
    }));
    if (!updatedBet) return;
    const row = toRow(updatedBet);
    await runWrite("update result", () => sbFetch(`bets?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(row),
    }));
  };

  const deleteBet = async (id) => {
    const removed = bets.find(b => b.id === id);
    if (!removed) return;
    // Optimistically remove, then offer a 5s undo before it's truly gone.
    setBets(prev => prev.filter(b => b.id !== id));
    let undone = false;
    const doDelete = async () => {
      if (undone) return;
      await runWrite("delete bet", () => sbFetch(`bets?id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Prefer: "return=minimal" },
      }));
    };
    showToast("Bet deleted", {
      actionLabel: "Undo",
      action: () => {
        undone = true;
        setBets(prev => {
          // Reinsert keeping original order by id if possible.
          if (prev.some(b => b.id === removed.id)) return prev;
          return [...prev, removed].sort((a, b) => String(a.id).localeCompare(String(b.id)));
        });
        setToast(null);
      },
    });
    // Commit the delete after the undo window elapses.
    setTimeout(doDelete, 5000);
  };

  const resetToSeed = async () => {
    if (!window.confirm("Reset to your original 212 logged bets? This deletes everything in your database and starts fresh for every device.")) return;
    const fresh = seedBets();
    setSaving(true);
    try {
      await sbFetch("bets?id=neq.__never__", { method: "DELETE", headers: { Prefer: "return=minimal" } });
      await sbFetch("bets", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify(fresh.map(toRow)),
      });
      setBets(fresh);
      setSaveError(false);
    } catch (e) {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const [scoreCheckState, setScoreCheckState] = useState({ status: "idle", suggestions: [], error: null });

  const checkLiveScores = async () => {
    setScoreCheckState({ status: "loading", suggestions: [], error: null });
    try {
      const res = await fetch("/api/scores");
      if (!res.ok) throw new Error(`Score check failed (${res.status})`);
      const data = await res.json();
      const apiMatches = data.matches || [];
      const pending = bets.filter(b => b.result === "Pending");
      const suggestions = [];
      pending.forEach(bet => {
        const match = findMatchForBet(bet, apiMatches);
        if (match) {
          const hg = match.score?.fullTime?.home;
          const ag = match.score?.fullTime?.away;
          if (hg !== null && hg !== undefined && ag !== null && ag !== undefined) {
            suggestions.push({ betId: bet.id, bet, homeGoals: hg, awayGoals: ag });
          }
        }
      });
      setScoreCheckState({ status: "done", suggestions, error: null });
    } catch (e) {
      setScoreCheckState({ status: "error", suggestions: [], error: e.message });
    }
  };

  const applyScoreSuggestion = async (betId, homeGoals, awayGoals) => {
    await updateResult(betId, homeGoals, awayGoals);
    setScoreCheckState(prev => ({ ...prev, suggestions: prev.suggestions.filter(s => s.betId !== betId) }));
  };

  if (!loaded) {
    return (
      <div style={{
        ...THEMES[theme],
        background: "var(--bg)", minHeight: "100vh",
        fontFamily: "var(--ui)", maxWidth: 480, margin: "0 auto",
        padding: "calc(14px + env(safe-area-inset-top)) 16px 16px",
      }}>
        <SkeletonDashboard />
      </div>
    );
  }

  return (
    <div style={{
      ...THEMES[theme],
      background: "var(--bg)", color: "var(--text)", minHeight: "100vh",
      fontFamily: "var(--ui)", maxWidth: 480, margin: "0 auto", position: "relative",
      WebkitFontSmoothing: "antialiased"
    }}>
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: var(--text-muted); opacity: 0.7; }
        select { -webkit-appearance: none; appearance: none; }
        input:focus, select:focus { border-color: var(--accent-blue) !important; }
        button { font-family: var(--ui); }
        button:active { transform: scale(0.98); }
        @keyframes skPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
        @keyframes toastIn { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
      `}</style>

      <div style={{
        position: "sticky", top: 0, zIndex: 10, background: "var(--header-bg)",
        borderBottom: "1px solid var(--border-strong)",
        padding: "calc(14px + env(safe-area-inset-top)) 16px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", whiteSpace: "nowrap", color: "var(--header-text)" }}>
          FIFA 26 <span style={{ opacity: 0.7, fontWeight: 500 }}>Tracker</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 15, lineHeight: 1 }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          {saveError ? (
            <button onClick={retrySync} title="Retry sync"
              style={{ fontSize: 11, color: "var(--loss)", fontFamily: "var(--mono)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              sync failed · retry
            </button>
          ) : saving ? (
            <span style={{ fontSize: 11, color: "var(--header-text)", opacity: 0.7, fontFamily: "var(--mono)" }}>syncing…</span>
          ) : (
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-yellow)", boxShadow: "0 0 6px var(--accent-yellow)" }} title="Synced" />
          )}
          <button onClick={resetToSeed}
            style={{ background: "none", border: "none", color: "var(--header-text)", opacity: 0.7, fontSize: 11, cursor: "pointer", padding: 0, fontFamily: "var(--ui)" }}>
            Reset
          </button>
        </div>
      </div>

      {tab === "dashboard" && <Dashboard bets={bets} onSelectMarket={(market) => { setMarketFilter(market); setTab("log"); }} onRefresh={refreshFromDb} />}
      {tab === "log" && <BetLog bets={bets} onUpdateResult={updateResult} onDelete={deleteBet} filter={logFilter} setFilter={setLogFilter} marketFilter={marketFilter} setMarketFilter={setMarketFilter} onCheckScores={checkLiveScores} scoreCheckState={scoreCheckState} onApplyScore={applyScoreSuggestion} onRefresh={refreshFromDb} />}
      {tab === "add" && <AddBet markets={MARKETS} teams={TEAMS} onAdd={addBet} onNavigate={setTab} />}

      {toast && (
        <div style={{
          position: "fixed", bottom: "calc(74px + env(safe-area-inset-bottom))", left: "50%",
          transform: "translateX(-50%)", zIndex: 30, background: "var(--bg-panel)",
          border: "1px solid var(--border-strong)", borderRadius: 10, padding: "10px 14px",
          display: "flex", alignItems: "center", gap: 14, boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
          animation: "toastIn 0.2s ease", maxWidth: "calc(100% - 32px)"
        }}>
          <span style={{ fontSize: 13, color: "var(--text)" }}>{toast.message}</span>
          {toast.action && (
            <button onClick={toast.action} style={{
              background: "none", border: "none", color: "var(--accent-blue)", fontWeight: 700,
              fontSize: 13, cursor: "pointer", padding: 0, flexShrink: 0
            }}>
              {toast.actionLabel}
            </button>
          )}
        </div>
      )}

      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, background: "var(--nav-bg)",
        borderTop: "1px solid var(--border)", display: "flex", padding: "8px 8px calc(8px + env(safe-area-inset-bottom))",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.12)"
      }}>
        {[
          { id: "dashboard", label: "Dashboard", render: (color) => <SoccerBallIcon color={color} /> },
          { id: "log", label: "Bets", render: () => <DollarIcon color="var(--profit)" /> },
          { id: "add", label: "Add Bet", render: (color) => <PlusIcon color={color} /> },
        ].map(t => {
          const color = tab === t.id ? "var(--accent-blue)" : "var(--text-muted)";
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3, padding: "6px 0", cursor: "pointer",
              color
            }}>
              <span style={{ display: "flex", lineHeight: 1 }}>{t.render(color)}</span>
              <span style={{ fontSize: 10.5, fontWeight: tab === t.id ? 700 : 500 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Tab bar icons ─────────────────────────────────────────────────────────
function SoccerBallIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
      <circle cx="12" cy="12" r="9.3" />
      <path d="M12 7.2l3.6 2.6-1.4 4.2H9.8l-1.4-4.2z" fill={color} stroke="none" />
      <path d="M12 7.2V3.4M15.6 9.8l3.6-1.2M14.2 14l2.3 3.4M9.8 14l-2.3 3.4M8.4 9.8l-3.6-1.2" strokeLinecap="round" />
    </svg>
  );
}

function DollarIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.3" />
      <path d="M12 6.5v11M15.2 9c0-1.4-1.4-2.3-3.2-2.3s-3.2.9-3.2 2.2c0 3 6.4 1.4 6.4 4.4 0 1.4-1.5 2.3-3.2 2.3s-3.4-1-3.4-2.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.3" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function JerseyIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4">
      <path d="M7 4l-4 3 2 3 2-1v11h10V9l2 1 2-3-4-3-2 2h-4z" strokeLinejoin="round" />
    </svg>
  );
}


// ── Market evaluation logic (auto W/L/P from scoreline) ──────────────────
function evaluateMarket(market, hg, ag) {
  const total = hg + ag;
  const bothScored = hg > 0 && ag > 0;
  switch (market) {
    case "Team A Win": return hg > ag ? "W" : "L";
    case "Team B Win": return ag > hg ? "W" : "L";
    case "Draw": return hg === ag ? "W" : "L";
    case "Over 1.5 Goals": return total > 1.5 ? "W" : "L";
    case "Over 2.5 Goals": return total > 2.5 ? "W" : "L";
    case "Over 3.5 Goals": return total > 3.5 ? "W" : "L";
    case "Under 2.5 Goals": return total < 2.5 ? "W" : "L";
    case "BTTS Yes": return bothScored ? "W" : "L";
    case "BTTS No": return !bothScored ? "W" : "L";
    case "Double Chance 1X": return hg >= ag ? "W" : "L";
    case "Double Chance 12": return hg !== ag ? "W" : "L";
    case "Double Chance X2": return ag >= hg ? "W" : "L";
    case "Draw No Bet A": return hg === ag ? "P" : (hg > ag ? "W" : "L");
    case "Draw No Bet B": return hg === ag ? "P" : (ag > hg ? "W" : "L");
    default: return "Pending";
  }
}

// ── Team name normalization for live score matching ──────────────────────
// football-data.org uses official FIFA names; your logged bets use various
// casual/lowercase spellings. This maps both sides to one canonical form.
const TEAM_ALIASES = {
  "czechia": "czech republic", "czech republic": "czech republic",
  "turkiye": "turkey", "türkiye": "turkey", "turkey": "turkey",
  "usa": "united states", "united states": "united states", "us": "united states",
  "korea republic": "south korea", "south korea": "south korea", "korea": "south korea",
  "côte d'ivoire": "ivory coast", "cote d'ivoire": "ivory coast", "ivory coast": "ivory coast",
  "congo dr": "dr congo", "dr congo": "dr congo", "democratic republic of the congo": "dr congo",
  "cabo verde": "cape verde", "cape verde": "cape verde",
  "bosnia and herzegovina": "bosnia & herzegovina", "bosnia & herzegovina": "bosnia & herzegovina",
  "ir iran": "iran", "iran": "iran",
  "curacao": "curaçao", "curaçao": "curaçao",
};

function normalizeTeam(name) {
  if (!name) return "";
  const lower = name.trim().toLowerCase();
  return TEAM_ALIASES[lower] || lower;
}

function teamsMatch(a, b) {
  return normalizeTeam(a) === normalizeTeam(b);
}

// Finds a finished match from the football-data.org match list that corresponds
// to this bet's home/away teams. Order-insensitive in case home/away got flipped.
function findMatchForBet(bet, apiMatches) {
  return apiMatches.find(m => {
    const apiHome = m.homeTeam?.name || m.homeTeam?.shortName || "";
    const apiAway = m.awayTeam?.name || m.awayTeam?.shortName || "";
    const sameOrder = teamsMatch(bet.home, apiHome) && teamsMatch(bet.away, apiAway);
    const swapped = teamsMatch(bet.home, apiAway) && teamsMatch(bet.away, apiHome);
    return (sameOrder || swapped) && m.status === "FINISHED";
  }) || null;
}

// Finds the matching fixture from a the-odds-api.com response for a given
// home/away pair, regardless of team order.
function findOddsMatch(home, away, oddsMatches) {
  if (!oddsMatches) return null;
  return oddsMatches.find(m => {
    const sameOrder = teamsMatch(home, m.home_team) && teamsMatch(away, m.away_team);
    const swapped = teamsMatch(home, m.away_team) && teamsMatch(away, m.home_team);
    return sameOrder || swapped;
  }) || null;
}

// Extracts best-available bookie price per market this app tracks from a
// the-odds-api.com fixture, taking the best (highest) price across bookmakers
// for each outcome. Returns { marketName: bestOdds } similar to computeModelMarkets.
function extractBookieOdds(home, away, oddsMatch) {
  if (!oddsMatch) return {};
  const flipped = !teamsMatch(home, oddsMatch.home_team);
  const result = {};

  oddsMatch.bookmakers?.forEach(bm => {
    bm.markets?.forEach(market => {
      if (market.key === "h2h") {
        market.outcomes?.forEach(o => {
          let label = null;
          if (o.name === "Draw") label = "Draw";
          else if (teamsMatch(o.name, flipped ? away : home)) label = "Team A Win";
          else if (teamsMatch(o.name, flipped ? home : away)) label = "Team B Win";
          if (label && (!result[label] || o.price > result[label])) result[label] = o.price;
        });
      }
      if (market.key === "totals") {
        market.outcomes?.forEach(o => {
          if (o.point !== 2.5) return;
          const label = o.name === "Over" ? "Over 2.5 Goals" : o.name === "Under" ? "Under 2.5 Goals" : null;
          if (label && (!result[label] || o.price > result[label])) result[label] = o.price;
        });
      }
    });
  });
  return result;
}

// Compares model probabilities against bookie odds for every market both
// have, returning rows sorted by edge descending.
function computeEdges(modelMarkets, bookieOdds) {
  if (!modelMarkets || !bookieOdds) return [];
  const rows = [];
  Object.keys(bookieOdds).forEach(market => {
    const modelOdds = modelMarkets[market];
    const bookieOdd = bookieOdds[market];
    if (!modelOdds || !bookieOdd) return;
    const modelProb = 1 / modelOdds;
    const bookieProb = 1 / bookieOdd;
    const edgePct = (modelProb - bookieProb) * 100;
    rows.push({ market, modelOdds, bookieOdds: bookieOdd, edgePct });
  });
  return rows.sort((a, b) => b.edgePct - a.edgePct);
}


