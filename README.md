# Find a Teammate

Easily find a teammate for group games via a random draw!

> Hint: DO NOT take this project seriously!

## How to use

In case you are a little bit familiar with programming, follow the below steps:

1. Clone the repository and run the project using **npm i** command

2. There is a **config.js.sample** file in the **src** directory. Copy that file and rename it to **config.js** (the exact name is required)

3. Edit **config.js** file regarding your demant. There are two arrays named _participantsList_ and _gameList_ that should be modified based on your customization. A sample filled array is presented below:

```javascript
participantsList: [
    "Player1",
    "Player2",
  ],
  gameList: ["Game1"]
```

4. You can also add the persons image by adding their photo in **src/img** directory. Note that their photo should be in **.png** format, start with **player\_** suffix and contain the exact name defined in the **config.js** file. Here's a sample:

```javascript
player_Player1.png;
player_Player2.png;
```

5. Finally, run the project by **npm start** command and enjoy!
