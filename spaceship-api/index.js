const express = require('express');
const chalk = require('chalk');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Space-themed ASCII art
const rocketAscii = `
   /\\
  /  \\
 |    |
 |    |
 |    |
/      \\
|      |
|      |
|      |
|______|
|  ||  |
|  ||  |
|  ||  |
|  ||  |
|__||__|
   ||
   ||
   ||
  /  \\
 /    \\
`;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Spaceship API is operational! 🚀' });
});

app.get('/systems', (req, res) => {
  res.json({
    systems: [
      { name: 'Propulsion', status: 'Online' },
      { name: 'Navigation', status: 'Online' },
      { name: 'Life Support', status: 'Online' },
      { name: 'Communications', status: 'Online' }
    ]
  });
});

app.get('/fuel', (req, res) => {
  res.json({ fuelLevel: Math.floor(Math.random() * 100) + '% remaining' });
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.blue(rocketAscii));
  console.log(chalk.green('🚀 Spaceship API launching on port'), chalk.yellow(PORT));
  console.log(chalk.cyan('✓ Propulsion systems online'));
  console.log(chalk.cyan('✓ Navigation systems online'));
  console.log(chalk.cyan('✓ Life support systems online'));
  console.log(chalk.cyan('✓ Communications array active'));
  console.log(chalk.magenta('Ready for space exploration! 🌌'));
}); 