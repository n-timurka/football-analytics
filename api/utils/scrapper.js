require('dotenv').config();

const axios = require('axios');
const { Pool } = require('pg');

const URL = 'https://understat.com/';

// Database client setup
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Function to scrape the webpage
async function scrapePage(url, regex) {
    try {
      const response = await axios.get(url);
      const pageHtml = response.data;
  
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
        for (const { id, title } of Object.values(data)) {
          await saveToDatabase('teams', { id, title });
        }

        // Save histories
        for (const { id: teamId, history } of Object.values(data)) {
            for (const h of history) {
              await saveToDatabase('team_histories', { ...h, teamId }, 'teamId, ');
            }
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

      await saveToDatabase('players', { ...playerData, teamId: id });
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
  console.log(data)
}

async function processTeamGames({ id, title }) {
  const url = `${URL}/team/${title}/2024`;
  const regex = /var datesData\s*=\s*JSON\.parse\('([^']+)'\);/;

  const data = await scrapePage(url, regex);
  if (!data) {
    console.log('No data to save.');
    return;
  }

  try {
    // Save games
    for (const game of data) {
      await saveToDatabase('games', {
        id: game.id,
        h_id: game.h.id,
        a_id: game.a.id,
        h_goals: game.goals.h,
        a_goals: game.goals.a,
        h_xg: game.xG.h,
        a_xg: game.xG.a,
        datetime: game.datetime,
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

// Main function to run the scraping and saving process
async function main() {
    // await processTeams();

    // await processPlayers({ title: 'Chelsea', id: 80 });

    // await processTeamStats({ title: 'Chelsea', id: 80 });

    await processTeamGames({ title: 'Chelsea', id: 80 });
}
  
main();
