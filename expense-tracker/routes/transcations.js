const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST /transactions - Add a new transaction
router.post('/', (req, res) => {
  const { type, category, amount, description } = req.body;
  const date = new Date().toISOString();

  const query = `INSERT INTO transactions (type, category, amount, date, description)
                 VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [type, category, amount, date, description], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, type, category, amount, date, description });
  });
});

// GET /transactions - Retrieve all transactions
router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /transactions/:id - Retrieve a transaction by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Transaction not found' });
    res.json(row);
  });
});

// PUT /transactions/:id - Update a transaction by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { amount } = req.body;

  const query = `UPDATE transactions SET amount = ? WHERE id = ?`;

  db.run(query, [amount, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction updated' });
  });
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Transaction deleted' });
  });
});

module.exports = router;
