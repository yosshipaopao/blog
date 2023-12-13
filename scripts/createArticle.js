import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const id = process.argv[2] ?? Math.random().toString(32).substring(2);
const template = `---
title: ${id}
description:
published: false
tags: []
date: ${new Date().toISOString().substring(0, 10)}
---
`;
fs.writeFile(path.resolve(__dirname, '../articles', `${id}.md`), template, (err) => {
	if (err) console.log(err);
});
console.log(`Created article ${id}.md`);
