#!/usr/bin/env node
// Health check script — runs all available health checks and reports results

const { execFile } = require('child_process');
const path = require('path');
const os = require('os');

const REPOS_ROOT = process.env.REPOS_ROOT || os.homedir();

const CHECKS = [
  { name: 'claude-code-scheduler', cmd: 'npx', args: ['vitest', 'run'] },
  { name: 'n8n-mcp', cmd: 'npx', args: ['vitest', 'run'] },
  { name: 'get-shit-done', cmd: 'node', args: ['scripts/run-tests.cjs'] },
  { name: 'everything-claude-code', cmd: 'node', args: ['tests/run-all.js'] },
  { name: 'context7', cmd: 'pnpm', args: ['test'] },
  { name: 'SlayZone', cmd: 'pnpm', args: ['typecheck'] },
];

async function runCheck(check) {
  const cwd = path.join(REPOS_ROOT, check.name);
  return new Promise((resolve) => {
    const start = Date.now();
    execFile(check.cmd, check.args, { cwd, timeout: 120000 }, (err, stdout, stderr) => {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const pass = !err;
      resolve({ name: check.name, pass, elapsed, error: err ? err.message : null });
    });
  });
}

async function main() {
  console.log('Running health checks across all repos...\n');
  const results = await Promise.all(CHECKS.map(runCheck));

  console.log('REPO'.padEnd(30) + 'STATUS'.padEnd(10) + 'TIME');
  console.log('─'.repeat(55));
  for (const r of results) {
    const status = r.pass ? '✓ PASS' : '✗ FAIL';
    console.log(`${r.name.padEnd(30)}${status.padEnd(10)}${r.elapsed}s`);
  }

  const failures = results.filter(r => !r.pass);
  console.log(`\n${results.length - failures.length}/${results.length} passed`);
  if (failures.length > 0) {
    console.log('\nFailures:');
    for (const f of failures) {
      console.log(`  ${f.name}: ${f.error}`);
    }
    process.exit(1);
  }
}

main();
