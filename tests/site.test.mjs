import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const root = resolve('dist');
for (const [file, lang] of [['index.html', 'en'], ['zh/index.html', 'zh-CN']]) {
  test(`${lang}: complete static page, valid local links, and public content only`, () => {
    const html = readFileSync(resolve(root, file), 'utf8');
    assert.ok(html.includes(`lang="${lang}"`));
    for (const id of ['about', 'work', 'background', 'contact']) assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes('id="project-inscription-evolution"'));
    assert.ok(html.includes('EpiHistRead'));
    assert.ok(html.includes('xinhao@stu.pku.edu.cn'));
    assert.ok(html.includes('hreflang="en"') && html.includes('hreflang="zh-CN"'));
    assert.doesNotMatch(html, /\b1[3-9]\d[\s‑-]*\d{4}[\s‑-]*\d{4}\b|个人简历\.pdf|简历2026\.pdf/);
    for (const privateRepo of ['InscriptionEvolution', 'EpiHistRead', 'FamilyMemory', 'Lost-Cultural-Relics']) {
      assert.ok(!html.includes(`https://github.com/YuIcy/${privateRepo}"`));
    }
    for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
      const target = resolve(root, '.' + url, url.endsWith('/') ? 'index.html' : '');
      assert.ok(existsSync(target), `Missing local target: ${url}`);
    }
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${id}"`), `Missing anchor: ${id}`);
    }
  });
}
test('public assets contain no source CVs', () => {
  for (const file of readdirSync(root, { recursive: true })) assert.notEqual(extname(file).toLowerCase(), '.pdf');
});
