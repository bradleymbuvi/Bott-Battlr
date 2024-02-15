import { useState } from 'react'
import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';

function App() {
  const [bots, setBots] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(data => setBots(data));
  }, []);

  const enlistBot = (bot) => {
    setYourBotArmy([...yourBotArmy, bot]);
  };

  const releaseBot = (botId) => {
    setYourBotArmy(yourBotArmy.filter(bot => bot.id !== botId));
  };

  const deleteBot = (botId) => {
    fetch(`http://localhost:3000/bots/${botId}`, {
      method: 'DELETE',
    }).then(() => {
      setBots(bots.filter(bot => bot.id !== botId));
      setYourBotArmy(yourBotArmy.filter(bot => bot.id !== botId));
    });
  };

  return (
    <div>
      <h1>Bot Army Builder</h1>
      <BotCollection bots={bots} enlistBot={enlistBot} />
      <YourBotArmy yourBotArmy={yourBotArmy} releaseBot={releaseBot} deleteBot={deleteBot} />
    </div>
  );
}

export default App
