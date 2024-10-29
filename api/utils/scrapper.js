require('dotenv').config();

const axios = require('axios');
const cheerio = require('cheerio');
const { Pool } = require('pg');

const URL = 'https://understat.com/';

const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Database client setup
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Function to scrape the webpage
async function scrapePage(url, regex = null) {
    try {
      const response = await axios.get(url);
      const pageHtml = response.data;

      if (!regex) {
        return pageHtml;
      }
  
      // Use regex to extract the encoded JSON string (adjust pattern based on actual data)
      const match = pageHtml.match(regex);
  
      if (match && match[1]) {
        // Decode the escaped string
        const encodedString = match[1];
        const decodedString = decodeURIComponent(
          encodedString.replace(/\\x/g, '%')
        );
  
        // Parse the JSON string into a JavaScript object
        const data = JSON.parse(decodedString);
  
        return data;
      } else {
        console.log('No match found for players data.');
        return null;
      }
    } catch (error) {
      console.error('Error scraping the webpage: ', error);
      return null;
    }
}

// Function to save data to PostgreSQL
async function saveToDatabase(tableName, data, onConflict = 'id') {
    const client = await pool.connect();

    try {
        // Get column names and corresponding values
        const columns = Object.keys(data).map((col) => `"${col}"`).join(", ");
        const values = Object.values(data);

        // Create a parameterized values string ($1, $2, etc.)
        const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");
  
        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) ON CONFLICT (${onConflict}) DO NOTHING`;

        await client.query(query, values);
  
      console.log('Data successfully saved to the database.');
    } catch (error) {
      console.error('Error saving data to the database:', error);
    } finally {
      client.release();
    }
}

async function processTeams() {
  const url = `${URL}/league/EPL/2024`;
  const regex = /var teamsData\s*=\s*JSON\.parse\('([^']+)'\);/;

  const data = await scrapePage(url, regex);

  if (!data) {
    console.log('No data to save.');
    return;
  }

  try {
    // Save teams
    for (const { id, title, history } of Object.values(data)) {
      // await saveToDatabase('teams', { id, title, slug: slugify(title) });

      // Save histories
      // for (const h of history) {
      //   await saveToDatabase('team_histories', { ...h, team_id: id });
      // }

      // Save players
      // await processPlayers({ id, title });

      // Save team stats
      // await processTeamStats({ id, title });
    }
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Close the pool after all operations are done
      await pool.end();
      console.log('Database pool closed.');
  }
}

async function processPlayers({ id, title }) {
  const url = `${URL}/team/${title}/2024`;
  const regex = /var playersData\s*=\s*JSON\.parse\('([^']+)'\);/;

  const data = await scrapePage(url, regex);

  if (!data) {
      console.log('No data to save.');
      return;
  }

  try {
    // Save players
    for (const player of data) {
      const { team_title, ...playerData } = player

      await saveToDatabase('players', { ...playerData, team_id: id });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the pool after all operations are done
    await pool.end();
    console.log('Database pool closed.');
  }
}

async function processTeamStats({ id, title }) {
  const url = `${URL}/team/${title}/2024`;
  const regex = /var statisticsData\s*=\s*JSON\.parse\('([^']+)'\);/;

  const data = await scrapePage(url, regex);

  const teamData = {}
  const teamAgainstData = {}
  Object.keys(data).forEach(stat => {
    Object.keys(data[stat]).forEach(item => {
      const { against, ...d } = data[stat][item]

      if (teamData[stat]) {
        teamData[stat][item] = d
      } else {
        teamData[stat] = { [item]: d }
      }

      if (teamAgainstData[stat]) {
        teamAgainstData[stat][item] = against
      } else {
        teamAgainstData[stat] = { [item]: against }
      }
    })
  })

  await saveToDatabase('team_stats', {
    ...teamData,
    team_id: id,
    is_against: false,
  }, 'team_id, is_against')
  
  await saveToDatabase('team_stats', {
    ...teamAgainstData,
    team_id: id,
    is_against: true,
  }, 'team_id, is_against')
}

async function processGames() {
  const url = `${URL}/league/EPL`;
  const regex = /var\s+datesData\s*=\s*JSON\.parse\('([^']+)'\)/;

  const data = await scrapePage(url, regex);
  if (!data) {
    console.log('No data to save.');
    return;
  }
  
  for (const game of data) {
    // await saveToDatabase('games', {
    //   id: +game.id,
    //   h_id: game.h.id,
    //   a_id: game.a.id,
    //   result: game.isResult ? `${game.goals.h}:${game.goals.a}` : null,
    //   datetime: game.datetime,
    // });

    // Skip future games
    if (!game.isResult) continue;

    // Save game info
    await processMatchInfo(game.id);

    // Save game rosters
    // await processRostersData(game.id);

    // Save game events
    // await processGameEvents(game.id)

    // Save game shots map
    // await processShotsData(game.id);
  }
}

async function processRostersData(id) {
  const url = `${URL}/match/${id}`;
  const regex = /var rostersData\s*=\s*JSON\.parse\('([^']+)'\);/;

  const data = await scrapePage(url, regex);
  if (!data) {
    console.log('No data to save.');
    return;
  }

  try {
    // Save games
    for (const p of Object.values(data.a)) {
      const { id: gamePlayerId, own_goals, player, h_a, xG, xA, time, roster_out, roster_in, xGChain, xGBuildup, positionOrder, ...playerData } = p

      await saveToDatabase('game_players', {
        ...playerData,
        minutes: time,
        x_g: xG,
        x_a: xA,
        game_id: id,
        is_starter: roster_out === '0',
      }, 'player_id,game_id');
    }

    for (const p of Object.values(data.h)) {
      const { id: gamePlayerId, own_goals, player, h_a, xG, xA, time, roster_out, roster_in, xGChain, xGBuildup, positionOrder, ...playerData } = p

      await saveToDatabase('game_players', {
        ...playerData,
        minutes: time,
        x_g: xG,
        x_a: xA,
        game_id: id,
        is_starter: roster_out === '0',
      }, 'player_id,game_id');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the pool after all operations are done
    await pool.end();
    console.log('Database pool closed.');
  }
}

async function processShotsData(id) {
  const url = `${URL}/match/${id}`;
  const regex = /var\s+shotsData\s*=\s*JSON\.parse\('([^']+)'\)/;

  const data = await scrapePage(url, regex);
  if (!data) {
    console.log('No data to save.');
    return;
  }
  
  try {
    for (const p of [ ...data.h, ...data.a ]) {

      await saveToDatabase('game_shots', {
        game_id: id,
        player_id: p.player_id,
        minute: p.minute,
        x: p.X,
        y: p.Y,
        result: p.result,
        situation: p.situation,
        type: p.shotType,
        x_g: p.xG,
        type: p.shotType,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the pool after all operations are done
    await pool.end();
    console.log('Database pool closed.');
  }
}

async function processGameEvents(id) {
  const events = [];

  const url = `${URL}/match/${id}`;

  const html = await scrapePage(url);
  if (!html) {
    console.log('No data to save.');
    return;
  }

  const $ = cheerio.load(html);

  $('.timiline-container').each((_, container) => {
    const event = { game_id: id };

    // Extract minute value
    const minuteElement = $(container).find('.timeline-minute .minute-value');
    event.minute = Number(minuteElement.text().replace("'", ""));

    const eventBlock = $(container).find('.timeline-row');

    // Determine the event type by checking the icon class
    if (eventBlock.find('i[class*="fa-futbol"]').length) {
      event.type = 'goal';
    } else if (eventBlock.find('i[class*="yellow-card"]').length) {
      event.type = 'ycard';
    } else if (eventBlock.find('i[class*="red-card"]').length) {
      event.type = 'rcard';
    } else if (eventBlock.find('i[class*="player-substitution"]').length) {
      event.type = 'sub';
    }

    // Extract player ID for the primary player in all events
    const playerLinks = eventBlock.find('.player-name');
    const primaryPlayerLink = playerLinks.eq(0).attr('href');
    if (primaryPlayerLink) {
      const primaryPlayerId = primaryPlayerLink.match(/\/player\/(\d+)/);
      if (primaryPlayerId) event.player_id = parseInt(primaryPlayerId[1], 10);
    }

    // Additional info for specific events
    if (event.type === 'goal') {
      // Add score to info field
      const score = eventBlock.find('.match-score').text();

      // Check if it's a penalty goal
      const isPenalty = eventBlock.find('i.penalty').length > 0;

      event.info = {
        score,
        isPenalty
      }
    } else if (event.type === 'sub') {
      // For substitutions, capture the second player's ID
      const secondaryPlayerLink = playerLinks.eq(1).attr('href');
      const secondaryPlayerId = secondaryPlayerLink.match(/\/player\/(\d+)/);
      event.info = {
        subId: parseInt(secondaryPlayerId[1], 10)
      }
    }

    events.push(event);
  });

  for (let event of events) {
    await saveToDatabase('game_events', event);
  }
}

async function processMatchInfo(id) {
  const url = `${URL}/match/${id}`;
  const regex = /match_info\s*=\s*JSON\.parse\('([^']+)'\)/;

  const data = await scrapePage(url, regex);
  if (!data) {
    console.log('No data to save.');
    return;
  }

  const client = await pool.connect();
  try {
    // const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) ON CONFLICT (${onConflict}) DO NOTHING`;
    const query = `UPDATE games SET (h_stats, a_stats, chanses) = ($1, $2, $3) WHERE id = ${id}`;

    await client.query(query, [
      {
        goals: data.h_goals,
        xg: data.h_xg,
        shots: data.h_shot,
        shotOnTarget: data.h_shotOnTarget,
        deep: data.h_deep,
        ppda: data.h_ppda,
      },
      {
        goals: data.a_goals,
        xg: data.a_xg,
        shots: data.a_shot,
        shotOnTarget: data.a_shotOnTarget,
        deep: data.a_deep,
        ppda: data.a_ppda,
      },
      { w: data.h_w, d: data.h_d, l: data.h_l },
    ]);
  
    console.log('Data successfully saved to the database.');
  } catch (error) {
    console.error('Error saving data to the database:', error);
  } finally {
    client.release();
  }
}

// Main function to run the scraping and saving process
async function main() {
  // await processTeams();

  // await processGames();

  await processGameEvents(26679);
}
  
main();
